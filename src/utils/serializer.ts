import type { I_Serializer } from '../typescript/serializer.js';

export const serializer: I_Serializer<unknown> = {
    serialize: (value: unknown) => JSON.stringify(value, (_, v) => {
        if (v instanceof Date) {
            return { __type: 'Date', value: v.toISOString() };
        }

        return v;
    }),
    deserialize: (value: string) => JSON.parse(value, (_, v) => {
        if (v?.__type === 'Date') {
            return new Date(v.value);
        }

        return v;
    }),
};
