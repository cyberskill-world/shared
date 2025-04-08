#!/usr/bin/env node
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import type { I_IssueEntry } from '#typescript/command.js';

import { COMMAND_DESCRIPTIONS } from '#constants/cli.js';
import { DEBUG } from '#constants/common-nodejs.js';
import { COMMAND, CYBERSKILL_CLI, CYBERSKILL_PACKAGE_NAME, HOOK, PATH, SIMPLE_GIT_HOOK_JSON } from '#constants/path.js';
import { E_IssueType } from '#typescript/command.js';
import { clearAllErrorLists, executeCommand, getStoredErrorLists, resolveCommands } from '#utils/command.js';
import { appendFileSync, existsSync, readFileSync, rmSync, writeFileSync } from '#utils/fs.js';
import { logNodeJS as log } from '#utils/log-nodejs.js';
import { checkPackage } from '#utils/package.js';

import pkg from '../package.json' with { type: 'json' };

async function runCommand(label: string, command: string) {
    try {
        log.start(`${label}`);

        if (DEBUG) {
            log.info(`→ ${command}`);
        }

        await executeCommand(command);
        log.success(`${label} done.`);
    }
    catch (err) {
        log.error(`${label} failed: ${(err as Error).message}`);
        throw err;
    }
}

async function checkTypescript() {
    if (existsSync(PATH.TS_CONFIG)) {
        await runCommand('Performing TypeScript validation', COMMAND.TYPESCRIPT_CHECK);
    }
    else {
        log.warn('No TypeScript configuration found. Skipping type check.');
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

function printIssues(type: 'Errors' | 'Warnings', list: I_IssueEntry[]) {
    if (!list.length) {
        return;
    }

    const color = type === 'Errors' ? 'red' : 'yellow';
    log.printBoxedLog(type === 'Errors' ? '✖ Errors' : '⚠ Warnings', list, color);
}

async function showCheckResult() {
    const allResults = await getStoredErrorLists();
    const errors = allResults.filter(e => e.type === E_IssueType.Error);
    const warnings = allResults.filter(e => e.type === E_IssueType.Warning);

    if (!errors.length && !warnings.length) {
        log.printBoxedLog('✔ NO ISSUES FOUND', [], 'green');
    }
    else {
        printIssues('Warnings', warnings);
        printIssues('Errors', errors);
    }
}

async function lintStaged() {
    await clearAllErrorLists();
    const { isCurrentProject } = await checkPackage(CYBERSKILL_PACKAGE_NAME);

    if (isCurrentProject) {
        try {
            await runCommand(`Building package: ${CYBERSKILL_PACKAGE_NAME}`, COMMAND.BUILD);
            await runCommand('Staging build artifacts', COMMAND.STAGE_BUILD_DIRECTORY);
        }
        catch (error) {
            log.error(`Error building and staging ${CYBERSKILL_PACKAGE_NAME}: ${(error as Error).message}`);
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
    await clearAllErrorLists();
    await runCommand('Validating commit message', COMMAND.CYBERSKILL.COMMIT_LINT);
    showCheckResult();
}

async function setupGitHook() {
    await runCommand('Configuring Git hooks', COMMAND.CONFIGURE_GIT_HOOK);

    rmSync(PATH.GIT_HOOK);

    const hooks = await resolveCommands(HOOK);

    writeFileSync(PATH.SIMPLE_GIT_HOOKS_JSON, hooks, { isJson: true });

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

    await runCommand('Setting up simple-git-hooks', COMMAND.SIMPLE_GIT_HOOKS);
}

async function installDependencies() {
    const strategies = [
        { command: COMMAND.PNPM_INSTALL_STANDARD, message: 'Installing dependencies (standard)' },
        { command: COMMAND.PNPM_INSTALL_LEGACY, message: 'Retrying with legacy peer dependencies' },
        { command: COMMAND.PNPM_INSTALL_FORCE, message: 'Retrying with force install' },
    ];

    for (const { command, message } of strategies) {
        try {
            await runCommand(`${message} using: ${command}`, command);
            return;
        }
        catch (error) {
            log.warn(`Installation attempt failed: ${command}`);
            log.error(`Details: ${(error as Error).message}`);
        }
    }

    throw new Error('All dependency installation strategies failed.');
}

async function setupPackage(packageName: string, options?: {
    update?: boolean;
    postInstallActions?: (() => Promise<void>)[];
}) {
    if (!existsSync(PATH.PACKAGE_JSON)) {
        log.error('package.json not found. Aborting setup.');

        return;
    }

    try {
        const { isUpToDate } = await checkPackage(packageName, { update: options?.update });

        if (!isUpToDate) {
            await installDependencies();
            await lintFix();
        }

        for (const action of options?.postInstallActions ?? []) {
            await action();
        }

        log.success(`"${packageName}" setup completed.`);
    }
    catch (error) {
        log.error(`Failed to setup "${packageName}": ${(error as Error).message}`);
        throw error;
    }
}

async function setup() {
    await setupPackage(CYBERSKILL_PACKAGE_NAME, {
        update: true,
        postInstallActions: [setupGitHook],
    });
}

async function reset() {
    rmSync(PATH.NODE_MODULES, PATH.PNPM_LOCK_YAML);
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

(async () => {
    try {
        await yargs(hideBin(process.argv))
            .scriptName(CYBERSKILL_CLI)
            .usage('$0 <command> [options]')
            .command('lint', COMMAND_DESCRIPTIONS.lint, lintCheck)
            .command('lint:fix', COMMAND_DESCRIPTIONS['lint:fix'], lintFix)
            .command('lint:inspect', COMMAND_DESCRIPTIONS['lint:inspect'], inspectLint)
            .command('lint-staged', COMMAND_DESCRIPTIONS['lint-staged'], lintStaged)
            .command('commitlint', COMMAND_DESCRIPTIONS.commitlint, commitLint)
            .command('setup', COMMAND_DESCRIPTIONS.setup, setup)
            .command('reset', COMMAND_DESCRIPTIONS.reset, reset)
            .command('inspect', COMMAND_DESCRIPTIONS.inspect, inspect)
            .command('test:unit', COMMAND_DESCRIPTIONS['test:unit'], testUnit)
            .command('test:e2e', COMMAND_DESCRIPTIONS['test:e2e'], testE2E)
            .demandCommand(1, 'Please specify a valid command.')
            .strict()
            .help()
            .alias('h', 'help')
            .alias('v', 'version')
            .version(pkg.version)
            .epilog('💡 Tip: Use "--help" with any command to see options\n')
            .parse();
    }
    catch (err) {
        log.error(`Fatal: ${(err as Error).message}`);
        process.exit(1);
    }
})();
