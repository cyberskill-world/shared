import * as fs from 'node:fs';

import type { T_Object } from '#typescript/common.js';

export function existsSync(...paths: string[]) {
    return paths.every(path => fs.existsSync(path));
}

export function readFileSync(filePath: string, options: { asJson: true }): T_Object;
export function readFileSync(filePath: string, options?: { asJson?: false }): string;
export function readFileSync(filePath: string, options?: { asJson?: boolean }): string | T_Object {
    const content = fs.readFileSync(filePath, 'utf-8');

    if (options?.asJson) {
        try {
            const parsed = JSON.parse(content);
            if (typeof parsed === 'object' && parsed !== null) {
                return parsed;
            }
            throw new Error('Parsed JSON is not an object or array');
        }
        catch {
            throw new Error(`Failed to parse JSON from file: ${filePath}`);
        }
    }

    return content;
}

export function writeFileSync(filePath: string, data: string | T_Object, options: { isJson?: boolean } = {}) {
    const { isJson = false } = options;
    const content = isJson && typeof data === 'object'
        ? JSON.stringify(data, null, 4)
        : String(data);

    fs.writeFileSync(filePath, content, 'utf-8');
}

export function appendFileSync(filePath: string, data: string | T_Object, options: { isJson?: boolean } = {}) {
    const { isJson = false } = options;
    const content = isJson && typeof data === 'object'
        ? JSON.stringify(data, null, 4)
        : String(data);

    fs.appendFileSync(filePath, content, 'utf-8');
}

export function rmSync(...paths: string[]) {
    paths.forEach((filePath) => {
        if (existsSync(filePath)) {
            fs.rmSync(filePath, { recursive: true, force: true });
        }
    });
}
