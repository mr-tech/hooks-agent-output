/**
 * Premise probe for H3: does the SHIPPED `persistReport` throw when its target is unwritable?
 * Imports shipped code (`~/scripts/backfillValid`), not a copy. Positive control included:
 * the same call against a writable target must succeed, so a throw is attributable to the
 * permission, not to the helper being broken generally.
 */
import { mkdtempSync, chmodSync, rmSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import { persistReport } from '~/scripts/backfillValid';

const base = mkdtempSync(join(tmpdir(), 'cr2-h3-'));

// CONTROL: writable target
persistReport('{"control":true}', join(base, 'ok', 'r.md'));
process.stdout.write(`CONTROL: wrote -> ${readFileSync(join(base, 'ok', 'r.md'), 'utf8').trim()}\n`);

// SUBJECT: unwritable parent
const locked = join(base, 'locked');
persistReport('{"seed":true}', join(locked, 'seed.md'));
chmodSync(locked, 0o500);
try {
  persistReport('{"subject":true}', join(locked, 'report.md'));
  process.stdout.write('SUBJECT: persistReport did NOT throw\n');
} catch (err) {
  process.stdout.write(`SUBJECT: persistReport THREW -> ${(err as Error).message}\n`);
}
chmodSync(locked, 0o700);
rmSync(base, { recursive: true, force: true });
