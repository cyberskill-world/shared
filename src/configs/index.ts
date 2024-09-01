import tseslint from 'typescript-eslint';

export default {
    merge: (type = 'eslint', baseConfig, ...configs) => {
        if (!configs.length) {
            return baseConfig;
        }

        switch (type) {
            case 'eslint': {
                return tseslint.config(...baseConfig, ...configs);
            }
            case 'prettier': {
                return {
                    ...baseConfig,
                    ...configs.reduce(
                        (acc, config) => ({ ...acc, ...config }),
                        {},
                    ),
                };
            }
            case 'lint-staged': {
                return configs.reduce(
                    (mergedConfig, config: Record<string, string[]>) => {
                        for (const [pattern, commands] of Object.entries(
                            config,
                        )) {
                            if (mergedConfig[pattern]) {
                                mergedConfig[pattern] = Array.from(
                                    new Set([
                                        ...mergedConfig[pattern],
                                        ...commands,
                                    ]),
                                );
                            } else {
                                mergedConfig[pattern] = commands;
                            }
                        }
                        return mergedConfig;
                    },
                    { ...baseConfig },
                );
            }
            default: {
                throw new Error(`Unknown type: ${type}`);
            }
        }
    },
};
