import type { ChalkInstance } from 'chalk';

import chalk from 'chalk';
import consola from 'consola';
import { GraphQLError } from 'graphql';

import { getEnv } from '#configs/env/index.js';
import { RESPONSE_STATUS } from '#constants/response-status.js';

import type { I_IssueEntry, I_Log_NodeJS, T_ThrowError } from './log.type.js';

const env = getEnv();

export function throwError({
    message,
    status = RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
    type = 'graphql',
}: T_ThrowError): never {
    const responseMessage
        = message ?? status.MESSAGE ?? 'Internal server error';

    if (type === 'graphql') {
        throw new GraphQLError(responseMessage, {
            extensions: { code: status.CODE },
        });
    }

    else {
        throw new Error(responseMessage);
    }
}

if (!env.DEBUG) {
    consola.level = 4;
}

function chalkKeyword(color: string): ChalkInstance {
    const chalkColor = chalk[color as keyof typeof chalk];

    return typeof chalkColor === 'function' ? (chalkColor as ChalkInstance) : chalk.green;
}

export const logNodeJS: I_Log_NodeJS = {
    silent: consola.silent,
    level: consola.level,
    fatal: consola.fatal,
    error: consola.error,
    warn: consola.warn,
    log: consola.log,
    info: consola.info,
    success: consola.success,
    ready: consola.ready,
    start: consola.start,
    box: consola.box,
    debug: consola.debug,
    trace: consola.trace,
    verbose: consola.verbose,
    printBoxedLog(title: string, issues: I_IssueEntry[], color = 'red') {
        if (!issues?.length) {
            consola.box(chalk.green(title));
            return;
        }

        issues.forEach(({ file, position, rule, message }) => {
            consola.log(`${chalk.gray('File:')} ${chalk.blue(`${file}${position ? `:${position}` : ''}`)}`);

            if (rule) {
                consola.log(`   ${chalkKeyword(color)('Rule:')} ${rule}`);
            }

            consola.log(`   ${chalkKeyword(color)('Message:')} ${message}`);
        });

        consola.box(chalkKeyword(color)(`${title} : ${issues.length}`));

        consola.log(chalk.gray('─'.repeat(40)));
    },
};
