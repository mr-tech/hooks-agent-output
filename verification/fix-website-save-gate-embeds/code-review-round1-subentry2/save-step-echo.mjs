// Code-review instrument (fix-website-save-gate-embeds, Round 1 sub-entry 2). Run from a website tree:
//   SKIP_ENV_VALIDATION=1 npx tsx <this file>
// Models the editor save round trip after the shared persist step: the editor's message becomes
// {...local, data} (persist's setMessage), the server hashes optionalIdMessageShape.parse of the
// upsert input (shared.ts upsertMessage), usePusher hashes normalizeForHash(editor message).
// promptShown=false means the saver is not asked to reload. Also prints gateBeforePersist's data
// for a row-E draft with one empty and one real embed (CR-5's guard, now on the gate's output).
import { gateBeforePersist, applyDisposition, stripKeys, hashMessage } from '~/utils';
import { optionalIdMessageShape } from '~/server/api/utils/shapes';
import { normalizeForHash } from '~/providers/MessageProvider/usePusher';
import { validateContentRequirements } from '~/utils/limits';

const BIT = 1 << 15;
const comps = [{ _key: 'c1', type: 17, components: [{ _key: 't1', type: 10, content: 'x' }] }];
function roundTrip(label, local, data) {
  const held = { ...local, data };
  const server = hashMessage(optionalIdMessageShape.parse(stripKeys({ ...local, data })));
  const client = hashMessage(normalizeForHash(held));
  console.log(JSON.stringify({ label, promptShown: server !== client, sendCheckOnHeld: validateContentRequirements(held.data) ?? null }));
}
const empty = { id: '1', name: 'n', guildId: null, data: { flags: BIT, content: '', embeds: [{ _key: 'e1' }], components: comps } };
roundTrip('save, V2 beside {_key}', empty, gateBeforePersist(empty.data).data);
const withContent = { ...empty, data: { ...empty.data, content: 'hi', embeds: [] } };
roundTrip('choice save, classic', withContent, applyDisposition(withContent.data, 'classic'));
roundTrip('choice save, v2', withContent, applyDisposition(withContent.data, 'v2'));
const unchanged = { ...empty, data: { flags: BIT, content: '', embeds: [], components: comps } };
roundTrip('save, nothing to drop', unchanged, gateBeforePersist(unchanged.data).data);
const mixed = gateBeforePersist({ flags: BIT, content: '', embeds: [{}, { title: 'x' }], components: comps });
console.log(JSON.stringify({ label: 'row E, one empty + one real embed', mustAsk: mixed.mustAsk, dataEmbeds: mixed.data.embeds }));
