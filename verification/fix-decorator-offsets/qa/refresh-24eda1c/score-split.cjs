// Scores the reviewer's split probe output (split-<tree>.json) against an independent expectation: highlight.js over the
// whole line a+b (never the decorator), per character the innermost scope chain's class list as the decorator names it.
// Usage: node score-split.cjs base.json tip.json   (NODE_PATH at the website's node_modules)
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
const t = { lines: 0, chars: 0, baseRight: 0, tipRight: 0, rightToWrong: 0, wrongToRight: 0 };
base.forEach((b, i) => {
  const p = tip[i]; if (b.lang !== p.lang || b.a !== p.a || b.b !== p.b) throw new Error('row mismatch');
  t.lines++;
  const e = expected(p.a + p.b, p.lang);
  e.forEach((x, k) => {
    t.chars++;
    const ok = (r) => r.split[k] && !r.split[k].syntax && r.split[k].classes === x;
    if (ok(b)) t.baseRight++; if (ok(p)) t.tipRight++;
    if (ok(b) && !ok(p)) t.rightToWrong++; if (!ok(b) && ok(p)) t.wrongToRight++;
  });
});
console.log(JSON.stringify(t));
