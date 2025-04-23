import type { Buffer } from 'node:buffer';

export type T_SerializerKnownTypes = 'Date' | 'Map' | 'Set' | 'RegExp' | 'BigInt' | 'Buffer';

export interface T_SerializerValueMap {
    Date: Date;
    Map: Map<unknown, unknown>;
    Set: Set<unknown>;
    RegExp: RegExp;
    BigInt: bigint;
    Buffer: Buffer;
}

export interface I_SerializerTypeWrapper<T extends T_SerializerKnownTypes = T_SerializerKnownTypes> {
    __type: T;
    value: unknown;
}

export interface I_Serializer<T = unknown> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}
