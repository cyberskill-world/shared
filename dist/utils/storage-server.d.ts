declare const storageDir: string;
declare function initNodePersist(): Promise<void>;
declare const storageServer: {
    get<T = unknown>(key: string): Promise<T | null>;
    set<T = unknown>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
    getLogLink(key: string): Promise<string | null>;
};

export { initNodePersist, storageDir, storageServer };
