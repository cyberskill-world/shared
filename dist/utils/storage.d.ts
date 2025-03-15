declare const storageDir: string;
declare const storage: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
    getLogLink(key: string): Promise<string | null>;
};

export { storage, storageDir };
