import { writeFileSync } from 'node:fs';
import { createEditor, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { it, vi } from 'vitest';
import { flattenNodeText, getInitialValue, withEmojis, withNormalizeNode } from '..';
import { blockLayerEdits, EDITS_BASE_RED } from '../../__tests__/helpers/blockLayerEdits';
import markdown from '~/utils/markdown';

vi.mock('~/env.mjs', () => ({ env: {} }));
const loadedEditor = (text: string) => {
  const editor = withNormalizeNode(withEmojis(withHistory(withReact(createEditor()))), false, markdown.interactive.parseEmoji);
  editor.children = getInitialValue(text, markdown.interactive.parseEmoji, false);
  return editor;
};
it('probe', () => {
  const all = blockLayerEdits(800);
  const out: unknown[] = [];
  let wrong = 0;
  all.forEach((edit, index) => {
    const editor = loadedEditor(edit.text);
    const start = Editor.start(editor, [edit.line]);
    Transforms.select(editor, edit.offset === 0 ? start : Editor.after(editor, start, { distance: edit.offset, unit: 'character' }) ?? Editor.end(editor, [edit.line]));
    Transforms.insertText(editor, 'x');
    const got = flattenNodeText(editor.children);
    if (got !== edit.expected) { wrong += 1; out.push({ index, red: EDITS_BASE_RED.has(index), text: edit.text, line: edit.line, offset: edit.offset, expected: edit.expected, got }); }
  });
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify({ total: all.length, wrong, out }, null, 1));
}, 300_000);
