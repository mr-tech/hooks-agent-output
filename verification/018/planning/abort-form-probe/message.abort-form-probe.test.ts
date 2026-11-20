// Planning probe (chain 018): per site, per procedure, per element kind, what the save input records for a list
// at / over its bound. Not a suite case. Rows go to PROBE_OUT as `procedure|site|kind|length|result`.
import { writeFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { discordMessageImportShape } from '~/server/api/utils/shapes';

import messageRouter from '../message';
import userRouter from '../user';

vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: vi.fn(), getHydratedServerAuthSession: vi.fn() }));
vi.mock('project-utils', () => ({ getPostgres: () => { throw new Error('no database in probe'); } }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

type Procs = { _def: { procedures: Record<string, { _def: { inputs: z.ZodTypeAny[] } }> } };
const upsertInput = (messageRouter as unknown as Procs)._def.procedures.upsert._def.inputs[0];
const prefsInput = (userRouter as unknown as Procs)._def.procedures.updatePreferences._def.inputs[0];

const ID = '123456789012345678';
const link = (u: string) => ({ type: 2, style: 5, url: u });
const text = { type: 10, content: 'x' };
const fill = <T>(n: number, v: T) => Array.from({ length: n }, () => v);
const section = (n: number) => ({ type: 9, components: fill(n, text), accessory: { type: 11, media: { url: 'https://a.b' } } });

interface Site {
  name: string; bound: number; listPath: (string | number)[];
  build: (els: unknown[]) => Record<string, unknown>;
  valid: unknown; invalid: unknown; nested?: unknown;
}
const sites: Site[] = [
  { name: 'S1 actionRow.components', bound: 5, listPath: ['components', 0, 'components'], build: (e) => ({ components: [{ type: 1, components: e }] }), valid: link('https://a.b'), invalid: link('bad') },
  { name: 'S2 section.components', bound: 3, listPath: ['components', 0, 'components'], build: (e) => ({ components: [{ type: 9, components: e, accessory: { type: 11, media: { url: 'https://a.b' } } }] }), valid: text, invalid: { type: 10, content: 1 } },
  { name: 'S3 mediaGallery.items', bound: 10, listPath: ['components', 0, 'items'], build: (e) => ({ components: [{ type: 12, items: e }] }), valid: { media: { url: 'https://a.b' } }, invalid: { media: { url: 'bad' } } },
  { name: 'S4 container.components', bound: 40, listPath: ['components', 0, 'components'], build: (e) => ({ components: [{ type: 17, components: e }] }), valid: text, invalid: { type: 10, content: 1 }, nested: section(4) },
  { name: 'S5 embed.fields', bound: 25, listPath: ['embeds', 0, 'fields'], build: (e) => ({ embeds: [{ fields: e }] }), valid: { name: 'a', value: 'b' }, invalid: { name: 1, value: 'b' } },
  { name: 'S6 allowed_mentions.parse', bound: 3, listPath: ['allowed_mentions', 'parse'], build: (e) => ({ allowed_mentions: { parse: e } }), valid: 'user', invalid: 'bogus' },
  { name: 'S7 allowed_mentions.users', bound: 100, listPath: ['allowed_mentions', 'users'], build: (e) => ({ allowed_mentions: { users: e } }), valid: ID, invalid: 'x' },
  { name: 'S8 allowed_mentions.roles', bound: 100, listPath: ['allowed_mentions', 'roles'], build: (e) => ({ allowed_mentions: { roles: e } }), valid: ID, invalid: 'x' },
  { name: 'S9 embeds', bound: 10, listPath: ['embeds'], build: (e) => ({ embeds: e }), valid: { title: 't' }, invalid: { title: 1 }, nested: { fields: fill(26, { name: 'a', value: 'b' }) } },
  { name: 'S10 components', bound: 40, listPath: ['components'], build: (e) => ({ components: e }), valid: text, invalid: { type: 10, content: 1 }, nested: section(4) },
];

const out: string[] = [];
function run(schema: z.ZodTypeAny, input: unknown, prefix: (string | number)[], listPath: (string | number)[]) {
  try {
    const r = schema.safeParse(input);
    if (r.success) return 'ok, 0 issues';
    const full = [...prefix, ...listPath];
    const issues = r.error.issues;
    const codes = issues.reduce<Record<string, number>>((a, i) => ({ ...a, [i.code]: (a[i.code] ?? 0) + 1 }), {});
    const atList = issues.filter((i) => i.path.length === full.length && full.every((p, k) => i.path[k] === p)).length;
    const inner = issues.some((i) => i.path.length > full.length && full.every((p, k) => i.path[k] === p));
    const textIssue = issues.some((i) => i.message.startsWith('Components displayable text'));
    return `refused, issues=${issues.length} atList=${atList} codes=${JSON.stringify(codes)} innerPath=${inner} textIssue=${textIssue}`;
  } catch (e) {
    return `THREW ${(e as Error).constructor.name}`;
  }
}

describe('list bound probe', () => {
  it('records every site, procedure, kind and length', () => {
    for (const s of sites) {
      const kinds: [string, unknown][] = [['valid', s.valid], ['invalid', s.invalid], ['number', 1], ['null', null]];
      if (s.nested) kinds.push(['nested-over-bound', s.nested]);
      for (const [kind, el] of kinds) {
        for (const n of [s.bound, s.bound + 1, s.bound + 50]) {
          const data = s.build(fill(n, el));
          out.push(`message.upsert|${s.name}|${kind}|${n}|${run(upsertInput, { message: { name: 'n', data } }, ['message', 'data'], s.listPath)}`);
          out.push(`user.updatePreferences|${s.name}|${kind}|${n}|${run(prefsInput, { message: { data } }, ['message', 'data'], s.listPath)}`);
        }
      }
    }
    const idKinds: [string, unknown][] = [['valid', 'a'], ['invalid', 1], ['number', 1], ['null', null]];
    for (const [kind, el] of idKinds) {
      for (const n of [11, 12, 61]) {
        out.push(`user.updatePreferences|S11 recentMessageIds|${kind}|${n}|${run(prefsInput, { recentMessageIds: fill(n, el) }, [], ['recentMessageIds'])}`);
      }
    }
    // import shape, top-level components (inside its preprocess)
    for (const [kind, el] of [['valid', text], ['invalid', { type: 10, content: 1 }], ['number', 1], ['null', null], ['nested-over-bound', section(4)]] as [string, unknown][]) {
      for (const n of [40, 41, 90]) out.push(`import|S10i components|${kind}|${n}|${run(discordMessageImportShape, { components: fill(n, el) }, [], ['components'])}`);
    }
    // 41 text displays of 5000 chars at S10
    const big = fill(41, { type: 10, content: 'x'.repeat(5000) });
    out.push(`message.upsert|S10 41x5000|text-5000|41|${run(upsertInput, { message: { name: 'n', data: { components: big } } }, ['message', 'data'], ['components'])}`);
    out.push(`user.updatePreferences|S10 41x5000|text-5000|41|${run(prefsInput, { message: { data: { components: big } } }, ['message', 'data'], ['components'])}`);
    out.push(`import|S10i 41x5000|text-5000|41|${run(discordMessageImportShape, { components: big }, [], ['components'])}`);
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
    expect(out.length).toBeGreaterThan(0);
  });
});
