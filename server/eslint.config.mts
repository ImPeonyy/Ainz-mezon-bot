import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from 'eslint-plugin-prettier';


export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node }
    },
    {
        files: ['**/*.{ts,mts,cts}'],
        ...tseslint.configs.recommended
    },
    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended']
    },
    {
        files: ['**/*.jsonc'],
        plugins: { json },
        language: 'json/jsonc',
        extends: ['json/recommended']
    },
    {
        files: ['**/*.json5'],
        plugins: { json },
        language: 'json/json5',
        extends: ['json/recommended']
    },
    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/gfm',
        extends: ['markdown/recommended']
    },
    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended']
    },
    {
        plugins: {
            prettier: eslintPluginPrettier
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            'prettier/prettier': [
                'warn',
                {
                    arrowParens: 'always',
                    semi: true,
                    trailingComma: 'none',
                    tabWidth: 4,
                    endOfLine: 'auto',
                    useTabs: false,
                    singleQuote: true,
                    printWidth: 120,
                    jsxSingleQuote: true
                }
            ]
        },
        ignores: ['**/node_modules/', '**/dist/']
    }
]);
