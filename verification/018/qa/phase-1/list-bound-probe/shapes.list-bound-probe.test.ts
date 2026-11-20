// QA Phase 1 probe (chain 018), run in an isolated export of website 7923a1d. Not a suite case: it prints
// what the base save schema records for over-bound lists, and what the plan's candidate cap form (OQ-3's
// "list of unknowns with the limit, piped to the element schema") does once the message-level superRefine
// runs over elements the pipe did not validate.
import { writeFileSync } from 'node:fs';

import { describe, it, vi } from 'vitest';
import { z } from 'zod';

import {
  discordMessageImportShape, discordMessageShape, optionalIdMessageShape,
} from '~/server/api/utils/shapes';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));
vi.mock('~/server/auth', () => ({ getServerAuthSession: () => null, authOptions: {} }));
vi.mock('project-utils', () => ({ getPostgres: () => ({}) }));
vi.mock('~/utils/redis', () => ({ default: {} }));

const ID = '123456789012345678';
const out: string[] = [];
function report(label: string, schema: z.ZodTypeAny, input: unknown) {
  let line: string;
  try {
    const r = schema.safeParse(input);
    if (r.success) line = 'success, 0 issues';
    else {
      const codes = r.error.issues.reduce<Record<string, number>>((a, i) => ({ ...a, [i.code]: (a[i.code] ?? 0) + 1 }), {});
      const first = r.error.issues[0];
      line = `refused, ${r.error.issues.length} issues ${JSON.stringify(codes)} first=${JSON.stringify({ code: first.code, maximum: (first as { maximum?: unknown }).maximum, path: first.path })}`;
    }
  } catch (e) {
    line = `THREW ${(e as Error).constructor.name}: ${(e as Error).message}`;
  }
  out.push(`${label} | ${line}`);
}
const msg = (data: unknown) => ({ name: 'n', data });
const text = { type: 10, content: 'x' };
const fill = <T>(n: number, v: T) => Array.from({ length: n }, () => v);

describe('base 7923a1d', () => {
  it('per site, over the bound', () => {
    const sites: [string, number, (els: unknown[]) => unknown, unknown, unknown][] = [
      ['S1 actionRow.components', 5, (e) => ({ components: [{ type: 1, components: e }] }), { type: 2, style: 5, url: 'https://a.b' }, { type: 2, style: 5, url: 'bad' }],
      ['S2 section.components', 3, (e) => ({ components: [{ type: 9, components: e, accessory: { type: 11, media: { url: 'https://a.b' } } }] }), text, { type: 10, content: 1 }],
      ['S3 mediaGallery.items', 10, (e) => ({ components: [{ type: 12, items: e }] }), { media: { url: 'https://a.b' } }, { media: { url: 'bad' } }],
      ['S4 container.components', 40, (e) => ({ components: [{ type: 17, components: e }] }), text, { type: 10, content: 1 }],
      ['S5 embed.fields', 25, (e) => ({ embeds: [{ fields: e }] }), { name: 'a', value: 'b' }, { name: 1, value: 'b' }],
      ['S6 allowed_mentions.parse', 3, (e) => ({ allowed_mentions: { parse: e } }), 'users', 'bogus'],
      ['S7 allowed_mentions.users', 100, (e) => ({ allowed_mentions: { users: e } }), ID, 'x'],
      ['S8 allowed_mentions.roles', 100, (e) => ({ allowed_mentions: { roles: e } }), ID, 'x'],
      ['S9 embeds', 10, (e) => ({ embeds: e }), { title: 't' }, { title: 1 }],
      ['S10 components', 40, (e) => ({ components: e }), text, { type: 10, content: 1 }],
    ];
    for (const [name, bound, build, valid, invalid] of sites) {
      const n = bound + 10;
      report(`${name} bound ${bound}, ${n} valid`, optionalIdMessageShape, msg(build(fill(n, valid))));
      report(`${name} bound ${bound}, ${n} invalid`, optionalIdMessageShape, msg(build(fill(n, invalid))));
      report(`${name} bound ${bound}, ${n} null`, optionalIdMessageShape, msg(build(fill(n, null))));
    }
    report('S7 client import shape, 150 invalid users', discordMessageImportShape, { allowed_mentions: { users: fill(150, 'x') } });
    report('S9 client import shape, 50 invalid embeds', discordMessageImportShape, { embeds: fill(50, { title: 1 }) });
  });
});

describe('candidate cap form (unknown-max-pipe) under the message-level superRefine', () => {
  const pipe = (n: number, el: z.ZodTypeAny) => z.array(z.unknown()).max(n).pipe(z.array(el));
  // The real base object and the real refinement function, read off the exported ZodEffects.
  const base = (discordMessageShape as unknown as z.ZodEffects<z.AnyZodObject>)._def.schema;
  const refinement = ((discordMessageShape as unknown as z.ZodEffects<z.AnyZodObject>)._def.effect as { refinement: (d: unknown, c: z.RefinementCtx) => void }).refinement;
  const topLevel = (base.shape.components as z.ZodOptional<z.ZodArray<z.ZodTypeAny>>).unwrap().element;
  const candidate = base.extend({ components: pipe(40, topLevel).optional() }).superRefine(refinement);
  it('S10 under the pipe', () => {
    report('pipe S10, 50 valid', candidate, { components: fill(50, text) });
    report('pipe S10, 50 invalid', candidate, { components: fill(50, { type: 10, content: 1 }) });
    report('pipe S10, 50 null', candidate, { components: fill(50, null) });
    report('pipe S10, 50 with one null', candidate, { components: [...fill(49, text), null] });
    report('pipe S10, 50 strings', candidate, { components: fill(50, 'x') });
    report('pipe S10, 50 containers each with a null child', candidate, { components: fill(50, { type: 17, components: [null] }) });
    report('pipe S10, 41 sections with null children', candidate, { components: fill(41, { type: 9, components: [null] }) });
    report('pipe S10, within bound, one null', candidate, { components: [text, null] });
  });
  it('report', () => {
    writeFileSync(process.env.PROBE_OUT as string, `${out.join('\n')}\n`);
  });
});
