// Compares base and fix decorator outputs on the visible part only (ranges clipped to the text), and scores
// each side with a partial oracle: a letter of plain prose (a-d) or a URL character coloured as syntax is wrong.
// Usage: node visible.mjs probe-base.json probe-fix.json
import { readFileSync } from 'node:fs';

const [baseRows, fixRows] = process.argv.slice(2, 4).map((p) => JSON.parse(readFileSync(p, 'utf8')));
const key = (r) => `${r.parser}|${r.mounted}|${r.text}`;
const fixBy = new Map(fixRows.map((r) => [key(r), r]));

const clip = (text, ranges) => ranges
  .map(([a, z, s, c]) => [Math.max(0, a), Math.min(z, text.length), s, c])
  .filter(([a, z]) => z > a);

function urlSpans(text) {
  const spans = [];
  for (const m of text.matchAll(/https:\/\/x\.y/g)) spans.push([m.index, m.index + m[0].length]);
  return spans;
}

function wrong(text, ranges) {
  const urls = urlSpans(text);
  const w = new Set();
  for (const [a, z, s] of ranges) {
    if (!s) continue;
    for (let i = a; i < z; i++) {
      if ('abcd'.includes(text[i])) w.add('prose-letter-as-syntax');
      if (urls.some(([u, v]) => i >= u && i < v)) w.add('url-char-as-syntax');
    }
  }
  return [...w];
}

const t = { rows: 0, visibleSame: 0, visibleDiffer: 0, newWrong: 0, fixedToClean: 0, bothWrong: 0, bothClean: 0 };
const byFeature = {};
const examples = {};
for (const b of baseRows) {
  const f = fixBy.get(key(b));
  t.rows++;
  if (typeof b.ranges === 'string' || typeof f.ranges === 'string') { t.throws = (t.throws ?? 0) + 1; continue; }
  const vb = clip(b.text, b.ranges);
  const vf = clip(f.text, f.ranges);
  if (JSON.stringify(vb) === JSON.stringify(vf)) { t.visibleSame++; continue; }
  t.visibleDiffer++;
  const wb = wrong(b.text, vb);
  const wf = wrong(f.text, vf);
  let cls;
  if (!wb.length && wf.length) cls = 'newWrong';
  else if (wb.length && !wf.length) cls = 'fixedToClean';
  else if (wb.length) cls = 'bothWrong';
  else cls = 'bothClean';
  t[cls]++;
  const feat = /#/.test(b.text) ? 'hash' : (/https:\/\/x\.y/.test(b.text.replace(/\[[ab]\]\(<?https:\/\/x\.y>?\)/g, '')) ? 'bare-or-autolink' : 'other');
  const k = `${cls} ${feat}`;
  byFeature[k] = (byFeature[k] ?? 0) + 1;
  (examples[k] ??= new Set()).add(b.text);
}
console.log(JSON.stringify({ t, byFeature }, null, 1));
for (const [k, s] of Object.entries(examples)) console.log(k, JSON.stringify([...s].slice(0, 8)));
