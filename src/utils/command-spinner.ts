import process from 'node:process';
import ora from 'ora';

import { getStoredErrorLists } from './command-error.js';

/**
 * Wraps an async function with a loading spinner.
 * @param message Message to display in the spinner.
 * @param action Async action to perform.
 */
export async function runWithSpinner(message: string, action: () => Promise<void>): Promise<void> {
    const spinner = ora({ text: message, color: 'cyan', spinner: 'dots' }).start();

    try {
        await action();
        const errorList = await getStoredErrorLists();

        if (errorList.length) {
            process.exit(1);
        }
        else {
            spinner.succeed(`${message}  ✅`);
        }
    }
    catch (error) {
        spinner.fail(`${message} ❌`);

        throw error;
    }
}
