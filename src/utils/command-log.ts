import boxen from 'boxen';
import chalk from 'chalk';

import type { I_ErrorEntry } from '../typescript/command.js';

import { E_ErrorType } from '../typescript/command.js';
import { getStoredErrorLists } from './command-error.js';

const { blue, red, yellow, green, gray, bold } = chalk;

function boxAround(text: string, color: typeof green | typeof yellow | typeof red): string {
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
}

function logResults(entries: I_ErrorEntry[], color: typeof yellow | typeof red, icon: string, groupName: string): void {
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
            boxAround(
                bold(color(`${icon} Total ${groupName}: ${entries.length}`)),
                color,
            ),
        );
        console.log(gray('─'.repeat(40)));
    }
}

export async function displayResults() {
    const allResult = await getStoredErrorLists();
    const errors = allResult.filter(e => e.type === E_ErrorType.Error);
    const warnings = allResult.filter(e => e.type === E_ErrorType.Warning);

    if (!errors.length && !warnings.length) {
        console.log(boxAround(bold(green('✔ NO ISSUE FOUND!')), green));
    }
    else {
        logResults(warnings, yellow, '⚠', 'Warnings');
        logResults(errors, red, '✖', 'Errors');
    }
}
