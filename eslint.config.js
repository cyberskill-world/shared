import config from './dist/configs/eslint/eslint.nodejs.js';
import configs from './dist/configs/index.js';

export default configs.merge('eslint', config);
