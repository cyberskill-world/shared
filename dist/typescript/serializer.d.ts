interface I_Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}

export type { I_Serializer };
