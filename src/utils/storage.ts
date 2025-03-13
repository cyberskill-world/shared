import localForage from 'localforage';
import nodePersist from 'node-persist';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const isBrowser = typeof window !== 'undefined';

const storageDir
    = process.env.CYBERSKILL_STORAGE_DIR
        || path.join(os.homedir(), '.cyberskill-storage');

async function initNodePersist() {
    if (!isBrowser && !nodePersist.defaultInstance) {
        await nodePersist.init({
            dir: storageDir,
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,
            forgiveParseErrors: true,
        });
    }
}

export const storage = {
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

    async keys(): Promise<string[]> {
        try {
            if (isBrowser) {
                const keys = await localForage.keys();
                return keys ?? [];
            }
            else {
                await initNodePersist();
                const keys = await nodePersist.keys();

                if (!Array.isArray(keys)) {
                    console.warn(`⚠️ [Storage:keys] Invalid keys response:`, keys);
                    return [];
                }

                return keys;
            }
        }
        catch (error) {
            console.error(`❌ [Storage:keys] Error getting keys:`, error);
            return [];
        }
    },

    /**
     * ✅ Get log path for the key
     * - Logs only the storage path and key (no direct opening)
     */
    async getLogLink(key: string): Promise<string | null> {
        try {
            const storagePath = storageDir;
            return `${storagePath} (key: ${key})`;
        }
        catch (error) {
            console.error(`❌ [Storage:getLogLink] Error getting log link:`, error);
            return null;
        }
    },

};
