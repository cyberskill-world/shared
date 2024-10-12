import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default {
    merge: (type = 'eslint', rootConfig, ...configs) => {
        if (!configs.length) {
            return rootConfig;
        }

        switch (type) {
            case 'eslint': {
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
                return {
                    ...rootConfig,
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
                    { ...rootConfig },
                );
            }
            default: {
                throw new Error(`Unknown type: ${type}`);
            }
        }
    },
};
