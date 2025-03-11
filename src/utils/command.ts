import chalk from 'chalk';
import { exec } from 'node:child_process';
import process from 'node:process';
import * as util from 'node:util';

import type {
    I_ErrorEntry,
    I_EslintError,
} from '../typescript/command.js';

import {
    E_ErrorType,
} from '../typescript/command.js';
import { saveErrorListToStorage } from './command-error.js';

const execPromise = util.promisify(exec);
const { gray, white } = chalk;

const errorList: I_ErrorEntry[] = [];

export function logProcessStep(message: string, icon: string = ''): void {
    const timestamp = new Date().toLocaleString();
    console.log(`${icon} [${timestamp}] ${white(message)}`);
}

function parseTextErrors(output: string): void {
    const eslintErrorDetailsRegex = /^\s*(\d+):(\d+)\s+(error|warning)\s+(\S+)\s+(\S+)$/;
    const tsRegex = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(\S.+)$/;
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const commitlintRegex = /^✖\s+(.*?)\s+\[(.*?)\]$/;

    const unmatchedLines: string[] = [];
    let lastFilePath = '';

    output.split('\n').forEach((line) => {
        if (line.startsWith('/')) {
            lastFilePath = line.trim();
        }
        else {
            const eslintMatch = eslintErrorDetailsRegex.exec(line);

            if (eslintMatch && lastFilePath) {
                errorList.push({
                    file: lastFilePath,
                    position: `${eslintMatch[1]}:${eslintMatch[2]}`,
                    type: eslintMatch[3] === 'error' ? E_ErrorType.Error : E_ErrorType.Warning,
                    message: eslintMatch[4].trim(),
                    rule: eslintMatch[5].trim(),
                });
            }
            else {
                const tsMatch = tsRegex.exec(line);

                if (tsMatch) {
                    errorList.push({
                        file: tsMatch[1],
                        position: `${tsMatch[2]}:${tsMatch[3]}`,
                        type: tsMatch[4] as E_ErrorType,
                        message: tsMatch[5].trim(),
                    });
                }
                else {
                    const commitlintMatch = commitlintRegex.exec(line);

                    if (commitlintMatch) {
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
            }
        }
    });

    if (unmatchedLines.length > 0) {
        console.log(gray('Unmatched lines:'));
        unmatchedLines.forEach(line => console.info(line));
    }
}

function parseCommandOutput(output: string): void {
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
    }
    catch {
        parseTextErrors(output);
    }
}

export async function executeCommand(command: string, description: string, parser = parseCommandOutput): Promise<void> {
    logProcessStep(description);

    const controller = new AbortController();

    process.on('SIGINT', () => {
        console.log('Terminating process...');
        controller.abort();
        process.exit();
    });

    try {
        const { stdout, stderr } = await execPromise(command, {
            maxBuffer: 1024 * 1024 * 100,
            signal: controller.signal,
        });
        [stdout, stderr].forEach(output => output && parser(output));

        // ✅ Save whole errorList directly
        if (errorList.length) {
            await saveErrorListToStorage(errorList);
        }
    }
    catch (error) {
        console.error(`Command failed: ${(error as Error).message}`);
    }
}
