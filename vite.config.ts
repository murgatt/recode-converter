/// <reference types="vitest" />
import path from 'node:path';
import alias from '@rollup/plugin-alias';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              plugins: [
                alias({
                  entries: [
                    {
                      find: './lib-cov/fluent-ffmpeg',
                      replacement: './lib/fluent-ffmpeg',
                    },
                  ],
                }),
              ],
            },
          },
        },
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      schema: path.resolve(__dirname, './schema'),
      './lib-cov/fluent-ffmpeg': path.resolve(__dirname, './node_modules/fluent-ffmpeg/'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/vitest-setup.ts',
  },
});
