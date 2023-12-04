module.exports = {
  root: true,
  files: ['*.ts', '*.tsx'],
  extends: ['prettier', 'plugin:react/jsx-runtime'],
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-react', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['/packages/tsconfig/base.json'],
    createDefaultProgram: true,
  },
};
