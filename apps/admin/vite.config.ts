import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-toastify': path.resolve(__dirname, 'node_modules/react-toastify'),
    },
  },
  optimizeDeps: {
    include: ["@amen24/shared"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          react: ["react", "react-dom", "react-router-dom"],

          // State management
          redux: ["@reduxjs/toolkit", "react-redux"],

          // i18n
          i18n: ["i18next", "react-i18next", "i18next-resources-to-backend"],

          // UI add-ons
          icons: ["react-icons"],

          // Internal packages (if large enough to benefit from chunking)
          shared: ["@amen24/shared"],
          ui: ["@amen24/ui"],
        },
      },
    },
    chunkSizeWarningLimit: 700, // Optional: raise threshold for warnings
  },
});
