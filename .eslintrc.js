module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    import: {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'linebreak-style': 0,
    'import/extensions': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
  },
};