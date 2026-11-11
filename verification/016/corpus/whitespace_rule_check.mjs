// Evaluates two candidate "whitespace-empty" predicates over every corpus member whose only
// component is one Text Display (and over link-button labels with no emoji), against Discord's
// measured verdict. Usage: node whitespace_rule_check.mjs corpus.json resend-results*.json
import { readFileSync } from 'node:fs';
const [corpusPath, ...resultPaths] = process.argv.slice(2);
const measured = {};
for (const p of resultPaths) for (const r of JSON.parse(readFileSync(p, 'utf8')).results) measured[r.id] = r.discord;
const rev2 = (s) => !s.includes('﻿') && [...s.trim()].every((c) => c === '\u0085');
const perChar = (s) => [...s].every((c) => c !== '﻿' && (c.trim() === '' || c === '\u0085'));
const rows = [];
for (const m of JSON.parse(readFileSync(corpusPath, 'utf8'))) {
  const cs = m.body.components;
  let s = null;
  if (cs.length === 1 && cs[0].type === 10 && typeof cs[0].content === 'string' && !m.body.content) s = cs[0].content;
  const btn = cs.length === 2 && cs[1].type === 1 && cs[1].components?.[0];
  if (btn && typeof btn.label === 'string' && !btn.emoji && btn.url === 'https://hooks.gg') s = btn.label;
  if (s === null || !(m.id in measured)) continue;
  const refused = measured[m.id] === 'refused';
  rows.push({ id: m.id, refused, rev2: rev2(s) === refused, perChar: perChar(s) === refused });
}
const bad = (k) => rows.filter((r) => !r[k]).map((r) => r.id);
console.log(`members=${rows.length} rev2-wrong=${JSON.stringify(bad('rev2'))} perChar-wrong=${JSON.stringify(bad('perChar'))}`);
