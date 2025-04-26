import type { CorsOptions as CorsOptionsNestJS } from '@nestjs/common/interfaces/external/cors-options.interface.js';
import type { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors';
import type { SessionOptions } from 'express-session';

export type { NextFunction, Request, Response } from 'express';
export { Router } from 'express';
export type { Session } from 'express-session';

export interface I_ExpressOptions {
    staticFolder: string;
    sessionOptions?: SessionOptions;
}

type ResolvedCorsOptions = Partial<CorsOptions> & Partial<CorsOptionsNestJS> & {
    origin?: CorsOptions['origin'] | CorsOptionsNestJS['origin'];
};

export interface I_CorsOptions extends ResolvedCorsOptions, CorsOptionsDelegate<CorsRequest> {
    isDev?: boolean;
    whiteList?: string[];
}
