// Probe for code review of fix-decorator-offsets round 4: does the editor's normalizer lift an emoji typed inside a fenced
// code-block line into its own element, splitting the line's text? Writes the normalized children to SPLIT_NORM_OUT.
import { writeFileSync } from 'node:fs';

import { createEditor, Editor } from 'slate';
import { it, vi } from 'vitest';

import getInitialValue from '../getInitialValue';
import { withEmojis, withNormalizeNode } from '..';

import markdown from '~/utils/markdown';

vi.mock('~/env.mjs', () => ({ env: {} }));

it('writes the normalized children of a code block holding an emoji', () => {
  const out: unknown[] = [];
  for (const input of (JSON.parse(process.env.NORM_INPUTS as string) as string[])) {
    const editor = withNormalizeNode(withEmojis(createEditor()), false, markdown.interactive.parseEmoji);
    editor.children = getInitialValue(input, markdown.interactive.parseEmoji, false);
    Editor.normalize(editor, { force: true });
    out.push({ input, children: editor.children });
  }
  writeFileSync(process.env.SPLIT_NORM_OUT as string, JSON.stringify(out, (k, v) => (k === 'ast' ? '[ast]' : v), 1));
});
