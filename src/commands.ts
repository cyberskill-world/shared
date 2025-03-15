#!/usr/bin/env node
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { PROJECT_ROOT, WORKING_DIRECTORY } from './constants/dirname.js';
import { E_ErrorType } from './typescript/command.js';
import { clearAllErrorLists, commandLog, executeCommand, getStoredErrorLists } from './utils/command.js';
import { fileExists } from './utils/fs.js';
import { isCurrentProject, isPackageOutdated, updatePackage } from './utils/npm-package.js';

const config = {
    TS_CONFIG_PATH: path.resolve(WORKING_DIRECTORY, 'tsconfig.json'),
    HUSKY_PATH: path.resolve(WORKING_DIRECTORY, '.husky'),
    GIT_HOOK_PATH: path.resolve(WORKING_DIRECTORY, '.git/hooks'),
    GIT_COMMIT_MSG: path.resolve(WORKING_DIRECTORY, '.git/COMMIT_EDITMSG'),
    SIMPLE_GIT_HOOKS_PATH: path.resolve(WORKING_DIRECTORY, '.simple-git-hooks.json'),

    PACKAGE_JSON_PATH: path.resolve(WORKING_DIRECTORY, 'package.json'),
    PACKAGE_LOCK_PATH: path.resolve(WORKING_DIRECTORY, 'package-lock.json'),
    PACKAGE_NAME: '@cyberskill/shared',

    LINT_STAGED_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/lint-staged/base.js'),
    COMMITLINT_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/commitlint/base.js'),
    UNIT_TEST_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/vitest/react/unit.js'),
    E2E_TEST_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/vitest/react/e2e.js'),

    HOOKS_CONFIG: {
        'pre-commit': `npx --yes cyberskill lint-staged`,
        'commit-msg': `npx --yes cyberskill commitlint`,
    },
};

// ✅ Unified Execute Command with Logging
async function runCommand(description: string, command: string) {
    commandLog.info(`➡️  ${description}...`);
    await executeCommand(command);
    commandLog.success(`✅ ${description} completed.`);
}

// ✅ TypeScript Check
async function checkTypescript() {
    if (fileExists(config.TS_CONFIG_PATH)) {
        await runCommand('Running TypeScript check', `npx tsc -p ${config.TS_CONFIG_PATH} --noEmit`);
    }
    else {
        commandLog.warning('⚠️  TypeScript config not found. Skipping TypeScript check.');
    }
}

// ✅ ESLint Check
async function checkEslint(fix = false) {
    await runCommand(
        `Running ESLint ${fix ? '(with fix)' : '(without fix)'}`,
        `npx eslint ${WORKING_DIRECTORY}${fix ? ' --fix' : ''}`,
    );
}

// ✅ Lint Staged Files
async function lintStaged() {
    if (isCurrentProject(WORKING_DIRECTORY, config.PACKAGE_NAME)) {
        commandLog.info(`➡️  @cyberskill/shared detected. Building before lint-staged...`);

        try {
            await runCommand('Building @cyberskill/shared', 'npm run build');
            await executeCommand('git add dist');
            commandLog.success('✅ Built and staged @cyberskill/shared');
        }
        catch (error) {
            commandLog.error(`❌ Failed to build and stage @cyberskill/shared: ${(error as Error).message}`);
            throw error;
        }
    }

    await runCommand('Running lint-staged', `npx lint-staged --config ${config.LINT_STAGED_CONFIG_PATH}`);
}

// ✅ Lint Inspect
async function inspectLint() {
    await runCommand('Inspecting ESLint rules', 'npx @eslint/config-inspector');
}

// ✅ Full Lint Check
async function lintCheck() {
    await clearAllErrorLists();
    await Promise.all([checkTypescript(), checkEslint()]);
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
    commandLog.success('✅ Lint check completed.');
}

// ✅ Commit Lint
async function commitLint() {
    await runCommand('Running commit lint', `npx commitlint --edit ${config.GIT_COMMIT_MSG} --config ${config.COMMITLINT_CONFIG_PATH}`);
}

