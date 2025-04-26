import type { INestApplication } from '@nestjs/common';
import type { Application, RequestHandler } from 'express';
import type { SessionOptions } from 'express-session';

import { NestFactory } from '@nestjs/core';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import device from 'express-device';
import session from 'express-session';

import type { I_ExpressOptions, I_NestOptions, T_CorsOptions, T_CorsType } from './express.type.js';

export function createCors<T extends T_CorsType>({ isDev, whiteList, ...rest }: T_CorsOptions<T>) {
    return cors<cors.CorsRequest>({
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            if (isDev || whiteList?.includes(origin ?? '')) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'), false);
            }
        },
        credentials: true,
        ...rest,
    });
};

export function createSession(options: SessionOptions): RequestHandler {
    return session(options);
}

export function createExpress(options?: I_ExpressOptions): Application {
    const app = express();

    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(device.capture());

    if (options?.staticFolder) {
        app.use(express.static(options.staticFolder));
    }

    return app;
}

export async function createNest(options: I_NestOptions): Promise<INestApplication> {
    const app = await NestFactory.create(options.module);

    app.getHttpAdapter().getInstance().set('trust proxy', 1);
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(compression());
    app.use(device.capture());

    if (options.staticFolder) {
        app.use(express.static(options.staticFolder));
    }

    if (options.filters) {
        options.filters.forEach((Filter) => {
            app.useGlobalFilters(Filter);
        });
    }

    if (options.pipes) {
        options.pipes.forEach((Pipe) => {
            app.useGlobalPipes(Pipe);
        });
    }

    return app;
}

export { bodyParser, express };
