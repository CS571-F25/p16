import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/p16/',
  build: {
  outDir: 'docs'
  }
})
