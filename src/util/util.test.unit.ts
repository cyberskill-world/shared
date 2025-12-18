import { describe, expect, it } from 'vitest';

import { E_Environment } from '#typescript/index.js';

import { mapEnvironment, regexSearchMapper, removeAccent, uniqueArray } from './common/common.util';
import { deepClone, deepMerge, getNestedValue, isJSON, normalizeMongoFilter, setNestedValue } from './object/object.util';
import { serializer } from './serializer/serializer.util';
import { generateRandomPassword, generateShortId, generateSlug, getFileName, substringBetween } from './string/string.util';
import { validate } from './validate/validate.util';

describe('deepMerge', () => {
    it('should merge two objects', () => {
        const obj1 = { a: 1, b: { c: 2 } };
        const obj2 = { b: { d: 3 }, e: 4 };
        const result = deepMerge(obj1, obj2);
        expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it('should merge arrays by concatenation', () => {
        const arr1 = [1, 2];
        const arr2 = [3, 4];
        const result = deepMerge(arr1, arr2);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should merge nested arrays within objects', () => {
        const obj1 = { a: [1, 2] };
        const obj2 = { a: [3, 4] };
        const result = deepMerge(obj1, obj2);
        expect(result).toEqual({ a: [1, 2, 3, 4] });
    });

    it('should handle null/undefined arguments', () => {
        const obj1 = { a: 1 };
        const result = deepMerge(obj1, null, undefined, { b: 2 });
        expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should overwrite non-mergeable types', () => {
        const obj1 = { a: 1 };
        const obj2 = { a: 'string' };
        const result = deepMerge(obj1, obj2);
        expect(result).toEqual({ a: 'string' });
    });
});

describe('deepClone', () => {
    it('should deep clone objects', () => {
        const obj = { a: 1, b: { c: 2 } };
        const clone = deepClone(obj);
        expect(clone).toEqual(obj);
        expect(clone).not.toBe(obj);
        expect(clone.b).not.toBe(obj.b);
    });

    it('should deep clone arrays', () => {
        const arr = [1, { a: 2 }];
        const clone = deepClone(arr);
        expect(clone).toEqual(arr);
        expect(clone).not.toBe(arr);
        expect(clone[1]).not.toBe(arr[1]);
    });

    it('should clone Date and RegExp', () => {
        const obj = { d: new Date(), r: /abc/i };
        const clone = deepClone(obj);
        expect(clone.d).toBeInstanceOf(Date);
        expect(clone.d).not.toBe(obj.d);
        expect(clone.d.getTime()).toBe(obj.d.getTime());
        expect(clone.r).toBeInstanceOf(RegExp);
        expect(clone.r).not.toBe(obj.r);
        expect(clone.r.source).toBe(obj.r.source);
        expect(clone.r.flags).toBe(obj.r.flags);
    });

    it('should return reference for class instances (like ObjectId)', () => {
        class MockObjectId {
            id: string;
            constructor(id: string) { this.id = id; }
        }
        const id = new MockObjectId('123');
        const obj = { id };
        const clone = deepClone(obj);
        expect(clone.id).toBe(id); // Same reference
        expect(clone.id).toBeInstanceOf(MockObjectId);
    });
});

describe('generateShortId', () => {
    it('should generate a short ID of specified length', () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000';
        const id = generateShortId(uuid, 6);
        expect(id).toHaveLength(6);
    });

    it('should be deterministic for the same input', () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000';
        const id1 = generateShortId(uuid);
        const id2 = generateShortId(uuid);
        expect(id1).toBe(id2);
    });

    it('should fallback to uuid slice if length is large', () => {
        const uuid = '123e4567-e89b-12d3-a456-426614174000';
        const id = generateShortId(uuid, 10);
        // Stripped dashes: 123e4567e89b12d3a456426614174000
        // First 10 chars: 123e4567e8
        expect(id).toBe('123e4567e8');
    });
});

describe('generateSlug', () => {
    it('should slugify a string', () => {
        const input = 'Hello World!';
        const result = generateSlug(input);
        expect(result).toBe('hello-world');
    });

    it('should handle accents', () => {
        const input = 'Héllò Wórld';
        const result = generateSlug(input);
        expect(result).toBe('hello-world');
    });

    it('should handle special characters', () => {
        const input = 'Foo & Bar @ Baz';
        const result = generateSlug(input);
        expect(result).toBe('foo-bar-baz');
    });

    it('should slugify an object values', () => {
        const input = { title: 'Hello World', desc: 'Foo Bar' };
        const result = generateSlug(input);
        expect(result).toEqual({ title: 'hello-world', desc: 'foo-bar' });
    });
});

describe('isJSON', () => {
    it('should return true for valid JSON object', () => {
        expect(isJSON('{"a": 1}')).toBe(true);
    });

    it('should return true for valid JSON array', () => {
        expect(isJSON('[1, 2, 3]')).toBe(true);
    });

    it('should return true for valid JSON string', () => {
        expect(isJSON('"string"')).toBe(true);
    });

    it('should return false for invalid JSON', () => {
        expect(isJSON('{a: 1}')).toBe(false); // unquoted key
        expect(isJSON('invalid')).toBe(false);
    });
});

describe('regexSearchMapper', () => {
    it('should create regex pattern for accented characters', () => {
        const input = 'a';
        // Expecting something like [aàáạảãâầấậẩẫăằắặẳẵAÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]...
        const result = regexSearchMapper(input);
        expect(result).toContain('a');
        expect(result).toContain('à');
    });

    it('should normalize input before mapping', () => {
        const input = 'e\u0301'; // é decomposed
        const result = regexSearchMapper(input);
        // Should treat as 'é' and map it
        expect(result).toContain('é');
    });
});

