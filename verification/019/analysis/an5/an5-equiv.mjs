// AN-5 (analysis 019): does parseLossless's node tree carry everything parse returns? Canonicalise both and compare
// over the research corpus. usage: node an5-equiv.mjs <corpus.json> <out.json>
import { parse, parseLossless } from '@discord/markdown-wasm';
import fs from 'node:fs';

const v = (x) => JSON.stringify(x, (k, y) => (typeof y === 'bigint' ? `${y}n` : y));
// parse tree -> canonical
function cp(nodes) { return (nodes || []).map(cn).join(''); }
function cn(n) {
  switch (n.type) {
    case 'text': return `"${n.value}"`;
    case 'paragraph': return `p(${cp(n.value)})`;
    case 'bold': case 'italic': case 'underline': case 'strikethrough': return `${n.type}(${cp(n.value)})`;
    case 'spoiler': return `spoiler(${cp(n.value.content)})`;
    case 'heading': return `h${n.value.level}(${cp(n.value.content)})`;
    case 'subtext': return `sub(${cp(n.value.content)})`;
    case 'quote': return `q(${cp(n.value)})`;
    case 'list': return `${n.value.type === 'ordered' ? `ol${n.value.value}` : 'ul'}(${n.value.items.map((it) => `li(${cp(it.content)})`).join('')})`;
    case 'link': return `a(${n.value.url}|${n.value.title ?? ''}|${n.value.text ? cp(n.value.text) : ''})`;
    case 'empty': return 'empty()';
    default: return `${n.type}(${v(n.value)})`;
  }
}
// lossless tree -> the same canonical form, from node kinds only (tokens ignored)
function lc(children) { return children.filter((c) => c.type === 'node').map(ln).join(''); }
function ln(n) {
  const k = n.kind;
  switch (k.type) {
    case 'document': return lc(n.children);
    case 'text': return `"${k.value}"`;
    case 'paragraph': return `p(${lc(n.children)})`;
    case 'modifier': return `${k.value.kind}(${lc(n.children)})`;
    case 'heading': return `h${k.value.level}(${lc(n.children)})`;
    case 'subtext': return `sub(${lc(n.children)})`;
    case 'quote': return `q(${lc(n.children)})`;
    case 'list': return `${k.value.type === 'ordered' ? `ol${k.value.value}` : 'ul'}(${lc(n.children)})`;
    case 'list_item': return `li(${lc(n.children)})`;
    case 'link': return `a(${k.value.url}|${k.value.title ?? ''}|${lc(n.children)})`;
    case 'empty': return 'empty()';
    default: return `${k.type}(${v(k.value)})`;
  }
}
// adjacent text nodes merge in one tree and not the other; merge runs of "..." in both
const mergeText = (s) => s.replace(/"([^"]*)""/g, '"$1').replace(/"([^"]*)""/g, '"$1');

const corpus = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const rows = corpus.map((c) => {
  const a = mergeText(cp(parse(c.text)));
  const b = mergeText(lc(parseLossless(c.text).children));
  return { id: c.id, text: c.text, same: a === b, parse: a, lossless: b };
});
fs.writeFileSync(process.argv[3], JSON.stringify(rows, null, 1));
const diff = rows.filter((r) => !r.same);
console.log('same', rows.length - diff.length, 'of', rows.length);
for (const r of diff.slice(0, 15)) console.log(r.id, JSON.stringify(r.text), '\n  parse   ', r.parse.slice(0, 200), '\n  lossless', r.lossless.slice(0, 200));
