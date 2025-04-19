import type { SessionOptions } from 'express-session';

export type { NextFunction, Request, Response } from 'express';
export { Router } from 'express';
export { Session } from 'express-session';

export interface I_ExpressOptions {
    staticFolder: string;
    sessionOptions?: SessionOptions;
}

export interface I_CorsOptions {
    isDev?: boolean;
    whiteList?: string[];
}
