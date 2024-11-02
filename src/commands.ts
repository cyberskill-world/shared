#!/usr/bin/env node
/* eslint-disable import/no-nodejs-modules */
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
    I_ExecError,
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
        if (match && !match[1].includes('Code style issues found')) {
            errorList.push({
                type: E_ErrorType.Warning,
                file: match[1],
                position: '',
                rule: 'Prettier',
                message: 'Code style issue found',
            });
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
    const colorMap = new Map([
        [red, 'red'],
        [yellow, 'yellow'],
        [green, 'green'],
    ]);

    const borderColor = colorMap.get(color) || 'green';

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
                `${color(`${icon} File:`)} ${blue(`${file}:${position}`)}`,
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
        console.log(boxAround(bold(green('✔ No issue found!')), green));
    } else {
        logResults(warnings, yellow, '⚠', 'Warnings');
        logResults(errors, red, '✖', 'Errors');
    }
};

const runTypescript = async (): Promise<void> => {
    if (fs.existsSync(config.TSCONFIG_PATH)) {
        await executeCommand(
            `npx tsc -p ${config.TSCONFIG_PATH} --noEmit`,
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

    const packageJsonPath = `${config.INIT_CWD}/package.json`;
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    const isCyberskillInstalled = fs.existsSync(
        `${config.INIT_CWD}/node_modules/cyberskill`,
    );
    let cyberskillVersion = '';

    if (isCyberskillInstalled) {
        const { stdout } = await execPromise('npm ls cyberskill --json');
        cyberskillVersion =
            JSON.parse(stdout || '{}').dependencies?.cyberskill?.version ||
            'unknown';
    }

    const updateCyberskillDependency = async () => {
        if (
            packageJson.dependencies?.cyberskill &&
            packageJson.dependencies.cyberskill !== 'latest'
        ) {
            logProcessStep(
                '1.1',
                `Updating cyberskill in package.json to "latest" (current version: ${cyberskillVersion})`,
                '⚠️',
            );
            packageJson.dependencies.cyberskill = 'latest';
            fs.writeFileSync(
                packageJsonPath,
                JSON.stringify(packageJson, null, 2),
            );
            await executeCommand(
                'npx sort-package-json',
                '1.2',
                'Sorting package.json',
            );
        }
    };

    const cleanAndInstallDependencies = async () => {
        logProcessStep(
            '1.3',
            `Performing clean install (cyberskill version: ${cyberskillVersion || 'not installed'})`,
            '🔄',
        );
        await executeCommand(
            `npx rimraf ${config.INIT_CWD}/node_modules ${config.INIT_CWD}/package-lock.json`,
            '1.4',
            'Cleaning node_modules and package-lock.json',
        );
        await executeCommand('npm i -f', '1.5', 'Installing all dependencies');
    };

    const updateCyberskillIfNeeded = async () => {
        try {
            const { stdout } = await execPromise(
                'npm outdated cyberskill --json',
            );
            const outdatedData = JSON.parse(stdout || '{}');
            const latestVersion = outdatedData.cyberskill?.latest;
            const isOutdated = !!outdatedData.cyberskill;

            if (
                isOutdated ||
                packageJson.dependencies.cyberskill !== 'latest'
            ) {
                logProcessStep(
                    '1.3',
                    `Updating cyberskill to latest version (current version: ${cyberskillVersion})`,
                    '🔄',
                );
                await executeCommand(
                    `npm i cyberskill@${latestVersion || 'latest'} -f`,
                    '1.4',
                    `Reinstalling cyberskill to latest version (previous version: ${cyberskillVersion})`,
                );
            } else {
                logProcessStep(
                    '1.3',
                    `Cyberskill is already up to date (version: ${cyberskillVersion})`,
                    '✔️',
                );
            }
        } catch (error) {
            const execError = error as I_ExecError;

            if (execError.code === 1 && execError.stdout) {
                const outdatedData = JSON.parse(execError.stdout);
                const latestVersion = outdatedData.cyberskill?.latest;

                if (
                    outdatedData.cyberskill ||
                    packageJson.dependencies.cyberskill !== 'latest'
                ) {
                    logProcessStep(
                        '1.3',
                        `Updating cyberskill to latest version (current version: ${cyberskillVersion})`,
                        '🔄',
                    );
                    await executeCommand(
                        `npm i cyberskill@${latestVersion || 'latest'} -f`,
                        '1.4',
                        `Reinstalling cyberskill to latest version (previous version: ${cyberskillVersion})`,
                    );
                    return;
                }
            }
            console.error(
                red(`Error checking outdated cyberskill package: ${error}`),
            );
            logProcessStep(
                '1.3',
                `Unable to check for outdated cyberskill package. Proceeding without update.`,
                '⚠️',
            );
        }
    };

    const setupAction = async () => {
        if (packageJson.name === 'cyberskill') {
            await executeCommand(
                'npm i -f',
                '1.1',
                `Installing all dependencies, cyberskill version: ${packageJson.version}`,
            );
        } else {
            await updateCyberskillDependency();

            if (!isCyberskillInstalled) {
                await cleanAndInstallDependencies();
            } else {
                await updateCyberskillIfNeeded();
            }
        }
    };

    await runWithSpinner(
        `${E_SpinnerMessage.Setup} (cyberskill version: ${cyberskillVersion || 'not installed'})`,
        setupAction,
    );
};

yargs(hideBin(process.argv))
    .command('lint:check', 'Run linting checks', performLintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', performLintFix)
    .command('setup', 'Run setup with given configuration', performSetup)
    .help()
    .parse();
