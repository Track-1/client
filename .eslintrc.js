module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
  extends: ['prettier'],
  rules: {
    'no-var': 1,
    '@typescript-eslint/no-explicit-any': 1,
    'no-unused-vars': 1,
  },
};
