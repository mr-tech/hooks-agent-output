// Probe, not a spec: the issue arrays of the three isolated unions over a class of failing inputs, to show where `invalid_union` sits.
// Copy to src/server/api/utils/__tests__/ of an export or the tree, run with PROBE_OUT=<file>, then remove the copy.
import { writeFileSync } from 'node:fs';

import { expect, it, vi } from 'vitest';

import { discordMessageShape } from '../shapes';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const T = { type: 10, content: 'x' };
const accessories: unknown[] = [undefined, null, 5, 'a', {}, { type: 99 }, { type: 11 }, { type: 11, media: { url: 'nope' } }, { type: 11, media: {} },
  { type: 2 }, { type: 2, style: 5 }, { type: 2, style: 5, url: 'nope' }, { type: 2, style: 1, url: 'https://a.b' }, { type: 2, style: 5, url: 'https://a.b', label: 5 },
  { type: 11, media: { url: 'https://a.b' }, description: 5 }, { type: 11, media: { url: 'https://a.b' }, spoiler: 'x' }, { type: 2, style: 5, url: 'https://a.b', emoji: 5 }];
const spacings: unknown[] = [undefined, null, 0, 1, 2, 3, '1', {}, []];
const parses: unknown[] = [undefined, null, 'user', 'nope', 5, {}, 'here', 'everyone', 'users'];

it('records where invalid_union sits', () => {
  const rows: string[] = [];
  const record = (site: string, data: unknown, input: unknown) => {
    const r = discordMessageShape.safeParse(data);
    const issues = r.success ? [] : r.error.issues;
    const positions = issues.map((i, k) => (i.code === 'invalid_union' ? k : -1)).filter((k) => k >= 0);
    rows.push(JSON.stringify({ site, input, codes: issues.map((i) => i.code), invalidUnionAt: positions }));
  };
  accessories.forEach((a) => record('accessory', { components: [{ type: 9, components: [T], accessory: a }] }, a));
  spacings.forEach((s) => record('spacing', { components: [{ type: 14, divider: true, spacing: s }] }, s));
  parses.forEach((p) => record('parse', { allowed_mentions: { parse: [p] } }, p));
  writeFileSync(process.env.PROBE_OUT as string, `${rows.join('\n')}\n`);
  const bad = rows.map((r) => JSON.parse(r) as { invalidUnionAt: number[]; codes: string[] }).filter((r) => r.invalidUnionAt.some((k) => k !== 0) || (r.invalidUnionAt.length > 0 && r.codes.length > 1));
  expect(bad).toEqual([]);
});
