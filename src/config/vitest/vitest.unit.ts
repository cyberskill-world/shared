import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export function vitestUnit(options: UserConfig) {
    return defineConfig({
        plugins: [react(), ...(options.plugins ?? [])],
        test: {
            globals: true,
            environment: 'jsdom',
            pool: 'vmThreads',
            include: ['**/*.test.unit.?(c|m)[jt]s?(x)'],
            setupFiles: ['./vitest.unit.setup.ts'],
            ...(options.test ?? {}),
        },
        ...options,
    });
}
