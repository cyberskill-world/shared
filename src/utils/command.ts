/* eslint-disable no-console */
import type { ChalkInstance } from 'chalk';

import boxen from 'boxen';
import chalk from 'chalk';
import { exec } from 'node:child_process';
import process from 'node:process';
import * as util from 'node:util';

import type { I_BoxedLogOptions, I_CommandContext, I_ErrorEntry, I_EslintError, T_Command, T_CommandMapInput } from '#typescript/command.js';

import { CYBERSKILL_CLI, CYBERSKILL_PACKAGE_NAME, PNPM_DLX_CLI, PNPM_EXEC_CLI, TSX_CLI } from '#constants/path.js';
import { E_ErrorType } from '#typescript/command.js';

import { checkPackage } from './package.js';
import { storageServer } from './storage-server.js';

const DEBUG = process.env.DEBUG === 'true';

const execPromise = util.promisify(exec);

const { gray, blue } = chalk;

const getTimeStamp = () => gray(`[${new Date().toLocaleTimeString()}]`);

function chalkKeyword(color: string): ChalkInstance {
    const chalkColor = chalk[color as keyof typeof chalk];
    return typeof chalkColor === 'function' ? (chalkColor as ChalkInstance) : chalk.green;
}

function printLog(type: string, color: string, icon: string, message: string) {
    const chalkColor = chalkKeyword(color);
    console.log(`${getTimeStamp()} ${chalkColor(`${icon} ${type}`)} ${message}`);
}

function printBoxedLog<T extends string | I_ErrorEntry[]>(
    title: string,
    content: T,
    {
        color = 'green',
        padding = 1,
        margin = 1,
        borderStyle = 'round',
        titleColor = 'bold',
    }: I_BoxedLogOptions = {},
) {
    const chalkColor = chalkKeyword(color);
    const chalkTitleColor = chalkKeyword(titleColor);

    if (typeof content === 'string') {
        console.log(
            boxen(chalkTitleColor(chalkColor(`${title}\n${content}`)), {
                padding,
                margin,
                borderStyle,
                borderColor: color,
            }),
        );
        return;
    }

    if (Array.isArray(content) && content.length) {
        content.forEach(({ file, position, rule, message }) => {
            console.log(
                `${getTimeStamp()} ${chalkColor('File:')} ${blue(
                    `${file}${position ? `:${position}` : ''}`,
                )}`,
            );

            if (rule)
                console.log(`   ${chalkColor('Rule:')} ${chalkColor(rule)}`);
            console.log(`   ${chalkColor('Message:')} ${chalkColor(message)}`);
        });

        console.log(
            boxen(chalkTitleColor(chalkColor(`${title}: ${content.length}`)), {
                padding,
                margin,
                borderStyle,
                borderColor: color,
            }),
        );

        console.log(gray('─'.repeat(40)));
    }
}

export const commandLog = {
    success: (message: string) => printLog('SUCCESS', 'green', '✔', message),
    error: (message: string) => printLog('ERROR', 'red', '✖', message),
    warning: (message: string) => printLog('WARNING', 'yellow', '⚠', message),
    info: (message: string) => printLog('INFO', 'blue', 'ℹ', message),
    printBoxedLog,
};

const getErrorListKey = (timestamp: number) => `error_list:${timestamp}`;

export async function saveErrorListToStorage(errorList: I_ErrorEntry[]): Promise<void> {
    if (errorList.length === 0) {
        return;
    }

    const timestamp = Date.now();
    const key = getErrorListKey(timestamp);

    try {
        await storageServer.set(key, {
            errors: errorList,
            timestamp,
        });

        setTimeout(async () => {
            const logPath = await storageServer.getLogLink(key);

            if (logPath) {
                commandLog.info(`📂 Open the error list manually: ${logPath}`);
            }
        }, 10);
    }
    catch (error) {
        commandLog.error(`Failed to save errors: ${(error as Error).message}`);
    }
}

export async function getStoredErrorLists(): Promise<I_ErrorEntry[]> {
    try {
        const keys = await storageServer.keys();

        const errorKeys = Array.isArray(keys)
            ? keys.filter(key => key?.startsWith?.('error_list:'))
            : [];

        const allErrors = await Promise.all(
            errorKeys.map(async (key) => {
                const entry = await storageServer.get<{ errors: I_ErrorEntry[]; timestamp: number }>(key);

                return entry?.errors || [];
            }),
        );

        return allErrors.flat();
    }
    catch (error) {
        commandLog.error(`Failed to retrieve stored errors: ${(error as Error).message}`);

        return [];
    }
}

export async function clearAllErrorLists(): Promise<void> {
    try {
        const keys = await storageServer.keys();

        const errorKeys = Array.isArray(keys)
            ? keys.filter(key => key?.startsWith?.('error_list:'))
            : [];

        await Promise.all(errorKeys.map(key => storageServer.remove(key)));
    }
    catch (error) {
        commandLog.error(`Failed to clear error lists: ${(error as Error).message}`);
    }
}

