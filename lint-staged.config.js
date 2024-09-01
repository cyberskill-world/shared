import configs from './dist/configs/index.js';
import config from './dist/configs/lint-staged/lint-staged.base.js';

export default configs.merge('lint-staged', config);
