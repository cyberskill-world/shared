import type {
    ApolloCache,
    ApolloClient,
    ApolloClientOptions,
    ApolloLink,
    NormalizedCacheObject,
} from '@apollo/client';
import type { ComponentType } from 'react';

import type { T_Children } from './react.js';

export interface I_ApolloOptions extends Omit<ApolloClientOptions<NormalizedCacheObject>, 'cache'> {
    uri?: string;
    wsUrl?: string;
    cache?: ApolloCache<NormalizedCacheObject>;
    customLinks?: ApolloLink[];
    ssrMode?: boolean;
}

export interface I_ApolloProviderProps {
    children: T_Children;
    isNextJS?: boolean;
    options?: I_ApolloOptions;
    client?: ApolloClient<NormalizedCacheObject>;
    makeClient?: () => ApolloClient<NormalizedCacheObject>;
    provider?: ComponentType<I_ApolloProviderProps>;
    cache?: ApolloCache<NormalizedCacheObject>;
}

export type {
    ApolloCache,
    ApolloClient,
    ApolloClientOptions,
} from '@apollo/client';
