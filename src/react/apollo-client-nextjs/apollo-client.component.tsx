import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import React, { useMemo } from 'react';

import type { I_ApolloProviderProps } from '../apollo-client/index.js';

import { ApolloClientProvider } from '../apollo-client/index.js';
import { ApolloErrorComponent, ApolloErrorProvider } from '../apollo-error/index.js';
import { Toaster } from '../toast/index.js';
import { getClientNextJS } from './apollo-client.util.js';

export function ApolloProviderNextJS({
    options,
    children,
}: I_ApolloProviderProps) {
    const client = useMemo(
        () => getClientNextJS(options || {}),
        [options],
    );

    return (
        <>
            <ApolloErrorProvider>
                <ApolloClientProvider client={client}>
                    <ApolloNextAppProvider makeClient={() => client}>{children}</ApolloNextAppProvider>
                </ApolloClientProvider>
                <ApolloErrorComponent />
            </ApolloErrorProvider>
            <Toaster position="top-right" />
        </>
    );
}
