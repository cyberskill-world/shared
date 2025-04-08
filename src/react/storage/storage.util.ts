import localForage from 'localforage';

import { log } from '../log/index.js';

export const storage = {
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            return await localForage.getItem<T>(key);
        }
        catch (error) {
            log.error(`[Storage:get] Error getting key "${key}":`, error);
            return null;
        }
    },
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await localForage.setItem(key, value);
        }
        catch (error) {
            log.error(`[Storage:set] Error setting key "${key}":`, error);
        }
    },
    async remove(key: string): Promise<void> {
        try {
            await localForage.removeItem(key);
        }
        catch (error) {
            log.error(`[Storage:remove] Error removing key "${key}":`, error);
        }
    },
    async keys(): Promise<string[]> {
        try {
            const keys = await localForage.keys();
            return keys ?? [];
        }
        catch (error) {
            log.error(`[Storage:keys] Error getting keys:`, error);
            return [];
        }
    },
};
