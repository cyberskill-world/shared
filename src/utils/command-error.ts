import type { I_ErrorEntry } from '../typescript/command.js';

import { storage } from './storage.js';

const ERROR_LIST_KEY = (timestamp: number) => `error_list:${timestamp}`;
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Save the entire error list to storage.
 * @param errorList Array of I_ErrorEntry objects.
 */
export async function saveErrorListToStorage(errorList: I_ErrorEntry[]): Promise<void> {
    if (!errorList.length)
        return;

    const timestamp = Date.now();
    const key = ERROR_LIST_KEY(timestamp);

    try {
        await storage.set(key, {
            errors: errorList,
            timestamp,
        });

        console.log(`✅ Saved ${errorList.length} errors to storage with key: ${key}`);
    }
    catch (error) {
        console.error(`❌ Failed to save errors: ${(error as Error).message}`);
    }
}

/**
 * Get all stored error lists.
 * @returns An array of stored error objects.
 */
export async function getStoredErrorLists(): Promise<I_ErrorEntry[]> {
    try {
        const keys = await storage.keys();
        const errorKeys = keys.filter(key => key.startsWith('error_list:'));

        const allErrors: I_ErrorEntry[] = [];

        for (const key of errorKeys) {
            const entry = await storage.get<{ errors: I_ErrorEntry[]; timestamp: number }>(key);
            if (entry) {
                allErrors.push(...entry.errors);
            }
        }

        return allErrors;
    }
    catch (error) {
        console.error(`❌ Failed to retrieve stored errors: ${(error as Error).message}`);
        return [];
    }
}

/**
 * Clear expired error lists from storage.
 */
export async function clearExpiredErrorLists(): Promise<void> {
    try {
        const keys = await storage.keys();
        const now = Date.now();

        for (const key of keys) {
            if (key.startsWith('error_list:')) {
                const entry = await storage.get<{ errors: I_ErrorEntry[]; timestamp: number }>(key);

                if (entry && now - entry.timestamp > CACHE_EXPIRATION_MS) {
                    await storage.remove(key);
                    console.log(`🗑️ Removed expired error list: ${key}`);
                }
            }
        }
    }
    catch (error) {
        console.error(`❌ Failed to clear expired error lists: ${(error as Error).message}`);
    }
}
