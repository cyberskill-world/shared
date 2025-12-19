import { describe, expect, it } from 'vitest';

import { join, resolve } from './path.util.js';

describe('path', () => {
    describe('resolve', () => {
        it('should resolve paths', () => {
            const result = resolve('a', 'b');
            // path.resolve behavior depends on OS, but basically it joins if absolute or current
            // If we assume standard unix-like behavior for test env:
            expect(result).toContain('a');
            expect(result).toContain('b');
        });
    });

    describe('join', () => {
        it('should join paths', () => {
            const result = join('a', 'b');
            expect(result).toMatch(/a[/\\]b/);
        });
    });
});

import { command } from './path.constant.js';

describe('command', () => {
    describe('mongoMigrateCreate', () => {
        it('should allow valid migration names', async () => {
            const result = await command.mongoMigrateCreate('valid_name-123');
            expect(result).toContain('valid_name-123');
        });

        it('should throw error for invalid migration names', async () => {
            expect(() => command.mongoMigrateCreate('invalid; name')).toThrow('Migration name must only contain alphanumeric characters, underscores, and hyphens.');
        });
    });
});
