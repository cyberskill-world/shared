import { describe, expect, it } from 'vitest';

import { generateRandomPassword, generateRandomString, generateShortId, generateSlug, getFileName, substringBetween } from './string.util.js';

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

    it('should keep already slugified string unchanged', () => {
        const input = 'hello-world-123';
        const result = generateSlug(input);
        expect(result).toBe('hello-world-123');
    });
});

describe('generateRandomPassword', () => {
    it('should generate password of specified length', () => {
        expect(generateRandomPassword(10)).toHaveLength(10);
    });
});

describe('generateRandomString', () => {
    it('should generate string of specified length', () => {
        expect(generateRandomString(10)).toHaveLength(10);
    });

    it('should use custom charset if provided', () => {
        const charset = 'abc';
        const result = generateRandomString(100, charset);
        expect(result).toMatch(/^[abc]+$/);
    });

    it('should return empty string if length is 0', () => {
        expect(generateRandomString(0)).toBe('');
    });

    it('should throw RangeError for negative length', () => {
        expect(() => generateRandomString(-1)).toThrow(RangeError);
    });

    it('should throw RangeError for non-integer length', () => {
        expect(() => generateRandomString(3.5)).toThrow(RangeError);
    });

    it('should throw RangeError for unsafe integer length', () => {
        expect(() => generateRandomString(Number.MAX_SAFE_INTEGER + 1)).toThrow(RangeError);
    });

    it('should throw RangeError for Infinity length', () => {
        expect(() => generateRandomString(Infinity)).toThrow(RangeError);
    });

    it('should throw RangeError for empty charset', () => {
        expect(() => generateRandomString(5, '')).toThrow(RangeError);
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
