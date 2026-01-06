#!/usr/bin/env node
import process from 'node:process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import type { I_IssueEntry } from '../log/index.js';

import { clearAllErrorLists, getStoredErrorLists, resolveCommands, runCommand } from '../command/index.js';
import { appendFileSync, pathExistsSync, readFileSync, removeSync, writeFileSync } from '../fs/index.js';
import { catchError, E_IssueType, log } from '../log/index.js';
import { getPackage, installDependencies } from '../package/index.js';
import { command, createGitHooksConfig, CYBERSKILL_CLI, CYBERSKILL_PACKAGE_NAME, PATH, resolve, SIMPLE_GIT_HOOK_JSON } from '../path/index.js';

/**
 * Retrieves the version from the package.json file.
 * This function reads the package.json file and extracts the version number.
 * If the file cannot be read or parsed, it returns a default version of '1.0.0'.
 *
 * @returns The version string from package.json or '1.0.0' as fallback.
 */
function getVersion(): string {
    try {
        const pkg = JSON.parse(
            readFileSync(resolve(__dirname, '../../../package.json'), 'utf-8'),
        );
        return pkg.version;
    }
    catch {
        return '1.0.0';
    }
}

/**
 * Performs TypeScript validation if a TypeScript configuration file exists.
 * This function checks for the presence of a TypeScript configuration file
 * and runs TypeScript validation if found. If no configuration is found,
 * it logs a warning and skips the type check.
 *
 * @returns A promise that resolves when the TypeScript validation is complete.
 */
async function checkTypescript() {
    if (pathExistsSync(PATH.TS_CONFIG)) {
        await runCommand('Performing TypeScript validation', await command.typescriptCheck());
    }
    else {
        log.warn('No TypeScript configuration found. Skipping type check.');
    }
}

/**
 * Performs ESLint checking with optional auto-fix functionality.
 * This function runs ESLint checks on the codebase and optionally applies
 * automatic fixes to resolve linting issues.
 *
 * @param fix - Whether to apply automatic fixes to linting issues (default: false).
 * @returns A promise that resolves when the ESLint check is complete.
 */
async function checkEslint(fix = false) {
    const commandToRun = fix ? await command.eslintFix() : await command.eslintCheck();
    const label = fix ? 'Running ESLint with auto-fix' : 'Running ESLint check';

    try {
        await runCommand(label, commandToRun, { timeout: 60000, throwOnError: true });
    }
    catch (error: any) {
        if (error.code === 'ETIMEDOUT' || error.killed || error.signal === 'SIGTERM') {
            log.warn('Lint check timed out. Retrying with debug mode enabled...');
            process.env['DEBUG'] = 'true';
            await runCommand(`${label} (Debug Mode)`, commandToRun);
        }
        else {
            catchError(error);
        }
    }
}

/**
 * Prints a formatted list of issues (errors or warnings) to the console.
 * This function displays issues in a boxed format with appropriate color coding
 * based on the issue type. It only displays issues if the list is not empty.
 *
 * @param type - The type of issues to display ('Errors' or 'Warnings').
 * @param list - An array of issue entries to display.
 */
function printIssues(type: 'Errors' | 'Warnings', list: I_IssueEntry[]) {
    if (!list.length) {
        return;
    }

    const color = type === 'Errors' ? 'red' : 'yellow';
    log.printBoxedLog(type === 'Errors' ? '✖ Errors' : '⚠ Warnings', list, color);
}

/**
 * Displays the final check results after all validation processes.
 * This function retrieves stored error lists and displays them in a formatted manner.
 * If no errors or warnings are found, it displays a success message. If errors are found,
 * it exits the process with code 1 to indicate failure.
 *
 * @returns A promise that resolves when the results are displayed.
 */
