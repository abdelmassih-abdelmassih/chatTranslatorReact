import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Use esbuild for minification during the build process
    minify: 'esbuild', // Ensure esbuild is used for minification
    esbuild: {
      // Drop console and debugger statements from the production build
      drop: ['console', 'debugger'],
    }
  }
})
