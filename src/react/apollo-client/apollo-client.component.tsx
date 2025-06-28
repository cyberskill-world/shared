import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
    ApolloNextAppProvider as ApolloProviderNextJS,
} from '@apollo/client-integration-nextjs';
// TODO: change imports to @apollo/client after migration to v4
import {
    ApolloProvider as ApolloProviderDefault,
} from '@apollo/client/react/react.cjs';
import React, { useMemo } from 'react';

import type { I_ApolloProviderProps, I_RegisteredApolloClient } from './apollo-client.type.js';

import { ApolloErrorComponent, ApolloErrorProvider } from '../apollo-error/index.js';
import { Toaster } from '../toast/index.js';
import { ApolloClientProvider } from './apollo-client.context.js';
import { getClient } from './apollo-client.util.js';

function isRegisteredClient(
    client: ApolloClient<NormalizedCacheObject> | I_RegisteredApolloClient,
): client is I_RegisteredApolloClient {
    return typeof (client as I_RegisteredApolloClient).getClient === 'function';
}

export function ApolloProvider({
    isNextJS,
    options,
    children,
}: I_ApolloProviderProps) {
    const client = useMemo(
        () => getClient(options || {}, isNextJS),
        [options, isNextJS],
    );

    const actualClient = isRegisteredClient(client) ? client.getClient() : client;

    const renderedApollo = isNextJS
        // @ts-expect-error: Apollo client types are not fully compatible between classic and Next.js
        ? <ApolloProviderNextJS makeClient={() => actualClient}>{children}</ApolloProviderNextJS>
        : <ApolloProviderDefault client={actualClient}>{children}</ApolloProviderDefault>;

    return (
        <>
            <ApolloErrorProvider>
                <ApolloClientProvider client={actualClient}>
                    {renderedApollo}
                </ApolloClientProvider>
                <ApolloErrorComponent />
            </ApolloErrorProvider>
            <Toaster position="top-right" />
        </>
    );
}
