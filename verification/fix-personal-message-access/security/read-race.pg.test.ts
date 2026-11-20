import { writeFileSync } from 'fs';

import { sql } from 'kysely';
import { getPostgres } from 'project-utils';
import {
  afterAll, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { appRouter } from '~/server/api/root';

// Security-stage read-race instrument, fix-personal-message-access.
// Question: getOne loads the row, then checks ownership in a later query. authorizeUser passes when that later
// query finds no row. Does the owner's own delete, landing between the load and the check, hand the loaded row
// to another signed-in user?
// Real: the routers through appRouter.createCaller, authorizeUser, getAccount, getMessage, deleteOwnedMessage,
// kysely, pg, a throwaway postgres:16. Stubbed: env, Pusher, waitUntil, preview generation, the S3 client, redis.
// The session is injected (the identity path is identity.pg.test.ts's subject).
// "interleaved" cases place the owner's delete deterministically inside the window, through a hook that runs
// when getAccount returns (inside authorizeUser, before its Messages query). The "timing" case uses no hook:
// pollers and the owner's real delete race on the clock, and the count is written to a file.

const mocks = vi.hoisted(() => ({
  s3Inputs: [] as unknown[],
  channels: [] as string[],
  afterAccount: null as null | (() => Promise<void>),
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
vi.mock('~/server/api/utils/getAccount', async (importOriginal) => {
  const real = (await importOriginal<{ default: (id: string) => Promise<{ userId: string }> }>()).default;
  return {
    default: async (id: string) => {
      const account = await real(id);
      const hook = mocks.afterAccount;
      if (hook) {
        mocks.afterAccount = null;
        await hook();
      }
      return account;
    },
  };
});
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/client', () => ({ getClient: () => ({}) }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const A = { discordId: '100000000000000001', dbUserId: '900000000000001' };
const B = { discordId: '100000000000000002', dbUserId: '900000000000002' };
const A_ROW = '900000000000101';
const SECRET = 'A-private-secret';

const db = () => getPostgres();

type Row = Record<string, unknown>;
async function snapshot(): Promise<Row[]> {
  const { rows } = await sql<Row>`select id::text, fk_users_id::text, fk_guilds_id::text, name, data::text
    from "Messages" order by id`.execute(db());
  return rows;
}

async function plantForA(id?: string) {
  const { rows } = id
    ? await sql<{ id: string }>`insert into "Messages" (id, fk_users_id, name, data, "updatedAt")
      values (${id}, ${A.dbUserId}, ${SECRET}, ${JSON.stringify({ content: SECRET })}::jsonb, now()) returning id::text as id`.execute(db())
    : await sql<{ id: string }>`insert into "Messages" (fk_users_id, name, data, "updatedAt")
      values (${A.dbUserId}, ${SECRET}, ${JSON.stringify({ content: SECRET })}::jsonb, now()) returning id::text as id`.execute(db());
  return rows[0].id;
}

beforeEach(async () => {
  await sql`truncate "Messages", "Guilds", "Accounts", "Users" restart identity cascade`.execute(db());
  await sql`alter sequence "Messages_id_seq" restart with 900000000001001`.execute(db());
  for (const user of [A, B]) {
    await sql`insert into "Users" (id) values (${user.dbUserId})`.execute(db());
    await sql`insert into "Accounts" ("userId", type, provider, "providerAccountId")
      values (${user.dbUserId}, 'oauth', 'discord', ${user.discordId})`.execute(db());
  }
  await plantForA(A_ROW);
  mocks.s3Inputs.length = 0;
  mocks.channels.length = 0;
  mocks.afterAccount = null;
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

async function attempt(run: () => Promise<unknown>) {
  return run().then((value) => ({ ok: true, value }), (error: unknown) => ({ ok: false, error: String(error) }));
}

const ownerDeletes = (id: string) => async () => { await callerAs(A).delete({ id }); };

describe('controls', () => {
  it('with no delete in the window, B is refused A\'s row', async () => {
    const out = await attempt(() => callerAs(B).getOne(A_ROW));
    expect(out.ok).toBe(false);
    expect(JSON.stringify(out)).not.toContain(SECRET);
  });

  it('the hook fires inside the window: after it, the row is gone', async () => {
    mocks.afterAccount = ownerDeletes(A_ROW);
    await attempt(() => callerAs(B).getOne(A_ROW));
    expect(mocks.afterAccount).toBeNull();
    expect((await snapshot()).some((row) => row.id === A_ROW)).toBe(false);
  });

  it('A reads A\'s own row (the leak oracle fires on a real read)', async () => {
    expect(JSON.stringify(await callerAs(A).getOne(A_ROW))).toContain(SECRET);
  });
});

describe('interleaved: the owner deletes the row between another user\'s load and that user\'s ownership check', () => {
  it('getOne as B returns none of A\'s message', async () => {
    mocks.afterAccount = ownerDeletes(A_ROW);
    const out = await attempt(() => callerAs(B).getOne(A_ROW));
    expect(JSON.stringify(out)).not.toContain(SECRET);
  });

  it('updateRecentMessageData as B writes nothing and returns none of A\'s message', async () => {
    mocks.afterAccount = ownerDeletes(A_ROW);
    const out = await attempt(() => callerAs(B).updateRecentMessageData({
      id: A_ROW, recentWebhookId: '400000000000000001', recentThreadId: null, recentMessageId: '400000000000000002',
    }));
    expect(JSON.stringify(out)).not.toContain(SECRET);
    expect(await snapshot()).toEqual([]);
  });

  it('upsert as B at A\'s number creates only a row of B\'s own, at another number', async () => {
    mocks.afterAccount = ownerDeletes(A_ROW);
    const out = await attempt(() => callerAs(B).upsert({
      message: {
        id: A_ROW,
        name: 'B-attack',
        data: {
          content: 'B-attack', username: 'U', embeds: [], components: [],
        },
      } as never,
    }));
    expect(JSON.stringify(out)).not.toContain(SECRET);
    const rows = await snapshot();
    expect(rows.filter((row) => row.id === A_ROW || row.fk_users_id === A.dbUserId)).toEqual([]);
    expect(mocks.channels).toEqual([]);
  });

  it('delete as B, with the owner\'s delete landing first, clears no preview prefix a second time and fails closed', async () => {
    mocks.afterAccount = ownerDeletes(A_ROW);
    await attempt(() => callerAs(B).delete({ id: A_ROW }));
    const prefixes = JSON.stringify(mocks.s3Inputs).split(`previews/${A_ROW}/`).length - 1;
    expect(prefixes).toBeLessThanOrEqual(2);
    expect(await snapshot()).toEqual([]);
  });
});

describe('timing, no hook', () => {
  it('measurement: how often a polling second user receives the owner\'s message at the moment it is deleted', async () => {
    const TRIALS = Number(process.env.SEC_TRIALS ?? 300);
    const POLLERS = Number(process.env.SEC_POLLERS ?? 6);
    let leakedTrials = 0;
    let polls = 0;
    let leakedResponses = 0;
    for (let trial = 0; trial < TRIALS; trial += 1) {
      const id = await plantForA();
      let stop = false;
      let leaked = false;
      const poller = async () => {
        while (!stop) {
          const out = await attempt(() => callerAs(B).getOne(id));
          polls += 1;
          if (JSON.stringify(out).includes(SECRET)) {
            leaked = true;
            leakedResponses += 1;
          }
        }
      };
      const running = Array.from({ length: POLLERS }, poller);
      await new Promise((resolve) => { setTimeout(resolve, 3 + Math.floor(Math.random() * 12)); });
      await callerAs(A).delete({ id });
      stop = true;
      await Promise.all(running);
      if (leaked) leakedTrials += 1;
    }
    const result = {
      trials: TRIALS, pollers: POLLERS, polls, leakedTrials, leakedResponses,
    };
    writeFileSync(`${process.env.SEC_OUT}/${process.env.SEC_LABEL}-timing.json`, `${JSON.stringify(result)}\n`);
    expect(result.trials).toBe(TRIALS);
  }, 240000);
});
