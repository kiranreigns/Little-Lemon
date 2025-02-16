import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },

  build: {
    outDir: "dist",
    sourcemap: true,
  },
  // Add this if you're using client-side routing (e.g., React Router)
  base: "/",
});
