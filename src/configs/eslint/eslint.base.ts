import * as globals from 'globals';

export default [
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'ts/consistent-type-imports': 'off',
            'ts/consistent-type-exports': 'off',
            'perfectionist/sort-imports': ['error', {
                internalPattern: ['#*', '#*/**'],
                groups: [
                    'type',
                    ['parent-type', 'sibling-type', 'index-type'],
                    'builtin',
                    'external',
                    ['internal', 'internal-type'],
                    ['parent', 'sibling', 'index'],
                    'side-effect',
                    'object',
                    'unknown',
                ],
                newlinesBetween: 'ignore',
                order: 'asc',
                type: 'natural',
            }],
        },
    },
];
