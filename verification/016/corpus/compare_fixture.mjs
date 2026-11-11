// Compare the data of two corpus fixture files: same members, in the same order, each deep-equal
// (id, source, shape, discord, measuredOn and body). Evaluates only the array literal after the
// export's `=`, in an empty vm context. Usage: node compare_fixture.mjs <old.ts> <new.ts>
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import vm from 'node:vm';

const MARK = 'DISCORD_V2_SEND_CORPUS: readonly DiscordV2SendCorpusMember[] = ';
const load = (path) => {
  const text = readFileSync(path, 'utf8');
  const at = text.indexOf(MARK);
  if (at < 0 || text.indexOf(MARK, at + 1) >= 0) throw new Error(`${path}: export marker not found once`);
  const literal = text.slice(at + MARK.length).replace(/;\s*$/, '');
  // JSON round trip: brings the values into this realm (a vm context's objects carry its own
  // prototypes, which isDeepStrictEqual would count as a difference). Every value is JSON data.
  return JSON.parse(JSON.stringify(vm.runInNewContext(`(${literal})`, Object.create(null))));
};
const digest = (v) => createHash('sha256').update(JSON.stringify(v)).digest('hex');

const [a, b] = process.argv.slice(2).map(load);
const diffs = [];
if (a.length !== b.length) diffs.push(`length ${a.length} != ${b.length}`);
for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
  if (!isDeepStrictEqual(a[i], b[i])) diffs.push(`member ${i} (${a[i]?.id} / ${b[i]?.id}) differs`);
}
const count = (xs, v) => xs.filter((m) => m.discord === v).length;
console.log(`old members=${a.length} accepted=${count(a, 'accepted')} refused=${count(a, 'refused')} data-sha256=${digest(a)}`);
console.log(`new members=${b.length} accepted=${count(b, 'accepted')} refused=${count(b, 'refused')} data-sha256=${digest(b)}`);
console.log(diffs.length ? `DIFFER (${diffs.length}):\n${diffs.slice(0, 10).join('\n')}` : 'IDENTICAL: every member deep-equal, same order');
process.exit(diffs.length ? 1 : 0);
