#!/usr/bin/env node
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { PROJECT_ROOT, WORKING_DIRECTORY } from './constants/index.js';
import { clearAllErrorLists } from './utils/command-error.js';
import { log } from './utils/command-log.js';
import { executeCommand } from './utils/command.js';
import { isCurrentProject, isPackageOutdated, updatePackage } from './utils/npm-package.js';

const config = {
    TS_CONFIG_PATH: path.join(WORKING_DIRECTORY, 'tsconfig.json'),
    HUSKY_PATH: path.join(WORKING_DIRECTORY, '.husky'),
    GIT_HOOK_PATH: path.join(WORKING_DIRECTORY, '.git', 'hooks'),
    GIT_COMMIT_MSG: path.join(WORKING_DIRECTORY, '.git', 'COMMIT_EDITMSG'),
    SIMPLE_GIT_HOOKS_PATH: path.join(WORKING_DIRECTORY, '.simple-git-hooks.json'),
    PACKAGE_NAME: '@cyberskill/shared',

    LINT_STAGED_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/lint-staged/base.js'),
    COMMITLINT_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/commitlint/base.js'),
    UNIT_TEST_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/vitest/react/unit.js'),
    E2E_TEST_CONFIG_PATH: path.resolve(PROJECT_ROOT, './configs/vitest/react/e2e.js'),
};

// ✅ Utility to check if file exists
const fileExists = (filePath: string): boolean => fs.existsSync(filePath);

// ✅ Dynamic Step Counter
let currentStep = 0;
let totalSteps = 1;

function resetSteps(stepCount: number) {
    totalSteps = Math.max(1, stepCount); // Ensure minimum 1 step
    currentStep = 0;
}

function nextStep(description: string) {
    currentStep = Math.min(currentStep + 1, totalSteps);
    log.step(currentStep, totalSteps, description);
}

// ✅ TypeScript Check
async function checkTypescript(): Promise<void> {
    nextStep('Starting TypeScript check');
    if (fileExists(config.TS_CONFIG_PATH)) {
        await executeCommand(`npx tsc -p ${config.TS_CONFIG_PATH} --noEmit`);
    }
    else {
        log.warning('tsconfig.json file not found. Skipping TypeScript check.');
    }
}

// ✅ ESLint Check
async function checkEslint(fix = false): Promise<void> {
    nextStep(`Starting ESLint ${fix ? 'fix' : 'check'}`);
    const command = `npx eslint ${WORKING_DIRECTORY}${fix ? ' --fix' : ''}`;
    await executeCommand(command);
}

// ✅ Lint Staged Files
async function runLintStaged(): Promise<void> {
    resetSteps(1);
    nextStep('Starting lint-staged process');
    await executeCommand(`npx lint-staged --config ${config.LINT_STAGED_CONFIG_PATH}`);
}

// ✅ Lint Inspect
async function inspectLint(): Promise<void> {
    resetSteps(1);
    nextStep('Inspecting lint rules');
    await executeCommand(`npx @eslint/config-inspector`);
}

// ✅ Full Lint Check
async function lintCheck(): Promise<void> {
    resetSteps(2);
    await clearAllErrorLists();
    await checkTypescript();
    await checkEslint();
    await log.displayResults();
}

// ✅ Commit Lint
async function commitLint(): Promise<void> {
    nextStep('Running commit lint');
    await executeCommand(`npx --no -- commitlint --edit ${config.GIT_COMMIT_MSG} --config ${config.COMMITLINT_CONFIG_PATH}`);
}

// ✅ Setup Git Hooks
async function setupGitHook(): Promise<void> {
    resetSteps(2);
    nextStep('Setting up Git hooks');

    if (fileExists(config.HUSKY_PATH)) {
        await executeCommand(
            `npx rimraf ${config.HUSKY_PATH} ${config.GIT_HOOK_PATH} && git config core.hooksPath ${config.GIT_HOOK_PATH}`,
        );
    }

    const isCurrent = isCurrentProject(WORKING_DIRECTORY, config.PACKAGE_NAME);

    const hooksConfig = {
        'pre-commit': isCurrent
            ? `bash -c "npm run build && npx --yes cyberskill lint-staged"`
            : 'npx --yes cyberskill lint-staged',
        'commit-msg': 'npx --yes cyberskill commitlint',
    };

    fs.writeFileSync(config.SIMPLE_GIT_HOOKS_PATH, JSON.stringify(hooksConfig, null, 4));
    await executeCommand(`npx simple-git-hooks`);
    log.success('Git hooks configured successfully.');
    fs.unlinkSync(config.SIMPLE_GIT_HOOKS_PATH);
}

// ✅ Setup Project
async function setupProject(): Promise<void> {
    resetSteps(2);
    nextStep('Starting project setup');
    const packageJsonPath = path.join(WORKING_DIRECTORY, 'package.json');

    try {
        if (!fileExists(packageJsonPath)) {
            log.error('package.json not found. Setup aborted.');

            return;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        if (!isCurrentProject(WORKING_DIRECTORY, config.PACKAGE_NAME)) {
            if (!packageJson.dependencies?.[config.PACKAGE_NAME] || (await isPackageOutdated(config.PACKAGE_NAME))) {
                log.info('Updating Cyberskill package...');
                await updatePackage(config.PACKAGE_NAME);
            }
            else {
                log.success('Cyberskill is up to date.');
            }
        }
        else {
            log.success('Cyberskill is already installed.');
        }

        await setupGitHook();
    }
    catch (error) {
        log.error(`Error reading package.json: ${(error as Error).message}`);
        throw error;
    }
}

// ✅ Test Unit
async function testUnit(): Promise<void> {
    resetSteps(1);
    nextStep('Running unit tests');
    await executeCommand(`npx vitest --config ${config.UNIT_TEST_CONFIG_PATH}`);
}

// ✅ Test E2E
async function testE2E(): Promise<void> {
    resetSteps(1);
    nextStep('Running e2e tests');
    await executeCommand(`npx vitest --config ${config.E2E_TEST_CONFIG_PATH}`);
}

// ✅ Register Commands
yargs(hideBin(process.argv))
    .command('lint', 'Run linting checks', lintCheck)
    .command('lint:fix', 'Fix linting issues', () => checkEslint(true))
    .command('lint:inspect', 'Inspect linting rules', inspectLint)
    .command('lint-staged', 'Run lint-staged', runLintStaged)
    .command('commitlint', 'Run commitlint', commitLint)
    .command('setup', 'Run project setup', setupProject)
    .command('reset', 'Reset project dependencies', async () => {
        resetSteps(1);
        nextStep('Starting project reset');
        await executeCommand(`npx rimraf ${WORKING_DIRECTORY}/node_modules ${WORKING_DIRECTORY}/package-lock.json`);
        await executeCommand('npm i -f');
        await setupGitHook();
    })
    .command('test:unit', 'Run unit tests', testUnit)
    .command('test:e2e', 'Run e2e tests', testE2E)
    .help()
    .parse();
