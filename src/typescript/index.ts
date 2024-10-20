export * from './command.js';
export * from './log.js';
export * from './mongoose.js';

export type T_Config = {
    [key: string]: string | number | boolean | T_Config | T_Config[];
};
