import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { executeCommand } from './command.js';
import { storage } from './storage.js';

const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function getLatestPackageVersion(packageName: string, forceRefresh = false): Promise<string> {
    const versionCacheKey = `npm_version:${packageName}`;
    const metadataCacheKey = `npm_metadata:${packageName}`;

    // ✅ Try to get from cache
    const cached = await storage.get<{ version: string; timestamp: number }>(versionCacheKey);
    const metadata = await storage.get<{ etag?: string; lastModified?: string }>(metadataCacheKey);

    const isCacheValid = cached && Date.now() - cached.timestamp < CACHE_EXPIRATION_MS;

    if (!forceRefresh && isCacheValid) {
        console.log(`Using cached version for ${packageName}: ${cached.version}`);
        return cached.version;
    }

    // ✅ Prepare conditional headers
    const headers: Record<string, string> = {};
    if (metadata?.etag)
        headers['If-None-Match'] = metadata.etag;
    if (metadata?.lastModified)
        headers['If-Modified-Since'] = metadata.lastModified;

    try {
        console.log(`Fetching latest version for ${packageName}...`);

        const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`, { headers });

        if (response.status === 304 && cached) {
            console.log(`Cache is still valid for ${packageName}: ${cached.version}`);
            return cached.version;
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch latest version: ${response.statusText}`);
        }

        const data = await response.json() as { version: string };
        const latestVersion = data.version;

        // ✅ Store version in cache
        await storage.set(versionCacheKey, {
            version: latestVersion,
            timestamp: Date.now(),
        });

        // ✅ Store metadata in cache
        await storage.set(metadataCacheKey, {
            etag: response.headers.get('ETag') || undefined,
            lastModified: response.headers.get('Last-Modified') || undefined,
        });

        console.log(`Cached latest version for ${packageName}: ${latestVersion}`);

        return latestVersion;
    }
    catch (error) {
        console.error(`Error fetching latest version for ${packageName}: ${(error as Error).message}`);

        // ✅ Fallback to cache if network request fails
        if (cached) {
            console.warn(`Falling back to cached version for ${packageName}: ${cached.version}`);
            return cached.version;
        }

        throw error;
    }
}

function getPackageJsonPath(packageName: string): string {
    return path.join(process.cwd(), 'node_modules', packageName, 'package.json');
}

function getRootPackageJsonPath(): string {
    return path.join(process.cwd(), 'package.json');
}

/**
 * Check if the installed package is outdated.
 * @param packageName Name of the package.
 * @param forceRefresh Whether to bypass cache and force refresh.
 * @returns True if the installed version is different from the latest version.
 */
export async function isPackageOutdated(packageName: string, forceRefresh = true): Promise<boolean> {
    try {
        const installedPackagePath = getPackageJsonPath(packageName);

        if (!fs.existsSync(installedPackagePath)) {
            console.log(`${packageName} is not installed.`);
            return true; // ✅ If not installed, treat it as outdated.
        }

        const installedVersion = JSON.parse(fs.readFileSync(installedPackagePath, 'utf-8')).version;
        const latestVersion = await getLatestPackageVersion(packageName, forceRefresh);

        console.log(`Installed version of ${packageName}: ${installedVersion}`);
        console.log(`Latest version of ${packageName}: ${latestVersion}`);

        return installedVersion !== latestVersion;
    }
    catch (error) {
        console.warn(`Failed to check version for ${packageName}: ${(error as Error).message}`);
        return true; // ✅ Assume outdated if version check fails.
    }
}

/**
 * Update the specified package to the latest version.
 * @param packageName Name of the package.
 */
export async function updatePackage(packageName: string): Promise<void> {
    try {
        const latestVersion = await getLatestPackageVersion(packageName, true);
        const packageJsonPath = getRootPackageJsonPath();

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        packageJson.dependencies = {
            ...packageJson.dependencies,
            [packageName]: latestVersion,
        };

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`Updated ${packageName} to version ${latestVersion}`);

        await executeCommand('npm i -f', `Installing all dependencies with updated ${packageName}...`);
        await executeCommand('npm run lint:fix', `Fixing lint issues for ${packageName}...`);

        console.log(`${packageName} updated successfully.`);
    }
    catch (error) {
        console.error(`Failed to update ${packageName}: ${(error as Error).message}`);
        throw error;
    }
}

export function isCurrentProject(
    INIT_CWD: string,
    PACKAGE_NAME: string,
): boolean {
    try {
        const packageJsonPath = path.join(INIT_CWD, 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
            return false;
        }

        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf-8'),
        );

        return packageJson.name === PACKAGE_NAME;
    }
    catch (error) {
        console.error(`Error reading package.json: ${(error as Error).message}`);
        return false;
    }
}
