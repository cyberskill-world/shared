/* eslint-disable ts/ban-ts-comment */
// @ts-ignore
import reactHooks from 'eslint-plugin-react-hooks';
// @ts-ignore
import reactRefresh from 'eslint-plugin-react-refresh';

import baseConfig from './eslint.base.js';

export default [
    ...baseConfig,
    {
        ignores: ['dist', '.ncurc.cjs'],
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
];
