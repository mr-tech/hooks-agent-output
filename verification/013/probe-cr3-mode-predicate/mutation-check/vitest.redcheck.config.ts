import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
const SRC = process.env.PROBE_SRC ?? '/usr/local/bin/hooks/website/src';
const SPEC = process.env.PROBE_SPEC!;
export default defineConfig({
  resolve: { alias: { '~': resolve(SRC), bot: resolve(SRC, '../bot') } },
  test: { include: [SPEC], environment: 'node', root: resolve(SRC) },
});
