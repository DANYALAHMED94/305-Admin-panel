import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
    minify: "esbuild", // Ensures optimal minification
    sourcemap: false, // Disable sourcemaps for production
    chunkSizeWarningLimit: 1000, // Prevents chunk warnings
  },
});
