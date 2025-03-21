import type {
    ApolloCache,
    ApolloClient,
    ApolloClientOptions,
} from '@apollo/client';
import type { ComponentType } from 'react';

import type { T_Children } from './react.js';

export interface I_ApolloOptions extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    uri?: string;
    wsUrl?: string;
    cache?: ApolloCache<unknown>;
}

export interface I_ApolloProviderProps {
    children: T_Children;
    isNextJS?: boolean;
    options?: I_ApolloOptions;
    client?: ApolloClient<unknown>;
    makeClient?: () => ApolloClient<unknown>;
    provider?: ComponentType<I_ApolloProviderProps>;
    cache?: ApolloCache<unknown>;
}

export type {
    ApolloCache,
    ApolloClient,
    ApolloClientOptions,
} from '@apollo/client';
