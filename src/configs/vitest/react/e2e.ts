import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default (options: UserConfig) => defineConfig({
    plugins: [react()],
    test: {
        include: ['**/*.test.e2e.?(c|m)[jt]s?(x)'],
        browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
                { browser: 'chromium' },
                { browser: 'firefox' },
                { browser: 'webkit' },
            ],
        },
    },
    ...options,
});
