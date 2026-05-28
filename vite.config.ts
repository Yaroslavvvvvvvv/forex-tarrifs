import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_vars.scss" as *; @use "@/styles/_mixins.scss" as *;`,
      },
    },
  },
  server: {
    port: 4321,
    proxy: {
      // Dev proxy to avoid CORS against the tariffs API.
      // Frontend calls "/api/proxy/...", Vite forwards to the real host.
      '/api': {
        target: 'https://api.zomrodev.online/v1/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
