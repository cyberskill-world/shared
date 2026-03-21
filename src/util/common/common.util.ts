import { E_Environment } from '#typescript/index.js';

import type { I_EnvFlags, I_NodeEnvInput } from './common.type.js';

const charMap: Record<string, string[]> = {
    a: ['à', 'á', 'ạ', 'ả', 'ã', 'â', 'ầ', 'ấ', 'ậ', 'ẩ', 'ẫ', 'ă', 'ằ', 'ắ', 'ặ', 'ẳ', 'ẵ'],
    e: ['è', 'é', 'ẹ', 'ẻ', 'ẽ', 'ê', 'ề', 'ế', 'ệ', 'ể', 'ễ'],
    i: ['ì', 'í', 'ị', 'ỉ', 'ĩ'],
    o: ['ò', 'ó', 'ọ', 'ỏ', 'õ', 'ô', 'ồ', 'ố', 'ộ', 'ổ', 'ỗ', 'ơ', 'ờ', 'ớ', 'ợ', 'ở', 'ỡ'],
    u: ['ù', 'ú', 'ụ', 'ủ', 'ũ', 'ư', 'ừ', 'ứ', 'ự', 'ử', 'ữ'],
    y: ['ỳ', 'ý', 'ỵ', 'ỷ', 'ỹ'],
    d: ['đ'],
};

const upperCharMap: Record<string, string[]> = Object.entries(charMap).reduce(
    (map, [key, value]) => {
        map[key.toUpperCase()] = value.map(char => char.toUpperCase());
        return map;
    },
    {} as Record<string, string[]>,
);

const combinedMap = { ...charMap, ...upperCharMap };

// Pre-compute replacement map and search regex for better performance
// This avoids rebuilding regexes and maps on every function call
const replacementMap = new Map<string, string>();
const charsToMatch = new Set<string>();

Object.entries(combinedMap).forEach(([baseChar, variations]) => {
    // The replacement pattern is the same for the base char and all its variations
    // Example: 'a', 'à', 'á'... all map to '(a|à|á...)'
    const replacement = `(${[baseChar, ...variations].join('|')})`;

    [baseChar, ...variations].forEach((char) => {
        replacementMap.set(char, replacement);
        charsToMatch.add(char);
    });
});

// Construct a single regex that matches any character in our map
const patternString = [...charsToMatch].join('');
// We use a character class regex: [abc...]
// eslint-disable-next-line regexp/no-empty-character-class -- regex is built dynamically from precomputed charMap
const searchRegex = new RegExp(`[${patternString}]`, 'g');

const RE_ESCAPE_REGEXP = /[.*+?^${}()|[\]\\]/g;

/**
 * Escapes special characters in a string for use in a regular expression.
 * This function escapes characters that have special meaning in regex (e.g., ., *, +, ?, etc.)
 * so they are treated as literal characters.
 *
 * @param str - The string to escape.
 * @returns The escaped string safe for use in a RegExp.
 */
export function escapeRegExp(str: string): string {
    return str.replace(RE_ESCAPE_REGEXP, '\\$&');
}

/**
 * Simple LRU cache for regex search patterns.
 * Avoids redundant accent alternation and regex compilation for repeated search terms.
 */
const regexPatternCache = new Map<string, string>();
const REGEX_CACHE_MAX_SIZE = 128;

/**
 * Convert a string to a regex pattern that matches the string and its accented variations.
 * This function normalizes the input string and creates a regex pattern that can match
 * both the original characters and their accented equivalents.
 *
 * Optimization: Uses pre-computed regex and map to perform replacement in a single pass (O(N)),
 * instead of iterating through all character groups (O(K*N)).
 * Results are cached in an LRU cache (max 128 entries) to avoid redundant computation
 * for repeated search terms.
 *
 * @param str - The string to convert to a regex pattern.
 * @returns The regex pattern as a string that matches the original string and its accented variations.
 */
