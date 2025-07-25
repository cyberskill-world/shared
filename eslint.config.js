// eslint-disable-next-line antfu/no-import-dist
import { mergeConfigs } from './dist/config/index.js';

export default mergeConfigs('eslint', {
    ignores: ['public/favicon/manifest.json'],
    rules: {
        'jsdoc/require-jsdoc': 'error',
    },
});
