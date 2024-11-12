export * from './command.js';
export * from './log.js';
export * from './mongoose.js';

export interface T_Config {
    [key: string]: string | number | boolean | T_Config | T_Config[];
}

export interface I_SlugifyOptions {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
}
