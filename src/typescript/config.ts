import type { T_Object } from './common.js';

export enum E_ConfigType {
    ESLINT = 'eslint',
    COMMITLINT = 'commitlint',
    LINT_STAGED = 'lint-staged',
    VITEST = 'vitest',
}

export type T_ConfigType = `${E_ConfigType}`;

export type T_ConfigHandler = (...configs: T_Object[]) => T_Object;
