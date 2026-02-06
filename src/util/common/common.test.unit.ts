import { describe, expect, it } from 'vitest';

import { E_Environment } from '#typescript/index.js';

import { escapeRegExp, mapEnvironment, regexSearchMapper, removeAccent, uniqueArray } from './common.util.js';

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
        const input = 'a.b(c)';
        const result = regexSearchMapper(input);

        // . should be escaped to \.
        // ( should be escaped to \(
        // ) should be escaped to \)

        expect(result).toContain('\\.');
        expect(result).toContain('\\(');
        expect(result).toContain('\\)');

        // Construct a regex from it and test
        const re = new RegExp(result);
        expect(re.test('a.b(c)')).toBe(true); // Should match literal string
        expect(re.test('axbzc')).toBe(false); // Should NOT match wildcard
    });
});

describe('escapeRegExp', () => {
    it('should escape all special regex characters', () => {
        const input = '.*+?^${}()|[]\\';
        const expected = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';
        expect(escapeRegExp(input)).toBe(expected);
    });

    it('should not change safe strings', () => {
        const input = 'abc123';
        expect(escapeRegExp(input)).toBe(input);
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
});
