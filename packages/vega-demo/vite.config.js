import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    watch: {
      ignored: ['!**/node_modules/@visahoi/**']
    },
    port: 8081,
    open: true
  },
  // The watched package must be excluded from optimization,
  // so that it can appear in the dependency graph and trigger hot reload.
  optimizeDeps: {
    exclude: ['@visahoi']
  },
  build: {
    outDir: './build'
  }
});
