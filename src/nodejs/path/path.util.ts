import { join as pathJoin, resolve as pathResolve } from 'node:path';

import { getEnv } from '#configs/env/index.js';

const env = getEnv();

export function resolveWorkingPath(...urls: string[]): string {
    return pathResolve(env.CWD, ...urls);
}

export function resolve(...urls: string[]): string {
    return pathResolve(...urls);
}

export function join(...urls: string[]): string {
    return pathJoin(...urls);
}
