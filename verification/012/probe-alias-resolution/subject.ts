// Subject: the same `~/*` alias form src/scripts/backfillValid.ts uses.
// No database module is on this import path.
import { IS_COMPONENTS_V2_FLAG } from '~/constants';

process.stdout.write(`SUBJECT: alias resolved, flag=${IS_COMPONENTS_V2_FLAG}\n`);
