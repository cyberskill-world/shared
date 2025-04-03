/* eslint-disable antfu/no-import-dist */
import config from './dist/configs/eslint/nodejs.js';
import configs from './dist/configs/index.js';

export default configs.merge('eslint', config, {
    rules: {
        'react-refresh/only-export-components': 'off',
    },
    ignores: ['.tsup', 'public/favicon/manifest.json'],
});
