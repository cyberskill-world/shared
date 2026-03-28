import { describe, expect, it } from 'vitest';

import { serializer } from './serializer.util.js';

const RE_ABC_I = /abc/i;

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
        const regex = RE_ABC_I;
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

    it('should serialize and deserialize a nested structure with mixed special types', () => {
        const date = new Date('2023-06-15T12:00:00.000Z');
        const nested = {
            name: 'test',
            timestamp: date,
            lookup: new Map<string, number>([['x', 10], ['y', 20]]),
            tags: new Set(['a', 'b']),
            pattern: /hello/gi,
            bigNum: BigInt(9007199254740993),
            items: [
                { key: new Map([['nested', true]]) },
                new Set([BigInt(1), BigInt(2)]),
            ],
        };
        const json = serializer.serialize(nested);
        const result = serializer.deserialize(json) as typeof nested;
        expect(result.name).toBe('test');
        expect(result.timestamp).toBeInstanceOf(Date);
        expect((result.timestamp as unknown as Date).toISOString()).toBe(date.toISOString());
        expect(result.lookup).toBeInstanceOf(Map);
        expect((result.lookup as unknown as Map<string, number>).get('x')).toBe(10);
        expect(result.tags).toBeInstanceOf(Set);
        expect((result.tags as unknown as Set<string>).has('b')).toBe(true);
        expect(result.pattern).toBeInstanceOf(RegExp);
        expect((result.pattern as unknown as RegExp).source).toBe('hello');
        expect((result.pattern as unknown as RegExp).flags).toBe('gi');
        expect(typeof result.bigNum).toBe('bigint');
        expect(result.bigNum).toBe(BigInt(9007199254740993));
        const firstItem = (result.items as unknown[])[0] as { key: Map<string, boolean> };
        expect(firstItem.key).toBeInstanceOf(Map);
        expect(firstItem.key.get('nested')).toBe(true);
        const secondItem = (result.items as unknown[])[1] as Set<bigint>;
        expect(secondItem).toBeInstanceOf(Set);
        expect(secondItem.has(BigInt(1))).toBe(true);
    });
});
