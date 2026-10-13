import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["build/", ".react-router/", "node_modules/"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  jsxA11y.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Safari drops list semantics from lists styled with `list-style: none`;
      // an explicit role="list" restores them, so it is not redundant here.
      "jsx-a11y-x/no-redundant-roles": [
        "error",
        { ul: ["list"], ol: ["list"] },
      ],
    },
  },
]);
