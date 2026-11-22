// Scores code-block line rows (codeblock-<tree>.json) against an independent expectation: highlight.js run over the
// WHOLE line (never the decorator), per character the innermost scope's class list as the decorator would name it.
// Only reachable rows: startCodeBlock true (editor's inner lines), lang a highlight.js language.
// Usage: node score-code-block.cjs base.json tip.json   (run with NODE_PATH at the website's node_modules)
const fs = require('fs');
const hljs = require('highlight.js');
const [base, tip] = process.argv.slice(2, 4).map((p) => JSON.parse(fs.readFileSync(p, 'utf8')));
function cls(scope) { let pad = 0; return scope.split('.').map((n) => n + '_'.repeat(pad++)).join(' '); }
function expected(text, lang) {
  const out = []; const stack = [];
  const walk = (node) => {
    if (typeof node === 'string') { for (const ch of node) for (let i = 0; i < ch.length; i++) out.push(stack.filter(Boolean).map((s) => `hljs-${cls(s)}`).sort().join('+')); return; }
    stack.push(node.scope); node.children.forEach(walk); stack.pop();
  };
  hljs.highlight(text, { language: lang, ignoreIllegals: true })._emitter.rootNode.children.forEach(walk);
  return out;
}
function received(got) {
  const out = [];
  for (const m of got.matchAll(/("(?:[^"\\]|\\.)*"):(\S+)/g)) {
    const t = JSON.parse(m[1]); const c = m[2] === '-' ? '' : m[2].split('+').filter((x) => x.startsWith('hljs-')).sort().join('+');
    for (let i = 0; i < t.length; i++) out.push(c);
  }
  return out;
}
let rows = 0; const tally = { rightToWrong: 0, wrongToRight: 0, baseRight: 0, tipRight: 0, chars: 0 };
const worseRows = [];
base.forEach((b, i) => {
  const t = tip[i];
  if (!t.startCodeBlock || !hljs.getLanguage(t.lang) || t.text === '') return;
  rows++;
  const e = expected(t.text, t.lang); const rb = received(b.got); const rt = received(t.got);
  let r2w = 0;
  e.forEach((x, k) => {
    tally.chars++; const okB = rb[k] === x; const okT = rt[k] === x;
    if (okB) tally.baseRight++; if (okT) tally.tipRight++;
    if (okB && !okT) { tally.rightToWrong++; r2w++; }
    if (!okB && okT) tally.wrongToRight++;
  });
  if (r2w) worseRows.push({ lang: t.lang, parser: t.parser, text: t.text, rightToWrongChars: r2w, expected: e.join('|'), base: rb.join('|'), tip: rt.join('|') });
});
console.log(JSON.stringify({ rows, ...tally, rowsWithRightToWrong: worseRows.length }, null, 1));
for (const w of worseRows) console.log(JSON.stringify(w));
