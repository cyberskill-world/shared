import type { ApolloError } from '@apollo/client';

let showErrorCallback: ((err: ApolloError) => void) | null = null;

export function setGlobalApolloErrorCallback(callback: (err: ApolloError) => void) {
    showErrorCallback = callback;
}

export function showGlobalApolloError(error: ApolloError) {
    showErrorCallback?.(error);
}
