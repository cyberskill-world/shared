import { consola } from 'consola/browser';

import type { I_Log, I_Return } from '#typescript/index.js';

import { RESPONSE_STATUS } from '#constant/index.js';

import type { I_CatchErrorOptions } from './log.type.js';

/**
 * Browser-compatible logging interface using consola.
 * This object provides all standard consola logging methods for use in browser environments,
 * including error, warning, info, success, and debug logging capabilities.
 */
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

/**
 * Catches and handles errors with configurable behavior for React applications.
 * This function provides a standardized way to handle errors in React components
 * with options for logging control, return value specification, and custom callback execution.
 *
 * The function handles different error input types and provides consistent error
 * response formatting for React applications.
 *
 * @param errorInput - The error to catch and handle, can be Error object, string, or unknown type.
 * @param options - Configuration options for error handling behavior.
 * @returns Either the specified return value or a standardized error response object.
 */
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
