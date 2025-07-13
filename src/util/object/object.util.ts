/**
 * Check if a string is a valid JSON string.
 * @param str - The string to check.
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
