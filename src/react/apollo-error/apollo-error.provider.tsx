import type { ApolloError } from '@apollo/client';
import type { ReactNode } from 'react';

import React, { useEffect, useMemo, useState } from 'react';

import { ApolloErrorContext } from './apollo-error.context.js';
import { setGlobalApolloErrorCallback } from './apollo-error.util.js';

export function ApolloErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<ApolloError | null>(null);

    useEffect(() => {
        setGlobalApolloErrorCallback(setError);
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
