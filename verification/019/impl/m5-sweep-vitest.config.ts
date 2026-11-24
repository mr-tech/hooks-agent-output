import { resolve } from 'path';
import { configDefaults, defineConfig } from '/usr/local/bin/hooks/website/node_modules/.pnpm/vitest@4.1.2_@edge-runtime+vm@3.1.7_@types+node@22.15.29_jsdom@30.0.1_vite@8.0.3_@emnap_cdad2253cb500984f4c425f868ad603b/node_modules/vitest/dist/config.js';

// Shared once so no project below can be written without it — see `project()`.
const alias = {
  '~': resolve(process.cwd(), 'src'),
  bot: resolve(process.cwd(), 'bot'),
};

// Every project must resolve `~`/`bot`; this factory makes that structurally unskippable
// rather than a convention each project entry has to remember to repeat.
function project(test: Record<string, unknown>) {
  return { resolve: { alias }, test: { exclude: configDefaults.exclude, ...test } };
}

const discordOnly = '**/__tests__/discord/**';

export default defineConfig({
  test: {
    projects: [
      project({
        name: 'node',
        include: ['src/**/*.test.ts', 'bot/**/*.test.ts'],
        exclude: [...configDefaults.exclude, discordOnly],
        environment: 'node',
      }),
      project({
        name: 'dom',
        include: ['src/**/*.test.tsx'],
        exclude: [...configDefaults.exclude, discordOnly],
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.dom.ts'],
      }),
      project({
        name: 'discord-node',
        include: ['src/**/__tests__/discord/**/*.test.ts'],
        environment: 'node',
      }),
      project({
        name: 'discord-dom',
        include: ['src/**/__tests__/discord/**/*.test.tsx'],
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.dom.ts'],
      }),
    ],
  },
});
