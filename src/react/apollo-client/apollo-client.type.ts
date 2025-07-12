import type {
    ApolloClientOptions,
    ApolloLink,
    NormalizedCacheObject,
    UriFunction,
} from '@apollo/client';

import type { I_Children } from '#typescript/index.js';

export interface I_ApolloOptions extends Omit<ApolloClientOptions<NormalizedCacheObject>, 'cache'> {
    uri?: string | UriFunction;
    wsUrl?: string;
    customLinks?: ApolloLink[];
}

export interface I_ApolloProviderProps extends I_Children {
    isNextJS?: boolean;
    options?: I_ApolloOptions;
}

export type {
    ApolloCache,
    ApolloClient,
    ApolloClientOptions,
    NormalizedCacheObject,
} from '@apollo/client';