export function regexSearchMapper(str: string) {
    const cached = regexPatternCache.get(str);

    if (cached !== undefined) {
        return cached;
    }

    const escaped = escapeRegExp(str);
    const result = escaped.replace(searchRegex, match => replacementMap.get(match) || match);

    // Evict oldest entry if cache is full
    if (regexPatternCache.size >= REGEX_CACHE_MAX_SIZE) {
        const oldestKey = regexPatternCache.keys().next().value;
        if (oldestKey !== undefined) {
            regexPatternCache.delete(oldestKey);
        }
    }

    regexPatternCache.set(str, result);
    return result;
}

const RE_DIACRITIC = /\p{Diacritic}/gu;

/**
 * Remove accents from a string.
 * This function normalizes the string using NFD normalization and removes all diacritical marks.
 *
 * @param str - The string to remove accents from.
 * @returns The string without any accents or diacritical marks.
 */
export function removeAccent(str: string) {
    return str.normalize('NFD').replace(RE_DIACRITIC, '');
}

/**
 * Remove duplicates from an array based on a key function.
 * This function can remove duplicates either by comparing values directly (when no keyFn is provided)
 * or by using a custom key function to determine uniqueness.
 *
 * @param arr - The array to remove duplicates from.
 * @param keyFn - Optional function that returns a unique key for each item in the array.
 * @returns A new array with duplicates removed, maintaining the original order.
 */
export function uniqueArray<T>(
    arr: T[],
    keyFn?: (item: T) => string | number,
): T[] {
    if (!keyFn) {
        return [...new Set(arr)];
    }

    const seen = new Set<string | number>();
    const result: T[] = [];

    for (const item of arr) {
        const key = keyFn(item);
        if (!seen.has(key)) {
            seen.add(key);
            result.push(item);
        }
    }

    return result;
}

/**
 * Map environment variables to boolean flags indicating the current environment.
 * This function takes NODE_ENV and NODE_ENV_MODE variables and returns flags
 * indicating whether the current environment is development, staging, or production.
 *
 * @param env - The environment variables object containing NODE_ENV and NODE_ENV_MODE.
 * @returns An object containing boolean flags for the environment (IS_DEV, IS_STAG, IS_PROD).
 * @throws {Error} When NODE_ENV is production but NODE_ENV_MODE is development.
 */
export function mapEnvironment(env: I_NodeEnvInput): I_EnvFlags {
    const { NODE_ENV = E_Environment.DEVELOPMENT, NODE_ENV_MODE = E_Environment.DEVELOPMENT } = env;

    const IS_DEV = NODE_ENV === E_Environment.DEVELOPMENT && NODE_ENV_MODE === E_Environment.DEVELOPMENT;
    const IS_STAG = NODE_ENV === E_Environment.PRODUCTION && NODE_ENV_MODE === E_Environment.STAGING;
    const IS_PROD = NODE_ENV === E_Environment.PRODUCTION && NODE_ENV_MODE === E_Environment.PRODUCTION;

    if (NODE_ENV === E_Environment.PRODUCTION && NODE_ENV_MODE === E_Environment.DEVELOPMENT) {
        throw new Error('NODE_ENV_MODE must be set to staging or production in production environment');
    }

    return { IS_DEV, IS_STAG, IS_PROD };
}

/**
 * Checks if value is object-like (e.g., objects, arrays, etc.), not null.
 * Re-exported from util for general use across the codebase.
 *
 * @remarks
 * Returns `true` for arrays, Dates, Maps, Sets, and class instances.
 * Use {@link isPlainObject} when you specifically need to check for plain objects only.
 *
 * @param value - The value to check.
 * @returns True if the value is an object and not null.
 */
export function isObject(value: unknown): value is object {
    return value != null && typeof value === 'object';
}

/**
 * Checks if a value is a plain object (created by `{}`, `Object.create(null)`, or `new Object()`).
 * Unlike {@link isObject}, this returns `false` for arrays, Dates, Maps, Sets, RegExps,
 * and other class instances.
 *
 * @param value - The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (value == null || typeof value !== 'object') {
        return false;
    }
    const proto = Object.getPrototypeOf(value);

    return proto === Object.prototype || proto === null;
}
