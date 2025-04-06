/* eslint-disable no-console */
import type { FetchResult, Operation } from '@apollo/client';
import type { Observable } from '@apollo/client/utilities';
import type { ComponentType } from 'react';

import {
    ApolloClient,
    ApolloError,
    ApolloLink,
    ApolloProvider as ApolloProviderDefault,
    from,
    HttpLink,
    InMemoryCache,
    split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { useMemo } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaQuestion } from 'react-icons/fa6';

import type { I_ApolloOptions, I_ApolloProviderProps } from '#typescript/apollo.js';

import { GRAPHQL_URI_DEFAULT } from '#constants/graphql.js';

import { ApolloErrorViewerModal, ApolloErrorViewerProvider, showGlobalApolloError } from './apollo-error.js';

class DevLoggerLink extends ApolloLink {
    private count = 0;

    request(operation: Operation, forward: (op: Operation) => Observable<FetchResult>) {
        const start = Date.now();
        this.count += 1;

        return forward(operation).map((result) => {
            const duration = Date.now() - start;
            const name = operation.operationName || 'Unnamed';
            console.info(`[Apollo] #${this.count}: ${name} (${duration}ms)`);

            return result;
        });
    }
}

function createApolloLinks(options?: I_ApolloOptions) {
    const { uri, wsUrl, customLinks } = options || {};

    const devLoggerLink = new DevLoggerLink();

    const errorLink = onError(({ graphQLErrors, networkError, protocolErrors, operation }) => {
        const opName = operation?.operationName || 'Unknown';

        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                console.error(
                    `[GraphQL error] ${opName}: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
                );
            });
        }

        if (protocolErrors) {
            protocolErrors.forEach(({ message, extensions }) => {
                console.error(
                    `[Protocol error]: ${message}, Extensions: ${JSON.stringify(extensions)}`,
                );
            });
        }

        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }

        if (graphQLErrors || protocolErrors || networkError) {
            const message
                = graphQLErrors?.[0]?.message
                    || protocolErrors?.[0]?.message
                    || networkError?.message
                    || 'Unexpected error';
            const error = new ApolloError({
                graphQLErrors: graphQLErrors || [],
                protocolErrors: protocolErrors || [],
                clientErrors: [],
                networkError: networkError || null,
                errorMessage: message,
                extraInfo: {
                    operation,
                },
            });

            toast.error((t: { id: string }) => (
                <>
                    {message}
                    &nbsp;
                    <FaQuestion
                        onClick={() => {
                            setTimeout(() => {
                                showGlobalApolloError(error);
                            }, 0);

                            toast.dismiss(t.id);
                        }}
                    />
                </>
            ));
        }
    });

    const removeTypenameLink = removeTypenameFromVariables();

    if (!uri) {
        console.warn(`[Apollo] No GraphQL URI provided — using "${GRAPHQL_URI_DEFAULT}" as default`);
    }

    const httpLink = new HttpLink({
        uri: uri ?? GRAPHQL_URI_DEFAULT,
        credentials: 'include',
    });

    if (!wsUrl) {
        console.warn('[Apollo] No WebSocket URL provided — subscriptions will use HTTP only');
    }

    const wsLink = wsUrl
        ? new GraphQLWsLink(createClient({ url: wsUrl }))
        : ApolloLink.empty();

    const splitLink = wsLink instanceof ApolloLink
        ? split(
                ({ query }) => {
                    const def = getMainDefinition(query);

                    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
                },
                wsLink,
                httpLink,
            )
        : httpLink;

    if (splitLink === httpLink && wsUrl) {
        console.warn('[Apollo] WS URL is set, but subscriptions fallback to HTTP. Check your wsLink config.');
    }

    return [
        devLoggerLink, // 🪵 custom logger
        errorLink, // ⚠️ Apollo's error handling
        removeTypenameLink, // 🧼 cleans up __typename
        ...(customLinks ?? []), // 🔗 custom links
        splitLink, // 📡 HTTP vs WS routing
    ];
}

export function ApolloProvider({
    isNextJS,
    options,
    children,
    client: CustomClient,
    provider: CustomProvider,
    cache: CustomCache,
}: I_ApolloProviderProps) {
    const { uri, wsUrl, customLinks, ...apolloOptions } = options || {};
    const Client = CustomClient ?? ApolloClient;

    if (typeof Client !== 'function') {
        throw new TypeError('Invalid ApolloClient provided. Ensure CustomClient is a class.');
    }

    const Provider = (CustomProvider || ApolloProviderDefault) as ComponentType<I_ApolloProviderProps>;

    const link = useMemo(() => from(createApolloLinks({ uri, wsUrl, customLinks })), [uri, wsUrl, customLinks]);

    const client = useMemo(() => new ApolloClient({
        link,
        cache: CustomCache instanceof InMemoryCache ? CustomCache : new InMemoryCache(),
        ...apolloOptions,
    }), [link, CustomCache, apolloOptions]);

    const renderedApollo = isNextJS
        ? <Provider makeClient={() => client}>{children}</Provider>
        : <Provider client={client}>{children}</Provider>;

    if (isNextJS) {
        return (
            <Provider makeClient={() => client}>{children}</Provider>
        );
    }

    return (
        <>
            <ApolloErrorViewerProvider>
                {renderedApollo}
                <ApolloErrorViewerModal />
            </ApolloErrorViewerProvider>
            <Toaster position="top-right" />
        </>
    );
}
