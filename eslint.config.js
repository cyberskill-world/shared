/* eslint-disable antfu/no-import-dist */
import config from './dist/configs/eslint/nodejs.js';
import configs from './dist/configs/index.js';

export default configs.merge('eslint', config, {
    ignores: ['src/public/favicon/manifest.json'],
});
