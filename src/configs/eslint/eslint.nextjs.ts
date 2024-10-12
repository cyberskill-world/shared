import baseConfig from './eslint.base.js';

export default [
    ...baseConfig,
    {
        ignores: ['.next', 'next.config.js'],
    },
];
