#!/usr/bin/env node
import chalk, { ChalkInstance } from 'chalk';
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
    FILE_EXTENSIONS: `**/*.{ts,tsx,js,jsx,json,css,scss,less}`,
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
        const { stdout, stderr } = await execPromise(command, {
            maxBuffer: 1024 * 1024 * 100,
        });

        if (stdout) {
            parser(stdout);
        }

        if (stderr) {
            parser(stderr);
        }
    } catch (error) {
        const { stdout, stderr, message } = error as {
            stdout?: string;
            stderr?: string;
            message: string;
        };

        if (stdout) {
            parser(stdout);
        }

        if (stderr) {
            parser(stderr);
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
                    rule: message.ruleId,
                    message: message.message,
                });
            });
        });
    } catch {
        parseTextErrors(stdout);
    }
};

// Parse TypeScript or Prettier errors
const parseTextErrors = (output: string): void => {
    const prettierWarnRegex = /^\[warn\] (.+)$/;

    output.split('\n').forEach((line) => {
        const match = prettierWarnRegex.exec(line);

        if (match) {
            const fileName = match[1];

            if (fileName.includes('Code style issues found')) {
                return;
            }

            errorList.push({
                type: E_ErrorType.Warning,
                file: fileName,
                position: '',
                rule: 'Prettier',
                message: 'Code style issue found',
            });
        } else {
            const tsRegex =
                /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(.+)$/;
            const tsMatch = tsRegex.exec(line);

            if (tsMatch) {
                errorList.push({
                    file: tsMatch[1],
                    position: `${tsMatch[2]}:${tsMatch[3]}`,
                    type: tsMatch[4] as E_ErrorType,
                    message: tsMatch[5].trim(),
                });
            }
        }
    });
};

// Simplified logging function for multiple entries
const logResults = (
    group: I_ErrorEntry[],
    labelColor: ChalkInstance,
    messageColor: ChalkInstance,
    icon: string,
    groupName: string,
): void => {
    if (group.length > 0) {
        console.log(labelColor(figlet.textSync(groupName)));
        group.forEach(({ file, position, message, rule }) => {
            console.log(
                `${labelColor(`${icon}  File:`)} ${chalk.blue(file + ':' + position)}`,
            );
            if (rule) {
                console.log(`   ${labelColor('Rule:')} ${messageColor(rule)}`);
            }
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

// Run TypeScript check if tsconfig.json is present
const runTypescript = async (): Promise<void> => {
    const tsConfigPath = config.TSCONFIG_PATH;
    const command = `npx tsc -p ${tsConfigPath} --noEmit`;

    if (fs.existsSync(tsConfigPath)) {
        await executeCommand(command, '1.2', `TypeScript checking...`);
    } else {
        logProcessStep('1.1', 'tsconfig.json file not found.', '⚠️');
    }
};

// Run lint check or fix for ESLint
const runEslint = async (fix = false): Promise<void> => {
    const fixCommand = fix ? ' --fix' : '';
    const formatCommand = fix ? '' : ' --format json';
    const command = `npx eslint ${config.INIT_CWD}${fixCommand}${formatCommand}`;

    await executeCommand(
        command,
        '1.2',
        `Eslint ${fix ? 'fixing' : 'checking'}...`,
    );
};

// Run lint check or fix for Prettier
const runPrettier = async (fix = false): Promise<void> => {
    const fixCommand = fix ? ' --write' : ' --check';
    const command = `npx prettier '${config.INIT_CWD}/${config.FILE_EXTENSIONS}'${fixCommand}`;

    await executeCommand(
        command,
        '1.2',
        `Prettier ${fix ? 'fixing' : 'checking'}...`,
    );
};

// Perform lint and format check or fix
const performLintCheck = async (): Promise<void> => {
    logProcessStep('1', `Starting lint check for ${config.INIT_CWD}`, '🚀');

    await runWithSpinner(E_SpinnerMessage.LintCheck, async () => {
        errorList.length = 0;
        await Promise.all([runTypescript(), runEslint(), runPrettier()]);
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
        await Promise.all([runEslint(true), runPrettier(true)]);
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
