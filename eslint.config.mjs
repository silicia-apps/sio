// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin'
import nxEslintPlugin from '@nx/eslint-plugin';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [{
  ignores: ['**/dist'],
}, { plugins: { '@nx': nxEslintPlugin , '@stylistic': stylistic } }, {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  rules: {
    '@nx/enforce-module-boundaries': [
      'error',
      {
        enforceBuildableLibDependency: true,
        allow: [],
        depConstraints: [
          {
            sourceTag: '*',
            onlyDependOnLibsWithTags: ['*'],
          },
        ],
      },
    ],
  },
}, ...compat
  .config({
    extends: ['plugin:@nx/typescript'],
  })
  .map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    rules: {
      ...config.rules,
      '@stylistic/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  })), ...compat
  .config({
    extends: ['plugin:@nx/javascript'],
  })
  .map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    rules: {
      ...config.rules,
      '@stylistic/no-extra-semi': 'error',
      'no-extra-semi': 'off',
    },
  })), ...compat
  .config({
    env: {
      jest: true,
    },
  })
  .map((config) => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...config.rules,
    },
  })), ...storybook.configs["flat/recommended"]];
