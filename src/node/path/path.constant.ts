import fsExtra from 'fs-extra';

import { getEnv } from '#config/env/index.js';

import type { I_CommandContext } from '../command/index.js';
import type { I_PackageInput, T_PackageJson } from '../package/index.js';

import { E_CommandType, formatCommand, rawCommand } from '../command/index.js';
import { E_PackageType, setupPackages } from '../package/index.js';
import { join, resolveWorkingPath } from './path.util.js';

const env = getEnv();

export const WORKING_DIRECTORY = env.CWD;
export const CYBERSKILL_PACKAGE_NAME = '@cyberskill/shared';
export const NODE_MODULES = 'node_modules';
export const BUILD_DIRECTORY = 'dist';
export const PUBLIC_DIRECTORY = 'public';
export const PACKAGE_JSON = 'package.json';
export const PACKAGE_LOCK_JSON = 'package-lock.json';
export const TSCONFIG_JSON = 'tsconfig.json';
export const GIT_IGNORE = '.gitignore';
export const SIMPLE_GIT_HOOK_JSON = '.simple-git-hooks.json';
export const PNPM_LOCK_YAML = 'pnpm-lock.yaml';
export const GIT_HOOK = '.git/hooks/';
export const GIT_COMMIT_EDITMSG = '.git/COMMIT_EDITMSG';
export const MIGRATE_MONGO_CONFIG = '.migrate-mongo.config.js';
export const CYBERSKILL_DIRECTORY = (() => {
    const packageJson = fsExtra.readJsonSync(resolveWorkingPath(PACKAGE_JSON)) as T_PackageJson;

    const baseDirectory = packageJson.name === CYBERSKILL_PACKAGE_NAME
        ? WORKING_DIRECTORY
        : join(WORKING_DIRECTORY, NODE_MODULES, CYBERSKILL_PACKAGE_NAME);

    return join(baseDirectory, BUILD_DIRECTORY);
})();
export const CYBERSKILL_CLI = 'cyberskill';
export const CYBERSKILL_CLI_PATH = 'src/node/cli/index.ts';
export const ESLINT_PACKAGE_NAME = 'eslint';
export const ESLINT_CLI = 'eslint';
export const VITEST_PACKAGE_NAME = 'vitest';
export const VITEST_CLI = 'vitest';
export const COMMIT_LINT_PACKAGE_NAME = '@commitlint/cli';
export const COMMIT_LINT_CONVENTIONAL_CONFIG_PACKAGE_NAME = '@commitlint/config-conventional';
export const COMMIT_LINT_CLI = 'commitlint';
export const LINT_STAGED_PACKAGE_NAME = 'lint-staged';
export const LINT_STAGED_CLI = 'lint-staged';
export const TSC_PACKAGE_NAME = 'typescript';
export const TSC_CLI = 'tsc';
export const TSX_CLI = 'tsx';
export const GIT_CLI = 'git';
export const PNPM_CLI = 'pnpm';
export const PNPM_EXEC_CLI = 'pnpm exec';
export const SIMPLE_GIT_HOOKS_PACKAGE_NAME = 'simple-git-hooks';
export const SIMPLE_GIT_HOOK_CLI = 'simple-git-hooks';
export const ESLINT_INSPECT_PACKAGE_NAME = '@eslint/config-inspector';
export const ESLINT_INSPECT_CLI = 'eslint-config-inspector';
export const NODE_MODULES_INSPECT_PACKAGE_NAME = 'node-modules-inspector';
export const NODE_MODULES_INSPECT_CLI = 'node-modules-inspector';
export const MIGRATE_MONGO_PACKAGE_NAME = 'migrate-mongo';
export const MIGRATE_MONGO_CLI = './node_modules/migrate-mongo/bin/migrate-mongo';

