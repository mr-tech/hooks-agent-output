import { appendFileSync } from 'node:fs';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, vi } from 'vitest';

import markdown from '..';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const OUT = process.env.PROBE_OUT ?? '/dev/null';
const shape = (html: string) => {
  const blocks = [...html.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g)].map((m) => m[1].replace(/<[^>]+>/g, ''));
  const outside = html.replace(/<pre>[\s\S]*?<\/pre>/g, '').replace(/<[^>]+>/g, '|').replace(/\|+/g, '|');
  return `blocks=${JSON.stringify(blocks)} outside=${JSON.stringify(outside)}`;
};

const MEMBERS: Array<[string, string]> = [
  ['blank line inside', '```\nfoo\n\nbar\n```'],
  ['blank line inside, tag', '```js\nfoo\n\nbar\n```'],
  ['whitespace-only line inside', '```\nfoo\n \nbar\n```'],
  ['text before, blank inside', 'hi\n```\nfoo\n\nbar\n```'],
  ['blank inside, text after on next paragraph', '```\nfoo\n\nbar\n```\n\nafter'],
  ['two fences separated by a paragraph', '```\na\n\nb\n```\n\nmiddle\n\n```\nc\n```'],
  ['two fences, blank between', '```\na\n```\n\n```\nb\n```'],
  ['two paragraphs each with a stray fence', 'one ``` stray\n\ntwo ``` stray'],
  ['unterminated fence then paragraphs', '```\nfoo\n\nbar\n\nbaz'],
  ['CRLF blank inside', '```\r\nfoo\r\n\r\nbar\r\n```'],
  ['inline code spans across paragraphs', 'a `x` b\n\nc `y` d'],
  ['list after blank-inside fence', '```\nfoo\n\nbar\n```\n- item'],
  ['heading-like line inside fence', '```\n# not a heading\n\nx\n```'],
];

describe('fence structure', () => {
  it.each(MEMBERS)('%s', (name, src) => {
    for (const [pn, p] of [['parseContent', markdown.static.parseContent], ['parseEmbedField', markdown.static.parseEmbedField]] as const) {
      const html = renderToStaticMarkup(createElement(Fragment, null, p(src) as never));
      appendFileSync(OUT, `${pn} ${JSON.stringify(name)}: ${shape(html)}\n`);
    }
  });

  it('timing', () => {
    const cases: Array<[string, string]> = [
      ['4000 backticks triples, no newline', '```a'.repeat(1000)],
      ['2000 x stray fence lines', '``` a\n'.repeat(400)],
      ['fence-open then 4000 newlines', `\`\`\`a${'\n'.repeat(4000)}`],
      ['alternating ``` and blank', '```\n\n'.repeat(800)],
      ['many backticks pairs', '`` ``` '.repeat(500)],
      ['4096 chars of x with a fence', `\`\`\`\n${'x\n'.repeat(2040)}`],
    ];
    for (const [name, src] of cases) {
      const t = performance.now();
      markdown.static.parseContent(src);
      appendFileSync(OUT, `TIME ${name} len=${src.length}: ${(performance.now() - t).toFixed(1)} ms\n`);
    }
  });
});
