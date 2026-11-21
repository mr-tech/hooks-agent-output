// Probe: message.getOne refusal uniformity over raw HTTP, through the real Next tRPC handler.
// Run only inside an isolated export of website (git archive), copied to
// src/server/api/routers/__tests__/getOne.refusal-probe.test.ts, with:
//   NODE_ENV=production PROBE_OUT=<file> npx vitest run src/server/api/routers/__tests__/getOne.refusal-probe.test.ts
// Database: the fake kysely driver (capturingDatabase). Redis boundary: stubs. Nothing reaches .env.local.
import { connect } from 'node:net';
import { createServer } from 'node:http';
import { writeFileSync } from 'node:fs';
import {
  afterAll, beforeAll, expect, it, vi,
} from 'vitest';

import type { AddressInfo } from 'node:net';
import type { CompiledQuery } from 'kysely';
import type { NextApiRequest, NextApiResponse } from 'next';

import createCapturingDatabase from '../../utils/__tests__/helpers/capturingDatabase';

type Caller = {
  name: string;
  discordId: string;
  dbUserId: null | string;
  sessionAccount: null | { userId: string, access_token: string, providerAccountId: string };
  guilds: null | { id: string }[];
};

const mocks = vi.hoisted(() => ({ db: undefined as unknown, caller: undefined as unknown as Caller }));

vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
vi.mock('~/server/auth', () => {
  const session = async () => ({ user: { id: mocks.caller.discordId, guilds: [] }, expires: 'never' });
  return { getServerAuthSession: session, getHydratedServerAuthSession: session };
});
vi.mock('project-utils', () => ({ getPostgres: () => mocks.db }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({
  default: {
    fetchAccountFromSession: async () => mocks.caller.sessionAccount,
    fetchUserGuilds: async () => mocks.caller.guilds,
  },
}));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const OWNER_DB = '900000000000001';
const GUILD = '300000000000000001';
const SECRET = 'owner-only-content-7f3a';
const IDS = { absent: '900000000000500', personal: '900000000000101', server: '900000000000201' } as const;
const ROWS: Record<string, { fk_users_id: null | string, guildId: null | string }> = {
  [IDS.personal]: { fk_users_id: OWNER_DB, guildId: null },
  [IDS.server]: { fk_users_id: null, guildId: GUILD },
};

const acct = (userId: string, discordId: string) => ({ userId, access_token: 'tok', providerAccountId: discordId });
const CALLERS: Record<string, Caller> = {
  owner: { name: 'owner', discordId: '100000000000000001', dbUserId: OWNER_DB, sessionAccount: acct(OWNER_DB, '100000000000000001'), guilds: [] },
  manager: { name: 'manager', discordId: '100000000000000003', dbUserId: '900000000000003', sessionAccount: acct('900000000000003', '100000000000000003'), guilds: [{ id: GUILD }] },
  other: { name: 'other', discordId: '100000000000000002', dbUserId: '900000000000002', sessionAccount: acct('900000000000002', '100000000000000002'), guilds: [] },
  otherManagesElsewhere: { name: 'otherManagesElsewhere', discordId: '100000000000000004', dbUserId: '900000000000004', sessionAccount: acct('900000000000004', '100000000000000004'), guilds: [{ id: '300000000000000099' }] },
  discordUnreadable: { name: 'discordUnreadable', discordId: '100000000000000005', dbUserId: '900000000000005', sessionAccount: acct('900000000000005', '100000000000000005'), guilds: null },
  noAccountRow: { name: 'noAccountRow', discordId: '100000000000000006', dbUserId: null, sessionAccount: null, guilds: [] },
};

function respond({ sql, parameters }: CompiledQuery): unknown[] {
  if (sql.startsWith('select "userId" from "Accounts"')) {
    const c = Object.values(CALLERS).find(({ discordId }) => parameters.includes(discordId));
    return c?.dbUserId ? [{ userId: c.dbUserId }] : [];
  }
  if (sql.includes('left join "ScheduledMessages"')) {
    const id = String(parameters[0]);
    const row = ROWS[id];
    return row ? [{
      id, createdAt: new Date(0), updatedAt: new Date(0), name: 'n', data: { content: SECRET },
      previewImageNonce: null, recentWebhookId: null, recentThreadId: null, recentMessageId: null,
      guildId: row.guildId, scheduledMessageId: null, scheduledMessageCron: null, scheduledMessageError: null,
      scheduledMessageSendAt: null, scheduledMessageSent: null,
    }] : [];
  }
  if (sql.startsWith('select "fk_users_id" from "Messages"')) {
    return parameters.flatMap((v) => (ROWS[String(v)] ? [{ fk_users_id: ROWS[String(v)]!.fk_users_id }] : []));
  }
  return [];
}

let port = 0;
const server = createServer((req, res) => {
  const u = new URL(req.url ?? '/', 'http://localhost');
  const trpc = decodeURIComponent(u.pathname.replace(/^\/api\/trpc\//, ''));
  Object.assign(req, { query: { ...Object.fromEntries(u.searchParams), trpc } });
  import('~/pages/api/trpc/[trpc]').then(({ default: handler }) => handler(req as NextApiRequest, res as NextApiResponse))
    .catch(() => { res.statusCode = 599; res.end(); });
});

beforeAll(async () => {
  await import('~/pages/api/trpc/[trpc]');
  await new Promise<void>((r) => { server.listen(0, r); });
  port = (server.address() as AddressInfo).port;
  mocks.db = createCapturingDatabase(respond).db;
});
afterAll(async () => { await new Promise((r) => { server.close(r); }); });

function raw(request: string): Promise<{ status: number, body: string }> {
  return new Promise((resolve, reject) => {
    const s = connect(port, '127.0.0.1');
    let buf = '';
    s.on('data', (d) => { buf += d.toString('latin1'); });
    s.on('end', () => {
      const [head = '', ...rest] = buf.split('\r\n\r\n');
      let body = rest.join('\r\n\r\n');
      if (/transfer-encoding: chunked/i.test(head)) {
        let out = ''; let i = 0;
        while (i < body.length) {
          const nl = body.indexOf('\r\n', i);
          const n = parseInt(body.slice(i, nl), 16);
          if (!n) break;
          out += body.slice(nl + 2, nl + 2 + n); i = nl + 2 + n + 2;
        }
        body = out;
      }
      resolve({ status: Number(head.split(' ')[1]), body });
    });
    s.on('error', reject);
    s.write(request);
  });
}

const COOKIE = 'Cookie: __Secure-next-auth.session-token=probe-token\r\n';
const get = (target: string, extra = '') => raw(`GET ${target} HTTP/1.1\r\nHost: localhost\r\n${COOKIE}${extra}Connection: close\r\n\r\n`);
const enc = (v: unknown) => encodeURIComponent(JSON.stringify({ json: v }));

// Request-target forms for one id (the input class of the uniformity criterion).
const FORMS: [string, (id: string) => () => Promise<{ status: number, body: string }>][] = [
  ['canonical', (id) => () => get(`/api/trpc/message.getOne?input=${enc(id)}`)],
  ['leading-zeros', (id) => () => get(`/api/trpc/message.getOne?input=${enc(`00${id}`)}`)],
  ['hydrate', (id) => () => get(`/api/trpc/message.getOne?hydrate=true&input=${enc(id)}`)],
  ['encoded-path-dot', (id) => () => get(`/api/trpc/message%2EgetOne?input=${enc(id)}`)],
  ['raw-unencoded-json', (id) => () => get(`/api/trpc/message.getOne?input={"json":"${id}"}`)],
];

// Inputs that are not message numbers: answered before any row is read.
const MALFORMED: [string, () => Promise<{ status: number, body: string }>][] = [
  ['number-not-string', () => get(`/api/trpc/message.getOne?input=${enc(Number(IDS.personal))}`)],
  ['negative', () => get(`/api/trpc/message.getOne?input=${enc(`-${IDS.personal}`)}`)],
  ['plus-sign', () => get(`/api/trpc/message.getOne?input=${enc(`+${IDS.personal}`)}`)],
  ['whitespace', () => get(`/api/trpc/message.getOne?input=${enc(` ${IDS.personal}`)}`)],
  ['int8-overflow', () => get(`/api/trpc/message.getOne?input=${enc('9223372036854775808')}`)],
  ['twenty-digits', () => get(`/api/trpc/message.getOne?input=${enc('09223372036854775807')}`)],
  ['empty', () => get(`/api/trpc/message.getOne?input=${enc('')}`)],
  ['array', () => get(`/api/trpc/message.getOne?input=${enc([IDS.personal])}`)],
  ['missing-input', () => get('/api/trpc/message.getOne')],
  ['post-method', () => raw(`POST /api/trpc/message.getOne HTTP/1.1\r\nHost: localhost\r\n${COOKIE}Content-Type: application/json\r\nContent-Length: ${JSON.stringify({ json: IDS.personal }).length}\r\nConnection: close\r\n\r\n${JSON.stringify({ json: IDS.personal })}`)],
  ['batch', () => get(`/api/trpc/message.getOne,message.getOne?batch=1&input=${encodeURIComponent(JSON.stringify({ 0: { json: IDS.personal }, 1: { json: IDS.server } }))}`)],
];

it('probe', async () => {
  const results: Record<string, unknown>[] = [];
  for (const caller of Object.values(CALLERS)) {
    mocks.caller = caller;
    for (const [kind, id] of Object.entries(IDS)) {
      for (const [form, make] of FORMS) {
        const r = await make(id)();
        results.push({ caller: caller.name, kind, form, status: r.status, body: r.body, leaksSecret: r.body.includes(SECRET) });
      }
    }
    for (const [form, run] of MALFORMED) {
      const r = await run();
      results.push({ caller: caller.name, kind: 'malformed', form, status: r.status, body: r.body, leaksSecret: r.body.includes(SECRET) });
    }
  }
  if (process.env.PROBE_OUT) writeFileSync(process.env.PROBE_OUT, JSON.stringify(results, null, 1));

  const allowed = (c: string, k: string) => (c === 'owner' && k === 'personal') || (c === 'manager' && k === 'server');
  // Oracle 1: the secret appears only where the caller may see the message.
  const leaks = results.filter((r) => r.leaksSecret && !allowed(String(r.caller), String(r.kind)));
  // Oracle 2: for each caller whose session is whole, the three refused kinds answer one byte-identical body and status per form.
  const whole = ['other', 'otherManagesElsewhere'];
  const split = whole.flatMap((c) => FORMS.map(([f]) => {
    const set = new Set(results.filter((r) => r.caller === c && r.form === f && r.kind !== 'malformed').map((r) => `${r.status} ${r.body}`));
    return set.size === 1 ? null : { caller: c, form: f, distinct: [...set] };
  })).filter(Boolean);
  // Oracle 3: the permitted reads succeed in every form (no form refuses its own owner).
  const ownerFails = results.filter((r) => allowed(String(r.caller), String(r.kind)) && (r.status !== 200 || !r.leaksSecret));
  expect({ leaks, split, ownerFails }).toEqual({ leaks: [], split: [], ownerFails: [] });
});
