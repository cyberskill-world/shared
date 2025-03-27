#!/usr/bin/env node
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { PROJECT_ROOT, WORKING_DIRECTORY } from '#constants/path.js';
import { E_ErrorType } from '#typescript/command.js';
import { clearAllErrorLists, commandLog, executeCommand, getStoredErrorLists } from '#utils/command.js';
import { fileExists } from '#utils/fs.js';
import { installDependencies, isCurrentProject, isPackageOutdated, updatePackage } from '#utils/npm-package.js';

const config = {
    TS_CONFIG_PATH: path.resolve(WORKING_DIRECTORY, 'tsconfig.json'),
    HUSKY_PATH: path.resolve(WORKING_DIRECTORY, '.husky'),
    GIT_HOOK_PATH: path.resolve(WORKING_DIRECTORY, '.git/hooks'),
    GIT_COMMIT_MSG: path.resolve(WORKING_DIRECTORY, '.git/COMMIT_EDITMSG'),
    SIMPLE_GIT_HOOKS_PATH: path.resolve(WORKING_DIRECTORY, '.simple-git-hooks.json'),

    PACKAGE_JSON_PATH: path.resolve(WORKING_DIRECTORY, 'package.json'),
    PACKAGE_LOCK_PATH: path.resolve(WORKING_DIRECTORY, 'pnpm-lock.yaml'),
    PACKAGE_NAME: '@cyberskill/shared',

    LINT_STAGED_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/lint-staged/base.js'),
    COMMITLINT_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/commitlint/base.js'),
    UNIT_TEST_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/vitest/react/unit.js'),
    E2E_TEST_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/vitest/react/e2e.js'),

    HOOKS_CONFIG: {
        'pre-commit': `pnpm exec cyberskill lint-staged`,
        'commit-msg': `pnpm exec cyberskill commitlint`,
    },
};

async function runCommand(description: string, command: string) {
    commandLog.info(`${description}...`);
    await executeCommand(command);
    commandLog.success(`${description} completed.`);
}

async function checkTypescript() {
    if (fileExists(config.TS_CONFIG_PATH)) {
        await runCommand('Running TypeScript check', `pnpm exec tsc -p ${config.TS_CONFIG_PATH} --noEmit`);
    }
    else {
        commandLog.warning('TypeScript config not found. Skipping TypeScript check.');
    }
}

async function checkEslint(fix = false) {
    await runCommand(
        `Running ESLint ${fix ? '(with fix)' : '(without fix)'}`,
        `pnpm exec eslint ${WORKING_DIRECTORY}${fix ? ' --fix' : ''}`,
    );
}

async function showCheckResult() {
    const allResults = await getStoredErrorLists();
    const errors = allResults.filter(e => e.type === E_ErrorType.Error);
    const warnings = allResults.filter(e => e.type === E_ErrorType.Warning);

    if (!errors.length && !warnings.length) {
        commandLog.printBoxedLog('✔ NO ISSUES FOUND', '', {
            color: 'green',
        });
    }
    else {
        commandLog.printBoxedLog('⚠ Warnings', warnings, {
            color: 'yellow',
        });
        commandLog.printBoxedLog('✖ Errors', errors, {
            color: 'red',
        });
    }
}

async function lintStaged() {
    if (isCurrentProject(WORKING_DIRECTORY, config.PACKAGE_NAME)) {
        try {
            await runCommand('Building @cyberskill/shared', 'pnpm run build');
            await executeCommand('git add dist');
            commandLog.success('Built and staged @cyberskill/shared');
        }
        catch (error) {
            commandLog.error(`Failed to build and stage @cyberskill/shared: ${(error as Error).message}`);
            throw error;
        }
    }

    await runCommand('Running lint-staged', `pnpm exec lint-staged --config ${config.LINT_STAGED_CONFIG_PATH}`);
    showCheckResult();
}

async function inspectLint() {
    await runCommand('Inspecting ESLint rules', 'pnpm exec @eslint/config-inspector');
}

async function lintCheck() {
    await clearAllErrorLists();
    await Promise.all([checkTypescript(), checkEslint()]);

    showCheckResult();
}

async function lintFix() {
    await clearAllErrorLists();
    await Promise.all([checkTypescript(), checkEslint(true)]);
    showCheckResult();
}

