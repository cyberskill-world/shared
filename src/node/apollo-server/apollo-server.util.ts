import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

import type { I_ApolloServerOptions } from './apollo-server.type.js';

import { logNode as log } from '../log/index.js';

export function createApolloServer(options: I_ApolloServerOptions): ApolloServer {
    return new ApolloServer({
        schema: options.schema,
        plugins: [
            options.isDev
                ? ApolloServerPluginLandingPageLocalDefault()
                : ApolloServerPluginLandingPageProductionDefault(),
            ApolloServerPluginDrainHttpServer({ httpServer: options.server }),
            ...(options.drainServer
                ? [{
                        async serverWillStart() {
                            return {
                                async drainServer() {
                                    options.drainServer?.();
                                    log.info('Apollo Server drainServer hook called');
                                },
                            };
                        },
                    }]
                : []),
        ],
        ...(options.isDev && {
            introspection: true,
            includeStacktraceInErrorResponses: true,
        }),
    });
}

export { expressMiddleware };
