import nodePersist from 'node-persist';

import { getEnv } from '#config/env/index.js';

import { catchError, log } from '../log/index.js';

const env = getEnv();

async function initNodePersist() {
    if (!nodePersist.defaultInstance) {
        await nodePersist.init({
            dir: env.CYBERSKILL_STORAGE_DIRECTORY,
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
            await initNodePersist();
            const result = await nodePersist.getItem(key);

            return result ?? null;
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.setItem(key, value);
        }
        catch (error) {
            catchError(error);
        }
    },
    async remove(key: string): Promise<void> {
        try {
            await initNodePersist();
            await nodePersist.removeItem(key);
        }
        catch (error) {
            catchError(error);
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
            return catchError(error, { returnValue: [] });
        }
    },
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
