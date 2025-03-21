import { ApolloClientOptions, ApolloCache, ApolloClient } from '@apollo/client';
export { ApolloCache, ApolloClient, ApolloClientOptions } from '@apollo/client';
import { ComponentType } from 'react';
import { T_Children } from './react.cjs';

interface I_ApolloOptions extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    uri?: string;
    wsUrl?: string;
    cache?: ApolloCache<unknown>;
}
interface I_ApolloProviderProps {
    children: T_Children;
    isNextJS?: boolean;
    options?: I_ApolloOptions;
    client?: ApolloClient<unknown>;
    makeClient?: () => ApolloClient<unknown>;
    provider?: ComponentType<I_ApolloProviderProps>;
    cache?: ApolloCache<unknown>;
}

export type { I_ApolloOptions, I_ApolloProviderProps };
