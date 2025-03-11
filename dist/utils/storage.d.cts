declare const storage: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
    values<T = unknown>(): Promise<T[]>;
    entries<T = unknown>(): Promise<[string, T][]>;
    clear(): Promise<void>;
    length(): Promise<number>;
};

export { storage };
