#!/usr/bin/env node
import chalk from 'chalk';
import { exec } from 'child_process';
import fs from 'fs';
import ora from 'ora';
import util from 'util';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import {
    E_ErrorType,
    E_SpinnerMessage,
    I_ErrorEntry,
} from './typescript/command.js';

const execPromise = util.promisify(exec);

const INIT_CWD = process.env.INIT_CWD || process.cwd();
const TSCONFIG_PATH = `${INIT_CWD}/tsconfig.json`;
const FILE_EXTENSIONS = '**/*.{ts,tsx,js,jsx,json,css,scss,less}';

const errorList: I_ErrorEntry[] = [];

// Spinner utility function
const createSpinner = (text: string) =>
    ora({ text, color: 'cyan', spinner: 'dots' });

// Log process steps
const logProcessStep = (step: string, message: string, icon: string = 'ℹ️') => {
    console.log(`${icon} ${chalk.blue(`[${step}]`)} ${chalk.white(message)}`);
};

// Execute a command and handle its output (either ESLint or TypeScript)
const executeAndParseCommand = async (
    command: string,
    step: string,
    description: string,
): Promise<void> => {
    logProcessStep(step, description, '🔍');

    try {
        const { stdout } = await execPromise(command);

        if (stdout) {
            parseCommandOutput(stdout);
        }
    } catch (error) {
        const { stdout, message } = error as {
            stdout?: string;
            message: string;
        };

        if (stdout) {
            parseCommandOutput(stdout);
        } else {
            console.error(`Command failed: ${message}`);
        }
    }
};

// Spinner wrapper to simplify starting/stopping spinners
const withSpinner = async (
    message: string,
    action: () => Promise<void>,
): Promise<void> => {
    const spinner = createSpinner(message).start();

    try {
        await action();
        spinner.succeed(`${message}${E_SpinnerMessage.Success}`);
    } catch (error) {
        spinner.fail(`${message}${E_SpinnerMessage.Fail}`);
        throw error;
    }
};

// Helper to check if output is JSON
const isJson = (str: string): boolean => {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
};

// Parse ESLint JSON output
const parseEslintJsonOutput = (output: string): void => {
    try {
        const results: Array<{
            filePath: string;
            messages: Array<{
                line: number;
                column: number;
                severity: number;
                message: string;
            }>;
        }> = JSON.parse(output);

        results.forEach((result) => {
            result.messages.forEach((message) => {
                errorList.push({
                    type:
                        message.severity === 2
                            ? E_ErrorType.Error
                            : E_ErrorType.Warning,
                    file: result.filePath,
                    position: `${message.line}:${message.column}`,
                    message: message.message,
                });
            });
        });
    } catch (error) {
        console.error(
            'Failed to parse ESLint JSON output:',
            (error as Error).message,
        );
    }
};

// Parse TypeScript or plain text errors
const parseTextErrors = (output: string): void => {
    const tsRegex = /^(.+)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(.+)$/;
    const lines = output.split('\n');

    lines.forEach((line) => {
        const match = tsRegex.exec(line);

        if (match) {
            errorList.push({
                file: match[1],
                position: `${match[2]}:${match[3]}`,
                type: match[4] as E_ErrorType,
                message: match[5].trim(),
            });
        }
    });
};

// Unified helper function to process command output
const parseCommandOutput = (stdout: string): void => {
    if (isJson(stdout)) {
        parseEslintJsonOutput(stdout);
    } else {
        parseTextErrors(stdout);
    }
};

// Unified function to run different checks (TypeScript, ESLint, Prettier)
const runCheck = async (
    tool: string,
    fix = false,
    extensions: string = '',
    configPath: string = '',
): Promise<void> => {
    const command = `npx ${tool} ${fix ? '--fix ' : ''}${extensions} ${configPath}`;
    await executeAndParseCommand(
        command,
        '1.2',
        `${tool} ${fix ? 'fix' : 'check'}`,
    );
};

// Run TypeScript check
const runTypeScriptCheck = async (): Promise<void> => {
    if (fs.existsSync(TSCONFIG_PATH)) {
        await runCheck('tsc', false, '', `-p ${TSCONFIG_PATH} --noEmit`);
    } else {
        logProcessStep('1.1', 'tsconfig.json file not found.', '⚠️');
    }
};

// Run ESLint check
const runESLint = (fix = false) =>
    runCheck('eslint', fix, INIT_CWD, '--format json');

// Run Prettier check
const runPrettier = (fix = false) =>
    runCheck('prettier', fix, `'${INIT_CWD}/${FILE_EXTENSIONS}'`);

// Display collected errors and warnings
const displayResults = (): void => {
    if (errorList.length === 0) {
        return;
    }

    const sortedErrors = errorList.sort((a, b) => a.type.localeCompare(b.type));
    console.table(
        sortedErrors.map(({ file, position, type, message }) => ({
            Type: type,
            File: file,
            Position: position,
            Message: message,
        })),
    );

    const errorCount = errorList.filter(
        (e) => e.type === E_ErrorType.Error,
    ).length;
    const warningCount = errorList.filter(
        (e) => e.type === E_ErrorType.Warning,
    ).length;

    console.log(chalk.red(`\nTotal Errors: ${errorCount}`));
    console.log(chalk.yellow(`Total Warnings: ${warningCount}`));
};

// Perform lint check
const performLintCheck = async (): Promise<void> => {
    logProcessStep('1', `Starting lint check for ${INIT_CWD}`, '🚀');

    await withSpinner(E_SpinnerMessage.LintCheck, async () => {
        errorList.length = 0;
        await Promise.all([runTypeScriptCheck(), runESLint(), runPrettier()]);
        displayResults();
    });
};

// Perform lint and format fix
const performLintFix = async (): Promise<void> => {
    logProcessStep('1', `Starting lint and format fix for ${INIT_CWD}`, '🚀');

    await withSpinner(E_SpinnerMessage.LintFix, async () => {
        await Promise.all([runESLint(true), runPrettier(true)]);
        displayResults();
    });
};

// Setup project (cleanup and install)
const performSetup = async (): Promise<void> => {
    logProcessStep('1', `Starting setup process for ${INIT_CWD}`, '🚀');

    await withSpinner(E_SpinnerMessage.Setup, async () => {
        await runCheck(
            'rimraf',
            false,
            `${INIT_CWD}/node_modules ${INIT_CWD}/package-lock.json`,
        );
        await executeAndParseCommand('npm i -f', '1.2', 'Install dependencies');
    });
};

// CLI command definitions using yargs
yargs(hideBin(process.argv))
    .command('lint:check', 'Run linting checks', performLintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', performLintFix)
    .command('setup', 'Run setup with given configuration', performSetup)
    .help()
    .parse();
