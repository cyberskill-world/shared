import type { ComponentType } from 'react';

import {
    ApolloClient,
    ApolloLink,
    ApolloProvider as ApolloProviderDefault,
    HttpLink,
    InMemoryCache,
    split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient as createGraphqlWebSocketClient } from 'graphql-ws';

import type { I_ApolloOptions, I_ApolloProviderProps } from '#typescript/apollo.js';

function createLinks(options?: I_ApolloOptions) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        graphQLErrors?.forEach(({ message, locations, path }) =>
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );
        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }
    });

    const httpLink = new HttpLink({
        uri: options?.uri,
        credentials: 'include',
    });

    const wsLink = options?.wsUrl
        ? new GraphQLWsLink(
            createGraphqlWebSocketClient({
                url: options.wsUrl,
            }),
        )
        : null;

    const splitLink = wsLink
        ? split(
                ({ query }) => {
                    const mainDefinition = getMainDefinition(query);

                    if (mainDefinition.kind === 'OperationDefinition') {
                        const { operation } = mainDefinition;

                        return operation === 'subscription';
                    }

                    return false;
                },
                wsLink,
                httpLink,
            )
        : httpLink;

    const cleanTypeName = new ApolloLink((operation, forward) => {
        if (operation.variables) {
            operation.variables = JSON.parse(
                JSON.stringify(operation.variables),
                (key, value) => (key === '__typename' ? undefined : value),
            );
        }
        return forward(operation);
    });

    return {
        errorLink,
        httpLink,
        wsLink,
        splitLink,
        cleanTypeName,
    };
}

export function ApolloProvider({
    isNextJS,
    options,
    children,
    client: CustomClient,
    provider: CustomProvider,
    cache: CustomCache,
}: I_ApolloProviderProps) {
    const Client = CustomClient ?? ApolloClient;

    if (typeof Client !== 'function') {
        throw new TypeError('Invalid ApolloClient provided. Ensure CustomClient is a class.');
    }

    const Provider = (CustomProvider || ApolloProviderDefault) as ComponentType<I_ApolloProviderProps>;
    const Cache = CustomCache || InMemoryCache;

    const { cleanTypeName, errorLink, splitLink } = createLinks(options);

    const client = new Client({
        cache: Cache instanceof InMemoryCache ? Cache : new InMemoryCache(),
        link: ApolloLink.from([cleanTypeName, errorLink, splitLink].filter(Boolean)),
        ...options,
    });

    if (isNextJS) {
        return (
            <Provider makeClient={() => client}>
                {children}
            </Provider>
        );
    }

    return <Provider client={client}>{children}</Provider>;
}
