import * as eslint_flat_config_utils from 'eslint-flat-config-utils';
import * as _antfu_eslint_config from '@antfu/eslint-config';
import { I_Config } from '../typescript/config.cjs';

declare const _default: {
    merge: (type?: string, ...configs: I_Config[]) => I_Config | eslint_flat_config_utils.FlatConfigComposer<_antfu_eslint_config.TypedFlatConfigItem, _antfu_eslint_config.ConfigNames>;
};

export { _default as default };
