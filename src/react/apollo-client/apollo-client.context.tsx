import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import React, { createContext } from 'react';

const ApolloClientContext = createContext<ApolloClient<NormalizedCacheObject> | null>(null);

export function ApolloClientProvider({
    client,
    children,
}: {
    client: ApolloClient<NormalizedCacheObject>;
    children: React.ReactNode;
}) {
    return (
        <ApolloClientContext value={client}>
            {children}
        </ApolloClientContext>
    );
}

export { ApolloClientContext };
