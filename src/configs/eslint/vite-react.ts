import baseConfig from './base.js';

export default [
    ...baseConfig,
    {
        ignores: ['dist', '.ncurc.cjs'],
        files: ['**/*.{ts,tsx}'],
    },
];
