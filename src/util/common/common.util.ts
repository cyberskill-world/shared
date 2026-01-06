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
const patternString = Array.from(charsToMatch).join('');
// We use a character class regex: [abc...]
const searchRegex = new RegExp(`[${patternString}]`, 'g');

/**
 * Convert a string to a regex pattern that matches the string and its accented variations.
 * This function normalizes the input string and creates a regex pattern that can match
 * both the original characters and their accented equivalents.
 *
 * Optimization: Uses pre-computed regex and map to perform replacement in a single pass (O(N)),
 * instead of iterating through all character groups (O(K*N)).
 *
 * @param str - The string to convert to a regex pattern.
 * @returns The regex pattern as a string that matches the original string and its accented variations.
 */
export function regexSearchMapper(str: string) {
    str = str.normalize('NFD');
    return str.replace(searchRegex, match => replacementMap.get(match) || match);
}

/**
 * Remove accents from a string.
 * This function normalizes the string using NFD normalization and removes all diacritical marks.
 *
 * @param str - The string to remove accents from.
 * @returns The string without any accents or diacritical marks.
 */
export function removeAccent(str: string) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
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
        return Array.from(new Set(arr));
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
