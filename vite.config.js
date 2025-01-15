import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg'],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: '/portfolio/', // Replace <REPO_NAME> with your GitHub repository name
})
