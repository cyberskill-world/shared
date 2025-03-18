import nodePersist from 'node-persist';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

export const storageDir
    = process.env.CYBERSKILL_STORAGE_DIR
        || path.join(os.homedir(), '.cyberskill-storage');

export async function initNodePersist() {
    if (!nodePersist.defaultInstance) {
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

export const storageServer = {
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            await initNodePersist();
            const result = await nodePersist.getItem(key);
            return result ?? null;
        }
        catch (error) {
            console.error(`❌ [Storage:get] Error getting key "${key}":`, error);
            return null;
        }
    },
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.setItem(key, value);
        }
        catch (error) {
            console.error(`❌ [Storage:set] Error setting key "${key}":`, error);
        }
    },
    async remove(key: string): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.removeItem(key);
        }
        catch (error) {
            console.error(`❌ [Storage:remove] Error removing key "${key}":`, error);
        }
    },
    async keys(): Promise<string[]> {
        try {
            await initNodePersist();
            const keys = await nodePersist.keys();

            if (!Array.isArray(keys)) {
                console.warn(`⚠️ [Storage:keys] Invalid keys response:`, keys);
                return [];
            }

            return keys;
        }
        catch (error) {
            console.error(`❌ [Storage:keys] Error getting keys:`, error);
            return [];
        }
    },
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
