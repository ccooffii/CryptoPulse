module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 2021, sourceType: "module" },
  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  rules: {
    // project preferences
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "prettier/prettier": "warn",
  },
  settings: { react: { version: "detect" } },
  ignorePatterns: [
    ".next",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "*.min.js",
  ],
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
      },
    },
  ],
};
