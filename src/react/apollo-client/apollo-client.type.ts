import type {
    ApolloCache,
    ApolloClient,
    ApolloClientOptions,
    ApolloLink,
    NormalizedCacheObject,
    UriFunction,
} from '@apollo/client';

import type { I_Children } from '#typescript/react.js';

export interface I_ApolloOptions extends Omit<ApolloClientOptions<NormalizedCacheObject>, 'cache'> {
    uri?: string | UriFunction;
    wsUrl?: string;
    cache?: ApolloCache<NormalizedCacheObject>;
    customLinks?: ApolloLink[];
    ssrMode?: boolean;
}

export interface I_ApolloProviderProps extends I_Children {
    isNextJS?: boolean;
    options?: I_ApolloOptions;
}

export interface I_RegisteredApolloClient {
    getClient: () => ApolloClient<NormalizedCacheObject>;
};

export type {
    ApolloCache,
    ApolloClient,
    ApolloClientOptions,
    NormalizedCacheObject,
} from '@apollo/client';
