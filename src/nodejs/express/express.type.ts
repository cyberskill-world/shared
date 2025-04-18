import type { SessionOptions } from 'express-session';

export interface I_ExpressOptions {
    staticFolder: string;
    sessionOptions?: SessionOptions;
    isDev?: boolean;
    corsWhitelist?: string[];
}

export interface I_CorsOptions {
    isDev?: boolean;
    corsWhitelist?: string[];
}
