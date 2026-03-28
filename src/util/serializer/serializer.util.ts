import type {
    I_Serializer,
} from './serializer.type.js';

const ALLOWED_TYPES = new Set(['Date', 'Map', 'Set', 'RegExp', 'BigInt']);

/**
 * A serializer that can handle complex JavaScript types that cannot be directly JSON stringified.
 * This serializer extends JSON.stringify and JSON.parse to handle types like Date, Map, Set, RegExp, and BigInt.
 *
 * The serializer works by:
 * 1. During serialization: Wrapping special types with type information before JSON stringification
 * 2. During deserialization: Detecting wrapped types and reconstructing them to their original form
 *
 * @remarks
 * **Wire format protocol:** Non-JSON-native types are serialized as wrapper objects with the shape
 * `{ __type: string, value: unknown }`. For example:
 * - Date → `{ __type: 'Date', value: '2024-01-01T00:00:00.000Z' }`
 * - Map → `{ __type: 'Map', value: [['key', 'val']] }`
 * - Set → `{ __type: 'Set', value: [1, 2, 3] }`
 * - RegExp → `{ __type: 'RegExp', value: { source: '...', flags: '...' } }`
 * - BigInt → `{ __type: 'BigInt', value: '12345' }`
 *
 * **Security:** Only types in the `ALLOWED_TYPES` allowlist are reconstructed during
 * deserialization. Unknown `__type` values are returned as-is to prevent prototype pollution.
 *
 * **Cross-service compatibility:** Any service that deserializes data produced by this serializer
 * must use the same `__type` protocol. Plain `JSON.parse` will return the wrapper objects as-is
 * without reconstructing the original types.
 */
export const serializer: I_Serializer<unknown> = {
    /**
     * Serializes a value to a JSON string.
     * If the value is of a known type (Date, Map, Set, RegExp, BigInt),
     * it will be serialized using the corresponding handler.
     * Otherwise, it will be serialized as is.
     *
     * @param value - The value to serialize to a JSON string.
     * @returns The serialized JSON string that can be safely stored or transmitted.
     */
    serialize(value) {
        return JSON.stringify(value, function (this: any, _key, val) {
            // Date#toJSON fires before the replacer, converting a Date to an ISO string.
            // We must read this[_key] to detect the original Date object.
            const originalValue = this[_key];
            if (originalValue instanceof Date) {
                return { __type: 'Date', value: originalValue.toISOString() };
            }

            // For all other special types, val is already the original value
            // (they have no toJSON), so use val directly to avoid the extra property access.
            if (val !== null && typeof val === 'object') {
                if (val instanceof Map) {
                    return { __type: 'Map', value: Array.from(val.entries()) };
                }
                if (val instanceof Set) {
                    return { __type: 'Set', value: Array.from(val) };
                }
                if (val instanceof RegExp) {
                    return { __type: 'RegExp', value: { source: val.source, flags: val.flags } };
                }
            }
            else if (typeof val === 'bigint') {
                return { __type: 'BigInt', value: val.toString() };
            }

            return val;
        });
    },
    /**
     * Deserializes a JSON string to its original value.
     * If the value is of a known type (Date, Map, Set, RegExp, BigInt),
     * it will be deserialized using the corresponding handler.
     * Otherwise, it will be deserialized as is.
     * Unknown `__type` values are ignored (returned as-is) for security.
     *
     * @param json - The JSON string to deserialize back to its original form.
     * @returns The deserialized value with all special types reconstructed.
     */
    deserialize(json) {
        return JSON.parse(json, (_key, val) => {
            if (val !== null && typeof val === 'object' && typeof val.__type === 'string') {
                const type = val.__type;

                // Security: Only reconstruct types in the allowlist
                if (!ALLOWED_TYPES.has(type)) {
                    return val;
                }

                const value = val.value;

                if (type === 'Date') {
                    return new Date(value as string);
                }
                if (type === 'Map') {
                    return new Map(value as [unknown, unknown][]);
                }
                if (type === 'Set') {
                    return new Set(value as unknown[]);
                }
                if (type === 'RegExp') {
                    const { source, flags } = value as { source: string; flags: string };
                    return new RegExp(source, flags);
                }
                if (type === 'BigInt') {
                    return BigInt(value as string);
                }
            }
            return val;
        });
    },
};
