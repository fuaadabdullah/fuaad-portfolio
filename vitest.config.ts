import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    exclude: [
      'node_modules/**',
      'dist/**',
      'e2e/**',
      // Node-native bridge and shell-contract tests run in ci:node-tests.
      'scripts/ci/**/*.test.cjs',
      'deploy/octopus-portfolio-bridge/test/**',
      // Generated artifacts (design/merge review snapshots, coverage, reports)
      // must never be collected as test files.
      'output/**',
      '.next/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
