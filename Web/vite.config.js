import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
