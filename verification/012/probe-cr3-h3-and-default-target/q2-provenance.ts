// Q2: do runId/startedAt/endedAt actually reach the PERSISTED body?
// Subject: shipped emit() + shipped formatReport() + shipped persistReport() at eb28ae6.
import { readFileSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { emit, emptyReport } from '~/scripts/backfillValid';

const fakeDb = {
  selectFrom: () => ({ select: () => ({ executeTakeFirstOrThrow: () => Promise.resolve({ count: 42 }) }) }),
  fn: { countAll: () => ({ as: () => 'count' }) },
} as unknown as Parameters<typeof emit>[1];

(async () => {
  const dir = mkdtempSync(join(tmpdir(), 'q2-'));
  const target = join(dir, 'r.md');
  await emit(emptyReport(), fakeDb, target, {
    interrupted: false, runId: 'RUNID-SENTINEL', startedAt: 'STARTED-SENTINEL', endedAt: 'ENDED-SENTINEL',
  });
  const body = JSON.parse(readFileSync(target, 'utf8'));
  process.stderr.write(`PERSISTED_KEYS=${Object.keys(body).join(',')}\n`);
  process.stderr.write(`runId=${body.runId} startedAt=${body.startedAt} endedAt=${body.endedAt}\n`);
  rmSync(dir, { recursive: true, force: true });
})();
