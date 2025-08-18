import type { RequestHandler } from 'express';
import type { GraphQLSchema } from 'graphql';
import type { IncomingMessage, Server } from 'node:http';
import type { WebSocketServer } from 'ws';

export interface I_WSOptions {
    server: Server;
    path: string;
    sessionParser?: RequestHandler;
}

export interface I_GraphqlWSOptions {
    schema: GraphQLSchema;
    server: WebSocketServer;
    context?: (req: IncomingMessage & { session?: any; user?: any }) =>
        Promise<Record<string, any>> | Record<string, any>;
    onConnect?: (req: IncomingMessage & { session?: any; user?: any }) =>
        Promise<void> | void;
}
