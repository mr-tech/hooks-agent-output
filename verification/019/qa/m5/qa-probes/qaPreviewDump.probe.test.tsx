import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';

import {
  beforeAll, expect, it, vi,
} from 'vitest';

import { startEngine, SURFACE_MASKS, type Surface } from '../engine';
import { previewParser } from '../preview';

import { CORPUS, LINK_INPUTS } from './helpers/discordInputs';
import { generateInputs } from './helpers/markdownGenerator';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

beforeAll(async () => { await startEngine(); });

const INPUTS = [
  ...CORPUS.map((c) => ({ src: `corpus:${c.id}`, text: c.text })),
  ...LINK_INPUTS.map((text, i) => ({ src: `link:${i}`, text })),
  ...generateInputs(20261123, 2000).map((g, i) => ({ src: `gen:${i}`, text: g.text })),
  { src: 'control:bold', text: '**a**' },
];

it('dumps the preview DOM of every surface and input', () => {
  const rows: Record<string, string> = {};
  let nonEmpty = 0;
  for (const surface of Object.keys(SURFACE_MASKS) as Surface[]) {
    for (const input of INPUTS) {
      const el = mountDom(<>{previewParser(surface)(input.text, { mounted: false, isEmbed: false })}</>);
      const html = el.innerHTML;
      unmountDom();
      if (html.length) nonEmpty += 1;
      rows[`${surface}|${input.src}`] = createHash('sha256').update(html).digest('hex');
      if (input.src === 'control:bold') rows[`${surface}|control:bold:html`] = html;
    }
  }
  writeFileSync(process.env.QA_OUT as string, JSON.stringify({ nonEmpty, rows }, null, 1));
  expect(nonEmpty).toBeGreaterThan(0);
}, 600000);
