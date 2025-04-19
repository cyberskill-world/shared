#!/usr/bin/env node
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import type { I_IssueEntry } from '../log/index.js';

import pkg from '../../../package.json' with { type: 'json' };
import { clearAllErrorLists, getStoredErrorLists, resolveCommands, runCommand } from '../command/index.js';
import { appendFileSync, existsSync, readFileSync, rmSync, writeFileSync } from '../fs/index.js';
import { E_IssueType, logNodeJS as log } from '../log/index.js';
import { checkPackage, installDependencies, setupPackages } from '../package/index.js';
import { command, CYBERSKILL_CLI, CYBERSKILL_PACKAGE_NAME, HOOK, PATH, SIMPLE_GIT_HOOK_JSON } from '../path/index.js';

async function checkTypescript() {
    if (existsSync(PATH.TS_CONFIG)) {
        await runCommand('Performing TypeScript validation', await command.typescriptCheck());
    }
    else {
        log.warn('No TypeScript configuration found. Skipping type check.');
    }
}

async function checkEslint(fix = false) {
    if (fix) {
        await runCommand('Running ESLint with auto-fix', await command.eslintFix());
    }
    else {
        await runCommand('Running ESLint check', await command.eslintCheck());
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

        if (errors.length > 0 || warnings.length > 0) {
            process.exit(1);
        }
    }
}

async function lintStaged() {
    await clearAllErrorLists();
    const { isCurrentProject } = await checkPackage(CYBERSKILL_PACKAGE_NAME);

    if (isCurrentProject) {
        try {
            await runCommand(`Building package: ${CYBERSKILL_PACKAGE_NAME}`, await command.build());
            await runCommand('Staging build artifacts', await command.stageBuildDirectory());
        }
        catch (error) {
            log.error(`Error building and staging ${CYBERSKILL_PACKAGE_NAME}: ${(error as Error).message}`);
            throw error;
        }
    }

    await runCommand('Executing lint-staged', await command.lintStaged());
    showCheckResult();
}

async function inspectLint() {
    await runCommand('Inspecting ESLint configuration', await command.eslintInspect());
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
    await runCommand('Validating commit message', await command.commitLint());
    showCheckResult();
}

async function setupGitHook() {
    await runCommand('Configuring Git hooks', await command.configureGitHook());

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

    await runCommand('Setting up simple-git-hooks', await command.simpleGitHooks());
}

async function setup() {
    await setupPackages([CYBERSKILL_PACKAGE_NAME], {
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
    await runCommand('Inspecting project dependencies', await command.nodeModulesInspect());
}

async function testUnit() {
    await runCommand('Running unit tests', await command.testUnit());
}

async function testE2E() {
    await runCommand('Running end-to-end tests', await command.testE2e());
}

async function mongoMigrateCreate(migrationName: string) {
    await runCommand('Creating MongoDB migration', await command.mongoMigrateCreate(migrationName));
}

async function mongoMigrateUp() {
    await runCommand('Running MongoDB migrations', await command.mongoMigrateUp());
}

async function mongoMigrateDown() {
    await runCommand('Rolling back MongoDB migration', await command.mongoMigrateDown());
}

(async () => {
    try {
        await yargs(hideBin(process.argv))
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
            .command('mongo:migrate:create <name>', 'Create a MongoDB migration', y =>
                y.positional('name', {
                    describe: 'Migration name',
                    type: 'string',
                }), async (argv) => {
                if (!argv.name) {
                    log.error('Migration name is required.');

                    return;
                }

                await mongoMigrateCreate(argv.name);
            })
            .command('mongo:migrate:up', 'Apply all MongoDB migrations', mongoMigrateUp)
            .command('mongo:migrate:down', 'Rollback last MongoDB migration', mongoMigrateDown)
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
