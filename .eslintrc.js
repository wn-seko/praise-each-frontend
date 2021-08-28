// eslint-disable-next-line node/no-process-env
const isPrecommit = process.env.LINT_ENV === 'precommit'

const defaultConfig = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:react/recommended',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'jsdoc'],
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
    'prettier/prettier': [
      'error',
      {
        semi: false,
        trailingComma: 'all',
        arrowParens: 'always',
        singleQuote: true,
      },
    ],
    'node/no-process-env': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
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
    'jsdoc/valid-types': 'off',
    'react/prop-types': 'off',
  },
}

const tsConfig = {
  ...defaultConfig,
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'react', 'jsdoc'],
  rules: {
    ...defaultConfig.rules,
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
      },
    ],
  },
}

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
}