async function showCheckResult() {
    setTimeout(async () => {
        const allResults = (await getStoredErrorLists()) || [];
        const errors = allResults.filter(e => e.type === E_IssueType.Error);
        const warnings = allResults.filter(e => e.type === E_IssueType.Warning);

        if (!errors.length && !warnings.length) {
            log.printBoxedLog('✔ NO ISSUES FOUND', [], 'green');
        }
        else {
            printIssues('Warnings', warnings);
            printIssues('Errors', errors);

            if (errors.length > 0) {
                process.exit(1);
            }
        }
    }, 0);
}

/**
 * Executes lint-staged to check only staged files.
 * This function runs lint-staged which executes linting tools only on files
 * that are staged for commit. It includes building the package if it's the current project
 * and displays the results after completion.
 *
 * @returns A promise that resolves when lint-staged execution is complete.
 */
async function lintStaged() {
    await clearAllErrorLists();
    const packageData = await getPackage({ name: CYBERSKILL_PACKAGE_NAME });

    if (!packageData.success) {
        log.error('Failed to retrieve package information. Aborting lint-staged.');
        return;
    }

    if (packageData.result.isCurrentProject) {
        await runCommand(`Building package: ${CYBERSKILL_PACKAGE_NAME}`, await command.build());
    }

    await runCommand('Executing lint-staged', await command.lintStaged());
    showCheckResult();
}

/**
 * Inspects the ESLint configuration to show active rules and settings.
 * This function runs ESLint inspection to display the current configuration,
 * including which rules are active and their settings.
 *
 * @returns A promise that resolves when the ESLint inspection is complete.
 */
async function inspectLint() {
    await runCommand('Inspecting ESLint configuration', await command.eslintInspect());
}

/**
 * Performs comprehensive linting checks including TypeScript and ESLint.
 * This function runs both TypeScript validation and ESLint checks in parallel,
 * then displays the combined results.
 *
 * @returns A promise that resolves when all linting checks are complete.
 */
async function lintCheck() {
    await clearAllErrorLists();
    await checkTypescript();
    await checkEslint();
    showCheckResult();
}

/**
 * Performs comprehensive linting checks with automatic fixes.
 * This function runs both TypeScript validation and ESLint checks with auto-fix
 * in parallel, then displays the combined results.
 *
 * @returns A promise that resolves when all linting checks with fixes are complete.
 */
async function lintFix() {
    await clearAllErrorLists();
    await checkTypescript();
    await checkEslint(true);
    showCheckResult();
}

/**
 * Validates commit message format using commitlint.
 * This function runs commitlint to check if the current commit message
 * follows the conventional commit format and displays the results.
 *
 * @returns A promise that resolves when commit message validation is complete.
 */
async function commitLint() {
    await clearAllErrorLists();
    await runCommand('Validating commit message', await command.commitLint());
    showCheckResult();
}

/**
 * Sets up Git hooks for automated code quality checks.
 * This function configures Git hooks using simple-git-hooks, creates the necessary
 * configuration files, and updates .gitignore to exclude hook configuration files.
 * It also sets up the hooks to run linting and commit validation automatically.
 *
 * @returns A promise that resolves when Git hook setup is complete.
 */
async function setupGitHook() {
    await runCommand('Configuring Git hooks', await command.configureGitHook());

    removeSync(PATH.GIT_HOOK);

    const hooks = await resolveCommands(createGitHooksConfig);

    writeFileSync(PATH.SIMPLE_GIT_HOOKS_JSON, JSON.stringify(hooks, null, 4));

    const gitIgnoreEntry = `\n${SIMPLE_GIT_HOOK_JSON}\n`;

    if (pathExistsSync(PATH.GIT_IGNORE)) {
        const gitignore = readFileSync(PATH.GIT_IGNORE, 'utf-8').split('\n');

        if (!gitignore.includes(SIMPLE_GIT_HOOK_JSON)) {
            appendFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
        }
    }
    else {
        writeFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
    }

    await runCommand('Setting up simple-git-hooks', await command.simpleGitHooks());
}

