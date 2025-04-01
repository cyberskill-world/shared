import { createRequire } from 'node:module';
import * as path from 'node:path';

import { CYBERSKILL_DIRECTORY, WORKING_DIRECTORY } from '../constants/path.js';

export function resolveCyberSkillPath(...urls: string[]): string {
    return path.resolve(CYBERSKILL_DIRECTORY, ...urls);
}

export function resolveWorkingPath(...urls: string[]): string {
    return path.resolve(WORKING_DIRECTORY, ...urls);
}

export function resolve(...urls: string[]): string {
    return path.resolve(...urls);
}

export function dirname(url: string): string {
    return path.dirname(url);
}

export function require() {
    return createRequire(CYBERSKILL_DIRECTORY);
}

export function join(...urls: string[]): string {
    return path.join(...urls);
}
