import { defineConfig } from "oxfmt";
import { ignorePatterns } from "./oxlint.config";

export default defineConfig({
  sortImports: {
    newlinesBetween: false,
  },
  ignorePatterns,
});
