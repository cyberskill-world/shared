import * as fs from 'node:fs';

import type { I_JSON } from '#typescript/fs.js';

export const existsSync = (filePath: string) => fs.existsSync(filePath);

export function readFileSync(filePath: string, options: { asJson: true }): I_JSON;
export function readFileSync(filePath: string, options?: { asJson?: false }): string;
export function readFileSync(filePath: string, options?: { asJson?: boolean }): string | I_JSON {
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

export function writeFileSync(filePath: string, data: string | object, options: { isJson?: boolean } = {}) {
    const { isJson = false } = options;
    const content = isJson && typeof data === 'object'
        ? JSON.stringify(data, null, 4)
        : String(data);

    fs.writeFileSync(filePath, content, 'utf-8');
}

export function appendFileSync(filePath: string, data: string | object, options: { isJson?: boolean } = {}) {
    const { isJson = false } = options;
    const content = isJson && typeof data === 'object'
        ? JSON.stringify(data, null, 4)
        : String(data);

    fs.appendFileSync(filePath, content, 'utf-8');
}
