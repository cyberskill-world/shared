import type localForage from 'localforage';

export type LocalForageDriver = Parameters<typeof localForage.defineDriver>[0];

export interface NodeLocalForageOptions {
    driver?: string | string[];
    size?: number;
    version?: number;
    description?: string;
    name?: string;
    storeName?: string;
    // custom extension point for our filesystem driver
    baseDir?: string;
}

export interface NodeFsDriverState {
    baseDir: string;
}
