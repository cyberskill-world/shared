import { I_Config } from '../typescript/config.js';

declare function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config;

export { deepMerge };
