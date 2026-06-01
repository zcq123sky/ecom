import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'
import deno from "@deno/vite-plugin"
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "node:path";


// https://vite.dev/config/
export default defineConfig({
  resolve: {
      alias: {
        '@': path.resolve('./src'), // 将 @ 映射到 src 目录
      }
  },
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
    react(),
    deno(),
    tailwindcss()
  ],
  optimizeDeps: {
      include: ['react/jsx-runtime'],      // ← 可选但稳妥
  },
})
