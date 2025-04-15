import { mergeConfigs } from './dist/configs/index.js';

export default mergeConfigs('eslint', {
    rules: {
        'antfu/no-import-dist': 'off',
        'dot-notation': 'off',
    },
    ignores: ['.tsup', 'public/favicon/manifest.json'],
});
