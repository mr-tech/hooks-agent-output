// Probe for code review of fix-decorator-offsets round 4: a code-block line split into two text nodes by an emoji element is
// decorated per text node; writes the per-character rendering of each split line and of the same line unsplit to SPLIT_OUT.
import { writeFileSync } from 'node:fs';

import { createEditor, Text } from 'slate';
import { it, vi } from 'vitest';

import decorator from '../decorator';

import type { Descendant } from 'slate';

import markdown from '~/utils/markdown';

vi.mock('~/env.mjs', () => ({ env: {} }));

const LINES: [string, string, string][] = [
  ['js', 'const s = "a ', ' b";'],
  ['js', 'let x = 1; ', ' // note'],
  ['js', 'f(`t ', ' ${y}`);'],
  ['js', '// c ', ' d'],
  ['js', 'if (a) ', ' return 2;'],
  ['python', 'print("x ', ' y")'],
  ['python', 'def f(): ', ' pass'],
  ['python', '# c ', ' d'],
  ['ts', 'type T = "a ', ' b";'],
  ['json', '{"a": "', '"}'],
];

function render(lang: string, spans: string[]) {
  const editor = createEditor();
  const children = spans.map((text) => ({ type: 'span', text }));
  editor.children = [{ type: 'codeBlock', lang, startCodeBlock: true, children } as unknown as Descendant];
  const out: { syntax: boolean, classes: string }[] = [];
  children.forEach((span, i) => {
    const ranges = decorator(editor, true, false, markdown.interactive.parseContent)([span as unknown as Text, [0, i]]);
    for (const { leaf } of Text.decorations(span as unknown as Text, ranges)) {
      const l = leaf as Text & { syntax?: boolean, classNames?: string[] };
      for (const _ of leaf.text) out.push({ syntax: Boolean(l.syntax), classes: [...(l.classNames ?? [])].sort().join('+') });
    }
  });
  return out;
}

it('writes split and unsplit code-line renderings', () => {
  const rows = LINES.map(([lang, a, b]) => ({
    lang, a, b, split: render(lang, [a, b]), whole: render(lang, [a + b]),
  }));
  writeFileSync(process.env.SPLIT_OUT as string, JSON.stringify(rows));
});
