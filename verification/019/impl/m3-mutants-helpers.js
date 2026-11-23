const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [exportDir, outDir] = process.argv.slice(2);
if (!exportDir || !outDir) throw new Error('usage: node m3-mutants-helpers.js <export-dir> <out-dir>');
fs.mkdirSync(outDir, { recursive: true });

const MD = 'src/utils/markdown/__tests__';
const SE = 'src/components/SlateEditor/__tests__';
const GEN = `${MD}/helpers/markdownGenerator.ts`;
const CAN = `${MD}/helpers/canonicalForm.ts`;
const BLD = `${MD}/helpers/discordBuild.ts`;
const REP = `${MD}/helpers/discordReports.ts`;
const RTI = `${SE}/helpers/roundTripInputs.ts`;
const EDI = `${SE}/helpers/blockLayerEdits.ts`;
const MNT = `${SE}/helpers/mountedEditor.tsx`;
const LIVE = `${MD}/helpers/discordLive.ts`;
const CMD_GEN = ['--project', 'node', `${MD}/markdownGenerator.seeded-inputs.test.ts`];
const CMD_CAN = ['--project', 'node', `${MD}/canonicalForm.appendix-a.test.ts`];
const CMD_BLD = ['--project', 'node', `${MD}/discordBuild.locators.test.ts`];
const CMD_REP = ['--project', 'node', `${MD}/discordReports.report-forms.test.ts`];
const CMD_RTI = ['--project', 'node', `${SE}/roundTripInputs.classes.test.ts`];
const CMD_CTL = ['--project', 'dom', `${SE}/SlateEditor.typed-text-reaches-the-message.test.tsx`, '-t', 'reaches|hands|synchronous'];
const CMD_LIVE = ['--project', 'discord-node', `${MD}/discord/discordLive.oracle-controls.test.ts`];

