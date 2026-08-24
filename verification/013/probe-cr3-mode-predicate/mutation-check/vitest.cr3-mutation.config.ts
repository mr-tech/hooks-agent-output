import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

/**
 * Runs the IMPLEMENTER's own M7 spec — and the two pre-existing 012 specs the plan predicted M7
 * would turn red — against an arbitrary tree, so a mutant can be dropped in and each spec asked
 * whether it notices. A spec that passes on a tree with the change reverted is not an instrument
 * for that change, whatever its red/green history says.
 *
 * PROBE_SRC selects the tree: <tree>/src. The spec files are taken from the SAME tree.
 */
const SRC = process.env.PROBE_SRC ?? '/usr/local/bin/hooks/website/src';

export default defineConfig({
  resolve: { alias: { '~': resolve(SRC), bot: resolve(SRC, '../bot') } },
  test: {
    include: [
      resolve(SRC, 'utils/__tests__/013-m7-mode-follows-flag.test.ts'),
      resolve(SRC, 'utils/__tests__/012-message-mode.test.ts'),
      resolve(SRC, 'utils/__tests__/012-send-gate-partition.test.ts'),
    ],
    environment: 'node',
    root: SRC,
  },
});
