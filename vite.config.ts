import preact from '@preact/preset-vite';
import cleanup from 'rollup-plugin-cleanup';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import Sitemap from 'vite-plugin-sitemap';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [eslint({ emitWarning: false }), svgr(), preact()],
  base: './',
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          firebase_app: ['firebase/app'],
          firebase_auth: ['firebase/auth'],
          firebase_database: ['firebase/database'],
          firebase_storage: ['firebase/storage'],
        },
      },
      plugins: [
        cleanup({ comments: 'none' }),
        Sitemap({ hostname: 'https://rustyrollersrestoration.com/', outDir: 'build', exclude: ['/admin'] }),
      ],
    },
  },
  server: {
    host: '0.0.0.0',
  },
});
