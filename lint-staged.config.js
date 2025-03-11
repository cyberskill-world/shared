/* eslint-disable antfu/no-import-dist */
import configs from './dist/configs/index.js';
import config from './dist/configs/lint-staged/base.js';

export default configs.merge('eslint', config);
