// RIG ARTIFACT, KEPT AS EVIDENCE — do NOT use this shape.
// This config lives OUTSIDE the vite root it points at (`root`/`test.root` -> website,
// config file in the rig). Under environment 'node' it runs the website suite correctly:
// 48 files / 617 tests pass. Under 'jsdom' or 'happy-dom' ALL 48 files fail with
//   Error: Cannot find module '/src/…/<file>.test.ts'
// because the DOM environments run in vite's *client* transform mode and resolve
// URL-shaped module ids against a base the out-of-root config gets wrong. That is a rig
// defect, NOT a fact about the website tree: with the config inside the root (see
// rig-vitest.config.ts, used from mirror/) the same suite passes 48/48 under both.
// See README.md, 'RIG HAZARD PAID FOR HERE'.
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

const WEB = '/usr/local/bin/hooks/website';
const RIG = resolve(__dirname);

export default defineConfig({
  root: WEB,
  cacheDir: `${RIG}/.vite-website-rig`,
  resolve: {
    alias: [
      { find: /^vitest$/, replacement: `${RIG}/node_modules/vitest/index.js` },
      { find: /^~\//, replacement: `${WEB}/src/` },
      { find: /^bot\//, replacement: `${WEB}/bot/` },
    ],
  },
  test: {
    root: WEB,
    include: process.env.POC_SUITE_INCLUDE
      ? process.env.POC_SUITE_INCLUDE.split(',')
      : ['src/**/*.test.ts'],
    environment: process.env.POC_SUITE_ENV || 'node',
  },
});
