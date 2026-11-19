import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const website = '/usr/local/bin/hooks/website';
const src = process.env.WEBSITE_SRC ?? `${website}/src`;

export default {
  root: here,
  cacheDir: process.env.VITE_CACHE,
  resolve: {
    alias: [
      { find: '~/env.mjs', replacement: resolve(here, 'env-stub.ts') },
      { find: '~', replacement: src },
    ],
  },
  test: {
    include: ['pg-lane.test.ts'],
    environment: 'node',
    testTimeout: 60000,
  },
};
