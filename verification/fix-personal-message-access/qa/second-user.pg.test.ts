// QA instrument (not part of the website suite): every in-scope surface driven through the real tRPC router
// (appRouter.createCaller) against a throwaway postgres, a second user B against user A's personal row, each refusal
// paired with the owner-positive call it must not also refuse. Driven by run-second-user.sh.
import { sql } from 'kysely';
import { getPostgres } from 'project-utils';
import {
  afterAll, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { appRouter } from '~/server/api/root';
import { hydratedAuthOptions } from '~/server/auth';

const mocks = vi.hoisted(() => ({
  s3Inputs: [] as unknown[],
  channels: [] as string[],
  fetchUserAccount: vi.fn(),
  fetchUserGuilds: vi.fn(async () => []),
  fetchGuild: vi.fn(async () => {}),
  authorizeGuildAdmin: vi.fn(),
}));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
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
vi.mock('~/server/api/utils/authorizeGuildAdmin', () => ({ default: mocks.authorizeGuildAdmin }));
vi.mock('~/utils/redis', () => ({ default: mocks }));
vi.mock('~/utils/redis/client', () => ({ getClient: () => ({}) }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const A = { discordId: '100000000000000011', dbUserId: '900000000000011' };
const B = { discordId: '100000000000000012', dbUserId: '900000000000012' };
const GUILD_DISCORD_ID = '300000000000000011';

const A_ROW = '900000000000111';
const B_ROW = '900000000000112';
const SERVER_ROW = '900000000000211';
const UNUSED = '900000000000555';

const db = () => getPostgres();

interface Snapshot {
  id: string, fk_users_id: string | null, fk_guilds_id: string | null, name: string, data: unknown,
  recentWebhookId: string | null,
}

async function rowOf(id: string): Promise<Snapshot | undefined> {
  const { rows } = await sql<Snapshot>`select id::text as id, fk_users_id::text as fk_users_id,
    fk_guilds_id::text as fk_guilds_id, name, data, "recentWebhookId" from "Messages" where id = ${id}`.execute(db());
  return rows[0];
}

async function allRows() {
  const { rows } = await sql<Snapshot>`select id::text as id, fk_users_id::text as fk_users_id,
    fk_guilds_id::text as fk_guilds_id, name, data, "recentWebhookId" from "Messages" order by id`.execute(db());
  return rows;
}

async function countOwnedBy(dbUserId: string) {
  const { rows } = await sql<{ count: string }>`select count(*)::text as count from "Messages" where fk_users_id = ${dbUserId}`.execute(db());
  return Number(rows[0].count);
}

async function plant(id: string, owner: { dbUserId: string } | { guildRow: string }, name: string) {
  const ownerUser = 'dbUserId' in owner ? owner.dbUserId : null;
  const ownerGuild = 'guildRow' in owner ? owner.guildRow : null;
  await sql`insert into "Messages" (id, fk_users_id, fk_guilds_id, name, data, "updatedAt")
    values (${id}, ${ownerUser}, ${ownerGuild}, ${name}, ${JSON.stringify({ content: name })}::jsonb, now())`.execute(db());
}

function callerAs(user: { discordId: string }) {
  return appRouter.createCaller({
    session: { user: { id: user.discordId, guilds: [] }, expires: 'never' },
    req: {},
    database: db(),
  } as never).message;
}

const draft = (name: string, id?: string, guildId?: string) => ({
  ...(id ? { id } : {}),
  ...(guildId ? { guildId } : {}),
  name,
  data: {
    content: name, username: 'U', embeds: [], components: [],
  },
}) as never;

const recent = (id: string) => ({
  id, recentWebhookId: '400000000000000011', recentThreadId: null, recentMessageId: '400000000000000012',
});

const settle = <T>(p: Promise<T>) => p.then((value) => ({ value }), (error: unknown) => ({ error }));

let before: Snapshot[];

beforeEach(async () => {
  await sql`truncate "Messages", "Guilds", "Accounts", "Users" restart identity cascade`.execute(db());
  await sql`alter sequence "Messages_id_seq" restart with 900000000000001`.execute(db());
  await sql`alter sequence "Guilds_id_seq" restart with 700000000000001`.execute(db());
  for (const user of [A, B]) {
    await sql`insert into "Users" (id) values (${user.dbUserId})`.execute(db());
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId")
      values (${user.dbUserId}, 'oauth', 'discord', ${user.discordId})`.execute(db());
  }
  const { rows } = await sql<{ id: string }>`insert into "Guilds" (provider, "guildId") values ('discord', ${GUILD_DISCORD_ID}) returning id::text as id`.execute(db());
  await plant(A_ROW, { dbUserId: A.dbUserId }, 'A-private');
  await plant(B_ROW, { dbUserId: B.dbUserId }, 'B-own');
  await plant(SERVER_ROW, { guildRow: rows[0].id }, 'server-message');
  mocks.s3Inputs.length = 0;
  mocks.channels.length = 0;
  // No outbound network: the database is the only socket this instrument opens.
  vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('outbound fetch refused by the instrument'); }));
  // B administers the server in every case here; S1b (who is an admin) is out of this chain's scope.
  mocks.authorizeGuildAdmin.mockReset().mockResolvedValue({
    account: { providerAccountId: B.discordId, userId: B.dbUserId },
    guild: { id: GUILD_DISCORD_ID },
  });
  mocks.fetchUserAccount.mockReset().mockResolvedValue({ access_token: 'token', providerAccountId: B.discordId });
  before = await allRows();
});

afterAll(async () => {
  await db().destroy();
});

describe('S2 message.getOne', () => {
  it('refuses B on A\'s personal message, returning none of it', async () => {
    const outcome = await settle(callerAs(B).getOne(A_ROW));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(JSON.stringify(outcome)).not.toContain('A-private');
  });

  it('refuses B on A\'s personal message named with leading zeros', async () => {
    const outcome = await settle(callerAs(B).getOne(`000${A_ROW}`));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(JSON.stringify(outcome)).not.toContain('A-private');
  });

  it('control: returns A\'s personal message to A', async () => {
    expect((await callerAs(A).getOne(A_ROW))?.name).toBe('A-private');
  });
});

describe('S6a message.upsert naming A\'s row', () => {
  it('refuses B\'s personal save naming A\'s number, and no row changes', async () => {
    const outcome = await settle(callerAs(B).upsert({ message: draft('B-overwrite', A_ROW) }));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(await allRows()).toEqual(before);
    expect(mocks.channels).toEqual([]);
  });

  it('refuses B\'s personal save naming A\'s number with leading zeros, and no row changes', async () => {
    const outcome = await settle(callerAs(B).upsert({ message: draft('B-overwrite', `0${A_ROW}`) }));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(await allRows()).toEqual(before);
  });

  it('refuses B\'s server save naming A\'s personal number, and no row changes', async () => {
    const outcome = await settle(callerAs(B).upsert({ message: draft('B-claim', A_ROW, GUILD_DISCORD_ID) }));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(await allRows()).toEqual(before);
  });

  it('control: A saves A\'s own row and it is announced on its number', async () => {
    await callerAs(A).upsert({ message: draft('A-edited', A_ROW) });
    expect(await rowOf(A_ROW)).toMatchObject({ name: 'A-edited', fk_users_id: A.dbUserId });
    expect(mocks.channels).toEqual([`message-update-${A_ROW}`]);
  });

  it('control: B, as the server\'s admin, saves the server message', async () => {
    await callerAs(B).upsert({ message: draft('server-edited', SERVER_ROW, GUILD_DISCORD_ID) });
    expect(await rowOf(SERVER_ROW)).toMatchObject({ name: 'server-edited', fk_users_id: null });
  });
});

describe('S6b message.upsert naming a number no row holds', () => {
  it('B\'s save becomes B\'s own row at a server-assigned number, and the sent number stays empty', async () => {
    const saved = await callerAs(B).upsert({ message: draft('B-new', UNUSED) });
    expect(await rowOf(UNUSED)).toBeUndefined();
    expect(saved?.id).not.toBe(UNUSED);
    expect(await rowOf(String(saved?.id))).toMatchObject({ fk_users_id: B.dbUserId, name: 'B-new' });
    expect(await rowOf(A_ROW)).toEqual(before.find(({ id }) => id === A_ROW));
    expect(mocks.channels).toEqual([]);
  });

  it('B at the per-user cap is refused and no row is created', async () => {
    await sql`insert into "Messages" (id, fk_users_id, name, data, "updatedAt")
      select g, ${B.dbUserId}, 'fill', '{}'::jsonb, now() from generate_series(900000000200000::bigint, 900000000200998::bigint) g`.execute(db());
    expect(await countOwnedBy(B.dbUserId)).toBe(1000);
    await expect(callerAs(B).upsert({ message: draft('B-over', UNUSED) })).rejects.toThrow('You have reached the limit of 1000 messages per user.');
    expect(await countOwnedBy(B.dbUserId)).toBe(1000);
    expect(await rowOf(UNUSED)).toBeUndefined();
  });

  it('control: B under the cap with no number saves a new row of B\'s', async () => {
    const saved = await callerAs(B).upsert({ message: draft('B-fresh') });
    expect(await rowOf(String(saved?.id))).toMatchObject({ fk_users_id: B.dbUserId, name: 'B-fresh' });
  });
});

describe('S7 message.updateRecentMessageData', () => {
  it('refuses B on A\'s personal message, and A\'s row is unchanged', async () => {
    const outcome = await settle(callerAs(B).updateRecentMessageData(recent(A_ROW)));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(await allRows()).toEqual(before);
  });

  it('refuses B on A\'s personal message named with leading zeros', async () => {
    const outcome = await settle(callerAs(B).updateRecentMessageData(recent(`00${A_ROW}`)));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(await allRows()).toEqual(before);
  });

  it('control: A records it on A\'s own row', async () => {
    await callerAs(A).updateRecentMessageData(recent(A_ROW));
    expect(await rowOf(A_ROW)).toMatchObject({ recentWebhookId: '400000000000000011' });
  });

  it('control: B, as the server\'s admin, records it on the server message', async () => {
    await callerAs(B).updateRecentMessageData(recent(SERVER_ROW));
    expect(await rowOf(SERVER_ROW)).toMatchObject({ recentWebhookId: '400000000000000011' });
  });
});

describe('S8 message.delete', () => {
  it('refuses B on A\'s personal message; the row and its previews stay', async () => {
    const outcome = await settle(callerAs(B).delete({ id: A_ROW }));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(await allRows()).toEqual(before);
    expect(mocks.s3Inputs).toEqual([]);
  });

  it('refuses B on A\'s personal message named with leading zeros', async () => {
    const outcome = await settle(callerAs(B).delete({ id: `00${A_ROW}` }));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(await allRows()).toEqual(before);
    expect(mocks.s3Inputs).toEqual([]);
  });

  it('control: A deletes A\'s own row and its canonical preview prefix is cleared', async () => {
    await callerAs(A).delete({ id: `00${A_ROW}` });
    expect(await rowOf(A_ROW)).toBeUndefined();
    expect(mocks.s3Inputs[0]).toMatchObject({ Prefix: `previews/${A_ROW}/` });
  });

  it('control: B, as the server\'s admin, deletes the server message', async () => {
    await callerAs(B).delete({ id: SERVER_ROW });
    expect(await rowOf(SERVER_ROW)).toBeUndefined();
  });
});

describe('S11 the hydrated session\'s recent list', () => {
  async function hydrateAs(dbUserId: string, ids: string[]) {
    const session = await hydratedAuthOptions.callbacks?.session?.({
      session: { user: {}, expires: '' },
      user: { id: dbUserId, preferences: { recentMessageIds: ids } },
      token: {},
    } as never) as unknown as { hydration: { messages: { id: string, name: string }[] } };
    return session.hydration.messages;
  }

  it('leaves A\'s personal row out of B\'s list, its name included', async () => {
    const messages = await hydrateAs(B.dbUserId, [A_ROW, B_ROW, SERVER_ROW]);
    expect(messages.map(({ id }) => String(id)).sort()).toEqual([B_ROW, SERVER_ROW]);
    expect(JSON.stringify(messages)).not.toContain('A-private');
  });

  it('control: A\'s list holds A\'s row', async () => {
    mocks.fetchUserAccount.mockResolvedValue({ access_token: 'token', providerAccountId: A.discordId });
    const messages = await hydrateAs(A.dbUserId, [A_ROW]);
    expect(messages.map(({ id }) => String(id))).toEqual([A_ROW]);
  });
});
