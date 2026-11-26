import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Endereço do backend usado pelo proxy em desenvolvimento e no "npm start".
const apiTarget = process.env.VITE_DEV_API_TARGET || 'http://localhost:3001';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
    },
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
    },
  },
});
