// QA probe (export only, never in the website tree): prints the drift alarm's report the live command computes.
import { it } from 'vitest';
import { driftReport, openLive } from '../helpers/discordLive';

it('prints the drift report', async () => {
  const live = await openLive();
  const r = await driftReport(live);
  process.stderr.write(`QA-DRIFT pinned=${r.pinned} served=${r.served} match=${r.match}\nQA-DRIFT message=${r.message}\n`);
}, 120_000);
