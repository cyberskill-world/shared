#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-nodejs-modules */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import yargs from 'yargs/yargs';
import boxen from 'boxen';
import chalk from 'chalk';
import { exec } from 'child_process';
import * as fs from 'fs';
import fetch from 'node-fetch';
import ora from 'ora';
import * as util from 'util';
import { hideBin } from 'yargs/helpers';

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

const logProcessStep = (message: string, icon: string = '') =>
    console.log(`${icon} ${white(message)}`);

const executeCommand = async (
    command: string,
    description: string,
    parser = parseCommandOutput,
): Promise<void> => {
    logProcessStep(description);

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

        if (errorList.length) {
            process.exit(1);
        } else {
            spinner.succeed(`${message}${E_SpinnerMessage.Success}`);
        }
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
    const eslintErrorDetailsRegex =
        /^\s*(\d+):(\d+)\s+(error|warning)\s+(.*?)\s+(\S+)$/;
    const prettierWarnRegex = /^\[warn\] (.+)$/;
    const tsRegex = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(.+)$/;

    let lastFilePath = '';

    output.split('\n').forEach((line) => {
        if (line.startsWith('/')) {
            lastFilePath = line.trim();
        } else {
            const eslintMatch = eslintErrorDetailsRegex.exec(line);

            if (eslintMatch && lastFilePath) {
                errorList.push({
                    file: lastFilePath,
                    position: `${eslintMatch[1]}:${eslintMatch[2]}`,
                    type:
                        eslintMatch[3] === 'error'
                            ? E_ErrorType.Error
                            : E_ErrorType.Warning,
                    message: eslintMatch[4].trim(),
                    rule: eslintMatch[5].trim(),
                });
            } else {
                const prettierMatch = prettierWarnRegex.exec(line);

                if (
                    prettierMatch &&
                    !prettierMatch[1].includes('Code style issues found')
                ) {
                    errorList.push({
                        type: E_ErrorType.Warning,
                        file: prettierMatch[1],
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
        const typeColor = groupName === 'Warnings' ? yellow : red;

        console.log(
            boxAround(
                bold(
                    green(`✔ No `) +
                        typeColor(`${groupName.toUpperCase()}`) +
                        green(` found.`),
                ),
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
        console.log(boxAround(bold(green('✔ NO ISSUE FOUND!')), green));
    } else {
        logResults(warnings, yellow, '⚠', 'Warnings');
        logResults(errors, red, '✖', 'Errors');
    }
};

const runTypescript = async (): Promise<void> => {
    if (fs.existsSync(config.TSCONFIG_PATH)) {
        await executeCommand(
            `npx --yes tsc -p ${config.TSCONFIG_PATH} --noEmit`,
            'TypeScript checking...',
        );
    } else {
        logProcessStep('tsconfig.json file not found.', '⚠️');
    }
};

const runEslint = async (fix = false): Promise<void> => {
    const command = `npx --yes eslint ${config.INIT_CWD}${fix ? ' --fix' : ' --format json'}`;
    await executeCommand(command, `Eslint ${fix ? 'fixing' : 'checking'}...`);
};

const runPrettier = async (fix = false): Promise<void> => {
    const command = `npx --yes prettier '${config.INIT_CWD}/${config.FILE_EXTENSIONS}'${fix ? ' --write' : ' --check'}`;
    await executeCommand(command, `Prettier ${fix ? 'fixing' : 'checking'}...`);
};

const runLintStaged = async (): Promise<void> => {
    const command = `npx --yes lint-staged`;
    await executeCommand(command, `Lint-staged processing...`);
};

const performLintCheck = async (): Promise<void> => {
    logProcessStep(`Starting lint check for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.LintCheck, async () => {
        errorList.length = 0;
        await Promise.all([runTypescript(), runEslint(), runPrettier()]);
        displayResults();
    });
};

const performLintFix = async (): Promise<void> => {
    logProcessStep(`Starting lint and format fix for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.LintFix, async () => {
        await Promise.all([runEslint(true), runPrettier(true)]);
        displayResults();
    });
};

const performLintStaged = async () => {
    logProcessStep(
        `Starting lint-staged process for ${process.env.INIT_CWD}`,
        '🚀',
    );
    await runWithSpinner(E_SpinnerMessage.LintStaged, async () => {
        errorList.length = 0;
        await Promise.all([runTypescript(), runLintStaged()]);
        displayResults();
    });
};

const performSetup = async (): Promise<void> => {
    logProcessStep(`Starting setup process for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.Setup, async () => {
        const packageJsonPath = `${config.INIT_CWD}/package.json`;

        const getLatestCyberskillVersion = async (): Promise<string> => {
            const response = await fetch(
                'https://registry.npmjs.org/cyberskill/latest',
            );
            const data = (await response.json()) as { version: string };

            return data.version;
        };

        const isCyberskillOutdated = async (): Promise<boolean> => {
            const latestVersion = await getLatestCyberskillVersion();

            try {
                const cyberskillPackageJsonPath = `${config.INIT_CWD}/node_modules/cyberskill/package.json`;
                const { version: installedVersion } = JSON.parse(
                    fs.readFileSync(cyberskillPackageJsonPath, 'utf-8'),
                );

                return installedVersion !== latestVersion;
            } catch {
                return true;
            }
        };

        const updateCyberskill = async (): Promise<void> => {
            const latestVersion = await getLatestCyberskillVersion();
            const packageJson = JSON.parse(
                fs.readFileSync(packageJsonPath, 'utf-8'),
            );
            packageJson.dependencies = {
                ...packageJson.dependencies,
                cyberskill: latestVersion,
            };
            fs.writeFileSync(
                packageJsonPath,
                JSON.stringify(packageJson, null, 2),
            );

            await executeCommand(
                'npx --yes sort-package-json',
                'Sorting package.json...',
            );
            await executeCommand(
                'npm i -f',
                'Installing all dependencies with updated cyberskill...',
            );
            await executeCommand('npm run lint:fix', 'Fixing lint issues...');
        };

        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf-8'),
        );

        if (packageJson.name === 'cyberskill') {
            logProcessStep(
                `Cyberskill is the current project. No setup needed.`,
                '✅',
            );
            return;
        }

        if (
            !packageJson.dependencies?.cyberskill ||
            (await isCyberskillOutdated())
        ) {
            logProcessStep(`Cyberskill is missing or outdated. Updating...`);
            await updateCyberskill();
        } else {
            logProcessStep(`Cyberskill is up to date`, '✅');
        }
    });
};

const performReset = async () => {
    logProcessStep(`Starting reset process for ${config.INIT_CWD}`, '🚀');
    await runWithSpinner(E_SpinnerMessage.Reset, async () => {
        await executeCommand(
            `npx --yes rimraf ${config.INIT_CWD}/node_modules ${config.INIT_CWD}/package-lock.json`,
            'Cleaning node_modules and package-lock.json...',
        );
        await executeCommand('npm i -f', 'Installing all dependencies...');
    });
};

yargs(hideBin(process.argv))
    .command('lint:check', 'Run linting checks', performLintCheck)
    .command('lint:fix', 'Fix linting and formatting issues', performLintFix)
    .command(
        'lint-staged',
        'Run lint-staged with given configuration',
        performLintStaged,
    )
    .command('setup', 'Run setup with given configuration', performSetup)
    .command('reset', 'Reset dependencies and install', performReset)
    .help()
    .parse();
