import { getEnv } from '#configs/env/index.js';

import type { I_CommandContext } from '../command/index.js';

import { E_CommandType, formatCommand, rawCommand } from '../command/index.js';
import { setupPackages } from '../package/index.js';
import { join, resolveWorkingPath } from './path.util.js';

const env = getEnv();

export const WORKING_DIRECTORY = env.CWD;
export const CYBERSKILL_PACKAGE_NAME = '@cyberskill/shared';
export const NODE_MODULES = 'node_modules';
export const BUILD_DIRECTORY = 'dist';
export const PACKAGE_JSON = 'package.json';
export const PACKAGE_LOCK_JSON = 'package-lock.json';
export const TSCONFIG_JSON = 'tsconfig.json';
export const GIT_IGNORE = '.gitignore';
export const SIMPLE_GIT_HOOK_JSON = '.simple-git-hooks.json';
export const PNPM_LOCK_YAML = 'pnpm-lock.yaml';
export const GIT_HOOK = '.git/hooks/';
export const GIT_COMMIT_EDITMSG = '.git/COMMIT_EDITMSG';
export const MIGRATE_MONGO_CONFIG = '.migrate-mongo.config.js';
export const CYBERSKILL_DIRECTORY = join(WORKING_DIRECTORY, NODE_MODULES, CYBERSKILL_PACKAGE_NAME, BUILD_DIRECTORY);

export const CYBERSKILL_CLI = 'cyberskill';
export const CYBERSKILL_CLI_PATH = 'src/nodejs/cli/index.ts';
export const ESLINT_PACKAGE_NAME = 'eslint';
export const ESLINT_CLI = 'eslint';
export const VITEST_PACKAGE_NAME = 'vitest';
export const PLAYWRIGHT_PACKAGE_NAME = 'playwright';
export const VITEST_CLI = 'vitest';
export const COMMIT_LINT_PACKAGE_NAME = '@commitlint/cli';
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
    LINT_STAGED_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/configs/lint-staged/index.js`),
    COMMITLINT_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/configs/commitlint/index.js`),
    UNIT_TEST_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/react/vitest/vitest.unit.js`),
    UNIT_TEST_SETUP_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/react/vitest/vitest.unit.setup.js`),
    E2E_TEST_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/react/vitest/vitest.e2e.js`),
};

export function createGitHooksConfig({ isCurrentProject }: Partial<I_CommandContext>) {
    return {
        'pre-commit': LINT_STAGED_CLI,
        'commit-msg': COMMIT_LINT_CLI,
        ...(isCurrentProject && { 'pre-push': rawCommand(`${GIT_CLI} pull`) }),
    };
}

async function buildCommand(type: E_CommandType, first: string, second?: string): Promise<string> {
    if (!first) {
        throw new Error('\'first\' argument is undefined');
    }

    switch (type) {
        case E_CommandType.CLI: {
            await setupPackages(first.split(' '), {
                update: true,
            });
            return formatCommand(rawCommand(`${PNPM_EXEC_CLI} ${second}`)) as string;
        }
        case E_CommandType.STRING: {
            return formatCommand(rawCommand(first)) as string;
        }
        default: {
            throw new Error('Unsupported command type');
        }
    }
}

function commandFactory(type: E_CommandType, first: string, second?: string): () => Promise<string> {
    return async () => buildCommand(type, first, second);
}

export const command = {
    simpleGitHooks: commandFactory(E_CommandType.CLI, SIMPLE_GIT_HOOKS_PACKAGE_NAME, SIMPLE_GIT_HOOK_CLI),
    eslintInspect: commandFactory(E_CommandType.CLI, ESLINT_INSPECT_PACKAGE_NAME, ESLINT_INSPECT_CLI),
    nodeModulesInspect: commandFactory(E_CommandType.CLI, NODE_MODULES_INSPECT_PACKAGE_NAME, NODE_MODULES_INSPECT_CLI),
    eslintCheck: commandFactory(E_CommandType.CLI, ESLINT_PACKAGE_NAME, `${ESLINT_CLI} ${PATH.WORKING_DIRECTORY}`),
    eslintFix: commandFactory(E_CommandType.CLI, ESLINT_PACKAGE_NAME, `${ESLINT_CLI} ${PATH.WORKING_DIRECTORY} --fix`),
    typescriptCheck: commandFactory(E_CommandType.CLI, TSC_PACKAGE_NAME, `${TSC_CLI} -p ${PATH.TS_CONFIG} --noEmit`),
    configureGitHook: commandFactory(E_CommandType.STRING, `${GIT_CLI} config core.hooksPath ${PATH.GIT_HOOK}`),
    testUnit: commandFactory(E_CommandType.CLI, VITEST_PACKAGE_NAME, `${VITEST_CLI} --config ${PATH.UNIT_TEST_CONFIG}`),
    testE2e: commandFactory(E_CommandType.CLI, `${VITEST_PACKAGE_NAME} ${PLAYWRIGHT_PACKAGE_NAME}`, `${VITEST_CLI} --config ${PATH.E2E_TEST_CONFIG}`),
    mongoMigrateCreate: (migrateName: string) => commandFactory(E_CommandType.CLI, MIGRATE_MONGO_PACKAGE_NAME, `${TSX_CLI} ${MIGRATE_MONGO_CLI} create ${migrateName} -f ${PATH.MIGRATE_MONGO_CONFIG}`)(),
    mongoMigrateUp: commandFactory(E_CommandType.CLI, MIGRATE_MONGO_PACKAGE_NAME, `${TSX_CLI} ${MIGRATE_MONGO_CLI} up -f ${PATH.MIGRATE_MONGO_CONFIG}`),
    mongoMigrateDown: commandFactory(E_CommandType.CLI, MIGRATE_MONGO_PACKAGE_NAME, `${TSX_CLI} ${MIGRATE_MONGO_CLI} down -f ${PATH.MIGRATE_MONGO_CONFIG}`),
    commitLint: commandFactory(E_CommandType.CLI, COMMIT_LINT_PACKAGE_NAME, `${COMMIT_LINT_CLI} --edit ${PATH.GIT_COMMIT_MSG} --config ${PATH.COMMITLINT_CONFIG}`),
    lintStaged: commandFactory(E_CommandType.CLI, LINT_STAGED_PACKAGE_NAME, `${LINT_STAGED_CLI} --config ${PATH.LINT_STAGED_CONFIG}`),
    stageBuildDirectory: commandFactory(E_CommandType.STRING, `${GIT_CLI} add ${BUILD_DIRECTORY}`),
    build: commandFactory(E_CommandType.STRING, `${PNPM_CLI} run build`),
    pnpmInstallStandard: commandFactory(E_CommandType.STRING, `${PNPM_CLI} install`),
    pnpmInstallLegacy: commandFactory(E_CommandType.STRING, `${PNPM_CLI} install --legacy-peer-deps`),
    pnpmInstallForce: commandFactory(E_CommandType.STRING, `${PNPM_CLI} install --force`),
};
