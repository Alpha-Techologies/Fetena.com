import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    origin: process.env.VITE_TARGET_URL,
    proxy: {
    '/api': {
      target: "http://localhost:8080",
      secure: false,
      changeOrigin: true,
      ws: true,
      }
  }}
})
