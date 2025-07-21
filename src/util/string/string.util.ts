import cryptoJS from 'crypto-js';
import { isObject } from 'lodash-es';
import slugifyRaw from 'slugify';

import type { T_Object } from '#typescript/index.js';

import type { I_SlugifyOptions } from './string.type.js';

const slugify = slugifyRaw.default || slugifyRaw;

/**
 * Generates a slug from a string or an object containing strings.
 * The slug is a URL-friendly version of the string, removing special characters
 * and converting spaces to hyphens. This function can handle both single strings
 * and objects with string values.
 *
 * @param input - The string or object to be slugified.
 * @param options - Options for slugification including replacement character, case sensitivity, locale, etc.
 * @returns The slugified string or object with the same structure as the input.
 */
export function generateSlug<T = string>(
    input: T,
    options?: I_SlugifyOptions,
): T {
    const slugifyWithOptions = (value: string) =>
        slugify(value ?? '', {
            lower: options?.lower ?? true,
            locale: options?.locale ?? 'vi',
            ...options,
        });

    if (isObject(input)) {
        const result: T_Object = {};

        for (const [key, value] of Object.entries(input)) {
            result[key] = slugifyWithOptions(value as string);
        }

        return result as T;
    }

    return slugifyWithOptions(input as string) as T;
}

/**
 * Generates a short ID from a UUID.
 * The ID is a substring of the SHA256 hash of the UUID, providing a shorter
 * but still unique identifier based on the original UUID.
 *
 * @param uuid - The UUID to be converted to a short ID.
 * @param length - The desired length of the short ID (default: 4 characters).
 * @returns A short ID string of the specified length derived from the UUID's SHA256 hash.
 */
export function generateShortId(uuid: string, length = 4): string {
    return cryptoJS.SHA256(uuid).toString(cryptoJS.enc.Hex).slice(0, length);
}

/**
 * Generates a random password of a given length.
 * The password contains a mix of letters (both cases), numbers, and special characters
 * to ensure complexity and security.
 *
 * @param length - The desired length of the password (default: 8 characters).
 * @returns A randomly generated password string with the specified length.
 */
export function generateRandomPassword(length = 8): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';

    return Array.from({ length }, () => {
        const randomIndex = Math.floor(Math.random() * charset.length);
        return charset.charAt(randomIndex);
    }).join('');
}

/**
 * Get the file name from a URL.
 * This function extracts the file name from a URL, optionally including or excluding
 * the file extension. It handles URLs with query parameters and fragments.
 *
 * @param url - The URL to extract the file name from (default: empty string).
 * @param getExtension - Whether to include the file extension in the result (default: false).
 * @returns The file name extracted from the URL, with or without the extension.
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
 * This function finds the first occurrence of the starting string, then finds the first
 * occurrence of the ending string after the starting string, and returns the content between them.
 *
 * @param s - The original string to search within.
 * @param a - The starting string that marks the beginning of the desired substring.
 * @param b - The ending string that marks the end of the desired substring.
 * @returns The substring between the two specified strings, or an empty string if either string is not found.
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
