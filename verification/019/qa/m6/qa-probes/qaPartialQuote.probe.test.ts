// QA probe (not a suite file), website 119471f: in a single-line (partial) editor, type "> a" and read the line's element type
// and the saved text. Run once on the shipped code and once with W12 applied. QA_OUT names the output.
import { writeFileSync } from 'node:fs';
import { createEditor, Editor, Transforms } from 'slate';
import { beforeAll, it, vi } from 'vitest';

import getInitialValue from '../getInitialValue';
import withNormalizeNode from '../withNormalizeNode';
import flattenNodeText from '../flattenNodeText';

import type { Descendant, Element } from 'slate';

import { startEngine } from '~/utils/markdown/engine';

vi.mock('~/env.mjs', () => ({ env: {} }));
beforeAll(async () => { await startEngine(); });

it('reads a typed quote marker in a partial editor', () => {
  const editor = withNormalizeNode(createEditor(), true, 'embedTitle');
  editor.children = getInitialValue('', 'embedTitle', true) as Descendant[];
  Transforms.select(editor, Editor.start(editor, []));
  for (const ch of '> a') editor.insertText(ch);
  const line = editor.children[0] as Element;
  writeFileSync(process.env.QA_OUT as string, JSON.stringify({ type: line.type, quotePrefix: line.quotePrefix ?? null, saved: flattenNodeText(editor.children as Descendant[]) }));
});
