import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },

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
