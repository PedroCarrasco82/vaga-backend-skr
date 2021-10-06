module.exports = {
    "root": true,
    "env": {
      es6: true,
      node: true,
    },
    "extends": [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "google",
      "plugin:@typescript-eslint/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      tsconfigRootDir: __dirname,
      project: ["tsconfig.json", "tsconfig.dev.json"],
      sourceType: "module",
    },
    "ignorePatterns": [
      "/dist/**/*", // Ignore built files.
    ],
    "plugins": [
      "@typescript-eslint",
      "import",
    ],
    "rules": {
      "quotes": ["error", "double"],
      "import/no-unresolved": 0,
      "require-jsdoc": 0,
      "no-extra-semi": 0,
      "semi": 0,
      "max-len": 0,
    },
  };
  