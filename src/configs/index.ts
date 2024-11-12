import type { T_Config } from '../typescript/index.js';

import antfu from '@antfu/eslint-config';
import { deepMerge } from '../utils/index.js';

export default {
    merge: (type = 'eslint', ...configs: T_Config[]) => {
        switch (type) {
            case 'eslint': {
                const { ignores, ...rest } = deepMerge(...configs);

                const normalizedIgnores = Array.isArray(ignores)
                    ? ignores.filter(item => typeof item === 'string')
                    : undefined;

                const configArray = [rest];

                if (normalizedIgnores) {
                    configArray.push({ ignores: normalizedIgnores });
                }

                return antfu(
                    {
                        stylistic: {
                            semi: true,
                            indent: 4,
                            quotes: 'single',
                        },
                    },
                    ...configArray,
                );
            }
            case 'commitlint': {
                return deepMerge(...configs);
            }
            default: {
                throw new Error(`Unknown type: ${type}`);
            }
        }
    },
};
