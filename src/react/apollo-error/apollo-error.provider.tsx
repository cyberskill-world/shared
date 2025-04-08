import type { ApolloError } from '@apollo/client';
import type { ReactNode } from 'react';

import { useEffect, useMemo, useState } from 'react';

import { ApolloErrorContext } from './apollo-error.context.js';

let showErrorCallback: ((err: ApolloError) => void) | null = null;

export function showGlobalApolloError(error: ApolloError) {
    showErrorCallback?.(error);
}

export function ApolloErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<ApolloError | null>(null);

    useEffect(() => {
        showErrorCallback = setError;
    }, []);

    const contextValue = useMemo(() => ({
        error,
        showError: setError,
        hideError: () => setError(null),
    }), [error]);

    return (
        <ApolloErrorContext value={contextValue}>
            {children}
        </ApolloErrorContext>
    );
}
