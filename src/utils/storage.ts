import localForage from 'localforage';
import nodePersist from 'node-persist';

const isBrowser = typeof window !== 'undefined';

async function initNodePersist() {
    if (!isBrowser && !nodePersist.defaultInstance) {
        await nodePersist.init({
            dir: './.node-storage',
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,
            forgiveParseErrors: true,
        });
    }
}

export const storage = {
    /**
     * Get the value of a key.
     * @param key The key to retrieve.
     * @returns A promise that resolves to the value associated with the key, or `null` if the key doesn't exist.
     */
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            if (isBrowser) {
                return await localForage.getItem<T>(key);
            }
            else {
                await initNodePersist();
                const result = await nodePersist.getItem(key);
                return result ?? null;
            }
        }
        catch (error) {
            console.error(`❌ [Storage:get] Error getting key "${key}":`, error);
            return null;
        }
    },

    /**
     * Set the value for a key.
     * @param key The key to set.
     * @param value The value to store.
     * @returns A promise that resolves once the value is stored.
     */
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            if (isBrowser) {
                await localForage.setItem(key, value);
            }
            else {
                await initNodePersist();
                await nodePersist.setItem(key, value);
            }
        }
        catch (error) {
            console.error(`❌ [Storage:set] Error setting key "${key}":`, error);
        }
    },

    /**
     * Remove the value associated with a key.
     * @param key The key to remove.
     * @returns A promise that resolves once the key is removed.
     */
    async remove(key: string): Promise<void> {
        try {
            if (isBrowser) {
                await localForage.removeItem(key);
            }
            else {
                await initNodePersist();
                await nodePersist.removeItem(key);
            }
        }
        catch (error) {
            console.error(`❌ [Storage:remove] Error removing key "${key}":`, error);
        }
    },

    /**
     * Get all keys in the storage.
     * @returns A promise that resolves to an array of all keys.
     */
    async keys(): Promise<string[]> {
        try {
            if (isBrowser) {
                return await localForage.keys();
            }
            else {
                await initNodePersist();
                const keys = await nodePersist.keys();
                return keys || [];
            }
        }
        catch (error) {
            console.error(`❌ [Storage:keys] Error getting keys:`, error);
            return [];
        }
    },

    /**
     * Get all values in the storage.
     * @returns A promise that resolves to an array of all values.
     */
    async values<T = unknown>(): Promise<T[]> {
        try {
            if (isBrowser) {
                const keys = await localForage.keys();
                const values = await Promise.all(keys.map(key => localForage.getItem<T>(key)));
                return values.filter(value => value !== null) as T[];
            }
            else {
                await initNodePersist();
                const values = await nodePersist.values();
                return values as T[];
            }
        }
        catch (error) {
            console.error(`❌ [Storage:values] Error getting values:`, error);
            return [];
        }
    },

    /**
     * Get all entries in the storage as [key, value] tuples.
     * @returns A promise that resolves to an array of entries.
     */
    async entries<T = unknown>(): Promise<[string, T][]> {
        try {
            if (isBrowser) {
                const keys = await localForage.keys();
                const entries = await Promise.all(
                    keys.map(async (key) => {
                        const value = await localForage.getItem<T>(key);
                        return value !== null ? [key, value] : null;
                    }),
                );
                return entries.filter(entry => entry !== null) as [string, T][];
            }
            else {
                await initNodePersist();
                const keys = await nodePersist.keys();
                const values = await nodePersist.values();
                return keys.map((key, index) => [key, values[index]]) as [string, T][];
            }
        }
        catch (error) {
            console.error(`❌ [Storage:entries] Error getting entries:`, error);
            return [];
        }
    },

    /**
     * Clear all keys and values in the storage.
     * @returns A promise that resolves once the storage is cleared.
     */
    async clear(): Promise<void> {
        try {
            if (isBrowser) {
                await localForage.clear();
            }
            else {
                await initNodePersist();
                await nodePersist.clear();
            }
        }
        catch (error) {
            console.error(`❌ [Storage:clear] Error clearing storage:`, error);
        }
    },

    /**
     * Get the number of items in the storage.
     * @returns A promise that resolves to the number of keys stored.
     */
    async length(): Promise<number> {
        try {
            if (isBrowser) {
                return await localForage.length();
            }
            else {
                await initNodePersist();
                const keys = await nodePersist.keys();
                return keys.length;
            }
        }
        catch (error) {
            console.error(`❌ [Storage:length] Error getting storage length:`, error);
            return 0;
        }
    },
};
