import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import React, { useMemo } from 'react';

import type { I_ApolloProviderProps } from '../apollo-client/index.js';

import { ApolloErrorComponent, ApolloErrorProvider } from '../apollo-error/index.js';
import { Toaster } from '../toast/index.js';
import { getClient } from './apollo-client-nextjs.util.js';

export function ApolloProvider({
    options,
    children,
}: I_ApolloProviderProps) {
    const makeClient = useMemo(
        () => () => getClient(options || {}),
        [options],
    );

    return (
        <>
            <ApolloErrorProvider>
                <ApolloNextAppProvider makeClient={makeClient}>
                    {children}
                </ApolloNextAppProvider>
                <ApolloErrorComponent />
            </ApolloErrorProvider>
            <Toaster position="top-right" />
        </>
    );
}
