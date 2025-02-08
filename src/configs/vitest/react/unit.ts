import type { AliasOptions } from 'vite';

import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

import { DIRNAME } from '../../../constants/index.js';

export default (alias: AliasOptions) => defineConfig({
    plugins: [react()],
    test: {
        include: ['**/*.test.unit.?(c|m)[jt]s?(x)'],
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(DIRNAME, './unit.setup.js'),
    },
    resolve: {
        alias,
    },
});
