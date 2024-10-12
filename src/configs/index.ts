import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

import { T_Config } from '../typescript/index.js';
import { deepMerge } from '../utils/index.js';

export default {
    merge: (type = 'eslint', ...configs: T_Config[]) => {
        switch (type) {
            case 'eslint': {
                const { ignores, ...rest } = deepMerge(...configs);

                return tseslint.config(
                    eslint.configs.recommended,
                    ...tseslint.configs.recommended,
                    eslintPluginPrettierRecommended,
                    rest,
                    { ignores },
                );
            }
            case 'prettier':
            case 'lint-staged': {
                return deepMerge(...configs);
            }
            default: {
                throw new Error(`Unknown type: ${type}`);
            }
        }
    },
};
