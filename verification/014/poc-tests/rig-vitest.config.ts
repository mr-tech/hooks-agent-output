import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      bot: resolve(__dirname, 'bot'),
    },
  },
  test: {
    include: process.env.POC_INCLUDE ? process.env.POC_INCLUDE.split(',') : ['src/**/*.test.ts'],
    environment: process.env.POC_SUITE_ENV || 'node',
    setupFiles: ['./setup-poc.ts'],
  },
});
