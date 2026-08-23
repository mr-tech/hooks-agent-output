// Q1 DISCRIMINATING CONTROL: identical, except the durable write is attempted FIRST
// (guarded), then stdout. If the report survives here but not in the subject, the
// ordering is the cause — not the harness, not the payload, not the pipe.
import { existsSync, statSync, mkdirSync } from 'fs';
import { emptyReport, formatReport, persistReport } from '~/scripts/backfillValid';

const target = process.env.PROBE_TARGET as string;
mkdirSync(require('path').dirname(target), { recursive: true });

const report = emptyReport();
for (let i = 0; i < 8000; i += 1) report.flagStructureDisagreement.rowIds.push(`row-${i}-padpadpadpad`);
report.flagStructureDisagreement.count = 8000;

(async () => {
  const content = formatReport(report, { tableWideRowCount: 42 });
  try { persistReport(content, target); } catch (e) { process.stderr.write(`PERSIST_THREW\n`); }
  try { process.stdout.write(`${content}\n`); } catch (e) { process.stderr.write(`STDOUT_THREW=${(e as Error).message}\n`); }
  process.stderr.write(`REPORT_ON_DISK=${existsSync(target)} SIZE=${existsSync(target) ? statSync(target).size : 0}\n`);
})();
process.on('exit', (c) => {
  process.stderr.write(`EXIT code=${c} REPORT_ON_DISK=${existsSync(target)}\n`);
});
