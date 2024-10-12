import baseConfig from './eslint.base.js';

export default [
    ...baseConfig,
    {
        ignores: ['build', 'dist'],
    },
];
