import configs from './dist/configs/index.js';
import config from './dist/configs/prettier/prettier.base.js';

export default configs.merge('prettier', config);
