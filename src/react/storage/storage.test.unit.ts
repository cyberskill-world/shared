import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../log/index.js', () => ({
    catchError: vi.fn((_error: unknown, opts?: { returnValue?: unknown }) => opts?.returnValue !== undefined ? opts.returnValue : undefined),
}));

describe('storage', () => {
    let storage: typeof import('./storage.util.js')['storage'];

    const mockStore: Record<string, string> = {};

    beforeEach(async () => {
        vi.clearAllMocks();
        // Clear mock store
        Object.keys(mockStore).forEach(k => delete mockStore[k]);

        // Mock localStorage
        vi.stubGlobal('localStorage', {
            getItem: vi.fn((key: string) => mockStore[key] ?? null),
            setItem: vi.fn((key: string, value: string) => { mockStore[key] = value; }),
            removeItem: vi.fn((key: string) => { delete mockStore[key]; }),
            key: vi.fn((index: number) => Object.keys(mockStore)[index] ?? null),
            get length() { return Object.keys(mockStore).length; },
            clear: vi.fn(() => { Object.keys(mockStore).forEach(k => delete mockStore[k]); }),
        });

        const mod = await import('./storage.util.js');
        storage = mod.storage;
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    describe('get', () => {
        it('should return stored value by key', async () => {
            mockStore['key'] = JSON.stringify('hello');
            const result = await storage.get('key');
            expect(result).toBe('hello');
            expect(localStorage.getItem).toHaveBeenCalledWith('key');
        });

        it('should return null when key does not exist', async () => {
            const result = await storage.get('missing');
            expect(result).toBeNull();
        });

        it('should return null on error', async () => {
            vi.mocked(localStorage.getItem).mockImplementation(() => {
                throw new Error('fail');
            });
            const result = await storage.get('key');
            expect(result).toBeNull();
        });
    });

    describe('set', () => {
        it('should store value with key', async () => {
            await storage.set('key', { data: 42 });
            expect(localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify({ data: 42 }));
        });

        it('should catch errors silently', async () => {
            vi.mocked(localStorage.setItem).mockImplementation(() => {
                throw new Error('fail');
            });
            await expect(storage.set('key', 'value')).resolves.toBeUndefined();
        });
    });

    describe('remove', () => {
        it('should remove value by key', async () => {
            await storage.remove('key');
            expect(localStorage.removeItem).toHaveBeenCalledWith('key');
        });

        it('should catch errors silently', async () => {
            vi.mocked(localStorage.removeItem).mockImplementation(() => {
                throw new Error('fail');
            });
            await expect(storage.remove('key')).resolves.toBeUndefined();
        });
    });

    describe('keys', () => {
        it('should return all storage keys', async () => {
            mockStore['a'] = '1';
            mockStore['b'] = '2';
            mockStore['c'] = '3';
            const result = await storage.keys();
            expect(result).toEqual(['a', 'b', 'c']);
        });

        it('should return empty array on error', async () => {
            vi.mocked(localStorage.key).mockImplementation(() => {
                throw new Error('fail');
            });
            const result = await storage.keys();
            expect(result).toEqual([]);
        });

        it('should return empty array when no keys exist', async () => {
            const result = await storage.keys();
            expect(result).toEqual([]);
        });
    });

    describe('ttlMs and getOrSet', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should store wrapped value and return it if not expired', async () => {
            await storage.set('ttl-key', 'ttl-value', { ttlMs: 100 });
            let result = await storage.get<string>('ttl-key');
            expect(result).toBe('ttl-value');

            vi.advanceTimersByTime(150);

            result = await storage.get<string>('ttl-key');
            expect(result).toBeNull();
            expect(localStorage.removeItem).toHaveBeenCalledWith('ttl-key');
        });

        it('should return existing value directly in getOrSet', async () => {
            await storage.set('gor-exist', 'existing');
            const factory = vi.fn(async () => 'new-value');

            const result = await storage.getOrSet('gor-exist', factory);
            expect(result).toBe('existing');
            expect(factory).not.toHaveBeenCalled();
        });

        it('should invoke factory when value is missing', async () => {
            const factory = vi.fn(async () => 'computed-value');

            const result = await storage.getOrSet('gor-missing', factory, { ttlMs: 100 });
            expect(result).toBe('computed-value');
            expect(factory).toHaveBeenCalledOnce();

            const raw = mockStore['gor-missing'];
            expect(raw).toBeDefined();
            const stored = JSON.parse(raw as string);
            expect(stored.__isTtlEnvelope).toBe(true);
            expect(stored.value).toBe('computed-value');
        });
    });
});
