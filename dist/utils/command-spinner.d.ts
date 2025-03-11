import { I_SpinnerOptions } from '../typescript/command.js';

/**
 * Wraps an async function with a loading spinner.
 * @param message Message to display in the spinner.
 * @param action Async action to perform.
 * @param options Additional options.
 */
declare function runWithSpinner(message: string, action: () => Promise<void>, options?: I_SpinnerOptions): Promise<void>;

export { runWithSpinner };
