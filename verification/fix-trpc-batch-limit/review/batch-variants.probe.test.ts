// Reviewer's probe, not suite material. Copy into a website export at
// src/pages/api/trpc/__tests__/ and run with `PROBE_OUT=<file> npx vitest run <that path>`.
// Drives the real [trpc] handler over a real socket with request variants that could carry
// more than one procedure call; the oracle per row is the status and whether any query ran.
import { writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import {
  afterAll, beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';

import type { AddressInfo } from 'node:net';
import type { NextApiRequest, NextApiResponse } from 'next';

import createCapturingDatabase from '~/server/api/utils/__tests__/helpers/capturingDatabase';

const mocks = vi.hoisted(() => ({ db: undefined as unknown }));

vi.mock('~/env.mjs', () => ({
  env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }),
}));
vi.mock('~/server/auth', () => {
  const session = async () => ({ user: { id: '100000000000000001', guilds: [] }, expires: 'never' });
  return { getServerAuthSession: session, getHydratedServerAuthSession: session };
});
vi.mock('project-utils', () => ({ getPostgres: () => mocks.db }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

let captured: ReturnType<typeof createCapturingDatabase>;
let origin = '';
const server = createServer((req, res) => {
  const requestUrl = new URL(req.url ?? '/', 'http://localhost');
  const query = Object.fromEntries(requestUrl.searchParams);
  const trpc = decodeURIComponent(requestUrl.pathname.replace(/^\/api\/trpc\//, ''));
  Object.assign(req, { query: { ...query, trpc } });
  import('../[trpc]').then(({ default: handler }) => handler(
    req as NextApiRequest,
    res as NextApiResponse,
  )).catch(() => { res.statusCode = 599; res.end(); });
});

beforeAll(async () => {
  await new Promise<void>((resolve) => { server.listen(0, resolve); });
  const { port } = server.address() as AddressInfo;
  origin = `http://localhost:${port}`;
});

afterAll(async () => {
  await new Promise((resolve) => { server.close(resolve); });
});

beforeEach(() => {
  captured = createCapturingDatabase(({ sql }) => (sql.startsWith('select "userId" from "Accounts"') ? [{ userId: '900000000000001' }] : []));
  mocks.db = captured.db;
});

const two = 'user.getPreferences,user.getPreferences';
const results: string[] = [];

afterAll(() => { writeFileSync(process.env.PROBE_OUT ?? '/dev/stdout', `${results.join('\n')}\n`); });

describe('batch variants', () => {
  it.each<[string, string, RequestInit]>([
    ['GET two paths batch=1', `/api/trpc/${two}?batch=1`, {}],
    ['GET two paths encoded comma batch=1', '/api/trpc/user.getPreferences%2Cuser.getPreferences?batch=1', {}],
    ['GET two paths batch=1&batch=0', `/api/trpc/${two}?batch=1&batch=0`, {}],
    ['GET two paths batch=0&batch=1', `/api/trpc/${two}?batch=0&batch=1`, {}],
    ['GET two paths batch=true', `/api/trpc/${two}?batch=true`, {}],
    ['GET two paths no batch', `/api/trpc/${two}`, {}],
    ['GET one path batch=1 (batch of one)', '/api/trpc/user.getPreferences?batch=1', {}],
    ['GET two paths batch=1 trpc-accept jsonl', `/api/trpc/${two}?batch=1`, { headers: { 'trpc-accept': 'application/jsonl' } }],
    ['POST two paths batch=1 json', `/api/trpc/${two}?batch=1`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }],
    ['POST two paths octet-stream', `/api/trpc/${two}`, { method: 'POST', headers: { 'content-type': 'application/octet-stream' }, body: 'x' }],
    ['POST two paths form-data', `/api/trpc/${two}`, { method: 'POST', body: new FormData() }],
    ['control: GET one path no batch', '/api/trpc/user.getPreferences', {}],
  ])('%s', async (label, path, init) => {
    const response = await fetch(`${origin}${path}`, init);
    await response.text();
    results.push(`${label}\tstatus=${response.status}\tqueries=${captured.queries.length}`);
    expect(true).toBe(true);
  });
});
