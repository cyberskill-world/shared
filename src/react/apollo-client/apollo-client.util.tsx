import type { FetchResult, Operation } from '@apollo/client';
import type { Observable } from '@apollo/client/utilities';

import {
    ApolloClient,
    ApolloError,
    InMemoryCache,
} from '@apollo/client/core/core.cjs';
// TODO: change imports to @apollo/client after migration to v4
import { ApolloLink, from, split } from '@apollo/client/link/core/core.cjs';
import { onError } from '@apollo/client/link/error/error.cjs';
import { HttpLink } from '@apollo/client/link/http/http.cjs';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename/remove-typename.cjs';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions/subscriptions.cjs';
import { getMainDefinition } from '@apollo/client/utilities/utilities.cjs';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { createClient } from 'graphql-ws';
import React from 'react';

import type { I_ApolloOptions } from './apollo-client.type.js';

import { showGlobalApolloError } from '../apollo-error/apollo-error.util.js';
import { log } from '../log/index.js';
import { toast } from '../toast/index.js';
import { GRAPHQL_URI_DEFAULT } from './apollo-client.constant.js';

export class DevLoggerLink extends ApolloLink {
    private count = 0;

    override request(operation: Operation, forward: (op: Operation) => Observable<FetchResult>) {
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

export function createApolloLinks(options: I_ApolloOptions) {
    const { uri, wsUrl, customLinks } = options;

    const devLoggerLink = new DevLoggerLink();

    const errorLink = onError(({ graphQLErrors, networkError, protocolErrors, operation }) => {
        const opName = operation?.operationName || 'Unknown';

        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                log.error(
                    `[GraphQL error] ${opName}: ${message}, Location: ${JSON.stringify(locations, null, 4)}, Path: ${path}`,
                );
            });
        }

        if (protocolErrors) {
            protocolErrors.forEach(({ message, extensions }) => {
                log.error(
                    `[Protocol error]: ${message}, Extensions: ${JSON.stringify(extensions, null, 4)}`,
                );
            });
        }

        if (networkError) {
            log.error(`[Network error]: ${networkError}`);
        }

        if (graphQLErrors || protocolErrors || networkError) {
            const message = graphQLErrors?.[0]?.message
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

            if (typeof window !== 'undefined') {
                toast.error((t: { id: string }) => (
                    <>
                        {message}
                        &nbsp;
                        <button
                            type="button"
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {
                                setTimeout(() => {
                                    showGlobalApolloError(error);
                                }, 0);

                                toast.dismiss(t.id);
                            }}
                        >
                            Show Details
                        </button>
                    </>
                ));
            }
        }
    });

    const removeTypenameLink = removeTypenameFromVariables();

    if (!uri) {
        log.warn(`[Apollo] No GraphQL URI provided — using "${GRAPHQL_URI_DEFAULT}" as default`);
    }

    const uploadLink = createUploadLink({
        uri: uri ?? GRAPHQL_URI_DEFAULT,
        credentials: 'include',
        headers: {
            'apollo-require-preflight': 'true',
        },
    });

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
        uploadLink, // 📤 file uploads
        ...(customLinks ?? []), // 🔗 custom links
        splitLink, // 📡 HTTP vs WS routing
    ];
}

export function getClient(options: I_ApolloOptions = {}) {
    const link = from(createApolloLinks(options));

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
        ...options,
    });
}
