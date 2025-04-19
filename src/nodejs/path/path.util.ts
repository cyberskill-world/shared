import * as path from 'node:path';

import { getEnv } from '#configs/env/index.js';

const env = getEnv();

export function resolveWorkingPath(...urls: string[]): string {
    return path.resolve(env.CWD, ...urls);
}

export function resolve(...urls: string[]): string {
    return path.resolve(...urls);
}

export function join(...urls: string[]): string {
    return path.join(...urls);
}
