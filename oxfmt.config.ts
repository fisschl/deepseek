import { defineConfig } from "oxfmt";

export default defineConfig({
  sortImports: {
    newlinesBetween: false,
  },
  ignorePatterns: [
    "**/.agents/**",
    "**/assets/**",
    "**/dist/**",
    "**/*.d.ts",
    "**/*.js",
    "**/*.mjs",
  ],
});
