import type { UserConfig } from 'vite';

import antfu from '@antfu/eslint-config';

import type { T_Object } from '#typescript/common.js';
import type { T_ConfigHandler, T_ConfigType } from '#typescript/config.js';

import eslintBaseConfig from '#configs/eslint/base.js';
import vitestReactE2EConfig from '#configs/vitest/react/e2e.js';
import vitestReactUnitConfig from '#configs/vitest/react/unit.js';
import { E_ConfigType } from '#typescript/config.js';
import { deepMerge } from '#utils/common.js';

const passThroughHandler: T_ConfigHandler = (...configs) => {
    return deepMerge(...configs);
};

const handleESLint: T_ConfigHandler = (...configs) => {
    const { ignores, ...rest } = deepMerge(eslintBaseConfig, ...configs);

    const normalizedIgnores
        = Array.isArray(ignores) && ignores.every(item => typeof item === 'string')
            ? { ignores }
            : undefined;

    const configArray = [
        rest,
        ...(normalizedIgnores ? [normalizedIgnores] : []),
    ];

    return antfu(
        {
            stylistic: {
                semi: true,
                indent: 4,
                quotes: 'single',
            },
            formatters: {
                css: true,
                html: true,
                markdown: 'prettier',
            },
            yaml: false,
            react: true,
        },
        ...configArray,
    );
};

const handleVitestReactE2E: T_ConfigHandler = (...configs) => {
    return vitestReactE2EConfig(...(configs as [UserConfig]));
};

const handleVitestReactUnit: T_ConfigHandler = (...configs) => {
    return vitestReactUnitConfig(...(configs as [UserConfig]));
};

const configHandlers: Record<E_ConfigType, T_ConfigHandler> = {
    [E_ConfigType.ESLINT]: handleESLint,
    [E_ConfigType.COMMITLINT]: passThroughHandler,
    [E_ConfigType.LINT_STAGED]: passThroughHandler,
    [E_ConfigType.VITEST_REACT_E2E]: handleVitestReactE2E,
    [E_ConfigType.VITEST_REACT_UNIT]: handleVitestReactUnit,
};

export function mergeConfigs(type: T_ConfigType, ...configs: T_Object[]) {
    const handler = configHandlers[type];

    if (!handler) {
        throw new Error(`Unknown config type: ${type}`);
    }

    return handler(...configs);
}
