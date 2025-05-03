import fetch from 'node-fetch';

import type { I_Return } from '#typescript/index.js';

import { getEnv } from '#config/env/index.js';

import type { I_PackageInfo, I_PackageInput, T_PackageJson } from './package.type.js';

import { runCommand } from '../command/index.js';
import { pathExistsSync, readJsonSync, writeFileSync } from '../fs/index.js';
import { catchError, log } from '../log/index.js';
import { command, join, NODE_MODULES, PACKAGE_JSON, PATH } from '../path/index.js';
import { E_PackageType } from './package.type.js';

const env = getEnv();

export async function getLatestPackageVersion(packageName: string): Promise<I_Return<string>> {
    try {
        const res = await fetch(`https://registry.npmjs.org/${packageName}/latest`);

        if (!res.ok) {
            throw new Error(`Failed to fetch latest version: ${res.status} ${res.statusText}`);
        }

        const { version } = await res.json() as { version: string };

        return {
            success: true,
            result: version,
        };
    }
    catch (error) {
        return catchError<string>(error);
    }
}

export async function getPackage(inputPackage: I_PackageInput): Promise<I_Return<I_PackageInfo>> {
    try {
        // if package.json does not exist
        if (!pathExistsSync(PATH.PACKAGE_JSON)) {
            return {
                success: true,
                result: {
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
                },
            };
        }

        const packageJson = readJsonSync(PATH.PACKAGE_JSON) as T_PackageJson;

        const { name, version = '', dependencies = {}, devDependencies = {} } = packageJson;

        // if it's the current project
        if (inputPackage.name === name) {
            return {
                success: true,
                result: {
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
                },
            };
        }

        const isDependency = inputPackage.name in dependencies;

        const isDevDependency = inputPackage.name in devDependencies;

        const latestVersionFound = await getLatestPackageVersion(inputPackage.name);

        if (!latestVersionFound.success) {
            return {
                success: true,
                result: {
                    name: inputPackage.name,
                    currentVersion: '',
                    latestVersion: '',
                    isCurrentProject: false,
                    isInstalled: false,
                    isUpToDate: false,
                    isDependency,
                    isDevDependency,
                    installedPath: '',
                    file: {},
                },
            };
        }

        // if it's not a dependency or devDependency
        if (!isDependency && !isDevDependency) {
            return {
                success: true,
                result: {
                    name: inputPackage.name,
                    currentVersion: '',
                    latestVersion: latestVersionFound.result,
                    isCurrentProject: false,
                    isInstalled: false,
                    isUpToDate: false,
                    isDependency: inputPackage.type === E_PackageType.DEPENDENCY,
                    isDevDependency: inputPackage.type === E_PackageType.DEV_DEPENDENCY,
                    installedPath: '',
                    file: {},
                },
            };
        }

        const packageJsonVersion = dependencies[inputPackage.name] ?? devDependencies[inputPackage.name] ?? '';
        const dependencyPackageJsonPath = join(env.CWD, NODE_MODULES, inputPackage.name, PACKAGE_JSON);

        // if package does not exist in node_modules
        if (!pathExistsSync(dependencyPackageJsonPath)) {
            return {
                success: true,
                result: {
                    name: inputPackage.name,
                    currentVersion: '',
                    latestVersion: latestVersionFound.result,
                    isCurrentProject: false,
                    isInstalled: false,
                    isUpToDate: false,
                    isDependency,
                    isDevDependency,
                    installedPath: '',
                    file: {},
                },
            };
        }

        const dependencyPackageJson = readJsonSync(dependencyPackageJsonPath) as T_PackageJson;

        const { version: dependencyVersion = '' } = dependencyPackageJson;

        // if version in package.json is different from version in node_modules
        if (packageJsonVersion !== dependencyVersion) {
            return {
                success: true,
                result: {
                    name: inputPackage.name,
                    currentVersion: dependencyVersion || packageJsonVersion,
                    latestVersion: latestVersionFound.result,
                    isCurrentProject: false,
                    isInstalled: true,
                    isUpToDate: false,
                    isDependency,
                    isDevDependency,
                    installedPath: dependencyPackageJsonPath,
                    file: dependencyPackageJson,
                },
            };
        }

        // if version in package.json is the same as version in node_modules
        return {
            success: true,
            result: {
                name: inputPackage.name,
                currentVersion: packageJsonVersion,
                latestVersion: latestVersionFound.result,
                isCurrentProject: false,
                isInstalled: true,
                isUpToDate: packageJsonVersion === latestVersionFound.result,
                isDependency,
                isDevDependency,
                installedPath: dependencyPackageJsonPath,
                file: dependencyPackageJson,
            },
        };
    }
    catch (error) {
        return catchError<I_PackageInfo>(error);
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
        catchError(error);
    }
}

export async function installDependencies(): Promise<void> {
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
                catchError(error);
            }
        }
    }
    catch (error) {
        catchError(error);
    }
}

export async function setupPackages(packages: I_PackageInput[], options?: {
    update?: boolean;
    postInstallActions?: (() => Promise<void>)[];
}): Promise<void> {
    if (!pathExistsSync(PATH.PACKAGE_JSON)) {
        log.error('package.json not found. Aborting setup.');
        return;
    }

    try {
        const packagesData = await Promise.all(packages.map(getPackage));

        const outDatedPackages = packagesData.filter((packageData) => {
            if (!packageData.success) {
                return false;
            }

            return !packageData.result.isCurrentProject && (!packageData.result.isInstalled || !packageData.result.isUpToDate);
        });

        if (outDatedPackages.length > 0) {
            await Promise.all(outDatedPackages.map((packageInfo) => {
                if (!packageInfo.success) {
                    return Promise.resolve();
                }

                return updatePackage(packageInfo.result);
            }));
            await installDependencies();
            await runCommand('Running ESLint with auto-fix', await command.eslintFix());
        }

        for (const action of options?.postInstallActions ?? []) {
            await action();
        }
    }
    catch (error) {
        catchError(error);
    }
}
