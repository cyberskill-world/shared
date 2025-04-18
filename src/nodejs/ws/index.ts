import { useServer as createGraphQLServer } from 'graphql-ws/use/ws';
import { WebSocketServer } from 'ws';

import type { I_GraphqlWSOptions, I_WSOptions } from './ws.type.js';

export function createWSServer(options: I_WSOptions): WebSocketServer {
    return new WebSocketServer({
        server: options.server,
        path: options.path,
    });
}

export function initGraphQLWS(options: I_GraphqlWSOptions) {
    return createGraphQLServer({ schema: options.schema }, options.server);
}
