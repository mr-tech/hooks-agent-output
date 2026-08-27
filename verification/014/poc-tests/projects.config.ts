import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

const alias = {
  '~': resolve(__dirname, 'src'),
  bot: resolve(__dirname, 'bot'),
};

export default defineConfig({
  resolve: { alias },
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: 'node',
          include: ['src/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        resolve: { alias },
        test: {
          name: 'dom',
          include: ['src/**/*.test.tsx'],
          environment: 'jsdom',
          setupFiles: ['./setup-poc.ts'],
        },
      },
    ],
  },
});
