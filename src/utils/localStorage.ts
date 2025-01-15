import localForage from 'localforage';

export const localStorage = {
    /**
     * Get the value of a key.
     * @param key The key to retrieve.
     * @returns A promise that resolves to the value associated with the key, or `null` if the key doesn't exist.
     */
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            return await localForage.getItem<T>(key);
        }
        catch (error) {
            console.error(`Error getting key "${key}":`, error);
            return null;
        }
    },
    /**
     * Set the value for a key.
     * @param key The key to set.
     * @param value The value to store. Can be any serializable type.
     * @returns A promise that resolves once the value is stored.
     */
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await localForage.setItem(key, value);
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
            await localForage.removeItem(key);
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
            await localForage.clear();
        }
        catch (error) {
            console.error('Error clearing storage:', error);
        }
    },
    /**
     * Get the name of the key at a specific index.
     * @param index The index of the key.
     * @returns A promise that resolves to the key name or `null` if the index is out of bounds.
     */
    async key(index: number): Promise<string | null> {
        try {
            return await localForage.key(index);
        }
        catch (error) {
            console.error(`Error getting key at index ${index}:`, error);
            return null;
        }
    },
    /**
     * Get all keys in the storage.
     * @returns A promise that resolves to an array of all keys.
     */
    async keys(): Promise<string[]> {
        try {
            return await localForage.keys();
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
            return await localForage.length();
        }
        catch (error) {
            console.error('Error getting storage length:', error);
            return 0;
        }
    },
    /**
     * Iterates over all key-value pairs in the storage.
     * @param iteratee A callback function that receives the value, key, and iteration number.
     * @returns A promise that resolves once iteration is complete.
     */
    async iterate<T = unknown>(
        iteratee: (value: T, key: string, iterationNumber: number) => void,
    ): Promise<void> {
        try {
            await localForage.iterate(iteratee);
        }
        catch (error) {
            console.error('Error iterating storage:', error);
        }
    },
};
