import * as globals from 'globals';

export default [
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.browser },
        },
        rules: {
            'antfu/top-level-function': 'off',
        },
    },
];
