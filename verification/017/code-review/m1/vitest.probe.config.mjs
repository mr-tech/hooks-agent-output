import { resolve } from 'path';

const root = process.cwd();
const alias = {
  '~': resolve(root, 'src'),
  bot: resolve(root, 'bot'),
};

export default {
  root,
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: 'dom',
          root,
          include: ['src/**/*.test.tsx'],
          environment: 'jsdom',
          setupFiles: [resolve(root, 'vitest.setup.dom.ts')],
        },
      },
    ],
  },
};
