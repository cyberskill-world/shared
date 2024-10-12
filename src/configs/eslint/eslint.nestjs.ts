import baseConfig from './eslint.base.js';

export default [
    baseConfig,
    {
        ignores: ['dist'],
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
];
