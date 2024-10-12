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
            '@typescript-eslint/no-require-imports': 'warn',
            '@typescript-eslint/no-var-requires': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-expressions': 'warn',
            'no-console': 'warn',
            'no-debugger': 'warn',
        },
    },
];
