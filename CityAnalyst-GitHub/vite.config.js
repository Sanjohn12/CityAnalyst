import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'CityAnalyst',
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'js'}`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'leaflet', 'react-leaflet', '@turf/turf', 'recharts', 'axios', 'georaster', 'geoblaze', 'georaster-layer-for-leaflet'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          leaflet: 'L',
          'react-leaflet': 'ReactLeaflet',
          '@turf/turf': 'turf',
          recharts: 'Recharts',
          axios: 'axios'
        }
      }
    }
  }
});
