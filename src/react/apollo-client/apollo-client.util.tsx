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

/**
 * Custom Apollo Link for development logging of GraphQL operations.
 * This link intercepts GraphQL operations and logs detailed information about
 * each request including operation name, duration, and request count for debugging
 * and performance monitoring purposes.
 *
 * Features:
 * - Request counting for tracking operation frequency
 * - Duration measurement for performance analysis
 * - Operation name logging for easy identification
 * - Development-only logging to avoid production noise
 */
export class DevLoggerLink extends ApolloLink {
    private count = 0;

    /**
     * Intercepts and logs GraphQL operations during development.
     * This method wraps each GraphQL operation with timing and logging functionality,
     * providing insights into operation performance and frequency.
     *
     * @param operation - The GraphQL operation to be logged and executed.
     * @param forward - Function to forward the operation to the next link in the chain.
     * @returns An observable that emits the operation result with logging side effects.
     */
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

/**
 * Creates a comprehensive Apollo Link chain with all necessary middleware.
 * This function sets up a complete Apollo Link chain including error handling,
 * logging, file uploads, WebSocket subscriptions, and custom links. The chain
 * is configured to handle both HTTP and WebSocket operations with proper routing.
 *
 * The link chain includes:
 * - Development logging for operation tracking
 * - Error handling with user-friendly notifications
 * - Type name removal for cleaner requests
 * - File upload support
 * - WebSocket subscription support
 * - Custom link integration
 *
 * @param options - Configuration options for the Apollo Client including URI, WebSocket URL, and custom links.
 * @returns An array of Apollo Links configured for the specified options.
 */
export function createApolloLinks(options: I_ApolloOptions) {
    const { uri, wsUrl, customLinks } = options;

    const devLoggerLink = new DevLoggerLink();

    /**
     * Error handling link that intercepts and processes GraphQL and network errors.
     * This link provides comprehensive error handling including:
     * - GraphQL error logging with operation details
     * - Protocol error handling and logging
     * - Network error detection and reporting
     * - User-friendly error notifications via toast
     * - Detailed error display via global error modal
     */
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

    /**
     * Upload link for handling file uploads in GraphQL operations.
     * This link supports multipart form data and file uploads with proper
     * credentials and headers configuration.
     */
    const uploadLink = createUploadLink({
        uri: uri ?? GRAPHQL_URI_DEFAULT,
        credentials: 'include',
        headers: {
            'apollo-require-preflight': 'true',
        },
    });

    /**
     * WebSocket link for GraphQL subscriptions.
     * This link handles real-time subscriptions when a WebSocket URL is provided,
     * falling back to an empty link when no WebSocket URL is configured.
     */
    const wsLink = wsUrl
        ? new GraphQLWsLink(createClient({ url: wsUrl }))
        : ApolloLink.empty();

    /**
     * Split link that routes operations based on their type.
     * This link directs subscription operations to the WebSocket link and
     * all other operations (queries, mutations) to the HTTP upload link.
     */
    const splitLink = wsLink instanceof ApolloLink
        ? split(
                ({ query }) => {
                    const def = getMainDefinition(query);

                    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
                },
                wsLink,
                uploadLink,
            )
        : uploadLink;

    if (splitLink === uploadLink && wsUrl) {
        log.warn('[Apollo] WS URL is set, but subscriptions fallback to HTTP. Check your wsLink config.');
    }

    return [
        devLoggerLink, // 🪵 custom logger
        errorLink, // ⚠️ Apollo's error handling
        removeTypenameLink, // 🧼 cleans up __typename
        ...(customLinks ?? []), // 🔗 custom links
        splitLink, // 📡 HTTP vs WS routing (includes uploadLink)
    ];
}

/**
 * Creates a fully configured Apollo Client instance.
 * This function creates an Apollo Client with all necessary configuration including
 * the link chain, cache, and any additional options provided. The client is ready
 * for immediate use in React applications with comprehensive error handling and
 * development tooling.
 *
 * @param options - Configuration options for the Apollo Client including links, cache, and other settings.
 * @returns A fully configured Apollo Client instance ready for use.
 */
export function getClient(options: I_ApolloOptions = {}) {
    const link = from(createApolloLinks(options));

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
        ...options,
    });
}
