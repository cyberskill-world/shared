import antfu from '@antfu/eslint-config';

import type { T_Object } from '#typescript/common.js';

import { vitestE2E, vitestUnit } from '#react/vitest/index.js';
import { deepMerge } from '#utils/object/index.js';

import type { T_ConfigHandler, T_ConfigType } from './config.type.js';

import { E_ConfigType } from './config.type.js';
import eslintBaseConfig from './eslint/index.js';

const handleESLint: T_ConfigHandler = (...configs) => {
    const mergedConfig = deepMerge(
        eslintBaseConfig as unknown as T_Object,
        ...configs.map(config => config as T_Object),
    ) as T_Object;
    const { ignores, ...rest } = mergedConfig;

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
    ) as unknown as T_Object;
};

const configHandlers: Record<E_ConfigType, T_ConfigHandler> = {
    [E_ConfigType.ESLINT]: configs => handleESLint(configs),
    [E_ConfigType.COMMITLINT]: configs => deepMerge(configs),
    [E_ConfigType.LINT_STAGED]: configs => deepMerge(configs),
    [E_ConfigType.VITEST_REACT_UNIT]: configs => vitestUnit(configs) as T_Object,
    [E_ConfigType.VITEST_REACT_E2E]: configs => vitestE2E(configs) as T_Object,
};

export function mergeConfigs(type: T_ConfigType, ...configs: T_Object[]) {
    const handler = configHandlers[type];

    if (!handler) {
        throw new Error(`Unknown config type: ${type}`);
    }

    return handler(...configs);
}
