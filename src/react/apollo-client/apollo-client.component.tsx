import {
    ApolloNextAppProvider as ApolloProviderNextJS,
} from '@apollo/client-integration-nextjs';
// TODO: change imports to @apollo/client after migration to v4
import {
    ApolloProvider as ApolloProviderDefault,
} from '@apollo/client/react/react.cjs';
import React, { useMemo } from 'react';

import type { I_ApolloProviderProps } from './apollo-client.type.js';

import { ApolloErrorComponent, ApolloErrorProvider } from '../apollo-error/index.js';
import { Toaster } from '../toast/index.js';
import { ApolloClientProvider } from './apollo-client.context.js';
import { getClient } from './apollo-client.util.js';

export function ApolloProvider({
    isNextJS,
    options,
    children,
}: I_ApolloProviderProps) {
    const client = useMemo(
        () => getClient(options || {}, isNextJS),
        [options, isNextJS],
    );

    const renderedApollo = isNextJS
        // @ts-expect-error: Apollo client types are not fully compatible between classic and Next.js
        ? <ApolloProviderNextJS makeClient={() => client}>{children}</ApolloProviderNextJS>
        : <ApolloProviderDefault client={client}>{children}</ApolloProviderDefault>;

    return (
        <>
            <ApolloErrorProvider>
                <ApolloClientProvider client={client}>
                    {renderedApollo}
                </ApolloClientProvider>
                <ApolloErrorComponent />
            </ApolloErrorProvider>
            <Toaster position="top-right" />
        </>
    );
}
