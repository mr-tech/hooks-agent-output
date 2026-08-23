// Q1 SUBJECT: shipped emit() at eb28ae6 — stdout write precedes persistReport.
// Question: if the stdout channel fails, does the DURABLE channel still get written?
// Oracle: existence + size of the report file on disk, reported on fd 2 (stderr),
// which is a separate fd and is unaffected by the stdout pipe closing.
import { existsSync, statSync, mkdirSync } from 'fs';
import { emit, emptyReport } from '~/scripts/backfillValid';

const fakeDb = {
  selectFrom: () => ({ select: () => ({ executeTakeFirstOrThrow: () => Promise.resolve({ count: 42 }) }) }),
  fn: { countAll: () => ({ as: () => 'count' }) },
} as unknown as Parameters<typeof emit>[1];

const target = process.env.PROBE_TARGET as string;
mkdirSync(require('path').dirname(target), { recursive: true });

// Payload > 64KB pipe buffer, so the write genuinely meets the closed pipe.
const report = emptyReport();
for (let i = 0; i < 8000; i += 1) report.flagStructureDisagreement.rowIds.push(`row-${i}-padpadpadpad`);
report.flagStructureDisagreement.count = 8000;

(async () => {
  try {
    await emit(report, fakeDb, target, { runId: 'q1', startedAt: 's', endedAt: 'e' });
    process.stderr.write('EMIT_RESOLVED\n');
  } catch (e) {
    process.stderr.write(`EMIT_THREW=${(e as Error).message}\n`);
  }
  process.stderr.write(`REPORT_ON_DISK=${existsSync(target)} SIZE=${existsSync(target) ? statSync(target).size : 0}\n`);
})();
process.on('exit', (c) => {
  process.stderr.write(`EXIT code=${c} REPORT_ON_DISK=${existsSync(target)}\n`);
});
process.on('uncaughtException', (e) => {
  process.stderr.write(`UNCAUGHT=${(e as Error).message}\n`);
});
