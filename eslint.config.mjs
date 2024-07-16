import globals from 'globals';
import pluginJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

// Import recommended configurations
const jsRecommended = pluginJs.configs.recommended;
const reactRecommended = pluginReact.configs.recommended;
const tsRecommended = tsPlugin.configs.recommended;

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      prettier: prettierPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...jsRecommended.rules,
      ...reactRecommended.rules,
      ...tsRecommended.rules,
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
];
