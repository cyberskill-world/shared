// eslint-disable-next-line antfu/no-import-dist
import { mergeConfigs } from './dist/config/index.js';

export default mergeConfigs('eslint', {
    ignores: ['.tsup', 'public/favicon/manifest.json'],
    rules: {
        'unicorn/prefer-node-protocol': 'off',
    },
});
