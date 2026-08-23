// Leg 3, decomposed. Driving main() against LIVE PRODUCTION CREDENTIALS to prove a guard
// works is a test whose failure mode IS the harm it tests for -- if the guard were broken
// the backfill would run against production and consume the owner's single-shot gate.
// So the predicate is exercised directly with the real resolved host string, and the
// ORDERING (guard precedes any connection) is established separately by the dead-URL runs,
// where a broken guard costs nothing. Together these are not weaker than the live drive.
import { resolveTargetHost, assertConfirmedTarget } from '~/scripts/backfillValid';
require('dotenv').config({ path: '.env.local' });

const realHost = resolveTargetHost(process.env.DATABASE_URL);
process.stderr.write(`resolved real target = ${realHost}\n`);

for (const [label, confirm] of [
  ['no confirmation (a bare invocation)', undefined],
  ['confirmation for a different host', '127.0.0.1:1'],
] as [string, string | undefined][]) {
  try { assertConfirmedTarget(realHost, confirm); process.stderr.write(`  ${label}: *** ALLOWED ***\n`); }
  catch { process.stderr.write(`  ${label}: REFUSED\n`); }
}
try { assertConfirmedTarget(realHost, realHost); process.stderr.write(`  exact confirmation: ALLOWED (guard must not over-block)\n`); }
catch { process.stderr.write(`  exact confirmation: *** REFUSED — over-blocking ***\n`); }
