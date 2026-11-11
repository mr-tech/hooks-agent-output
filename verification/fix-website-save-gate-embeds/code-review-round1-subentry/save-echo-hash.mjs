// Code-review instrument (fix-website-save-gate-embeds, Round 1 sub-entry). Run from a website tree:
//   SKIP_ENV_VALIDATION=1 npx tsx <this file>
// The editor Save path, with no mocks below it: the client computes what saveMessage hands
// message.upsert, the server parses it with the router's input shape and broadcasts
// hashMessage(message) (shared.ts upsertMessage). usePusher then compares that hash with
// hashMessage(normalizeForHash(messageRef.current)), the editor's LOCAL message. A mismatch shows
// "Message Update Detected" to the user who just saved. It also prints the send page's check over
// the local message (send/page.tsx: validateMessage(message.data)).
import { gateBeforePersist, stripKeys, hashMessage } from '~/utils';
import { optionalIdMessageShape } from '~/server/api/utils/shapes';
import { normalizeForHash } from '~/providers/MessageProvider/usePusher';
import { validateContentRequirements } from '~/utils/limits';

const BIT = 1 << 15;
const local = {
  id: '1', name: 'n', guildId: null,
  data: {
    flags: BIT, content: '', embeds: [{ _key: 'e1' }],
    components: [{ _key: 'c1', type: 17, components: [{ _key: 't1', type: 10, content: 'x' }] }],
  },
};
const gate = gateBeforePersist(local.data);
const sent = stripKeys({ ...local, data: gate.data ?? local.data });
const parsed = optionalIdMessageShape.parse(sent);
const serverHash = hashMessage(parsed);
const clientHash = hashMessage(normalizeForHash(local));
console.log(JSON.stringify({
  mustAsk: gate.mustAsk,
  sentEmbeds: sent.data.embeds,
  serverHash, clientHash, promptShown: serverHash !== clientHash,
  sendCheckOnLocal: validateContentRequirements(local.data) ?? null,
}));

// Second case: the pre-existing row-E path (useApiMethods.commitSaveChoice persists
// applyDisposition(draft, chosen) and leaves the editor's message as it was).
import { applyDisposition } from '~/utils';
const mixed = { ...local, data: { ...local.data, embeds: [{ _key: 'e2', title: 'real' }] } };
const resolved = stripKeys({ ...mixed, data: applyDisposition(mixed.data, 'v2') });
const h2s = hashMessage(optionalIdMessageShape.parse(resolved));
const h2c = hashMessage(normalizeForHash(mixed));
console.log(JSON.stringify({ case: 'commitSaveChoice v2', promptShown: h2s !== h2c,
  sendCheckOnLocal: validateContentRequirements(mixed.data) ?? null }));
