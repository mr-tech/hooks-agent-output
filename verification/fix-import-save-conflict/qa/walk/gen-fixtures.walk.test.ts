// Walk fixture generator, run once inside a git-archive export of website (copied to
// src/utils/__tests__/ there; never committed to website). It writes, beside the path in
// WALK_OUT, the raw Discord message bodies the walk serves to the browser for the Webhook tab
// (the browser's own discordResponseToMessage converts them) and the superjson-encoded tRPC
// bodies for message.getFromUrl and message.getFromCode, built from the router's own return
// shapes (src/server/api/routers/message.ts getFromUrl: { guildId, message, droppedComponentTypes };
// getFromCode: messageStore.retrieve's StoredMessage { data, guildId, ... }).
import { writeFileSync } from 'node:fs';
import { it } from 'vitest';
import superjson from 'superjson';

import discordResponseToMessage from '~/utils/discordResponseToMessage';

const IS_V2 = 1 << 15;
const CONTAINER = { type: 17, components: [{ type: 10, content: 'walk container text' }] };
const author = {
  id: '1', username: 'u', avatar: null, discriminator: '0', public_flags: 0, global_name: null,
};
const base = {
  id: '1400000000000000001', channel_id: '1400000000000000002', author, embeds: [], components: [],
};

const RAW = {
  rowD: { ...base, content: 'walk row D text', flags: IS_V2 },
  rowB: { ...base, content: '', components: [CONTAINER], flags: 0 },
  rowE: { ...base, content: 'walk row E text', components: [CONTAINER], flags: IS_V2 },
  emptyEmbed: { ...base, content: '', embeds: [{}], flags: IS_V2 },
};

it('writes walk fixtures', () => {
  const out = process.env.WALK_OUT as string;
  const files: Record<string, unknown> = {};
  for (const [name, raw] of Object.entries(RAW)) {
    files[`raw-${name}`] = raw;
    const { data, droppedComponentTypes } = discordResponseToMessage(raw as never);
    files[`trpc-getFromUrl-${name}`] = {
      result: { data: superjson.serialize({ guildId: '1566742402180456559', message: data, droppedComponentTypes }) },
    };
    files[`trpc-getFromCode-${name}`] = {
      result: { data: superjson.serialize({ data, guildId: '1566742402180456559' }) },
    };
  }
  writeFileSync(out, JSON.stringify(files, null, 1));
});
