import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/EnlitE/",
  server: {
    // This makes sure the browser opens at the correct subpath locally
    open: '/EnlitE/',
  },
})