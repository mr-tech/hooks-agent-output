// AN-8 G-1 (analysis 019): the published engine's parse of the game-mention cases, with and without the GAME_MENTION bit.
// usage: node gm-native.mjs <engine package dir> <cases.json> <out.json>
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const [pkg, casesFile, outFile] = process.argv.slice(2);
const { parse, Syntax: X } = await import(pathToFileURL(`${pkg}/src/index.js`).href);
const base = X.ALL & ~X.DEV_LINKS;
const masks = { base, base_no_game: base & ~X.GAME_MENTION };
const cases = JSON.parse(fs.readFileSync(casesFile, 'utf8'));
const j = (v) => JSON.parse(JSON.stringify(v, (k, x) => typeof x === 'bigint' ? `${x}n` : x));
const out = { GAME_MENTION_bit: X.GAME_MENTION, masks: Object.fromEntries(Object.entries(masks).map(([k, v]) => [k, `0x${v.toString(16)}`])), rows: [] };
for (const c of cases) for (const [m, v] of Object.entries(masks)) out.rows.push({ id: c.id, mask: m, out: j(parse(c.text, v)) });
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
for (const r of out.rows) console.log(r.id, r.mask, JSON.stringify(r.out).slice(0, 300));
