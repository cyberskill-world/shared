/**
 * A collection of validation utility functions for common data validation tasks.
 * This object provides methods to validate various data types and formats.
 */
export const validate = {
    /**
     * Checks if a value is empty.
     * This function provides comprehensive empty checking for different data types:
     * - For strings, it checks if the string is empty or contains only whitespace.
     * - For arrays, it checks if the array has no elements.
     * - For objects, it checks if the object has no own properties.
     * - For Maps and Sets, it checks if they are empty.
     * - For WeakMaps and WeakSets, it returns true (as they are not enumerable).
     * - For ArrayBuffer views, it checks if the byte length is 0.
     * - For Dates, it returns false.
     * - For null and undefined, it returns true.
     * - For all other types, it returns false.
     *
     * @param value - The value to check for emptiness.
     * @returns True if the value is empty, false otherwise.
     */
    isEmpty(value: unknown): boolean {
        if (value === null || value === undefined) {
            return true;
        }

        if (typeof value === 'string') {
            return value.trim().length === 0;
        }

        if (Array.isArray(value)) {
            return value.length === 0;
        }

        if (typeof value === 'object') {
            if (value instanceof Date) {
                return false;
            }

            if (value instanceof Map || value instanceof Set) {
                return value.size === 0;
            }

            if (value instanceof WeakMap || value instanceof WeakSet) {
                return true;
            }

            if (ArrayBuffer.isView(value)) {
                return value.byteLength === 0;
            }

            return Object.keys(value).length === 0;
        }

        return false;
    },
    /**
     * Checks if a string is a valid IP address (IPv4 or IPv6).
     * This function validates IP addresses according to standard formats:
     * - IPv4: Four octets separated by dots, each between 0–255.
     * - IPv6: Eight groups of four hex digits, possibly compressed with `::`.
     *
     * @param ip - The IP address string to validate.
     * @returns True if the IP is valid IPv4 or IPv6, false otherwise.
     */
    isValidIP(ip: string): boolean {
        const ipv4Parts = ip.split('.');

        if (ipv4Parts.length === 4 && ipv4Parts.every(octet =>
            /^\d+$/.test(octet)
            && Number(octet) >= 0
            && Number(octet) <= 255,
        )) {
            return true;
        }

        const ipv6Regex = /^(?:(?:[a-f\d]{1,4}:){7}(?:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,2}|:)|(?:[a-f\d]{1,4}:){4}(?:(?::[a-f\d]{1,4})?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,3}|:)|(?:[a-f\d]{1,4}:){3}(?:(?::[a-f\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,4}|:)|(?:[a-f\d]{1,4}:){2}(?:(?::[a-f\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,5}|:)|[a-f\d]{1,4}:(?:(?::[a-f\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,6}|:)|:(?:(?::[a-f\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,7}|:))(?:%[0-9a-z]+)?$/i;

        return ipv6Regex.test(ip);
    },
};
