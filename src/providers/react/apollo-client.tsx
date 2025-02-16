import { ApolloClient, ApolloProvider as ApolloClientReactProvider, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient as createGraphqlWebSocketClient } from 'graphql-ws';

import type { I_ApolloOptions, T_Children } from '../../typescript/index.js';

function createClient({ uri, cache = new InMemoryCache(), ...options }: I_ApolloOptions) {
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

    const wsLink = options.url
        ? new GraphQLWsLink(
            createGraphqlWebSocketClient({
                url: options.url,
            }),
        )
        : null;

    const splitLink = wsLink
        ? split(
                ({ query }) => {
                    const { kind, operation } = getMainDefinition(query) as any;
                    return kind === 'OperationDefinition' && operation === 'subscription';
                },
                wsLink,
                httpLink,
            )
        : null;

    const cleanTypeName = new ApolloLink((operation, forward) => {
        if (operation.variables) {
            const omitTypename = (key: any, value: any) => (key === '__typename' ? undefined : value);
            operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
        }

        return forward(operation);
    });

    const links = [cleanTypeName, errorLink, splitLink || httpLink].filter(Boolean);

    return new ApolloClient({
        cache,
        link: ApolloLink.from(links),
        ...options,
    });
}

export function ApolloProvider({ options, children }: { options: I_ApolloOptions; children: T_Children }) {
    return <ApolloClientReactProvider client={createClient(options)}>{children}</ApolloClientReactProvider>;
}
