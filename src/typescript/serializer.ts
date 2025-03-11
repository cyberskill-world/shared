export interface I_Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}
