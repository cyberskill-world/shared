import * as path from 'node:path';

import { getEnv } from '#configs/env/index.js';

import { BUILD_DIRECTORY, CYBERSKILL_PACKAGE_NAME, NODE_MODULES } from './path.constant.js';

export function resolveWorkingPath(...urls: string[]): string {
    const env = getEnv();

    return path.resolve(env.CWD, ...urls);
}

export function resolve(...urls: string[]): string {
    return path.resolve(...urls);
}

export function join(...urls: string[]): string {
    return path.join(...urls);
}

export function getCyberSkillDirectory(): string {
    const env = getEnv();

    return join(env.CWD, NODE_MODULES, CYBERSKILL_PACKAGE_NAME, BUILD_DIRECTORY);
}
