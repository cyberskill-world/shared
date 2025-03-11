import localForage from 'localforage';
import nodePersist from 'node-persist';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const isBrowser = typeof window !== 'undefined';

// ✅ Use global storage location for node-persist
const storageDir
    = process.env.CYBERSKILL_STORAGE_DIR
        || path.join(os.homedir(), '.cyberskill-storage');

async function initNodePersist() {
    if (!isBrowser && !nodePersist.defaultInstance) {
        await nodePersist.init({
            dir: storageDir, // ✅ Global storage path
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
