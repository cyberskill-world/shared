import type { AliasOptions } from 'vite';

import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

import { PROJECT_ROOT } from '../../../constants/index.js';

export default (alias: AliasOptions) => defineConfig({
    plugins: [react()],
    test: {
        include: ['**/*.test.unit.?(c|m)[jt]s?(x)'],
        globals: true,
        environment: 'jsdom',
        setupFiles: path.resolve(PROJECT_ROOT, './unit.setup.js'),
    },
    resolve: {
        alias,
    },
});
