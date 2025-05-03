import { consola } from 'consola/browser';

import type { I_Log, I_Return } from '#typescript/index.js';

import { RESPONSE_STATUS } from '#constant/index.js';

import type { I_CatchErrorOptions } from './log.type.js';

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
        return returnValue as I_Return<T>;
    }

    return {
        success: false,
        message: error.message,
        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
    };
}
