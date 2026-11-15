import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from https://fabegalo.github.io/native-projects/
export default defineConfig({
  base: '/native-projects/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
});
