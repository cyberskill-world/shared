import type { GraphQLSchema } from 'graphql';
import type { Server } from 'node:http';

export interface I_ApolloServerOptions {
    server: Server;
    schema: GraphQLSchema;
    isDev?: boolean;
    drainServer?: () => Promise<void>;
}
