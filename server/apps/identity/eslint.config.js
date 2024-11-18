import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettierRecommended from 'eslint-config-prettier';
import jestRecommended from 'eslint-plugin-jest';
import securityRecommended from 'eslint-plugin-security';
import unicornRecommended from 'eslint-plugin-unicorn';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    ...jestRecommended.configs.recommended,
    ...unicornRecommended.configs.recommended,
    ...securityRecommended.configs.recommended,
  },
});

export default [
  {
    ignores: [
      'data/docker/volumes/mysql',
      'data/migrations/*.ts',
      'data/scripts/*.js',
      'node_modules',
      '.vscode',
      '.editorconfig',
      '.husky',
      'dist',
      'vite.config.ts',
      'setup-husky.js',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.json',
      'public',
    ],
  },
  ...fixupConfigRules(compat.extends()),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslintPlugin),
    },
    languageOptions: {
      parser: parser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals['es2022'],
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
    rules: {
      ...prettierRecommended.rules,
      'unicorn/prevent-abbreviations': 'off',
      'jest/expect-expect': 'off',
      'unicorn/prefer-top-level-await': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': [
        'error',
        {
          code: 120,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreUrls: true,
        },
      ],
      'no-console': ['error'],
      complexity: ['error', 5],
    },
  },
];
