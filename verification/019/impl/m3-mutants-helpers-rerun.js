const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [exportDir, outDir] = process.argv.slice(2);
if (!exportDir || !outDir) throw new Error('usage: node m3-mutants-helpers-rerun.js <export-dir> <out-dir>');
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

const IMP = `${MD}/helpers/importersOf.ts`;
const CMD_IMP = ['--project', 'node', `${MD}/engine.import-confinement.test.ts`];
const CMD_OFF = ['--project', 'discord-node', `${MD}/discord/discordOffline.fetch-failure.test.ts`];

const CMD_PROP = ['--project', 'dom', `${SE}/SlateEditor.typed-text-reaches-the-message.test.tsx`];

const MUTANTS = [
  ['M3-r3b every nested wrapper closed', GEN, 'const closed = r() < 0.8;', 'const closed = r() < 1;', CMD_GEN],
  ['M3-r3d catalogue never leads', GEN, 'if (i < CATALOGUE.length) {', 'if (i < 0) {', CMD_GEN],
  ['M3-r4b stored url keeps the host case', CAN, '${m[2].toLowerCase()}', '${m[2]}', CMD_CAN],
  ['M3-r4c strict form stores the url too', CAN, "if (loose && n.name === 'a') attr = storedUrl(attr);", "if (n.name === 'a') attr = storedUrl(attr);", CMD_CAN],
  ['M3-r6a drift reported when equal', LIVE, 'const match = served === pinned;', 'const match = served !== pinned;', CMD_LIVE],
  ['M3-r19a edits skip no line', EDI, 'if (flattenNodeText([node]) !== line) return [];', 'if (false) return [];', CMD_RTI],
  ['M3-r20b a typed line break is a character', MNT, "if (ch === '\\n') editor.insertBreak(); else editor.insertText(ch);", 'editor.insertText(ch);', CMD_PROP],
  ['M3-c1 an import() call is not a load', IMP, 'callee.kind === ts.SyntaxKind.ImportKeyword ||', 'false ||', CMD_IMP],
  ['M3-c2 a require() call is not a load', IMP, "(ts.isIdentifier(callee) && callee.text === 'require')", 'false', CMD_IMP],
  ['M3-c3 a template with no substitution is not a literal', IMP, '!ts.isStringLiteralLike(node.arguments[0])', '!ts.isStringLiteral(node.arguments[0])', CMD_IMP],
  ['M3-c4 only a top-level call is read', IMP, 'return ts.forEachChild(node, visit) === true;', 'return false;', CMD_IMP],
  ['M3-c5 a production file is never reported', IMP, 'if (loadsNonLiteral(text, file)) unresolvable.push(name);', 'if (loadsNonLiteral(text, file) && false) unresolvable.push(name);', CMD_IMP],
  ['M3-o1 the fetch failure does not name the page', BLD, '`discord-oracle: fetching ${url} failed: ${cause}`', '`discord-oracle: fetching failed: ${cause}`', CMD_OFF],
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
