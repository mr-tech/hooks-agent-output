import { it } from 'vitest';
import fs from 'node:fs';
import { discordMessageShape } from './export/src/server/api/utils/shapes.ts';
import { createRequire } from 'node:module';

const out = [];
const log = (s) => { out.push(s); };
function flat(issues) {
  let n = 0;
  for (const i of issues) { n++; if (i.unionErrors) for (const e of i.unionErrors) n += flat(e.issues); }
  return n;
}
function run(name, input) {
  let calls = 0; const paths = [];
  const errorMap = (iss, ctx) => { calls++; paths.push(JSON.stringify(iss.path) + ' ' + iss.code); return { message: ctx.defaultError }; };
  const r = discordMessageShape.safeParse(input, { errorMap });
  const top = r.success ? 0 : r.error.issues.length;
  log(`${name}: success=${r.success} topIssues=${top} flattenedIssues=${r.success ? 0 : flat(r.error.issues)} errorMapCalls=${calls}`);
  log('  result issue codes: ' + (r.success ? '-' : r.error.issues.map(i => i.code + '@' + i.path.join('.')).join(' | ')));
  if (calls >= 21) log('  call #21: ' + paths[20]);
  return paths;
}
const badAcc = () => ({ type: 9, components: [], accessory: { type: 99 } });
const mk = (n, f) => Array.from({ length: n }, f);
it('measure', () => {
  log('zod ' + createRequire(import.meta.url)('./export/node_modules/zod/package.json').version);
  run('(a) 6 failing accessories', { components: mk(6, badAcc) });
  run('(a-ctl) 1 failing accessory', { components: [badAcc()] });
  run('(b) 6 failing allowed_mentions.parse elems', { allowed_mentions: { parse: mk(6, () => 'bogus') } });
  run('(b-ctl) 1 failing parse elem', { allowed_mentions: { parse: ['bogus'] } });
  const p = run('(a) again for all paths', { components: mk(6, badAcc) });
  log('  all (a) calls:\n    ' + p.map((x, i) => (i + 1) + ' ' + x).join('\n    '));
  fs.writeFileSync(new URL('./output.txt', import.meta.url), out.join('\n') + '\n');
});
