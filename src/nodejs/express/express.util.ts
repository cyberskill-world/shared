import type { Application, RequestHandler } from 'express';
import type { SessionOptions } from 'express-session';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import device from 'express-device';
import session from 'express-session';

import type { I_CorsOptions, I_ExpressOptions } from './express.type.js';

export function createCors({ isDev, whiteList, ...rest }: I_CorsOptions) {
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

export function createExpress(options: I_ExpressOptions): Application {
    const app = express();

    app.set('trust proxy', 1);
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(device.capture());

    if (options.staticFolder) {
        app.use(express.static(options.staticFolder));
    }

    if (options.sessionOptions) {
        app.use(
            createSession(options.sessionOptions),
        );
    }

    return app;
}

export { express };
