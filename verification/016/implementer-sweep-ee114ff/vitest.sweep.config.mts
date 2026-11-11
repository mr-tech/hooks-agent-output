import { resolve } from 'path';

const root = process.cwd();
const alias = { '~': resolve(root, 'src'), bot: resolve(root, 'bot') };
const project = (test: Record<string, unknown>) => ({ resolve: { alias }, test });

export default {
  test: {
    projects: [
      project({ name: 'node', include: ['src/**/*.test.ts', 'bot/**/*.test.ts'], environment: 'node' }),
      project({
        name: 'dom', include: ['src/**/*.test.tsx'], environment: 'jsdom', setupFiles: ['./vitest.setup.dom.ts'],
      }),
    ],
  },
};
