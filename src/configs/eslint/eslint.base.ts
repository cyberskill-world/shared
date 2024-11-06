import simpleImportSort from 'eslint-plugin-simple-import-sort';

import globals from 'globals';

export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        settings: {
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'import/no-dynamic-require': 'warn',
            'import/no-nodejs-modules': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'after-used',
                    ignoreRestSiblings: true,
                    vars: 'all',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^ignore',
                },
            ],
        },
    },
];
