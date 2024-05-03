import { defineConfig } from 'vite';
import { resolve } from 'path';
import { log } from 'console';
import { sign } from 'crypto';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default defineConfig({
  root: 'src/',
  // If you static folder at the project root for unprocessed assets, use this line:
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
        auth: resolve(__dirname, 'src', 'auth.js'), 
        login: resolve(__dirname, 'src', 'login.html'),
        signup: resolve(__dirname, 'src', 'signup.html'),
        map_auth: resolve(__dirname, 'src', 'map_auth.js'),
        modelresults: resolve(__dirname, 'src', 'modelresults.js'),},
    },
  },
});
