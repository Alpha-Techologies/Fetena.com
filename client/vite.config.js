import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "http://13.49.21.227:8080",
        secure: false,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
