// @ts-check
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import ts from 'typescript-eslint';
import pluginTailwindCSS from 'eslint-plugin-tailwindcss';
import * as pluginImport from 'eslint-plugin-import';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
const IGNORES_PATHS = [
  '.next/*',
  '.swr',
  '.husky',
  'public',
  'node_modules',
  'dist/*',
  '.vercel',
  '.vscode',
];
const patchedConfig = fixupConfigRules([...compat.extends('next/core-web-vitals')]);
//pluginImport.rules
const config = [
  { ignores: IGNORES_PATHS },
  ...patchedConfig,
  ...ts.configs.recommended,
  ...pluginTailwindCSS.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    rules: {
      ...pluginTailwindCSS.configs.recommended.rules,
      ...pluginImport.flatConfigs?.recommended?.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'local',
          varsIgnorePattern: '^_',
          args: 'none',
          argsIgnorePattern: '[iI]gnored',
          caughtErrors: 'all',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'import/order': [
        1,
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            ...getDirectoriesToSort().map(singleDir => ({
              pattern: `${singleDir}/**`,
              group: 'internal',
            })),
            {
              pattern: 'env',
              group: 'internal',
            },
            {
              pattern: 'theme',
              group: 'internal',
            },
            {
              pattern: 'public/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      "import/named": "off",
      "import/no-unresolved": "off",
      'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: false }],
      'no-undef': ['warn', { typeof: false }],
      'react-hooks/rules-of-hooks': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off',
      'testing-library/prefer-screen-queries': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];

function getDirectoriesToSort() {
  return getDirectories(process.cwd()).filter(f => !IGNORES_PATHS.includes(f));
}

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

export default config;
