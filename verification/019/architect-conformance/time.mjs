// Times parse and parseLossless at stated input lengths. Usage: node time.mjs <path to node_modules/@discord/markdown-wasm/src/index.js>
const mod = await import(process.argv[2]);
const { parse, parseLossless } = mod;
const unit = {
  plain: 'lorem ipsum dolor sit amet ',
  nested: '***__~~||a||~~__*** ',
  unbalanced: '*_~|`[(<',
  links: '[a](https://x.y/🙂) https://x.y🙂 <https://e.com> ',
  emoji: '🙂👍🏻❤️:smile: ',
  lines: '> q **b**\n- l *i*\n# h\n-# s\n',
};
function make(u, n) { let s = ''; while (s.length < n) s += u; return s.slice(0, n); }
function time(fn, s) {
  for (let i = 0; i < 3; i++) fn(s);
  const t = [];
  for (let i = 0; i < 25; i++) { const a = process.hrtime.bigint(); fn(s); t.push(Number(process.hrtime.bigint() - a) / 1e6); }
  t.sort((x, y) => x - y);
  return { median: t[12].toFixed(3), max: t[24].toFixed(3) };
}
parse('warm');
const out = [];
for (const n of [256, 1024, 2000, 4096, 20000]) {
  for (const [k, u] of Object.entries(unit)) {
    const s = make(u, n);
    out.push({ n, kind: k, parse: time(parse, s), lossless: time(parseLossless, s) });
  }
}
for (const r of out) console.log(`${r.n}\t${r.kind}\tparse med ${r.parse.median} max ${r.parse.max} ms\tlossless med ${r.lossless.median} max ${r.lossless.max} ms`);
