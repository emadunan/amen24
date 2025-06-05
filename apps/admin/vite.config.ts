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
})
