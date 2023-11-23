module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["prettier", "plugin:react/jsx-runtime"],
  plugins: ["@typescript-eslint/eslint-plugin", "eslint-plugin-react", "@typescript-eslint", "import"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["../tsconfig/base.json"],
  },
};
