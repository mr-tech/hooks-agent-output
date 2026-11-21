// Applies v1Routes.statbot-key-required.test.ts's route filter (website 32d10f7) to candidate file names
// and compares it with Next's default pageExtensions (node_modules/next/dist/server/config-shared.js).
// Usage: node route-filter-probe.mjs <website repo>
import { createRequire } from 'node:module';
import { join } from 'node:path';

const repo = process.argv[2];
const require = createRequire(join(repo, 'package.json'));
const { defaultConfig } = require('next/dist/server/config-shared.js');

const testFilter = (file) => /\.tsx?$/.test(file) && !file.endsWith('.d.ts') && !file.split(/[\\/]/).includes('__tests__');
const nextRoutes = (file) => defaultConfig.pageExtensions.some((ext) => file.endsWith(`.${ext}`)) && !file.endsWith('.d.ts');

const candidates = [
  'guilds/[guildId]/messages.ts',
  'guilds/[guildId]/unguarded.ts',
  'guilds/[guildId]/unguarded.tsx',
  'guilds/[guildId]/unguarded.js',
  'guilds/[guildId]/unguarded.jsx',
  'guilds/__tests__/unguarded.ts',
  'guilds/[guildId]/types.d.ts',
];

console.log(`next default pageExtensions: ${JSON.stringify(defaultConfig.pageExtensions)}`);
let missed = 0;
for (const file of candidates) {
  const enumerated = testFilter(file);
  const routed = nextRoutes(file);
  if (routed && !enumerated) missed += 1;
  console.log(`${file}\tnext-routes=${routed}\tguard-test-enumerates=${enumerated}${routed && !enumerated ? '\tMISSED' : ''}`);
}
console.log(`routed but not enumerated: ${missed}`);
