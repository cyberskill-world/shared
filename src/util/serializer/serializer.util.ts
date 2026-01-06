import type {
    I_Serializer,
    I_SerializerTypeWrapper,
    I_SerializerValueMap,
    T_SerializerKnownTypes,
} from './serializer.type.js';

/**
 * Interface for handling serialization and deserialization of specific types.
 * Each handler provides methods to check if a value is of the specific type,
 * serialize it to a format that can be JSON stringified, and deserialize it back.
 */
interface I_Handler<T extends T_SerializerKnownTypes> {
    /** Checks if a value is of the specific type */
    is: (value: unknown) => value is I_SerializerValueMap[T];
    /** Serializes a value of the specific type to a format that can be JSON stringified */
    serialize: (value: I_SerializerValueMap[T]) => I_SerializerTypeWrapper<T>;
    /** Deserializes a value back to the specific type */
    deserialize: (value: unknown) => I_SerializerValueMap[T];
}

/**
 * Type handlers for different JavaScript types that cannot be directly serialized to JSON.
 * Each handler provides methods to serialize and deserialize specific types like Date, Map, Set, etc.
 */
const typeHandlers: {
    [K in T_SerializerKnownTypes]: I_Handler<K>;
} = {
    Date: {
        is: (v): v is Date => v instanceof Date,
        serialize: v => ({ __type: 'Date', value: v.toISOString() }),
        deserialize: v => new Date(v as string),
    },
    Map: {
        is: (v): v is Map<unknown, unknown> => v instanceof Map,
        serialize: v => ({ __type: 'Map', value: Array.from(v.entries()) }),
        deserialize: v => new Map(v as [unknown, unknown][]),
    },
    Set: {
        is: (v): v is Set<unknown> => v instanceof Set,
        serialize: v => ({ __type: 'Set', value: Array.from(v) }),
        deserialize: v => new Set(v as unknown[]),
    },
    RegExp: {
        is: (v): v is RegExp => v instanceof RegExp,
        serialize: v => ({
            __type: 'RegExp',
            value: { source: v.source, flags: v.flags },
        }),
        deserialize: (v) => {
            const { source, flags } = v as { source: string; flags: string };
            return new RegExp(source, flags);
        },
    },
    BigInt: {
        is: (v): v is bigint => typeof v === 'bigint',
        serialize: v => ({ __type: 'BigInt', value: v.toString() }),
        deserialize: v => BigInt(v as string),
    },
};

/**
 * A serializer that can handle complex JavaScript types that cannot be directly JSON stringified.
 * This serializer extends JSON.stringify and JSON.parse to handle types like Date, Map, Set, RegExp, and BigInt.
 *
 * The serializer works by:
 * 1. During serialization: Wrapping special types with type information before JSON stringification
 * 2. During deserialization: Detecting wrapped types and reconstructing them to their original form
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
        return JSON.stringify(value, function (_key, val) {
            // eslint-disable-next-line ts/no-this-alias
            const context = this;
            const originalValue = context[_key];

            if (originalValue instanceof Date) {
                return typeHandlers.Date.serialize(originalValue);
            }

            for (const type of Object.keys(typeHandlers) as T_SerializerKnownTypes[]) {
                const handler = typeHandlers[type];

                if (handler.is(val)) {
                    return (handler as I_Handler<typeof type>).serialize(val);
                }
            }

            return val;
        });
    },
    /**
     * Deserializes a JSON string to its original value.
     * If the value is of a known type (Date, Map, Set, RegExp, BigInt),
     * it will be deserialized using the corresponding handler.
     * Otherwise, it will be deserialized as is.
     *
     * @param json - The JSON string to deserialize back to its original form.
     * @returns The deserialized value with all special types reconstructed.
     */
    deserialize(json) {
        return JSON.parse(json, (_key, val) => {
            if (
                val
                && typeof val === 'object'
                && '__type' in val
                && typeof val.__type === 'string'
            ) {
                const type = val.__type as T_SerializerKnownTypes;
                const handler = typeHandlers[type];

                if (handler) {
                    return handler.deserialize(val.value);
                }
            }
            return val;
        });
    },
};
