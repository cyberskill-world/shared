import localForage from 'localforage';

import { catchError } from '../log/index.js';

/**
 * Browser storage utility object using localForage for cross-browser compatibility.
 * This object provides a unified interface for browser storage operations using localForage,
 * which automatically chooses the best available storage method (IndexedDB, WebSQL, or localStorage)
 * based on browser capabilities. It includes comprehensive error handling and type safety.
 */
export const storage = {
    /**
     * Retrieves a value from browser storage by key.
     * This method fetches data that was previously stored using the set method.
     * Returns null if the key doesn't exist or if an error occurs during retrieval.
     *
     * @param key - The unique identifier for the stored value.
     * @returns A promise that resolves to the stored value or null if not found.
     */
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            return await localForage.getItem<T>(key);
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },
    /**
     * Stores a value in browser storage with a unique key.
     * This method saves data that can be retrieved later using the get method.
     * The data is automatically handled by localForage which chooses the optimal
     * storage method for the browser environment.
     *
     * @param key - The unique identifier for the value to store.
     * @param value - The data to store (will be automatically handled by localForage).
     * @returns A promise that resolves when the storage operation is complete.
     */
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await localForage.setItem(key, value);
        }
        catch (error) {
            catchError(error);
        }
    },
    /**
     * Removes a value from browser storage by key.
     * This method permanently deletes the stored data associated with the specified key.
     * If the key doesn't exist, the operation completes successfully without error.
     *
     * @param key - The unique identifier of the value to remove.
     * @returns A promise that resolves when the removal operation is complete.
     */
    async remove(key: string): Promise<void> {
        try {
            await localForage.removeItem(key);
        }
        catch (error) {
            catchError(error);
        }
    },
    /**
     * Retrieves all storage keys.
     * This method returns an array of all keys that currently have stored values.
     * Returns an empty array if no keys exist or if an error occurs during retrieval.
     *
     * @returns A promise that resolves to an array of storage keys.
     */
    async keys(): Promise<string[]> {
        try {
            const keys = await localForage.keys();

            return keys ?? [];
        }
        catch (error) {
            return catchError(error, { returnValue: [] });
        }
    },
};
