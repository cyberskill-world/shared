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
            'no-unused-vars': 'warn',
            'import/no-dynamic-require': 'warn',
            'import/no-nodejs-modules': 'warn',
        },
    },
];
