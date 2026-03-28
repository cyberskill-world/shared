import { describe, expect, it } from 'vitest';

import { E_Environment } from '#typescript/index.js';

import { escapeRegExp, isObject, isPlainObject, mapEnvironment, regexSearchMapper, removeAccent, uniqueArray } from './common.util.js';

const RE_TEST = /regex/;

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

    it('should escape regex special characters', () => {
        const input = 'a+b.c(d)';
        const result = regexSearchMapper(input);

        // + and . and ( and ) should be escaped
        expect(result).toContain('\\+');
        expect(result).toContain('\\.');
        expect(result).toContain('\\(');
        expect(result).toContain('\\)');
    });

    it('should match NFC target when input is NFC accented', () => {
        const input = 'café';
        const regexStr = regexSearchMapper(input);
        const regex = new RegExp(regexStr);
        expect(regex.test('café')).toBe(true);
    });
});

describe('escapeRegExp', () => {
    it('should escape all regex special characters', () => {
        const specialChars = '.*+?^${}()|[]\\';
        const escaped = escapeRegExp(specialChars);
        expect(escaped).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
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
        const result = uniqueArray(input, (item: { id: number }) => item.id);
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

    it('should default to development when no env vars provided', () => {
        expect(mapEnvironment({})).toEqual({ IS_DEV: true, IS_STAG: false, IS_PROD: false });
    });
});

describe('isObject', () => {
    it('should return true for plain objects', () => {
        expect(isObject({})).toBe(true);
    });

    it('should return true for arrays', () => {
        expect(isObject([])).toBe(true);
    });

    it('should return true for Date instances', () => {
        expect(isObject(new Date())).toBe(true);
    });

    it('should return true for Map instances', () => {
        expect(isObject(new Map())).toBe(true);
    });

    it('should return false for null', () => {
        expect(isObject(null)).toBe(false);
    });

    it('should return false for undefined', () => {
        expect(isObject(undefined)).toBe(false);
    });

    it('should return false for primitives', () => {
        expect(isObject(42)).toBe(false);
        expect(isObject('string')).toBe(false);
        expect(isObject(true)).toBe(false);
    });
});

describe('isPlainObject', () => {
    it('should return true for literal objects', () => {
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('should return true for Object.create(null)', () => {
        expect(isPlainObject(Object.create(null))).toBe(true);
    });

    it('should return false for arrays', () => {
        expect(isPlainObject([])).toBe(false);
    });

    it('should return false for class instances', () => {
        expect(isPlainObject(new Date())).toBe(false);
        expect(isPlainObject(new Map())).toBe(false);
        expect(isPlainObject(new Set())).toBe(false);
        expect(isPlainObject(RE_TEST)).toBe(false);
    });

    it('should return false for null', () => {
        expect(isPlainObject(null)).toBe(false);
    });

    it('should return false for undefined', () => {
        expect(isPlainObject(undefined)).toBe(false);
    });

    it('should return false for primitives', () => {
        expect(isPlainObject(42)).toBe(false);
        expect(isPlainObject('string')).toBe(false);
    });
});