function parseTextErrors(output: string): void {
    const errorList: I_ErrorEntry[] = [];
    const unmatchedLines: string[] = [];
    let lastFilePath = '';
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const eslintErrorDetailsRegex = /^\s*(\d+):(\d+)\s+(error|warning)\s+(.+?)\s+(\S+)$/;
    const tsRegex = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(\S.+)$/;
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const commitlintRegex = /^✖\s+(.*?)\s+\[(.*?)\]$/;

    output.split('\n').forEach((line) => {
        if (line.startsWith('/')) {
            lastFilePath = line.trim();
        }
        else {
            const eslintMatch = eslintErrorDetailsRegex.exec(line) || [];
            const tsMatch = tsRegex.exec(line) || [];
            const commitlintMatch = commitlintRegex.exec(line) || [];

            if (eslintMatch.length && lastFilePath) {
                errorList.push({
                    file: lastFilePath,
                    position: `${eslintMatch[1]}:${eslintMatch[2]}`,
                    type: eslintMatch[3] === E_ErrorType.Error ? E_ErrorType.Error : E_ErrorType.Warning,
                    message: eslintMatch[4].trim(),
                    rule: eslintMatch[5].trim(),
                });
            }
            else if (tsMatch.length) {
                errorList.push({
                    file: tsMatch[1],
                    position: `${tsMatch[2]}:${tsMatch[3]}`,
                    type: tsMatch[4] === E_ErrorType.Error ? E_ErrorType.Error : E_ErrorType.Warning,
                    message: tsMatch[5].trim(),
                });
            }
            else if (commitlintMatch.length) {
                errorList.push({
                    file: 'commitlint',
                    type: E_ErrorType.Error,
                    message: commitlintMatch[1].trim(),
                    rule: commitlintMatch[2].trim(),
                });
            }
            else {
                unmatchedLines.push(line.trim());
            }
        }
    });

    if (errorList.length) {
        saveErrorListToStorage(errorList);
    }

    if (unmatchedLines.length && DEBUG) {
        commandLog.warning(`Unmatched lines:`);
        unmatchedLines.forEach(line => console.log(`  ${line}`));
    }
}

function parseCommandOutput(output: string): void {
    try {
        const results: I_EslintError[] = JSON.parse(output);
        const errorList: I_ErrorEntry[] = [];

        results.forEach(({ filePath, messages }) => {
            messages.forEach(({ severity, line, column, ruleId, message }) => {
                errorList.push({
                    type: severity === 2 ? E_ErrorType.Error : E_ErrorType.Warning,
                    file: filePath,
                    position: `${line}:${column}`,
                    rule: ruleId,
                    message,
                });
            });
        });

        if (errorList.length) {
            saveErrorListToStorage(errorList);
        }
    }
    catch {
        parseTextErrors(output);
    }
}

export async function executeCommand(command: string, parser = parseCommandOutput): Promise<void> {
    const controller = new AbortController();

    process.on('SIGINT', () => {
        commandLog.warning('Process interrupted. Terminating...');
        controller.abort();
        process.exit();
    });

    try {
        const { stdout, stderr } = await execPromise(command, {
            maxBuffer: 1024 * 1024 * 100,
            signal: controller.signal,
        });

        [stdout, stderr].forEach(output => output && parser(output));
    }
    catch (error) {
        const { stdout, stderr, message } = error as {
            stdout?: string;
            stderr?: string;
            message: string;
        };

        [stdout, stderr].forEach(output => output && parser(output));

        if (!stderr && !stdout) {
            commandLog.error(`Command failed: ${message}`);
        }
    }
}

export const commandFormatter = {
    raw: (cmd: string) => ({ raw: true, cmd } as const),
    isRaw(cmd: any): cmd is { raw: true; cmd: string } {
        return typeof cmd === 'object' && cmd !== null && cmd.raw === true;
    },
    format(command: T_Command, context?: I_CommandContext): string {
        if (typeof command === 'function') {
            return commandFormatter.formatCLI(command(context), context);
        }

        if (commandFormatter.isRaw(command)) {
            return command.cmd;
        }

        return commandFormatter.formatCLI(command, context);
    },
    formatCLI(command: string, context?: I_CommandContext): string {
        if (context?.isRemote) {
            return `${PNPM_DLX_CLI} ${CYBERSKILL_PACKAGE_NAME} ${command}`;
        }

        if (context?.isCurrentProject) {
            return `${PNPM_EXEC_CLI} ${TSX_CLI} src/cli.ts ${command}`;
        }

        return `${PNPM_EXEC_CLI} ${CYBERSKILL_CLI} ${command}`;
    },
};

export async function resolveCommands(input: T_CommandMapInput, context: Partial<I_CommandContext> = {}) {
    const isRemote = context?.isRemote ?? false;
    const isCurrentProject = isRemote
        ? false
        : (await checkPackage(CYBERSKILL_PACKAGE_NAME)).isCurrentProject;

    const ctx: I_CommandContext = { isRemote, isCurrentProject };
    const commands = typeof input === 'function' ? input(ctx) : input;

    return Object.fromEntries(
        Object.entries(commands).map(([key, cmd]) => [key, commandFormatter.format(cmd, ctx)]),
    );
}
