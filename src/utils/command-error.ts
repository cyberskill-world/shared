import type { I_ErrorEntry } from '../typescript/command.js';

import { log } from './command-log.js';
import { storage } from './storage.js';

const ERROR_LIST_KEY = (timestamp: number) => `error_list:${timestamp}`;

/**
 * Save the entire error list to storage.
 * @param errorList Array of I_ErrorEntry objects.
 */
export async function saveErrorListToStorage(errorList: I_ErrorEntry[]): Promise<void> {
    if (!errorList.length) {
        return;
    }

    const timestamp = Date.now();
    const key = ERROR_LIST_KEY(timestamp);

    try {
        await storage.set(key, {
            errors: errorList,
            timestamp,
        });

        const logPath = await storage.getLogLink(key);

        if (logPath) {
            log.info(`Open the error list manually: ${logPath}`);
        }
    }
    catch (error) {
        log.error(`Failed to save errors: ${(error as Error).message}`);
    }
}

/**
 * Get all stored error lists.
 * @returns An array of stored error objects.
 */
export async function getStoredErrorLists(): Promise<I_ErrorEntry[]> {
    try {
        const keys = await storage.keys();

        if (!Array.isArray(keys)) {
            log.warning(`Invalid response from storage.keys(): ${keys}`);

            return [];
        }

        const errorKeys = keys.filter(key => key?.startsWith?.('error_list:'));

        const allErrors: I_ErrorEntry[] = [];

        for (const key of errorKeys) {
            const entry = await storage.get<{ errors: I_ErrorEntry[]; timestamp: number }>(key);
            if (entry)
                allErrors.push(...entry.errors);
        }

        return allErrors;
    }
    catch (error) {
        log.error(`Failed to retrieve stored errors: ${(error as Error).message}`);

        return [];
    }
}

/**
 * Clear all stored error lists.
 */
export async function clearAllErrorLists(): Promise<void> {
    try {
        const keys = await storage.keys();

        if (!Array.isArray(keys)) {
            log.warning(`Invalid response from storage.keys(): ${keys}`);

            return;
        }

        const errorKeys = keys.filter(key => key?.startsWith?.('error_list:'));

        for (const key of errorKeys) {
            await storage.remove(key);
            log.success(`Removed error list: ${key}`);
        }
    }
    catch (error) {
        log.error(`Failed to clear error lists: ${(error as Error).message}`);
    }
}
