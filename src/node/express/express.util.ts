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
import useragent from 'express-useragent';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

import type { I_ExpressOptions, I_NestOptions, T_CorsOptions, T_CorsType } from './express.type.js';

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

export function createCors<T extends T_CorsType>(options: T_CorsOptions<T>) {
    return cors<cors.CorsRequest>(createCorsOptions(options));
};

export function createSession(options: SessionOptions): RequestHandler {
    return session(options);
}

function setupMiddleware(app: Application) {
    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(useragent.express());
}

function setupStaticFolders(app: Application, staticFolders?: string | string[]) {
    if (staticFolders) {
        const statics = Array.isArray(staticFolders) ? staticFolders : [staticFolders];
        statics.forEach((folder) => {
            app.use(`/${folder}`, express.static(folder));
        });
    }
}

export function createExpress(options?: I_ExpressOptions): Application {
    const app = express();

    setupMiddleware(app);
    setupStaticFolders(app, options?.static);
    app.use(graphqlUploadExpress());

    return app;
}

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
