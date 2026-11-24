import { writeFileSync } from 'node:fs';

import { beforeAll, expect, it, vi } from 'vitest';

import { startEngine } from '../engine';

import { drawnDom } from './helpers/previewDom';
import { visibleFromDom } from './helpers/visibleForm';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

beforeAll(async () => { await startEngine(); });

it('reports what the visible form reads from a drawn inline code span', () => {
  const out = {
    code: visibleFromDom(drawnDom('embedDescription', '`a`')),
    mixed: visibleFromDom(drawnDom('embedDescription', 'x `ab` y')),
    controlBold: visibleFromDom(drawnDom('embedDescription', '**a**')),
  };
  writeFileSync(process.env.QA_OUT as string, JSON.stringify(out, null, 1));
  expect(out.controlBold).not.toEqual([]);
});
