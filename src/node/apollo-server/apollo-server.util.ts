import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@as-integrations/express5';

import type { I_ApolloServerOptions } from './apollo-server.type.js';

import { log } from '../log/index.js';

/**
 * Creates and configures an Apollo Server instance with appropriate plugins and settings.
 * This function sets up an Apollo Server with development or production landing pages,
 * HTTP server draining capabilities, and optional custom drain server hooks.
 *
 * The server is configured with:
 * - Development or production landing page based on the isDev flag
 * - HTTP server draining plugin for graceful shutdowns
 * - Optional custom drain server hook for additional cleanup
 * - Development-specific settings (introspection and stack traces) when isDev is true
 *
 * @param options - Configuration options for the Apollo Server including server instance, schema, and environment settings.
 * @returns A configured Apollo Server instance ready to be started.
 */
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
