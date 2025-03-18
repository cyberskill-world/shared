import type { ApolloCache, ApolloClientOptions } from '@apollo/client';
import type { InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import type { JSX, ReactElement, ReactNode } from 'react';

export type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;

export interface I_ApolloOptions extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    uri?: string;
    wsUrl?: string;
    cache?: ApolloCache<unknown>;
};

export interface I_ApolloOptionsNextJS extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    uri?: string;
    wsUrl?: string;
    cache?: InMemoryCache;
};

export interface I_GraphqlCodegenConfig {
    uri: string;
    from: string;
    to: string;
    withComponent?: boolean;
    withHOC?: boolean;
    withHooks?: boolean;
    withMutationFn?: boolean;
    withRefetchFn?: boolean;
}

export interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}
