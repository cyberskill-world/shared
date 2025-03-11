import localForage from 'localforage';
import nodePersist from 'node-persist';

const isBrowser = typeof window !== 'undefined';

if (!isBrowser) {
    nodePersist.init({
        dir: './.node-storage',
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false,
        forgiveParseErrors: true,
    });
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
                const result = await nodePersist.getItem(key);
                return result !== undefined ? (result as T) : null;
            }
        }
        catch (error) {
            console.error(`Error getting key "${key}":`, error);
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
                await nodePersist.setItem(key, value);
            }
        }
        catch (error) {
            console.error(`Error setting key "${key}":`, error);
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
                await nodePersist.removeItem(key);
            }
        }
        catch (error) {
            console.error(`Error removing key "${key}":`, error);
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
                await nodePersist.clear();
            }
        }
        catch (error) {
            console.error('Error clearing storage:', error);
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
                return await nodePersist.keys();
            }
        }
        catch (error) {
            console.error('Error getting keys:', error);
            return [];
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
                const keys = await nodePersist.keys();
                return keys.length;
            }
        }
        catch (error) {
            console.error('Error getting storage length:', error);
            return 0;
        }
    },

    /**
     * Iterate over all key-value pairs in the storage.
     * @param iteratee A callback function that receives the value, key, and iteration number.
     * @returns A promise that resolves once iteration is complete.
     */
    async iterate<T = unknown>(
        iteratee: (value: T, key: string, iterationNumber: number) => void,
    ): Promise<void> {
        try {
            if (isBrowser) {
                await localForage.iterate(iteratee);
            }
            else {
                const keys = await nodePersist.keys();
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = await nodePersist.getItem(key);
                    iteratee(value, key, i);
                }
            }
        }
        catch (error) {
            console.error('Error iterating storage:', error);
        }
    },
};
