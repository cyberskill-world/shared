import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';

import { WORKING_DIRECTORY } from '../constants/dirname.js';
import { log } from './command-log.js';
import { executeCommand } from './command.js';
import { storage } from './storage.js';

const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// ✅ Utility to resolve package paths
function getPackageJsonPath(packageName?: string): string {
    return packageName
        ? path.join(WORKING_DIRECTORY, 'node_modules', packageName, 'package.json')
        : path.join(WORKING_DIRECTORY, 'package.json');
}

/**
 * Get the latest version of an npm package (with cache).
 */
export async function getLatestPackageVersion(packageName: string, forceRefresh = false): Promise<string> {
    const versionCacheKey = `npm_version:${packageName}`;
    const metadataCacheKey = `npm_metadata:${packageName}`;

    // ✅ Try to get cached version
    const cached = await storage.get<{ version: string; timestamp: number }>(versionCacheKey);
    const metadata = await storage.get<{ etag?: string; lastModified?: string }>(metadataCacheKey);

    const isCacheValid = cached && Date.now() - cached.timestamp < CACHE_EXPIRATION_MS;

    if (!forceRefresh && isCacheValid) {
        log.info(`Using cached version for ${packageName}: ${cached.version}`);

        return cached.version;
    }

    // ✅ Prepare conditional headers
    const headers: Record<string, string> = {};
    if (metadata?.etag)
        headers['If-None-Match'] = metadata.etag;
    if (metadata?.lastModified)
        headers['If-Modified-Since'] = metadata.lastModified;

    try {
        log.info(`Fetching latest version for ${packageName}...`);

        const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`, { headers });

        if (response.status === 304 && cached) {
            log.info(`Cache is still valid for ${packageName}: ${cached.version}`);

            return cached.version;
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch latest version: ${response.statusText}`);
        }

        const data = await response.json() as { version: string };
        const latestVersion = data.version;

        // ✅ Store version and metadata in cache
        await storage.set(versionCacheKey, {
            version: latestVersion,
            timestamp: Date.now(),
        });

        await storage.set(metadataCacheKey, {
            etag: response.headers.get('ETag') || undefined,
            lastModified: response.headers.get('Last-Modified') || undefined,
        });

        log.success(`Cached latest version for ${packageName}: ${latestVersion}`);

        return latestVersion;
    }
    catch (error) {
        log.error(`Error fetching latest version for ${packageName}: ${(error as Error).message}`);

        if (cached) {
            log.warning(`Falling back to cached version for ${packageName}: ${cached.version}`);
            return cached.version;
        }

        throw error;
    }
}

/**
 * Check if a package is outdated.
 */
export async function isPackageOutdated(packageName: string, forceRefresh = true): Promise<boolean> {
    try {
        const installedPackagePath = getPackageJsonPath(packageName);

        if (!fs.existsSync(installedPackagePath)) {
            log.info(`${packageName} is not installed.`);

            return true; // ✅ If not installed, treat as outdated
        }

        const installedVersion = JSON.parse(fs.readFileSync(installedPackagePath, 'utf-8')).version;
        const latestVersion = await getLatestPackageVersion(packageName, forceRefresh);

        log.info(`Installed version of ${packageName}: ${installedVersion}`);
        log.info(`Latest version of ${packageName}: ${latestVersion}`);

        return installedVersion !== latestVersion;
    }
    catch (error) {
        log.warning(`Failed to check version for ${packageName}: ${(error as Error).message}`);

        return true; // ✅ Assume outdated if version check fails
    }
}

/**
 * Update a package to the latest version.
 */
export async function updatePackage(packageName: string): Promise<void> {
    try {
        const latestVersion = await getLatestPackageVersion(packageName, true);
        const packageJsonPath = getPackageJsonPath();

        if (!fs.existsSync(packageJsonPath)) {
            log.error(`package.json not found. Cannot update ${packageName}`);

            return;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        packageJson.dependencies = {
            ...packageJson.dependencies,
            [packageName]: latestVersion,
        };

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        log.info(`Updated ${packageName} to version ${latestVersion}`);

        await executeCommand('npm i -f');
        await executeCommand('npm run lint:fix');

        log.success(`${packageName} updated successfully.`);
    }
    catch (error) {
        log.error(`Failed to update ${packageName}: ${(error as Error).message}`);
        throw error;
    }
}

/**
 * Check if current project matches a specific package name.
 */
export function isCurrentProject(WORKING_DIRECTORY: string, PACKAGE_NAME: string): boolean {
    try {
        const packageJsonPath = path.join(WORKING_DIRECTORY, 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
            return false;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        return packageJson.name === PACKAGE_NAME;
    }
    catch (error) {
        log.error(`Error reading package.json: ${(error as Error).message}`);

        return false;
    }
}
