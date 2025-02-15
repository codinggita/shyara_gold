import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '8746-2409-40c1-5004-8229-284d-89d3-ba1-9345.ngrok-free.app'
    ]
  }
})
