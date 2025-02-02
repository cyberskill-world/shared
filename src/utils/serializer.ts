interface Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}

export const serializer: Serializer<any> = {
    serialize: value => JSON.stringify(value, (_, v) => {
        if (v instanceof Date) {
            return { __type: 'Date', value: v.toISOString() };
        }

        return v;
    }),
    deserialize: value => JSON.parse(value, (_, v) => {
        if (v?.__type === 'Date') {
            return new Date(v.value);
        }

        return v;
    }),
};
