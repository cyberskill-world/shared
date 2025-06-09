import type { StorybookConfig } from '@storybook/react-vite';

import { PATH } from '#node/path/index.js';

export const vitestStorybookReactMain: StorybookConfig = {
    stories: [
        `${PATH.WORKING_DIRECTORY}/**/*.mdx`,
        `${PATH.WORKING_DIRECTORY}/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
    ],
    addons: [
        '@storybook/addon-onboarding',
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    staticDirs: [
        PATH.PUBLIC_DIRECTORY,
    ],
};

export default vitestStorybookReactMain;
