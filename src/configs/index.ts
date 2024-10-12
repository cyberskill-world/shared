import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

import { T_Config } from '../typescript/index.js';
import { deepMerge } from '../utils/index.js';

export default {
    merge: (type = 'eslint', ...configs: T_Config[]) => {
        switch (type) {
            case 'eslint': {
                return tseslint.config(
                    eslint.configs.recommended,
                    ...tseslint.configs.recommended,
                    eslintPluginPrettierRecommended,
                    deepMerge(configs),
                );
            }
            case 'prettier': {
                return deepMerge(configs);
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
                );
            }
            default: {
                throw new Error(`Unknown type: ${type}`);
            }
        }
    },
};
