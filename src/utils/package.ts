import fetch from 'node-fetch';

import type { I_CheckPackage, I_GetPackage, T_PackageJson } from '#typescript/package.js';

import { CHECK_PACKAGE_EMPTY_RESULT } from '#constants/package.js';
import { PACKAGE_JSON, WORKING_DIRECTORY } from '#constants/path.js';

import { existsSync, readFileSync, writeFileSync } from './fs.js';
import { logNodeJS as log } from './log-nodejs.js';
import { join } from './path.js';

const cache: Record<string, I_GetPackage | false> = {};

export function getPackage(packageName: string): I_GetPackage | false {
    if (packageName in cache) {
        return cache[packageName];
    }

    const pkgPath = join(WORKING_DIRECTORY, PACKAGE_JSON);

    if (!existsSync(pkgPath)) {
        return (cache[packageName] = false);
    }

    try {
        const file = readFileSync(pkgPath, { asJson: true }) as T_PackageJson;
        const isCurrentProject = file.name === packageName;
        const isDepend = !!file.dependencies?.[packageName];
        const isDevDepend = !!file.devDependencies?.[packageName];

        if (isCurrentProject || isDepend || isDevDepend) {
            return (cache[packageName] = {
                path: pkgPath,
                file,
                isCurrentProject,
                isDepend,
                isDevDepend,
            });
        }

        return (cache[packageName] = false);
    }
    catch (err) {
        log.warn(`Failed to read package.json: ${(err as Error).message}`);
        return (cache[packageName] = false);
    }
}

export async function getLatestPackageVersion(packageName: string): Promise<string> {
    try {
        const res = await fetch(`https://registry.npmjs.org/${packageName}/latest`);

        if (!res.ok) {
            throw new Error(`Failed to fetch latest version: ${res.status} ${res.statusText}`);
        }

        const { version } = await res.json() as { version: string };

        return version;
    } catch (err) {
        log.error(`Failed to fetch version for "${packageName}": ${(err as Error).message}`);
        throw err;
    }
}

export async function checkPackage(
    packageName: string,
    options?: { update?: boolean },
): Promise<I_CheckPackage> {
    try {
        const pkg = getPackage(packageName);

        if (!pkg) {
            return { ...CHECK_PACKAGE_EMPTY_RESULT };
        }

        const { path, file, isCurrentProject, isDepend, isDevDepend } = pkg;

        let installedVersion = '0.0.0';

        if (isCurrentProject && file.version) {
            installedVersion = file.version;
        }
        else if (isDepend && file.dependencies?.[packageName]) {
            installedVersion = file.dependencies?.[packageName];
        }
        else if (isDevDepend && file.devDependencies?.[packageName]) {
            installedVersion = file.devDependencies?.[packageName];
        }

        const latestVersion = isCurrentProject ? installedVersion : await getLatestPackageVersion(packageName);
        const isUpToDate = isCurrentProject || installedVersion === latestVersion;

        if (!isUpToDate && options?.update) {
            if (isDepend) {
                file.dependencies = { ...(file.dependencies || {}), [packageName]: latestVersion };
            }
            else if (isDevDepend) {
                file.devDependencies = { ...(file.devDependencies || {}), [packageName]: latestVersion };
            }

            log.info(`Updating package "${packageName}" to version ${latestVersion}`);
            writeFileSync(path, file, { isJson: true });
        }

        return {
            isCurrentProject,
            installedPath: path,
            file,
            isUpToDate,
        };
    }
    catch (error) {
        log.error(`Error checking package "${packageName}": ${(error as Error).message}`);
        return { ...CHECK_PACKAGE_EMPTY_RESULT };
    }
}
