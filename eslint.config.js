import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import typescript from 'typescript-eslint';

export default defineConfig([
  ...typescript.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 6,
      sourceType: 'module',

      parserOptions: {
        parser: typescript.parser,
        allowImportExportEverywhere: true,
      },
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  globalIgnores([
    '**/snapshot*',
    '**/dist',
    '**/lib',
    '**/es',
    '**/esm',
    '**/node_modules',
    '**/static',
    '**/temp*',
    '**/static/',
    '!**/.prettierrc.js',
  ]),
]);
