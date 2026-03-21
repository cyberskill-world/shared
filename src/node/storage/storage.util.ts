import fs from 'node:fs/promises';
import path from 'node:path';

import { getEnv } from '#config/env/index.js';

import { catchError, log } from '../log/index.js';
import { STORAGE_KEY_EXTENSION } from './storage.constant.js';

const MAX_KEY_LENGTH = 200;

interface NodeFsDriverState {
    baseDir: string;
}

const nodeFsDriverState: NodeFsDriverState = {
    baseDir: '',
};

/**
 * Encodes a storage key into a filename-safe string.
 * Validates key length before encoding to prevent OS filename limits.
 *
 * @throws {RangeError} When key exceeds maximum length.
 */
function encodeKey(key: string): string {
    if (key.length > MAX_KEY_LENGTH) {
        throw new RangeError(`Storage key exceeds maximum length of ${MAX_KEY_LENGTH} characters`);
    }
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
 * Filesystem-backed storage driver that stores JSON-encoded values on disk.
 * Directly implements all storage operations without any external dependencies.
 * storage operations without the unnecessary browser-oriented dependency.
 */
const fsDriver = {
    /** Ensures the storage directory exists. */
    async init(baseDir?: string) {
        try {
            if (typeof baseDir === 'string' && baseDir.length > 0) {
                nodeFsDriverState.baseDir = baseDir;
            }
            else {
                nodeFsDriverState.baseDir = getEnv().CYBERSKILL_STORAGE_DIRECTORY;
            }

            await fs.mkdir(nodeFsDriverState.baseDir, { recursive: true });
        }
        catch (error) {
            log.error('[Storage:init]', error);
            throw error;
        }
    },
    /** Deletes all stored entries atomically by swapping to a fresh directory. */
    async clear() {
        const { baseDir } = nodeFsDriverState;

        if (!baseDir) {
            return;
        }

        // Atomic swap: create a fresh temp dir, rename old→trash, rename fresh→baseDir, remove trash
        const trashDir = `${baseDir}.trash.${Date.now()}`;
        const freshDir = `${baseDir}.fresh.${Date.now()}`;

        try {
            await fs.mkdir(freshDir, { recursive: true });
            // Try atomic rename swap
            try {
                await fs.rename(baseDir, trashDir);
            }
            catch {
                // baseDir might not exist yet; no-op
            }
            await fs.rename(freshDir, baseDir);
            // Clean up trash in the background (non-blocking)
            fs.rm(trashDir, { recursive: true, force: true }).catch(() => {});
        }
        catch {
            // Fallback: non-atomic clear (e.g., cross-device rename)
            await fs.rm(baseDir, { recursive: true, force: true });
            await fs.mkdir(baseDir, { recursive: true });
            // Clean up any leftover temp dirs
            fs.rm(freshDir, { recursive: true, force: true }).catch(() => {});
            fs.rm(trashDir, { recursive: true, force: true }).catch(() => {});
        }
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

/**
 * Initializes the filesystem storage driver (singleton, idempotent).
 * Ensures the storage directory exists before any read/write operations.
 */
async function ensureDriverReady(): Promise<typeof fsDriver> {
    if (initPromise) {
        await initPromise;
        return fsDriver;
    }

    initPromise = fsDriver.init().catch((error) => {
        initPromise = null;
        throw error;
    });

    await initPromise;

    return fsDriver;
}

/**
 * Persistent storage utility object for data persistence across application sessions.
 * Uses a filesystem-backed driver that stores JSON-encoded values on disk,
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
            const driver = await ensureDriverReady();
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
            const driver = await ensureDriverReady();

            await driver.setItem(key, value);
        }
        catch (error) {
            catchError(error);
            throw error;
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
            const driver = await ensureDriverReady();

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
            const driver = await ensureDriverReady();
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
            const storagePath = path.join(getEnv().CYBERSKILL_STORAGE_DIRECTORY, encodeKey(key));

            return `${storagePath} (key: ${key})`;
        }
        catch (error) {
            return catchError(error, { returnValue: null });
        }
    },

};

/**
 * Resets all module-level singleton state used by the storage module.
 * Intended for use in tests to ensure isolation between test cases.
 * Do NOT call this in production code.
 */
export function resetStorageForTesting(): void {
    initPromise = null;
    nodeFsDriverState.baseDir = '';
}
