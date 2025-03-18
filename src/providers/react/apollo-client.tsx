import { ApolloClient, ApolloProvider as ApolloClientReactProvider, ApolloLink, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import {
    ApolloClient as ApolloClientNextJS,
    ApolloNextAppProvider as ApolloProviderNextJS,
    InMemoryCache as InMemoryCacheNextJS,
} from '@apollo/experimental-nextjs-app-support';
import { createClient as createGraphqlWebSocketClient } from 'graphql-ws';

import type { I_ApolloOptions, I_ApolloOptionsNextJS, T_Children } from '../../typescript/index.js';

function createLinks(options: I_ApolloOptions) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        graphQLErrors?.forEach(({ message, locations, path }) =>
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );
        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }
    });

    const httpLink = new HttpLink({
        uri: options.uri,
        credentials: 'include',
    });

    const wsLink = options.wsUrl
        ? new GraphQLWsLink(
            createGraphqlWebSocketClient({
                url: options.wsUrl,
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

function createClient(options: I_ApolloOptions) {
    const { uri, wsUrl, cache = new InMemoryCache(), ...rest } = options;
    const { cleanTypeName, errorLink, splitLink } = createLinks({ uri, wsUrl, ...options });

    return new ApolloClient({
        cache,
        link: ApolloLink.from([cleanTypeName, errorLink, splitLink].filter(Boolean)),
        ...rest,
    });
}

function createClientNextJS(options: I_ApolloOptionsNextJS) {
    const { uri, wsUrl, cache = new InMemoryCacheNextJS(), ...rest } = options;
    const { cleanTypeName, errorLink, splitLink } = createLinks({ uri, wsUrl, ...options });

    return new ApolloClientNextJS({
        cache,
        link: ApolloLink.from([cleanTypeName, errorLink, splitLink].filter(Boolean)),
        ...rest,
    });
}

export function ApolloProvider({ isNextJS = false, options, children }: { isNextJS: boolean; options: I_ApolloOptionsNextJS; children: T_Children }) {
    if (isNextJS) {
        return <ApolloProviderNextJS makeClient={() => createClientNextJS(options)}>{children}</ApolloProviderNextJS>;
    }

    return <ApolloClientReactProvider client={createClient(options)}>{children}</ApolloClientReactProvider>;
}