const MUTANTS = [
  ['M3-r3a mulberry32 constant', GEN, '0x6d2b79f5', '0x6d2b79f6', CMD_GEN],
  ['M3-r3b every nested wrapper closed', GEN, 'const closed = r() < 0.8;', 'const closed = r() < 1;', CMD_GEN],
  ['M3-r3c every index mixes the same offset', GEN, 'Math.imul(i + 1, 0x9e3779b1)', 'Math.imul(1, 0x9e3779b1)', CMD_GEN],
  ['M3-r3d catalogue never leads', GEN, 'if (i < CATALOGUE.length) {', 'if (i < 0) {', CMD_GEN],
  ['M3-r4a loose form trims only the leading newlines', CAN, 'const trimNewlines = (s: string) => s.replace(/^\\n+|\\n+$/g, \'\');', 'const trimNewlines = (s: string) => s.replace(/^\\n+/g, \'\');', CMD_CAN],
  ['M3-r4b stored url keeps the host case', CAN, '${m[2].toLowerCase()}', '${m[2]}', CMD_CAN],
  ['M3-r4c strict form stores the url too', CAN, "if (loose && n.name === 'a') attr = storedUrl(attr);", "if (n.name === 'a') attr = storedUrl(attr);", CMD_CAN],
  ['M3-r5a startup accepts several calls', BLD, 'if (starts.length !== 1) throw', 'if (starts.length < 1) throw', CMD_BLD],
  ['M3-r5b locate accepts several modules', BLD, 'if (hits.length !== 1) {', 'if (hits.length < 1) {', CMD_BLD],
  ['M3-r5c a refused script is read as a body', BLD, 'if (!response.ok) throw new OracleError', 'if (false) throw new OracleError', CMD_BLD],
  ['M3-r5d chunk table reads decimal ids only', BLD, '(?:\\d+(?:e\\d+)?:"[0-9a-f]+",?)+', '(?:\\d+:"[0-9a-f]+",?)+', CMD_BLD],
  ['M3-r6a drift reported when equal', LIVE, 'const match = served === pinned;', 'const match = served !== pinned;', CMD_LIVE],
  ['M3-r6b clean tree keeps originalMatch', LIVE, "if (key !== 'originalMatch') {", 'if (true) {', CMD_LIVE],
  ['M3-r16a unexamined cell is one with a single member', REP, 'filter((c) => c.agree === 0)', 'filter((c) => c.agree === 1)', CMD_REP],
  ['M3-r16b a marker is not a marker', REP, 'if ([...set].some((a) => BOX_MARKER.has(a))) return \'~\';', 'if (false) return \'~\';', CMD_REP],
  ['M3-r16c a construct is named when the parse is unchanged', REP, 'shown(nativeParse(text, SYNTAX_ALL & ~PINNED_SINGLE_BIT_SYNTAX[bit])) !== whole', 'shown(nativeParse(text, SYNTAX_ALL & ~PINNED_SINGLE_BIT_SYNTAX[bit])) === whole', CMD_REP],
  ['M3-r16d box attribute order matters', REP, ".sort().join('+')", ".join('+')", CMD_REP],
  ['M3-r18a probe holds 100 fenced lines fewer', RTI, 'n + 1 < 300', 'n + 1 < 200', CMD_RTI],
  ['M3-r18b block texts hold one line fewer', RTI, '1 + Math.floor(rnd() * 6)', '1 + Math.floor(rnd() * 5)', CMD_RTI],
  ['M3-r19a edits skip no line', EDI, 'if (flattenNodeText([node]) !== line) return [];', 'if (false) return [];', CMD_RTI],
  ['M3-r19b edits count the quote prefix as text', EDI, "node.type === 'blockQuote' ? (node.quotePrefix ?? '> ').length : 0", '0', CMD_RTI],
  ['M3-r20a typing waits for no change report', MNT, 'await act(async () => { if (ch === \'\\n\') editor.insertBreak(); else editor.insertText(ch); });', 'act(() => { if (ch === \'\\n\') editor.insertBreak(); else editor.insertText(ch); });', CMD_CTL],
  ['M3-r20b a typed line break is a character', MNT, "if (ch === '\\n') editor.insertBreak(); else editor.insertText(ch);", 'editor.insertText(ch);', CMD_CTL],
];

const results = [];
const pristine = new Map();
for (const [name, file, from, to, cmd] of MUTANTS) {
  const target = path.join(exportDir, file);
  if (!pristine.has(file)) pristine.set(file, fs.readFileSync(target, 'utf8'));
  const original = pristine.get(file);
  const slug = name.split(' ')[0];
  if (!original.includes(from)) { results.push({ name, outcome: 'NOT-APPLIED (anchor absent)' }); continue; }
  const run = (label) => {
    const log = path.join(outDir, `${slug}.${label}.log`);
    const fd = fs.openSync(log, 'w');
    const r = spawnSync('setsid', ['timeout', '-k', '5', '240', 'npx', 'vitest', 'run', ...cmd], { cwd: exportDir, stdio: ['ignore', fd, fd] });
    fs.closeSync(fd);
    return r.status;
  };
  fs.writeFileSync(target, original);
  const control = run('control');
  if (control !== 0) { results.push({ name, outcome: `CONTROL-FAILED (exit ${control})` }); continue; }
  fs.writeFileSync(target, original.replace(from, to));
  const status = run('mutant');
  fs.writeFileSync(target, original);
  results.push({ name, outcome: status === 0 ? 'SURVIVED' : (status === 124 || status === 137 ? 'TIMEOUT' : 'KILLED') });
}
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 1));
for (const r of results) console.log(`${r.name}: ${r.outcome}`);
const live = results.filter((r) => !r.outcome.startsWith('NOT-APPLIED') && !r.outcome.startsWith('CONTROL'));
console.log(`${live.filter((r) => r.outcome === 'KILLED').length} of ${live.length} killed`);
