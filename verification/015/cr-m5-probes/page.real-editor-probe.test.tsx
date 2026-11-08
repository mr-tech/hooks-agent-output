import { appendFileSync } from 'node:fs';
import { act } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import Page from '../page';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

const hoisted = vi.hoisted(() => ({ params: new URLSearchParams() }));

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('next/navigation', () => ({ useSearchParams: () => hoisted.params }));

afterEach(unmountDom);

async function outcome(data: string) {
  hoisted.params = new URLSearchParams({ data });
  try {
    const el = mountDom(<Page />);
    for (let i = 0; i < 20; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await act(async () => { await new Promise((r) => { setTimeout(r, 25); }); });
    }
    if (el.textContent?.includes('Invalid message data.')) return 'text:Invalid message data.';
    return `rendered:${el.querySelectorAll('*').length} nodes, text=${JSON.stringify((el.textContent ?? '').slice(0, 40))}`;
  } catch (e) {
    return `THREW:${(e as Error).message}`;
  }
}

describe('preview page, the real editor, members that pass makeEditable', () => {
  it.each([
    ['positive control', '{"content":"hello"}', 'rendered'],
    ['refused control', 'null', 'text:Invalid message data.'],
    ['top-level component null', '{"components":[null]}', '?'],
    ['type-17 direct child null', '{"components":[{"type":17,"components":[null]}]}', '?'],
    ['embeds empty string', '{"embeds":""}', '?'],
    ['embed element an array', '{"embeds":[[]]}', '?'],
    ['fields empty string', '{"embeds":[{"title":"t","fields":""}]}', '?'],
    ['field element an array', '{"embeds":[{"title":"t","fields":[[]]}]}', '?'],
    ['type-1 child an array', '{"components":[{"type":1,"components":[[]]}]}', '?'],
  ])('%s', async (_case, data, expected) => {
    const got = await outcome(data);
    appendFileSync(process.env.EDGE_OUT ?? '/dev/null', `REAL ${JSON.stringify(data)} -> ${got}\n`);
    if (expected !== '?') expect(got.startsWith(expected)).toBe(true);
  });
});
