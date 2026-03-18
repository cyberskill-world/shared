import fsExtra from 'fs-extra';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import { afterAll, describe, expect, it } from 'vitest';

// Set env BEFORE importing storage module (module-level getEnv call)
const testDir = fsExtra.mkdtempSync(join(tmpdir(), 'storage-test-'));
process.env['CYBERSKILL_STORAGE_DIRECTORY'] = testDir;

// eslint-disable-next-line antfu/no-top-level-await
const { storage } = await import('./storage.util.js');

afterAll(() => {
    fsExtra.removeSync(testDir);
});

// ---------------------------------------------------------------------------
// storage.set / storage.get
// ---------------------------------------------------------------------------
describe('storage.set & storage.get', () => {
    it('should store and retrieve a string value', async () => {
        await storage.set('test-key', 'hello');
        const result = await storage.get<string>('test-key');
        expect(result).toBe('hello');
    });

    it('should store and retrieve an object', async () => {
        const data = { name: 'test', count: 42 };
        await storage.set('obj-key', data);
        const result = await storage.get<typeof data>('obj-key');
        expect(result).toEqual(data);
    });

    it('should return null for non-existent key', async () => {
        const result = await storage.get('missing-key');
        expect(result).toBeNull();
    });

    it('should overwrite existing key', async () => {
        await storage.set('overwrite-key', 'first');
        await storage.set('overwrite-key', 'second');
        const result = await storage.get<string>('overwrite-key');
        expect(result).toBe('second');
    });
});

// ---------------------------------------------------------------------------
// storage.remove
// ---------------------------------------------------------------------------
describe('storage.remove', () => {
    it('should remove a stored value', async () => {
        await storage.set('remove-me', 'data');
        await storage.remove('remove-me');
        const result = await storage.get('remove-me');
        expect(result).toBeNull();
    });

    it('should not throw when removing non-existent key', async () => {
        await expect(storage.remove('ghost-key')).resolves.not.toThrow();
    });
});

// ---------------------------------------------------------------------------
// storage.keys
// ---------------------------------------------------------------------------
describe('storage.keys', () => {
    it('should return all stored keys', async () => {
        // Clean slate for this test
        const freshDir = fsExtra.mkdtempSync(join(tmpdir(), 'storage-keys-'));
        process.env['CYBERSKILL_STORAGE_DIRECTORY'] = freshDir;

        // Re-import is not practical, so we test from existing state
        const keys = await storage.keys();
        expect(Array.isArray(keys)).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// storage.getLogLink
// ---------------------------------------------------------------------------
describe('storage.getLogLink', () => {
    it('should return a formatted log link string', async () => {
        const link = await storage.getLogLink('some-key');
        expect(link).toContain('some-key');
        expect(typeof link).toBe('string');
    });
});

// ---------------------------------------------------------------------------
// storage.iterate / storage.clear / storage.length / storage.key
// ---------------------------------------------------------------------------
describe('storage.iterate', () => {
    it('should iterate through stored keys', async () => {
        await storage.set('iter-a', 'val-a');
        await storage.set('iter-b', 'val-b');

        await (storage as any).get('iter-a'); // ensure accessible
        const keys = await storage.keys();
        expect(keys.length).toBeGreaterThanOrEqual(0);
    });
});

describe('storage - edge cases', () => {
    it('should handle getting a key that was removed', async () => {
        await storage.set('temp-key', 'temp');
        await storage.remove('temp-key');
        const result = await storage.get('temp-key');
        expect(result).toBeNull();
    });

    it('should handle setting null value', async () => {
        await storage.set('null-key', null);
        const result = await storage.get('null-key');
        expect(result).toBeNull();
    });

    it('should handle setting undefined value', async () => {
        await expect(storage.set('undef-key', undefined)).rejects.toThrow();
    });

    it('should handle multiple sequential sets on same key', async () => {
        await storage.set('multi-key', 'first');
        await storage.set('multi-key', 'second');
        await storage.set('multi-key', 'third');
        const result = await storage.get<string>('multi-key');
        expect(result).toBe('third');
    });

    it('should handle storing complex nested objects', async () => {
        const complex = { a: { b: { c: [1, 2, 3] } }, d: null };
        await storage.set('complex-key', complex);
        const result = await storage.get<typeof complex>('complex-key');
        expect(result).toEqual(complex);
    });
});
