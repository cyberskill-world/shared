import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

import { PATH } from '#constants/path.js';

export default (options: UserConfig) => defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        pool: 'vmThreads',
        include: ['**/*.test.unit.?(c|m)[jt]s?(x)'],
        setupFiles: [PATH.CYBERSKILL.UNIT_TEST_SETUP_CONFIG],
    },
    ...options,
});
