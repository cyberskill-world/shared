import { Buffer } from 'node:buffer';

import type {
    I_Serializer,
    I_SerializerTypeWrapper,
    T_SerializerKnownTypes,
    T_SerializerValueMap,
} from './serializer.type.js';

interface Handler<T extends T_SerializerKnownTypes> {
    is: (value: unknown) => value is T_SerializerValueMap[T];
    serialize: (value: T_SerializerValueMap[T]) => I_SerializerTypeWrapper<T>;
    deserialize: (value: unknown) => T_SerializerValueMap[T];
}

const typeHandlers: {
    [K in T_SerializerKnownTypes]: Handler<K>;
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
    Buffer: {
        is: (v): v is Buffer => Buffer.isBuffer(v),
        serialize: v => ({ __type: 'Buffer', value: v.toString('base64') }),
        deserialize: v => Buffer.from(v as string, 'base64'),
    },
};

export const serializer: I_Serializer<unknown> = {
    /**
     * Serializes a value to a JSON string.
     * If the value is of a known type (Date, Map, Set, RegExp, BigInt, Buffer),
     * it will be serialized using the corresponding handler.
     * Otherwise, it will be serialized as is.
     *
     * @param value - The value to serialize.
     * @returns The serialized JSON string.
     */
    serialize(value) {
        return JSON.stringify(value, (_key, val) => {
            for (const type of Object.keys(typeHandlers) as T_SerializerKnownTypes[]) {
                const handler = typeHandlers[type];

                if (handler.is(val)) {
                    return (handler as Handler<typeof type>).serialize(val);
                }
            }

            return val;
        });
    },
    /**
     * Deserializes a JSON string to its original value.
     * If the value is of a known type (Date, Map, Set, RegExp, BigInt, Buffer),
     * it will be deserialized using the corresponding handler.
     * Otherwise, it will be deserialized as is.
     *
     * @param json - The JSON string to deserialize.
     * @returns The deserialized value.
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
