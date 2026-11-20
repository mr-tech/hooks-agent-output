// Measurement, not a spec: steering's within-bound worst bodies through the real message.upsert procedure at the tip.
// Copy to src/server/api/routers/__tests__/ of an export or the tree, run with PROBE_OUT=<file>, then remove the copy.
import { writeFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import createCapturingDatabase from '../../utils/__tests__/helpers/capturingDatabase';
import messageRouter from '../message';

const mocks = vi.hoisted(() => ({ db: undefined as unknown }));
vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: vi.fn(), getHydratedServerAuthSession: vi.fn() }));
vi.mock('project-utils', () => ({ getPostgres: () => mocks.db }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const rep = (n: number, f: () => unknown) => Array.from({ length: n }, f);
const row = () => ({ type: 1, components: rep(5, () => ({})) });
const sec = () => ({ type: 9, components: rep(3, () => ({})), accessory: {} });
const gal = () => ({ type: 12, items: rep(10, () => ({})) });
const cont = (kids: () => unknown) => ({ type: 17, components: rep(40, kids) });
let mix = 0;
const mixed = () => [row, sec, gal][mix++ % 3]!();
const embeds = rep(10, () => ({ fields: rep(25, () => ({})) }));
const fat = () => ({ type: 2, style: 1, emoji: { id: 1, name: 1, animated: 1 }, url: 'x', disabled: 1 });
const fatRow = () => ({ type: 1, components: rep(5, fat) });
const shapes: Record<string, unknown> = {
  F_fat_buttons: { components: rep(40, () => cont(fatRow)) },
  G_fat_buttons_plus_embeds: { components: rep(40, () => cont(fatRow)), embeds },
  A_rows_only: { components: rep(40, () => cont(row)) },
  B_sections_only: { components: rep(40, () => cont(sec)) },
  C_galleries_only: { components: rep(40, () => cont(gal)) },
  D_mixed_plus_embeds: { components: rep(40, () => cont(mixed)), embeds },
  E_rows_plus_embeds: { components: rep(40, () => cont(row)), embeds },
};

describe('save cap measurement', () => {
  it('records issues, message length and time per body', async () => {
    const captured = createCapturingDatabase(() => []);
    mocks.db = captured.db;
    const caller = messageRouter.createCaller({ session: { user: { id: '100000000000000001', guilds: [] }, expires: 'never' }, req: {}, database: captured.db } as never);
    const out: string[] = [];
    for (const [shape, data] of Object.entries(shapes)) {
      const input = { message: { name: 'x', data } };
      const bodyBytes = JSON.stringify(input).length;
      const t0 = performance.now();
      try { await caller.upsert(input as never); out.push(`${shape} saved?`); } catch (error) {
        const ms = performance.now() - t0;
        const { message } = error as { message: string };
        out.push(JSON.stringify({ shape, bodyBytes, issues: (JSON.parse(message) as unknown[]).length, messageLen: message.length, parseAndRespondMs: +ms.toFixed(1), databaseQueries: captured.queries.length }));
      }
    }
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
    expect(out).toHaveLength(Object.keys(shapes).length);
  });
});
