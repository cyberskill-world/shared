import boxen from 'boxen';
import chalk from 'chalk';

import type { I_ErrorEntry } from '../typescript/command.js';

import { E_ErrorType } from '../typescript/command.js';
import { getStoredErrorLists } from './command-error.js';

const { green, yellow, red, gray, bold, blue } = chalk;

const log = {
    // ✅ Unified Step Log
    step: (current: number | null, total: number | null, message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        const stepPart = current !== null && total !== null ? `STEP [${current}/${total}]` : `STEP`;
        console.log(`${green(stepPart)} ${gray(`[${timestamp}]`)} ${bold(message)}`);
    },

    // ✅ Success Log
    success: (message: string) => {
        console.log(`${green('✔ SUCCESS')} ${message}`);
    },

    // ✅ Error Log
    error: (message: string) => {
        console.log(`${red('✖ ERROR')} ${message}`);
    },

    // ✅ Warning Log
    warning: (message: string) => {
        console.log(`${yellow('⚠ WARNING')} ${message}`);
    },

    // ✅ Info Log
    info: (message: string) => {
        console.log(`${gray('ℹ INFO')} ${message}`);
    },

    // ✅ Boxed Result Log
    boxedResult: (title: string, message: string, color = green) => {
        console.log(
            boxen(bold(color(`${title}\n${message}`)), {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: color === red ? 'red' : color === yellow ? 'yellow' : 'green',
            }),
        );
    },

    // ✅ Log Results
    logResults: (entries: I_ErrorEntry[], color: typeof yellow | typeof red, icon: string, groupName: string) => {
        if (entries.length) {
            entries.forEach(({ file, position, rule, message }) => {
                console.log(
                    `${color(`${icon} File:`)} ${blue(`${file}${position ? `:${position}` : ''}`)}`,
                );

                if (rule) {
                    console.log(`   ${color('Rule:')} ${color(rule)}`);
                }
                console.log(`   ${color('Message:')} ${color(message)}`);
            });

            console.log(
                boxen(
                    bold(color(`${icon} Total ${groupName}: ${entries.length}`)),
                    {
                        padding: 1,
                        margin: 1,
                        borderStyle: 'round',
                        borderColor: color === red ? 'red' : color === yellow ? 'yellow' : 'green',
                    },
                ),
            );
            console.log(gray('─'.repeat(40)));
        }
    },

    // ✅ Display Results
    displayResults: async () => {
        const allResults = await getStoredErrorLists();
        const errors = allResults.filter(e => e.type === E_ErrorType.Error);
        const warnings = allResults.filter(e => e.type === E_ErrorType.Warning);

        if (!errors.length && !warnings.length) {
            log.boxedResult('✔ NO ISSUES FOUND', '', green);
        }
        else {
            log.logResults(warnings, yellow, '⚠', 'Warnings');
            log.logResults(errors, red, '✖', 'Errors');
        }
    },
};

export { log };
