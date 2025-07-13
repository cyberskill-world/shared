import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { merge } from 'lodash-es';
import { defineConfig } from 'vitest/config';

import type { T_Object } from '#typescript/index.js';

export function vitestUnit(options: UserConfig) {
    const config = {
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            pool: 'vmThreads',
            include: ['**/*.test.unit.?(c|m)[jt]s?(x)'],
            setupFiles: ['./vitest.unit.setup.ts'],
        },
    };

    return defineConfig(merge(config, options as T_Object));
}
