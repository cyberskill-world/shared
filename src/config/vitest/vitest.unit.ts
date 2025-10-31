import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { merge } from 'lodash-es';
import { defineConfig } from 'vitest/config';

/**
 * Creates a Vitest configuration for unit testing with React support.
 * This function generates a Vitest configuration specifically designed for unit testing
 * React components and JavaScript/TypeScript modules. It includes JSDOM environment
 * for DOM simulation and comprehensive testing setup.
 *
 * The configuration includes:
 * - React SWC plugin for fast React compilation
 * - JSDOM environment for DOM simulation
 * - Global test functions availability
 * - VM threads pool for parallel test execution
 * - Unit test file pattern matching
 * - Setup files for testing library configuration
 * - Configurable options merging
 *
 * @param options - Additional Vite configuration options to merge with the unit test config.
 * @returns A Vitest configuration object optimized for unit testing with React and DOM support.
 */
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

    return defineConfig(merge(config, options));
}
