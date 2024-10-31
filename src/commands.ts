#!/usr/bin/env node
/* eslint-disable no-console */
import boxen from 'boxen';
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
    I_EslintError,
} from './typescript/command.js';

const { blue, red, yellow, green, gray, white, bold } = chalk;
const execPromise = util.promisify(exec);

const config = {
    INIT_CWD: process.env.INIT_CWD || process.cwd(),
    TSCONFIG_PATH: `${process.env.INIT_CWD || process.cwd()}/tsconfig.json`,
    FILE_EXTENSIONS: `**/*.{ts,tsx,js,jsx,json,css,scss,less}`,
};

const errorList: I_ErrorEntry[] = [];

const createSpinner = (text: string) =>
    ora({ text, color: 'cyan', spinner: 'dots' });

const logProcessStep = (step: string, message: string, icon: string = 'ℹ️') =>
    console.log(`${icon} ${blue(`[${step}]`)} ${white(message)}`);

const executeCommand = async (
    command: string,
    step: string,
    description: string,
    parser: (output: string) => void = parseCommandOutput,
): Promise<void> => {
    logProcessStep(step, description, '🔍');

    try {
        const { stdout, stderr } = await execPromise(command, {
            maxBuffer: 1024 * 1024 * 100,
        });
        [stdout, stderr].forEach((output) => output && parser(output));
    } catch (error) {
        const { stdout, stderr, message } = error as {
            stdout?: string;
            stderr?: string;
            message: string;
        };
        [stdout, stderr].forEach((output) => output && parser(output));

        if (!stderr && !stdout) {
            console.error(`Command failed: ${message}`);
        }
    }
};

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

const parseCommandOutput = (output: string): void => {
    try {
        const results: I_EslintError[] = JSON.parse(output);

        results.forEach(({ filePath, messages }) => {
            messages.forEach(({ severity, line, column, ruleId, message }) => {
                errorList.push({
                    type:
                        severity === 2
                            ? E_ErrorType.Error
                            : E_ErrorType.Warning,
                    file: filePath,
                    position: `${line}:${column}`,
                    rule: ruleId,
                    message,
                });
            });
        });
    } catch {
        parseTextErrors(output);
    }
};

const parseTextErrors = (output: string): void => {
    const prettierWarnRegex = /^\[warn\] (.+)$/;
    const tsRegex = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(.+)$/;

    output.split('\n').forEach((line) => {
        const match = prettierWarnRegex.exec(line);

        if (match) {
            if (!match[1].includes('Code style issues found')) {
                errorList.push({
                    type: E_ErrorType.Warning,
                    file: match[1],
                    position: '',
                    rule: 'Prettier',
                    message: 'Code style issue found',
                });
            }
        } else {
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

const boxAround = (
    text: string,
    color: typeof green | typeof yellow | typeof red,
) => {
    let borderColor;

    if (color === red) {
        borderColor = 'red';
    } else if (color === yellow) {
        borderColor = 'yellow';
    } else {
        borderColor = 'green';
    }

    return boxen(bold(color(text)), {
        padding: 1,
        margin: 1,
        borderStyle: 'arrow',
        borderColor,
    });
};

const logResults = (
    entries: I_ErrorEntry[],
    color: typeof yellow | typeof red,
    icon: string,
    groupName: string,
) => {
    if (entries.length) {
        entries.forEach(({ file, position, rule, message }) => {
            console.log(
                `${color(`${icon} File:`)} ${blue(file + ':' + position)}`,
            );
            if (rule) {
                console.log(`   ${color('Rule:')} ${color(rule)}`);
            }
            console.log(`   ${color('Message:')} ${color(message)}`);
        });
        console.log(
            boxAround(
                bold(color(`${icon} Total ${groupName}: ${entries.length}`)),
                color,
            ),
        );
    } else {
        console.log(
            boxAround(
                bold(green(`✔ No ${groupName.toLowerCase()} found.`)),
                green,
            ),
        );
    }
    console.log(gray('─'.repeat(40)));
};

const displayResults = () => {
    const errors = errorList.filter((e) => e.type === E_ErrorType.Error);
    const warnings = errorList.filter((e) => e.type === E_ErrorType.Warning);

    if (!errors.length && !warnings.length) {
        console.log(boxAround(bold(green(`✔ No issue found!`)), green));
    } else {
        logResults(warnings, yellow, '⚠', 'Warnings');
        logResults(errors, red, '✖', 'Errors');
    }
};

const runTypescript = async (): Promise<void> => {
    const tsConfigPath = config.TSCONFIG_PATH;

    if (fs.existsSync(tsConfigPath)) {
        await executeCommand(
            `npx tsc -p ${tsConfigPath} --noEmit`,
            '1.2',
            'TypeScript checking...',
        );
    } else {
        logProcessStep('1.1', 'tsconfig.json file not found.', '⚠️');
    }
};

const runEslint = async (fix = false): Promise<void> => {
    const command = `npx eslint ${config.INIT_CWD}${fix ? ' --fix' : ' --format json'}`;
    await executeCommand(
        command,
        '1.2',
        `Eslint ${fix ? 'fixing' : 'checking'}...`,
    );
};

const runPrettier = async (fix = false): Promise<void> => {
    const command = `npx prettier '${config.INIT_CWD}/${config.FILE_EXTENSIONS}'${fix ? ' --write' : ' --check'}`;
    await executeCommand(
        command,
        '1.2',
        `Prettier ${fix ? 'fixing' : 'checking'}...`,
    );
};

const performLintCheck = async (): Promise<void> => {
    logProcessStep('1', `Starting lint check for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.LintCheck, async () => {
        errorList.length = 0;
        await Promise.all([runTypescript(), runEslint(), runPrettier()]);
        displayResults();
    });
};

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

const performSetup = async (): Promise<void> => {
    logProcessStep('1', `Starting setup process for ${config.INIT_CWD}`, '🚀');

    const cyberskillPath = `${config.INIT_CWD}/node_modules/cyberskill`;
    const isCyberskillInstalled = fs.existsSync(cyberskillPath);

    const setupAction = async () => {
        if (!isCyberskillInstalled) {
            logProcessStep(
                '1.1',
                'Cyberskill not found, performing clean install',
                '⚠️',
            );
            await executeCommand(
                `npx rimraf ${config.INIT_CWD}/node_modules ${config.INIT_CWD}/package-lock.json`,
                '1.2',
                'Cleaning up node_modules and package-lock.json',
            );
            await executeCommand(
                'npm i -f',
                '1.3',
                'Installing all dependencies',
            );
        } else {
            const checkCyberskillOutdated = async () => {
                const { stdout } = await execPromise(
                    'npm outdated cyberskill --json',
                );
                const outdatedPackages = JSON.parse(stdout || '{}');
                return Object.prototype.hasOwnProperty.call(
                    outdatedPackages,
                    'cyberskill',
                );
            };

            const isCyberskillOutdated = await checkCyberskillOutdated();

            if (isCyberskillOutdated) {
                logProcessStep(
                    '1.2',
                    'Cyberskill is outdated, updating it',
                    '🔄',
                );
                await executeCommand(
                    'npm i cyberskill@latest -f',
                    '1.3',
                    'Reinstalling cyberskill to latest version',
                );
            } else {
                logProcessStep('1.2', 'Cyberskill is already up to date', '✔️');
            }
        }
    };

    await runWithSpinner(E_SpinnerMessage.Setup, setupAction);
};

yargs(hideBin(process.argv))
    .command('lint:check', 'Run linting checks', performLintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', performLintFix)
    .command('setup', 'Run setup with given configuration', performSetup)
    .help()
    .parse();
