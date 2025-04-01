#!/usr/bin/env node
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import type { T_Command } from '#typescript/command.js';

import { COMMAND, CYBERSKILL_CLI, CYBERSKILL_PACKAGE_NAME, HOOK, PATH, SIMPLE_GIT_HOOK_JSON } from '#constants/path.js';
import { E_ErrorType } from '#typescript/command.js';
import { clearAllErrorLists, commandFormatter, commandLog, executeCommand, getStoredErrorLists, resolveCommands } from '#utils/command.js';
import { appendFileSync, existsSync, readFileSync, rmSync, writeFileSync } from '#utils/fs.js';
import { checkPackage } from '#utils/package.js';

async function runCommand(description: string, command: T_Command) {
    commandLog.info(`${description}...`);
    console.log('run', commandFormatter.format(command));
    await executeCommand(commandFormatter.format(command));
    commandLog.success(`${description} completed successfully.`);
}

async function checkTypescript() {
    if (existsSync(PATH.TS_CONFIG)) {
        await runCommand('Performing TypeScript validation', COMMAND.TYPESCRIPT_CHECK);
    }
    else {
        commandLog.warning('No TypeScript configuration found. Skipping type check.');
    }
}

async function checkEslint(fix = false) {
    if (fix) {
        await runCommand('Running ESLint with auto-fix', COMMAND.ESLINT_FIX);
    }
    else {
        await runCommand('Running ESLint check', COMMAND.ESLINT_CHECK);
    }
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
    const { isCurrentProject } = await checkPackage(CYBERSKILL_PACKAGE_NAME);

    if (isCurrentProject) {
        try {
            await runCommand(`Building package: ${CYBERSKILL_PACKAGE_NAME}`, COMMAND.BUILD);
            await runCommand('Staging build artifacts', COMMAND.STAGE_BUILD_DIRECTORY);
        }
        catch (error) {
            commandLog.error(`Error building and staging ${CYBERSKILL_PACKAGE_NAME}: ${(error as Error).message}`);
            throw error;
        }
    }

    await runCommand('Executing lint-staged', COMMAND.CYBERSKILL.LINT_STAGED);
    showCheckResult();
}

async function inspectLint() {
    await runCommand('Inspecting ESLint configuration', COMMAND.ESLINT_INSPECT);
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
    await runCommand('Validating commit message', COMMAND.CYBERSKILL.COMMIT_LINT);
    showCheckResult();
}

async function setupGitHook() {
    await runCommand('Configuring Git hooks', COMMAND.CONFIGURE_GIT_HOOK);

    const hooks = await resolveCommands(HOOK);

    writeFileSync(PATH.SIMPLE_GIT_HOOKS, hooks, { isJson: true });

    const gitIgnoreEntry = `\n${SIMPLE_GIT_HOOK_JSON}\n`;

    if (existsSync(PATH.GIT_IGNORE)) {
        const gitignore = readFileSync(PATH.GIT_IGNORE).split('\n');

        if (!gitignore.includes(SIMPLE_GIT_HOOK_JSON)) {
            appendFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
        }
    }
    else {
        writeFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
    }

    await runCommand('Installing simple-git-hooks', COMMAND.SIMPLE_GIT_HOOKS);
}

export async function installDependencies() {
    const strategies = [
        { command: COMMAND.PNPM_INSTALL_STANDARD, message: 'Installing dependencies (standard)' },
        { command: COMMAND.PNPM_INSTALL_LEGACY, message: 'Retrying with legacy peer dependencies' },
        { command: COMMAND.PNPM_INSTALL_FORCE, message: 'Retrying with force install' },
    ];

    for (const { command, message } of strategies) {
        try {
            await runCommand(`${message} using: ${command.cmd}`, command);
            return;
        }
        catch (error) {
            commandLog.warning(`Installation attempt failed: ${command.cmd}`);
            commandLog.error(`Details: ${(error as Error).message}`);
        }
    }

    throw new Error('All dependency installation strategies failed.');
}

export async function updatePackage(packageName: string): Promise<void> {
    try {
        const { installedPath, latestVersion, file } = await checkPackage(packageName);

        file.dependencies = {
            ...file.dependencies,
            [file.name]: latestVersion,
        };

        writeFileSync(installedPath, file, { isJson: true });

        await installDependencies();
        await lintFix();
    }
    catch (error) {
        commandLog.error(`Failed to update "${packageName}": ${(error as Error).message}`);
        throw error;
    }
}

async function setup() {
    if (!existsSync(PATH.PACKAGE_JSON)) {
        commandLog.error('package.json not found. Aborting setup.');
        return;
    }

    try {
        const {
            isInstalled,
            installedVersion,
            latestVersion,
            isCurrentProject,
        } = await checkPackage(CYBERSKILL_PACKAGE_NAME);

        const isUpToDate = isCurrentProject || (isInstalled && installedVersion === latestVersion);

        if (isUpToDate) {
            commandLog.success('Cyberskill package is already up to date.');
        }
        else {
            await updatePackage(CYBERSKILL_PACKAGE_NAME);
        }

        await setupGitHook();
    }
    catch (error) {
        commandLog.error(`Project setup failed: ${(error as Error).message}`);
        throw error;
    }
}

async function reset() {
    rmSync([PATH.NODE_MODULES, PATH.PNPM_LOCK_YAML]);
    await installDependencies();
    await setupGitHook();
}

async function inspect() {
    await runCommand('Inspecting project dependencies', COMMAND.NODE_MODULES_INSPECT);
}

async function testUnit() {
    await runCommand('Running unit tests', COMMAND.CYBERSKILL.TEST_UNIT);
}

async function testE2E() {
    await runCommand('Running end-to-end tests', COMMAND.CYBERSKILL.TEST_E2E);
}

yargs(hideBin(process.argv))
    .scriptName(CYBERSKILL_CLI)
    .usage('$0 <command> [options]')
    .command('lint', 'Check code for linting issues', lintCheck)
    .command('lint:fix', 'Fix linting issues automatically', lintFix)
    .command('lint:inspect', 'View active ESLint configuration', inspectLint)
    .command('lint-staged', 'Run lint checks on staged files', lintStaged)
    .command('commitlint', 'Validate commit message format', commitLint)
    .command('setup', 'Initialize project setup and dependencies', setup)
    .command('reset', 'Reset the project and reinstall dependencies', reset)
    .command('inspect', 'Analyze installed project dependencies', inspect)
    .command('test:unit', 'Run unit test suite', testUnit)
    .command('test:e2e', 'Run end-to-end test suite', testE2E)
    .demandCommand(1, 'Please specify a valid command.')
    .strict()
    .help()
    .alias('h', 'help')
    .alias('v', 'version')
    .epilog('💡 Tip: Use "--help" with any command to see options\n')
    .parse();
