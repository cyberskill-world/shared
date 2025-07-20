import type { ChalkInstance } from 'chalk';

import chalk from 'chalk';
import consola from 'consola';
import { GraphQLError } from 'graphql';

import type { I_Return } from '#typescript/index.js';

import { getEnv } from '#config/env/index.js';
import { RESPONSE_STATUS } from '#constant/index.js';

import type { I_CatchErrorOptions, I_IssueEntry, I_Log, T_ThrowError } from './log.type.js';

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

export const log: I_Log = {
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
            const positionSuffix = position ? `:${position}` : '';
            const filePath = `${file}${positionSuffix}`;
            consola.log(`${chalk.gray('File:')} ${chalk.blue(filePath)}`);

            if (rule) {
                consola.log(`   ${chalkKeyword(color)('Rule:')} ${rule}`);
            }

            consola.log(`   ${chalkKeyword(color)('Message:')} ${message}`);
        });

        consola.box(chalkKeyword(color)(`${title} : ${issues.length}`));

        consola.log(chalk.gray('─'.repeat(40)));
    },
};

export function catchError<T = unknown>(errorInput: unknown, options: I_CatchErrorOptions & { returnValue: T }): T;
export function catchError<T = unknown>(errorInput: unknown, options?: I_CatchErrorOptions): I_Return<T>;
export function catchError<T = unknown>(errorInput: unknown, options?: I_CatchErrorOptions): I_Return<T> | T {
    const { shouldLog = true, returnValue, callback } = options ?? {};

    const error = errorInput instanceof Error
        ? errorInput
        : new Error(typeof errorInput === 'string' ? errorInput : 'Unknown error');

    if (shouldLog) {
        log.error(error.message);
    }

    if (callback && typeof callback === 'function') {
        callback(error);
    }

    if (returnValue) {
        return returnValue as T;
    }

    return {
        success: false,
        message: error.message,
        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
    };
}
