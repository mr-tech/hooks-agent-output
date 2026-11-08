import { appendFileSync } from 'node:fs';
import { act } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import Page from '../page';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

// Critic probe (cycle 6 pass 1): same rig as verification/015/cr-m5-probes, but the REAL
// DiscordMessageEditor renders — only env, navigation and MarkdownProvider are substituted.
const hoisted = vi.hoisted(() => ({ params: new URLSearchParams() }));

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('next/navigation', () => ({ useSearchParams: () => hoisted.params }));
// MarkdownProvider is the real one: the editor needs its useMarkdown.

afterEach(unmountDom);

async function outcome(data: string) {
  hoisted.params = new URLSearchParams({ data });
  const errors: string[] = [];
  const spy = vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    errors.push(args.map(String).join(' ').slice(0, 160));
  });
  try {
    const el = mountDom(<Page />);
    await act(async () => {});
    for (let i = 0; i < 10; i += 1) {
      // let Suspense settle: ten 50 ms ticks
      // eslint-disable-next-line no-await-in-loop
      await act(async () => { await new Promise((r) => { setTimeout(r, 50); }); });
    }
    const text = el.textContent ?? '';
    const nodes = el.querySelectorAll('*').length;
    return `RENDERED nodes=${nodes} len=${text.length} consoleErrors=${errors.length} text=${JSON.stringify(text.slice(0, 50))}${errors.length ? ` firstError=${JSON.stringify(errors[0])}` : ''}`;
  } catch (e) {
    return `THREW:${(e as Error).message}`;
  } finally {
    spy.mockRestore();
  }
}

describe('preview page with the real editor', () => {
  it.each([
    ['positive control', '{"content":"hello"}'],
    ['throw control (makeEditable)', '{"embeds":5}'],
    ['refused control', 'null'],
    ['X-19 member', '{"components":[null]}'],
    ['typeless object component', '{"components":[{}]}'],
    ['embeds empty string', '{"embeds":""}'],
    ['fields empty string', '{"embeds":[{"fields":""}]}'],
    ['action row children a string', '{"components":[{"type":1,"components":"x"}]}'],
    ['container children a number', '{"components":[{"type":17,"components":5}]}'],
    ['section children holding null', '{"components":[{"type":9,"components":[null]}]}'],
    ['content a number', '{"content":5}'],
    ['embed with fields holding an empty object', '{"embeds":[{"fields":[{}]}]}'],
  ])('%s', async (_case, data) => {
    const got = await outcome(data);
    console.log(`PROBE ${JSON.stringify(data)} -> ${got}`);
    appendFileSync(process.env.PROBE_OUT ?? 'probe-outcomes.txt', `PROBE ${JSON.stringify(data)} -> ${got}\n`);
    expect(typeof got).toBe('string');
  });
});
