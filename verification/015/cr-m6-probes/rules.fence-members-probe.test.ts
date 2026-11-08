import { appendFileSync } from 'node:fs';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import markdown from '..';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const pre = (src: string, p: (s: string) => unknown) => /<pre>/.test(renderToStaticMarkup(createElement(Fragment, null, p(src) as never)));

describe('fenced block members', () => {
  it.each([
    ['control: two lines, no tag', '```\nfoo\nbar\n```', true],
    ['control: plain text', 'foo\n\nbar', false],
    ['blank line inside, no tag', '```\nfoo\n\nbar\n```', '?'],
    ['blank line inside, tag', '```js\nfoo\n\nbar\n```', '?'],
    ['two blank lines inside', '```\nfoo\n\n\nbar\n```', '?'],
    ['blank line inside, text before', 'hi\n```\nfoo\n\nbar\n```', '?'],
    ['whitespace-only line inside', '```\nfoo\n \nbar\n```', '?'],
  ])('%s', (name, src, expected) => {
    for (const [pn, p] of [['parseContent', markdown.static.parseContent], ['parseEmbedField', markdown.static.parseEmbedField], ['parseEmbedDescription', (markdown.static as Record<string, (s: string) => unknown>).parseEmbedDescription ?? markdown.static.parseContent]] as const) {
      const got = pre(src, p as (s: string) => unknown);
      appendFileSync(process.env.PROBE_OUT ?? '/dev/null', `${pn} ${JSON.stringify(name)}: ${got ? 'code block' : 'no code block'}\n`);
      if (expected !== '?') expect(got).toBe(expected);
    }
  });
});
