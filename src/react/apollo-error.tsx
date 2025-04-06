import type { ApolloError } from '@apollo/client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ApolloErrorScreenProps, I_ApolloErrorViewerContext } from '#typescript/apollo-error.js';

const ApolloErrorViewerContext = createContext<I_ApolloErrorViewerContext | undefined>(undefined);

let showErrorCallback: ((err: ApolloError) => void) | null = null;

export function registerApolloErrorViewerCallback(fn: (err: ApolloError) => void) {
    showErrorCallback = fn;
}

export function showGlobalApolloError(error: ApolloError) {
    if (showErrorCallback) {
        showErrorCallback(error);
    }
}

export function useApolloErrorViewer() {
    const context = useContext(ApolloErrorViewerContext);

    if (!context) {
        throw new Error('useApolloErrorViewer must be used within ApolloErrorViewerProvider');
    }

    return context;
}

export function ApolloErrorViewerProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<ApolloError | null>(null);

    useEffect(() => {
        registerApolloErrorViewerCallback(setError);
    }, []);

    return (
        <ApolloErrorViewerContext.Provider
            value={{
                error,
                showError: setError,
                hideError: () => setError(null),
            }}
        >
            {children}
        </ApolloErrorViewerContext.Provider>
    );
}

export const ApolloErrorScreen = ({ error, refetch }: ApolloErrorScreenProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-lg text-center text-white">
                <div className="text-5xl mb-4">🚨</div>
                <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                <p className="text-sm text-slate-300 mb-4">
                    A problem occurred while communicating with the server.
                </p>

                <div className="bg-slate-800 text-left text-sm rounded-lg px-4 py-3 mb-6 overflow-auto max-h-64 border border-slate-700 space-y-2">
                    <pre className="text-red-300 whitespace-pre-wrap break-words">
                        <strong>Main Error:</strong> {error.message}
                    </pre>

                    {error.networkError && (
                        <pre className="text-yellow-300 whitespace-pre-wrap break-words">
                            <strong>Network Error:</strong> {error.networkError.message}
                        </pre>
                    )}

                    {error.graphQLErrors?.length > 0 && (
                        <div className="text-rose-400">
                            <strong>GraphQL Errors:</strong>
                            <ul className="list-disc list-inside">
                                {error.graphQLErrors.map((e, i) => (
                                    <li key={i}>{e.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error.protocolErrors?.length > 0 && (
                        <div className="text-rose-400">
                            <strong>Protocol Errors:</strong>
                            <ul className="list-disc list-inside">
                                {error.protocolErrors.map((e, i) => (
                                    <li key={i}>{e.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {error.clientErrors?.length > 0 && (
                        <div className="text-rose-400">
                            <strong>Client Errors:</strong>
                            <ul className="list-disc list-inside">
                                {error.clientErrors.map((e, i) => (
                                    <li key={i}>{e.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error.extraInfo && (
                        <pre className="text-cyan-300 whitespace-pre-wrap break-words">
                            <strong>Extra Info:</strong> {JSON.stringify(error.extraInfo)}
                        </pre>
                    )}
                </div>

                {refetch && (
                    <button
                        onClick={refetch}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded-xl transition duration-300"
                    >
                        🔄 Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export function ApolloErrorViewerModal() {
    const context = useContext(ApolloErrorViewerContext);

    if (!context) {
        return null;
    }

    const { error, hideError } = context;

    if (!error) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="relative bg-slate-900 text-white max-w-2xl w-full rounded-xl shadow-lg overflow-hidden">
                <button
                    onClick={hideError}
                    className="absolute top-3 right-4 text-xl hover:text-red-400"
                >
                    ✕
                </button>
                <ApolloErrorScreen error={error} />
            </div>
        </div>
    );
}


