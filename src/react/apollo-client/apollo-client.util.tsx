import { ApolloClient, CombinedGraphQLErrors, CombinedProtocolErrors, InMemoryCache, ServerError } from '@apollo/client/core';
import { ApolloLink } from '@apollo/client/link';
import { ErrorLink } from '@apollo/client/link/error';
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import React from 'react';
import { tap } from 'rxjs';

import type { I_ApolloOptions } from './apollo-client.type.js';

import { showGlobalApolloError } from '../apollo-error/index.js';
import { log } from '../log/index.js';
import { toast } from '../toast/index.js';
import { GRAPHQL_URI_DEFAULT } from './apollo-client.constant.js';
import { createUploadLink } from './links/index.js';

const roundTripLink = new ApolloLink((operation, forward) => {
    operation.setContext({ start: new Date() });

    return forward(operation).pipe(
        tap(() => {
            const time = new Date().getTime() - operation.getContext()['start'];

            log.info(`Operation ${operation.operationName} took ${time}ms to complete`);
        }),
    );
});

const errorLink = new ErrorLink(({ error, operation }) => {
    const opName = operation?.operationName || 'Unknown';
    let errorMessage = '';

    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }, index) => {
            if (index === 0) {
                errorMessage = message;
            }

            log.error(
                `[GraphQL error] ${opName}: ${message}, Location: ${JSON.stringify(locations, null, 4)}, Path: ${path}`,
            );
        });
    }
    else if (CombinedProtocolErrors.is(error)) {
        error.errors.forEach(({ message, extensions }, index) => {
            if (index === 0) {
                errorMessage = message;
            }

            log.error(
                `[Protocol error]: ${message}, Extensions: ${JSON.stringify(extensions, null, 4)}`,
            );
        });
    }
    else if (ServerError.is(error)) {
        errorMessage = error.message;

        log.error(`[Server error]: ${error.message}`);
    }
    else {
        errorMessage = error.message;

        log.error(`[Network error]: ${error.message}`);
    }

    if (error && errorMessage && typeof window !== 'undefined') {
        toast.error((t: { id: string }) => (
            <>
                {errorMessage}
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
});

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
export function createApolloLinks(options: I_ApolloOptions): ApolloLink[] {
    const { uri, wsUrl, customLinks } = options;

    const removeTypenameLink = new RemoveTypenameFromVariablesLink();

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

    const wsLink = wsUrl
        ? new GraphQLWsLink(createClient({ url: wsUrl }))
        : ApolloLink.empty();

    const splitLink = wsUrl
        ? ApolloLink.split(
                ({ operationType }) => {
                    return operationType === OperationTypeNode.SUBSCRIPTION;
                },
                wsLink,
                uploadLink as unknown as ApolloLink,
            )
        : uploadLink;

    if (wsUrl && splitLink === uploadLink) {
        log.warn('[Apollo] WS URL is set, but subscriptions fallback to HTTP. Check your wsLink config.');
    }

    return [
        roundTripLink,
        errorLink,
        removeTypenameLink,
        ...(customLinks ?? []),
        splitLink as unknown as ApolloLink,
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
export function getClient(options: I_ApolloOptions) {
    const link = ApolloLink.from(createApolloLinks(options));

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
        ...options,
    });
}
