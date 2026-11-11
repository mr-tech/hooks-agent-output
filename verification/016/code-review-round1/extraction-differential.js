// Usage (from a website export root): node -r ts-node/register/transpile-only -r tsconfig-paths/register <this> <seed> <n> <out.json>
// Evaluates validateContentRequirements and validateMessage over a seeded random corpus of
// message bodies and writes every result, so two trees' outputs can be compared byte for byte.
const fs = require('fs');
const { validateContentRequirements, validateMessage } = require('~/utils/limits');
let s = Number(process.argv[2]) >>> 0;
const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
const pick = (a) => a[Math.floor(rnd() * a.length)];
const TYPES = [1, 2, 9, 10, 11, 12, 13, 14, 17, 99];
function comp(depth) {
  const type = pick(TYPES);
  const c = { type };
  if (rnd() < 0.7) c.components = Array.from({ length: Math.floor(rnd() * 3) }, () => comp(depth + 1 > 2 ? 9 : depth + 1));
  if (type === 2) Object.assign(c, { style: 5, url: pick(['', 'https://a.b', 'abc', undefined]), label: pick(['', ' ', 'x', undefined]) });
  if (type === 10) c.content = pick(['', ' ', '\u0085', '﻿', 'hi', undefined]);
  if (type === 9 && rnd() < 0.6) c.accessory = pick([{ type: 11, media: { url: 'https://a.b/c.png' } }, { type: 2, style: 5, url: 'https://a.b', label: 'x' }, {}]);
  if (type === 12) c.items = Array.from({ length: Math.floor(rnd() * 3) }, () => ({ media: { url: pick(['', 'https://a.b/c.png']) } }));
  return c;
}
const out = [];
for (let i = 0; i < Number(process.argv[3]); i += 1) {
  const m = {
    username: pick(['Probe', '', 'everyone']),
    content: pick(['', ' ', 'hi', '\u0085', undefined]),
    embeds: pick([[], [{}], [{ description: 'x' }], undefined]),
    components: Array.from({ length: Math.floor(rnd() * 4) }, () => comp(0)),
    flags: pick([0, 32768, 32768 | 4, 4, undefined]),
  };
  Object.keys(m).forEach((k) => m[k] === undefined && delete m[k]);
  let cr; let vm;
  try { cr = validateContentRequirements(m); } catch (e) { cr = `THROW ${e.message}`; }
  try { vm = validateMessage(m); } catch (e) { vm = `THROW ${e.message}`; }
  out.push({ m, cr: cr ?? null, vm });
}
fs.writeFileSync(process.argv[4], JSON.stringify(out));