async function commitLint() {
    await runCommand('Running commit lint', `pnpm exec commitlint --edit ${config.GIT_COMMIT_MSG} --config ${config.COMMITLINT_CONFIG_PATH}`);
    showCheckResult();
}

async function setup() {
    commandLog.info('Starting project setup...');

    if (!fileExists(config.PACKAGE_JSON_PATH)) {
        commandLog.error('package.json not found. Aborting setup.');
        return;
    }

    try {
        const packageJson = JSON.parse(fs.readFileSync(config.PACKAGE_JSON_PATH, 'utf-8'));

        const isUpToDate
            = isCurrentProject(WORKING_DIRECTORY, config.PACKAGE_NAME)
                || (packageJson.dependencies?.[config.PACKAGE_NAME]
                    && !(await isPackageOutdated(config.PACKAGE_NAME)));

        if (isUpToDate) {
            commandLog.success('Cyberskill package is already up to date.');
        }
        else {
            commandLog.info('📦 Updating Cyberskill package...');
            await updatePackage(config.PACKAGE_NAME);
            commandLog.success('Cyberskill package updated successfully.');
        }

        await setupGitHook();
        commandLog.success('Project setup completed.');
    }
    catch (error) {
        commandLog.error(`Failed to setup project: ${(error as Error).message}`);
        throw error;
    }
}

async function setupGitHook() {
    commandLog.info('Setting up Git hooks...');

    if (fileExists(config.HUSKY_PATH)) {
        await executeCommand(`pnpm exec rimraf ${config.HUSKY_PATH} ${config.GIT_HOOK_PATH}`);
        await executeCommand(`git config core.hooksPath ${config.GIT_HOOK_PATH}`);
    }

    fs.writeFileSync(
        config.SIMPLE_GIT_HOOKS_PATH,
        JSON.stringify(config.HOOKS_CONFIG, null, 4),
    );

    const gitignorePath = path.resolve('.gitignore');

    if (fileExists(gitignorePath)) {
        const gitignore = fs.readFileSync(gitignorePath, 'utf8').split('\n');

        if (!gitignore.includes('.simple-git-hooks.json')) {
            fs.appendFileSync(gitignorePath, '\n# Ignore simple-git-hooks config\n.simple-git-hooks.json\n');
            commandLog.info('Added .simple-git-hooks.json to .gitignore');
        }
        else {
            commandLog.info('.simple-git-hooks.json is already ignored in .gitignore');
        }
    }
    else {
        fs.writeFileSync(gitignorePath, '# Ignore simple-git-hooks config\n.simple-git-hooks.json\n');
        commandLog.info('Created .gitignore and added .simple-git-hooks.json');
    }

    await executeCommand(`pnpm exec simple-git-hooks`);

    commandLog.success(`Git hooks configured successfully.`);
}

async function reset() {
    await runCommand(
        'Resetting project',
        `pnpm exec rimraf ${WORKING_DIRECTORY}/node_modules ${config.PACKAGE_LOCK_PATH}`,
    );
    await installDependencies();
    await setupGitHook();
}

async function inspect() {
    await runCommand('Inspecting project dependencies', 'pnpm exec node-modules-inspector');
}

async function testUnit() {
    await runCommand('Running unit tests', `pnpm exec vitest --config ${config.UNIT_TEST_CONFIG_PATH}`);
}

async function testE2E() {
    await runCommand('Running E2E tests', `pnpm exec vitest --config ${config.E2E_TEST_CONFIG_PATH}`);
}

yargs(hideBin(process.argv))
    .command('lint', 'Run linting checks', lintCheck)
    .command('lint:fix', 'Fix linting issues', lintFix)
    .command('lint:inspect', 'Inspect linting rules', inspectLint)
    .command('lint-staged', 'Run lint-staged', lintStaged)
    .command('commitlint', 'Run commitlint', commitLint)
    .command('setup', 'Run project setup', setup)
    .command('reset', 'Reset project dependencies', reset)
    .command('inspect', 'Inspect project dependencies', inspect)
    .command('test:unit', 'Run unit tests', testUnit)
    .command('test:e2e', 'Run e2e tests', testE2E)
    .help()
    .parse();
