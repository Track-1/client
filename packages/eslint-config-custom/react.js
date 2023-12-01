module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["prettier"],
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
    "prettier/prettier": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "no-var": 1,
    "@typescript-eslint/no-explicit-any": 1,
    "no-unused-vars": 1,
  },
  parserOptions: {
    project: ["../tsconfig/base.json"],
  },
};
