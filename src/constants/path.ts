import process from 'node:process';
import { fileURLToPath } from 'node:url';

import type { I_CommandContext } from '#typescript/command.js';

import { commandFormatter } from '#utils/command.js';
import { dirname, resolve, resolveCyberSkillPath, resolveWorkingPath } from '#utils/path.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CYBERSKILL_DIRECTORY = resolve(__dirname, '../../');
export const WORKING_DIRECTORY = process.env.INIT_CWD || process.cwd();

export const CYBERSKILL_PACKAGE_NAME = '@cyberskill/shared';
export const CYBERSKILL_STORAGE = '.cyberskill-storage';
export const NODE_MODULES = 'node_modules';
export const BUILD_DIRECTORY = 'dist';
export const PACKAGE_JSON = 'package.json';
export const PACKAGE_LOCK_JSON = 'package-lock.json';
export const TSCONFIG_JSON = 'tsconfig.json';
export const GIT_IGNORE = '.gitignore';
export const SIMPLE_GIT_HOOK_JSON = '.simple-git-hooks.json';
export const PNPM_LOCK_YAML = 'pnpm-lock.yaml';
export const GIT_HOOK = '.git/hooks';
export const GIT_COMMIT_EDITMSG = '.git/COMMIT_EDITMSG';

export const CYBERSKILL_CLI = 'cyberskill';
export const ESLINT_CLI = 'eslint';
export const VITEST_CLI = 'vitest';
export const COMMIT_LINT_CLI = 'commitlint';
export const LINT_STAGED_CLI = 'lint-staged';
export const RIMRAF_CLI = 'rimraf';
export const TSC_CLI = 'tsc';
export const TSX_CLI = 'tsx';
export const GIT_CLI = 'git';
export const PNPM_CLI = 'pnpm';
export const PNPM_DLX_CLI = 'pnpm dlx';
export const PNPM_EXEC_CLI = 'pnpm exec';
export const SIMPLE_GIT_HOOK_CLI = 'simple-git-hooks';
export const ESLINT_INSPECT_CLI = '@eslint/config-inspector';
export const NODE_MODULES_INSPECT_CLI = 'node_modules-inspect';

export const PATH = {
    CYBERSKILL_DIRECTORY,
    WORKING_DIRECTORY,
    TS_CONFIG: resolveWorkingPath(TSCONFIG_JSON),
    GIT_IGNORE: resolveWorkingPath(GIT_IGNORE),
    GIT_HOOK: resolveWorkingPath(GIT_HOOK),
    GIT_COMMIT_MSG: resolveWorkingPath(GIT_COMMIT_EDITMSG),
    SIMPLE_GIT_HOOKS: resolveWorkingPath(SIMPLE_GIT_HOOK_JSON),
    PACKAGE_JSON: resolveWorkingPath(PACKAGE_JSON),
    PACKAGE_LOCK_JSON: resolveWorkingPath(PACKAGE_LOCK_JSON),
    PNPM_LOCK_YAML: resolveWorkingPath(PNPM_LOCK_YAML),
    NODE_MODULES: resolveWorkingPath(NODE_MODULES),
    CYBERSKILL: {
        LINT_STAGED_CONFIG: resolveCyberSkillPath('./configs/lint-staged/base.js'),
        COMMITLINT_CONFIG: resolveCyberSkillPath('./configs/commitlint/base.js'),
        UNIT_TEST_CONFIG: resolveCyberSkillPath('./configs/vitest/react/unit.js'),
        E2E_TEST_CONFIG: resolveCyberSkillPath('./configs/vitest/react/e2e.js'),
    },
};

export function HOOK({ isCurrentProject }: Partial<I_CommandContext>) {
    return {
        'postinstall': 'setup',
        'pre-commit': LINT_STAGED_CLI,
        'commit-msg': COMMIT_LINT_CLI,
        ...(isCurrentProject && { 'pre-push': commandFormatter.raw(`${GIT_CLI} pull`) }),
    };
}

export const COMMAND = {
    SIMPLE_GIT_HOOKS: commandFormatter.raw(`${PNPM_EXEC_CLI} ${SIMPLE_GIT_HOOK_CLI}`),
    ESLINT_INSPECT: commandFormatter.raw(`${PNPM_EXEC_CLI} ${ESLINT_INSPECT_CLI}`),
    NODE_MODULES_INSPECT: commandFormatter.raw(`${PNPM_EXEC_CLI} ${NODE_MODULES_INSPECT_CLI}`),
    RESET: commandFormatter.raw(`${PNPM_EXEC_CLI} ${RIMRAF_CLI} ${NODE_MODULES} ${PNPM_LOCK_YAML}`),
    ESLINT_CHECK: commandFormatter.raw(`${PNPM_EXEC_CLI} ${ESLINT_CLI} ${PATH.WORKING_DIRECTORY}`),
    ESLINT_FIX: commandFormatter.raw(`${PNPM_EXEC_CLI} ${ESLINT_CLI} ${PATH.WORKING_DIRECTORY} --fix`),
    TYPESCRIPT_CHECK: commandFormatter.raw(`${PNPM_EXEC_CLI} ${TSC_CLI} -p ${PATH.TS_CONFIG} --noEmit`),
    CYBERSKILL: {
        TEST_UNIT: commandFormatter.raw(`${PNPM_EXEC_CLI} ${VITEST_CLI} --config ${PATH.CYBERSKILL.UNIT_TEST_CONFIG}`),
        TEST_E2E: commandFormatter.raw(`${PNPM_EXEC_CLI} ${VITEST_CLI} --config ${PATH.CYBERSKILL.E2E_TEST_CONFIG}`),
        COMMIT_LINT: commandFormatter.raw(`${PNPM_EXEC_CLI} ${COMMIT_LINT_CLI} --edit ${PATH.GIT_COMMIT_MSG} --config ${PATH.CYBERSKILL.COMMITLINT_CONFIG}`),
        LINT_STAGED: commandFormatter.raw(`${PNPM_EXEC_CLI} ${LINT_STAGED_CLI} --config ${PATH.CYBERSKILL.LINT_STAGED_CONFIG}`),
    },
    CONFIGURE_GIT_HOOK: commandFormatter.raw(`${GIT_CLI} config core.hooksPath ${PATH.GIT_HOOK}`),
    BUILD: commandFormatter.raw(`${PNPM_CLI} run build`),
    STAGE_BUILD_DIRECTORY: commandFormatter.raw(`${GIT_CLI} add ${BUILD_DIRECTORY}`),
    PNPM_INSTALL_STANDARD: commandFormatter.raw(`${PNPM_CLI} install`),
    PNPM_INSTALL_LEGACY: commandFormatter.raw(`${PNPM_CLI} install --legacy-peer-deps`),
    PNPM_INSTALL_FORCE: commandFormatter.raw(`${PNPM_CLI} install --force`),
};
