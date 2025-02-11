import { ApolloClient, ApolloProvider as ApolloClientReactProvider, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient as createGraphqlWebSocketClient } from 'graphql-ws';

import type { T_ApolloOptions, T_Children } from '../../../../../typescript/index.js';

function createClient({ uri, url, cache, ...options }: T_ApolloOptions) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message: description, locations, path }) => {
                console.error(`[GraphQL error]: Message: ${description}, Location: ${locations}, Path: ${path}`);
            });
        }

        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }
    });

    const httpLink = new HttpLink({
        uri,
        credentials: 'include',
    });

    const wsLink = new GraphQLWsLink(
        createGraphqlWebSocketClient({
            url,
        }),
    );

    const splitLink = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query) as any;
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
    );

    const cleanTypeName = new ApolloLink((operation, forward) => {
        if (operation.variables) {
            const omitTypename = (key: any, value: any) => (key === '__typename' ? undefined : value);
            operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
        }

        return forward(operation).map((data) => {
            return data;
        });
    });

    const link = ApolloLink.from([cleanTypeName, errorLink, splitLink]);

    return new ApolloClient({
        cache: cache ?? new InMemoryCache(),
        link,
        ...options,
    });
}

export function ApolloProvider({ options, children }: { options: T_ApolloOptions; children: T_Children }) {
    return <ApolloClientReactProvider client={createClient(options)}>{children}</ApolloClientReactProvider>;
}
