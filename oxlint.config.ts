import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: [
    "**/.agents/**",
    "**/assets/**",
    "**/dist/**",
    "**/*.d.ts",
    "**/*.js",
    "**/*.mjs",
  ],
  plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "promise"],
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
