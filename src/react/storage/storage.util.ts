import localForage from 'localforage';

import { catchError } from '../log/index.js';

export const storage = {
    async get<T = unknown>(key: string): Promise<T | null> {
        try {
            return await localForage.getItem<T>(key);
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },
    async set<T = unknown>(key: string, value: T): Promise<void> {
        try {
            await localForage.setItem(key, value);
        }
        catch (error) {
            catchError(error);
        }
    },
    async remove(key: string): Promise<void> {
        try {
            await localForage.removeItem(key);
        }
        catch (error) {
            catchError(error);
        }
    },
    async keys(): Promise<string[]> {
        try {
            const keys = await localForage.keys();

            return keys ?? [];
        }
        catch (error) {
            return catchError(error, { returnValue: [] });
        }
    },
};
