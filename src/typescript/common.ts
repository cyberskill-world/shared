import type consola from 'consola';

export type T_Object<T = unknown> = Record<string, T>;

export interface I_Log {
    silent: typeof consola['silent'];
    level: typeof consola['level'];
    fatal: typeof consola['fatal'];
    error: typeof consola['error'];
    warn: typeof consola['warn'];
    log: typeof consola['log'];
    info: typeof consola['info'];
    success: typeof consola['success'];
    ready: typeof consola['ready'];
    start: typeof consola['start'];
    box: typeof consola['box'];
    debug: typeof consola['debug'];
    trace: typeof consola['trace'];
    verbose: typeof consola['verbose'];
}

export interface I_ReturnSuccess<T, E = unknown> {
    success: true;
    result: T & E;
    message?: string;
    code?: number | string;
}

export interface I_ReturnFailure {
    success: false;
    message: string;
    code: number | string;
}

export type I_Return<T = void, E = unknown> = I_ReturnSuccess<T, E> | I_ReturnFailure;

export enum E_Environment {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development',
}
