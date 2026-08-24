import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

// PROBE_SRC selects the tree under test: <tree>/src. Defaults to the chain-branch checkout.
const SRC = process.env.PROBE_SRC ?? '/usr/local/bin/hooks/website/src';

export default defineConfig({
  resolve: { alias: { '~': resolve(SRC), bot: resolve(SRC, '../bot') } },
  test: { include: [resolve(__dirname, 'mode-differential.test.ts')], environment: 'node', root: __dirname },
});
