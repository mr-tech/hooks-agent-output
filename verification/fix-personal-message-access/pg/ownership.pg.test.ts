import { sql } from 'kysely';
import { getPostgres } from 'project-utils';
import {
  afterAll, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { appRouter } from '~/server/api/root';
import * as shared from '~/server/api/utils/shared';
import { updateRecentMessageData, upsertMessage } from '~/server/api/utils/shared';
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

const A = { discordId: '100000000000000001', dbUserId: '900000000000001' };
const B = { discordId: '100000000000000002', dbUserId: '900000000000002' };
const C = { discordId: '100000000000000003', dbUserId: '900000000000003' };
const GUILD_DISCORD_ID = '300000000000000001';

const db = () => getPostgres();

async function reset() {
  await sql`truncate "Messages", "Guilds", "Accounts", "Users" restart identity cascade`.execute(db());
  await sql`alter sequence "Messages_id_seq" restart with 900000000000001`.execute(db());
  await sql`alter sequence "Guilds_id_seq" restart with 700000000000001`.execute(db());
  for (const user of [A, B, C]) {
    await sql`insert into "Users" (id) values (${user.dbUserId})`.execute(db());
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId")
      values (${user.dbUserId}, 'oauth', 'discord', ${user.discordId})`.execute(db());
  }
}

async function plant(id: string, owner: { dbUserId: string } | { guildRow: string }, name: string) {
  const ownerUser = 'dbUserId' in owner ? owner.dbUserId : null;
  const ownerGuild = 'guildRow' in owner ? owner.guildRow : null;
  await sql`insert into "Messages" (id, fk_users_id, fk_guilds_id, name, data, "updatedAt")
    values (${id}, ${ownerUser}, ${ownerGuild}, ${name}, ${JSON.stringify({ content: name })}::jsonb, now())`.execute(db());
}

async function rowOf(id: string) {
  const { rows } = await sql<{ id: string, fk_users_id: string | null, name: string, recentWebhookId: string | null }>`
    select id, fk_users_id, name, "recentWebhookId" from "Messages" where id = ${id}`.execute(db());
  return rows[0];
}

async function countOwnedBy(dbUserId: string) {
  const { rows } = await sql<{ count: string }>`select count(*)::text as count from "Messages" where fk_users_id = ${dbUserId}`.execute(db());
  return Number(rows[0].count);
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

const A_ROW = '900000000000101';
const B_ROW = '900000000000102';
const SERVER_ROW = '900000000000201';
const UNUSED = '900000000000500';

beforeEach(async () => {
  await reset();
  mocks.s3Inputs.length = 0;
  mocks.channels.length = 0;
  const { rows } = await sql<{ id: string }>`insert into "Guilds" (provider, "guildId") values ('discord', ${GUILD_DISCORD_ID}) returning id::text as id`.execute(db());
  await plant(A_ROW, { dbUserId: A.dbUserId }, 'A-private');
  await plant(B_ROW, { dbUserId: B.dbUserId }, 'B-own');
  await plant(SERVER_ROW, { guildRow: rows[0].id }, 'server-message');
  mocks.authorizeGuildAdmin.mockReset().mockResolvedValue({
    account: { providerAccountId: C.discordId },
    guild: { id: GUILD_DISCORD_ID },
  });
  mocks.fetchUserAccount.mockReset().mockResolvedValue({ access_token: 'token', providerAccountId: B.discordId });
});

afterAll(async () => {
  await db().destroy();
});

describe('reading', () => {
  it('the owner reads their personal message', async () => {
    expect((await callerAs(A).getOne(A_ROW))?.name).toBe('A-private');
  });

  it('another user is refused a personal message, with none of it returned', async () => {
    const outcome = await callerAs(B).getOne(A_ROW).then((value) => ({ value }), (error: unknown) => ({ error }));
    expect(outcome).toMatchObject({ error: { code: 'NOT_FOUND' } });
    expect(JSON.stringify(outcome)).not.toContain('A-private');
  });

  it('the hydrated recent list holds the user\'s own and server rows, not another user\'s personal row', async () => {
    const session = await hydratedAuthOptions.callbacks?.session?.({
      session: { user: {}, expires: '' },
      user: { id: B.dbUserId, preferences: { recentMessageIds: [A_ROW, B_ROW, SERVER_ROW] } },
      token: {},
    } as never) as unknown as { hydration: { messages: { id: string }[] } };
    expect(session.hydration.messages.map(({ id }) => String(id)).sort()).toEqual([B_ROW, SERVER_ROW]);
  });
});

describe('saving', () => {
  it('a save naming a number no row holds leaves that number empty', async () => {
    await callerAs(A).upsert({ message: draft('A-new', UNUSED) });
    expect(await rowOf(UNUSED)).toBeUndefined();
    expect(await countOwnedBy(A.dbUserId)).toBe(2);
  });

  it('a save naming a number no row holds is refused at the cap', async () => {
    await sql`insert into "Messages" (id, fk_users_id, name, data, "updatedAt")
      select g, ${A.dbUserId}, 'fill', '{}'::jsonb, now() from generate_series(900000000100000::bigint, 900000000100998::bigint) g`.execute(db());
    expect(await countOwnedBy(A.dbUserId)).toBe(1000);
    await expect(callerAs(A).upsert({ message: draft('A-over-cap', UNUSED) })).rejects.toThrow('You have reached the limit of 1000 messages per user.');
    expect(await countOwnedBy(A.dbUserId)).toBe(1000);
  });

  it('an id-less save never writes onto a row already at the next sequence number', async () => {
    const PLANTED = '900000000000600';
    await plant(PLANTED, { dbUserId: A.dbUserId }, 'A-planted');
    await sql`select setval('"Messages_id_seq"', ${PLANTED}::bigint, false)`.execute(db());
    await callerAs(B).upsert({ message: draft('B-second') }).catch(() => undefined);
    expect(await rowOf(PLANTED)).toMatchObject({ fk_users_id: A.dbUserId, name: 'A-planted' });
  });

  it('the save write leaves another user\'s row unchanged even past the router\'s check', async () => {
    await upsertMessage(draft('B-overwrite', A_ROW), { dbUserId: B.dbUserId }).catch(() => undefined);
    expect(await rowOf(A_ROW)).toMatchObject({ fk_users_id: A.dbUserId, name: 'A-private' });
  });

  it('the owner saves their own message', async () => {
    await callerAs(A).upsert({ message: draft('A-edited', A_ROW) });
    expect(await rowOf(A_ROW)).toMatchObject({ name: 'A-edited' });
    expect(mocks.channels).toEqual([`message-update-${A_ROW}`]);
  });

  it('a save naming the owner\'s number with leading zeros updates that row and announces its canonical number', async () => {
    await callerAs(A).upsert({ message: draft('A-zeros', `00${A_ROW}`) });
    expect(await rowOf(A_ROW)).toMatchObject({ name: 'A-zeros' });
    expect(mocks.channels).toEqual([`message-update-${A_ROW}`]);
  });

  it('a server admin saves a server message another admin created', async () => {
    await callerAs(C).upsert({ message: draft('server-edited', SERVER_ROW, GUILD_DISCORD_ID) });
    expect(await rowOf(SERVER_ROW)).toMatchObject({ name: 'server-edited' });
  });
});

describe('recent message data', () => {
  const recent = (id: string) => ({
    id, recentWebhookId: '400000000000000001', recentThreadId: null, recentMessageId: '400000000000000002',
  });

  it('the write leaves another user\'s row unchanged even past the router\'s check', async () => {
    await (updateRecentMessageData as (...args: unknown[]) => Promise<void>)(recent(A_ROW), { dbUserId: B.dbUserId });
    expect(await rowOf(A_ROW)).toMatchObject({ recentWebhookId: null });
  });

  it('the owner records it on their own message', async () => {
    await callerAs(A).updateRecentMessageData(recent(A_ROW));
    expect(await rowOf(A_ROW)).toMatchObject({ recentWebhookId: '400000000000000001' });
  });

  it('a server admin records it on a server message', async () => {
    await callerAs(C).updateRecentMessageData(recent(SERVER_ROW));
    expect(await rowOf(SERVER_ROW)).toMatchObject({ recentWebhookId: '400000000000000001' });
  });
});

describe('deleting', () => {
  it('a number with leading zeros deletes the row and clears the canonical preview prefix', async () => {
    await callerAs(A).delete({ id: `00${A_ROW}` });
    expect(await rowOf(A_ROW)).toBeUndefined();
    expect(mocks.s3Inputs[0]).toMatchObject({ Prefix: `previews/${A_ROW}/` });
  });

  it('the delete write leaves another user\'s row in place even past the router\'s check', async () => {
    const deleteOwned = (shared as Record<string, unknown>).deleteOwnedMessage as (id: string, owner: object) => Promise<boolean>;
    expect(typeof deleteOwned).toBe('function');
    await deleteOwned(A_ROW, { dbUserId: B.dbUserId });
    expect(await rowOf(A_ROW)).toBeDefined();
  });

  it('a server admin deletes a server message another admin created', async () => {
    await callerAs(C).delete({ id: SERVER_ROW });
    expect(await rowOf(SERVER_ROW)).toBeUndefined();
  });

  it('another user cannot delete a personal message', async () => {
    await expect(callerAs(B).delete({ id: A_ROW })).rejects.toMatchObject({ code: 'NOT_FOUND' });
    expect(await rowOf(A_ROW)).toBeDefined();
  });
});
