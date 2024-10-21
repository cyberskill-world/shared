#!/usr/bin/env node
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import { exec } from 'child_process';
import figlet from 'figlet';
import fs from 'fs';
import ora from 'ora';
import util from 'util';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import {
    E_ErrorType,
    E_SpinnerMessage,
    I_ErrorEntry,
    I_EslintError,
} from './typescript/command.js';

const execPromise = util.promisify(exec);

// Centralized configuration
const config = {
    INIT_CWD: process.env.INIT_CWD || process.cwd(),
    TSCONFIG_PATH: `${process.env.INIT_CWD || process.cwd()}/tsconfig.json`,
    FILE_EXTENSIONS: '**/*.{ts,tsx,js,jsx,json,css,scss,less}',
};

const errorList: I_ErrorEntry[] = [];

// Utility function for spinners
const createSpinner = (text: string) =>
    ora({ text, color: 'cyan', spinner: 'dots' });

// Utility function to log process steps with a message and icon
const logProcessStep = (step: string, message: string, icon: string = 'ℹ️') => {
    console.log(`${icon} ${chalk.blue(`[${step}]`)} ${chalk.white(message)}`);
};

// Unified command executor with output parsing
const executeCommand = async (
    command: string,
    step: string,
    description: string,
    parser: (stdout: string) => void = parseCommandOutput,
): Promise<void> => {
    logProcessStep(step, description, '🔍');

    try {
        const { stdout } = await execPromise(command, {
            maxBuffer: 1024 * 1024 * 100,
        });

        if (stdout) {
            parser(stdout);
        }
    } catch (error) {
        const { stdout, message } = error as {
            stdout?: string;
            message: string;
        };

        if (stdout) {
            parser(stdout);
        } else {
            console.error(`Command failed: ${message}`);
        }
    }
};

// Wrapper for spinners with unified handling
const runWithSpinner = async (
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

// Unified error parsing function
const parseCommandOutput = (stdout: string): void => {
    try {
        const results = JSON.parse(stdout);
        results.forEach((result: I_EslintError) => {
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
    } catch {
        parseTextErrors(stdout);
    }
};

// Parse TypeScript or plain text errors
const parseTextErrors = (output: string): void => {
    const tsRegex = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(.+)$/;
    output.split('\n').forEach((line) => {
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

// Simplified logging function for multiple entries
const logResults = (
    group: I_ErrorEntry[],
    labelColor: chalk.Chalk,
    messageColor: chalk.Chalk,
    icon: string,
    groupName: string,
): void => {
    if (group.length > 0) {
        console.log(labelColor(figlet.textSync(groupName)));
        group.forEach(({ file, position, message }) => {
            console.log(
                `${labelColor(`${icon}  File:`)} ${chalk.blue(file + ':' + position)}`,
            );
            console.log(
                `   ${labelColor('Message:')} ${messageColor(message)}`,
            );
            console.log(chalk.gray('─'.repeat(40)));
        });
    } else {
        console.log(chalk.green(`✔ No ${groupName.toLowerCase()} found.`));
    }
};

// Simplified success message rendering
const renderSuccessMessage = (): void => {
    const rainbowAnimation = chalkAnimation.rainbow(
        figlet.textSync('No issues found!'),
    );
    rainbowAnimation.start();
    setTimeout(() => rainbowAnimation.stop(), 3000);
};

// Display errors and warnings together
const displayResults = (): void => {
    const errors = errorList.filter((e) => e.type === E_ErrorType.Error);
    const warnings = errorList.filter((e) => e.type === E_ErrorType.Warning);

    if (errors.length === 0 && warnings.length === 0) {
        renderSuccessMessage();
    } else {
        logResults(warnings, chalk.yellow, chalk.yellow, '⚠', 'Warnings');
        logResults(errors, chalk.red, chalk.red, '✖', 'Errors');
    }
};

// Unified command runner for lint, setup, etc.
const runLintCheck = async (tool: string, fix = false): Promise<void> => {
    const fixCommand = fix ? '--fix' : '';
    const command = `npx ${tool} ${fixCommand} ${config.INIT_CWD} --format json`;

    await executeCommand(command, '1.2', `${tool} ${fix ? 'fix' : 'check'}`);
};

// Updated check functions with reduced redundancy
const runTypeScriptCheck = async (): Promise<void> => {
    const tsConfigPath = config.TSCONFIG_PATH;

    if (fs.existsSync(tsConfigPath)) {
        await executeCommand(
            `npx tsc -p ${tsConfigPath} --noEmit`,
            '1.2',
            'TypeScript check',
        );
    } else {
        logProcessStep('1.1', 'tsconfig.json file not found.', '⚠️');
    }
};

// Perform lint and format check or fix
const performLintCheck = async (): Promise<void> => {
    logProcessStep('1', `Starting lint check for ${config.INIT_CWD}`, '🚀');

    await runWithSpinner(E_SpinnerMessage.LintCheck, async () => {
        errorList.length = 0;
        await Promise.all([
            runTypeScriptCheck(),
            runLintCheck('eslint'),
            runLintCheck('prettier'),
        ]);
        displayResults();
    });
};

// Perform lint and format fix
const performLintFix = async (): Promise<void> => {
    logProcessStep(
        '1',
        `Starting lint and format fix for ${config.INIT_CWD}`,
        '🚀',
    );

    await runWithSpinner(E_SpinnerMessage.LintFix, async () => {
        await Promise.all([
            runLintCheck('eslint', true),
            runLintCheck('prettier', true),
        ]);
        displayResults();
    });
};

// Setup project (cleanup and install)
const performSetup = async (): Promise<void> => {
    logProcessStep('1', `Starting setup process for ${config.INIT_CWD}`, '🚀');

    await runWithSpinner(E_SpinnerMessage.Setup, async () => {
        await executeCommand(
            `npx rimraf ${config.INIT_CWD}/node_modules ${config.INIT_CWD}/package-lock.json`,
            '1.2',
            'Clean up node_modules and package-lock.json',
        );
        await executeCommand('npm i -f', '1.3', 'Install dependencies');
    });
};

// CLI command definitions using yargs
yargs(hideBin(process.argv))
    .command('lint:check', 'Run linting checks', performLintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', performLintFix)
    .command('setup', 'Run setup with given configuration', performSetup)
    .help()
    .parse();
