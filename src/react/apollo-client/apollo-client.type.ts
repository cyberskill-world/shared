import type { ApolloClient } from '@apollo/client';
import type { ApolloLink } from '@apollo/client/link';

import type { I_Children } from '#typescript/index.js';

export interface I_ApolloOptions extends Omit<ApolloClient.Options, 'link' | 'cache'> {
    uri?: string;
    wsUrl?: string;
    customLinks?: ApolloLink[];
}

export interface I_ApolloProviderProps extends I_Children {
    isNextJS?: boolean;
    options?: I_ApolloOptions;
}

export type { ApolloCache, ApolloClient, ErrorLike } from '@apollo/client';
