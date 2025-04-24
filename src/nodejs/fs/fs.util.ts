import fsExtra from 'fs-extra';
import { extname } from 'node:path';

import type { I_CopySyncOptions } from './fs.type.js';

export const fs = fsExtra;

export const {
    lstatSync,
    readdirSync,
    mkdirSync,
    readFileSync,
    writeFileSync,
    appendFileSync,
    unlinkSync,
    statSync,
} = fsExtra;

export const readJsonSync: typeof fsExtra.readJsonSync = fsExtra.readJsonSync;
export const writeJsonSync: typeof fsExtra.writeJsonSync = fsExtra.writeJsonSync;

export function pathExistsSync(...paths: string[]) {
    return paths.every(path => fsExtra.pathExistsSync(path));
}

export function removeSync(...paths: string[]) {
    paths.forEach((filePath) => {
        if (pathExistsSync(filePath)) {
            fsExtra.removeSync(filePath);
        }
    });
}

export function copySync(src: string, dest: string, options: I_CopySyncOptions = {}): void {
    const { extensions, ...rest } = options;

    fsExtra.copySync(src, dest, {
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
