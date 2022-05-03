// eslint-disable-next-line node/no-process-env
const isPrecommit = process.env.LINT_ENV === 'precommit';

const defaultConfig = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'eslint-config-prettier',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'eslint-plugin-import'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'node/no-process-env': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/es-builtins': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-extraneous-import': 'off',
    'no-console': isPrecommit
      ? ['error', { allow: ['info', 'warn', 'error'] }]
      : ['warn', { allow: ['info', 'warn', 'error'] }],
    'no-debugger': isPrecommit ? 'error' : 'warn',
    'no-restricted-globals': [
      'error',
      {
        name: 'fetch',
        message: 'deprecated: Use axios',
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [{ pattern: '~/**', group: 'internal', position: 'before' }],
      },
    ],
  },
};

const tsConfig = {
  ...defaultConfig,
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    ...defaultConfig.rules,
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
  },
};

module.exports = {
  ...defaultConfig,
  root: true,
  overrides: [
    // {
    //   ...tsConfig,
    //   files: ['**/*.test.ts', '**/*.test.tsx'],
    //   env: {
    //     ...tsConfig.env,
    //     jest: true,
    //   },
    // },
    {
      ...tsConfig,
      files: ['**/*.ts'],
    },
    {
      ...tsConfig,
      files: ['**/*.tsx'],
      rules: {
        ...tsConfig.rules,
        'jsdoc/require-param': 'off',
        'jsdoc/require-returns': 'off',
      },
    },
  ],
};
