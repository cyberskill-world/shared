import type { StorybookConfig } from '@storybook/nextjs-vite';

import { PATH } from '#node/path/index.js';

export const vitestStorybookNextJSMain: StorybookConfig = {
    stories: [
        '**/*.mdx',
        '**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-onboarding',
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
    ],
    framework: {
        name: '@storybook/nextjs-vite',
        options: {},
    },
    staticDirs: [
        PATH.PUBLIC_DIRECTORY,
    ],
};
