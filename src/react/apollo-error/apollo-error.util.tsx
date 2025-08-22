import type { GraphQLError } from 'graphql';

/**
 * Global callback function for displaying Apollo errors.
 * This variable holds the callback function that will be called when a global
 * Apollo error needs to be displayed. It is set by the ApolloErrorProvider
 * and used throughout the application for consistent error handling.
 */
let showErrorCallback: ((err: GraphQLError | Error) => void) | null = null;

/**
 * Sets the global callback function for Apollo error handling.
 * This function registers a callback that will be called whenever a global
 * Apollo error needs to be displayed. The callback is typically set by the
 * ApolloErrorProvider component and used throughout the application for
 * consistent error handling.
 *
 * @param callback - The function to be called when a global Apollo error occurs.
 */
export function setGlobalApolloErrorCallback(callback: (err: GraphQLError | Error) => void) {
    showErrorCallback = callback;
}

/**
 * Displays a global Apollo error using the registered callback.
 * This function triggers the global error display system by calling the
 * registered callback function. If no callback is registered, the function
 * does nothing, providing safe error handling even when the provider is not set up.
 *
 * @param error - The Apollo error to display globally.
 */
export function showGlobalApolloError(error: GraphQLError | Error) {
    showErrorCallback?.(error);
}
