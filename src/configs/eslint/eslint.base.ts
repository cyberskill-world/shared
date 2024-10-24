import simpleImportSort from 'eslint-plugin-simple-import-sort';

import globals from 'globals';

export default [
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-unused-vars': 'warn',
            'import-x/no-dynamic-require': 'warn',
            'import-x/no-nodejs-modules': 'warn',
        },
    },
];
