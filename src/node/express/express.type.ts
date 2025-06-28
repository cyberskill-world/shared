import type { ExceptionFilter, Type, ValidationPipe } from '@nestjs/common';
import type { CorsOptions as CorsOptionsNestJS } from '@nestjs/common/interfaces/external/cors-options.interface.js';
import type { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors';

export type { NextFunction, Request, Response } from 'express';

export { Router } from 'express';

export interface I_ExpressOptions {
    static?: string | string[];
}

export interface I_NestOptions {
    module: Type<object>;
    static?: string | string[];
    filters?: ExceptionFilter[];
    pipes?: ValidationPipe[];
}

export type T_CorsType = 'node' | 'nest';

interface I_BaseCorsOptions {
    isDev?: boolean;
    whiteList?: string[];
}

interface I_CorsOptionsNode extends I_BaseCorsOptions, CorsOptions, CorsOptionsDelegate<CorsRequest> {
}

interface I_CorsOptionsNest extends I_BaseCorsOptions, CorsOptionsNestJS {
}

export type T_CorsOptions<T extends T_CorsType> = T extends 'node'
    ? I_CorsOptionsNode
    : I_CorsOptionsNest;
