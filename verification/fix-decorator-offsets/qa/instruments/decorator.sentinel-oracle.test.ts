// QA instrument (not a suite test): a sentinel oracle over every key of the tree's interactiveBaseRules.
// Each node kind's sample is placed between two plain sentinel words "zz", at the root and inside each emphasis
// wrapper. The expectation is independent of the decorator: every sentinel character renders non-syntax with exactly
// the wrapper's style class (none at the root). A width fault in a node kind shifts later ranges onto the trailing
// sentinel or off the leading one. Writes one row per (parser, input) to SENTINEL_OUT.
import { writeFileSync } from 'node:fs';

import { createEditor, Text } from 'slate';
import { expect, it, vi } from 'vitest';

import decorator from '../decorator';

import type { Descendant } from 'slate';

import markdown from '~/utils/markdown';
import { interactiveBaseRules } from '~/utils/markdown/rules';

vi.mock('~/env.mjs', () => ({ env: {} }));

// Per rule key: inline samples (placed anywhere) or line-start samples (placed first on the line).
const SAMPLES: Record<string, { inline?: string[], lineStart?: string[], why?: string }> = {
  autolink: { inline: ['<https://x.y>'] },
  blockQuote: { lineStart: ['> '] },
  br: { why: 'matches a newline; a text leaf is one line' },
  codeBlock: { inline: ['```js'] },
  def: { why: 'reference definition; line-level' },
  del: { inline: ['~~d~~'] },
  discordChannel: { inline: ['<#1>'] },
  discordEmoji: { inline: ['<:e:1>', '<a:e:1>'] },
  discordEveryone: { inline: ['@everyone', '@here'] },
  discordRole: { inline: ['<@&1>'] },
  discordTimestamp: { inline: ['<t:1>', '<t:1:R>'] },
  discordUser: { inline: ['<@1>', '<@!1>'] },
  em: { inline: ['*e*', '_e_'] },
  emoji: { inline: ['🙂'] },
  escape: { inline: ['\\*', '\\_', '\\\\'] },
  heading: { lineStart: ['# ', '## ', '### ', '-# '] },
  inlineCode: { inline: ['`c`', '``c``'] },
  link: { inline: ['[l](https://x.y)', '[l](<https://x.y>)', '[l](https://x.y "t")'] },
  list: { lineStart: ['- ', '1. '] },
  nameEmoji: { inline: [':smile:'] },
  newline: { why: 'matches a newline; a text leaf is one line' },
  paragraph: { why: 'container the decorator unwraps' },
  s: { inline: ['~~s~~'] },
  spoiler: { inline: ['||p||'] },
  strong: { inline: ['**b**', '***bi***'] },
  text: { inline: ['t'] },
  u: { inline: ['__u__'] },
  url: { inline: ['https://x.y', 'https://x.y.'] },
};

const WRAPPERS: [string, string][] = [['', ''], ['**', 'strongText'], ['*', 'emText'], ['_', 'emText'], ['__', 'uText'], ['~~', 'sText'], ['||', 'spoilerText']];
const PARSERS = [
  ['content', markdown.interactive.parseContent, false],
  ['title', markdown.interactive.parseEmbedTitle, true],
  ['field', markdown.interactive.parseEmbedField, true],
] as const;

function render(text: string, parse: typeof markdown.interactive.parseContent, isEmbed: boolean) {
  const editor = createEditor();
  const span = { type: 'span', text } as unknown as Text;
  editor.children = [{ type: 'div', lang: '', startCodeBlock: false, children: [span] } as unknown as Descendant];
  const ranges = decorator(editor, true, isEmbed, parse)([span, [0, 0]]);
  const chars: { syntax: boolean, classes: string }[] = [];
  for (const { leaf } of Text.decorations(span, ranges)) {
    const l = leaf as Text & { syntax?: boolean, classNames?: string[] };
    for (let i = 0; i < l.text.length; i += 1) chars.push({ syntax: !!l.syntax, classes: [...(l.classNames ?? [])].sort().join('+') });
  }
  return chars;
}

it('writes the sentinel rows', () => {
  const keys = Object.keys(interactiveBaseRules).sort();
  const unmapped = keys.filter((k) => !(k in SAMPLES));
  const rows: unknown[] = [];
  const cases: { key: string, text: string, sentinels: number[], cls: string }[] = [];
  for (const key of keys) {
    const s = SAMPLES[key];
    if (!s) continue;
    for (const sample of s.inline ?? []) {
      for (const [w, cls] of WRAPPERS) {
        const text = `${w}zz ${sample} zz${w}`;
        const a = w.length; const b = text.length - w.length - 2;
        cases.push({ key, text, sentinels: [a, a + 1, b, b + 1], cls });
      }
    }
    for (const prefix of s.lineStart ?? []) {
      for (const [w, cls] of WRAPPERS) {
        const text = `${prefix}${w}zz **b** zz${w}`;
        const a = prefix.length + w.length; const b = text.length - w.length - 2;
        cases.push({ key, text, sentinels: [a, a + 1, b, b + 1], cls });
      }
    }
  }
  for (const c of cases) {
    for (const [name, parse, isEmbed] of PARSERS) {
      let got: string;
      try {
        const chars = render(c.text, parse, isEmbed);
        const bad = c.sentinels.filter((i) => chars[i]?.syntax || (chars[i]?.classes ?? '') !== c.cls);
        got = bad.length ? `bad@${bad.join(',')}:${bad.map((i) => `${chars[i]?.syntax ? 'S' : ''}${chars[i]?.classes}`).join('|')}` : 'ok';
      } catch (e) {
        got = `throw:${(e as Error).message}`;
      }
      rows.push({ key: c.key, parser: name, text: c.text, expectClass: c.cls, got });
    }
  }
  writeFileSync(process.env.SENTINEL_OUT as string, JSON.stringify({ keys, unmapped, rows }, null, 0));
  expect(unmapped).toEqual([]);
});
