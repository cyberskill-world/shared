import type { T_Object } from '#typescript/common.js';

/**
 * Check if a string is a valid JSON string.
 * @param str - The string to check.
 * @returns True if the string is a valid JSON string, false otherwise.
 */
export function isJson(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * Checks if a value is a plain object.
 * A plain object is an object that is not an array, null, or a function.
 * @param val - The value to check.
 * @returns True if the value is a plain object, false otherwise.
 */
export function isPlainObject(val: unknown): val is T_Object {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
}

/**
 * Merges multiple objects deeply.
 * If a property is an array, it will be merged without duplicates.
 * If a property is an object, it will be merged recursively.
 * If a property is a primitive, it will be overwritten.
 * @param objects - The objects to merge.
 * @returns The merged object.
 */
export function deepMerge(...objects: T_Object[]): T_Object {
    const result: T_Object = {};

    for (const source of objects.flat()) {
        for (const [key, sourceValue] of Object.entries(source)) {
            const targetValue = result[key];

            if (Array.isArray(sourceValue)) {
                const base = Array.isArray(targetValue) ? targetValue : [];
                result[key] = [...new Set([...base, ...sourceValue])];
                continue;
            }

            if (isPlainObject(sourceValue)) {
                result[key] = deepMerge(
                    isPlainObject(targetValue) ? targetValue : {},
                    sourceValue,
                );
                continue;
            }

            result[key] = sourceValue;
        }
    }

    return result;
}
