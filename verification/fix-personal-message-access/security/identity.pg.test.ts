import { sql } from 'kysely';
import { getPostgres } from 'project-utils';
import {
  afterAll, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { appRouter } from '~/server/api/root';
import { createTRPCContext } from '~/server/api/trpc';
import getAccount from '~/server/api/utils/getAccount';

// Security-stage identity instrument, fix-personal-message-access.
// Question: does the session that reaches a procedure carry the caller's own identity when it is NOT injected?
// Real here: createTRPCContext, next-auth getServerSession (database strategy), the KyselyAdapter's
// getSessionAndUser, both session callbacks in src/server/auth.ts, ~/utils/redis (fetchUserAccount, its cache,
// mutex and wait path), getAccount, authorizeUser, the routers, kysely, pg, a throwaway postgres:16.
// Stubbed: env values, the ioredis client (an in-memory map with pub/sub), global fetch (Discord answers an empty
// server list), Pusher, waitUntil, preview generation, the S3 client.
// The caller is identified only by the session cookie on the request.

const mocks = vi.hoisted(() => {
  const store = new Map<string, string>();
  const handlers: ((channel: string, message: string) => void)[] = [];
  const client = {
    get: async (key: string) => (store.has(key) ? store.get(key) as string : null),
    set: async (key: string, value: unknown, ...args: unknown[]) => {
      if (args.includes('NX') && store.has(key)) return null;
      store.set(key, String(value));
      return 'OK';
    },
    del: async (key: string) => { store.delete(key); return 1; },
    publish: async (channel: string, message: string) => {
      setTimeout(() => handlers.forEach((handler) => handler(channel, message)), 0);
      return 1;
    },
    pipeline: () => {
      const keys: string[] = [];
      const pipe = {
        del: (key: string) => { keys.push(key); return pipe; },
        exec: async () => { keys.forEach((key) => store.delete(key)); return []; },
      };
      return pipe;
    },
  };
  const subscriber = {
    subscribe: async () => 1,
    on: (event: string, handler: (channel: string, message: string) => void) => {
      if (event === 'message') handlers.push(handler);
    },
  };
  return {
    store, client, subscriber, s3Inputs: [] as unknown[], channels: [] as string[], fetchCalls: [] as string[],
  };
});

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));
vi.mock('~/utils/redis/client', () => ({
  getClient: () => mocks.client,
  getSubscriber: () => mocks.subscriber,
}));
vi.mock('pusher', () => ({
  default: class {
    trigger = vi.fn(async (channel: string) => { mocks.channels.push(channel); });
  },
}));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/server/api/utils/previewImage', () => ({
  mintNonce: () => 'v0000000000000000aaaaaaaaaaaaaaaa',
  runPreviewContinuation: async () => {},
}));
vi.mock('~/server/api/utils/previewBucket', async (importOriginal) => ({
  ...(await importOriginal<object>()),
  getS3: () => ({
    send: async ({ input }: { input: unknown }) => {
      mocks.s3Inputs.push(input);
      return {};
    },
  }),
}));

vi.stubGlobal('fetch', async (url: unknown) => {
  mocks.fetchCalls.push(String(url));
  return { json: async () => [] };
});

const COOKIE = '__Secure-next-auth.session-token';
const PLAIN_COOKIE = 'next-auth.session-token';

const A = {
  discordId: '100000000000000001', dbUserId: '900000000000001', token: 'tok-A-3f6c1d0e-aaaa-4bbb-8ccc-000000000001',
};
const B = {
  discordId: '100000000000000002', dbUserId: '900000000000002', token: 'tok-B-3f6c1d0e-aaaa-4bbb-8ccc-000000000002',
};
const A_SECOND_DISCORD = '100000000000000009';
const A_ROW = '900000000000101';
const B_ROW = '900000000000102';
const SECRET = 'A-private-secret';

const db = () => getPostgres();

type Row = Record<string, unknown>;
async function snapshot(): Promise<Row[]> {
  const { rows } = await sql<Row>`select id::text, fk_users_id::text, fk_guilds_id::text, name, data::text,
    "recentWebhookId", "recentThreadId", "recentMessageId", "updatedAt"::text from "Messages" order by id`.execute(db());
  return rows;
}

