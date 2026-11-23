// Cost of one decorate pass over one line split by inline emoji elements, when every text node re-parses the whole line.
// Usage: node split.mjs <path to node_modules/@discord/markdown-wasm/src/index.js>
const { parseLossless } = await import(process.argv[2]);
parseLossless('warm');
for (const [len, every] of [[2000, 4], [4096, 4], [2000, 40], [4096, 40]]) {
  let s = '';
  let nodes = 1;
  while (s.length < len) { s += 'a*b'.padEnd(every - 2, 'x') + '🙂'; nodes += 1; }
  const t0 = process.hrtime.bigint();
  for (let i = 0; i < nodes; i++) parseLossless(s);
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  const t1 = process.hrtime.bigint();
  parseLossless(s);
  const once = Number(process.hrtime.bigint() - t1) / 1e6;
  console.log(`line ${s.length} chars, ${nodes} text nodes: re-parse per text node ${ms.toFixed(1)} ms per pass; parse once ${once.toFixed(2)} ms`);
}
