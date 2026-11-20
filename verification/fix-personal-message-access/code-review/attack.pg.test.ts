import { sql } from 'kysely';
import { getPostgres } from 'project-utils';
import {
  afterAll, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { appRouter } from '~/server/api/root';
import { hydratedAuthOptions } from '~/server/auth';

// Code-review attack instrument, fix-personal-message-access. Authored by the code reviewer, not the fixer.
// Oracle: every row not owned by the attacker is byte-identical before and after each attack, no response
// carries the victim's text, no Pusher channel or S3 prefix names the victim's row.

const mocks = vi.hoisted(() => ({
  s3Inputs: [] as unknown[],
  channels: [] as string[],
  bypass: { user: false, guild: false },
  deleteBeforeCheck: null as null | string,
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
vi.mock('~/server/api/utils/user', async (importOriginal) => {
  const real = await importOriginal<typeof import('~/server/api/utils/user')>();
  return {
    authorizeUser: async (userId: string, ids?: null | string | string[]) => {
      if (mocks.deleteBeforeCheck) {
        const { sql: rawSql } = await import('kysely');
        const { getPostgres: pg } = await import('project-utils');
        await rawSql`delete from "Messages" where id = ${mocks.deleteBeforeCheck}`.execute(pg());
        mocks.deleteBeforeCheck = null;
      }
      return mocks.bypass.user ? real.authorizeUser(userId, null) : real.authorizeUser(userId, ids);
    },
  };
});
vi.mock('~/server/api/utils/authorizeGuildUser', async (importOriginal) => {
  const real = (await importOriginal<{ default: (...a: unknown[]) => Promise<unknown> }>()).default;
  return {
    default: (req: unknown, guildId: string, ids?: unknown) => (mocks.bypass.guild ? real(req, guildId, null) : real(req, guildId, ids)),
  };
});
vi.mock('~/utils/redis', () => ({ default: mocks }));
vi.mock('~/utils/redis/client', () => ({ getClient: () => ({}) }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const A = { discordId: '100000000000000001', dbUserId: '900000000000001' };
const B = { discordId: '100000000000000002', dbUserId: '900000000000002' };
const C = { discordId: '100000000000000003', dbUserId: '900000000000003' };
const GUILD = '300000000000000001';
const OTHER_GUILD = '300000000000000002';
const A_ROW = '900000000000101';
const SERVER_ROW = '900000000000201';
const SECRET = 'A-private-secret';

const db = () => getPostgres();

type Row = Record<string, unknown>;
async function snapshot(): Promise<Row[]> {
  const { rows } = await sql<Row>`select id::text, fk_users_id::text, fk_guilds_id::text, name, data::text,
    "recentWebhookId", "recentThreadId", "recentMessageId", "updatedAt"::text from "Messages" order by id`.execute(db());
  return rows;
}

let guildRow = '';
beforeEach(async () => {
  await sql`truncate "Messages", "Guilds", "Accounts", "Users" restart identity cascade`.execute(db());
  await sql`alter sequence "Messages_id_seq" restart with 900000000000001`.execute(db());
  await sql`alter sequence "Guilds_id_seq" restart with 700000000000001`.execute(db());
  for (const user of [A, B, C]) {
    await sql`insert into "Users" (id) values (${user.dbUserId})`.execute(db());
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId")
      values (${user.dbUserId}, 'oauth', 'discord', ${user.discordId})`.execute(db());
  }
  const { rows } = await sql<{ id: string }>`insert into "Guilds" (provider, "guildId") values ('discord', ${GUILD}) returning id::text as id`.execute(db());
  guildRow = rows[0].id;
  await sql`insert into "Messages" (id, fk_users_id, name, data, "updatedAt")
    values (${A_ROW}, ${A.dbUserId}, ${SECRET}, ${JSON.stringify({ content: SECRET })}::jsonb, now())`.execute(db());
  await sql`insert into "Messages" (id, fk_guilds_id, name, data, "updatedAt")
    values (${SERVER_ROW}, ${guildRow}, 'server-message', '{}'::jsonb, now())`.execute(db());
  mocks.s3Inputs.length = 0;
  mocks.channels.length = 0;
  mocks.bypass.user = false;
  mocks.bypass.guild = false;
  mocks.deleteBeforeCheck = null;
  mocks.authorizeGuildAdmin.mockReset().mockImplementation(async (guildId: string) => ({
    account: { providerAccountId: C.discordId, userId: C.dbUserId },
    guild: { id: guildId },
  }));
  mocks.fetchUserAccount.mockReset().mockResolvedValue({ access_token: 'token', providerAccountId: B.discordId });
});

afterAll(async () => {
  await db().destroy();
});

function callerAs(user: { discordId: string }) {
  return appRouter.createCaller({
    session: { user: { id: user.discordId, guilds: [] }, expires: 'never' },
    req: {},
    database: db(),
  } as never).message;
}

const draft = (name: string, id?: string, guildId?: string) => ({
  ...(id !== undefined ? { id } : {}),
  ...(guildId ? { guildId } : {}),
  name,
  data: {
    content: name, username: 'U', embeds: [], components: [],
  },
}) as never;

// The id text class: every form that postgres may coerce to A_ROW's bigint, plus forms it must refuse.
const FORMS: [string, string][] = [
  ['canonical', A_ROW],
  ['leading zeros', `00${A_ROW}`],
  ['plus sign', `+${A_ROW}`],
  ['leading space', ` ${A_ROW}`],
  ['trailing space', `${A_ROW} `],
  ['trailing newline', `${A_ROW}\n`],
  ['tab-padded', `\t${A_ROW}\t`],
  ['full-width digits', A_ROW.replace(/[0-9]/g, (d) => String.fromCharCode(0xff10 + Number(d)))],
  ['negative', `-${A_ROW}`],
  ['exponent', '9.00000000000101e14'],
  ['above int8', '99999999999999999999'],
  ['empty', ''],
  ['zero', '0'],
];

async function attempt(run: () => Promise<unknown>) {
  return run().then((value) => ({ ok: true, value }), (error: unknown) => ({ ok: false, error: String(error) }));
}

// Every row that existed before the attack is unchanged and still present; a row the attack created is
// never A's (by owner or by text). New rows owned by the attacker or the attacker's server are permitted.
function victimUntouched(before: Row[], after: Row[]) {
  const ids = new Set(before.map((r) => r.id));
  expect(after.filter((r) => ids.has(r.id))).toEqual(before);
  const created = after.filter((r) => !ids.has(r.id));
  expect(created.filter((r) => r.fk_users_id === A.dbUserId || JSON.stringify(r).includes(SECRET))).toEqual([]);
}

const BYPASSES = [
  ['router check in force', { user: false, guild: false }],
  ['router check bypassed (race stand-in)', { user: true, guild: true }],
] as const;

describe.each(BYPASSES)('%s', (_label, bypass) => {
  beforeEach(() => { Object.assign(mocks.bypass, bypass); });

  it.each(FORMS)('getOne: user B with %s form of A\'s number gets none of it', async (_f, id) => {
    mocks.bypass.user = false;
    const out = await attempt(() => callerAs(B).getOne(id));
    expect(JSON.stringify(out)).not.toContain(SECRET);
  });

  it.each(FORMS)('upsert personal: user B with %s form of A\'s number leaves A\'s row unchanged', async (_f, id) => {
    const before = await snapshot();
    const out = await attempt(() => callerAs(B).upsert({ message: draft('B-attack', id) }));
    expect(JSON.stringify(out)).not.toContain(SECRET);
    victimUntouched(before, await snapshot());
    expect(mocks.channels.filter((c) => c.includes(A_ROW))).toEqual([]);
  });

  it.each(FORMS)('upsert guild path: admin C with %s form of A\'s number leaves A\'s row unchanged', async (_f, id) => {
    const before = await snapshot();
    const out = await attempt(() => callerAs(C).upsert({ message: draft('C-attack', id, GUILD) }));
    expect(JSON.stringify(out)).not.toContain(SECRET);
    victimUntouched(before, await snapshot());
    expect(mocks.channels.filter((c) => c.includes(A_ROW))).toEqual([]);
  });

  it.each(FORMS)('upsert other guild: admin C saving into another server with %s form of the server row leaves it unchanged', async (_f, id) => {
    const target = id.replace(A_ROW, SERVER_ROW);
    const before = await snapshot();
    await attempt(() => callerAs(C).upsert({ message: draft('C-cross', target, OTHER_GUILD) }));
    const server = (rows: Row[]) => rows.filter((r) => r.id === SERVER_ROW);
    expect(server(await snapshot())).toEqual(server(before));
  });

  it.each(FORMS)('updateRecentMessageData: user B with %s form of A\'s number leaves A\'s row unchanged', async (_f, id) => {
    const before = await snapshot();
    await attempt(() => callerAs(B).updateRecentMessageData({
      id, recentWebhookId: '400000000000000001', recentThreadId: null, recentMessageId: '400000000000000002',
    }));
    victimUntouched(before, await snapshot());
  });

  it.each(FORMS)('delete: user B with %s form of A\'s number leaves A\'s row and previews', async (_f, id) => {
    const before = await snapshot();
    await attempt(() => callerAs(B).delete({ id }));
    victimUntouched(before, await snapshot());
    expect(JSON.stringify(mocks.s3Inputs)).not.toContain(A_ROW);
  });

  it.each(FORMS)('delete guild path: admin C with %s form of A\'s number leaves A\'s row', async (_f, id) => {
    const before = await snapshot();
    // C names A's personal row; the router derives the guild from the row, so this probes the personal branch as C.
    await attempt(() => callerAs(C).delete({ id }));
    victimUntouched(before, await snapshot());
  });
});

// Race stand-in: the owner's delete lands after the procedure's load and before its ownership check
// (the hook deletes A's row inside the authorizeUser call, ahead of the real check).
describe('the owner deletes between load and ownership check', () => {
  it('getOne: user B receives none of A\'s message', async () => {
    mocks.deleteBeforeCheck = A_ROW;
    const out = await attempt(() => callerAs(B).getOne(A_ROW));
    expect(JSON.stringify(out)).not.toContain(SECRET);
    expect(out).toMatchObject({ ok: false });
  });

  it('getOne: the owner still reads their own message when nothing is deleted (control)', async () => {
    const out = await attempt(() => callerAs(A).getOne(A_ROW));
    expect(JSON.stringify(out)).toContain(SECRET);
  });

  it('upsert: user B naming A\'s deleted number creates only B\'s own row, never A\'s text', async () => {
    mocks.deleteBeforeCheck = A_ROW;
    const out = await attempt(() => callerAs(B).upsert({ message: draft('B-race', A_ROW) }));
    expect(JSON.stringify(out)).not.toContain(SECRET);
    const rows = await snapshot();
    expect(rows.filter((r) => r.id === A_ROW)).toEqual([]);
    expect(rows.filter((r) => JSON.stringify(r).includes(SECRET))).toEqual([]);
  });

  it('updateRecentMessageData: user B returns and writes nothing of A\'s', async () => {
    mocks.deleteBeforeCheck = A_ROW;
    const out = await attempt(() => callerAs(B).updateRecentMessageData({
      id: A_ROW, recentWebhookId: '400000000000000001', recentThreadId: null, recentMessageId: '400000000000000002',
    }));
    expect(JSON.stringify(out)).not.toContain(SECRET);
  });

  it('delete: user B clears no preview of A\'s number', async () => {
    mocks.deleteBeforeCheck = A_ROW;
    await attempt(() => callerAs(B).delete({ id: A_ROW }));
    expect(JSON.stringify(mocks.s3Inputs)).not.toContain(A_ROW);
  });
});

describe('owner-positive controls (the oracle can see a change)', () => {
  it('A saving A\'s own row changes it', async () => {
    const before = await snapshot();
    await callerAs(A).upsert({ message: draft('A-edit', A_ROW) });
    expect(await snapshot()).not.toEqual(before);
  });

  it('A deleting A\'s own row with leading zeros removes it and clears the canonical prefix', async () => {
    await callerAs(A).delete({ id: `00${A_ROW}` });
    expect((await snapshot()).some((r) => r.id === A_ROW)).toBe(false);
    expect(JSON.stringify(mocks.s3Inputs)).toContain(`previews/${A_ROW}/`);
  });

  it('getOne leaks A\'s text to A (the leak oracle fires on a real read)', async () => {
    const out = await attempt(() => callerAs(A).getOne(A_ROW));
    expect(JSON.stringify(out)).toContain(SECRET);
  });

  it('a stored number beyond int8 in the user\'s own preferences fails that user\'s hydrated session (observation, self only)', async () => {
    const out = await attempt(async () => hydratedAuthOptions.callbacks?.session?.({
      session: { user: {}, expires: '' },
      user: { id: B.dbUserId, preferences: { recentMessageIds: ['99999999999999999999'] } },
      token: {},
    } as never));
    expect(out).toMatchObject({ ok: false });
  });

  it('the hydrated list with A\'s number in B\'s preferences, every text form, never carries A\'s text', async () => {
    const session = await hydratedAuthOptions.callbacks?.session?.({
      session: { user: {}, expires: '' },
      user: { id: B.dbUserId, preferences: { recentMessageIds: FORMS.map(([, id]) => id).filter((id) => /^\d{1,18}$/.test(id)) } },
      token: {},
    } as never);
    expect(JSON.stringify(session)).not.toContain(SECRET);
  });
});