const inAnHour = () => Math.floor(Date.now() / 1000) + 3600;

beforeEach(async () => {
  await sql`truncate "Messages", "Guilds", "Sessions", "Accounts", "Users" restart identity cascade`.execute(db());
  await sql`alter sequence "Messages_id_seq" restart with 900000000000001`.execute(db());
  await sql`alter sequence "Users_id_seq" restart with 900000000000001`.execute(db());
  for (const user of [A, B]) {
    await sql`insert into "Users" (id, preferences) values (${user.dbUserId}, ${JSON.stringify({ recentMessageIds: [A_ROW, B_ROW] })}::jsonb)`.execute(db());
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId", access_token, refresh_token, expires_at)
      values (${user.dbUserId}, 'oauth', 'discord', ${user.discordId}, ${`access-${user.discordId}`}, ${`refresh-${user.discordId}`}, ${inAnHour()})`.execute(db());
    await sql`insert into "Sessions" ("sessionToken", "userId", expires)
      values (${user.token}, ${user.dbUserId}, now() + interval '30 days')`.execute(db());
  }
  await sql`insert into "Messages" (id, fk_users_id, name, data, "updatedAt")
    values (${A_ROW}, ${A.dbUserId}, ${SECRET}, ${JSON.stringify({ content: SECRET })}::jsonb, now())`.execute(db());
  await sql`insert into "Messages" (id, fk_users_id, name, data, "updatedAt")
    values (${B_ROW}, ${B.dbUserId}, 'B-own', ${JSON.stringify({ content: 'B-own' })}::jsonb, now())`.execute(db());
  mocks.store.clear();
  mocks.s3Inputs.length = 0;
  mocks.channels.length = 0;
  mocks.fetchCalls.length = 0;
});

afterAll(async () => {
  await db().destroy();
});

function request(cookies: Record<string, string>, hydrate = false) {
  const header = Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ');
  const headers: Record<string, string | string[]> = {};
  return {
    req: {
      cookies,
      headers: { host: 'hooks.test', 'x-forwarded-proto': 'https', cookie: header },
      query: hydrate ? { hydrate: 'true' } : {},
    },
    res: {
      getHeader: (name: string) => headers[name.toLowerCase()],
      setHeader: (name: string, value: string | string[]) => { headers[name.toLowerCase()] = value; },
    },
  };
}

async function contextFor(cookies: Record<string, string>, hydrate = false) {
  return createTRPCContext(request(cookies, hydrate) as never);
}

async function callerFor(token: string, hydrate = false) {
  const ctx = await contextFor({ [COOKIE]: token }, hydrate);
  return { ctx, message: appRouter.createCaller(ctx).message, user: appRouter.createCaller(ctx).user };
}

async function attempt(run: () => Promise<unknown>) {
  return run().then(
    (value) => ({ ok: true, value }),
    (error: unknown) => ({ ok: false, code: (error as { code?: string }).code, error: String(error) }),
  );
}

const draft = (name: string, id?: string) => ({
  ...(id !== undefined ? { id } : {}),
  name,
  data: {
    content: name, username: 'U', embeds: [], components: [],
  },
}) as never;

describe.each([['plain session', false], ['hydrated session', true]] as const)('%s, from the cookie alone', (_label, hydrate) => {
  it('each cookie resolves to its own Discord id', async () => {
    const a = await contextFor({ [COOKIE]: A.token }, hydrate);
    const b = await contextFor({ [COOKIE]: B.token }, hydrate);
    expect(a.session?.user?.id).toBe(A.discordId);
    expect(b.session?.user?.id).toBe(B.discordId);
  });

  it('the id each session carries maps back, in getAccount, to that session\'s own user row', async () => {
    for (const user of [A, B]) {
      const ctx = await contextFor({ [COOKIE]: user.token }, hydrate);
      const account = await getAccount(ctx.session?.user?.id as string);
      expect(String(account.userId)).toBe(user.dbUserId);
    }
  });

  it('B\'s cookie reads none of A\'s message through getOne; A\'s cookie reads it', async () => {
    const b = await callerFor(B.token, hydrate);
    const refused = await attempt(() => b.message.getOne(A_ROW));
    expect(refused.ok).toBe(false);
    expect(JSON.stringify(refused)).not.toContain(SECRET);
    const a = await callerFor(A.token, hydrate);
    expect(JSON.stringify(await a.message.getOne(A_ROW))).toContain(SECRET);
  });

  it('B\'s cookie cannot save over, re-point or delete A\'s message', async () => {
    const b = await callerFor(B.token, hydrate);
    const before = await snapshot();
    const outcomes = [
      await attempt(() => b.message.upsert({ message: draft('B-attack', A_ROW) })),
      await attempt(() => b.message.updateRecentMessageData({
        id: A_ROW, recentWebhookId: '400000000000000001', recentThreadId: null, recentMessageId: '400000000000000002',
      })),
      await attempt(() => b.message.delete({ id: A_ROW })),
    ];
    expect(outcomes.map((outcome) => outcome.ok)).toEqual([false, false, false]);
    expect(await snapshot()).toEqual(before);
    expect(mocks.channels).toEqual([]);
    expect(mocks.s3Inputs).toEqual([]);
  });

  it('B\'s own list (get "0", getAll) holds B\'s row and not A\'s', async () => {
    const b = await callerFor(B.token, hydrate);
    const lists = [await b.message.get('0'), await b.message.getAll()];
    for (const list of lists) {
      expect(list.map((row) => row.id)).toEqual([B_ROW]);
      expect(JSON.stringify(list)).not.toContain(SECRET);
    }
  });
});

describe('the hydrated recent list, user supplied by the adapter', () => {
  it('B\'s hydrated session lists B\'s stored number and not A\'s, though both are stored in B\'s preferences', async () => {
    const { ctx } = await callerFor(B.token, true);
    const messages = (ctx.session as { hydration?: { messages?: { id: string }[] } }).hydration?.messages;
    expect(messages?.map((row) => String(row.id))).toEqual([B_ROW]);
    expect(JSON.stringify(ctx.session)).not.toContain(SECRET);
  });

  it('A\'s hydrated session lists A\'s stored number (the list can show an owner their own row)', async () => {
    const { ctx } = await callerFor(A.token, true);
    const messages = (ctx.session as { hydration?: { messages?: { id: string }[] } }).hydration?.messages;
    expect(messages?.map((row) => String(row.id))).toEqual([A_ROW]);
    expect(JSON.stringify(ctx.session)).toContain(SECRET);
  });
});

describe('a request that does not hold a live session token gets no session', () => {
  const FORGED: [string, Record<string, string>][] = [
    ['no cookie', {}],
    ['an unknown token', { [COOKIE]: 'tok-unknown' }],
    ['A\'s token with a trailing space', { [COOKIE]: `${A.token} ` }],
    ['A\'s token upper-cased', { [COOKIE]: A.token.toUpperCase() }],
    ['A\'s token as a prefix', { [COOKIE]: A.token.slice(0, -1) }],
    ['A\'s user row id as the token', { [COOKIE]: A.dbUserId }],
    ['A\'s Discord id as the token', { [COOKIE]: A.discordId }],
    ['a SQL wildcard', { [COOKIE]: '%' }],
    ['A\'s token under the non-secure cookie name', { [PLAIN_COOKIE]: A.token }],
  ];

  it.each(FORGED)('%s', async (_label, cookies) => {
    for (const hydrate of [false, true]) {
      const ctx = await contextFor(cookies, hydrate);
      expect(ctx.session?.user).toBeUndefined();
      const out = await attempt(() => appRouter.createCaller(ctx).message.getOne(A_ROW));
      expect(out.ok).toBe(false);
      expect((out as { code?: string }).code).toBe('UNAUTHORIZED');
      expect(JSON.stringify(out)).not.toContain(SECRET);
    }
  });

  it('an expired session row', async () => {
    await sql`update "Sessions" set expires = now() - interval '1 minute' where "sessionToken" = ${A.token}`.execute(db());
    const ctx = await contextFor({ [COOKIE]: A.token });
    expect(ctx.session?.user).toBeUndefined();
  });

  it('a session row deleted while the account cache still holds the user (the cache does not stand in for the session)', async () => {
    const warm = await contextFor({ [COOKIE]: A.token });
    expect(warm.session?.user?.id).toBe(A.discordId);
    expect([...mocks.store.keys()]).toContain(`user-access-token-${A.dbUserId}`);
    await sql`delete from "Sessions" where "sessionToken" = ${A.token}`.execute(db());
    const after = await contextFor({ [COOKIE]: A.token });
    expect(after.session?.user).toBeUndefined();
    const out = await attempt(() => appRouter.createCaller(after).message.getOne(A_ROW));
    expect(JSON.stringify(out)).not.toContain(SECRET);
  });

  it('two session cookies on one request: the secure-named one decides', async () => {
    const ctx = await contextFor({ [PLAIN_COOKIE]: A.token, [COOKIE]: B.token });
    expect(ctx.session?.user?.id).toBe(B.discordId);
  });
});

describe('the account cache does not cross users', () => {
  it('interleaved and concurrent cold-cache requests each resolve to their own id', async () => {
    const order = [A, B, A, B, B, A, A, B, A, B, B, A, A, A, B, B, A, B, A, B];
    const contexts = await Promise.all(order.map((user, index) => contextFor({ [COOKIE]: user.token }, index % 2 === 0)));
    expect(contexts.map((ctx) => ctx.session?.user?.id)).toEqual(order.map((user) => user.discordId));
    const keys = [...mocks.store.keys()].filter((key) => key.startsWith('user-access-token-')).sort();
    expect(keys).toEqual([`user-access-token-${A.dbUserId}`, `user-access-token-${B.dbUserId}`]);
  });

  it('warm cache: A then B then A, each its own id and its own rows', async () => {
    for (const user of [A, B, A, B]) {
      const { ctx, message } = await callerFor(user.token);
      expect(ctx.session?.user?.id).toBe(user.discordId);
      const own = user === A ? A_ROW : B_ROW;
      const other = user === A ? B_ROW : A_ROW;
      expect((await message.getOne(own)).id).toBe(own);
      expect((await attempt(() => message.getOne(other))).ok).toBe(false);
    }
  });
});

describe('a user row holding two Discord accounts (the recorded hand-made sign-in case)', () => {
  beforeEach(async () => {
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId", access_token, refresh_token, expires_at)
      values (${A.dbUserId}, 'oauth', 'discord', ${A_SECOND_DISCORD}, 'access-second', 'refresh-second', ${inAnHour()})`.execute(db());
  });

  it('whichever account the session takes, it maps back to A\'s user row and reads only A\'s rows', async () => {
    const { ctx, message } = await callerFor(A.token);
    expect([A.discordId, A_SECOND_DISCORD]).toContain(ctx.session?.user?.id);
    expect(String((await getAccount(ctx.session?.user?.id as string)).userId)).toBe(A.dbUserId);
    expect(JSON.stringify(await message.getOne(A_ROW))).toContain(SECRET);
    expect((await attempt(() => message.getOne(B_ROW))).ok).toBe(false);
  });

  it('B is still refused A\'s row', async () => {
    const { message } = await callerFor(B.token);
    const out = await attempt(() => message.getOne(A_ROW));
    expect(out.ok).toBe(false);
    expect(JSON.stringify(out)).not.toContain(SECRET);
  });
});

describe('instrument controls', () => {
  it('no Discord token refresh was attempted (the stubbed fetch saw only server-list reads)', async () => {
    await contextFor({ [COOKIE]: A.token }, true);
    expect(mocks.fetchCalls.length).toBeGreaterThan(0);
    expect(mocks.fetchCalls.filter((url) => !url.endsWith('/users/@me/guilds'))).toEqual([]);
  });

  it('A\'s own save through a cookie session changes A\'s row (the snapshot oracle can see a write)', async () => {
    const before = await snapshot();
    const { message } = await callerFor(A.token);
    await message.upsert({ message: draft('A-edit', A_ROW) });
    expect(await snapshot()).not.toEqual(before);
    expect(mocks.channels).toEqual([`message-update-${A_ROW}`]);
  });
});
