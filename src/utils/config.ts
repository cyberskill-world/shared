import type { I_Config } from '#typescript/config.js';

export function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config {
    const merge = (target: Partial<I_Config>, source: I_Config): I_Config => {
        const result = { ...target };

        Object.keys(source).forEach((key) => {
            if (!Object.hasOwnProperty.call(source, key)) {
                return;
            }

            const sourceValue = source[key];
            const targetValue = result[key];

            if (Array.isArray(sourceValue)) {
                result[key] = [
                    ...new Set([
                        ...(Array.isArray(targetValue) ? targetValue : []),
                        ...sourceValue,
                    ]),
                ];
            }
            else if (
                typeof sourceValue === 'object'
                && sourceValue !== null
                && !Array.isArray(sourceValue)
            ) {
                result[key] = merge(
                    typeof targetValue === 'object' && targetValue !== null && !Array.isArray(targetValue)
                        ? targetValue
                        : {},
                    sourceValue,
                );
            }
            else {
                result[key] = sourceValue;
            }
        });

        return result as I_Config;
    };

    return configs
        .flatMap(config => (Array.isArray(config) ? config : [config]))
        .reduce((acc, config) => merge(acc, config), {} as I_Config);
}
