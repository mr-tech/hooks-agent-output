// AN-3 (analysis 019): native parse over the corpus under the mask the AN-3 table gives each surface (rendered = legacy column).
import { parse, Syntax as X } from '@discord/markdown-wasm';
import fs from 'node:fs';
const [corpusFile, outDir] = process.argv.slice(2);
const base = X.ALL & ~X.DEV_LINKS;
const titleOff = X.USER_MENTION | X.ROLE_MENTION | X.EVERYONE_MENTION | X.HERE_MENTION | X.CODE_BLOCK | X.HEADING | X.LIST | X.SUBTEXT;
const masks = {
  content_webhook: base,
  embed_description: base,
  embed_field_value: base & ~X.HEADING,
  embed_title: base & ~titleOff,
  embed_title_with_url: base & ~titleOff & ~X.LINKS,
  field_name: base & ~titleOff,
  field_name_embed_has_url: base & ~titleOff & ~X.LINKS,
  text_display_webhook: base,
};
const corpus = JSON.parse(fs.readFileSync(corpusFile, 'utf8'));
const j = (v) => JSON.stringify(v, (k, x) => typeof x === 'bigint' ? `${x}n` : x);
for (const [name, m] of Object.entries(masks)) {
  fs.writeFileSync(`${outDir}/native-${name}.jsonl`, corpus.map((c) => j({ in: c.text, out: parse(c.text, m) })).join('\n') + '\n');
}
fs.writeFileSync(`${outDir}/masks.json`, JSON.stringify(Object.fromEntries(Object.entries(masks).map(([k, v]) => [k, `0x${v.toString(16)}`])), null, 1));
console.log(Object.fromEntries(Object.entries(masks).map(([k, v]) => [k, `0x${v.toString(16)}`])));
