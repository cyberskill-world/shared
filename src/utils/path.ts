import * as path from 'node:path';

import { WORKING_DIRECTORY } from '../constants/path.js';

export function resolveWorkingPath(...urls: string[]): string {
    return path.resolve(WORKING_DIRECTORY, ...urls);
}

export function resolve(...urls: string[]): string {
    return path.resolve(...urls);
}

export function join(...urls: string[]): string {
    return path.join(...urls);
}
