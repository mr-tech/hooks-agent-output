// QA differential instrument (chain 018, plan rev 4: M1-a, M1-b, M1-c, M1-i), version 3. Copied into an isolated export of each
// tree and run there. It sends one fixed input set through the two save procedures' tRPC callers (the route's own parse, whatever
// wraps it at the tip) and through the client import schema, and writes
// {label: {success, issues[{code, path, message}]}} as JSON to $PROBE_OUT; compare.py diffs two such files.
// "success" means the input passed the input stage: the procedure went on past validation (any error that is not a BAD_REQUEST
// carrying a JSON issue list). The input set is fixed here and reads no bound from the tree under test.
import { writeFileSync } from 'node:fs';

import { describe, it, vi } from 'vitest';

import { discordMessageImportShape } from '~/server/api/utils/shapes';

import messageRouter from '../message';
import userRouter from '../user';

vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: vi.fn(), getHydratedServerAuthSession: vi.fn() }));
vi.mock('project-utils', () => ({ getPostgres: () => { throw new Error('past the input stage'); } }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

const database = new Proxy({}, { get: () => { throw new Error('past the input stage'); } });
const ctx = { session: { user: { id: '100000000000000001', guilds: [] }, expires: 'never' }, req: {}, database } as never;
const upsert = messageRouter.createCaller(ctx);
const prefs = userRouter.createCaller(ctx);

type Issue = { code: string, path: (string | number)[], message: string };
type Rec = { success: boolean, issues: Issue[], threw?: string };
const reduce = (issues: Issue[]) => issues.map(({ code, path, message }) => ({ code, path, message }));

async function viaCaller(fn: () => Promise<unknown>): Promise<Rec> {
  try {
    await fn();
    return { success: true, issues: [] };
  } catch (e) {
    const err = e as { code?: string, message: string };
    if (err.code === 'BAD_REQUEST') {
      try {
        const parsed = JSON.parse(err.message) as Issue[];
        if (Array.isArray(parsed)) return { success: false, issues: reduce(parsed) };
      } catch { /* not a JSON issue list */ }
      return { success: false, issues: [], threw: `BAD_REQUEST without an issue list: ${err.message.slice(0, 200)}` };
    }
    if (err.code === 'INTERNAL_SERVER_ERROR' && /past the input stage/.test(err.message)) {
      return { success: true, issues: [] };
    }
    return { success: false, issues: [], threw: `${err.code ?? 'no code'}: ${err.message.slice(0, 200)}` };
  }
}
function viaImport(data: unknown): Rec {
  try {
    const r = discordMessageImportShape.safeParse(data);
    return r.success ? { success: true, issues: [] } : { success: false, issues: reduce(r.error.issues as Issue[]) };
  } catch (e) {
    return { success: false, issues: [], threw: `${(e as Error).constructor.name}: ${(e as Error).message}` };
  }
}

const ID = '123456789012345678';
const text = { type: 10, content: 'x' };
const accessory = { type: 11, media: { url: 'https://a.b' } };
const button = { type: 2, style: 5, url: 'https://a.b' };
const overRow = { type: 1, components: Array.from({ length: 6 }, () => button) };
const overEmbed = { fields: Array.from({ length: 26 }, () => ({ name: 'a', value: 'b' })) };
// [site, bound (a literal from the plan's M1 table), wrap(list) -> message data, {kind: element}]
const SITES: [string, number, (l: unknown[]) => unknown, Record<string, unknown>][] = [
  ['S1', 5, (l) => ({ components: [{ type: 1, components: l }] }), { valid: button, invalid: { ...button, url: 'bad' } }],
  ['S2', 3, (l) => ({ components: [{ type: 9, components: l, accessory }] }), { valid: text, invalid: { type: 10, content: 1 } }],
  ['S3', 10, (l) => ({ components: [{ type: 12, items: l }] }), { valid: { media: { url: 'https://a.b' } }, invalid: { media: { url: 'bad' } } }],
  ['S4', 40, (l) => ({ components: [{ type: 17, components: l }] }), { valid: text, invalid: { type: 10, content: 1 }, nested: overRow }],
  ['S5', 25, (l) => ({ embeds: [{ fields: l }] }), { valid: { name: 'a', value: 'b' }, invalid: { name: 1, value: 'b' } }],
  ['S6', 3, (l) => ({ allowed_mentions: { parse: l } }), { valid: 'user', invalid: 'bogus' }],
  ['S7', 100, (l) => ({ allowed_mentions: { users: l } }), { valid: ID, invalid: 'x' }],
  ['S8', 100, (l) => ({ allowed_mentions: { roles: l } }), { valid: ID, invalid: 'x' }],
  ['S9', 10, (l) => ({ embeds: l }), { valid: { title: 't' }, invalid: { title: 1 }, nested: overEmbed }],
  ['S10', 40, (l) => ({ components: l }), { valid: text, invalid: { type: 10, content: 1 }, nested: overRow }],
  // The plain-union sites (plan rev 4 M1-b): n top-level components whose union fails, alone and mixed; always within S10's bound.
  ['UA', 40, (l) => ({ components: l }), {
    valid: { type: 9, components: [text], accessory }, invalid: { type: 9, components: [text], accessory: { type: 11 } },
  }],
  ['US', 40, (l) => ({ components: l }), {
    valid: { type: 14, divider: true, spacing: 1 }, invalid: { type: 14, divider: true, spacing: 3 },
  }],
];
const KINDS = ['valid', 'invalid', 'null', 'number', 'mixed', 'nested'] as const;
const elementsFor = (n: number, kind: typeof KINDS[number], els: Record<string, unknown>) => Array.from({ length: n }, (_, i) => {
  if (kind === 'null') return null;
  if (kind === 'number') return 7;
  if (kind === 'mixed') return i % 2 === 1 ? els.invalid : els.valid;
  return els[kind];
});
const lengths = (site: string, bound: number) => (site.startsWith('U')
  ? [1, 6, 20, 21, 40]
  : [0, 1, bound - 1, bound, bound + 1, bound + 10, bound + 50]);
const kindsFor = (site: string, els: Record<string, unknown>) => KINDS.filter((k) => (
  site.startsWith('U') ? ['valid', 'invalid', 'mixed'].includes(k) : (k in els || ['null', 'number', 'mixed'].includes(k))
));

describe('save-list differential input set', () => {
  it('writes the issue lists', async () => {
    const result: Record<string, Rec> = {};
    for (const [site, bound, wrap, els] of SITES) {
      for (const n of lengths(site, bound)) {
        for (const kind of kindsFor(site, els)) {
          const data = wrap(elementsFor(n, kind, els));
          result[`upsert ${site} n=${n} ${kind}`] = await viaCaller(() => upsert.upsert({ message: { name: 'n', data } } as never));
          result[`updatePreferences ${site} n=${n} ${kind}`] = await viaCaller(() => prefs.updatePreferences({ message: { data } } as never));
          result[`import ${site} n=${n} ${kind}`] = viaImport(data);
        }
      }
    }
    for (const n of lengths('S11', 11)) {
      for (const kind of ['string', 'number', 'null'] as const) {
        const list = Array.from({ length: n }, () => (kind === 'string' ? '1' : kind === 'number' ? 7 : null));
        result[`updatePreferences S11 n=${n} ${kind}`] = await viaCaller(() => prefs.updatePreferences({ recentMessageIds: list } as never));
      }
    }
    writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(result, null, 1));
  });
});
