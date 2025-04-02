import process from 'node:process';

import type { I_CommandContext } from '#typescript/command.js';

import { rawCommand } from '#utils/command.js';
import { join, resolveWorkingPath } from '#utils/path.js';

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
export const GIT_HOOK = '.git/hooks/';
export const GIT_COMMIT_EDITMSG = '.git/COMMIT_EDITMSG';
export const CYBERSKILL_DIRECTORY = join(WORKING_DIRECTORY, NODE_MODULES, CYBERSKILL_PACKAGE_NAME, BUILD_DIRECTORY);

export const CYBERSKILL_CLI = 'cyberskill';
export const ESLINT_CLI = 'eslint';
export const VITEST_PACKAGE_NAME = 'vitest';
export const VITEST_CLI = 'vitest';
export const COMMIT_LINT_PACKAGE_NAME = '@commitlint/cli';
export const COMMIT_LINT_CLI = 'commitlint';
export const LINT_STAGED_PACKAGE_NAME = 'lint-staged';
export const LINT_STAGED_CLI = 'lint-staged';
export const TSC_PACKAGE_NAME = 'tsc';
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
    CYBERSKILL: {
        LINT_STAGED_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/configs/lint-staged/base.js`),
        COMMITLINT_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/configs/commitlint/base.js`),
        UNIT_TEST_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/configs/vitest/react/unit.js`),
        E2E_TEST_CONFIG: resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/configs/vitest/react/e2e.js`),
    },
};

export function HOOK({ isCurrentProject }: Partial<I_CommandContext>) {
    return {
        'pre-commit': LINT_STAGED_CLI,
        'commit-msg': COMMIT_LINT_CLI,
        ...(isCurrentProject && { 'pre-push': rawCommand(`${GIT_CLI} pull`) }),
    };
}

function pnpmAddAndExec(pkg: string, cli: string): ReturnType<typeof rawCommand> {
    return rawCommand(`${PNPM_CLI} add -D ${pkg} && ${PNPM_EXEC_CLI} ${cli}`);
}

function pnpmExecCommand(cli: string, args: string = ''): ReturnType<typeof rawCommand> {
    return rawCommand(`${PNPM_EXEC_CLI} ${cli} ${args}`.trim());
}

export const COMMAND = {
    SIMPLE_GIT_HOOKS: pnpmAddAndExec(SIMPLE_GIT_HOOKS_PACKAGE_NAME, SIMPLE_GIT_HOOK_CLI),
    ESLINT_INSPECT: pnpmAddAndExec(ESLINT_INSPECT_PACKAGE_NAME, ESLINT_INSPECT_CLI),
    NODE_MODULES_INSPECT: pnpmAddAndExec(NODE_MODULES_INSPECT_PACKAGE_NAME, NODE_MODULES_INSPECT_CLI),
    ESLINT_CHECK: pnpmExecCommand(ESLINT_CLI, PATH.WORKING_DIRECTORY),
    ESLINT_FIX: pnpmExecCommand(ESLINT_CLI, `${PATH.WORKING_DIRECTORY} --fix`),
    TYPESCRIPT_CHECK: pnpmAddAndExec(
        TSC_PACKAGE_NAME,
        `${TSC_CLI} -p ${PATH.TS_CONFIG} --noEmit`,
    ),
    CONFIGURE_GIT_HOOK: rawCommand(`${GIT_CLI} config core.hooksPath ${PATH.GIT_HOOK}`),
    BUILD: rawCommand(`${PNPM_CLI} run build`),
    STAGE_BUILD_DIRECTORY: rawCommand(`${GIT_CLI} add ${BUILD_DIRECTORY}`),
    PNPM_INSTALL_STANDARD: rawCommand(`${PNPM_CLI} install`),
    PNPM_INSTALL_LEGACY: rawCommand(`${PNPM_CLI} install --legacy-peer-deps`),
    PNPM_INSTALL_FORCE: rawCommand(`${PNPM_CLI} install --force`),
    CYBERSKILL: {
        TEST_UNIT: pnpmAddAndExec(VITEST_PACKAGE_NAME, `${VITEST_CLI} --config ${PATH.CYBERSKILL.UNIT_TEST_CONFIG}`),
        TEST_E2E: pnpmAddAndExec(VITEST_PACKAGE_NAME, `${VITEST_CLI} --config ${PATH.CYBERSKILL.E2E_TEST_CONFIG}`),
        COMMIT_LINT: pnpmAddAndExec(COMMIT_LINT_PACKAGE_NAME, `${COMMIT_LINT_CLI} --edit ${PATH.GIT_COMMIT_MSG} --config ${PATH.CYBERSKILL.COMMITLINT_CONFIG}`),
        LINT_STAGED: pnpmAddAndExec(LINT_STAGED_PACKAGE_NAME, `${LINT_STAGED_CLI} --config ${PATH.CYBERSKILL.LINT_STAGED_CONFIG}`),
    },
};
