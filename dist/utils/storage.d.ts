declare const storage: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
    /**
     * ✅ Get log path for the key
     * - Logs only the storage path and key (no direct opening)
     */
    getLogLink(key: string): Promise<string | null>;
};

export { storage };
