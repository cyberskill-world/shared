import { exec } from 'node:child_process';
import process from 'node:process';
import * as util from 'node:util';

import type { I_ErrorEntry, I_EslintError } from '../typescript/command.js';

import { E_ErrorType } from '../typescript/command.js';
import { saveErrorListToStorage } from './command-error.js';
import { log } from './command-log.js';

const execPromise = util.promisify(exec);

const DEBUG = process.env.DEBUG === 'true';

// eslint-disable-next-line regexp/no-super-linear-backtracking
const eslintErrorDetailsRegex = /^\s*(\d+):(\d+)\s+(error|warning)\s+(.+?)\s+(\S+)$/;
const tsRegex = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(\S.+)$/;
// eslint-disable-next-line regexp/no-super-linear-backtracking
const commitlintRegex = /^✖\s+(.*?)\s+\[(.*?)\]$/;

// ✅ Unified Error Parser
function parseTextErrors(output: string): void {
    const errorList: I_ErrorEntry[] = [];
    const unmatchedLines: string[] = [];
    let lastFilePath = '';

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
                    type: eslintMatch[3] === 'error' ? E_ErrorType.Error : E_ErrorType.Warning,
                    message: eslintMatch[4].trim(),
                    rule: eslintMatch[5].trim(),
                });
            }
            else if (tsMatch.length) {
                errorList.push({
                    file: tsMatch[1],
                    position: `${tsMatch[2]}:${tsMatch[3]}`,
                    type: tsMatch[4] === 'error' ? E_ErrorType.Error : E_ErrorType.Warning,
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
        log.warning(`Unmatched lines:`);
        // eslint-disable-next-line no-console
        unmatchedLines.forEach(line => console.log(`  ${line}`));
    }
}

// ✅ JSON-based Error Parser
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

// ✅ Unified Command Execution
export async function executeCommand(command: string, parser = parseCommandOutput): Promise<void> {
    const controller = new AbortController();

    process.on('SIGINT', () => {
        log.warning('Process interrupted. Terminating...');
        controller.abort();
        process.exit();
    });

    try {
        const { stdout, stderr } = await execPromise(command, {
            maxBuffer: 1024 * 1024 * 100, // Increased buffer size for large output
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
