import type { GraphQLSchema } from 'graphql';
import type { Server } from 'node:http';
import type { WebSocketServer } from 'ws';

export interface I_WSOptions {
    server: Server;
    path: string;
}

export interface I_GraphqlWSOptions {
    schema: GraphQLSchema;
    server: WebSocketServer;
}
