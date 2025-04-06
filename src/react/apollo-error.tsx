import type { ApolloError } from '@apollo/client';
import type { ReactNode } from 'react';

import { createContext, use, useEffect, useMemo, useState } from 'react';

import type { I_ApolloErrorViewerContext } from '#typescript/apollo-error.js';

import styles from './apollo-error.module.scss';

// #region -------------- ApolloErrorViewerContext --------------
const ApolloErrorViewerContext = createContext<I_ApolloErrorViewerContext | undefined>(undefined);
// #endregion

// #region -------------- useApolloErrorViewer --------------
export function useApolloErrorViewer() {
    const context = use(ApolloErrorViewerContext);

    if (!context) {
        throw new Error('useApolloErrorViewer must be used within ApolloErrorViewerProvider');
    }

    return context;
}
// #endregion

// #region -------------- ApolloErrorViewerCallback --------------
let showErrorCallback: ((err: ApolloError) => void) | null = null;

export function registerApolloErrorViewerCallback(fn: (err: ApolloError) => void) {
    showErrorCallback = fn;
}

export function showGlobalApolloError(error: ApolloError) {
    if (showErrorCallback) {
        showErrorCallback(error);
    }
}
// #endregion

// #region -------------- ApolloErrorViewerProvider --------------
export function ApolloErrorViewerProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<ApolloError | null>(null);

    useEffect(() => {
        registerApolloErrorViewerCallback(setError);
    }, []);

    const contextValue = useMemo(() => ({
        error,
        showError: setError,
        hideError: () => setError(null),
    }), [error]);

    return (
        <ApolloErrorViewerContext value={contextValue}>
            {children}
        </ApolloErrorViewerContext>
    );
}
// #endregion

// #region -------------- ApolloErrorViewerModal --------------
export function ApolloErrorViewerModal() {
    const context = use(ApolloErrorViewerContext);

    if (!context || !context.error) {
        return null;
    }

    const { error, hideError } = context;

    return (
        <div className={styles['modal-backdrop']} onClick={hideError}>
            <div className={styles['modal-content']}>
                <button
                    type="button"
                    className={styles['btn-close']}
                    onClick={hideError}
                >
                    ✕
                </button>

                <div className={styles['error-title']}>🚨 Something went wrong</div>
                <p className={styles['error-text']}>
                    A problem occurred while communicating with the server.
                </p>

                <div className={styles['error-details']}>
                    <pre className="main">
                        <strong>Main Error:</strong>
                        {' '}
                        {error.message}
                    </pre>

                    {error.networkError && (
                        <pre className="network">
                            <strong>Network Error:</strong>
                            {' '}
                            {error.networkError.message}
                        </pre>
                    )}

                    {error.graphQLErrors?.length > 0 && (
                        <div>
                            <strong>GraphQL Errors:</strong>
                            <ul>
                                {error.graphQLErrors.map(e => (
                                    <li key={e.message}>{e.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error.protocolErrors?.length > 0 && (
                        <div>
                            <strong>Protocol Errors:</strong>
                            <ul>
                                {error.protocolErrors.map(e => (
                                    <li key={e.message}>{e.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error.clientErrors?.length > 0 && (
                        <div>
                            <strong>Client Errors:</strong>
                            <ul>
                                {error.clientErrors.map(e => (
                                    <li key={e.message}>{e.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error.extraInfo && (
                        <pre className="extra">
                            <strong>Extra Info:</strong>
                            {' '}
                            {JSON.stringify(error.extraInfo, null, 4)}
                        </pre>
                    )}
                </div>

                <button
                    type="button"
                    className={styles['btn-retry']}
                    onClick={() => window.location.reload()}
                >
                    🔄 Retry
                </button>
            </div>
        </div>
    );
}
// #endregion
