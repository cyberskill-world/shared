import cryptoJS from 'crypto-js';
import slugifyRaw from 'slugify';

import type { I_SlugifyOptions } from '#typescript/string.js';

const slugify = slugifyRaw.default || slugifyRaw;

export function generateSlug(str = '', options?: I_SlugifyOptions): string {
    const { lower = true, locale = 'vi', ...rest } = options || {};
    return slugify(str, { lower, locale, ...rest });
}

export function generateShortId(uuid: string, length = 4): string {
    return cryptoJS.SHA256(uuid).toString(cryptoJS.enc.Hex).slice(0, length);
}
