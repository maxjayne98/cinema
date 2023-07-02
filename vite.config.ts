import { fileURLToPath, URL } from 'node:url'
import checker from 'vite-plugin-checker'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint ./src ./cypress --ext .js,.ts,.vue'
      },
      overlay: {
        initialIsOpen: false
      },
      enableBuild: false
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/cinema',
  server: { port: 3000 }
})
