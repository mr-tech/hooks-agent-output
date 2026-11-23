// Does clearing HEADING (content 0x3fffffff -> field value 0x3dffffff) change any emoji span?
import { parseLossless } from '@discord/markdown-wasm';
const CONTENT = 0x3fffffff, FIELD_VALUE = 0x3dffffff;
function spans(t, m) {
  const out = [];
  (function walk(n) {
    if (n.type !== 'token' && n.kind?.type === 'emoji') out.push(`${n.span.start}-${n.span.end}`);
    for (const c of n.children ?? []) walk(c);
  })(parseLossless(t, m));
  return out.join(',');
}
const atoms = ['# ', '## ', '### ', '-# ', '#', '> ', '>>> ', '- ', '* ', '1. ', '\n', '\n', ' ', ':smile:', ':x:', '🙂', '<:a:123456789012345678>',
  '<a:b:123456789012345678>', '`', '``', '```', '**', '*', '_', '__', '~~', '||', '[', ']', '(', ')', 'https://a.example/', '<', '>', '\\', 'hi', ':'];
let seed = 19; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const fixed = ['# :smile:', '# `:smile:`', '## a 🙂 b', '-# <:a:123456789012345678>', '> # :x:', '- # :x:', '# [ :x: ](https://a.example/)',
  '# ```\n:x:\n```', '#:x:', '# :sm\nile:', '```\n# :x:\n```', '# ||:x:||'];
let n = 0, diff = [];
const inputs = [...fixed];
for (let i = 0; i < 50000; i++) { let s = ''; const k = 1 + Math.floor(rnd() * 12); for (let j = 0; j < k; j++) s += atoms[Math.floor(rnd() * atoms.length)]; inputs.push(s); }
let withEmoji = 0, withHeadingDiff = 0;
for (const t of inputs) {
  n++;
  const a = spans(t, CONTENT), b = spans(t, FIELD_VALUE);
  if (a) withEmoji++;
  if (a !== b) diff.push({ t, a, b });
}
console.log(JSON.stringify({ wasm: '0.16.0', inputs: n, inputsWithEmoji: withEmoji, differing: diff.length, examples: diff.slice(0, 10) }, null, 1));
