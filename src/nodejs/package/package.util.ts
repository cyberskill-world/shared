import fetch from 'node-fetch';

import type { I_CheckPackage, I_GetPackage, T_PackageJson } from './package.type.js';

import { runCommand } from '../command/index.js';
import { existsSync, readFileSync, writeFileSync } from '../fs/index.js';
import { logNodeJS as log } from '../log/index.js';
import { command, join, PACKAGE_JSON, PATH, WORKING_DIRECTORY } from '../path/index.js';
import { CHECK_PACKAGE_EMPTY_RESULT } from './package.constant.js';

export function getPackage(packageName: string): I_GetPackage | false {
    const pkgPath = join(WORKING_DIRECTORY, PACKAGE_JSON);

    if (!existsSync(pkgPath)) {
        return false;
    }

    try {
        const file = readFileSync(pkgPath, { asJson: true }) as T_PackageJson;
        const { name, dependencies = {}, devDependencies = {} } = file;

        const isCurrentProject = name === packageName;
        const isDepend = packageName in dependencies;
        const isDevDepend = packageName in devDependencies;

        if (isCurrentProject || isDepend || isDevDepend) {
            return {
                path: pkgPath,
                file,
                isCurrentProject,
                isDepend,
                isDevDepend,
            };
        }

        return false;
    }
    catch (err) {
        log.warn(`Failed to read package.json: ${(err as Error).message}`);
        return false;
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
    }
    catch (err) {
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

        const dependencies = file.dependencies ?? {};
        const devDependencies = file.devDependencies ?? {};

        const installedVersion = isCurrentProject
            ? file.version ?? '0.0.0'
            : isDepend
                ? dependencies[packageName] ?? '0.0.0'
                : isDevDepend
                    ? devDependencies[packageName] ?? '0.0.0'
                    : '0.0.0';

        const latestVersion = isCurrentProject ? installedVersion : await getLatestPackageVersion(packageName);
        const isUpToDate = isCurrentProject || installedVersion === latestVersion;

        if (!isUpToDate && options?.update) {
            const section = isDepend ? 'dependencies' : isDevDepend ? 'devDependencies' : null;

            if (section && file[section]?.[packageName] !== latestVersion) {
                file[section] = file[section] ?? {};
                file[section]![packageName] = latestVersion;
                writeFileSync(path, file, { isJson: true });
                log.info(`Updated "${packageName}" to version ${latestVersion}`);
            }
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

export async function installDependencies() {
    const strategies = [
        { command: () => command.pnpmInstallStandard(), message: 'Installing dependencies (standard)' },
        { command: () => command.pnpmInstallLegacy(), message: 'Retrying with legacy peer dependencies' },
        { command: () => command.pnpmInstallForce(), message: 'Retrying with force install' },
    ];

    for (const { command, message } of strategies) {
        try {
            const cmd = await command();
            await runCommand(`${message} using: ${cmd}`, cmd);
            return;
        }
        catch (error) {
            log.warn(`Installation attempt failed: ${message}`);
            log.error(`Details: ${(error as Error).message}`);
        }
    }

    throw new Error('All dependency installation strategies failed.');
}

export async function setupPackages(packages: string[], options?: {
    update?: boolean;
    postInstallActions?: (() => Promise<void>)[];
}) {
    if (!existsSync(PATH.PACKAGE_JSON)) {
        log.error('package.json not found. Aborting setup.');

        return;
    }

    try {
        const uniquePackages = [...new Set(packages)].sort();
        const result = await Promise.all(uniquePackages.map(pkg =>
            checkPackage(pkg, { update: options?.update }),
        ));

        if (!result.every(pkg => pkg.isUpToDate)) {
            await installDependencies();
        }

        for (const action of options?.postInstallActions ?? []) {
            await action();
        }

        log.success(`"${packages.join(', ')}" setup completed.`);
    }
    catch (error) {
        log.error(`Failed to setup "${packages.join(', ')}": ${(error as Error).message}`);
        throw error;
    }
}
