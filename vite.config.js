import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path-browserify";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "build",
  },
  server: {
    watch: {
      usePolling: true,
    },
    open: true,
    port: 3000,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  resolve: {
    alias: {
      path: "path-browserify",
    },
  },
});
