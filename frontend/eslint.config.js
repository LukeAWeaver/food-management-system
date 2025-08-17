// eslint.config.mjs
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Ignore generated/build output
  { ignores: ['**/node_modules/**', '**/dist/**', '**/.expo/**', '**/.tamagui/**'] },

  // Base JS rules
  js.configs.recommended,

  // Treat config/build files as Node/CommonJS
  {
    files: [
      'babel.config.*',
      'metro.config.*',
      'jest.config.*',
      '*.config.*',
      '*.configs.*',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,   // gives require, module, __dirname, process, etc.
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },

  // TypeScript / React Native app code
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        // RN + browser-ish globals used in your code
        ...globals.browser,   // window, document, etc.
        ...globals.es2021,
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        alert: 'readonly',
        process: 'readonly',
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      // Use TS-aware rule only; allow unused function params (item, index)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'none', ignoreRestSiblings: true },
      ],
    },
  },

  // The Tamagui module augmentation file: don’t flag its “unused” interface
  {
    files: ['**/tamagui.config.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
