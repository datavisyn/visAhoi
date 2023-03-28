import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    exclude: ["@visahoi"],
  },
  base: process.env.BASE_URL || "/", // is set in github action to have correct relative links to /visAhoi/demos
});
