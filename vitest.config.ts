import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    // Prevent macOS AppleDouble resource forks from being treated as test files.
    // NOTE: Setting `exclude` replaces Vitest defaults, so include the usual
    // exclusions as well.
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/._*'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
