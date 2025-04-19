import nodePersist from 'node-persist';

import { getEnv } from '#configs/env/index.js';

import { logNodeJS as log } from '../log/index.js';

const env = getEnv();

async function initNodePersist() {
    if (!nodePersist.defaultInstance) {
        await nodePersist.init({
            dir: env.CYBERSKILL_STORAGE_DIR,
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,
            forgiveParseErrors: true,
        });
    }
}

export const storageNodeJS = {
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            await initNodePersist();
            const result = await nodePersist.getItem(key);

            return result ?? null;
        }
        catch (error) {
            log.error(`[Storage:get] Error getting key "${key}":`, error);
            return null;
        }
    },
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.setItem(key, value);
        }
        catch (error) {
            log.error(`[Storage:set] Error setting key "${key}":`, error);
        }
    },
    async remove(key: string): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.removeItem(key);
        }
        catch (error) {
            log.error(`[Storage:remove] Error removing key "${key}":`, error);
        }
    },
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
            log.error(`[Storage:keys] Error getting keys:`, error);
            return [];
        }
    },
    async getLogLink(key: string): Promise<string | null> {
        try {
            const storagePath = env.CYBERSKILL_STORAGE_DIR;

            return `${storagePath} (key: ${key})`;
        }
        catch (error) {
            log.error(`[Storage:getLogLink] Error getting log link:`, error);
            return null;
        }
    },

};
