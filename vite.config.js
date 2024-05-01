import { defineConfig } from 'vite';
import { resolve } from 'path';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default defineConfig({
  root: 'src/',
  // If you have a static folder at the project root for unprocessed assets, use this line:
  publicDir: '../static',
  base: './',
  server: {
    host: true,
    open: !isCodeSandbox // Open if it's not a CodeSandbox
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src', 'index.html'),
        rsch: resolve(__dirname, 'src', 'rsch.html'),
        map: resolve(__dirname, 'src', 'map.html'),
        worthing: resolve(__dirname, 'src', 'worthing.html'),
        prh: resolve(__dirname, 'src', 'prh.html'),
        database: resolve(__dirname, 'src', 'database.html'),
      },
    },
  },
});
