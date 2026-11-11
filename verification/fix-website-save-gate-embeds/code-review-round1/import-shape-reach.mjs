// Code-review instrument (fix-website-save-gate-embeds). Run from a website tree:
//   SKIP_ENV_VALIDATION=1 npx tsx <this file>
// For pasted JSON holding a V2 container beside each empty-embed shape, prints what
// discordMessageImportShape keeps and the row resolveContentLoss gives the parsed object — the
// two steps both JSON surfaces (JsonModalBody, NewMessageJsonInput) run before deciding to ask.
import { discordMessageImportShape } from '~/server/api/utils/shapes';
import { resolveContentLoss } from '~/utils';

const container = { type: 17, components: [{ type: 10, content: 'x' }] };
const embeds = { empty: {}, emptyTitle: { title: '' }, keyOnly: { _key: 'k1' }, emptyFields: { fields: [] }, titled: { title: 't' } };
for (const flags of [undefined, 32768]) for (const [k, e] of Object.entries(embeds)) {
  const raw = { ...(flags ? { flags } : {}), components: [container], embeds: [e] };
  let line;
  try {
    const p = discordMessageImportShape.parse(raw);
    const d = resolveContentLoss(p.flags, p.components, p.content, p.embeds);
    line = `parsed embeds=${JSON.stringify(p.embeds)} row=${d.row} requiresChoice=${d.requiresChoice}`;
  } catch (err) { line = `rejected: ${String(err.message).slice(0, 120)}`; }
  console.log(`flags=${flags} embed=${k}: ${line}`);
}
