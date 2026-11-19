import { resolve } from 'path';
const exp = process.env.ATTACK_EXPORT;
const here = process.env.ATTACK_HERE;
export default {
  root: exp,
  cacheDir: process.env.VITE_CACHE,
  resolve: { alias: [
    { find: '~/env.mjs', replacement: resolve(here, 'env-stub.ts') },
    { find: /^pusher$/, replacement: resolve(here, 'pusher-stub.ts') },
    { find: '~', replacement: resolve(exp, 'src') },
  ] },
  test: { include: ['probe/probe.test.ts'], environment: 'node', testTimeout: 60000, fileParallelism: false },
};
