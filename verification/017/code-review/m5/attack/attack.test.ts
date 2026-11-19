// Code review, chain 017 Round 6: adversarial execution of M5's deletion path. Copied into a `git archive`
// export's attack/ directory and run by run.sh; never part of the website suite.
//
// Driven: the real upsertMessage, runPreviewContinuation, deleteMessagePreviewImages, the real
// @aws-sdk/client-s3 over HTTP to a loopback S3 stub, the real fetch to a scripted generator, and a real
// Postgres 16 (Messages and Guilds with the Prisma schema's column types). Substituted: ~/env.mjs (values
// below), pusher (records triggers), and Vercel's request context (its own protocol, collecting waitUntil
// promises as the platform would).
//
// Oracle, fixed before the run (plan M5-a to M5-c, M5-f): for each scenario the exact final row nonce, the
// exact object set under every prefix touched, the stub's request log (no list or delete for a failed save;
// no delete outside the saved message's prefix), and the failure lines (exactly one per failure, the plan's
// fields only, none on 204).
import pg from '/usr/local/bin/hooks/website/node_modules/.pnpm/pg@8.11.1/node_modules/pg/lib/index.js';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import http from 'http';

import { createS3Stub } from '../m6-probe-s3-stub.mjs';

import deleteMessagePreviewImages from '~/server/api/utils/deleteMessagePreviewImages';
import { upsertMessage } from '~/server/api/utils/shared';

const pending: Promise<unknown>[] = [];
(globalThis as Record<symbol, unknown>)[Symbol.for('@vercel/request-context')] = {
  get: () => ({ waitUntil: (p: Promise<unknown>) => { pending.push(p); } }),
};

const pool = new pg.Pool({ host: process.env.PG_SOCKET_DIR, user: 'postgres', database: 'attack', max: 2 });
const q = async (text: string, params: unknown[] = []) => (await pool.query(text, params)).rows;

const stub = createS3Stub();
type Behaviour = { status?: number; put?: boolean; hang?: boolean; drop?: boolean; gate?: Promise<void> };
const script = new Map<string, Behaviour[]>();
const requests: { id: string; nonce: string }[] = [];
let gen: http.Server;

const key = (id: string, nonce: string) => `previews/${id}/${nonce}.jpeg`;
const objectsUnder = (prefix: string) => [...stub.objects.keys()].filter((k) => k.startsWith(prefix)).sort();
const seed = (k: string, ageMs: number) => stub.objects.set(k, {
  body: Buffer.from('jpeg'), type: 'image/jpeg', acl: 'public-read', lastModified: new Date(Date.now() - ageMs),
});
const rowNonce = async (id: string) => (await q('select "previewImageNonce" as n from "Messages" where id = $1', [id]))[0]?.n;
const seedRow = (id: string, nonce: string | null) => q(
  'insert into "Messages" (id, fk_users_id, "previewImageNonce", "updatedAt", name, data, valid) values ($1, 1, $2, now(), $3, $4, true)',
  [id, nonce, 'n', JSON.stringify({ content: 'x' })],
);
const DATA = { content: 'Hi', embeds: [], components: [] };

let errors: string[] = [];
async function save(id: string | null, behaviour: Behaviour) {
  if (id) script.set(id, [...(script.get(id) ?? []), behaviour]);
  else script.set('*new*', [behaviour]);
  const before = pending.length;
  const reply = await upsertMessage({ id: id ?? undefined, name: 'n', data: DATA } as never, { dbUserId: '1' });
  expect(pending.length).toBe(before + 1);
  return { reply, done: pending[before] };
}
const failureLines = () => errors.filter((l) => l.startsWith('preview-image-failure'));
const deletesLogged = (from = 0) => stub.log.slice(from).filter((e: { kind: string }) => e.kind === 'delete').flatMap((e: { keys: string[] }) => e.keys);
const listsLogged = (from = 0) => stub.log.slice(from).filter((e: { kind: string }) => e.kind === 'list').map((e: { prefix: string }) => e.prefix);

