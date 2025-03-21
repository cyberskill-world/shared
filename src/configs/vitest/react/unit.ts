import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

import { PROJECT_ROOT } from '../../../constants/path.js';

export default (options: UserConfig) => defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        pool: 'vmThreads',
        include: ['**/*.test.unit.?(c|m)[jt]s?(x)'],
        setupFiles: path.resolve(PROJECT_ROOT, './unit.setup.js'),
    },
    ...options,
});
