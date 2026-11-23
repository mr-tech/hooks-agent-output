import { parse, parseLossless } from '@discord/markdown-wasm';
const j = (v) => JSON.stringify(v, (k, x) => typeof x === 'bigint' ? `${x}n` : x);
for (const t of ['```JS\nx\n```', '```C++\nx\n```', 'https://x.y🙂 end', 'https://EXAMPLE.com/Path end', '<https://example.com/🙂> end', '<t:1700000000:f> and `<t:1:f>`']) {
  const p = parse(t);
  const tokens = [];
  const walk = (n) => { for (const c of n.children) { if (c.type === 'token') { if (!['text', 'whitespace', 'line_ending'].includes(c.kind.type)) tokens.push(`${c.kind.type}@${c.span.start}-${c.span.end}=${JSON.stringify(c.text)}`); } else { if (['link', 'code_block', 'timestamp'].includes(c.kind.type)) tokens.push(`NODE ${c.kind.type} ${j(c.kind.value)} @${c.span.start}-${c.span.end}`); walk(c); } } };
  walk(parseLossless(t));
  console.log(JSON.stringify(t), '\n  parse:', j(p).slice(0, 260), '\n  lossless:', tokens.join(' | '));
}
