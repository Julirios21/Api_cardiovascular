import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // reenvía /api a tu backend en 3000
      '/api': 'http://localhost:3000'
    }
  }
})
