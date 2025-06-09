import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineConfig } from 'vitest/config';

import { PATH } from '#node/path/index.js';

export * from './main.js';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export function vitestStorybookReact() {
    return defineConfig({
        test: {
            workspace: [
                {
                    extends: true,
                    plugins: [
                        // The plugin will run tests for the stories defined in your Storybook config
                        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                        storybookTest({ configDir: PATH.VITEST_STORYBOOK_REACT }),
                    ],
                    test: {
                        name: 'storybook',
                        browser: {
                            enabled: true,
                            headless: true,
                            provider: 'playwright',
                            instances: [{ browser: 'chromium' }],
                        },
                        setupFiles: [PATH.VITEST_UNIT_SETUP_CONFIG],
                    },
                },
            ],
        },
    });
};
