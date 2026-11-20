// Compare two highlight.js builds on the surfaces website uses: getLanguage, highlight().value, _emitter.rootNode (scope/children).
const [,, a, b] = process.argv;
const A = require(a), B = require(b);
const la = new Set(A.listLanguages()), lb = new Set(B.listLanguages());
const aliasesA = new Set(), aliasesB = new Set();
for (const l of la) { aliasesA.add(l); (A.getLanguage(l).aliases || []).forEach((x) => aliasesA.add(x)); }
for (const l of lb) { aliasesB.add(l); (B.getLanguage(l).aliases || []).forEach((x) => aliasesB.add(x)); }
console.log('versions', A.versionString, B.versionString);
console.log('languages', la.size, lb.size, '| removed', [...la].filter((x) => !lb.has(x)).join(',') || 'none', '| added', [...lb].filter((x) => !la.has(x)).join(',') || 'none');
console.log('names+aliases', aliasesA.size, aliasesB.size, '| no longer resolved by getLanguage', [...aliasesA].filter((x) => !B.getLanguage(x)).join(',') || 'none');
const samples = {
  javascript: "const a = async (x) => { return `v${x}`; } // c\nclass K extends Y { #p = 1; static m() {} }",
  typescript: "interface P<T> { a?: T }\nexport type U = keyof P<string>; enum E { A = 1 }",
  python: "@dec\ndef f(x: int) -> str:\n    return f\"{x!r}\"  # c\nclass C: pass",
  json: '{"a": [1, 2.5, true, null], "b": {"c": "d"}}',
  css: ".a > b:hover { color: #fff; margin: 0 auto !important; }\n@media (max-width: 1px) { a { x: y } }",
  xml: '<div class="a" id=\'b\'><!-- c --><br/></div>',
  html: '<script>let x = 1;</script><p>t</p>',
  bash: 'for f in *.txt; do echo "$f" | grep -c x; done # c',
  sql: "SELECT a, COUNT(*) FROM t WHERE b = 'x' GROUP BY a;",
  cpp: '#include <x>\ntemplate<class T> int f(T&& t) { return 0; }',
  java: '@Override public static void main(String[] a) { System.out.println("x"); }',
  rust: 'fn main() { let v: Vec<u8> = vec![1]; println!("{:?}", v); }',
  go: 'func (r *R) M(x int) (string, error) { return fmt.Sprintf("%d", x), nil }',
  diff: '--- a\n+++ b\n@@ -1 +1 @@\n-x\n+y',
  yaml: 'a: 1\nb:\n  - c # d\n  - "e"',
  markdown: '# H\n*a* **b** `c`\n- [x](y)',
  lua: 'local t = {a = 1}\nfunction f(...) return #t end -- c',
  csharp: 'public record R(int A); var x = $"{A}";',
};
const walk = (n) => (typeof n === 'string' ? n : { s: n.scope, l: n.sublanguage ? 1 : 0, c: n.children.map(walk) });
let htmlDiff = 0, treeDiff = 0;
for (const [lang, code] of Object.entries(samples)) {
  const ra = A.highlight(code, { language: lang, ignoreIllegals: true });
  const rb = B.highlight(code, { language: lang, ignoreIllegals: true });
  const ha = ra.value === rb.value;
  const ta = JSON.stringify(walk(ra._emitter.rootNode)) === JSON.stringify(walk(rb._emitter.rootNode));
  const shape = rb._emitter.rootNode && Array.isArray(rb._emitter.rootNode.children) ? 'rootNode.children ok' : 'rootNode SHAPE CHANGED';
  if (!ha) htmlDiff++; if (!ta) treeDiff++;
  console.log(`${lang} | html ${ha ? 'same' : 'DIFF'} | tree ${ta ? 'same' : 'DIFF'} | ${shape}`);
  if (!ha) { console.log('   A:', ra.value.slice(0, 300)); console.log('   B:', rb.value.slice(0, 300)); }
}
console.log('samples', Object.keys(samples).length, '| html differ', htmlDiff, '| tree differ', treeDiff);
