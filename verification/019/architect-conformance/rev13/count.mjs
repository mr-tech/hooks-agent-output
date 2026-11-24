import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire('/usr/local/bin/hooks/website/package.json');
const wasm = await import(require.resolve('@discord/markdown-wasm'));
const { parse } = wasm;
const masks = { content: 0x3fffffff, embedDescription: 0x3fffffff, fieldValue: 0x3dffffff, embedTitle: 0x19fec97f, embedTitleWithUrl: 0x19fec907, v2Text: 0x3fffffff };
const corpus = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const kinds = new Set();
function walk(n, acc) { if (Array.isArray(n)) { n.forEach((x) => walk(x, acc)); return; } if (n && typeof n === 'object') { if (typeof n.type === 'string') { kinds.add(n.type); if (/emoji/i.test(n.type)) acc.push(n.type); } Object.values(n).forEach((v) => walk(v, acc)); } }
const out = {};
for (const [s, m] of Object.entries(masks)) { let inputs = 0, withEmoji = 0, spans = 0; for (const c of corpus) { const acc = []; walk(parse(c.text, m), acc); inputs++; if (acc.length) withEmoji++; spans += acc.length; } out[s] = { inputs, withEmoji, spans }; }
console.log(JSON.stringify(out)); console.log([...kinds].join(','));
