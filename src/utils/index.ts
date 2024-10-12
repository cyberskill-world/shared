import { T_Config } from '../typescript/index.js';

export * from './log.js';
export * from './mongoose.js';
export * from './validate.js';

export const deepMerge = (...configs: (T_Config | T_Config[])[]): T_Config => {
    const merge = (target: T_Config, source: T_Config): T_Config => {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (Array.isArray(source[key])) {
                    // If the value is an array, concatenate arrays and remove duplicates
                    target[key] = [
                        ...new Set([...(target[key] || []), ...source[key]]),
                    ];
                } else if (
                    typeof source[key] === 'object' &&
                    source[key] !== null
                ) {
                    // If the value is an object (but not null), recursively merge
                    target[key] = merge(target[key] || {}, source[key]);
                } else {
                    // Otherwise, directly assign the value
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    // Handle the case where the input is an array of objects or just one object
    const flattenedConfigs = configs.flatMap((config) =>
        Array.isArray(config) ? config : [config],
    );

    return flattenedConfigs.reduce((acc, config) => merge(acc, config), {});
};
