import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default {
    merge: (
        type: 'eslint' | 'prettier' | 'lint-staged' = 'eslint',
        rootConfig: Record<string, any>,
        ...configs: Record<string, any>[]
    ) => {
        const mergeConfigs = (
            baseConfig: Record<string, any>,
            configs: Record<string, any>[],
        ) =>
            configs.reduce((acc, config) => Object.assign(acc, config), {
                ...baseConfig,
            });

        const recommendedEslintConfigs = [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            eslintPluginPrettierRecommended,
        ];

        switch (type) {
            case 'eslint': {
                return tseslint.config(
                    ...recommendedEslintConfigs,
                    mergeConfigs(rootConfig, configs),
                );
            }
            case 'prettier': {
                return mergeConfigs(rootConfig, configs);
            }
            case 'lint-staged': {
                return configs.reduce(
                    (mergedConfig, config) => {
                        for (const [pattern, commands] of Object.entries(
                            config,
                        )) {
                            mergedConfig[pattern] = mergedConfig[pattern]
                                ? Array.from(
                                      new Set([
                                          ...mergedConfig[pattern],
                                          ...commands,
                                      ]),
                                  )
                                : commands;
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
