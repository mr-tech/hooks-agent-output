// A measurement, not a suite test: it is never placed in the website repository.
// Measures what the two save procedures of the website (`message.upsert`, `user.updatePreferences`)
// cost on hostile inputs, through each procedure's own tRPC caller, so the input parser measured is
// the one the router mounts. It asserts nothing; it appends one JSON line per input to PROBE_OUT.
//
// Usage: copy this file into an isolated export of the website at
//   src/server/api/routers/__tests__/saveCap.cost-probe.test.ts
// and, with that export as cwd, run
//   SKIP_ENV_VALIDATION=1 PROBE_BYTES=1048576 PROBE_OUT=<file> npx vitest run src/server/api/routers/__tests__/saveCap.cost-probe.test.ts
// Each line: the input's label and procedure, its JSON size, whether it was refused and with which
// tRPC code, the number of issues in the refusal, the set of keys those issues carry, the length of
// the refusal's message (what tRPC's error shape returns), elapsed ms from call to refusal, heap
// growth (no forced collection, so rough), and how often the database stand-in was touched.
// The mocks only let the router modules load without a database, a session store or Pusher.
import { appendFileSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { it, vi } from 'vitest';

import messageRouter from '../message';
import userRouter from '../user';

const probe = vi.hoisted(() => {
  const state = { touches: 0 };
  const database: unknown = new Proxy({}, {
    get: (_, key) => {
      if (key === 'then') return undefined;
      state.touches += 1;
      return () => { throw new Error('probe: the database stand-in was called'); };
    },
  });
  return { state, database };
});

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));
vi.mock('~/server/auth', () => ({
  getServerAuthSession: vi.fn(),
  getHydratedServerAuthSession: vi.fn(),
}));
vi.mock('project-utils', () => ({ getPostgres: () => probe.database }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const limit = Number(process.env.PROBE_BYTES);
const out = String(process.env.PROBE_OUT);

const context = {
  session: { user: { id: '100000000000000001', guilds: [] }, expires: 'never' },
  req: {},
  database: probe.database,
} as never;

type Call = (input: unknown) => Promise<unknown>;
const upsert: Call = (input) => messageRouter.createCaller(context).upsert(input as never);
const updatePreferences: Call = (input) => userRouter.createCaller(context)
  .updatePreferences(input as never);

const rep = (n: number, f: () => unknown) => Array.from({ length: n }, f);
const save = (data: unknown) => ({ message: { name: 'a', data } });

// The dependency review's four bodies: the byte budget filled with the shortest failing element.
function filled(prefix: string, suffix: string, wrap = (inner: string) => `{"message":{"name":"a","data":${inner}}}`): unknown {
  const n = Math.floor((limit - wrap(prefix + suffix).length) / 2);
  return JSON.parse(wrap(`${prefix}${'0,'.repeat(n - 1)}0${suffix}`));
}

async function settle(call: Call, input: unknown) {
  try {
    await call(input);
    return { refused: false as const };
  } catch (error) {
    const { code, message } = error as { code?: string; message: string };
    let issues: number | string = 'the message is not a JSON list';
    let issueKeys: string[] = [];
    let last = '';
    try {
      const parsed = JSON.parse(message) as Record<string, unknown>[];
      issues = parsed.length;
      issueKeys = [...new Set(parsed.flatMap((issue) => Object.keys(issue)))].sort();
      last = String(parsed[parsed.length - 1]?.message).slice(0, 80);
    } catch { /* recorded above */ }
    return {
      refused: true as const, code, issues, issueKeys, messageChars: message.length, lastIssueMessage: last,
    };
  }
}

async function measure(label: string, procedure: string, call: Call, input: unknown) {
  const bodyBytes = JSON.stringify(input).length;
  const touchesBefore = probe.state.touches;
  const heapBefore = process.memoryUsage().heapUsed;
  const started = process.hrtime.bigint();
  const outcome = await settle(call, input);
  const ms = Number(process.hrtime.bigint() - started) / 1e6;
  appendFileSync(out, `${JSON.stringify({
    label,
    procedure,
    bodyBytes,
    ...outcome,
    ms: Math.round(ms * 10) / 10,
    heapGrowthMB: Math.round((process.memoryUsage().heapUsed - heapBefore) / 1048576),
    databaseTouches: probe.state.touches - touchesBefore,
  })}\n`);
}

// One HTTP request can carry many saves (tRPC batching is on by default). Modelled, not sent over
// HTTP: n saves of one small body that each fill the cap, run together.
async function measureMany(label: string, n: number, call: Call, input: unknown) {
  const bodyBytes = JSON.stringify(input).length;
  const heapBefore = process.memoryUsage().heapUsed;
  const started = process.hrtime.bigint();
  const outcomes = await Promise.all(rep(n, () => settle(call, input)) as Promise<Awaited<ReturnType<typeof settle>>>[]);
  const ms = Number(process.hrtime.bigint() - started) / 1e6;
  const refused = outcomes.filter((o) => o.refused);
  appendFileSync(out, `${JSON.stringify({
    label,
    saves: n,
    bytesPerSave: bodyBytes,
    bytesTogether: bodyBytes * n,
    refused: refused.length,
    issuesTogether: refused.reduce((sum, o) => sum + (o.refused && typeof o.issues === 'number' ? o.issues : 0), 0),
    messageCharsTogether: refused.reduce((sum, o) => sum + (o.refused ? o.messageChars : 0), 0),
    ms: Math.round(ms * 10) / 10,
    heapGrowthMB: Math.round((process.memoryUsage().heapUsed - heapBefore) / 1048576),
  })}\n`);
}

it('records the cost of each input', async () => {
  const version = (name: string) => (JSON.parse(readFileSync(path.join(process.cwd(), `node_modules/${name}/package.json`), 'utf8')) as { version: string }).version;
  appendFileSync(out, `${JSON.stringify({
    zod: version('zod'), trpc: version('@trpc/server'), next: version('next'), node: process.version, limitBytes: limit,
  })}\n`);

  // 1. The dependency review's M-001 bodies, each list filled to the byte budget with failing elements.
  const users = () => filled('{"allowed_mentions":{"users":[', ']}}');
  await measure('M-001 users filled', 'message.upsert', upsert, users());
  await measure('M-001 embeds filled', 'message.upsert', upsert, filled('{"embeds":[', ']}'));
  await measure('M-001 components filled', 'message.upsert', upsert, filled('{"components":[', ']}'));
  await measure('M-001 container components filled', 'message.upsert', upsert, filled('{"components":[{"type":17,"components":[', ']}]}'));
  await measure('M-001 users filled', 'user.updatePreferences', updatePreferences, users());
  await measure('recentMessageIds filled', 'user.updatePreferences', updatePreferences, filled('[', ']', (inner) => `{"recentMessageIds":${inner}}`));
  await measure('roles filled', 'message.upsert', upsert, filled('{"allowed_mentions":{"roles":[', ']}}'));
  await measure('parse filled', 'message.upsert', upsert, filled('{"allowed_mentions":{"parse":[', ']}}'));
  await measure('embed fields filled', 'message.upsert', upsert, filled('{"embeds":[{"fields":[', ']}]}'));
  await measure('action row components filled', 'message.upsert', upsert, filled('{"components":[{"type":1,"components":[', ']}]}'));
  await measure('section components filled', 'message.upsert', upsert, filled('{"components":[{"type":9,"accessory":{},"components":[', ']}]}'));
  await measure('gallery items filled', 'message.upsert', upsert, filled('{"components":[{"type":12,"items":[', ']}]}'));

  // 2. Steering's within-bound worst bodies (verification/018/steering/refute-within-bound/probe.ts).
  const row = () => ({ type: 1, components: rep(5, () => ({})) });
  const sec = () => ({ type: 9, components: rep(3, () => ({})), accessory: {} });
  const gal = () => ({ type: 12, items: rep(10, () => ({})) });
  const cont = (kids: () => unknown) => ({ type: 17, components: rep(40, kids) });
  let mix = 0;
  const mixed = () => [row, sec, gal][mix++ % 3]!();
  const embeds = rep(10, () => ({ fields: rep(25, () => ({})) }));
  const fat = () => ({
    type: 2, style: 1, emoji: { id: 1, name: 1, animated: 1 }, url: 'x', disabled: 1,
  });
  const fatRow = () => ({ type: 1, components: rep(5, fat) });
  const within: Record<string, unknown> = {
    F_fat_buttons: { components: rep(40, () => cont(fatRow)) },
    G_fat_buttons_plus_embeds: { components: rep(40, () => cont(fatRow)), embeds },
    A_rows_only: { components: rep(40, () => cont(row)) },
    B_sections_only: { components: rep(40, () => cont(sec)) },
    C_galleries_only: { components: rep(40, () => cont(gal)) },
    D_mixed_plus_embeds: { components: rep(40, () => cont(mixed)), embeds },
    E_rows_plus_embeds: { components: rep(40, () => cont(row)), embeds },
  };
  for (const [label, data] of Object.entries(within)) {
    await measure(`within bounds ${label}`, 'message.upsert', upsert, save(data));
  }

  // 3. Inputs of my own: long values where a failure could carry the input, and odd shapes.
  const long = 'x'.repeat(Math.floor(limit * 0.85));
  const tenKb = 'x'.repeat(10000);
  await measure('100 long invalid user ids, within the bound', 'message.upsert', upsert, save({ allowed_mentions: { users: rep(100, () => tenKb) } }));
  await measure('long value at spacing', 'message.upsert', upsert, save({ components: [{ type: 14, divider: true, spacing: long }] }));
  await measure('long value at parse element', 'message.upsert', upsert, save({ allowed_mentions: { parse: [long] } }));
  await measure('long value at a component type', 'message.upsert', upsert, save({ components: [{ type: long }] }));
  await measure('long value at an accessory type', 'message.upsert', upsert, save({ components: [{ type: 9, components: [{ type: 10, content: 'a' }], accessory: { type: long } }] }));
  await measure('long value at a button style', 'message.upsert', upsert, save({ components: [{ type: 1, components: [{ type: 2, style: long, url: 'https://example.com' }] }] }));
  await measure('long string where a list is expected', 'message.upsert', upsert, save({ embeds: long }));
  await measure('long message name', 'message.upsert', upsert, { message: { name: long, data: {} } });
  const manyKeys: Record<string, number> = {};
  for (let i = 0; i < 60000; i += 1) manyKeys[`k${i}`] = 0;
  await measure('60,000 unknown keys and one error', 'message.upsert', upsert, { message: { name: 5, data: manyKeys } });
  await measure('40 containers of 40 over-limit rows', 'message.upsert', upsert, save({ components: rep(40, () => cont(() => ({ type: 1, components: rep(6, () => 0) }))) }));
  await measure('a list holding lists', 'message.upsert', upsert, save({ components: rep(40, () => rep(1000, () => [])) }));

  // 4. Many saves in one request, modelled.
  const small = save({ components: rep(21, () => 0) });
  await measure('one small save that fills the cap', 'message.upsert', upsert, small);
  await measureMany('1,000 small saves together', 1000, upsert, small);
  await measureMany('10,000 small saves together', 10000, upsert, small);
}, 600000);
