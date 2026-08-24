import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

/**
 * Runs the IMPLEMENTER's own fix-round specs against an arbitrary tree, so a mutant can be
 * dropped in and the specs asked whether they notice.  A spec that passes on a tree with the
 * fix reverted is not an instrument for that fix, whatever its red/green history says.
 *
 * PROBE_SRC selects the tree: <tree>/src.  The spec files are taken from the SAME tree.
 */
const SRC = process.env.PROBE_SRC ?? '/usr/local/bin/hooks/website/src';

export default defineConfig({
  resolve: { alias: { '~': resolve(SRC), bot: resolve(SRC, '../bot') } },
  test: {
    include: [
      resolve(SRC, 'utils/__tests__/013-m1-fix-round-1-hash-parity.test.ts'),
      resolve(SRC, 'utils/__tests__/013-m1-fix-round-1-extraction.test.ts'),
      resolve(SRC, 'utils/__tests__/013-m1-transport-form.test.ts'),
    ],
    environment: 'node',
    root: SRC,
  },
});
