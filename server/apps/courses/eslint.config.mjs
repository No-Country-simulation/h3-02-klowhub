import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettierRecommended from 'eslint-config-prettier';
import jestRecommended from 'eslint-plugin-jest';
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
  },
});

const baseConfig = {
  plugins: {
    '@typescript-eslint': fixupPluginRules(typescriptEslintPlugin),
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.jest,
      ...globals['es2022'],
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  rules: {
    ...prettierRecommended.rules,
    'unicorn/prevent-abbreviations': 'off',
    'jest/expect-expect': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreComments: true,
      },
    ],
    'no-console': "off",
    complexity: ['error', 20],
  },
};

export default [
  {
    ignores: [
      'node_modules',
      '.vscode',
      '.editorconfig',
      'dist/**',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.json',
      'public',
      "eslint.config.js",
      'coverage/**', 
      'build/**', 
    ],
  },
  ...fixupConfigRules(compat.extends()),
  {
    ...baseConfig,
    files: ['**/*.js', '**/*.mjs'],
  },
  {
    ...baseConfig,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ...baseConfig.languageOptions,
      parser: parser,
      parserOptions: {
        ...baseConfig.languageOptions.parserOptions,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      ...baseConfig.rules,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-duplicate-imports': 'error',
      'no-unused-private-class-members': 'error',
    },
  },
];
