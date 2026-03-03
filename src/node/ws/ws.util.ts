import type { Request, Response } from 'express';
import type { Buffer } from 'node:buffer';
import type { IncomingMessage } from 'node:http';
import type { Duplex } from 'node:stream';

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
    const { server, path, sessionParser } = options;

    if (sessionParser) {
        const wss = new WebSocketServer({ noServer: true });

        server.on('upgrade', (req: IncomingMessage, socket: Duplex, head: Buffer) => {
            try {
                const url = new URL(req.url || '', 'http://localhost');
                if (url.pathname !== path)
                    return;

                sessionParser(req as Request, {} as Response, () => {
                    wss.handleUpgrade(req, socket, head, (ws) => {
                        wss.emit('connection', ws, req);
                    });
                });
            }
            catch {
                socket.destroy();
            }
        });

        return wss;
    }

    return new WebSocketServer({ server, path });
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
    const { schema, server, context: makeExtraContext, onConnect } = options;

    return createGraphQLWSServer(
        {
            schema,
            context: async (ctx) => {
                const req = ctx.extra.request as IncomingMessage & { session?: any; user?: any };

                const extra = makeExtraContext ? await makeExtraContext(req) : {};
                return { req, ...extra };
            },
            onConnect: async (ctx) => {
                if (onConnect) {
                    const req = ctx.extra.request as IncomingMessage & { session?: any; user?: any };
                    await onConnect(req);
                }
            },
        },
        server,
    );
}
