import { ApolloClientOptions, ApolloCache } from '@apollo/client';
import { ReactNode, ReactElement, JSX } from 'react';

type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;
interface I_ApolloOptions extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    cache?: ApolloCache<unknown>;
    url?: string;
}
interface I_GraphqlCodegenConfig {
    uri: string;
    from: string;
    to: string;
    withComponent?: boolean;
    withHOC?: boolean;
    withHooks?: boolean;
    withMutationFn?: boolean;
    withRefetchFn?: boolean;
}
interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}

export type { I_ApolloOptions, I_GraphqlCodegenConfig, I_LoadingContext, T_Children };
