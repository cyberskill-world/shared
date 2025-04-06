import fetch from 'node-fetch';

import type { T_Object } from '#typescript/common.js';

import { NODE_MODULES, PACKAGE_JSON, WORKING_DIRECTORY } from '#constants/path.js';

import { existsSync, readFileSync } from './fs.js';
import { logNodeJS as log } from './log-nodejs.js';
import { join } from './path.js';
import { storageServer } from './storage-server.js';

const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getPackageJson(packageName: string): {
    path: string;
    file: T_Object;
    isCurrentProject: boolean;
} | false {
    const workingPackageJsonPath = join(WORKING_DIRECTORY, PACKAGE_JSON);

    if (existsSync(workingPackageJsonPath)) {
        try {
            const pkg = readFileSync(workingPackageJsonPath, { asJson: true });

            if (pkg.name === packageName) {
                return {
                    path: workingPackageJsonPath,
                    file: pkg,
                    isCurrentProject: true,
                };
            }
        }
        catch (error) {
            log.warn(`Failed to read local package.json: ${(error as Error).message}`);
        }
    }

    const externalPackageJsonPath = join(WORKING_DIRECTORY, NODE_MODULES, packageName, PACKAGE_JSON);

    if (existsSync(externalPackageJsonPath)) {
        try {
            const pkg = readFileSync(externalPackageJsonPath, { asJson: true });

            if (pkg.name === packageName) {
                return {
                    path: externalPackageJsonPath,
                    file: pkg,
                    isCurrentProject: false,
                };
            }
        }
        catch (error) {
            log.warn(`Failed to read node_modules package.json for ${packageName}: ${(error as Error).message}`);
        }
    }

    return false;
}

export async function getLatestPackageVersion(packageName: string, forceRefresh = false): Promise<string> {
    const versionCacheKey = `npm_version:${packageName}`;
    const metadataCacheKey = `npm_metadata:${packageName}`;

    const cached = await storageServer.get<{ version: string; timestamp: number }>(versionCacheKey);
    const metadata = await storageServer.get<{ etag?: string; lastModified?: string }>(metadataCacheKey);

    const isCacheValid = cached && Date.now() - cached.timestamp < CACHE_EXPIRATION_MS;

    if (!forceRefresh && isCacheValid) {
        return cached.version;
    }

    const headers: Record<string, string> = {};

    if (metadata?.etag) {
        headers['If-None-Match'] = metadata.etag;
    }
    if (metadata?.lastModified) {
        headers['If-Modified-Since'] = metadata.lastModified;
    }

    try {
        const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`, { headers });

        if (response.status === 304 && cached) {
            return cached.version;
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch latest version: ${response.statusText}`);
        }

        const data = await response.json() as { version: string };
        const latestVersion = data.version;

        await storageServer.set(versionCacheKey, {
            version: latestVersion,
            timestamp: Date.now(),
        });

        await storageServer.set(metadataCacheKey, {
            etag: response.headers.get('ETag') || undefined,
            lastModified: response.headers.get('Last-Modified') || undefined,
        });

        return latestVersion;
    }
    catch (error) {
        log.error(`Error fetching latest version for ${packageName}: ${(error as Error).message}`);

        if (cached) {
            log.warn(`Falling back to cached version for ${packageName}: ${cached.version}`);

            return cached.version;
        }

        throw error;
    }
}

export async function checkPackage(packageName: string): Promise<{
    isInstalled: boolean;
    isCurrentProject: boolean;
    installedPath: string;
    installedVersion: string;
    latestVersion: string;
    file: T_Object;
}> {
    const result = {
        isInstalled: false,
        isCurrentProject: false,
        installedPath: '',
        installedVersion: '',
        latestVersion: '',
        file: {},
    };

    try {
        const packageFound = getPackageJson(packageName);

        if (!packageFound) {
            return result;
        }

        result.file = packageFound.file;
        result.isInstalled = true;
        result.installedPath = packageFound.path;
        result.installedVersion = packageFound.file.version as string;
        result.isCurrentProject = packageFound.isCurrentProject;
        result.latestVersion = packageFound.isCurrentProject
            ? packageFound.file.version as string
            : await getLatestPackageVersion(packageName, true);

        return result;
    }
    catch (error) {
        log.error(`Error checking package "${packageName}": ${(error as Error).message}`);
        return result;
    }
}
