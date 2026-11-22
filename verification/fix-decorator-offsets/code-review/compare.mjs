// Compares the base and fix decorator differential outputs and scores each against a partial oracle.
// Usage: node compare.mjs probe-base.json probe-fix.json > summary.txt
import { readFileSync } from 'node:fs';

const [baseRows, fixRows] = process.argv.slice(2, 4).map((p) => JSON.parse(readFileSync(p, 'utf8')));
const key = (r) => `${r.parser}|${r.mounted}|${r.text}`;
const fixBy = new Map(fixRows.map((r) => [key(r), r]));

function violations(text, ranges) {
  if (typeof ranges === 'string') return ['throw'];
  const v = new Set();
  const headingish = /[#>-]/.test(text);
  for (const [from, to, syntax] of ranges) {
    if (from < 0 || to > text.length || from > to) v.add('out-of-bounds');
    if (!syntax) {
      if (to > from && to <= text.length && ('*_~|[]()\\'.includes(text[from]) || '*_~|[]()\\'.includes(text[to - 1]))) v.add('styled-edge-on-delimiter');
      continue;
    }
    for (let i = Math.max(0, from); i < Math.min(to, text.length); i++) {
      if ('abcd'.includes(text[i])) v.add('letter-as-syntax');
      if (text[i] === ' ' && !headingish) v.add('space-as-syntax');
    }
  }
  return [...v];
}

const tally = {
  rows: 0, missing: 0, same: 0, differ: 0,
  fixedWrongToClean: 0, newWrong: 0, wrongBothMoved: 0, cleanBothMoved: 0,
};
const lists = { newWrong: [], wrongBothMoved: [], cleanBothMoved: [] };
const viol = { base: {}, fix: {} };
for (const b of baseRows) {
  tally.rows++;
  const f = fixBy.get(key(b));
  if (!f) { tally.missing++; continue; }
  const vb = violations(b.text, b.ranges);
  const vf = violations(f.text, f.ranges);
  for (const x of vb) viol.base[x] = (viol.base[x] ?? 0) + 1;
  for (const x of vf) viol.fix[x] = (viol.fix[x] ?? 0) + 1;
  if (JSON.stringify(b.ranges) === JSON.stringify(f.ranges)) { tally.same++; continue; }
  tally.differ++;
  const row = { parser: b.parser, mounted: b.mounted, text: b.text, vb, vf, base: b.ranges, fix: f.ranges };
  if (vb.length && !vf.length) tally.fixedWrongToClean++;
  else if (!vb.length && vf.length) { tally.newWrong++; lists.newWrong.push(row); }
  else if (vb.length && vf.length) { tally.wrongBothMoved++; lists.wrongBothMoved.push(row); }
  else { tally.cleanBothMoved++; lists.cleanBothMoved.push(row); }
}
console.log(JSON.stringify({ tally, viol }, null, 1));
for (const [name, l] of Object.entries(lists)) {
  console.log(`\n## ${name} (${l.length})`);
  const seen = new Set();
  for (const r of l) {
    if (seen.has(r.text)) continue;
    seen.add(r.text);
    console.log(JSON.stringify(r));
  }
}