beforeAll(async () => {
  await q('create table "Guilds" (id bigserial primary key, "guildId" text, provider text)');
  await q(`create table "Messages" (
    id bigserial primary key, fk_users_id bigint, fk_guilds_id bigint, "previewImageNonce" text,
    "recentWebhookId" text, "recentThreadId" text, "recentMessageId" text,
    "createdAt" timestamp(3) not null default current_timestamp, "updatedAt" timestamp(3) not null,
    name text not null, data jsonb not null, position integer not null default 0, valid boolean)`);
  await q('alter sequence "Messages_id_seq" restart with 900000000000001');
  await q(`create table "ScheduledMessages" (
    id bigserial primary key, fk_guilds_id bigint not null, fk_messages_id bigint unique not null, "webhookUrl" text not null,
    "createdAt" timestamp(3) not null default current_timestamp, "updatedAt" timestamp(3) not null, cron text,
    "sendAt" timestamp(3) not null, sent boolean not null default false, error text)`);
  await stub.listen(39101);
  gen = http.createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', async () => {
      const { id, nonce } = JSON.parse(Buffer.concat(chunks).toString());
      requests.push({ id, nonce });
      const queue = script.get(id) ?? script.get('*new*') ?? [];
      const b = queue.shift() ?? { status: 500 };
      if (b.gate) await b.gate;
      if (b.hang) return;
      if (b.drop) { req.socket.destroy(); return; }
      if (b.put) seed(key(id, nonce), 0);
      res.writeHead(b.status ?? 204);
      res.end();
    });
  });
  await new Promise<void>((r) => { gen.listen(39102, '127.0.0.1', () => r()); });
});
afterAll(async () => {
  gen.closeAllConnections(); gen.close();
  await stub.close();
  await pool.end();
});
beforeEach(() => {
  errors = [];
  vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => { errors.push(args.map(String).join(' ')); });
});

const N0 = 'a'.repeat(32);

describe('a failed generation moves nothing and logs one line', () => {
  it.each([
    ['status-500', { status: 500, put: true }],
    ['status-404', { status: 404 }],
    ['status-other', { status: 503 }],
    ['status-other', { status: 302 }],
    ['network-error', { drop: true }],
  ] as [string, Behaviour][])('%s (%o)', async (cls, behaviour) => {
    const id = String(800000000000000 + Math.floor(Math.random() * 1e9));
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    const logBefore = stub.log.length;
    const { reply, done } = await save(id, behaviour);
    await done;
    expect((reply as { previewImageNonce: string }).previewImageNonce).toBe(N0);
    expect(await rowNonce(id)).toBe(N0);
    const after = objectsUnder(`previews/${id}/`);
    expect(after.includes(key(id, N0))).toBe(true);
    expect(stub.log.slice(logBefore).filter((e: { kind: string }) => e.kind !== 'put')).toEqual([]);
    expect(failureLines()).toHaveLength(1);
    expect(failureLines()[0]).toMatch(new RegExp(`^preview-image-failure id=${id} class=${cls} elapsedMs=\\d+$`));
    const sent = requests.filter((r) => r.id === id).at(-1)!.nonce;
    expect(failureLines()[0].includes(sent)).toBe(false);
  });

  it('no answer within T: one line, nothing moved', async () => {
    const id = '900000000777001';
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    const { done } = await save(id, { hang: true });
    await done;
    expect(await rowNonce(id)).toBe(N0);
    expect(failureLines()).toHaveLength(1);
    expect(failureLines()[0]).toMatch(/^preview-image-failure id=900000000777001 class=no-answer-within-T elapsedMs=(39|4\d)\d{3}$/);
  });
});

