// QA Phase 1 probe (chain 018), isolated export of website 7923a1d. Drives the two save procedures through
// the tRPC caller with a database that records every query, and reports: the error message the client
// receives (parsed as the issue list formatMutationError reads), its issue count, and whether any query ran.
import { writeFileSync } from 'node:fs';

import { describe, it, vi } from 'vitest';

import messageRouter from '../message';
import userRouter from '../user';

const mocks = vi.hoisted(() => ({ queries: [] as string[] }));

vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: vi.fn(), getHydratedServerAuthSession: vi.fn() }));
vi.mock('project-utils', () => ({ getPostgres: () => { throw new Error('no database in probe'); } }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const database = new Proxy({}, { get: (_, key) => { mocks.queries.push(String(key)); throw new Error(`database touched: ${String(key)}`); } });
const ctx = { session: { user: { id: '100000000000000001', guilds: [] }, expires: 'never' }, req: {}, database } as never;
const out: string[] = [];

async function call(label: string, fn: () => Promise<unknown>) {
  mocks.queries.length = 0;
  try {
    await fn();
    out.push(`${label} | resolved`);
  } catch (e) {
    const err = e as { code?: string, message: string, cause?: unknown };
    let count: number | string = 'not a JSON issue list';
    try { const parsed = JSON.parse(err.message) as unknown[]; if (Array.isArray(parsed)) count = parsed.length; } catch { /* not JSON */ }
    out.push(`${label} | ${err.code} | issues in message: ${count} | cause: ${(err.cause as Error | undefined)?.constructor?.name} | database touched: ${mocks.queries.length}`);
  }
}
const fill = <T>(n: number, v: T) => Array.from({ length: n }, () => v);

describe('save procedures through the caller at 7923a1d', () => {
  it('reports', async () => {
    const m = messageRouter.createCaller(ctx);
    const u = userRouter.createCaller(ctx);
    await call('message.upsert, 50 invalid embeds', () => m.upsert({ message: { name: 'n', data: { embeds: fill(50, { title: 1 }) } } } as never));
    await call('message.upsert, 150 invalid users', () => m.upsert({ message: { name: 'n', data: { allowed_mentions: { users: fill(150, 'x') } } } } as never));
    await call('user.updatePreferences, message with 50 invalid embeds', () => u.updatePreferences({ message: { data: { embeds: fill(50, { title: 1 }) } } } as never));
    await call('user.updatePreferences, 50 non-string recent ids', () => u.updatePreferences({ recentMessageIds: fill(50, 1) } as never));
    await call('user.updatePreferences, 50 string recent ids (accepted at base: reaches authorizeUser)', () => u.updatePreferences({ recentMessageIds: fill(50, '1') }));
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
  });
});
