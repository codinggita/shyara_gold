import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // This ensures correct asset paths in Netlify
  server: {
    allowedHosts: [
      '8f30-2409-40c1-302e-be82-657a-f0a5-388a-ffbd.ngrok-free.app'
    ]
  },
  build: {
    outDir: 'dist',  // Ensure output folder is "dist"
  }
});
