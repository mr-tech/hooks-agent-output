// Counts zero-length scope nodes in highlight.js emitter trees over sample lines in every registered language.
// Usage: node hljs-empty-scopes.cjs <website dir>
const hljs = require(require.resolve('highlight.js', { paths: [process.argv[2]] }));
const SAMPLES = ['const s = "a b";', 'x = 1 # c', 'def f(): pass', '<a href="x">y</a>', 'SELECT * FROM t;', 'a: 1', '{"a": ""}', '""', "''", '``', '/**/', '//', '#', 'f()', 'x[0] = y', '$x = @"";', 'a = /re/g;', 'echo "$x"', '<?php ?>', 'end', '  ', '-- c', '%%', '@', '"\\""'];
let empty = 0; const where = [];
function walk(node, lang, line) {
  if (typeof node === 'string') return node.length;
  let len = 0;
  for (const c of node.children) len += walk(c, lang, line);
  if (len === 0 && node.scope) { empty++; if (where.length < 15) where.push(`${lang} ${JSON.stringify(line)} ${node.scope}`); }
  return len;
}
for (const lang of hljs.listLanguages()) for (const line of SAMPLES) {
  const r = hljs.highlight(line, { language: lang, ignoreIllegals: true });
  walk(r._emitter.rootNode, lang, line);
}
console.log('languages', hljs.listLanguages().length, 'samples', SAMPLES.length, 'zero-length scopes', empty);
console.log(where.join('\n'));
