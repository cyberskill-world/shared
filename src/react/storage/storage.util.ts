import { catchError } from '../log/index.js';

/**
 * Browser storage utility object using native localStorage.
 * This object provides a unified interface for browser storage operations
 * with comprehensive error handling and type safety.
 * Values are stored as JSON strings for consistent serialization.
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
            const raw = localStorage.getItem(key);

            if (raw === null) {
                return null;
            }

            return JSON.parse(raw) as T;
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },
    /**
     * Stores a value in browser storage with a unique key.
     * This method saves data that can be retrieved later using the get method.
     * The data is automatically serialized to JSON.
     *
     * @param key - The unique identifier for the value to store.
     * @param value - The data to store (will be automatically serialized to JSON).
     * @returns A promise that resolves when the storage operation is complete.
     */
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            localStorage.setItem(key, JSON.stringify(value));
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
            localStorage.removeItem(key);
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
            const keys: string[] = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (key !== null) {
                    keys.push(key);
                }
            }

            return keys;
        }
        catch (error) {
            return catchError(error, { returnValue: [] });
        }
    },
};
