import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // SWC 버전이 더 빠르고 최신
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: "http://134.185.101.243:8080",  // Backend 서버 주소
        changeOrigin: true,
        secure: false,
        ws: true,  // WebSocket 프록시 활성화
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
