module.exports = {
  root: false,
  ignorePatterns: ["apps/**", "packages/**", ".eslintrc.js", "config/**"],
  extends: ["../../packages/eslint-config-custom/react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
};
