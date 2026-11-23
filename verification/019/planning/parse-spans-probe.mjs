const m = await import(process.argv[2]);
const out = {};
for (const t of ['<t:1700000000:f> **a** `<t:1:f>`', '-# s\n# h\n- l', 'https://x.y🙂', '[a](https://x.y/🙂)']) {
  out[t] = { parse: m.parse(t), lossless: m.parseLossless(t) };
}
console.log(JSON.stringify(out, (k, v) => typeof v === 'bigint' ? v.toString() + 'n' : v));
console.log('exports', Object.keys(m).join(','), 'ALL', m.Syntax.ALL);
