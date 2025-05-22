import antfu from '@antfu/eslint-config';

import type { T_Object } from '#typescript/common.js';

import { vitestE2E, vitestUnit } from '#config/vitest/index.js';
import { deepMerge } from '#util/object/index.js';

import type { T_ConfigHandler, T_ConfigType } from './config.type.js';

import { E_ConfigType } from './config.type.js';
import eslintBaseConfig from './eslint/index.js';

const handleESLint: T_ConfigHandler = (...config) => {
    const mergedConfig = deepMerge(
        eslintBaseConfig as unknown as T_Object,
        ...config.map(config => config as T_Object),
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
    [E_ConfigType.ESLINT]: config => handleESLint(config),
    [E_ConfigType.COMMITLINT]: config => deepMerge(config),
    [E_ConfigType.LINT_STAGED]: config => deepMerge(config),
    [E_ConfigType.VITEST_REACT_UNIT]: config => vitestUnit(config) as T_Object,
    [E_ConfigType.VITEST_REACT_E2E]: config => vitestE2E(config) as T_Object,
};

export function mergeConfigs(type: T_ConfigType, ...config: T_Object[]) {
    const handler = configHandlers[type];

    if (!config || config.length === 0) {
        return handler({});
    }

    if (!handler) {
        throw new Error(`Unknown config type: ${type}`);
    }

    return handler(...config);
}
