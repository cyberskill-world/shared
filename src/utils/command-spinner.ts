import process from 'node:process';
import ora from 'ora';

import type { I_SpinnerOptions } from '../typescript/command.js';

/**
 * Wraps an async function with a loading spinner.
 * @param message Message to display in the spinner.
 * @param action Async action to perform.
 * @param options Additional options.
 */
export async function runWithSpinner(message: string, action: () => Promise<void>, options: I_SpinnerOptions = {}): Promise<void> {
    const { successMessage, failureMessage, errorList = [], exitOnError = true } = options;
    const spinner = ora({ text: message, color: 'cyan', spinner: 'dots' }).start();

    try {
        await action();

        if (errorList.length) {
            if (exitOnError) {
                spinner.fail(failureMessage || `${message} ❌`);
                process.exit(1);
            }
            else {
                spinner.fail(failureMessage || `${message} ❌`);
            }
        }
        else {
            spinner.succeed(successMessage || `${message} ✅`);
        }
    }
    catch (error) {
        spinner.fail(failureMessage || `${message} ❌`);
        if (exitOnError) {
            process.exit(1);
        }
        else {
            throw error;
        }
    }
}
