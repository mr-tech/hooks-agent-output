// QA instrument (not a suite test): the decorator over text leaves inside a code-block element (ancestor lang set),
// the path no other instrument of this chain reaches (they all decorate with lang ''). Writes the rendered leaves per
// (lang, startCodeBlock, parser, line) to CODE_OUT for a base/tip comparison.
import { writeFileSync } from 'node:fs';

import hljs from 'highlight.js';
import { createEditor, Text } from 'slate';
import { expect, it, vi } from 'vitest';

import decorator from '../decorator';

import type { Descendant } from 'slate';

import markdown from '~/utils/markdown';

vi.mock('~/env.mjs', () => ({ env: {} }));

const LINES = ['const a = 1;', 'const s = "**a**"; // *b*', '**a** `b` # c', '# heading', '```', '```js', 'x = "🙂" + \'\\*\'', '<@1> https://x.y [l](https://x.y)', ''];
const LANGS = process.env.QA_ALL_LANGS ? [...hljs.listLanguages(), 'notalanguage', ''] : ['js', 'python', 'notalanguage', ''];
const PARSERS = [
  ['content', markdown.interactive.parseContent, false],
  ['field', markdown.interactive.parseEmbedField, true],
] as const;

it('writes the code-block line rows', () => {
  const rows: unknown[] = [];
  for (const lang of LANGS) {
    for (const startCodeBlock of [false, true]) {
      for (const [name, parse, isEmbed] of PARSERS) {
        for (const text of LINES) {
          const editor = createEditor();
          const span = { type: 'span', text } as unknown as Text;
          editor.children = [{ type: 'codeBlock', lang, startCodeBlock, children: [span] } as unknown as Descendant];
          let got: string;
          try {
            const ranges = decorator(editor, true, isEmbed, parse)([span, [0, 0]]);
            const past = ranges.filter((r) => r.focus.offset > text.length || r.anchor.offset < 0 || r.anchor.offset > r.focus.offset);
            if (past.length) rows.push({ lang, startCodeBlock, parser: name, text, outOfText: past.length });
            got = Text.decorations(span, ranges).map(({ leaf }) => {
              const l = leaf as Text & { syntax?: boolean, classNames?: string[] };
              const tag = [l.syntax ? 'S' : '', ...[...(l.classNames ?? [])].sort()].filter(Boolean).join('+');
              return `${JSON.stringify(l.text)}:${tag || '-'}`;
            }).join(' ');
          } catch (e) {
            got = `throw:${(e as Error).message}`;
          }
          rows.push({ lang, startCodeBlock, parser: name, text, got });
        }
      }
    }
  }
  writeFileSync(process.env.CODE_OUT as string, JSON.stringify(rows));
  expect(rows.filter((r) => !('outOfText' in (r as object))).length).toBe(LANGS.length * 2 * PARSERS.length * LINES.length);
});
