import * as globals from 'globals';

export default [
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-alert': 'warn',
            'ts/consistent-type-exports': 'warn',
            'perfectionist/sort-imports': ['error', {
                internalPattern: ['^#.*', '^@/.*'],
            }],
        },
    },
];
