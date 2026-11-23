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
  ['M3-r20b a typed line break is a character', MNT, "if (ch === '\\n') editor.insertBreak(); else editor.insertText(ch);", 'editor.insertText(ch);', CMD_CTL],
  ['M3-c3 a template with no substitution is not a literal', IMP, '!ts.isStringLiteralLike(specifier)', '!ts.isStringLiteral(specifier)', CMD_IMP],
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
