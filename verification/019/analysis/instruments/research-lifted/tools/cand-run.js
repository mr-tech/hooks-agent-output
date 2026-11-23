// Run candidate open-source parsers over the corpus. usage: node cand-run.js <cands-dir> <corpus.json> <out-dir>
'use strict';
const fs = require('fs');
const path = require('path');

const [candsDir, corpusFile, outDir] = process.argv.slice(2);
const corpus = JSON.parse(fs.readFileSync(corpusFile, 'utf8'));
const req = (name) => require(path.join(candsDir, 'node_modules', name));

const impls = {
  'discord-markdown': () => {
    const dm = req('discord-markdown');
    return (t) => dm.parser(t);
  },
  'discord-markdown-discordOnly': () => {
    const dm = req('discord-markdown');
    return (t) => dm.parser(t, { discordOnly: false, embed: true });
  },
  'discord-markdown-parser': () => {
    const p = req('discord-markdown-parser');
    const parse = p.parse || p.default;
    return (t) => parse(t, 'normal');
  },
  'discord-markdown-parser-extended': () => {
    const p = req('discord-markdown-parser');
    const parse = p.parse || p.default;
    return (t) => parse(t, 'extended');
  },
  'simple-markdown-default': () => {
    const sm = req('simple-markdown');
    return (t) => sm.defaultInlineParse(t);
  },
};

const summary = {};
for (const [name, make] of Object.entries(impls)) {
  let fn;
  try { fn = make(); } catch (e) { summary[name] = `load failed: ${String(e).slice(0, 200)}`; continue; }
  const rows = corpus.map((c) => {
    try { return { id: c.id, out: JSON.parse(JSON.stringify(fn(c.text))) }; } catch (e) { return { id: c.id, error: String(e).slice(0, 200) }; }
  });
  fs.writeFileSync(path.join(outDir, `cand-${name}.json`), JSON.stringify({ rows }));
  summary[name] = { rows: rows.length, errors: rows.filter((r) => r.error).length };
}
console.log(JSON.stringify(summary, null, 1));
