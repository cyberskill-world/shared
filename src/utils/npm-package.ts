import fetch from 'node-fetch';
import fs from 'node:fs';
import path from 'node:path';

import { WORKING_DIRECTORY } from '#constants/path.js';

import { commandLog, executeCommand } from './command.js';
import { storageServer } from './storage-server.js';

const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function getPackageJsonPath(packageName?: string): string {
    return packageName
        ? path.join(WORKING_DIRECTORY, 'node_modules', packageName, 'package.json')
        : path.join(WORKING_DIRECTORY, 'package.json');
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
        commandLog.error(`Error fetching latest version for ${packageName}: ${(error as Error).message}`);

        if (cached) {
            commandLog.warning(`Falling back to cached version for ${packageName}: ${cached.version}`);

            return cached.version;
        }

        throw error;
    }
}

export async function isPackageOutdated(packageName: string, forceRefresh = true): Promise<boolean> {
    try {
        const installedPackagePath = getPackageJsonPath(packageName);

        if (!fs.existsSync(installedPackagePath)) {
            commandLog.info(`${packageName} is not installed.`);

            return true;
        }

        const installedVersion = JSON.parse(fs.readFileSync(installedPackagePath, 'utf-8')).version;
        const latestVersion = await getLatestPackageVersion(packageName, forceRefresh);

        commandLog.info(`Installed version of ${packageName}: ${installedVersion}`);
        commandLog.info(`Latest version of ${packageName}: ${latestVersion}`);

        return installedVersion !== latestVersion;
    }
    catch (error) {
        commandLog.warning(`Failed to check version for ${packageName}: ${(error as Error).message}`);

        return true;
    }
}

export async function updatePackage(packageName: string): Promise<void> {
    try {
        const latestVersion = await getLatestPackageVersion(packageName, true);
        const packageJsonPath = getPackageJsonPath();

        if (!fs.existsSync(packageJsonPath)) {
            commandLog.error(`package.json not found. Cannot update ${packageName}`);

            return;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        packageJson.dependencies = {
            ...packageJson.dependencies,
            [packageName]: latestVersion,
        };

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        commandLog.info(`Updated ${packageName} to version ${latestVersion}`);

        await installDependencies();
        await executeCommand('pnpm run lint:fix');

        commandLog.success(`${packageName} updated successfully.`);
    }
    catch (error) {
        commandLog.error(`Failed to update ${packageName}: ${(error as Error).message}`);

        throw error;
    }
}

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
        commandLog.error(`Error reading package.json: ${(error as Error).message}`);

        return false;
    }
}

export async function installDependencies() {
    const strategies = [
        { command: 'pnpm install', message: 'Standard installation' },
        { command: 'pnpm install --legacy-peer-deps', message: 'Attempting installation with --legacy-peer-deps' },
        { command: 'pnpm install --force', message: 'Attempting forced installation' },
    ];

    for (const { command, message } of strategies) {
        try {
            commandLog.info(`${message}...`);
            await executeCommand(command);
            commandLog.success(`Dependencies installed using: ${command}`);
            return;
        }
        catch (error) {
            commandLog.warning(`Failed with: ${command}`);
            commandLog.error(`Error: ${(error as Error).message}`);
        }
    }

    throw new Error('Failed to install dependencies after multiple attempts.');
}
