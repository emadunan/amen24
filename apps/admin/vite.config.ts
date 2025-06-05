import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@amen24/shared': path.resolve(__dirname, '../../packages/shared/'),
    },
  },
  optimizeDeps: {
    include: ['@amen24/shared'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            if (id.includes('@amen24/shared')) {
              return 'shared';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
