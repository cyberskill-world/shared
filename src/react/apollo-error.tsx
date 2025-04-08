import type { ApolloError } from '@apollo/client';
import type { ReactNode } from 'react';

import { createContext, use, useEffect, useMemo, useState } from 'react';
import { FaRepeat } from 'react-icons/fa6';

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
    showErrorCallback?.(error);
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

    const error = context?.error;

    if (!error) {
        return null;
    }

    const renderErrorList = (label: string, list?: readonly { message: string }[]) =>
        list?.length
            ? (
                    <div>
                        <strong>
                            {label}
                            :
                        </strong>
                        <ul>
                            {list.map(e => <li key={e.message}>{e.message}</li>)}
                        </ul>
                    </div>
                )
            : null;

    return (
        <div className={styles['modal-backdrop']}>
            <div className={styles['modal-content']}>
                <button
                    type="button"
                    className={styles['btn-close']}
                    onClick={context.hideError}
                >
                    ✕
                </button>
                <div className={styles['error-title']}>
                    <button
                        type="button"
                        className={styles['btn-retry']}
                        onClick={() => window.location.reload()}
                    >
                        <FaRepeat />
                    </button>
                    {' '}
                    {error.message}
                </div>
                <div className={styles['error-details']}>
                    {error.networkError && (
                        <pre className="network">
                            <strong>Network Error:</strong>
                            {' '}
                            {error.networkError.message}
                        </pre>
                    )}
                    {renderErrorList('GraphQL Errors', [...error.graphQLErrors])}
                    {renderErrorList('Protocol Errors', [...error.protocolErrors])}
                    {renderErrorList('Client Errors', [...error.clientErrors])}
                    {error.extraInfo && (
                        <pre className="extra">
                            <strong>Extra Info:</strong>
                            {' '}
                            {JSON.stringify(error.extraInfo, null, 4)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
// #endregion
