/**
 * Probe CR2 -- is M1 fix round 1's `saveAsPayload` / `jsonModalSeed` extraction actually
 * behaviour-preserving?  (Code review MEDIUM-1, Preferred action.)
 *
 * The round argues the extraction is a pure move: the expressions that used to sit inline in
 * `SaveAsMenu.onSubmit` and `JsonModalBody`'s seed are now exported functions.  That argument
 * does not settle it and neither does the diff's file list, so both forms are EXECUTED over the
 * same corpus and every byte a caller could read is compared.
 *
 * Both sides are computed from the SAME tree under test:
 *   old  = the literal expression as it stood at `a4eb00d`, rebuilt here from the tree's own
 *          `stripKeys` -- the only ingredient it had.
 *   new  = the tree's exported `saveAsPayload` / `jsonModalSeed`.
 *
 * POSITIVE CONTROL: `mutantSaveAsPayload` must DIFFER from the old expression on at least one
 * corpus row.  Without it a green matrix cannot be distinguished from a comparison of two
 * references to the same function.
 *
 * Run:  PROBE_SRC=/path/to/tree/src npx vitest run --config <this dir>/vitest.config.ts
 */
import { writeFileSync } from 'node:fs';

import { describe, it, expect, afterAll, vi } from 'vitest';

// `~/utils` reaches `env.mjs` and two SVG assets transitively (EC-4 / F-QA9).
vi.mock('~/env.mjs', () => ({
  env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test', NEXT_PUBLIC_PUSHER_KEY: 'k', NEXT_PUBLIC_PUSHER_CLUSTER: 'c' },
}));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { stripKeys, saveAsPayload, jsonModalSeed } from '~/utils';

const V2 = 32768;

const CORPUS: { id: string; message: unknown }[] = [
  { id: 'E1 classic content', message: { data: { content: 'hello' } } },
  { id: 'E2 classic + username + avatar', message: { data: { content: 'c', username: 'Bot', avatar_url: 'https://example.com/a.png' } } },
  { id: 'E3 embeds with _keys', message: { data: { embeds: [{ _key: 'e', title: 'T', fields: [{ _key: 'f', name: 'n', value: 'v' }] }] } } },
  { id: 'E4 V2 container, flag present', message: { data: { flags: V2, components: [{ _key: 'a', type: 17, components: [{ _key: 'b', type: 10, content: 'body' }] }] } } },
  { id: 'E5 V2 components, flag ABSENT (stripKeys ORs it in)', message: { data: { components: [{ _key: 'a', type: 17, components: [{ _key: 'b', type: 10, content: 'body' }] }] } } },
  { id: 'E6 V2 + classic content (stripKeys deletes content)', message: { data: { flags: V2, content: 'dropped', embeds: [{ title: 'dropped' }], components: [{ type: 10, content: 'x' }] } } },
  { id: 'E7 action row only, no V2 type', message: { data: { content: 'c', components: [{ type: 1, components: [{ type: 2, style: 5, label: 'B', url: 'https://example.com/' }] }] } } },
  { id: 'E8 empty data object', message: { data: {} } },
  { id: 'E9 message with no data key', message: {} },
  { id: 'E10 non-V2 flag bits', message: { data: { content: 'c', flags: 4 | 4096 } } },
  { id: 'E11 media gallery + file + separator', message: { data: { flags: V2, components: [{ type: 12, items: [{ media: { url: 'https://example.com/i.png' } }] }, { type: 13, file: { url: 'https://example.com/f.txt' } }, { type: 14, divider: true, spacing: 1 }] } } },
  { id: 'E12 section with link-button accessory', message: { data: { flags: V2, components: [{ type: 9, components: [{ type: 10, content: 'x' }], accessory: { type: 2, style: 5, label: 'Go', url: 'https://example.com/' } }] } } },
];

/** The `SaveAsMenu.onSubmit` payload expression exactly as it stood at `a4eb00d`. */
const oldSaveAsExpression = (message: unknown) => (stripKeys(message as never) as { data: unknown }).data;

/** The `JsonModalBody` seed expression exactly as it stood at `a4eb00d`. */
const oldSeedExpression = (message: unknown) => JSON.stringify(
  (stripKeys((message ?? {}) as never) as { data: unknown }).data,
  null,
  2,
);

/** Positive control: a WRONG extraction, to prove the comparison can fail. */
const mutantSaveAsPayload = (message: unknown) => {
  const data = (stripKeys(message as never) as { data?: Record<string, unknown> }).data;
  if (!data) return data;
  const { components, ...rest } = data;
  void components;
  return rest;
};

const rows: string[] = [];

describe('CR2 -- saveAsPayload is byte-equivalent to the inline expression it replaced', () => {
  for (const c of CORPUS) {
    it(c.id, () => {
      const before = oldSaveAsExpression(c.message);
      const after = saveAsPayload(c.message as never);
      const equal = JSON.stringify(before) === JSON.stringify(after);
      rows.push(`SAVE-AS | ${c.id} | ${equal ? 'identical' : `DIVERGED ${JSON.stringify(before)} vs ${JSON.stringify(after)}`}`);
      expect(after).toStrictEqual(before);
      expect(JSON.stringify(after)).toBe(JSON.stringify(before));
    });
  }
});

describe('CR2 -- jsonModalSeed is byte-equivalent to the inline expression it replaced', () => {
  for (const c of [...CORPUS, { id: 'E13 message is null', message: null }, { id: 'E14 message is undefined', message: undefined }]) {
    it(c.id, () => {
      const before = oldSeedExpression(c.message);
      const after = jsonModalSeed(c.message as never);
      const equal = before === after;
      rows.push(`SEED    | ${c.id} | ${equal ? 'identical' : `DIVERGED ${String(before)} vs ${String(after)}`}${before === undefined ? '  [both are the VALUE undefined, typed `string` -- LOW-3, unchanged]' : ''}`);
      expect(after).toBe(before);
    });
  }
});

describe('CR2 -- positive control: a wrong extraction is detected', () => {
  it('a components-dropping saveAsPayload DIVERGES from the inline expression', () => {
    const withComponents = CORPUS.find((c) => c.id.startsWith('E4'))!;
    const before = oldSaveAsExpression(withComponents.message);
    const mutated = mutantSaveAsPayload(withComponents.message);
    rows.push(`CTRL    | mutant drops components | ${JSON.stringify(before) === JSON.stringify(mutated) ? 'IDENTICAL (control failed)' : 'diverged (as required)'}`);
    expect(JSON.stringify(mutated)).not.toBe(JSON.stringify(before));
  });
});

afterAll(() => {
  const matrix = `=== CR2 matrix (${process.env.PROBE_LABEL ?? 'tree'}) ===\n${rows.join('\n')}`;
  if (process.env.PROBE_OUT) writeFileSync(process.env.PROBE_OUT, `${matrix}\n`);
  console.log(`\n${matrix}`);
});
