import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/quizApp/', // Set to your GitHub Pages repo name
  build: {
    outDir: 'dist', // Ensure the output directory is `dist`
  },
})