// ✅ Setup Project
async function setup() {
    commandLog.info('➡️  Starting project setup...');

    if (!fileExists(config.PACKAGE_JSON_PATH)) {
        commandLog.error('❌ package.json not found. Aborting setup.');
        return;
    }

    try {
        const packageJson = JSON.parse(fs.readFileSync(config.PACKAGE_JSON_PATH, 'utf-8'));

        const isUpToDate
            = isCurrentProject(WORKING_DIRECTORY, config.PACKAGE_NAME)
                || (packageJson.dependencies?.[config.PACKAGE_NAME]
                    && !(await isPackageOutdated(config.PACKAGE_NAME)));

        if (isUpToDate) {
            commandLog.success('✅ Cyberskill package is already up to date.');
        }
        else {
            commandLog.info('📦 Updating Cyberskill package...');
            await updatePackage(config.PACKAGE_NAME);
            commandLog.success('✅ Cyberskill package updated successfully.');
        }

        await setupGitHook();
        commandLog.success('✅ Project setup completed.');
    }
    catch (error) {
        commandLog.error(`❌ Failed to setup project: ${(error as Error).message}`);
        throw error;
    }
}

// ✅ Setup Git Hooks
async function setupGitHook() {
    commandLog.info('➡️  Setting up Git hooks...');

    if (fileExists(config.HUSKY_PATH)) {
        await executeCommand(`npx rimraf ${config.HUSKY_PATH} ${config.GIT_HOOK_PATH}`);
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
            commandLog.info('✅ Added .simple-git-hooks.json to .gitignore');
        }
        else {
            commandLog.info('✅ .simple-git-hooks.json is already ignored in .gitignore');
        }
    }
    else {
        fs.writeFileSync(gitignorePath, '# Ignore simple-git-hooks config\n.simple-git-hooks.json\n');
        commandLog.info('✅ Created .gitignore and added .simple-git-hooks.json');
    }

    await executeCommand(`npx simple-git-hooks`);

    commandLog.success(`✅ Git hooks configured successfully.`);
}

// ✅ Install Dependencies with Retry Strategy
async function installDependencies() {
    const strategies = [
        { command: 'npm install', message: 'Standard installation' },
        { command: 'npm install --legacy-peer-deps', message: 'Attempting installation with --legacy-peer-deps' },
        { command: 'npm install --force', message: 'Attempting forced installation' },
    ];

    for (const { command, message } of strategies) {
        try {
            commandLog.info(`➡️  ${message}...`);
            await executeCommand(command);
            commandLog.success(`✅ Dependencies installed using: ${command}`);
            return;
        }
        catch (error) {
            commandLog.warning(`⚠️  Failed with: ${command}`);
            commandLog.error(`❌ Error: ${(error as Error).message}`);
        }
    }

    throw new Error('❌ Failed to install dependencies after multiple attempts.');
}

// ✅ Reset Project
async function reset() {
    await runCommand(
        'Resetting project',
        `npx rimraf ${WORKING_DIRECTORY}/node_modules ${config.PACKAGE_LOCK_PATH}`,
    );
    await installDependencies();
    await setupGitHook();
}

// ✅ Run Unit Tests
async function testUnit() {
    await runCommand('Running unit tests', `npx vitest --config ${config.UNIT_TEST_CONFIG_PATH}`);
}

// ✅ Run E2E Tests
async function testE2E() {
    await runCommand('Running E2E tests', `npx vitest --config ${config.E2E_TEST_CONFIG_PATH}`);
}

// ✅ Register Commands
yargs(hideBin(process.argv))
    .command('lint', 'Run linting checks', lintCheck)
    .command('lint:fix', 'Fix linting issues', () => checkEslint(true))
    .command('lint:inspect', 'Inspect linting rules', inspectLint)
    .command('lint-staged', 'Run lint-staged', lintStaged)
    .command('commitlint', 'Run commitlint', commitLint)
    .command('setup', 'Run project setup', setup)
    .command('reset', 'Reset project dependencies', reset)
    .command('test:unit', 'Run unit tests', testUnit)
    .command('test:e2e', 'Run e2e tests', testE2E)
    .help()
    .parse();
