import { describe, expect, it } from 'vitest';

import { regexSearchMapper } from './common/common.util';
import { deepMerge, isJSON, normalizeMongoFilter } from './object/object.util';
import { generateShortId, generateSlug } from './string/string.util';

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
