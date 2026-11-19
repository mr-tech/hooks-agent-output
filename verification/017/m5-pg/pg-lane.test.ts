import {
  Kysely, PostgresDialect, sql,
} from 'kysely';
import pg from '/usr/local/bin/hooks/website/node_modules/.pnpm/pg@8.11.1/node_modules/pg/lib/index.js';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { buildCommitPreviewNonceQuery, mintNonce } from '~/server/api/utils/previewImage';
import { buildMessageValues, buildUpsertMessageQuery } from '~/server/api/utils/shared';

const { Pool } = pg as { Pool: new (config: Record<string, unknown>) => unknown };
const SOCKET_DIR = process.env.PG_SOCKET_DIR as string;
const pool = (max = 4) => new Pool({
  host: SOCKET_DIR, user: 'postgres', database: 'lane', max,
});
const sleep = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });

const pools = [pool(), pool()];
const [poolA, poolB] = pools;
const make = (p: unknown) => new Kysely<any>({ dialect: new PostgresDialect({ pool: p as never }) });
const dbA = make(poolA);
const dbB = make(poolB);

const data = { content: 'Hi', username: 'U', embeds: [], components: [] };
const upsertValues = (id: string) => ({
  ...buildMessageValues({ name: 'n', data } as never, { dbUserId: 'u1' } as never),
  fk_guilds_id: null,
  id,
});

const OLD_NONCE = 'f'.repeat(32);

beforeAll(async () => {
  await sql`drop table if exists "Messages"`.execute(dbA);
  await sql`create table "Messages" (
    id bigint primary key, name text not null, data jsonb not null, valid boolean not null,
    "updatedAt" timestamp not null, "previewImageNonce" text, fk_users_id text, fk_guilds_id text)`.execute(dbA);
});

beforeEach(async () => {
  await sql`delete from "Messages"`.execute(dbA);
});

afterAll(async () => {
  await Promise.all([dbA.destroy(), dbB.destroy()]);
});

const nonceOf = async (id: string) => (await sql<{ n: string | null }>`select "previewImageNonce" as n from "Messages" where id = ${id}`.execute(dbA)).rows[0]?.n;
const seed = (id: string, nonce: string | null) => sql`insert into "Messages" (id, name, data, valid, "updatedAt", "previewImageNonce") values (${id}, 'n', '{}', true, now(), ${nonce})`.execute(dbA);

describe('the shipped upsert statement', () => {
  it('P1: the clock is read after the row lock, so the save that takes the lock second holds the larger clock, though its transaction and its statement began first', async () => {
    await seed('7', OLD_NONCE);
    let laterLockClock = '';
    let earlierLockClock = '';
    const startsFirst = dbA.transaction().execute(async (trx) => {
      await sleep(300);
      const row = await buildUpsertMessageQuery(trx as never, upsertValues('7') as never).executeTakeFirstOrThrow();
      laterLockClock = row.savedAtMicros;
    });
    await sleep(100);
    const takesLockFirst = dbB.transaction().execute(async (trx) => {
      await sql`select id from "Messages" where id = '7' for update`.execute(trx);
      await sleep(500);
      const row = await buildUpsertMessageQuery(trx as never, upsertValues('7') as never).executeTakeFirstOrThrow();
      earlierLockClock = row.savedAtMicros;
      await sleep(300);
    });
    await Promise.all([startsFirst, takesLockFirst]);

    expect(BigInt(laterLockClock) > BigInt(earlierLockClock)).toBe(true);
    expect(mintNonce(laterLockClock) > mintNonce(earlierLockClock)).toBe(true);
  });

  it('writes no preview nonce on insert or on conflict', async () => {
    await buildUpsertMessageQuery(dbA as never, upsertValues('8') as never).executeTakeFirstOrThrow();
    expect(await nonceOf('8')).toBeNull();
    await seed('9', OLD_NONCE);
    await buildUpsertMessageQuery(dbA as never, upsertValues('9') as never).executeTakeFirstOrThrow();
    expect(await nonceOf('9')).toBe(OLD_NONCE);
  });
});

describe('the minted nonce against the nonces a row may already hold', () => {
  it('P2: sorts above any 32-character hex nonce under collation C', async () => {
    const minted = mintNonce('1763509200000000');
    const { rows } = await sql<{ above: boolean }>`select (${minted}::text collate "C" > ${OLD_NONCE}::text collate "C") as above`.execute(dbA);
    expect(rows[0].above).toBe(true);
  });
});

describe('the shipped commit statement', () => {
  it('moves the nonce and hands back the one it replaced', async () => {
    await seed('11', OLD_NONCE);
    const nonce = mintNonce('1763509200000000');

    const rows = await buildCommitPreviewNonceQuery(dbA as never, '11', nonce).execute();

    expect(rows).toEqual([{ prev: OLD_NONCE }]);
    expect(await nonceOf('11')).toBe(nonce);
  });

  it('commits where the row holds no nonce yet, handing back null', async () => {
    await seed('12', null);
    const rows = await buildCommitPreviewNonceQuery(dbA as never, '12', mintNonce('5')).execute();
    expect(rows).toEqual([{ prev: null }]);
  });

  it('P3: under a concurrent commit it learns the nonce actually replaced', async () => {
    await seed('13', 'n0');
    const first = dbA.transaction().execute(async (trx) => {
      const rows = await buildCommitPreviewNonceQuery(trx as never, '13', 'n1').execute();
      expect(rows).toEqual([{ prev: 'n0' }]);
      await sleep(2000);
    });
    await sleep(700);

    const second = await buildCommitPreviewNonceQuery(dbB as never, '13', 'n2').execute();
    await first;

    expect(second).toEqual([{ prev: 'n1' }]);
    expect(await nonceOf('13')).toBe('n2');
  });

  it('refuses a nonce that orders below the stored one, and changes nothing', async () => {
    await seed('14', 'n2');
    const rows = await buildCommitPreviewNonceQuery(dbA as never, '14', 'n1').execute();
    expect(rows).toEqual([]);
    expect(await nonceOf('14')).toBe('n2');
  });

  it('orders by byte value whatever the database collation: a stored nB is below a new na', async () => {
    await seed('18', 'nB');
    const rows = await buildCommitPreviewNonceQuery(dbA as never, '18', 'na').execute();
    expect(rows).toEqual([{ prev: 'nB' }]);
    expect(await nonceOf('18')).toBe('na');
  });

  it('refuses the same nonce a second time', async () => {
    await seed('15', 'n2');
    expect(await buildCommitPreviewNonceQuery(dbA as never, '15', 'n2').execute()).toEqual([]);
  });

  it('on a row that is gone, returns nothing and inserts nothing', async () => {
    const rows = await buildCommitPreviewNonceQuery(dbA as never, '16', mintNonce('9')).execute();
    expect(rows).toEqual([]);
    expect((await sql<{ c: string }>`select count(*)::text as c from "Messages"`.execute(dbA)).rows[0].c).toBe('0');
  });

  it('touches no column but the nonce', async () => {
    await seed('17', OLD_NONCE);
    const before = (await sql`select name, data, valid, "updatedAt" from "Messages" where id = '17'`.execute(dbA)).rows;
    await buildCommitPreviewNonceQuery(dbA as never, '17', mintNonce('9')).execute();
    const after = (await sql`select name, data, valid, "updatedAt" from "Messages" where id = '17'`.execute(dbA)).rows;
    expect(after).toEqual(before);
  });
});
