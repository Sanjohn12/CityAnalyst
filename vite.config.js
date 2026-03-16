import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['leaflet'], // We keep leaflet external to use the CDN link in HTML
    }
  }
});
