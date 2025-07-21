import { useServer as createGraphQLWSServer } from 'graphql-ws/use/ws';
import { WebSocketServer } from 'ws';

import type { I_GraphqlWSOptions, I_WSOptions } from './ws.type.js';

/**
 * Creates a WebSocket server with the specified configuration.
 * This function creates a WebSocket server instance that can be attached to an HTTP server
 * and configured with a specific path for WebSocket connections.
 *
 * @param options - Configuration options including the HTTP server instance and WebSocket path.
 * @returns A configured WebSocket server instance ready to handle connections.
 */
export function createWSServer(options: I_WSOptions): WebSocketServer {
    return new WebSocketServer({
        server: options.server,
        path: options.path,
    });
}

/**
 * Initializes GraphQL WebSocket server with schema and WebSocket server.
 * This function sets up GraphQL subscriptions over WebSocket by creating a GraphQL WebSocket server
 * that can handle GraphQL operations including queries, mutations, and subscriptions.
 *
 * @param options - Configuration options including the GraphQL schema and WebSocket server instance.
 * @returns A configured GraphQL WebSocket server ready to handle GraphQL operations over WebSocket.
 */
export function initGraphQLWS(options: I_GraphqlWSOptions) {
    return createGraphQLWSServer({ schema: options.schema }, options.server);
}
