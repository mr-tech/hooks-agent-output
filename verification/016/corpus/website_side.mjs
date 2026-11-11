// Runs the website's real validateMessage and discordMessageShape over corpus.json, and compares
// each research case with the research's recorded "Send check" and "Save schema" columns.
// A reconstruction-fidelity instrument (RK-2), second to the Discord re-send.
// Run network-isolated, over an export of the website tree at a named commit:
//   SKIP_ENV_VALIDATION=1 WEBSITE_ROOT=<export> unshare -rn node --experimental-transform-types \
//     --import ./ts-register.mjs website_side.mjs corpus.json research-table.json out.json
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [corpusPath, rtPath, outPath] = process.argv.slice(2);
const root = process.env.WEBSITE_ROOT;
const { validateMessage } = await import(pathToFileURL(path.join(root, 'src/utils/limits.tsx')).href);
const { discordMessageShape } = await import(pathToFileURL(path.join(root, 'src/server/api/utils/shapes.ts')).href);

const corpus = JSON.parse(readFileSync(corpusPath, 'utf8'));
const rows = JSON.parse(readFileSync(rtPath, 'utf8')).rows;

const results = [];
let mismatches = 0;
for (const c of corpus) {
  const input = { username: 'Probe', ...c.body };
  const reason = validateMessage(input);
  const admits = discordMessageShape.safeParse(input).success;
  const rec = { id: c.id, set: c.set, sendCheck: reason ? 'blocks' : 'passes', reason, saveSchema: admits ? 'admits' : 'rejects' };
  if (c.set === 'research') {
    const r = rows[c.id];
    rec.researchSendCheck = r.send_check;
    rec.researchSaveSchema = r.save_schema;
    rec.match = r.send_check === rec.sendCheck && r.save_schema === rec.saveSchema;
    if (!rec.match) mismatches += 1;
  }
  results.push(rec);
}
writeFileSync(outPath, JSON.stringify(results, null, 1));
const research = results.filter((r) => r.set === 'research');
console.log(`research=${research.length} match=${research.filter((r) => r.match).length} mismatches=${mismatches}`
  + ` blocks=${research.filter((r) => r.sendCheck === 'blocks').length}`
  + ` rejects=${research.filter((r) => r.saveSchema === 'rejects').length}`);
process.exitCode = mismatches ? 1 : 0;
