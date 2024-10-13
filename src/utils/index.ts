import { T_Config } from '../typescript/index.js';

export * from './log.js';
export * from './mongoose.js';
export * from './validate.js';

export const deepMerge = (...configs: (T_Config | T_Config[])[]): T_Config => {
    const merge = (target: T_Config, source: T_Config): T_Config => {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (Array.isArray(source[key])) {
                    // If the value is an array, concatenate arrays and remove duplicates
                    const targetArray = Array.isArray(target[key])
                        ? target[key]
                        : [];
                    target[key] = [
                        ...new Set([...targetArray, ...source[key]]),
                    ];
                } else if (
                    typeof source[key] === 'object' &&
                    source[key] !== null &&
                    !Array.isArray(source[key])
                ) {
                    // If the value is an object (but not null), recursively merge
                    target[key] = merge(
                        typeof target[key] === 'object' &&
                            !Array.isArray(target[key])
                            ? target[key]
                            : {},
                        source[key],
                    );
                } else {
                    // Otherwise, directly assign the value (primitives: string, number, boolean)
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
