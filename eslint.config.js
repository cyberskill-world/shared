// eslint-disable-next-line antfu/no-import-dist
import { mergeConfigs } from './dist/configs/index.js';

export default mergeConfigs('eslint', {
    rules: {
        'react-refresh/only-export-components': 'off',
    },
    ignores: ['.tsup', 'public/favicon/manifest.json'],
});
