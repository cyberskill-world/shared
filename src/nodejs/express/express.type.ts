import type { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors';
import type { SessionOptions } from 'express-session';

export type { NextFunction, Request, Response } from 'express';
export { Router } from 'express';
export type { Session } from 'express-session';

export interface I_ExpressOptions {
    staticFolder: string;
    sessionOptions?: SessionOptions;
}

export interface I_CorsOptions extends CorsOptions, CorsOptionsDelegate<CorsRequest> {
    isDev?: boolean;
    whiteList?: string[];
}
