import type { T_Object } from '#typescript/index.js';

import type { I_SlugifyOptions } from './string.type.js';

import { removeAccent } from '../common/common.util.js';

/**
 * Generates a slug from a string.
 * The slug is a URL-friendly version of the string, removing special characters
 * and converting spaces to hyphens.
 *
 * @param input - The string to be slugified.
 * @param options - Options for slugification.
 * @returns The slugified string.
 */
function slugify(input: string, options?: I_SlugifyOptions): string {
    let slug = input.trim();

    // 1. Remove accents
    slug = removeAccent(slug);

    // 2. To lower case if requested (default true)
    if (options?.lower !== false) {
        slug = slug.toLowerCase();
    }

    // 3. Replace invalid characters with space (keeping alphanumeric, hyphens, and spaces)
    slug = slug.replace(/[^a-z0-9\s-]/gi, ' ');

    // 4. Replace multiple spaces or hyphens with a single hyphen
    slug = slug.replace(/[\s-]+/g, '-');

    // 5. Remove leading/trailing hyphens
    slug = slug.replace(/^-+|-+$/g, '');

    return slug;
}

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
        slugify(value ?? '', options);

    if (typeof input === 'object' && input !== null) {
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
 * The ID is a substring of the UUID, providing a shorter identifier.
 * Note: This is NOT cryptographically secure and collisions are possible,
 * but suitable for display purposes where uniqueness is handled elsewhere.
 *
 * @param uuid - The UUID to be converted to a short ID.
 * @param length - The desired length of the short ID (default: 4 characters).
 * @returns A short ID string of the specified length derived from the UUID.
 */
export function generateShortId(uuid: string, length = 4): string {
    // Simple hash function (FNV-1a variant) to generate a hex string from the UUID
    let hash = 0x811C9DC5;
    for (let i = 0; i < uuid.length; i++) {
        hash ^= uuid.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    // Convert to unsigned 32-bit integer hex string
    const hex = (hash >>> 0).toString(16).padStart(8, '0');

    // If we need more than 8 chars, we can just append part of the original UUID (stripped of dashes)
    // or use a different strategy. For short IDs (usually < 8), the hash is fine.
    // If length > 8, we fallback to just slicing the clean UUID.
    if (length > 8) {
        return uuid.replace(/-/g, '').slice(0, length);
    }

    return hex.slice(0, length);
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

    const limit = Math.floor(2 ** 32 / charset.length) * charset.length;
    const result: string[] = [];

    while (result.length < length) {
        const values = new Uint32Array(length - result.length);
        crypto.getRandomValues(values);

        for (const value of values) {
            if (value < limit) {
                result.push(charset[value % charset.length] as string);
            }
        }
    }

    return result.join('');
}

/**
 * Generates a random string of a given length using a secure random number generator.
 * This function is a cryptographically secure alternative to Math.random().toString(36).
 *
 * @param length - The desired length of the string (default: 8 characters).
 * @param charset - The characters to use (default: lowercase alphanumeric).
 * @returns A randomly generated string.
 */
export function generateRandomString(
    length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyz0123456789',
): string {
    const limit = Math.floor(2 ** 32 / charset.length) * charset.length;
    const result: string[] = [];

    while (result.length < length) {
        const values = new Uint32Array(length - result.length);
        crypto.getRandomValues(values);

        for (const value of values) {
            if (value < limit) {
                result.push(charset[value % charset.length] as string);
            }
        }
    }

    return result.join('');
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
