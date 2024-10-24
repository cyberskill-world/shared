import baseConfig from './eslint.base.js';

export default [
    ...baseConfig,
    {
        extends: 'next/core-web-vitals',
        ignores: ['.next', 'next.config.js'],
    },
];
