import fsExtra from 'fs-extra';
import { extname } from 'node:path';

import type { I_CopySyncOptions } from './fs.type.js';

export const {
    readFileSync,
    writeFileSync,
    pathExistsSync,
    appendFileSync,
    copySync: copySyncE,
    removeSync: removeSyncE,
    statSync,
} = fsExtra;

export const readJsonSync: <T = unknown>(file: string, options?: fsExtra.JsonReadOptions) => T = fsExtra.readJsonSync;

export const writeJsonSync: <T = unknown>(file: string, obj: T, options?: fsExtra.JsonWriteOptions | null) => void = fsExtra.writeJsonSync;

export function existsSync(...paths: string[]) {
    return paths.every(path => pathExistsSync(path));
}

export function removeSync(...paths: string[]) {
    paths.forEach((filePath) => {
        if (pathExistsSync(filePath)) {
            removeSyncE(filePath);
        }
    });
}

export function copySync(src: string, dest: string, options: I_CopySyncOptions = {}): void {
    const { extensions, ...rest } = options;

    copySyncE(src, dest, {
        filter: (srcPath: string) => {
            if (statSync(srcPath).isDirectory()) {
                return true;
            }

            if (!extensions || extensions.length === 0) {
                return true;
            }

            return extensions.includes(extname(srcPath));
        },
        ...rest,
    });
}
