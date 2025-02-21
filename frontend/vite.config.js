import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // This ensures correct asset paths in Netlify
  server: {
    allowedHosts: [
      '7505-2402-3a80-1ce2-49eb-3131-d8c-7340-d9c3.ngrok-free.app'
    ]
  },
  build: {
    outDir: 'dist',  // Ensure output folder is "dist"
  }
});
