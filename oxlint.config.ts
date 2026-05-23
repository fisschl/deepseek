import { defineConfig } from "oxlint";

export const ignorePatterns = ["**/.agents/**", "**/dist/**", "*.d.ts"];

export default defineConfig({
  ignorePatterns,
  plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "promise"],
});
