import type { SessionOptions } from 'express-session';

export interface I_ExpressOptions {
    staticFolder: string;
    sessionOptions?: SessionOptions;
}

export interface I_CorsOptions {
    isDev?: boolean;
    whiteList?: string[];
}
