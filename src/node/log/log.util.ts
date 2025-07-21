import type { ChalkInstance } from 'chalk';

import chalk from 'chalk';
import consola from 'consola';
import { GraphQLError } from 'graphql';

import type { I_Return } from '#typescript/index.js';

import { getEnv } from '#config/env/index.js';
import { RESPONSE_STATUS } from '#constant/index.js';

import type { I_CatchErrorOptions, I_IssueEntry, I_Log, I_ThrowError } from './log.type.js';

const env = getEnv();

/**
 * Throws a standardized error with optional status information and type specification.
 * This function creates and throws errors that can be either GraphQL errors (with extensions)
 * or standard JavaScript errors, depending on the specified type.
 *
 * @param options - Error configuration including message, status information, and error type.
 * @param options.message - The error message to display.
 * @param options.status - The response status information (defaults to INTERNAL_SERVER_ERROR).
 * @param options.type - The type of error to throw ('graphql' or 'rest', defaults to 'graphql').
 * @throws {GraphQLError} When type is 'graphql', throws a GraphQL error with extensions.
 * @throws {Error} When type is 'rest' or unspecified, throws a standard JavaScript error.
 */
export function throwError({
    message,
    status = RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
    type = 'graphql',
}: I_ThrowError): never {
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

/**
 * Gets a chalk color instance by keyword name.
 * This function safely retrieves a chalk color function by name, falling back to green
 * if the specified color is not available or invalid.
 *
 * @param color - The color keyword to get the chalk instance for.
 * @returns A chalk instance for the specified color, or green as fallback.
 */
function chalkKeyword(color: string): ChalkInstance {
    const chalkColor = chalk[color as keyof typeof chalk];

    return typeof chalkColor === 'function' ? (chalkColor as ChalkInstance) : chalk.green;
}

/**
 * Enhanced logging interface that extends consola with custom functionality.
 * This object provides all standard consola logging methods plus additional features
 * like boxed log printing for structured error/warning display.
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
    /**
     * Prints a boxed log with structured issue information.
     * This method displays issues (errors or warnings) in a formatted box with:
     * - File paths and line/column positions
     * - Rule violations (if applicable)
     * - Error/warning messages
     * - Color-coded output based on issue type
     *
     * @param title - The title to display in the box header.
     * @param issues - An array of issue entries to display.
     * @param color - The color to use for highlighting (defaults to 'red').
     */
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

/**
 * Catches and handles errors with configurable behavior.
 * This function provides a standardized way to handle errors with options for:
 * - Logging control (whether to log the error)
 * - Return value specification (what to return on error)
 * - Custom callback execution (additional error handling)
 *
 * @param errorInput - The error to catch and handle.
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
        return returnValue as T;
    }

    return {
        success: false,
        message: error.message,
        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
    };
}
