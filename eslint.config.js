import configJS from '@maikovskii-danil/eslint-config-js';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  globalIgnores([
    'dist',
    'eslint.config.js',
    'playwright.config.ts',
    'tests',
    'tests-examples',
  ]),
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    extends: [
      configJS.configs.core,
      configJS.configs.linterOptionsDefault,
      configJS.configs.languageOptionsDefault,
      tseslint.configs.recommended,
    ],
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  {
    files: ['**/*.{tsx,jsx}'],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat['jsx-runtime'],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      ...pluginReact.configs.flat['jsx-runtime'].languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
]);
