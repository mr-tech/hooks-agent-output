// Planning probe (chain 018, F-17): over the real save inputs at 7923a1d, with the three plain-union sites failing,
// issues in the result (k) against issues created (error-map calls, c), and what a stop on the 21st created issue returns.
import { writeFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { z, ZodError } from 'zod';
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
const upsert = (messageRouter as unknown as Procs)._def.procedures.upsert._def.inputs[0];
const prefs = (userRouter as unknown as Procs)._def.procedures.updatePreferences._def.inputs[0];
const fill = <T>(n: number, v: T) => Array.from({ length: n }, () => v);
const text = { type: 10, content: 'x' };
const badAccWhole = { type: 9, components: [text], accessory: { type: 99 } };
const badAccThumbUrl = { type: 9, components: [text], accessory: { type: 11, media: { url: 'bad' } } };
const badSpacing = { type: 14, divider: true, spacing: 3 };
const MAX = 20;
const STOP = Symbol('stop');
const key = (i: z.ZodIssue) => `${i.code}@${i.path.join('.')}:${i.message}`;
function measure(schema: z.ZodTypeAny, input: unknown) {
  const base = schema.safeParse(input);
  const k = base.success ? 0 : base.error.issues.length;
  let c = 0;
  schema.safeParse(input, { errorMap: (_i, ctx) => { c += 1; return { message: ctx.defaultError }; } });
  // the architect's wrapper form (AF-8 run): keep created issues, stop on the 21st
  const seen: z.ZodIssue[] = [];
  let capped: z.ZodIssue[];
  try {
    const r = schema.safeParse(input, { errorMap: (i, ctx) => { seen.push({ ...i, message: i.message ?? ctx.defaultError } as z.ZodIssue); if (seen.length > MAX) throw STOP; return { message: ctx.defaultError }; } });
    capped = r.success ? [] : r.error.issues;
  } catch (e) {
    if (e !== STOP) throw e;
    capped = [...seen.slice(0, MAX), { code: 'custom', path: [], message: `stopped after ${MAX}` } as z.ZodIssue];
  }
  const baseIssues = base.success ? [] : base.error.issues;
  const m = Math.min(k, MAX);
  const prefixEq = baseIssues.slice(0, m).map(key).join('|') === capped.slice(0, m).map(key).join('|');
  const notInBase = capped.filter((i) => i.path.length > 0 && !baseIssues.some((b) => key(b) === key(i))).length;
  return { k, c, returned: capped.length, prefixEq, notInBase, sample: capped.slice(0, 6).map(key), all: baseIssues.map(key), capped: capped.map(key) };
}
describe('union cap probe', () => {
  it('records k, c and the capped refusal per union site', () => {
    const out: string[] = []; const full: string[] = []; const cap: string[] = [];
    const cases: [string, (n: number) => unknown][] = [
      ['accessory-all-branches-fail', (n) => ({ components: fill(n, badAccWhole) })],
      ['accessory-thumbnail-bad-url', (n) => ({ components: fill(n, badAccThumbUrl) })],
      ['separator-spacing', (n) => ({ components: fill(n, badSpacing) })],
      ['allowed_mentions-parse', (n) => ({ allowed_mentions: { parse: fill(n, 'bogus') } })],
      ['mixed-n-each', (n) => ({ components: [...fill(n, badAccWhole), ...fill(n, badSpacing)], allowed_mentions: { parse: fill(Math.min(n, 3), 'bogus') } })],
    ];
    for (const [name, build] of cases) for (const n of [1, 3, 6, 10, 20]) {
      const data = build(n);
      for (const [proc, schema, input] of [['message.upsert', upsert, { message: { name: 'n', data } }], ['user.updatePreferences', prefs, { message: { data } }]] as const) {
        const r = measure(schema, input);
        out.push(`${proc}|${name}|n=${n}|k=${r.k}|c=${r.c}|returned=${r.returned}|firstMinK20Equal=${r.prefixEq}|returnedNotInBase=${r.notInBase}|first6=${JSON.stringify(r.sample)}`);
        full.push(`${proc}|${name}|n=${n}|${JSON.stringify(r.all)}`); cap.push(`${proc}|${name}|n=${n}|${JSON.stringify(r.capped)}`);
      }
    }
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`); writeFileSync(`${process.env.PROBE_OUT}.issues`, `${full.join('\n')}\n`); writeFileSync(`${process.env.PROBE_OUT}.capped`, `${cap.join('\n')}\n`);
    expect(out.length).toBeGreaterThan(0);
  });
});