describe('a confirmed generation', () => {
  it('commits, deletes the replaced object, writes no failure line', async () => {
    const id = '900000000100001';
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    const { reply, done } = await save(id, { put: true });
    await done;
    const n = await rowNonce(id);
    expect(n).toMatch(/^v\d{16}[0-9a-f]{16}$/);
    expect((reply as { previewImageNonce: string }).previewImageNonce).toBe(N0);
    expect(objectsUnder(`previews/${id}/`)).toEqual([key(id, n)]);
    expect(failureLines()).toEqual([]);
  });

  it('a new message stores no nonce until a success, then the success', async () => {
    const { reply, done } = await save(null, { status: 500 });
    await done;
    const id = String((reply as { id: string }).id);
    expect(await rowNonce(id)).toBeNull();
    const second = await save(id, { put: true });
    await second.done;
    const n = await rowNonce(id);
    expect(n).toMatch(/^v/);
    expect(objectsUnder(`previews/${id}/`)).toEqual([key(id, n)]);
  });

  it('leaves a message whose id extends this one alone', async () => {
    const id = '900000000200002';
    const other = `${id}7`;
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    seed(key(other, 'b'.repeat(32)), 900_000); seed(key(other, 'c'.repeat(32)), 900_000);
    const logBefore = stub.log.length;
    const { done } = await save(id, { put: true });
    await done;
    expect(objectsUnder(`previews/${other}/`)).toEqual([key(other, 'b'.repeat(32)), key(other, 'c'.repeat(32))]);
    expect(deletesLogged(logBefore).filter((k: string) => !k.startsWith(`previews/${id}/`))).toEqual([]);
    expect(listsLogged(logBefore)).toEqual([`previews/${id}/`]);
  });

  it('sweeps over the wire by the bucket\'s times: 125 s older goes, 115 s older and newer stay', async () => {
    const id = '900000000300003';
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    seed(`previews/${id}/old.jpeg`, 125_000);
    seed(`previews/${id}/edge.jpeg`, 115_000);
    seed(`previews/${id}/newer.jpeg`, -5_000);
    const { done } = await save(id, { put: true });
    await done;
    const n = await rowNonce(id);
    expect(objectsUnder(`previews/${id}/`)).toEqual([`previews/${id}/edge.jpeg`, `previews/${id}/newer.jpeg`, key(id, n)].sort());
  });
});

describe('two saves of one message', () => {
  it.each(['later answers first', 'earlier answers first'])('%s: the later save wins, one object left', async (order) => {
    const id = order === 'later answers first' ? '900000000400004' : '900000000400005';
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    let open1!: () => void; let open2!: () => void;
    const g1 = new Promise<void>((r) => { open1 = r; });
    const g2 = new Promise<void>((r) => { open2 = r; });
    const s1 = await save(id, { put: true, gate: g1 });
    const s2 = await save(id, { put: true, gate: g2 });
    await vi.waitFor(() => { expect(requests.filter((r) => r.id === id)).toHaveLength(2); });
    const [n1, n2] = requests.filter((r) => r.id === id).map((r) => r.nonce);
    expect(n2 > n1).toBe(true);
    if (order === 'later answers first') { open2(); await s2.done; open1(); await s1.done; } else { open1(); await s1.done; open2(); await s2.done; }
    expect(await rowNonce(id)).toBe(n2);
    expect(objectsUnder(`previews/${id}/`)).toEqual([key(id, n2)]);
    expect(failureLines()).toEqual([]);
  });
});

describe('a message deleted while its preview renders', () => {
  it('is not recreated, and its prefix ends empty', async () => {
    const id = '900000000500006';
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    let open!: () => void;
    const gate = new Promise<void>((r) => { open = r; });
    const s = await save(id, { put: true, gate });
    await q('delete from "Messages" where id = $1', [id]);
    await deleteMessagePreviewImages(id);
    open(); await s.done;
    expect(await q('select id from "Messages" where id = $1', [id])).toEqual([]);
    expect(objectsUnder(`previews/${id}/`)).toEqual([]);
  });
});

describe('observation, not a criterion: a 204 with no object stored (M6\'s premise broken)', () => {
  it('records what the row and the bucket then hold', async () => {
    const id = '900000000600007';
    await seedRow(id, N0); seed(key(id, N0), 500_000);
    const { done } = await save(id, { put: false });
    await done;
    const n = await rowNonce(id);
    console.log(`OBSERVE no-object-204 row=${n === N0 ? 'N0' : 'new'} objects=${JSON.stringify(objectsUnder(`previews/${id}/`).map((k) => k.replace(String(n), '<row>')))}`);
    expect(true).toBe(true);
  });
});
