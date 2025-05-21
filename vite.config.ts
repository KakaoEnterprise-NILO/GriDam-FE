import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // SWC 버전이 더 빠르고 최신
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'http://134.185.101.243:8080',
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
