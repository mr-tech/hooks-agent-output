import { act } from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import Page from '../page';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

const hoisted = vi.hoisted(() => ({ params: new URLSearchParams() }));

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('next/navigation', () => ({ useSearchParams: () => hoisted.params }));
vi.mock('~/providers/MarkdownProvider', () => ({ default: (props: { children: unknown }) => props.children }));
vi.mock('~/components/DiscordMessageEditor', () => ({
  default: (props: { message: { content?: string } }) => <p data-testid="editor">{String(props.message.content)}</p>,
}));

afterEach(unmountDom);

async function outcome(data: string) {
  hoisted.params = new URLSearchParams({ data });
  try {
    const el = mountDom(<Page />);
    await act(async () => {});
    if (el.querySelector('[data-testid="editor"]')) return `editor:${el.textContent}`;
    return `text:${el.textContent}`;
  } catch (e) {
    return `THREW:${(e as Error).message}`;
  }
}

describe('preview page, JSON objects of the wrong shape', () => {
  it.each([
    ['positive control', '{"content":"hello"}', 'editor:hello'],
    ['refused control', 'null', 'text:Invalid message data.'],
    ['embeds a number', '{"embeds":5}', 'text:Invalid message data.'],
    ['embeds holding null', '{"embeds":[null]}', 'text:Invalid message data.'],
    ['embed fields a number', '{"embeds":[{"fields":5}]}', 'text:Invalid message data.'],
    ['components a string', '{"components":"x"}', 'text:Invalid message data.'],
    ['components holding null', '{"components":[null]}', 'text:Invalid message data.'],
  ])('%s', async (_case, data, expected) => {
    const got = await outcome(data);
    console.log(`PROBE ${JSON.stringify(data)} -> ${got}`);
    expect(got).toBe(expected);
  });
});
