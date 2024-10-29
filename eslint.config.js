import config from './dist/configs/eslint/eslint.nodejs.js';
import configs from './dist/configs/index.js';

export default configs.merge('eslint', config, {
    rules: {
        'no-console': 'warn',
        'import/no-nodejs-modules': [
            'error',
            { allow: ['path', 'fs', 'url', 'util', 'child_process'] },
        ],
    },
});