export const PATH = {
    CYBERSKILL_DIRECTORY,
    WORKING_DIRECTORY,
    PUBLIC_DIRECTORY: resolveWorkingPath(PUBLIC_DIRECTORY),
    TS_CONFIG: resolveWorkingPath(TSCONFIG_JSON),
    GIT_IGNORE: resolveWorkingPath(GIT_IGNORE),
    GIT_HOOK: resolveWorkingPath(GIT_HOOK),
    GIT_COMMIT_MSG: resolveWorkingPath(GIT_COMMIT_EDITMSG),
    SIMPLE_GIT_HOOKS_JSON: resolveWorkingPath(SIMPLE_GIT_HOOK_JSON),
    PACKAGE_JSON: resolveWorkingPath(PACKAGE_JSON),
    PACKAGE_LOCK_JSON: resolveWorkingPath(PACKAGE_LOCK_JSON),
    PNPM_LOCK_YAML: resolveWorkingPath(PNPM_LOCK_YAML),
    NODE_MODULES: resolveWorkingPath(NODE_MODULES),
    MIGRATE_MONGO_CONFIG: resolveWorkingPath(MIGRATE_MONGO_CONFIG),
    LINT_STAGED_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/config/lint-staged/index.js`),
    COMMITLINT_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/config/commitlint/index.js`),
    VITEST_UNIT_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/config/vitest/vitest.unit.js`),
    VITEST_UNIT_SETUP_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/config/vitest/vitest.unit.setup.js`),
    VITEST_E2E_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/config/vitest/vitest.e2e.js`),
};

export function createGitHooksConfig({ isCurrentProject }: Partial<I_CommandContext>) {
    return {
        'pre-commit': LINT_STAGED_CLI,
        'commit-msg': COMMIT_LINT_CLI,
        ...(isCurrentProject && { 'pre-push': rawCommand(`${GIT_CLI} pull`) }),
    };
}

function buildCommand({ type, packages, command }: { type: E_CommandType; packages?: I_PackageInput[]; command: string }): () => Promise<string> {
    const uniquePackages = packages?.reduce((acc: I_PackageInput[], pkg) => {
        if (!acc.some(existingPkg => existingPkg.name === pkg.name)) {
            acc.push(pkg);
        }
        return acc;
    }, []);

    return async () => {
        switch (type) {
            case E_CommandType.CLI: {
                if (uniquePackages?.length) {
                    await setupPackages(uniquePackages, {
                        install: true,
                    });
                }

                return formatCommand(rawCommand(`${PNPM_EXEC_CLI} ${command}`)) as string;
            }
            case E_CommandType.STRING: {
                return formatCommand(rawCommand(command)) as string;
            }
            default: {
                throw new Error('Unsupported command type');
            }
        }
    };
}

export const command = {
    simpleGitHooks: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: SIMPLE_GIT_HOOKS_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },

        ],
        command: SIMPLE_GIT_HOOK_CLI,
    }),
    eslintInspect: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name:
                    ESLINT_INSPECT_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },

        ],
        command: ESLINT_INSPECT_CLI,
    }),
    nodeModulesInspect: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: NODE_MODULES_INSPECT_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },

        ],
        command: NODE_MODULES_INSPECT_CLI,
    }),
    eslintCheck: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: ESLINT_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },

        ],
        command: `${ESLINT_CLI} ${PATH.WORKING_DIRECTORY} --no-cache`,
    }),
    eslintFix: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: ESLINT_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },

        ],
        command: `${ESLINT_CLI} ${PATH.WORKING_DIRECTORY} --fix --no-cache`,
    }),
    typescriptCheck: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: TSC_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },

        ],
        command: `${TSC_CLI} -p ${PATH.TS_CONFIG} --noEmit`,
    }),
    testUnit: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: VITEST_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },
        ],
        command: `${VITEST_CLI} --config ${PATH.VITEST_UNIT_CONFIG}`,
    }),
    testE2e: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: VITEST_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },
        ],
        command: `${VITEST_CLI} --config ${PATH.VITEST_E2E_CONFIG}`,
    }),
    mongoMigrateCreate: (migrateName: string) => buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: TSX_CLI,
                type: E_PackageType.DEPENDENCY,
            },
            {
                name: MIGRATE_MONGO_PACKAGE_NAME,
                type: E_PackageType.DEPENDENCY,
            },
        ],
        command: `${TSX_CLI} ${MIGRATE_MONGO_CLI} create ${migrateName} -f ${PATH.MIGRATE_MONGO_CONFIG}`,
    })(),
    mongoMigrateUp: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: TSX_CLI,
                type: E_PackageType.DEPENDENCY,
            },
            {
                name: MIGRATE_MONGO_PACKAGE_NAME,
                type: E_PackageType.DEPENDENCY,
            },
        ],
        command: `${TSX_CLI} ${MIGRATE_MONGO_CLI} up -f ${PATH.MIGRATE_MONGO_CONFIG}`,
    }),
    mongoMigrateDown: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: TSX_CLI,
                type: E_PackageType.DEPENDENCY,
            },
            {
                name: MIGRATE_MONGO_PACKAGE_NAME,
                type: E_PackageType.DEPENDENCY,
            },
        ],
        command: `${TSX_CLI} ${MIGRATE_MONGO_CLI} down -f ${PATH.MIGRATE_MONGO_CONFIG}`,
    }),
    commitLint: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: COMMIT_LINT_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },
            {
                name: COMMIT_LINT_CONVENTIONAL_CONFIG_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },
        ],
        command: `${COMMIT_LINT_CLI} --edit ${PATH.GIT_COMMIT_MSG} --config ${PATH.COMMITLINT_CONFIG}`,
    }),
    lintStaged: buildCommand({
        type: E_CommandType.CLI,
        packages: [
            {
                name: LINT_STAGED_PACKAGE_NAME,
                type: E_PackageType.DEV_DEPENDENCY,
            },
        ],
        command: `${LINT_STAGED_CLI} --config ${PATH.LINT_STAGED_CONFIG}`,
    }),
    configureGitHook: buildCommand({
        type: E_CommandType.STRING,
        command: `${GIT_CLI} config core.hooksPath ${PATH.GIT_HOOK}`,
    }),
    build: buildCommand({
        type: E_CommandType.STRING,
        command: `${PNPM_CLI} run --if-present build`,
    }),
    pnpmInstallStandard: buildCommand({
        type: E_CommandType.STRING,
        command: `${PNPM_CLI} install --ignore-scripts`,
    }),
    pnpmInstallLegacy: buildCommand({
        type: E_CommandType.STRING,
        command: `${PNPM_CLI} install --ignore-scripts --legacy-peer-deps`,
    }),
    pnpmInstallForce: buildCommand({
        type: E_CommandType.STRING,
        command: `${PNPM_CLI} install --ignore-scripts --force`,
    }),
    pnpmPruneStore: buildCommand({
        type: E_CommandType.STRING,
        command: `${PNPM_CLI} store prune`,
    }),
    pnpmCleanCache: buildCommand({
        type: E_CommandType.STRING,
        command: `${PNPM_CLI} cache delete`,
    }),
};
