import { sql } from 'kysely';
import { getPostgres } from 'project-utils';
import {
  afterAll, beforeAll, describe, expect, it, vi,
} from 'vitest';

import messageRouter from '~/server/api/routers/message';

const mocks = vi.hoisted(() => ({
  account: null as null | { userId: string, access_token: string, providerAccountId: string },
}));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));
vi.mock('~/server/auth', () => ({
  getServerAuthSession: vi.fn(),
  getHydratedServerAuthSession: vi.fn(),
}));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({
  default: {
    fetchAccountFromSession: async () => mocks.account,
    fetchUserGuilds: async () => [],
  },
}));
vi.mock('~/utils/redis/client', () => ({ getClient: () => ({}) }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const OWNER = { discordId: '100000000000000001', dbUserId: '900000000000001' };
const OTHER = { discordId: '100000000000000002', dbUserId: '900000000000002' };
const ID = { ownerPersonal: '900000000000101', absent: '900000000000599' };
const NOT_FOUND_TEXT = 'This message doesn\'t exist, or you don\'t have access to it.';

const db = () => getPostgres();

beforeAll(async () => {
  for (const user of [OWNER, OTHER]) {
    await sql`insert into "Users" (id) values (${user.dbUserId})`.execute(db());
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId")
      values (${user.dbUserId}, 'oauth', 'discord', ${user.discordId})`.execute(db());
  }
  await sql`insert into "Messages" (id, fk_users_id, fk_guilds_id, name, data, "updatedAt")
    values (${ID.ownerPersonal}, ${OWNER.dbUserId}, null, 'owner-name', ${JSON.stringify({ content: 'owner-only' })}::jsonb, now())`.execute(db());
});

afterAll(async () => { await db().destroy(); });

function callerAs(user: typeof OWNER) {
  mocks.account = { userId: user.dbUserId, access_token: 'access-token', providerAccountId: user.discordId };
  return messageRouter.createCaller({
    session: { user: { id: user.discordId, guilds: [] }, expires: 'never' },
    req: { headers: { cookie: '__Secure-next-auth.session-token=session-token' } },
  } as never);
}

const outcomeOf = (promise: Promise<unknown>) => promise.then(
  (value) => ({ value: (value as { id?: unknown })?.id ?? value }),
  (error: { code?: unknown, message?: unknown, cause?: { constructor?: { name?: unknown } } }) => ({
    error: { code: error.code, message: error.message, cause: error.cause?.constructor?.name ?? null },
  }),
);

const outcomes: Record<string, unknown> = {};

describe('message.getOne over project-utils getPostgres on postgres:16', () => {
  it('records the absent-number answer', async () => {
    outcomes.absentAsOther = await outcomeOf(callerAs(OTHER).getOne(ID.absent));
    outcomes.absentAsOwner = await outcomeOf(callerAs(OWNER).getOne(ID.absent));
    expect(true).toBe(true);
  });

  it('records the present-row controls', async () => {
    outcomes.ownerOwnMessage = await outcomeOf(callerAs(OWNER).getOne(ID.ownerPersonal));
    outcomes.otherOnOwnersMessage = await outcomeOf(callerAs(OTHER).getOne(ID.ownerPersonal));
    expect(true).toBe(true);
  });

  it('writes the outcome table', async () => {
    const fs = await import('node:fs');
    fs.writeFileSync(process.env.PROBE_OUT!, `${JSON.stringify({ notFoundText: NOT_FOUND_TEXT, outcomes }, null, 2)}\n`);
  });
});
