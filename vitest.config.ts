import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Standalone vitest config — deliberately NOT reusing vite.config.ts, whose
// Lovable/TanStack Start plugin stack (router codegen, nitro, SSR entries)
// isn't needed to unit-test plain modules and would slow/complicate test runs.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
