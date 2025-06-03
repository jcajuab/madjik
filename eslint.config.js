import { fileURLToPath } from "node:url"

import { includeIgnoreFile } from "@eslint/compat"
import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import prettier from "eslint-config-prettier/flat"
import react from "eslint-plugin-react"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"
import typescript from "typescript-eslint"

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url))

const eslintPluginReactConfig = {
  files: ["**/*.{jsx,tsx}"],
  plugins: { react },
  rules: {
    ...react.configs.flat.recommended.rules,
    ...react.configs.flat["jsx-runtime"].rules,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      jsxPragma: null,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}

const eslintPluginSimpleImportSortConfig = {
  files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
}

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  globalIgnores(["src-tauri/"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    rules: js.configs.recommended.rules,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  typescript.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginReactConfig,
  eslintPluginSimpleImportSortConfig,
  prettier,
])
