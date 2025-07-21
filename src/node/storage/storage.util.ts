import nodePersist from 'node-persist';

import { getEnv } from '#config/env/index.js';

import { catchError, log } from '../log/index.js';

const env = getEnv();

/**
 * Initializes the node-persist storage system.
 * This function ensures that node-persist is properly initialized with the configured
 * storage directory before any storage operations are performed.
 *
 * @returns A promise that resolves when the storage system is initialized.
 */
async function initNodePersist() {
    if (!nodePersist.defaultInstance) {
        await nodePersist.init({
            dir: env.CYBERSKILL_STORAGE_DIRECTORY,
        });
    }
}

/**
 * Persistent storage utility object for data persistence across application sessions.
 * This object provides methods for storing, retrieving, and managing data using node-persist,
 * with automatic initialization and error handling.
 */
export const storage = {
    /**
     * Retrieves a value from persistent storage by key.
     * This method fetches data that was previously stored using the set method.
     * Returns null if the key doesn't exist or if an error occurs.
     *
     * @param key - The unique identifier for the stored value.
     * @returns A promise that resolves to the stored value or null if not found.
     */
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            await initNodePersist();
            const result = await nodePersist.getItem(key);

            return result ?? null;
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },
    /**
     * Stores a value in persistent storage with a unique key.
     * This method saves data that can be retrieved later using the get method.
     * The data is automatically serialized and stored in the configured storage directory.
     *
     * @param key - The unique identifier for the value to store.
     * @param value - The data to store (will be automatically serialized).
     * @returns A promise that resolves when the storage operation is complete.
     */
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.setItem(key, value);
        }
        catch (error) {
            catchError(error);
        }
    },
    /**
     * Removes a value from persistent storage by key.
     * This method permanently deletes the stored data associated with the specified key.
     *
     * @param key - The unique identifier of the value to remove.
     * @returns A promise that resolves when the removal operation is complete.
     */
    async remove(key: string): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.removeItem(key);
        }
        catch (error) {
            catchError(error);
        }
    },
    /**
     * Retrieves all storage keys.
     * This method returns an array of all keys that currently have stored values.
     * Returns an empty array if no keys exist or if an error occurs.
     *
     * @returns A promise that resolves to an array of storage keys.
     */
    async keys(): Promise<string[]> {
        try {
            await initNodePersist();
            const keys = await nodePersist.keys();

            if (!Array.isArray(keys)) {
                log.warn(`[Storage:keys] Invalid keys response:`, keys);
                return [];
            }

            return keys;
        }
        catch (error) {
            return catchError(error, { returnValue: [] });
        }
    },
    /**
     * Gets a human-readable log link for a storage key.
     * This method provides a formatted string that shows the storage directory path
     * and the key name for debugging and manual inspection purposes.
     *
     * @param key - The storage key to generate a log link for.
     * @returns A promise that resolves to a formatted log link string or null if an error occurs.
     */
    async getLogLink(key: string): Promise<string | null> {
        try {
            const storagePath = env.CYBERSKILL_STORAGE_DIRECTORY;

            return `${storagePath} (key: ${key})`;
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },

};
