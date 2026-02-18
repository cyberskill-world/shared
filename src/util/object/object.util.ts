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
    // Optimization: Loop is faster than reduce and allows early exit
    let current: unknown = obj;
    const len = path.length;

    for (let i = 0; i < len; i++) {
        const key = path[i];
        if (key !== undefined && current && typeof current === 'object' && key in (current as Record<string | number, unknown>)) {
            current = (current as Record<string | number, unknown>)[key];
        }
        else {
            return undefined;
        }
    }

    return current;
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
 * Deep clones an object or array.
 * This function creates a deep copy of the input, recursively cloning objects and arrays.
 * Primitive values, dates, and other non-plain objects are returned as is (or cloned if supported).
 * Note: This implementation focuses on plain objects and arrays. For complex types like Map/Set/Buffer/ObjectId,
 * it returns the reference or handles them according to specific logic.
 *
 * @param obj - The object to clone.
 * @returns A deep copy of the object.
 */
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)) as unknown as T;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime()) as unknown as T;
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags) as unknown as T;
    }

    // Handle Mongoose ObjectId and other custom classes by returning reference
    // structuredClone would fail here. We assume if it's not a plain object, we keep the reference
    // unless we want to implement specific cloning logic for every type.
    // However, we want to clone POJOs (Plain Old JavaScript Objects).
    const proto = Object.getPrototypeOf(obj);
    if (proto !== Object.prototype && proto !== null) {
        return obj;
    }

    const result = {} as Record<string, unknown>;
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepClone((obj as Record<string, unknown>)[key]);
        }
    }

    return result as T;
}

/**
 * Deep merges multiple objects into a single object.
 * @param args - The objects to merge. Can be empty, in which case returns an empty object.
 * @returns The merged object.
 */
export function deepMerge<T = Record<string, unknown>>(
    ...args: (object | null | undefined)[]
): T;

/**
 * Deep merges multiple arrays into a single array.
 * @param args - The arrays to merge. Can be empty, in which case returns an empty array.
 * @returns The merged array.
 */
export function deepMerge<T = unknown[]>(
    ...args: (unknown[] | null | undefined)[]
): T;

/**
 * Implementation of deepMerge function.
 * @param args - The objects or arrays to merge.
 * @returns The merged result.
 */
export function deepMerge<T = Record<string, unknown> | unknown[]>(
    ...args: (object | unknown[] | null | undefined)[]
): T {
    // Handle empty arguments
    if (args.length === 0) {
        return {} as T;
    }

    // Filter out null/undefined and convert to empty objects/arrays
    const validArgs = args.filter((arg): arg is object => arg !== null && arg !== undefined);

    // If no valid arguments after filtering, return empty object/array
    if (validArgs.length === 0) {
        return {} as T;
    }

    // If only one argument, return it directly
    if (validArgs.length === 1) {
        return validArgs[0] as T;
    }

    // Check if all arguments are arrays
    if (validArgs.every(Array.isArray)) {
        return ([] as unknown[]).concat(...validArgs) as T;
    }

    // Check if all arguments are objects (but not arrays)
    if (validArgs.every(arg => typeof arg === 'object' && arg !== null && !Array.isArray(arg))) {
        const result = {} as Record<string, unknown>;

        for (const arg of validArgs) {
            const obj = arg as Record<string, unknown>;
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    const value = obj[key];
                    if (Object.prototype.hasOwnProperty.call(result, key)) {
                        const existingValue = result[key];
                        if (
                            typeof value === 'object' && value !== null
                            && typeof existingValue === 'object' && existingValue !== null
                        ) {
                            if (Array.isArray(value) && Array.isArray(existingValue)) {
                                result[key] = existingValue.concat(value);
                            }
                            else if (!Array.isArray(value) && !Array.isArray(existingValue)) {
                                result[key] = deepMerge(
                                    existingValue as Record<string, unknown>,
                                    value as Record<string, unknown>,
                                );
                            }
                            else {
                                // One is array, other is object (shouldn't happen with strict types but possible)
                                // Overwrite
                                result[key] = value;
                            }
                        }
                        else {
                            result[key] = value;
                        }
                    }
                    else {
                        result[key] = value;
                    }
                }
            }
        }
        return result as T;
    }

    // Check if all arguments are primitive values
    if (validArgs.every(arg => typeof arg !== 'object' || arg === null)) {
        throw new Error(
            'deepMerge: Cannot merge primitive values. All arguments must be objects or arrays.',
        );
    }

    // Mixed types error
    const hasArrays = validArgs.some(Array.isArray);
    const hasObjects = validArgs.some(arg =>
        typeof arg === 'object' && arg !== null && !Array.isArray(arg),
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

    /**
     *
     */
    function flatten(current: Record<string, unknown>, prefix: string) {
        for (const key in current) {
            if (!Object.prototype.hasOwnProperty.call(current, key))
                continue;

            const value = current[key];
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (value && typeof value === 'object' && !Array.isArray(value)) {
                // Check for Mongo operator
                let hasMongoOperator = false;
                for (const subKey in value as Record<string, unknown>) {
                    if (Object.prototype.hasOwnProperty.call(value, subKey) && subKey.startsWith('$')) {
                        hasMongoOperator = true;
                        break;
                    }
                }

                if (hasMongoOperator) {
                    normalized[newKey] = value;
                }
                else {
                    flatten(value as Record<string, unknown>, newKey);
                }
            }
            else {
                normalized[newKey] = value;
            }
        }
    }

    flatten(filter, '');

    return normalized as T;
}
