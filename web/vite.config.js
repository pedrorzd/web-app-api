// vite.config.js
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adicione esta parte:
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' globalmente
    environment: 'jsdom', // Simula o navegador
    setupFiles: './src/test/setupTests.js', // Arquivo de setup (vamos criar abaixo)
  },
})