/**
 * Initializes the project with dependencies and Git hooks.
 * This function installs project dependencies and sets up Git hooks for
 * automated code quality checks. It's typically run when setting up a new project.
 *
 * @returns A promise that resolves when project initialization is complete.
 */
async function ready() {
    await installDependencies();
    await setupGitHook();
}

/**
 * Resets the project by removing dependencies and reinstalling them.
 * This function removes node_modules and lock files, cleans the package manager cache,
 * reinstalls dependencies, and sets up Git hooks. It's useful for resolving
 * dependency-related issues.
 *
 * @returns A promise that resolves when project reset is complete.
 */
async function reset() {
    removeSync(PATH.NODE_MODULES, PATH.PNPM_LOCK_YAML);
    await runCommand('Pruning pnpm store', await command.pnpmPruneStore());
    await runCommand('Clearing pnpm cache', await command.pnpmCleanCache());
    await installDependencies();
    await setupGitHook();
}

/**
 * Inspects project dependencies to analyze their status.
 * This function runs dependency inspection to check for outdated packages,
 * security vulnerabilities, and other dependency-related issues.
 *
 * @returns A promise that resolves when dependency inspection is complete.
 */
async function inspect() {
    await runCommand('Inspecting project dependencies', await command.nodeModulesInspect());
}

/**
 * Runs the unit test suite.
 * This function executes unit tests using the configured test runner
 * and displays the test results.
 *
 * @returns A promise that resolves when unit tests are complete.
 */
async function testUnit() {
    await runCommand('Running unit tests', await command.testUnit());
}

/**
 * Runs the end-to-end test suite.
 * This function executes end-to-end tests using the configured test runner
 * and displays the test results.
 *
 * @returns A promise that resolves when end-to-end tests are complete.
 */
async function testE2E() {
    await runCommand('Running end-to-end tests', await command.testE2e());
}

/**
 * Creates a new MongoDB migration file.
 * This function creates a new migration file with the specified name
 * for database schema changes.
 *
 * @param migrationName - The name for the new migration file.
 * @returns A promise that resolves when the migration file is created.
 */
async function mongoMigrateCreate(migrationName: string) {
    await runCommand('Creating MongoDB migration', await command.mongoMigrateCreate(migrationName));
}

/**
 * Applies all pending MongoDB migrations.
 * This function runs all pending database migrations to update the database schema
 * to the latest version.
 *
 * @returns A promise that resolves when all migrations are applied.
 */
async function mongoMigrateUp() {
    await runCommand('Running MongoDB migrations', await command.mongoMigrateUp());
}

/**
 * Rolls back the last applied MongoDB migration.
 * This function reverts the most recent database migration, undoing
 * the last schema change.
 *
 * @returns A promise that resolves when the migration is rolled back.
 */
async function mongoMigrateDown() {
    await runCommand('Rolling back MongoDB migration', await command.mongoMigrateDown());
}

/**
 * Starts the Storybook development server.
 * This function runs Storybook in development mode, allowing you to
 * view and interact with your component stories in a browser.
 *
 * @returns A promise that resolves when the Storybook dev server is started.
 */
async function storybookDev() {
    await runCommand('Starting Storybook development server', await command.storybookDev());
}

/**
 * Builds Storybook for production deployment.
 * This function creates a static build of Storybook that can be
 * deployed to a web server or hosting service.
 *
 * @returns A promise that resolves when the Storybook build is complete.
 */
async function storybookBuild() {
    await runCommand('Building Storybook', await command.storybookBuild());
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
            .command('ready', 'Initialize project and dependencies', ready)
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
            .command('storybook:dev', 'Start Storybook development server', storybookDev)
            .command('storybook:build', 'Build Storybook for production', storybookBuild)
            .demandCommand(1, 'Please specify a valid command.')
            .strict()
            .help()
            .alias('h', 'help')
            .alias('v', 'version')
            .version(getVersion())
            .epilog('💡 Tip: Use "--help" with any command to see options\n')
            .parse();
    }
    catch (error) {
        catchError(error);
        process.exit(1);
    }
})();
