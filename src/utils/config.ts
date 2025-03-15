import type {
    I_Config,
} from '../typescript/config.js';

// Utility to deeply merge configurations
export function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config {
    const merge = (target: I_Config, source: I_Config): I_Config => {
        Object.keys(source).forEach((key) => {
            const sourceValue = source[key];
            const targetValue = target[key];

            if (Array.isArray(sourceValue)) {
                // Merge arrays and remove duplicates
                target[key] = [
                    ...new Set([...(Array.isArray(targetValue) ? targetValue : []), ...sourceValue]),
                ];
            }
            else if (
                typeof sourceValue === 'object'
                && sourceValue !== null
                && !Array.isArray(sourceValue)
            ) {
                // Recursively merge objects
                target[key] = merge(
                    typeof targetValue === 'object' && !Array.isArray(targetValue)
                        ? targetValue
                        : {},
                    sourceValue,
                );
            }
            else {
                // Overwrite with primitive values
                target[key] = sourceValue;
            }
        });
        return target;
    };

    // Flatten configs and merge them
    return configs
        .flatMap(config => (Array.isArray(config) ? config : [config]))
        .reduce((acc, config) => merge(acc, config), {});
}
