import { describe, expect, it } from 'vitest';

import { deepClone, deepMerge, getNestedValue, isJSON, normalizeMongoFilter, setNestedValue } from './object.util';

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
