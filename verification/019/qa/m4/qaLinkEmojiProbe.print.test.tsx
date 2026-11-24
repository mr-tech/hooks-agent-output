// QA probe (not a suite file): placed at src/utils/markdown/__tests__/ in an export of e58f2ed, run, removed.
// AC-4.2's class: every link form x an emoji before, inside and after, on the content preview. For each input, every
// rendered anchor's href and text must hold no `:name:` short code that the source does not hold, and no `:slight_smile`.
// Positive control on the same run: the same reader over a fixture string that does hold `:slight_smile:` in an href.
import { writeFileSync } from 'node:fs';

import { beforeAll, expect, it, vi } from 'vitest';

import { startEngine } from '../engine';
import { previewParser } from '../preview';

import type { ReactNode } from 'react';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

beforeAll(async () => { await startEngine(); });

const EMOJI = ['🙂', '👍🏽', '👨‍👩‍👧', '🇬🇧', '1️⃣', '<:smile:123456789012345678>', ':slight_smile:'];
const URLS = (e: string) => [`https://x.y/${e}`, `https://x.y${e}`, `https://x.y/a${e}b`, `https://x.y/?q=${e}`, 'https://x.y/a'];
const FORMS: Array<[string, (u: string, e: string) => string]> = [
  ['bare', (u) => u],
  ['angle', (u) => `<${u}>`],
  ['masked', (u) => `[a](${u})`],
  ['masked, emoji label', (u, e) => `[${e}](${u})`],
  ['masked, emoji inside label', (u, e) => `[a${e}b](${u})`],
  ['masked, url label', (u) => `[${u}](${u})`],
];
const PLACES: Array<[string, (l: string, e: string) => string]> = [
  ['before', (l, e) => `${e}${l}`], ['before, spaced', (l, e) => `${e} ${l}`],
  ['inside', (l) => l], ['after', (l, e) => `${l}${e}`], ['after, spaced', (l, e) => `${l} ${e}`],
];

const SHORT = /:[a-z0-9_+-]{2,}:/gi;
const offending = (source: string, s: string) => (s.match(SHORT) ?? []).filter((m) => !source.includes(m))
  .concat(/:slight_smile/.test(s) && !source.includes(':slight_smile') ? [':slight_smile'] : []);

function anchors(source: string) {
  const el = mountDom(<>{previewParser('content')(source, { mounted: false, isEmbed: false }) as ReactNode}</>);
  try {
    return [...el.querySelectorAll('a')].map((a) => ({ href: a.getAttribute('href') ?? '', text: a.textContent ?? '' }));
  } finally { unmountDom(); }
}

it('prints the class and every offending anchor', () => {
  const rows: Array<{ input: string; anchors: number; bad: string[] }> = [];
  EMOJI.forEach((e) => FORMS.forEach(([, form]) => URLS(e).forEach((u) => PLACES.forEach(([, place]) => {
    const input = place(form(u, e), e);
    const as = anchors(input);
    const bad = as.flatMap((a) => offending(input, a.href).map((m) => `href ${m}`).concat(offending(input, a.text).map((m) => `text ${m}`)));
    rows.push({ input, anchors: as.length, bad });
  }))));
  const control = offending('x', 'https://x.y/:slight_smile:');
  const out = {
    inputs: rows.length,
    withAnchor: rows.filter((r) => r.anchors > 0).length,
    offending: rows.filter((r) => r.bad.length > 0),
    positiveControl: control,
  };
  writeFileSync(process.env.QA_PROBE_OUT as string, `${JSON.stringify(out, null, 1)}\n`);
  expect(control.length).toBeGreaterThan(0);
});
