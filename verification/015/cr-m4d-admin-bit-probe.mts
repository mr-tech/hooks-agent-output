// Usage: copy website <sha>:src/utils/hasDiscordPermissions.ts beside this file, symlink website/node_modules, run: node cr-m4d-admin-bit-probe.mts (node >= 24, type stripping).
// Probes the real admin-bit test that fetchUserGuilds uses to trim the guild list authorizeGuildAdmin searches. Expected values are Discord's documented bits (Administrator = 1<<3), written as literals.
import has from './hasDiscordPermissions.ts';
const cases: Array<[string, string, boolean]> = [
  ['Administrator bit only', '8', true],
  ['ManageGuild only (not admin)', '32', false],
  ['no permissions', '0', false],
  ['ManageMessages|SendMessages, no admin', String((1n<<13n)|(1n<<11n)), false],
  ['all bits incl. admin, above 2^53', '2251799813685247', true],
  ['high bit only (2^50), no admin', String(1n<<50n), false],
];
let bad = 0;
for (const [n, p, want] of cases) { const got = has(p, ['Administrator']); if (got !== want) bad++; console.log(`${got === want ? 'ok  ' : 'FAIL'} ${n} perms=${p} -> ${got} (want ${want})`); }
console.log(`node ${process.version}; mismatches ${bad}`);
