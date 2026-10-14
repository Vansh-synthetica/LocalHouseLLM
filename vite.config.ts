import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // The client manifest lets scripts/prerender.mjs link each page's code-split JS and CSS.
  build: {
    manifest: true,
  },
  // Build-time prerender (src/entry-server.tsx): bundle CJS-only packages so Node can import them.
  ssr: {
    noExternal: ["react-helmet-async"],
  },
}));
