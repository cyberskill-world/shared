import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

import type { T_Object } from '#typescript/index.js';

import { deepMerge } from '#util/object/index.js';

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

    return defineConfig(deepMerge(config, options as T_Object));
}
