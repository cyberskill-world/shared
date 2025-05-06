import { exec } from 'node:child_process';
import process from 'node:process';
import * as util from 'node:util';

import { getEnv } from '#config/env/index.js';

import type { I_IssueEntry } from '../log/index.js';
import type { I_CommandContext, I_EslintError, T_Command, T_CommandMapInput } from './command.type.js';

import { catchError, E_IssueType, log } from '../log/index.js';
import { getPackage } from '../package/index.js';
import { CYBERSKILL_CLI, CYBERSKILL_CLI_PATH, CYBERSKILL_PACKAGE_NAME, PNPM_EXEC_CLI, TSX_CLI } from '../path/index.js';
import { storage } from '../storage/index.js';

const env = getEnv();
const execPromise = util.promisify(exec);

async function getPackageName() {
    const pkg = await getPackage();

    if (!pkg.success) {
        return Date.now().toString();
    }

    return pkg.result.name;
}

async function saveErrorListToStorage(errorList: I_IssueEntry[]): Promise<void> {
    if (errorList.length === 0) {
        return;
    }

    const packageName = await getPackageName();

    try {
        await storage.set(packageName, errorList);

        setTimeout(async () => {
            const logPath = await storage.getLogLink(packageName);

            if (logPath) {
                log.info(`📂 Open the error list manually: ${logPath}`);
            }
        }, 0);
    }
    catch (error) {
        catchError(error);
    }
}

export async function getStoredErrorLists(): Promise<I_IssueEntry[]> {
    try {
        const packageName = await getPackageName();
        const allErrors = await storage.get<I_IssueEntry[]>(packageName);

        return allErrors ?? [];
    }
    catch (error) {
        return catchError<I_IssueEntry[]>(error, {
            returnValue: [],
        });
    }
}

export async function clearAllErrorLists(): Promise<void> {
    try {
        const packageName = await getPackageName();
        await storage.remove(packageName);
    }
    catch (error) {
        catchError(error);
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
                    message: eslintMatch?.[4]?.trim() ?? '',
                    rule: eslintMatch?.[5]?.trim() ?? '',
                });
            }
            else if (tsMatch.length) {
                errorList.push({
                    file: tsMatch?.[1] ?? '',
                    position: `${tsMatch[2]}:${tsMatch[3]}`,
                    type: tsMatch[4] === E_IssueType.Error ? E_IssueType.Error : E_IssueType.Warning,
                    message: tsMatch?.[5]?.trim() ?? '',
                });
            }
            else if (commitlintMatch.length) {
                errorList.push({
                    file: 'commitlint',
                    type: E_IssueType.Error,
                    message: commitlintMatch?.[1]?.trim() ?? '',
                    rule: commitlintMatch?.[2]?.trim() ?? '',
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

    if (env.DEBUG && unmatchedLines.length) {
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

async function executeCommand(command: string | void, parser = parseCommandOutput): Promise<void> {
    const controller = new AbortController();

    process.on('SIGINT', () => {
        log.warn('Process interrupted. Terminating...');
        controller.abort();
        process.exit();
    });

    try {
        if (typeof command === 'string') {
            const { stdout, stderr } = await execPromise(command, {
                maxBuffer: 1024 * 1024 * 100,
                signal: controller.signal,
            });

            [stdout, stderr].forEach(output => output && parser(output));
        }
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
    if (context?.isCurrentProject) {
        return `${PNPM_EXEC_CLI} ${TSX_CLI} ${CYBERSKILL_CLI_PATH} ${command}`;
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

export async function resolveCommands(input: T_CommandMapInput) {
    const packageData = await getPackage({ name: CYBERSKILL_PACKAGE_NAME });

    if (packageData.success) {
        const ctx: I_CommandContext = { isCurrentProject: packageData.result.isCurrentProject };
        const commands = typeof input === 'function' ? input(ctx) : input;

        return Object.fromEntries(
            Object.entries(commands).map(([key, cmd]) => [key, formatCommand(cmd, ctx)]),
        );
    }
}

export async function runCommand(label: string, command: string | void) {
    try {
        log.start(`${label}`);

        if (env.DEBUG) {
            log.info(`→ ${command}`);
        }

        await executeCommand(command);
        log.success(`${label} done.`);
    }
    catch (error) {
        catchError(error);
    }
}
