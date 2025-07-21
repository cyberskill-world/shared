// TODO: change imports to @apollo/client after migration to v4
import { ApolloProvider as ApolloProviderDefault } from '@apollo/client/react/react.cjs';
import React, { useMemo } from 'react';

import type { I_ApolloProviderProps } from './apollo-client.type.js';

import { ApolloErrorComponent, ApolloErrorProvider } from '../apollo-error/index.js';
import { Toaster } from '../toast/index.js';
import { ApolloClientProvider } from './apollo-client.context.js';
import { getClient } from './apollo-client.util.js';

/**
 * Apollo Provider component that wraps the application with Apollo Client context.
 * This component provides the Apollo Client instance to all child components,
 * enabling GraphQL operations throughout the component tree. It includes
 * error handling and toast integration for a complete GraphQL experience.
 *
 * Features:
 * - Apollo Client context provision
 * - Error boundary integration
 * - Toast notification support
 * - Automatic error handling
 * - Development and production optimizations
 *
 * @param props - Component props containing options and children.
 * @param props.options - Apollo Client configuration options.
 * @param props.children - React children that will have access to Apollo Client context.
 * @returns A React component that provides Apollo Client context to its children.
 */
export function ApolloProvider({ options, children }: I_ApolloProviderProps) {
    const client = useMemo(
        () => getClient(options || {}),
        [options],
    );

    return (
        <>
            <ApolloErrorProvider>
                <ApolloClientProvider client={client}>
                    <ApolloProviderDefault client={client}>{children}</ApolloProviderDefault>
                </ApolloClientProvider>
                <ApolloErrorComponent />
            </ApolloErrorProvider>
            <Toaster position="top-right" />
        </>
    );
}
