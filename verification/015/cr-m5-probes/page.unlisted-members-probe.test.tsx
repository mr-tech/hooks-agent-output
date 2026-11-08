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
    const n = el.querySelectorAll('*').length;
    if (el.textContent?.includes('Invalid message data.')) return `text:Invalid message data. (${n} nodes)`;
    return `rendered:${n} nodes`;
  } catch (e) {
    return `THREW:${(e as Error).message}`;
  }
}

const v2 = (c: unknown) => JSON.stringify({ flags: 32768, components: [c] });

describe('preview page at the tip, members no earlier read lists', () => {
  it.each([
    ['positive control', '{"content":"hello"}', 'rendered'],
    ['refused control', '[1]', 'text:'],
    ['content an object', '{"content":{}}', '?'],
    ['content an array', '{"content":["a"]}', '?'],
    ['username a number', '{"content":"a","username":5}', '?'],
    ['avatar_url a number', '{"content":"a","avatar_url":5}', '?'],
    ['flags a string', '{"content":"a","flags":"x"}', '?'],
    ['embed author a number', '{"embeds":[{"author":5}]}', '?'],
    ['embed author name an object', '{"embeds":[{"author":{"name":{}}}]}', '?'],
    ['embed footer a string', '{"embeds":[{"footer":"x"}]}', '?'],
    ['embed footer text a number', '{"embeds":[{"footer":{"text":5}}]}', '?'],
    ['embed image a number', '{"embeds":[{"image":5}]}', '?'],
    ['embed image url a number', '{"embeds":[{"image":{"url":5}}]}', '?'],
    ['embed thumbnail null', '{"embeds":[{"title":"t","thumbnail":null}]}', '?'],
    ['embed timestamp garbage', '{"embeds":[{"title":"t","timestamp":"garbage"}]}', '?'],
    ['embed color a string', '{"embeds":[{"title":"t","color":"red"}]}', '?'],
    ['embed title a number', '{"embeds":[{"title":5}]}', '?'],
    ['embed description an object', '{"embeds":[{"description":{}}]}', '?'],
    ['field name a number', '{"embeds":[{"fields":[{"name":5,"value":"v"}]}]}', '?'],
    ['field value an object', '{"embeds":[{"fields":[{"name":"n","value":{}}]}]}', '?'],
    ['v2 text display content a number', v2({ type: 10, content: 5 }), '?'],
    ['v2 text display content an object', v2({ type: 10, content: {} }), '?'],
    ['v2 button label an object', v2({ type: 1, components: [{ type: 2, style: 1, label: {} }] }), '?'],
    ['v2 button style a string', v2({ type: 1, components: [{ type: 2, style: 'x', label: 'a' }] }), '?'],
    ['v2 section accessory a number', v2({ type: 9, components: [{ type: 10, content: 'a' }], accessory: 5 }), '?'],
    ['v2 thumbnail media null', v2({ type: 9, components: [{ type: 10, content: 'a' }], accessory: { type: 11, media: null } }), '?'],
    ['v2 gallery item media null', v2({ type: 12, items: [{ media: null }] }), '?'],
    ['v2 file a number file', v2({ type: 13, file: 5 }), '?'],
    ['v2 separator spacing a string', v2({ type: 14, spacing: 'x' }), '?'],
    ['v2 unknown type', v2({ type: 99 }), '?'],
    ['v2 type a string', v2({ type: '10', content: 'a' }), '?'],
    ['v2 container child section accessory null', v2({ type: 17, components: [{ type: 9, components: [], accessory: null }] }), '?'],
    ['v2 container child gallery items string', v2({ type: 17, components: [{ type: 12, items: 'x' }] }), '?'],
    ['v2 container accent_color a string', v2({ type: 17, accent_color: 'x', components: [] }), '?'],
    ['deep: container in container', v2({ type: 17, components: [{ type: 17, components: [{ type: 10, content: 'a' }] }] }), '?'],
  ])('%s', async (_case, data, expected) => {
    const got = await outcome(data);
    appendFileSync(process.env.EDGE_OUT ?? '/dev/null', `UNLISTED ${JSON.stringify(data)} -> ${got}\n`);
    if (expected !== '?') expect(got.startsWith(expected)).toBe(true);
  });
});
