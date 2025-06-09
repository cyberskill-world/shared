import * as globals from 'globals';

export default [
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
        },
        rules: {
            'perfectionist/sort-imports': ['error', {
                internalPattern: ['^#.*', '^@/.*'],
            }],
            'dot-notation': 'off',
        },
        ignores: ['build', 'dist', '!.storybook'],
    },
];
