import type { I_Serializer } from '../typescript/serializer.js';

export const serializer: I_Serializer<any> = {
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
