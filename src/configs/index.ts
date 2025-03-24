import antfu from '@antfu/eslint-config';

import type { I_Config } from '#typescript/config.js';

import { deepMerge } from '#utils/config.js';

export default {
    merge: (type: string = 'eslint', ...configs: I_Config[]) => {
        const mergeConfigs = () => deepMerge(...configs);

        if (type === 'eslint') {
            const { ignores, ...rest } = mergeConfigs();

            const normalizedIgnores
                = Array.isArray(ignores) && ignores.every(item => typeof item === 'string')
                    ? { ignores }
                    : undefined;

            const configArray: object[] = [
                rest,
                ...(normalizedIgnores ? [normalizedIgnores] : []),
            ];

            return antfu(
                {
                    stylistic: {
                        semi: true,
                        indent: 4,
                        quotes: 'single',
                    },
                    yaml: false,
                    react: true,
                    formatters: {
                        css: true,
                        html: true,
                        markdown: 'prettier',
                    },
                },
                ...configArray,
            );
        }

        if (type === 'commitlint' || type === 'lint-staged' || type === 'vitest') {
            return mergeConfigs();
        }

        throw new Error(`Unknown type: ${type}`);
    },
};
