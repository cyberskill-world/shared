import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: { ...globals.node },
            parserOptions: {
                projectService: true,
            },
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-var-requires': 'warn',
        },
    },
    {
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
);
