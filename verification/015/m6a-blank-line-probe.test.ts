// Probe (no fix): a fenced block with a blank line inside, through parseContent and parseEmbedField.
import { appendFileSync } from 'node:fs';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, vi } from 'vitest';

import markdown from '..';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

describe('probe', () => {
  it.each([
    ['blank line inside', '```\nfoo\n\nbar\n```'],
    ['text before, no blank line', 'hello\n```\nfoo\nbar\n```'],
    ['control: no blank line', '```\nfoo\nbar\n```'],
  ])('%s', (name, source) => {
    for (const [pname, parser] of [['parseContent', markdown.static.parseContent], ['parseEmbedField', markdown.static.parseEmbedField]] as const) {
      const html = renderToStaticMarkup(createElement(Fragment, null, parser(source) as never));
      appendFileSync(process.env.PROBE_OUT ?? '/dev/null', `${pname} ${JSON.stringify(name)}: ${/<pre>/.test(html) ? 'code block' : 'no code block'}\n`);
    }
  });
});
