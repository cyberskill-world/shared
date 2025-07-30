import { isArray, mergeWith } from 'lodash-es';

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
 * This function handles different types of merging with improved type safety and error handling:
 * - If all arguments are arrays, it concatenates them
 * - If all arguments are objects, it deeply merges them (concatenating arrays within objects)
 * - Handles null/undefined values gracefully by treating them as empty objects
 * - Provides better type inference and safety
 * - Throws descriptive errors for invalid input
 *
 * @param args - The objects or arrays to merge. Can be empty, in which case returns an empty object.
 * @returns The merged result - either a concatenated array or a deeply merged object.
 * @throws {Error} When arguments are mixed types (some arrays, some objects) or when all arguments are primitive values.
 *
 * @example
 * ```typescript
 * // Merge objects
 * deepMerge({ a: 1 }, { b: 2 }, { a: 3 }) // { a: 3, b: 2 }
 *
 * // Merge arrays
 * deepMerge([1, 2], [3, 4]) // [1, 2, 3, 4]
 *
 * // Handle null/undefined
 * deepMerge({ a: 1 }, null, undefined, { b: 2 }) // { a: 1, b: 2 }
 *
 * // Nested objects with arrays
 * deepMerge(
 *   { items: [1, 2], config: { theme: 'dark' } },
 *   { items: [3, 4], config: { size: 'large' } }
 * ) // { items: [1, 2, 3, 4], config: { theme: 'dark', size: 'large' } }
 * ```
 */

/**
 * Deep merges multiple objects into a single object.
 * @param args - The objects to merge. Can be empty, in which case returns an empty object.
 * @returns The merged object.
 */
export function deepMerge<T extends Record<string, unknown>>(
    ...args: (T | null | undefined)[]
): T;

/**
 * Deep merges multiple arrays into a single array.
 * @param args - The arrays to merge. Can be empty, in which case returns an empty array.
 * @returns The merged array.
 */
export function deepMerge<T extends unknown[]>(
    ...args: (T | null | undefined)[]
): T;

/**
 * Implementation of deepMerge function.
 * @param args - The objects or arrays to merge.
 * @returns The merged result.
 */
export function deepMerge<T extends Record<string, unknown> | unknown[]>(
    ...args: (T | null | undefined)[]
): T {
    // Handle empty arguments
    if (args.length === 0) {
        return {} as T;
    }

    // Filter out null/undefined and convert to empty objects
    const validArgs = args
        .filter((arg): arg is T => arg !== null && arg !== undefined)
        .map((arg) => {
            // Handle primitive values by converting to empty object
            if (typeof arg !== 'object') {
                return {} as T;
            }
            return arg;
        });

    // If no valid arguments after filtering, return empty object
    if (validArgs.length === 0) {
        return {} as T;
    }

    // If only one argument, return it directly (performance optimization)
    if (validArgs.length === 1) {
        return validArgs[0] as T;
    }

    // Check if all arguments are arrays
    if (validArgs.every(isArray)) {
        return ([] as unknown[]).concat(...validArgs) as T;
    }

    // Check if all arguments are objects (but not arrays)
    if (validArgs.every(arg =>
        typeof arg === 'object'
        && arg !== null
        && !isArray(arg),
    )) {
        return mergeWith({}, ...validArgs, (objValue: unknown, srcValue: unknown) => {
            // Handle array concatenation within objects
            if (isArray(objValue) && isArray(srcValue)) {
                return objValue.concat(srcValue);
            }
            // Return undefined to use lodash's default merge behavior for other cases
            return undefined;
        }) as T;
    }

    // Check if all arguments are primitive values
    if (validArgs.every(arg => typeof arg !== 'object' || arg === null)) {
        throw new Error(
            'deepMerge: Cannot merge primitive values. All arguments must be objects or arrays.',
        );
    }

    // Mixed types error
    const hasArrays = validArgs.some(isArray);
    const hasObjects = validArgs.some(arg =>
        typeof arg === 'object' && arg !== null && !isArray(arg),
    );

    if (hasArrays && hasObjects) {
        throw new Error(
            'deepMerge: Cannot mix arrays and objects. All arguments must be either arrays or objects.',
        );
    }

    // Fallback for unexpected cases
    throw new Error(
        'deepMerge: Invalid arguments provided. All arguments must be objects or arrays of the same type.',
    );
}

/**
 * Normalizes MongoDB filters to support both dot notation strings and nested objects.
 * This function converts nested object filters to dot notation format while preserving
 * MongoDB operators to ensure consistent behavior across different filter input formats.
 *
 * @param filter - The filter object to normalize.
 * @returns A normalized filter object with nested objects converted to dot notation,
 *          while preserving MongoDB operators as nested objects.
 *
 * @example
 * ```typescript
 * // Both of these will work the same way:
 * normalizeMongoFilter({ "location.countryId": "240" })
 * normalizeMongoFilter({ location: { countryId: "240" } })
 * // Both return: { "location.countryId": "240" }
 *
 * // MongoDB operators are preserved:
 * normalizeMongoFilter({ id: { $in: ["240", "59"] } })
 * // Returns: { id: { $in: ["240", "59"] } }
 * ```
 */
export function normalizeMongoFilter<T extends Record<string, unknown>>(filter: T): T {
    if (!filter || typeof filter !== 'object') {
        return filter;
    }

    const normalized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(filter)) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const hasMongoOperator = Object.keys(value as Record<string, unknown>).some(
                nestedKey => nestedKey.startsWith('$'),
            );

            if (hasMongoOperator) {
                normalized[key] = normalizeMongoFilter(value as Record<string, unknown>);
            }
            else {
                const nestedNormalized = normalizeMongoFilter(value as Record<string, unknown>);

                for (const [nestedKey, nestedValue] of Object.entries(nestedNormalized)) {
                    const dotKey = `${key}.${nestedKey}`;
                    normalized[dotKey] = nestedValue;
                }
            }
        }
        else {
            normalized[key] = value;
        }
    }

    return normalized as T;
}
