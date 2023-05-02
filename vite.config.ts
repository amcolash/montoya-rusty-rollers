import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [eslint({ emitWarning: false }), svgr()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },

  base: './',
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          firebase_app: ['@firebase/app'],
          firebase_auth: ['@firebase/auth'],
          firebase_database: ['@firebase/database'],
          firebase_storage: ['@firebase/storage'],
        },
      },
    },
  },
});
