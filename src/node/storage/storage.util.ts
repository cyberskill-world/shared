import localForage from 'localforage';
import fs from 'node:fs/promises';
import path from 'node:path';

import { getEnv } from '#config/env/index.js';

import type { LocalForageDriver, NodeFsDriverState, NodeLocalForageOptions } from './storage.type.js';

import { catchError, log } from '../log/index.js';
import { NODE_FS_DRIVER_NAME, STORAGE_INSTANCE_NAME, STORAGE_KEY_EXTENSION, STORAGE_STORE_NAME } from './storage.constant.js';

const env = getEnv();

const nodeFsDriverState: NodeFsDriverState = {
    baseDir: env.CYBERSKILL_STORAGE_DIRECTORY,
};

/**
 * Encodes a storage key into a filename-safe string.
 */
function encodeKey(key: string): string {
    return `${encodeURIComponent(key)}${STORAGE_KEY_EXTENSION}`;
}

/**
 * Decodes a filename-safe key back to the original storage key.
 */
function decodeKey(fileName: string): string {
    return decodeURIComponent(fileName.slice(0, -STORAGE_KEY_EXTENSION.length));
}

/**
 * Maps a storage key to an absolute file path inside the storage directory.
 */
function getFilePath(key: string, baseDir: string): string {
    return path.join(baseDir, encodeKey(key));
}

/**
 * Custom localForage driver that stores JSON-encoded values on the filesystem.
 */
const nodeFsDriver: LocalForageDriver = {
    _driver: NODE_FS_DRIVER_NAME,
    _support: true,
    /** Ensures the storage directory exists and respects custom baseDir overrides. */
    async _initStorage(options: unknown) {
        try {
            const baseDirFromOptions = typeof options === 'object' && options !== null && 'baseDir' in options
                ? (options as { baseDir?: unknown }).baseDir
                : undefined;

            if (typeof baseDirFromOptions === 'string' && baseDirFromOptions.length > 0) {
                nodeFsDriverState.baseDir = baseDirFromOptions;
            }
            else {
                nodeFsDriverState.baseDir = env.CYBERSKILL_STORAGE_DIRECTORY;
            }

            await fs.mkdir(nodeFsDriverState.baseDir, { recursive: true });
        }
        catch (error) {
            log.error('[Storage:init]', error);
            throw error;
        }
    },
    /** Deletes all stored entries by recreating the directory. */
    async clear() {
        const { baseDir } = nodeFsDriverState;

        await fs.rm(baseDir, { recursive: true, force: true });
        await fs.mkdir(baseDir, { recursive: true });
    },
    /** Reads and parses a stored value; returns null when the file is missing. */
    async getItem<T>(key: string): Promise<T | null> {
        const { baseDir } = nodeFsDriverState;
        const filePath = getFilePath(key, baseDir);

        try {
            const content = await fs.readFile(filePath, 'utf8');

            return JSON.parse(content) as T;
        }
        catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                return null;
            }
            throw error;
        }
    },
    /** Iterates through all keys, invoking the iterator until it returns a value. */
    async iterate<T, U>(iterator: (value: T, key: string, iterationNumber: number) => U): Promise<U> {
        const keys = await nodeFsDriver.keys();
        let iterationNumber = 1;

        for (const key of keys) {
            const value = await nodeFsDriver.getItem<T>(key);

            const result = iterator(value as T, key, iterationNumber);

            if (result !== undefined) {
                return result;
            }
            iterationNumber += 1;
        }

        return undefined as unknown as U;
    },
    /** Returns the key name at the given index or null when out of bounds. */
    async key(keyIndex: number): Promise<string> {
        const keys = await nodeFsDriver.keys();

        return keys[keyIndex] ?? null as unknown as string;
    },
    /** Lists all stored keys. */
    async keys(): Promise<string[]> {
        const { baseDir } = nodeFsDriverState;

        try {
            const files = await fs.readdir(baseDir);

            return files
                .filter(file => file.endsWith(STORAGE_KEY_EXTENSION))
                .map(decodeKey);
        }
        catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    },
    /** Returns the count of stored keys. */
    async length(): Promise<number> {
        const keys = await nodeFsDriver.keys();

        return keys.length;
    },
    /** Removes a stored value for the given key. */
    async removeItem(key: string): Promise<void> {
        const { baseDir } = nodeFsDriverState;
        const filePath = getFilePath(key, baseDir);

        await fs.rm(filePath, { force: true });
    },
    /** Stores a value as JSON on disk. */
    async setItem<T>(key: string, value: T): Promise<T> {
        const { baseDir } = nodeFsDriverState;
        const filePath = getFilePath(key, baseDir);

        await fs.mkdir(baseDir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(value), 'utf8');

        return value;
    },
};

let initPromise: Promise<void> | null = null;
let driverInstance: LocalForageDriver | null = null;

/**
 * Prepares and returns the filesystem-backed localForage driver.
 * We bypass localForage's default driver selection and explicitly initialize
 * our custom driver to ensure Node compatibility.
 */
async function ensureLocalForageReady(): Promise<LocalForageDriver> {
    if (initPromise) {
        await initPromise;
        return driverInstance as LocalForageDriver;
    }

    initPromise = (async () => {
        await localForage.defineDriver(nodeFsDriver);
        nodeFsDriverState.baseDir = env.CYBERSKILL_STORAGE_DIRECTORY;
        const driver = await localForage.getDriver(NODE_FS_DRIVER_NAME);

        const initOptions = {
            baseDir: nodeFsDriverState.baseDir,
            name: STORAGE_INSTANCE_NAME,
            storeName: STORAGE_STORE_NAME,
        } satisfies NodeLocalForageOptions;

        await driver._initStorage(initOptions as unknown as Parameters<typeof driver._initStorage>[0]);
        driverInstance = driver;
    })().catch((error) => {
        initPromise = null;
        throw error;
    });

    await initPromise;

    return driverInstance as LocalForageDriver;
}

/**
 * Persistent storage utility object for data persistence across application sessions.
 * This object provides methods for storing, retrieving, and managing data using localForage,
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
            const driver = await ensureLocalForageReady();
            const result = await driver.getItem<T>(key);

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
            const driver = await ensureLocalForageReady();

            await driver.setItem(key, value);
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
            const driver = await ensureLocalForageReady();

            await driver.removeItem(key);
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
            const driver = await ensureLocalForageReady();
            const keys = await driver.keys();

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
            const storagePath = path.join(env.CYBERSKILL_STORAGE_DIRECTORY, encodeKey(key));

            return `${storagePath} (key: ${key})`;
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },

};
