/* eslint-disable @typescript-eslint/no-require-imports */
const {
    defineConfig,
} = require("eslint/config");


const globals = require("globals");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            ...globals.mocha,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 12,
        parserOptions: {},
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ),

    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "prefer-const": "error",
    },
}]);
