import { isArray, isPlainObject, mergeWith } from 'lodash-es';

/**
 * Check if a string is a valid JSON string.
 * This function attempts to parse the string as JSON and returns true if successful,
 * false if the string is not valid JSON.
 *
 * @param str - The string to check for valid JSON format.
 * @returns True if the string is a valid JSON string, false otherwise.
 */
export function isJSON(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * Gets a nested value from an object using a path array.
 * This function traverses the object following the provided path and returns
 * the value at the specified location, or undefined if the path doesn't exist.
 *
 * @param obj - The object to get the value from.
 * @param path - An array of keys representing the path to the desired value.
 * @returns The value at the specified path, or undefined if the path doesn't exist.
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
 * Sets a nested value in an object using a path array.
 * This function creates the path if it doesn't exist and sets the value at the specified location.
 * The function returns a new object with the updated value, maintaining immutability.
 *
 * @param obj - The object to set the value in.
 * @param path - An array of keys representing the path to the desired location.
 * @param value - The value to set at the specified path.
 * @returns A new object with the updated value at the specified path.
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

/**
 * Deep merges multiple objects or arrays into a single object or array.
 * This function handles different types of merging:
 * - If all arguments are arrays, it concatenates them
 * - If all arguments are objects, it deeply merges them (concatenating arrays within objects)
 * - Throws an error if mixed types are provided
 *
 * @param args - The objects or arrays to merge.
 * @returns The merged result - either a concatenated array or a deeply merged object.
 * @throws {Error} When arguments are mixed types (some arrays, some objects).
 */
export function deepMerge<T = unknown>(...args: T[]): T {
    if (args.every(isArray)) {
        // All arrays: concatenate
        return ([] as unknown[]).concat(...args) as T;
    }
    if (args.every(isPlainObject)) {
        // All objects: deep merge
        return mergeWith({}, ...args, (objValue: unknown, srcValue: unknown) => {
            if (isArray(objValue) && isArray(srcValue)) {
                return objValue.concat(srcValue);
            }
        }) as T;
    }
    throw new Error('deepMerge: All arguments must be either arrays or objects of the same type.');
}
