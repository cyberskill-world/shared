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
 * Checks if a value is an object.
 * An object is an object that is not an array, null, or a function.
 * @param val - The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObject(val: unknown): val is T_Object {
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

            if (isObject(sourceValue)) {
                result[key] = deepMerge(
                    isObject(targetValue) ? targetValue : {},
                    sourceValue,
                );
                continue;
            }

            result[key] = sourceValue;
        }
    }

    return result;
}

/**
 * This function uses JSON.stringify and JSON.parse to create a deep clone.
 * This method is not suitable for objects with circular references or functions.
 * @param obj - The object to clone.
 * @returns A deep clone of the object.
 */
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Gets a nested value from an object.
 * @param obj - The object to get the value from.
 * @param path - The path to the value.
 * @returns The value at the specified path, or undefined if it does not exist.
 */
export function getNestedValue<T>(obj: T, path: (string | number)[]): unknown {
    return path.reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            return (acc as Record<string | number, unknown>)[key];
        }
        return undefined;
    }, obj);
}

/**
 * Sets a nested value in an object.
 * If the path does not exist, it will be created.
 * @param obj - The object to set the value in.
 * @param path - The path to the value.
 * @param value - The value to set.
 * @returns The updated object.
 */
export function setNestedValue<T>(
    obj: T,
    path: (string | number)[],
    value: unknown,
): T {
    if (path.length === 0)
        return obj;

    const [head, ...rest] = path;

    if (rest.length === 0) {
        return {
            ...(obj as Record<string | number, unknown>),
            [head as string | number]: value,
        } as T;
    }

    const current = (obj as Record<string | number, unknown>)[head as string | number];

    return {
        ...(obj as Record<string | number, unknown>),
        [head as string | number | symbol]: setNestedValue(
            typeof current === 'object' && current !== null
                ? (current as object)
                : {},
            rest,
            value,
        ),
    } as T;
}
