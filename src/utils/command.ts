import { exec } from 'node:child_process';
import process from 'node:process';
import * as util from 'node:util';

import type { I_CommandContext, I_EslintError, I_IssueEntry, T_Command, T_CommandMapInput } from '#typescript/command.js';

import { DEBUG } from '#constants/common-nodejs.js';
import { CYBERSKILL_CLI, CYBERSKILL_PACKAGE_NAME, PNPM_EXEC_CLI, TSX_CLI } from '#constants/path.js';
import { E_IssueType } from '#typescript/command.js';

import { logNodeJS as log } from './log-nodejs.js';
import { checkPackage } from './package.js';
import { storageServer } from './storage-server.js';

const execPromise = util.promisify(exec);

function getErrorListKey(timestamp: number) {
    return `error_list:${timestamp}`;
}

async function saveErrorListToStorage(errorList: I_IssueEntry[]): Promise<void> {
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
                log.info(`📂 Open the error list manually: ${logPath}`);
            }
        }, 10);
    }
    catch (error) {
        log.error(`Failed to save errors: ${(error as Error).message}`);
    }
}

export async function getStoredErrorLists(): Promise<I_IssueEntry[]> {
    try {
        const keys = await storageServer.keys();

        const errorKeys = Array.isArray(keys)
            ? keys.filter(key => key?.startsWith?.('error_list:'))
            : [];

        const allErrors = await Promise.all(
            errorKeys.map(async (key) => {
                const entry = await storageServer.get<{ errors: I_IssueEntry[]; timestamp: number }>(key);

                return entry?.errors || [];
            }),
        );

        return allErrors.flat();
    }
    catch (error) {
        log.error(`Failed to retrieve stored errors: ${(error as Error).message}`);

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
        log.error(`Failed to clear error lists: ${(error as Error).message}`);
    }
}

function parseTextErrors(output: string): void {
    const errorList: I_IssueEntry[] = [];
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
                    type: eslintMatch[3] === E_IssueType.Error ? E_IssueType.Error : E_IssueType.Warning,
                    message: eslintMatch[4].trim(),
                    rule: eslintMatch[5].trim(),
                });
            }
            else if (tsMatch.length) {
                errorList.push({
                    file: tsMatch[1],
                    position: `${tsMatch[2]}:${tsMatch[3]}`,
                    type: tsMatch[4] === E_IssueType.Error ? E_IssueType.Error : E_IssueType.Warning,
                    message: tsMatch[5].trim(),
                });
            }
            else if (commitlintMatch.length) {
                errorList.push({
                    file: 'commitlint',
                    type: E_IssueType.Error,
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

    if (DEBUG && unmatchedLines.length) {
        log.warn(`Unmatched lines:`);
        unmatchedLines.forEach(line => log.info(`  ${line}`));
    }
}

function parseCommandOutput(output: string): void {
    try {
        const results: I_EslintError[] = JSON.parse(output);
        const errorList: I_IssueEntry[] = [];

        results.forEach(({ filePath, messages }) => {
            messages.forEach(({ severity, line, column, ruleId, message }) => {
                errorList.push({
                    type: severity === 2 ? E_IssueType.Error : E_IssueType.Warning,
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
        log.warn('Process interrupted. Terminating...');
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
            log.error(`Command failed: ${message}`);
        }
    }
}

export function rawCommand(cmd: string) {
    return { raw: true, cmd };
}

function formatCLI(command: string, context?: I_CommandContext) {
    if (context?.isRemote) {
        return `${PNPM_EXEC_CLI} ${CYBERSKILL_PACKAGE_NAME} ${command}`;
    }

    if (context?.isCurrentProject) {
        return `${PNPM_EXEC_CLI} ${TSX_CLI} src/cli.ts ${command}`;
    }

    return `${PNPM_EXEC_CLI} ${CYBERSKILL_CLI} ${command}`;
}

export function formatCommand(command: T_Command, context?: I_CommandContext) {
    if (typeof command === 'function') {
        return formatCLI(command(context), context);
    }

    if (typeof command === 'object' && command?.raw === true) {
        return command.cmd;
    }

    if (typeof command === 'string') {
        return formatCLI(command, context);
    }

    return command;
}

export async function resolveCommands(input: T_CommandMapInput, context: Partial<I_CommandContext> = {}) {
    const isRemote = context?.isRemote ?? false;
    const isCurrentProject = isRemote
        ? false
        : (await checkPackage(CYBERSKILL_PACKAGE_NAME)).isCurrentProject;

    const ctx: I_CommandContext = { isRemote, isCurrentProject };
    const commands = typeof input === 'function' ? input(ctx) : input;

    return Object.fromEntries(
        Object.entries(commands).map(([key, cmd]) => [key, formatCommand(cmd, ctx)]),
    );
}
