// Reviewer's probe, website e58f2ed (M4 round): are the engine's spans UTF-16 code units or UTF-8 bytes? Run from an export with node_modules, under unshare -rn.
import { createRequire } from 'node:module';
const req = createRequire(process.cwd() + '/package.json');
const w = await import(req.resolve('@discord/markdown-wasm'));
const ser = (v) => JSON.stringify(v, (_k, x) => (typeof x === 'bigint' ? `${x}n` : x));
for (const text of ['**a** <t:1700000000:R>', 'é**a** <t:1700000000:R>', '日本 <t:1700000000:R>', '🙂 <t:1700000000:R>', '🙂 <#123>']) {
  const tree = w.parseLossless(text, w.Syntax.ALL);
  const out = [];
  const walk = (n) => { if (n.kind && n.kind.type !== 'root' && n.kind.type !== 'paragraph' && n.kind.type !== 'text') out.push([n.kind.type, n.span.start, n.span.end, text.slice(n.span.start, n.span.end)]); (n.children||[]).forEach((c) => c.type === 'node' && walk(c)); };
  walk(tree);
  console.log(ser({ text, utf16len: text.length, utf8len: Buffer.byteLength(text), nodes: out }));
}
