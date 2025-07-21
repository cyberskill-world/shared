import type { ApolloError } from '@apollo/client';
import type { ReactNode } from 'react';

import React, { useEffect, useMemo, useState } from 'react';

import { ApolloErrorContext } from './apollo-error.context.js';
import { setGlobalApolloErrorCallback } from './apollo-error.util.js';

/**
 * Provider component that manages Apollo error state and provides error context.
 * This component sets up error handling for Apollo Client operations and provides
 * error state management to all child components through React context.
 *
 * Features:
 * - Global Apollo error state management
 * - Error context provision to child components
 * - Automatic error handling and display
 * - Integration with error boundaries
 *
 * @param props - Component props containing children.
 * @param props.children - React children that will have access to the error context.
 * @returns A React component that provides Apollo error context to its children.
 */
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
