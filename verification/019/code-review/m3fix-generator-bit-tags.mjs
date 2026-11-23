// For every catalogue entry of the seeded generator (the first CATALOGUE.length inputs, each one tagged piece), checks that
// removing each tagged Syntax bit from Syntax.ALL changes the pinned engine's parse: the removal test the coverage report uses.
// A tag whose removal changes nothing names a construct the text does not produce. Website 1698c80 (CR-5 fix confirmation; added: live GAME_MENTION tag count and the near-miss check), @discord/markdown-wasm 0.16.0.
// Usage: node m3-generator-bit-tags.mjs <clone of f4060c5 with node_modules>
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const root = process.argv[2];
const gen = await import(pathToFileURL(`${root}/src/utils/markdown/__tests__/helpers/markdownGenerator.ts`).href);
const wasm = await import(pathToFileURL(createRequire(`${root}/package.json`).resolve('@discord/markdown-wasm')).href);
const ALL = wasm.Syntax.ALL;
const ser = (v) => JSON.stringify(v, (_k, x) => (typeof x === 'bigint' ? `${x}n` : x));
const inputs = gen.generateInputs(20261123, 200);
const dead = [];
let checked = 0;
for (const { text, bits } of inputs) {
  const full = ser(wasm.parse(text, ALL));
  for (const bit of bits) {
    checked += 1;
    const without = ALL & ~wasm.Syntax[bit];
    if (without === 0) continue;
    if (ser(wasm.parse(text, without)) === full) dead.push({ text, bit });
  }
}
const deadCatalogue = dead.filter((d) => inputs.findIndex((i) => i.text === d.text) < 70);
console.log(JSON.stringify({ inputs: inputs.length, tagsChecked: checked, deadTags: dead.length, byBit: Object.fromEntries([...new Set(dead.map((d) => d.bit))].map((b) => [b, dead.filter((d) => d.bit === b).length])), deadInCatalogueRange: deadCatalogue }, null, 1));
const gm = inputs.filter((i) => i.bits.includes('GAME_MENTION'));
const gmLive = gm.filter((i) => ser(wasm.parse(i.text, ALL & ~wasm.Syntax.GAME_MENTION)) !== ser(wasm.parse(i.text, ALL)));
const nearMiss = inputs.filter((i) => i.text.includes('<game:') && !i.bits.includes('GAME_MENTION'));
const nearMissInert = nearMiss.filter((i) => !/<@\$\d+>/.test(i.text)).filter((i) => ser(wasm.parse(i.text, ALL & ~wasm.Syntax.GAME_MENTION)) === ser(wasm.parse(i.text, ALL)));
console.log(JSON.stringify({ gameMentionTagged: gm.length, gameMentionLive: gmLive.length, nearMissUntagged: nearMiss.length, nearMissInertUnderRemoval: nearMissInert.length, nearMissTaggedGame: inputs.filter((i) => i.text.includes('<game:') && i.bits.includes('GAME_MENTION') && !/<@\$\d+>/.test(i.text)).length }));
