// QA differential instrument (chain 018, M1-b / M1-c). Copied into an isolated export of each tree and run
// there: it parses one fixed input set through the real input schemas of the two save procedures and writes
// {label: {success, issues[{code, path, maximum}]}} as JSON to $PROBE_OUT. compare.py diffs two such files.
// The input set is fixed here and does not read any bound from the tree under test.
import { writeFileSync } from 'node:fs';

import { describe, it, vi } from 'vitest';

import messageRouter from '../message';
import userRouter from '../user';

import type { z } from 'zod';

vi.mock('~/env.mjs', () => ({ env: new Proxy({}, { get: (_, key) => `test-${String(key)}` }) }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: vi.fn(), getHydratedServerAuthSession: vi.fn() }));
vi.mock('project-utils', () => ({ getPostgres: () => ({}) }));
vi.mock('pusher', () => ({ default: class { trigger = vi.fn(); } }));
vi.mock('@vercel/functions', () => ({ waitUntil: () => undefined }));
vi.mock('~/utils/redis', () => ({ default: {} }));
vi.mock('~/utils/redis/messageStore', () => ({ default: {} }));

type Procs = Record<string, { _def: { inputs: z.ZodTypeAny[] } }>;
const upsertInput = (messageRouter._def.procedures as unknown as Procs).upsert._def.inputs[0];
const prefsInput = (userRouter._def.procedures as unknown as Procs).updatePreferences._def.inputs[0];

const ID = '123456789012345678';
const text = { type: 10, content: 'x' };
const accessory = { type: 11, media: { url: 'https://a.b' } };
// [site, bound at the plan (literal, from the plan's M1 table), wrap(list) -> message data, {kind: element}]
const SITES: [string, number, (l: unknown[]) => unknown, Record<string, unknown>][] = [
  ['S1', 5, (l) => ({ components: [{ type: 1, components: l }] }), { valid: { type: 2, style: 5, url: 'https://a.b' }, invalid: { type: 2, style: 5, url: 'bad' } }],
  ['S2', 3, (l) => ({ components: [{ type: 9, components: l, accessory }] }), { valid: text, invalid: { type: 10, content: 1 } }],
  ['S3', 10, (l) => ({ components: [{ type: 12, items: l }] }), { valid: { media: { url: 'https://a.b' } }, invalid: { media: { url: 'bad' } } }],
  ['S4', 40, (l) => ({ components: [{ type: 17, components: l }] }), { valid: text, invalid: { type: 10, content: 1 } }],
  ['S5', 25, (l) => ({ embeds: [{ fields: l }] }), { valid: { name: 'a', value: 'b' }, invalid: { name: 1, value: 'b' } }],
  ['S6', 3, (l) => ({ allowed_mentions: { parse: l } }), { valid: 'user', invalid: 'bogus' }],
  ['S7', 100, (l) => ({ allowed_mentions: { users: l } }), { valid: ID, invalid: 'x' }],
  ['S8', 100, (l) => ({ allowed_mentions: { roles: l } }), { valid: ID, invalid: 'x' }],
  ['S9', 10, (l) => ({ embeds: l }), { valid: { title: 't' }, invalid: { title: 1 } }],
  ['S10', 40, (l) => ({ components: l }), { valid: text, invalid: { type: 10, content: 1 } }],
];
const KINDS = ['valid', 'invalid', 'null', 'number', 'mixed'] as const;
const elementsFor = (n: number, kind: typeof KINDS[number], els: Record<string, unknown>) => Array.from({ length: n }, (_, i) => {
  if (kind === 'null') return null;
  if (kind === 'number') return 7;
  if (kind === 'mixed') return i === n - 1 ? els.invalid : els.valid;
  return els[kind];
});
const lengths = (bound: number) => [0, 1, bound - 1, bound, bound + 1, bound + 10];

function record(schema: z.ZodTypeAny, input: unknown) {
  try {
    const r = schema.safeParse(input);
    if (r.success) return { success: true, issues: [] };
    return {
      success: false,
      issues: r.error.issues.map((i) => ({ code: i.code, path: i.path, maximum: (i as { maximum?: unknown }).maximum })),
    };
  } catch (e) {
    return { success: false, threw: `${(e as Error).constructor.name}: ${(e as Error).message}`, issues: [] };
  }
}

describe('save-list differential input set', () => {
  it('writes the issue lists', () => {
    const result: Record<string, unknown> = {};
    for (const [site, bound, wrap, els] of SITES) {
      for (const n of lengths(bound)) {
        for (const kind of KINDS) {
          const data = wrap(elementsFor(n, kind, els));
          result[`upsert ${site} n=${n} ${kind}`] = record(upsertInput, { message: { name: 'n', data } });
          result[`updatePreferences ${site} n=${n} ${kind}`] = record(prefsInput, { message: { data } });
        }
      }
    }
    for (const n of lengths(11)) {
      for (const kind of ['string', 'number', 'null'] as const) {
        const list = Array.from({ length: n }, () => (kind === 'string' ? '1' : kind === 'number' ? 7 : null));
        result[`updatePreferences S11 n=${n} ${kind}`] = record(prefsInput, { recentMessageIds: list });
      }
    }
    writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(result, null, 1));
  });
});
