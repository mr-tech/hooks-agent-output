// QA Phase 1 probe (chain 018, plan rev 3 M1-i "no huge error"), isolated export of website 7923a1d. Does a single zod issue
// carry the received input value into the refusal message the client receives? Sent through the real message.upsert caller.
import { writeFileSync } from 'node:fs';

import { describe, it, vi } from 'vitest';

import messageRouter from '../message';

vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: vi.fn(), getHydratedServerAuthSession: vi.fn() }));
vi.mock('project-utils', () => ({ getPostgres: () => ({}) }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const ctx = { session: { user: { id: '100000000000000001', guilds: [] }, expires: 'never' }, req: {}, database: {} } as never;
const BIG = 'x'.repeat(100_000);

async function measure(label: string, data: unknown, out: string[]) {
  try {
    await messageRouter.createCaller(ctx).upsert({ message: { name: 'n', data } } as never);
    out.push(`${label} | resolved`);
  } catch (e) {
    const err = e as { code?: string, message: string };
    let issues: unknown[] = [];
    try { issues = JSON.parse(err.message) as unknown[]; } catch { /* not JSON */ }
    out.push(`${label} | ${err.code} | top-level issues ${issues.length} | message chars ${err.message.length} | input string chars ${BIG.length} | carries the input: ${err.message.includes(BIG)}`);
  }
}

describe('one issue, size of the refusal message', () => {
  it('reports', async () => {
    const out: string[] = [];
    await measure('S6 parse: one 100,000-char element (union of literals)', { allowed_mentions: { parse: [BIG] } }, out);
    await measure('S6 parse: three 100,000-char elements (at the bound)', { allowed_mentions: { parse: [BIG, BIG, BIG] } }, out);
    await measure('S10: one component with a 100,000-char type string (discriminated union)', { components: [{ type: BIG }] }, out);
    await measure('control, S7 users: one 100,000-char id (regex)', { allowed_mentions: { users: [BIG] } }, out);
    const btn = { type: 2, style: 5, url: 'https://a.b' };
    await measure('S1 element: link button style = long string (literal)', { components: [{ type: 1, components: [{ ...btn, style: BIG }] }] }, out);
    await measure('S1 element: link button type = long string (literal, not a discriminator)', { components: [{ type: 1, components: [{ ...btn, type: BIG }] }] }, out);
    await measure('section accessory: type = long string (union of two shapes)', { components: [{ type: 9, components: [{ type: 10, content: 'x' }], accessory: { type: BIG } }] }, out);
    await measure('separator spacing = long string (union of two literals)', { components: [{ type: 14, divider: true, spacing: BIG }] }, out);
    // Plan rev 4 enumeration: textDisplayShape.type is a discriminator inside the two discriminated unions, but sectionShape.components
    // is a plain z.array(textDisplayShape), so there it is an ordinary literal.
    const acc = { type: 11, media: { url: 'https://a.b' } };
    await measure('section child: text display type = long string (literal outside a discriminated union)', { components: [{ type: 9, components: [{ type: BIG, content: 'x' }], accessory: acc }] }, out);
    await measure('control, container child: text display type = long string (discriminator)', { components: [{ type: 17, components: [{ type: BIG, content: 'x' }] }] }, out);
    await measure('thumbnail accessory: type = long string inside the union', { components: [{ type: 9, components: [{ type: 10, content: 'x' }], accessory: { ...acc, type: BIG } }] }, out);
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
  });
});
