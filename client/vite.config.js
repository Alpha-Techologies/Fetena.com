import { defineConfig, } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    origin: "http://13.49.21.227",
    // origin: process.env.VITE_TARGET_URL,
    proxy: {
      '/api': {
        target: "http://13.49.21.227",
        // target: process.env.VITE_TARGET_URL,
        secure: false,
        changeOrigin: true,
        ws: true,
        }
  }}
})
