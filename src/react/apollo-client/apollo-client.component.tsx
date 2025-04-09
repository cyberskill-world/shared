import type { FetchResult, Operation } from '@apollo/client';
import type { Observable } from '@apollo/client/utilities';
import type { ComponentType } from 'react';

import {
    ApolloClient,
    ApolloError as ApolloErrorDefault,
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
import { FaInfo } from 'react-icons/fa6';

import type { I_ApolloOptions, I_ApolloProviderProps } from './apollo-client.type.js';

import { ApolloError, ApolloErrorProvider, showGlobalApolloError } from '../apollo-error/index.js';
import { log } from '../log/index.js';
import { toast, Toaster } from '../toast/index.js';
import { GRAPHQL_URI_DEFAULT } from './apollo-client.constant.js';

class DevLoggerLink extends ApolloLink {
    private count = 0;

    request(operation: Operation, forward: (op: Operation) => Observable<FetchResult>) {
        const start = Date.now();
        this.count += 1;

        return forward(operation).map((result) => {
            const duration = Date.now() - start;
            const name = operation.operationName || 'Unnamed';
            log.info(`[Apollo] #${this.count}: ${name} (${duration}ms)`);

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
                log.error(
                    `[GraphQL error] ${opName}: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
                );
            });
        }

        if (protocolErrors) {
            protocolErrors.forEach(({ message, extensions }) => {
                log.error(
                    `[Protocol error]: ${message}, Extensions: ${JSON.stringify(extensions)}`,
                );
            });
        }

        if (networkError) {
            log.error(`[Network error]: ${networkError}`);
        }

        if (graphQLErrors || protocolErrors || networkError) {
            const message
                = graphQLErrors?.[0]?.message
                    || protocolErrors?.[0]?.message
                    || networkError?.message
                    || 'Unexpected error';
            const error = new ApolloErrorDefault({
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
                    <FaInfo
                        cursor="pointer"
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
        log.warn(`[Apollo] No GraphQL URI provided — using "${GRAPHQL_URI_DEFAULT}" as default`);
    }

    const httpLink = new HttpLink({
        uri: uri ?? GRAPHQL_URI_DEFAULT,
        credentials: 'include',
    });

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
        log.warn('[Apollo] WS URL is set, but subscriptions fallback to HTTP. Check your wsLink config.');
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

    const cache = useMemo(() => (
        CustomCache instanceof InMemoryCache ? CustomCache : new InMemoryCache()
    ), [CustomCache]);

    const client = useMemo(() => new Client({
        link,
        cache,
        ...apolloOptions,
    }), [Client, link, cache, apolloOptions]);

    const renderedApollo = isNextJS
        ? <Provider makeClient={() => client}>{children}</Provider>
        : <Provider client={client}>{children}</Provider>;

    return (
        <>
            <ApolloErrorProvider>
                {renderedApollo}
                <ApolloError />
            </ApolloErrorProvider>
            <Toaster position="top-right" />
        </>
    );
}
