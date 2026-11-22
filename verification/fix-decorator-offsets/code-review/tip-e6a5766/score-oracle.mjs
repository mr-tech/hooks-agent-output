// Scores grammar-oracle outputs: per row, does the rendered per-character colouring equal the expectation derived from
// the generated tree? Syntax characters must be syntax (classes not scored); content characters must be non-syntax with
// exactly the expected class set; masked-link target characters must be non-syntax and carry linkText.
// Usage: node score-oracle.mjs oracle-base.json oracle-tip.json
import { readFileSync } from 'node:fs';

const [base, tip] = process.argv.slice(2, 4).map((p) => JSON.parse(readFileSync(p, 'utf8')));

function firstMismatch(row) {
  if (typeof row.got === 'string') return { at: -1, why: row.got };
  if (row.got.length !== row.expected.length) return { at: -1, why: `length ${row.got.length} vs ${row.expected.length}` };
  for (let i = 0; i < row.expected.length; i++) {
    const e = row.expected[i];
    const g = row.got[i];
    if (e.syntax !== g.syntax) return { at: i, why: `syntax ${g.syntax} expected ${e.syntax}` };
    if (e.syntax) continue;
    if (e.linkOnly) {
      if (!g.classes.includes('linkText')) return { at: i, why: `target lacks linkText: ${g.classes}` };
      continue;
    }
    if (JSON.stringify(e.classes) !== JSON.stringify(g.classes)) return { at: i, why: `classes ${g.classes.join('+') || '-'} expected ${e.classes.join('+') || '-'}` };
  }
  return null;
}

const t = { rows: base.length, baseOk: 0, tipOk: 0, worse: 0, better: 0, bothBad: 0 };
const worse = [];
const tipBad = [];
for (let i = 0; i < base.length; i++) {
  const mb = firstMismatch(base[i]);
  const mt = firstMismatch(tip[i]);
  if (!mb) t.baseOk++;
  if (!mt) t.tipOk++;
  if (!mb && mt) { t.worse++; worse.push({ parser: tip[i].parser, text: tip[i].text, ...mt }); }
  if (mb && !mt) t.better++;
  if (mb && mt) t.bothBad++;
  if (mt) tipBad.push({ parser: tip[i].parser, text: tip[i].text, ...mt });
}
console.log(JSON.stringify(t));
const why = {};
for (const b of tipBad) {
  const k = b.why.replace(/[a-zA-Z]+Text/g, 'X').slice(0, 60);
  why[k] = (why[k] ?? 0) + 1;
}
console.log('tip mismatch reasons', JSON.stringify(why, null, 1));
console.log('\n## worse than base');
for (const w of worse.slice(0, 40)) console.log(JSON.stringify(w));
console.log('\n## tip mismatches (first 60)');
for (const w of tipBad.slice(0, 60)) console.log(JSON.stringify(w));
