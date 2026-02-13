
import { describe, expect, it } from 'vitest';
import { E_Environment } from '../../typescript/index.js';
import { mapEnvironment, regexSearchMapper, removeAccent, uniqueArray } from './common.util.js';

describe('common.util', () => {
    describe('mapEnvironment', () => {
        it('should correctly map development environment', () => {
            const result = mapEnvironment({
                NODE_ENV: E_Environment.DEVELOPMENT,
                NODE_ENV_MODE: E_Environment.DEVELOPMENT,
            });
            expect(result).toEqual({ IS_DEV: true, IS_STAG: false, IS_PROD: false });
        });

        it('should correctly map staging environment', () => {
            const result = mapEnvironment({
                NODE_ENV: E_Environment.PRODUCTION,
                NODE_ENV_MODE: E_Environment.STAGING,
            });
            expect(result).toEqual({ IS_DEV: false, IS_STAG: true, IS_PROD: false });
        });

        it('should correctly map production environment', () => {
            const result = mapEnvironment({
                NODE_ENV: E_Environment.PRODUCTION,
                NODE_ENV_MODE: E_Environment.PRODUCTION,
            });
            expect(result).toEqual({ IS_DEV: false, IS_STAG: false, IS_PROD: true });
        });

        it('should throw error for invalid production config', () => {
            expect(() => mapEnvironment({
                NODE_ENV: E_Environment.PRODUCTION,
                NODE_ENV_MODE: E_Environment.DEVELOPMENT,
            })).toThrow();
        });

        it('should default to development if values are missing', () => {
            const result = mapEnvironment({});
            expect(result).toEqual({ IS_DEV: true, IS_STAG: false, IS_PROD: false });
        });
    });

    describe('regexSearchMapper', () => {
        it('should map standard characters correctly', () => {
            const input = 'hello';
            const output = regexSearchMapper(input);
            // Matches 'h' (unchanged), 'e' (accented), 'l' (unchanged), 'l' (unchanged), 'o' (accented)
            expect(output).toContain('h');
            expect(output).toContain('(e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)');
            expect(output).toContain('ll');
            expect(output).toContain('(o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)');
        });

        it('should map accented characters to the group', () => {
            const input = 'héllò';
            const output = regexSearchMapper(input);
            expect(output).toContain('(e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)');
            expect(output).toContain('(o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)');
        });

        it('should escape special regex characters', () => {
            const input = '.*+?^${}()|[]\\';
            const output = regexSearchMapper(input);
            // Should be escaped
            expect(output).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
        });

        it('should handle mixed content', () => {
            const input = 'foo.*bar';
            const output = regexSearchMapper(input);
            expect(output).toContain('f(o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)(o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)\\.\\*b(a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)r');
        });
    });

    describe('removeAccent', () => {
        it('should remove accents', () => {
            expect(removeAccent('héllò')).toBe('hello');
            expect(removeAccent('Việt Nam')).toBe('Viet Nam');
        });
    });

    describe('uniqueArray', () => {
        it('should return unique items', () => {
            expect(uniqueArray([1, 2, 2, 3])).toEqual([1, 2, 3]);
        });

        it('should use key function', () => {
            const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
            expect(uniqueArray(items, i => i.id)).toEqual([{ id: 1 }, { id: 2 }]);
        });
    });
});
