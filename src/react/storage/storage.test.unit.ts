import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetItem = vi.fn();
const mockSetItem = vi.fn();
const mockRemoveItem = vi.fn();
const mockKeys = vi.fn();

vi.mock('localforage', () => ({
    default: {
        getItem: (...args: unknown[]) => mockGetItem(...args),
        setItem: (...args: unknown[]) => mockSetItem(...args),
        removeItem: (...args: unknown[]) => mockRemoveItem(...args),
        keys: (...args: unknown[]) => mockKeys(...args),
    },
}));

vi.mock('../log/index.js', () => ({
    catchError: vi.fn((_error: unknown, opts?: { returnValue?: unknown }) => opts?.returnValue !== undefined ? opts.returnValue : undefined),
}));

describe('storage', () => {
    let storage: typeof import('./storage.util.js')['storage'];

    beforeEach(async () => {
        vi.clearAllMocks();
        const mod = await import('./storage.util.js');
        storage = mod.storage;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('get', () => {
        it('should return stored value by key', async () => {
            mockGetItem.mockResolvedValue('hello');
            const result = await storage.get('key');
            expect(result).toBe('hello');
            expect(mockGetItem).toHaveBeenCalledWith('key');
        });

        it('should return null on error', async () => {
            mockGetItem.mockRejectedValue(new Error('fail'));
            const result = await storage.get('key');
            expect(result).toBeNull();
        });
    });

    describe('set', () => {
        it('should store value with key', async () => {
            mockSetItem.mockResolvedValue(undefined);
            await storage.set('key', { data: 42 });
            expect(mockSetItem).toHaveBeenCalledWith('key', { data: 42 });
        });

        it('should catch errors silently', async () => {
            mockSetItem.mockRejectedValue(new Error('fail'));
            await expect(storage.set('key', 'value')).resolves.toBeUndefined();
        });
    });

    describe('remove', () => {
        it('should remove value by key', async () => {
            mockRemoveItem.mockResolvedValue(undefined);
            await storage.remove('key');
            expect(mockRemoveItem).toHaveBeenCalledWith('key');
        });

        it('should catch errors silently', async () => {
            mockRemoveItem.mockRejectedValue(new Error('fail'));
            await expect(storage.remove('key')).resolves.toBeUndefined();
        });
    });

    describe('keys', () => {
        it('should return all storage keys', async () => {
            mockKeys.mockResolvedValue(['a', 'b', 'c']);
            const result = await storage.keys();
            expect(result).toEqual(['a', 'b', 'c']);
        });

        it('should return empty array on error', async () => {
            mockKeys.mockRejectedValue(new Error('fail'));
            const result = await storage.keys();
            expect(result).toEqual([]);
        });

        it('should return empty array when keys returns null', async () => {
            mockKeys.mockResolvedValue(null);
            const result = await storage.keys();
            expect(result).toEqual([]);
        });
    });
});
