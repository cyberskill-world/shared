/**
 * Wraps an async function with a loading spinner.
 * @param message Message to display in the spinner.
 * @param action Async action to perform.
 */
declare function runWithSpinner(message: string, action: () => Promise<void>): Promise<void>;

export { runWithSpinner };
