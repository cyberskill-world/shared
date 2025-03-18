import localForage from 'localforage';

export const storageClient = {
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            return await localForage.getItem<T>(key);
        }
        catch (error) {
            console.error(`❌ [Storage:get] Error getting key "${key}":`, error);
            return null;
        }
    },
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await localForage.setItem(key, value);
        }
        catch (error) {
            console.error(`❌ [Storage:set] Error setting key "${key}":`, error);
        }
    },
    async remove(key: string): Promise<void> {
        try {
            await localForage.removeItem(key);
        }
        catch (error) {
            console.error(`❌ [Storage:remove] Error removing key "${key}":`, error);
        }
    },
    async keys(): Promise<string[]> {
        try {
            const keys = await localForage.keys();
            return keys ?? [];
        }
        catch (error) {
            console.error(`❌ [Storage:keys] Error getting keys:`, error);
            return [];
        }
    },
};
