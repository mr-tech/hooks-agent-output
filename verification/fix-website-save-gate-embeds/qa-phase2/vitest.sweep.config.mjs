// QA sweep instrument: website's vitest.config.ts (at 963a25c) transcribed to plain ESM, with
// `__dirname` replaced by `process.cwd()`. mutation-run.py runs each suite with its cwd at the export
// root, and `--configLoader runner` (needed under the read-only node_modules bind) defines no
// `__dirname`. Projects, includes, environments and setup files are otherwise identical. The control
// run's test count (1144 at 963a25c) is the check that this config collects the same suite.
// `defineConfig` is an identity function; it is not imported, since this file sits outside the
// website tree and `vitest/config` would not resolve from here.
import { resolve } from 'path';

const defineConfig = (config) => config;

const root = process.cwd();
const alias = {
  '~': resolve(root, 'src'),
  bot: resolve(root, 'bot'),
};

function project(test) {
  return { resolve: { alias }, test };
}

export default defineConfig({
  root,
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
});
