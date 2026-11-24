import { writeFileSync } from 'node:fs';

import { createEditor, Text } from 'slate';
import {
  beforeAll, expect, it, vi,
} from 'vitest';

import decorator from '../decorator';
import getInitialValue from '../getInitialValue';
import noPrefix from '../qaDecoratorNoPrefix';

import type { Element } from 'slate';

import markdown from '~/utils/markdown';
import { startEngine, SURFACE_MASKS, type Surface } from '~/utils/markdown/engine';
import { CORPUS, LINK_INPUTS } from '~/utils/markdown/__tests__/helpers/discordInputs';
import { generateInputs } from '~/utils/markdown/__tests__/helpers/markdownGenerator';

vi.mock('~/env.mjs', () => ({ env: {} }));

const CANDIDATES = [
  '> > b', '> >>> b', '>>> > b', '> # b', '> - b', '> -# b', '> 1. b', '> *a\nb*', '> **a\nb**', '> `a\nb`',
  '> a\n> > b', '>>> a\n> _b\n> _c_', '>>> a\n> _\n> _b_', '>>> a\n> _b_', '> _\n> _b_', '> a_\n> _b_', '>>> x\n> *a\n> b*', '> *a\n> b*', '> _a\n> b_', 'x_\n> _b_', '> ```\na', '> ||a\nb||', '> [a](https://x.y)', '>>> a\n> b', '> > > b', '>  > b', '> \\> b',
];
const INPUTS = [
  ...CANDIDATES.map((text, i) => ({ src: `cand:${i}`, text })),
  ...CORPUS.map((c) => ({ src: `corpus:${c.id}`, text: c.text })),
  ...LINK_INPUTS.map((text, i) => ({ src: `link:${i}`, text })),
  ...generateInputs(20261123, 2000).map((g, i) => ({ src: `gen:${i}`, text: g.text })),
];
const PARTIAL = new Set<Surface>(['embedTitle', 'embedTitleWithUrl']);

beforeAll(async () => { await startEngine(); });

it('reports inputs on which the decorator differs with and without the quote prefix', () => {
  const rows: { surface: string; src: string; text: string }[] = [];
  let quoted = 0;
  for (const surface of Object.keys(SURFACE_MASKS) as Surface[]) {
    for (const input of INPUTS) {
      const value = getInitialValue(input.text, markdown.interactive.parseEmoji, PARTIAL.has(surface));
      if ((value as Element[]).some((l) => l.type === 'blockQuote')) quoted += 1;
      const editor = createEditor();
      editor.children = value;
      const a = decorator(editor, true, false, surface);
      const b = noPrefix(editor, true, false, surface);
      let differs = false;
      (value as Element[]).forEach((line, li) => line.children.forEach((child, at) => {
        if (!Text.isText(child)) return;
        if (JSON.stringify(a([child, [li, at]])) !== JSON.stringify(b([child, [li, at]]))) differs = true;
      }));
      if (differs) {
        const detail = (value as Element[]).map((line, li) => ({
          type: line.type,
          prefix: (line as { quotePrefix?: string }).quotePrefix,
          nodes: line.children.map((child, at) => (Text.isText(child)
            ? { text: child.text, withPrefix: a([child, [li, at]]), without: b([child, [li, at]]) } : { element: true })),
        }));
        rows.push({ surface, src: input.src, text: input.text, detail } as never);
      }
    }
  }
  writeFileSync(process.env.QA_OUT as string, JSON.stringify({ quoted, rows }, null, 1));
  expect(quoted).toBeGreaterThan(0);
}, 120000);
