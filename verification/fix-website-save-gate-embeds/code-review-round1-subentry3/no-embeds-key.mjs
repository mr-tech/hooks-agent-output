// Code-review instrument (fix-website-save-gate-embeds, scoped check of QA's test at 0e3d903).
// Run from a website tree: SKIP_ENV_VALIDATION=1 npx tsx <this file>
// gateBeforePersist over V2 components with no `embeds` key, the input of QA's added case.
import { gateBeforePersist } from '~/utils';
try {
  const g = gateBeforePersist({ flags: 1 << 15, components: [{ type: 17, components: [] }], content: '' });
  console.log(JSON.stringify({ mustAsk: g.mustAsk, data: g.data }));
} catch (e) { console.log(`threw: ${e.constructor.name}: ${e.message}`); }
