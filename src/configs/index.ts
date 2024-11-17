import antfu from '@antfu/eslint-config';

import { T_Config } from '../typescript/index.js';
import { deepMerge } from '../utils/index.js';

export default {
    merge: (type = 'eslint', ...configs: T_Config[]) => {
        const mergeConfigs = () => deepMerge(...configs);

        if (type === 'eslint') {
            const { ignores, ...rest } = mergeConfigs();

            const normalizedIgnores = Array.isArray(ignores)
                ? ignores.filter(item => typeof item === 'string')
                : undefined;

            const configArray = [
                rest,
                normalizedIgnores ? { ignores: normalizedIgnores } : null,
            ].filter((item): item is Exclude<typeof item, null> => !!item);

            return antfu(
                {
                    stylistic: {
                        semi: true,
                        indent: 4,
                        quotes: 'single',
                    },
                    yaml: false,
                },
                ...configArray,
            );
        }

        if (type === 'commitlint') {
            return mergeConfigs();
        }

        throw new Error(`Unknown type: ${type}`);
    },
};
