declare const localStorage: {
    /**
     * Get the value of a key.
     * @param key The key to retrieve.
     * @returns A promise that resolves to the value associated with the key, or `null` if the key doesn't exist.
     */
    get<T = unknown>(key: string): Promise<T | null>;
    /**
     * Set the value for a key.
     * @param key The key to set.
     * @param value The value to store. Can be any serializable type.
     * @returns A promise that resolves once the value is stored.
     */
    set<T = unknown>(key: string, value: T): Promise<void>;
    /**
     * Remove the value associated with a key.
     * @param key The key to remove.
     * @returns A promise that resolves once the key is removed.
     */
    remove(key: string): Promise<void>;
    /**
     * Clear all keys and values in the storage.
     * @returns A promise that resolves once the storage is cleared.
     */
    clear(): Promise<void>;
    /**
     * Get the name of the key at a specific index.
     * @param index The index of the key.
     * @returns A promise that resolves to the key name or `null` if the index is out of bounds.
     */
    key(index: number): Promise<string | null>;
    /**
     * Get all keys in the storage.
     * @returns A promise that resolves to an array of all keys.
     */
    keys(): Promise<string[]>;
    /**
     * Get the number of items in the storage.
     * @returns A promise that resolves to the number of keys stored.
     */
    length(): Promise<number>;
    /**
     * Iterates over all key-value pairs in the storage.
     * @param iteratee A callback function that receives the value, key, and iteration number.
     * @returns A promise that resolves once iteration is complete.
     */
    iterate<T = unknown>(iteratee: (value: T, key: string, iterationNumber: number) => void): Promise<void>;
};

export { localStorage };
