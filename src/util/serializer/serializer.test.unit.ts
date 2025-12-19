import { describe, expect, it } from 'vitest';

import { serializer } from './serializer.util.js';

describe('serializer', () => {
    it('should serialize and deserialize Map', () => {
        const map = new Map([['a', 1]]);
        const json = serializer.serialize(map);
        const result = serializer.deserialize(json);
        expect(result).toBeInstanceOf(Map);
        expect((result as Map<string, number>).get('a')).toBe(1);
    });

    it('should serialize and deserialize Set', () => {
        const set = new Set([1, 2]);
        const json = serializer.serialize(set);
        const result = serializer.deserialize(json);
        expect(result).toBeInstanceOf(Set);
        expect((result as Set<number>).has(1)).toBe(true);
    });

    it('should serialize and deserialize Date', () => {
        const date = new Date('2023-01-01');
        const json = serializer.serialize(date);
        const result = serializer.deserialize(json);
        expect(result).toBeInstanceOf(Date);
        expect((result as Date).toISOString()).toBe(date.toISOString());
    });

    it('should serialize and deserialize RegExp', () => {
        const regex = /abc/i;
        const json = serializer.serialize(regex);
        const result = serializer.deserialize(json);
        expect(result).toBeInstanceOf(RegExp);
        expect((result as RegExp).source).toBe('abc');
        expect((result as RegExp).flags).toBe('i');
    });

    it('should serialize and deserialize BigInt', () => {
        const bigint = BigInt(123);
        const json = serializer.serialize(bigint);
        const result = serializer.deserialize(json);
        expect(typeof result).toBe('bigint');
        expect(result).toBe(bigint);
    });
});
