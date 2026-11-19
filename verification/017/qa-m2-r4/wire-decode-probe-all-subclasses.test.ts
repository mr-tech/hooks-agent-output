// QA Phase 1 re-key, plan 017 revision 10: feasibility probe for AF-25's instrument.
// Placed into an export at src/server/api/utils/__tests__/ and run there; never in the shared tree.
// The producer is the real upsertMessage; node `pusher` 5.1.3 is real (only its HTTP post is
// replaced, after ensureJSON has run); the client decode is pusher-js 8.3.0's own Protocol source.
import Pusher from 'pusher';
import Protocol from 'pusher-js/src/core/connection/protocol/protocol';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import createCapturingDatabase from './helpers/capturingDatabase';

import type { IncomingMessage } from '~/server/api/utils/shapes';

import { upsertMessage } from '~/server/api/utils/shared';

const hoisted = vi.hoisted(() => ({ db: undefined as unknown }));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => (String(key) === 'PUSHER_APP_ID' ? '1' : `test-${String(key)}`) }),
}));
vi.mock('project-utils', () => ({ getPostgres: () => hoisted.db }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));

const bodies: { path: string; body: { name: string; channels: string[]; data: unknown } }[] = [];

beforeEach(() => {
  bodies.length = 0;
  vi.spyOn(Pusher.prototype, 'post').mockImplementation(function post(options: never) {
    bodies.push(options);
    return Promise.resolve({ status: 200 } as never);
  });
  vi.stubGlobal('fetch', vi.fn(() => new Promise<never>(() => { void 0; })));
  hoisted.db = createCapturingDatabase(({ sql }) => {
    if (sql.startsWith('insert into "Guilds"')) return [{ id: 'guild-row' }];
    if (sql.startsWith('select count(*)')) return [{ count: '0' }];
    if (sql.startsWith('insert into "Messages"')) return [{ id: '42', savedAtMicros: '1763509200000000' }];
    return [{
      id: '42', createdAt: new Date(0), updatedAt: new Date(0), name: 'n', data: {}, previewImageNonce: null,
    }];
  }).db;
});
afterEach(() => { vi.restoreAllMocks(); });

const messageWith = (content: string) => ({
  id: '42', name: 'n', data: { content, username: 'U', embeds: [], components: [] },
}) as unknown as IncomingMessage;

async function decodedAtSubscriber(content: string) {
  await upsertMessage(messageWith(content), { dbUserId: 'u1' } as never);
  expect(bodies).toHaveLength(1);
  const { body } = bodies[0];
  // The frame Pusher's service relays to a subscriber: the event, its channel, and the data string as posted.
  const frame = JSON.stringify({ event: body.name, channel: body.channels[0], data: body.data });
  return Protocol.decodeMessage({ data: frame } as MessageEvent);
}

describe('the save broadcast as a subscriber decodes it', () => {
  it.each([
    ['ordinary', 'p0', '2cf29ca1'],
    ['digits only', 'p29', '10942554'],
    ['a minus sign and digits', 'p44', '-47974433'],
    ['digits, an e and 00', 'p855292', '51354e00'],
    ['a minus sign, digits, an e and 02', 'p1129796', '-107e02'],
    ['an exponent past a double', 'p388', '7181e724'],
  ])('decodes to the producer\'s exact hash string (%s)', async (_shape, content, hash) => {
    const event = await decodedAtSubscriber(content);

    expect(event.event).toBe('message-update');
    expect(event.channel).toBe('message-update-42');
    expect(event.data).toBe(hash);
  });
});
