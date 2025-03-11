/* eslint-disable antfu/no-import-dist */
import config from './dist/configs/commitlint/base.js';
import configs from './dist/configs/index.js';

export default configs.merge('commitlint', config);
