#!/usr/bin/env node
import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { DIRNAME } from './constants/index.js';
import {
    E_SpinnerMessage,
} from './typescript/command.js';
import { clearAllErrorLists } from './utils/command-error.js';
import { displayResults } from './utils/command-log.js';
import { runWithSpinner } from './utils/command-spinner.js';
import { executeCommand, logProcessStep } from './utils/command.js';
import { isCurrentProject, isPackageOutdated, updatePackage } from './utils/npm-package.js';

const INIT_CWD = process.env.INIT_CWD || process.cwd();

const config = {
    INIT_CWD,
    TS_CONFIG_PATH: `${INIT_CWD}/tsconfig.json`,
    HUSKY_PATH: `${INIT_CWD}/.husky`,
    GIT_HOOK_PATH: `${INIT_CWD}/.git/hooks`,
    GIT_COMMIT_MSG: `${INIT_CWD}/.git/COMMIT_EDITMSG`,
    SIMPLE_GIT_HOOKS_PATH: `${INIT_CWD}/.simple-git-hooks.json`,
    PACKAGE_NAME: '@cyberskill/shared',
};

async function runTypescript(): Promise<void> {
    if (fs.existsSync(config.TS_CONFIG_PATH)) {
        await executeCommand(
            `npx tsc -p ${config.TS_CONFIG_PATH} --noEmit`,
            'TypeScript checking...',
        );
    }
    else {
        logProcessStep('tsconfig.json file not found.', '⚠️');
    }
}

async function runEslint(fix = false): Promise<void> {
    const command = `npx eslint ${config.INIT_CWD}${fix ? ' --fix' : ' --format json'}`;
    await executeCommand(command, `Eslint ${fix ? 'fixing' : 'checking'}...`);
}

async function runLintStaged(): Promise<void> {
    const configPath = path.resolve(DIRNAME, './configs/lint-staged/base.js');

    const command = `npx lint-staged --config ${configPath}`;
    await executeCommand(command, `Lint-staged processing...`);
}

async function performLintCheck(): Promise<void> {
    logProcessStep(`Starting lint check for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.LintCheck, async () => {
        await clearAllErrorLists();
        await Promise.all([runTypescript(), runEslint()]);
        displayResults();
    });
}

async function performLintFix(): Promise<void> {
    logProcessStep(`Starting lint and format fix for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.LintFix, async () => {
        await runEslint(true);
    });
}

async function performLintInspect(): Promise<void> {
    const command = `npx @eslint/config-inspector`;
    await executeCommand(command, `Lint inspect processing...`);
}

async function performLintStaged(): Promise<void> {
    logProcessStep(
        `Starting lint-staged process for ${process.env.INIT_CWD}`,
        '🚀',
    );
    await runWithSpinner(E_SpinnerMessage.LintStaged, async () => {
        await clearAllErrorLists();
        await Promise.all([runTypescript(), runLintStaged()]);
        displayResults();
    });
}

async function performCommitlint(): Promise<void> {
    logProcessStep(`Starting commitlint process for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.CommitLint, async () => {
        await clearAllErrorLists();
        const configPath = path.resolve(DIRNAME, './configs/commitlint/base.js');
        const command = `npx --no -- commitlint --edit ${config.GIT_COMMIT_MSG} --config ${configPath}`;
        await executeCommand(command, `Commitlint processing...`);
        displayResults();
    });
}

async function setupGitHook(): Promise<void> {
    if (fs.existsSync(config.HUSKY_PATH)) {
        await executeCommand(
            `npx rimraf ${config.HUSKY_PATH} ${config.GIT_HOOK_PATH} && git config core.hooksPath ${config.GIT_HOOK_PATH}`,
            'Removing husky hooks...',
        );
    }

    const isCurrent = isCurrentProject(config.INIT_CWD, config.PACKAGE_NAME);

    fs.writeFileSync(
        config.SIMPLE_GIT_HOOKS_PATH,
        JSON.stringify(
            {
                'pre-commit': `${isCurrent ? `npm run build && ` : ''}npx --yes cyberskill lint-staged`,
                'commit-msg': 'npx --yes cyberskill commitlint',
            },
            null,
            4,
        ),
    );

    await executeCommand(`npx simple-git-hooks`, 'Setting up git hooks...');

    if (fs.existsSync(config.SIMPLE_GIT_HOOKS_PATH)) {
        try {
            fs.unlinkSync(config.SIMPLE_GIT_HOOKS_PATH);
        }
        catch (error) {
            console.error('Failed to unlink git hooks config:', error);
        }
    }
}

async function performSetup(): Promise<void> {
    logProcessStep(`Starting setup process for ${config.INIT_CWD}`, '🚀');

    await runWithSpinner(E_SpinnerMessage.Setup, async () => {
        const packageJsonPath = path.join(config.INIT_CWD, 'package.json');

        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

            if (!isCurrentProject(config.INIT_CWD, config.PACKAGE_NAME)) {
                if (
                    !packageJson.dependencies?.[config.PACKAGE_NAME]
                    || (await isPackageOutdated(config.PACKAGE_NAME))
                ) {
                    logProcessStep(`Cyberskill is missing or outdated. Updating...`);
                    await updatePackage(config.PACKAGE_NAME);
                }
                else {
                    logProcessStep(`Cyberskill is up to date`, '✅');
                }
            }
            else {
                logProcessStep(`Cyberskill is the current project. No setup needed.`, '✅');
            }
            await setupGitHook();
        }
        catch (error) {
            console.error(`Error reading package.json: ${(error as Error).message}`);
            throw error;
        }
    });
}

async function performReset(): Promise<void> {
    logProcessStep(`Starting reset process for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.Reset, async () => {
        await executeCommand(
            `npx rimraf ${config.INIT_CWD}/node_modules ${config.INIT_CWD}/package-lock.json`,
            'Cleaning node_modules and package-lock.json...',
        );
        await executeCommand('npm i -f', 'Installing all dependencies...');

        setupGitHook();
    });
}

async function performTestUnit(): Promise<void> {
    const configPath = path.resolve(DIRNAME, './configs/vitest/react/unit.js');

    logProcessStep(`Starting unit tests for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.UnitTest, async () => {
        await executeCommand(`npx vitest --config ${configPath}`, 'Running unit tests...');
    });
}

async function performTestE2E(): Promise<void> {
    const configPath = path.resolve(DIRNAME, './configs/vitest/react/e2e.js');

    logProcessStep(`Starting e2e tests for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.E2ETest, async () => {
        await executeCommand(`npx vitest --config ${configPath}`, 'Running e2e tests...');
    });
}

yargs(hideBin(process.argv))
    .command('lint', 'Run linting checks', performLintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', performLintFix)
    .command('lint:inspect', 'Inspect linting rules', performLintInspect)
    .command(
        'lint-staged',
        'Run lint-staged with given configuration',
        performLintStaged,
    )
    .command('commitlint', 'Run commitlint with given configuration', performCommitlint)
    .command('setup', 'Run setup with given configuration', performSetup)
    .command('reset', 'Reset dependencies and install', performReset)
    .command('test:unit', 'Run unit tests', performTestUnit)
    .command('test:e2e', 'Run e2e tests', performTestE2E)
    .help()
    .parse();
