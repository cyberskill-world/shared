import type { UserConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { merge } from 'lodash-es';
import { defineConfig } from 'vitest/config';

import type { T_Object } from '#typescript/index.js';

export function vitestE2E(options: UserConfig) {
    const config = {
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
    };

    return defineConfig(merge(config, options as T_Object));
}
