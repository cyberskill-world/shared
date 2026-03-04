// eslint-disable-next-line antfu/no-import-dist
// NOTE: This config imports from ./dist — the project must be built (`pnpm build`) before linting works.
import { mergeConfigs } from './dist/config/index.js';

export default mergeConfigs('eslint', {
    ignores: ['public/favicon/manifest.json'],
    rules: {
        'jsdoc/require-jsdoc': 'error',
    },
});
