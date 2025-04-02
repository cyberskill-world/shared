import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

import { CYBERSKILL_DIRECTORY } from '#constants/path.js';
import { resolveWorkingPath } from '#utils/path.js';

const SETUP_PATH = 'configs/vitest/react/unit.setup.js';

export default (options: UserConfig) => defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        pool: 'vmThreads',
        include: ['**/*.test.unit.?(c|m)[jt]s?(x)'],
        setupFiles: [
            resolveWorkingPath(`src/${SETUP_PATH}`),
            resolveWorkingPath(`${CYBERSKILL_DIRECTORY}/${SETUP_PATH}`),
        ],
    },
    ...options,
});
