import cryptoJS from 'crypto-js';
import slugifyRaw from 'slugify';

import type { I_SlugifyOptions } from './string.type.js';

const slugify = slugifyRaw.default || slugifyRaw;

/**
 * Generates a slug from a given string.
 * The slug is a URL-friendly version of the string.
 * It replaces spaces with hyphens and removes special characters.
 * @param str - The string to be slugified.
 * @param options - Options for slugify.
 * @returns The slugified string.
 */
export function generateSlug(str = '', options?: I_SlugifyOptions): string {
    return slugify(str, {
        lower: options?.lower ?? true,
        locale: options?.locale ?? 'vi',
        ...options,
    });
}

/**
 * Generates a short ID from a UUID.
 * The ID is a substring of the SHA256 hash of the UUID.
 * @param uuid - The UUID to be converted.
 * @param length - The length of the short ID.
 * @returns The short ID.
 */
export function generateShortId(uuid: string, length = 4): string {
    return cryptoJS.SHA256(uuid).toString(cryptoJS.enc.Hex).slice(0, length);
}

/**
 * Generates a random password of a given length.
 * The password contains a mix of letters, numbers, and special characters.
 * @param length - The length of the password.
 * @returns The generated password.
 */
export function generateRandomPassword(length = 8): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    return password;
}

/**
 * Get the file name from a URL.
 * @param url - The URL to extract the file name from.
 * @param getExtension - Whether to include the file extension.
 * @returns The file name.
 */
export function getFileName(url = '', getExtension = false): string {
    const withoutQuery = url.split(/[?#]/)[0] || '';
    const fileName = withoutQuery.substring(withoutQuery.lastIndexOf('/') + 1);

    if (getExtension) {
        return fileName;
    }

    const dotIndex = fileName.lastIndexOf('.');

    return dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
}

/**
 * Extracts a substring between two strings.
 * @param s - The original string.
 * @param a - The starting string.
 * @param b - The ending string.
 * @returns The substring between the two strings.
 */
export function substringBetween(s: string, a: string, b: string): string {
    const start = s.indexOf(a);

    if (start === -1) {
        return '';
    }

    const from = start + a.length;
    const end = s.indexOf(b, from);

    if (end === -1) {
        return '';
    }

    return s.slice(from, end);
}