describe('normalizeMongoFilter', () => {
    it('should flatten nested objects to dot notation', () => {
        const filter = { a: { b: 1 } };
        const result = normalizeMongoFilter(filter);
        expect(result).toEqual({ 'a.b': 1 });
    });

    it('should preserve MongoDB operators', () => {
        const filter = { a: { $in: [1, 2] } };
        const result = normalizeMongoFilter(filter);
        expect(result).toEqual({ a: { $in: [1, 2] } });
    });

    it('should handle mixed nested and operators', () => {
        const filter = { a: { b: 1 }, c: { $gt: 5 } };
        const result = normalizeMongoFilter(filter);
        expect(result).toEqual({ 'a.b': 1, c: { $gt: 5 } });
    });
});

describe('removeAccent', () => {
    it('should remove accents from a string', () => {
        expect(removeAccent('Héllò Wórld')).toBe('Hello World');
        expect(removeAccent('Xin chào')).toBe('Xin chao');
    });
});

describe('uniqueArray', () => {
    it('should return unique elements from array', () => {
        expect(uniqueArray([1, 2, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should support key function', () => {
        const input = [{ id: 1 }, { id: 2 }, { id: 1 }];
        const result = uniqueArray(input, item => item.id);
        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });
});

describe('mapEnvironment', () => {
    it('should map development environment', () => {
        const env = { NODE_ENV: E_Environment.DEVELOPMENT, NODE_ENV_MODE: E_Environment.DEVELOPMENT };
        expect(mapEnvironment(env)).toEqual({ IS_DEV: true, IS_STAG: false, IS_PROD: false });
    });

    it('should map production environment', () => {
        const env = { NODE_ENV: E_Environment.PRODUCTION, NODE_ENV_MODE: E_Environment.PRODUCTION };
        expect(mapEnvironment(env)).toEqual({ IS_DEV: false, IS_STAG: false, IS_PROD: true });
    });

    it('should map staging environment', () => {
        const env = { NODE_ENV: E_Environment.PRODUCTION, NODE_ENV_MODE: E_Environment.STAGING };
        expect(mapEnvironment(env)).toEqual({ IS_DEV: false, IS_STAG: true, IS_PROD: false });
    });

    it('should throw error for invalid production config', () => {
        const env = { NODE_ENV: E_Environment.PRODUCTION, NODE_ENV_MODE: E_Environment.DEVELOPMENT };
        expect(() => mapEnvironment(env)).toThrow();
    });
});

describe('getNestedValue', () => {
    const obj = { a: { b: { c: 1 } } };

    it('should get nested value', () => {
        expect(getNestedValue(obj, ['a', 'b', 'c'])).toBe(1);
    });

    it('should return undefined for non-existent path', () => {
        expect(getNestedValue(obj, ['a', 'x'])).toBeUndefined();
    });
});

describe('setNestedValue', () => {
    it('should set nested value', () => {
        const obj = {};
        const result = setNestedValue(obj, ['a', 'b'], 1);
        expect(result).toEqual({ a: { b: 1 } });
    });

    it('should be immutable', () => {
        const obj = { a: 1 };
        const result = setNestedValue(obj, ['b'], 2);
        expect(obj).toEqual({ a: 1 });
        expect(result).toEqual({ a: 1, b: 2 });
    });
});

describe('generateRandomPassword', () => {
    it('should generate password of specified length', () => {
        expect(generateRandomPassword(10)).toHaveLength(10);
    });
});

describe('getFileName', () => {
    it('should extract filename from URL', () => {
        expect(getFileName('http://example.com/path/to/file.png')).toBe('file');
    });

    it('should include extension if requested', () => {
        expect(getFileName('http://example.com/path/to/file.png', true)).toBe('file.png');
    });

    it('should handle query parameters', () => {
        expect(getFileName('http://example.com/file.png?v=1')).toBe('file');
    });
});

describe('substringBetween', () => {
    it('should extract string between markers', () => {
        expect(substringBetween('start [middle] end', '[', ']')).toBe('middle');
    });

    it('should return empty string if markers not found', () => {
        expect(substringBetween('start end', '[', ']')).toBe('');
    });
});

describe('validate', () => {
    describe('isEmpty', () => {
        it('should return true for null/undefined', () => {
            expect(validate.isEmpty(null)).toBe(true);
            expect(validate.isEmpty(undefined)).toBe(true);
        });

        it('should return true for empty string', () => {
            expect(validate.isEmpty('')).toBe(true);
            expect(validate.isEmpty('   ')).toBe(true);
        });

        it('should return true for empty array', () => {
            expect(validate.isEmpty([])).toBe(true);
        });

        it('should return true for empty object', () => {
            expect(validate.isEmpty({})).toBe(true);
        });

        it('should return false for non-empty values', () => {
            expect(validate.isEmpty('a')).toBe(false);
            expect(validate.isEmpty([1])).toBe(false);
            expect(validate.isEmpty({ a: 1 })).toBe(false);
            expect(validate.isEmpty(0)).toBe(false);
            expect(validate.isEmpty(false)).toBe(false);
        });
    });

    describe('isValidIP', () => {
        it('should validate IPv4', () => {
            expect(validate.isValidIP('192.168.1.1')).toBe(true);
            expect(validate.isValidIP('256.1.1.1')).toBe(false);
        });

        it('should validate IPv6', () => {
            expect(validate.isValidIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
            expect(validate.isValidIP('::1')).toBe(true);
        });

        it('should validate IPv4-mapped IPv6', () => {
            expect(validate.isValidIP('::ffff:192.168.0.1')).toBe(true);
        });
    });
});

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
