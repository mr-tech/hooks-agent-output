import { resolve } from 'path';

const root = process.cwd();
const alias = {
  '~': resolve(root, 'src'),
  bot: resolve(root, 'bot'),
};

function project(test: Record<string, unknown>) {
  return { resolve: { alias }, test };
}

export default {
  root,
  test: {
    projects: [
      project({
        name: 'node',
        root,
        include: ['src/**/*.test.ts', 'bot/**/*.test.ts'],
        environment: 'node',
      }),
      project({
        name: 'dom',
        root,
        include: ['src/**/*.test.tsx'],
        environment: 'jsdom',
        setupFiles: [resolve(root, 'vitest.setup.dom.ts')],
      }),
    ],
  },
};
