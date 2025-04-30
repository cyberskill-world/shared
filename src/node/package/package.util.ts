import fetch from 'node-fetch';

import { getEnv } from '#configs/env/index.js';

import type { I_PackageInfo, I_PackageInput, T_PackageJson } from './package.type.js';

import { runCommand } from '../command/index.js';
import { pathExistsSync, readJsonSync, writeFileSync } from '../fs/index.js';
import { logNodeJS as log } from '../log/index.js';
import { command, join, NODE_MODULES, PACKAGE_JSON, PATH } from '../path/index.js';
import { E_PackageType } from './package.type.js';

const env = getEnv();

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

export async function getPackage(inputPackage: I_PackageInput): Promise<I_PackageInfo> {
    try {
        // if package.json does not exist
        if (!pathExistsSync(PATH.PACKAGE_JSON)) {
            return {
                name: inputPackage.name,
                currentVersion: '',
                latestVersion: '',
                isCurrentProject: false,
                isInstalled: false,
                isUpToDate: false,
                isDependency: inputPackage.type === E_PackageType.DEPENDENCY,
                isDevDependency: inputPackage.type === E_PackageType.DEV_DEPENDENCY,
                installedPath: '',
                file: {},
            };
        }

        const packageJson = readJsonSync(PATH.PACKAGE_JSON) as T_PackageJson;

        const { name, version = '', dependencies = {}, devDependencies = {} } = packageJson;

        // if it's the current project
        if (inputPackage.name === name) {
            return {
                name,
                currentVersion: version,
                latestVersion: version,
                isCurrentProject: true,
                isInstalled: true,
                isUpToDate: true,
                isDependency: inputPackage.type === E_PackageType.DEPENDENCY,
                isDevDependency: inputPackage.type === E_PackageType.DEV_DEPENDENCY,
                installedPath: PATH.PACKAGE_JSON,
                file: packageJson,
            };
        }

        const isDependency = inputPackage.name in dependencies;

        const isDevDependency = inputPackage.name in devDependencies;

        const latestVersion = await getLatestPackageVersion(inputPackage.name);

        // if it's not a dependency or devDependency
        if (!isDependency && !isDevDependency) {
            return {
                name: inputPackage.name,
                currentVersion: '',
                latestVersion,
                isCurrentProject: false,
                isInstalled: false,
                isUpToDate: false,
                isDependency: inputPackage.type === E_PackageType.DEPENDENCY,
                isDevDependency: inputPackage.type === E_PackageType.DEV_DEPENDENCY,
                installedPath: '',
                file: {},
            };
        }

        const packageJsonVersion = dependencies[inputPackage.name] ?? devDependencies[inputPackage.name] ?? '';
        const dependencyPackageJsonPath = join(env.CWD, NODE_MODULES, inputPackage.name, PACKAGE_JSON);

        // if package does not exist in node_modules
        if (!pathExistsSync(dependencyPackageJsonPath)) {
            return {
                name: inputPackage.name,
                currentVersion: '',
                latestVersion,
                isCurrentProject: false,
                isInstalled: false,
                isUpToDate: false,
                isDependency,
                isDevDependency,
                installedPath: '',
                file: {},
            };
        }

        const dependencyPackageJson = readJsonSync(dependencyPackageJsonPath) as T_PackageJson;

        const { version: dependencyVersion = '' } = dependencyPackageJson;

        // if version in package.json is different from version in node_modules
        if (packageJsonVersion !== dependencyVersion) {
            return {
                name: inputPackage.name,
                currentVersion: dependencyVersion || packageJsonVersion,
                latestVersion,
                isCurrentProject: false,
                isInstalled: true,
                isUpToDate: false,
                isDependency,
                isDevDependency,
                installedPath: dependencyPackageJsonPath,
                file: dependencyPackageJson,
            };
        }

        // if version in package.json is the same as version in node_modules
        return {
            name: inputPackage.name,
            currentVersion: packageJsonVersion,
            latestVersion,
            isCurrentProject: false,
            isInstalled: true,
            isUpToDate: packageJsonVersion === latestVersion,
            isDependency,
            isDevDependency,
            installedPath: dependencyPackageJsonPath,
            file: dependencyPackageJson,
        };
    }
    catch (error) {
        log.error(`Error getting package "${inputPackage.name}": ${(error as Error).message}`);
        throw error;
    }
}

export async function updatePackage(packageInfo: I_PackageInfo): Promise<void> {
    try {
        const packageJson = readJsonSync(PATH.PACKAGE_JSON) as T_PackageJson;

        const dependencies = packageJson.dependencies ?? {};
        const devDependencies = packageJson.devDependencies ?? {};

        if (packageInfo.isDependency) {
            dependencies[packageInfo.name] = packageInfo.latestVersion;
        }
        else if (packageInfo.isDevDependency) {
            devDependencies[packageInfo.name] = packageInfo.latestVersion;
        }

        writeFileSync(PATH.PACKAGE_JSON, JSON.stringify(packageJson, null, 4));

        log.info(`Updated "${packageInfo.name}" to version ${packageInfo.latestVersion}`);
    }
    catch (error) {
        log.error(`Error updating package "${packageInfo.name}": ${(error as Error).message}`);
        throw error;
    }
}

export async function installDependencies() {
    try {
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
    }
    catch (error) {
        log.error(`Failed to install dependencies: ${(error as Error).message}`);
        throw error;
    }
}

export async function setupPackages(packages: I_PackageInput[], options?: {
    update?: boolean;
    postInstallActions?: (() => Promise<void>)[];
}) {
    if (!pathExistsSync(PATH.PACKAGE_JSON)) {
        log.error('package.json not found. Aborting setup.');
        return;
    }

    try {
        const packagesInfo = await Promise.all(packages.map(getPackage));

        const outDatedPackages = packagesInfo.filter(pkg => !pkg.isCurrentProject && (!pkg.isInstalled || !pkg.isUpToDate));

        if (outDatedPackages.length > 0) {
            await Promise.all(outDatedPackages.map(updatePackage));
            await installDependencies();
        }

        for (const action of options?.postInstallActions ?? []) {
            await action();
        }
    }
    catch (error) {
        log.error(`Failed to setup "${packages.map(pkg => pkg.name).join(', ')}": ${(error as Error).message}`);
        throw error;
    }
}
