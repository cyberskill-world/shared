import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { use } from 'react';

import { ApolloClientContext } from './apollo-client.context.js';

export function useApolloClient(): ApolloClient<NormalizedCacheObject> {
    const client = use(ApolloClientContext);

    if (!client) {
        throw new Error('useApolloClient must be used within an ApolloClientProvider');
    }

    return client;
}
