import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const apiUrl = import.meta.env.VITE_API_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
    '/api': {
      target: apiUrl,
      secure: false,
      changeOrigin: true,
      ws: true,
      }
  }}
})
