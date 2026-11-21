import { resolve } from 'node:path';

const root = process.cwd();
const alias = {
  '~': resolve(root, 'src'),
  bot: resolve(root, 'bot'),
};

function project(test: Record<string, unknown>) {
  return { resolve: { alias }, test };
}

export default {
  test: {
    projects: [
      project({
        name: 'node',
        include: ['src/**/*.test.ts', 'bot/**/*.test.ts'],
        environment: 'node',
      }),
      project({
        name: 'dom',
        include: ['src/**/*.test.tsx'],
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.dom.ts'],
      }),
    ],
  },
};
