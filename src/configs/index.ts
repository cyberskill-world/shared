import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default {
    merge: (type = 'eslint', rootConfig, ...configs) => {
        switch (type) {
            case 'eslint': {
                if (!configs.length) {
                    return tseslint.config(
                        eslint.configs.recommended,
                        ...tseslint.configs.recommended,
                        eslintPluginPrettierRecommended,
                        ...rootConfig,
                    );
                }

                return tseslint.config(
                    eslint.configs.recommended,
                    ...tseslint.configs.recommended,
                    eslintPluginPrettierRecommended,
                    ...rootConfig,
                    ...configs.reduce(
                        (acc, config) => ({ ...acc, ...config }),
                        {},
                    ),
                );
            }
            case 'prettier': {
                if (!configs.length) {
                    return rootConfig;
                }

                return {
                    ...rootConfig,
                    ...configs.reduce(
                        (acc, config) => ({ ...acc, ...config }),
                        {},
                    ),
                };
            }
            case 'lint-staged': {
                if (!configs.length) {
                    return rootConfig;
                }

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
                    { ...rootConfig },
                );
            }
            default: {
                throw new Error(`Unknown type: ${type}`);
            }
        }
    },
};
