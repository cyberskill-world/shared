interface Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}
declare const serializer: Serializer<any>;

export { serializer };
