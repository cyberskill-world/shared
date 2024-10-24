import js from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

import { T_Config } from '../typescript/index.js';
import { deepMerge } from '../utils/index.js';

export default {
    merge: (type = 'eslint', ...configs: T_Config[]) => {
        switch (type) {
            case 'eslint': {
                const { ignores, ...rest } = deepMerge(...configs);

                const normalizedIgnores = Array.isArray(ignores)
                    ? ignores.filter((item) => typeof item === 'string')
                    : undefined;

                const configArray = [
                    js.configs.recommended,
                    eslintPluginImportX.flatConfigs.recommended,
                    eslintPluginImportX.flatConfigs.typescript,
                    eslintPluginPrettierRecommended,
                    ...tseslint.configs.recommended,
                    rest,
                ];

                if (normalizedIgnores) {
                    configArray.push({ ignores: normalizedIgnores });
                }

                return tseslint.config(...configArray);
            }
            case 'prettier':
            case 'lint-staged':
            case 'commitlint': {
                return deepMerge(...configs);
            }
            default: {
                throw new Error(`Unknown type: ${type}`);
            }
        }
    },
};
