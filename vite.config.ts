import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/': {
        // target: 'http://52.221.250.230',
        target: 'http://0.0.0.0:8000',
        changeOrigin: true,
        secure: false,
        // Remove rewrite if backend expects /api prefix
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
