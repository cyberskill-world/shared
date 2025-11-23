import type { INestApplication } from '@nestjs/common';
import type { Application, RequestHandler } from 'express';
import type { SessionOptions } from 'express-session';

import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { express as useragent } from 'express-useragent';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

import type { I_ExpressOptions, I_NestOptions, T_CorsOptions, T_CorsType } from './express.type.js';

/**
 * Creates CORS options with environment-specific configuration.
 * This function generates CORS options based on the development environment,
 * including whitelist configuration for allowed origins.
 *
 * @param options - CORS configuration options.
 * @param options.isDev - Whether the application is running in development mode.
 * @param options.whiteList - Array of allowed origins for CORS requests.
 * @returns CORS options object configured for the specified environment.
 */
export function createCorsOptions<T extends T_CorsType>({ isDev, whiteList, ...rest }: T_CorsOptions<T>) {
    return {
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            if (isDev || !origin || whiteList?.includes(origin ?? '')) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'), false);
            }
        },
        credentials: true,
        ...rest,
    };
}

/**
 * Creates a CORS middleware function with the specified configuration.
 * This function creates a CORS middleware that can be used with both Express and NestJS applications,
 * applying the configured CORS options for origin validation and credential handling.
 *
 * @param options - CORS configuration options to apply to the middleware.
 * @returns A CORS middleware function ready to be used in Express or NestJS applications.
 */
export function createCors<T extends T_CorsType>(options: T_CorsOptions<T>) {
    return cors<cors.CorsRequest>(createCorsOptions(options));
}

/**
 * Creates a session middleware function with the specified configuration.
 * This function creates an Express session middleware that can be used to handle user sessions
 * with the provided session options including secret, cookie settings, and storage configuration.
 *
 * @param options - Session configuration options including secret, cookie settings, and storage.
 * @returns A session middleware function ready to be used in Express applications.
 */
export function createSession(options: SessionOptions): RequestHandler {
    return session(options);
}

/**
 * Sets up common middleware for Express applications.
 * This function configures essential middleware including:
 * - Trust proxy settings for proper IP handling
 * - Cookie parsing for request cookies
 * - URL-encoded body parsing for form data
 * - Compression for response optimization
 * - User agent parsing for device/browser detection
 *
 * @param app - The Express application instance to configure with middleware.
 */
function setupMiddleware(app: Application) {
    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(useragent());
}

/**
 * Sets up static file serving for Express applications.
 * This function configures static file serving for the specified folders,
 * making files in those directories accessible via HTTP requests.
 *
 * @param app - The Express application instance to configure with static file serving.
 * @param staticFolders - A string or array of strings representing the paths to serve statically.
 */
function setupStaticFolders(app: Application, staticFolders?: string | string[]) {
    if (staticFolders) {
        const statics = Array.isArray(staticFolders) ? staticFolders : [staticFolders];
        statics.forEach((folder) => {
            app.use(`/${folder}`, express.static(folder));
        });
    }
}

/**
 * Creates and configures an Express application with common middleware and settings.
 * This function sets up a complete Express application with:
 * - Essential middleware (cookies, body parsing, compression, user agent)
 * - Static file serving for specified folders
 * - GraphQL upload support for file uploads
 *
 * @param options - Optional configuration for the Express application including static folder paths.
 * @returns A configured Express application instance ready for use.
 */
export function createExpress(options?: I_ExpressOptions): Application {
    const app = express();

    setupMiddleware(app);
    setupStaticFolders(app, options?.static);
    app.use(graphqlUploadExpress());

    return app;
}

/**
 * Creates and configures a NestJS application with Express integration.
 * This function sets up a NestJS application with:
 * - Express HTTP adapter configuration
 * - Common middleware (cookies, body parsing, compression, user agent)
 * - Static file serving for specified folders
 * - Global filters and pipes if provided
 *
 * @param options - Configuration options for the NestJS application including module, static folders, filters, and pipes.
 * @returns A promise that resolves to a configured NestJS application instance.
 */
export async function createNest(options: I_NestOptions): Promise<INestApplication> {
    const app = await NestFactory.create(options.module);

    setupMiddleware(app.getHttpAdapter().getInstance());
    setupStaticFolders(app.getHttpAdapter().getInstance(), options.static);

    if (options.filters) {
        app.useGlobalFilters(...options.filters);
    }

    if (options.pipes) {
        app.useGlobalPipes(...options.pipes);
    }

    return app;
}

export { bodyParser, express };
