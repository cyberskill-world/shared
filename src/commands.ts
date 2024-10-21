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
import { isJson } from './utils/index.js';

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

// Execute a command and handle its output
const executeAndParseCommand = async (
    command: string,
    step: string,
    description: string,
): Promise<void> => {
    logProcessStep(step, description, '🔍');

    try {
        const { stdout } = await execPromise(command, {
            maxBuffer: 1024 * 1024 * 100,
        });

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

// Wrapper for handling a spinner
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

// Parse ESLint JSON output and add to errorList
const parseEslintJsonOutput = (output: string): void => {
    try {
        const results = JSON.parse(output);
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

// Unified command output parser
const parseCommandOutput = (stdout: string): void => {
    if (isJson(stdout)) {
        parseEslintJsonOutput(stdout);
    } else {
        parseTextErrors(stdout);
    }
};

// Generic check runner
const runCheck = async (
    tool: string,
    fix = false,
    extensions = '',
    configPath = '',
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
    if (fs.existsSync(config.TSCONFIG_PATH)) {
        await runCheck('tsc', false, '', `-p ${config.TSCONFIG_PATH} --noEmit`);
    } else {
        logProcessStep('1.1', 'tsconfig.json file not found.', '⚠️');
    }
};

// Run ESLint check
const runESLint = (fix = false) =>
    runCheck('eslint', fix, config.INIT_CWD, '--format json');

// Run Prettier check
const runPrettier = (fix = false) =>
    runCheck('prettier', fix, `'${config.INIT_CWD}/${config.FILE_EXTENSIONS}'`);

const displayResults = (): void => {
    const errors = errorList.filter((e) => e.type === E_ErrorType.Error);
    const warnings = errorList.filter((e) => e.type === E_ErrorType.Warning);

    const renderWordArt = (
        text: string,
        font: string,
        colorFn: chalk.Chalk,
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            figlet.text(text, { font }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(colorFn(data));
                }
            });
        });
    };

    const renderSuccessMessage = (): void => {
        figlet('No issues found!', { font: 'Standard' }, (err, data) => {
            if (err) {
                console.error('Error generating success message:', err);
                return;
            }
            const rainbowAnimation = chalkAnimation.rainbow(data);
            rainbowAnimation.start();
            setTimeout(() => rainbowAnimation.stop(), 3000);
        });
    };

    if (errors.length === 0 && warnings.length === 0) {
        renderSuccessMessage();
        return;
    }

    const spinner = ora('Processing results...').start();

    const displayGroup = (
        group: I_ErrorEntry[],
        icon: string,
        labelColor: chalk.Chalk,
        messageColor: chalk.Chalk,
    ): void => {
        group.forEach(({ file, position, message }) => {
            console.log(
                `${labelColor(`${icon}  File:`)} ${chalk.blue(file + ':' + position)}`,
            );
            console.log(
                `   ${labelColor('Message:')} ${messageColor(message)}`,
            );
            console.log(chalk.gray('─'.repeat(40)));
        });
    };

    const handleWordArt = async (
        text: string,
        font: string,
        group: I_ErrorEntry[],
        icon: string,
        labelColor: chalk.Chalk,
        messageColor: chalk.Chalk,
    ): Promise<void> => {
        try {
            const wordArt = await renderWordArt(text, font, labelColor);
            console.log(wordArt);
            displayGroup(group, icon, labelColor, messageColor);
        } catch (error) {
            console.error('Error generating word art:', error);
        }
    };

    setTimeout(async () => {
        spinner.stop();

        if (warnings.length > 0) {
            await handleWordArt(
                'Warnings',
                'Standard',
                warnings,
                '⚠',
                chalk.yellow,
                chalk.yellow,
            );
        } else {
            console.log(chalk.green('✔ No warnings found.'));
        }

        if (errors.length > 0) {
            await handleWordArt(
                'Errors',
                'Standard',
                errors,
                '✖',
                chalk.red,
                chalk.red,
            );
        } else {
            console.log(chalk.green('✔ No errors found.'));
        }
    }, 1000);
};

// Perform lint check
const performLintCheck = async (): Promise<void> => {
    logProcessStep('1', `Starting lint check for ${config.INIT_CWD}`, '🚀');

    await withSpinner(E_SpinnerMessage.LintCheck, async () => {
        errorList.length = 0;

        await Promise.all([runTypeScriptCheck(), runESLint(), runPrettier()]);
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

    await withSpinner(E_SpinnerMessage.LintFix, async () => {
        await Promise.all([runESLint(true), runPrettier(true)]);
        displayResults();
    });
};

// Setup project (cleanup and install)
const performSetup = async (): Promise<void> => {
    logProcessStep('1', `Starting setup process for ${config.INIT_CWD}`, '🚀');

    await withSpinner(E_SpinnerMessage.Setup, async () => {
        await runCheck(
            'rimraf',
            false,
            `${config.INIT_CWD}/node_modules ${config.INIT_CWD}/package-lock.json`,
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
