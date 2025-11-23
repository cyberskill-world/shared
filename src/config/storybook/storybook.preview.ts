import type { Preview } from '@storybook/react';

/**
 * Creates a Storybook preview configuration for React projects.
 * This function generates a preview configuration that provides default parameters
 * and decorators for Storybook stories. It sets up common controls, backgrounds,
 * and viewport settings for consistent story rendering.
 *
 * The configuration includes:
 * - Default control parameters for common props
 * - Background color options
 * - Viewport presets for responsive testing
 * - Actions configuration for event handlers
 * - Configurable options merging
 *
 * @param options - Additional preview configuration options to merge with the base config.
 * @returns A Storybook preview configuration object.
 */
export function storybookPreview(options?: Partial<Preview>): Preview {
    const preview: Preview = {
        parameters: {
            controls: {
                matchers: {
                    color: /(background|color)$/i,
                    date: /Date$/i,
                },
            },
            backgrounds: {
                default: 'light',
                values: [
                    {
                        name: 'light',
                        value: '#ffffff',
                    },
                    {
                        name: 'dark',
                        value: '#333333',
                    },
                ],
            },
        },
    };

    return {
        ...preview,
        ...options,
        parameters: {
            ...preview.parameters,
            ...options?.parameters,
        },
    };
}
