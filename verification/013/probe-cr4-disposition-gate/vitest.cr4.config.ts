import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
  test: { environment: 'node', include: ['**/disposition-enumeration.test.ts'], root: __dirname },
  resolve: { alias: { '~': path.resolve(__dirname, '../../../../website/src') } },
});
