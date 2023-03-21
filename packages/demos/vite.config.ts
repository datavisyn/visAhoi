import { defineConfig } from "vite";
// import { svelte } from "@sveltejs/vite-plugin-svelte";
export default defineConfig({
  // plugins: [svelte()],
  server: {
    watch: {
      ignored: ["!**/node_modules/@visahoi/**"],
    },
    port: 8080,
    open: true,
  },
  // The watched package must be excluded from optimization,
  // so that it can appear in the dependency graph and trigger hot reload.
  optimizeDeps: {
    exclude: ["@visahoi"],
  },
});
