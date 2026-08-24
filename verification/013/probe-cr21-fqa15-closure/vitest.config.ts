import { defineConfig } from 'vitest/config';
import path from 'path';
const HERE = __dirname;
export default defineConfig({
  test: { environment: 'node', include: [HERE + '/*.test.ts'], root: HERE },
  resolve: { alias: { '~': path.resolve('/usr/local/bin/hooks/website/src') } },
});
