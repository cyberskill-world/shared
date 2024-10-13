import simpleImportSort from 'eslint-plugin-simple-import-sort';

import globals from 'globals';

export default [
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: { ...globals.node },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
        },
    },
];
