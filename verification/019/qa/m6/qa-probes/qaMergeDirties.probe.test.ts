// QA probe (not a suite file): per keystroke, which lines one Editor.normalize drain normalises and how many run units it
// builds, at website 119471f. Placed in src/components/SlateEditor/utils/__tests__/ of an export; QA_OUT names the output.
import { createEditor, Editor, Transforms } from 'slate';
import { beforeAll, it, vi } from 'vitest';
import { writeFileSync } from 'node:fs';

import type { Descendant, Element } from 'slate';

import { startEngine } from '~/utils/markdown/engine';

const builds: number[] = [];
vi.mock('../runUnit', async (importOriginal) => {
  const real = await importOriginal<typeof import('../runUnit')>();
  return { ...real, unitAround: (...args: Parameters<typeof real.unitAround>) => { builds.push(args[1]); return real.unitAround(...args); } };
});
vi.mock('~/env.mjs', () => ({ env: {} }));

const { default: getInitialValue } = await import('../getInitialValue');
const { default: withNormalizeNode } = await import('../withNormalizeNode');
const { default: flattenNodeText } = await import('../flattenNodeText');

beforeAll(async () => { await startEngine(); });

type Key = 'insert' | 'backspace' | 'delete' | 'enter';
function drain(name: string, text: string, line: number, offset: number | 'end', key: Key) {
  const editor = withNormalizeNode(createEditor(), false, 'embedDescription');
  editor.children = getInitialValue(text, 'embedDescription', false) as Descendant[];
  Editor.normalize(editor, { force: true });
  const lineText = flattenNodeText(editor.children[line]);
  const at = Editor.start(editor, [line]);
  const point = offset === 'end' ? Editor.end(editor, [line]) : { ...at, offset };
  Transforms.select(editor, point);
  const normalised: string[] = [];
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry, options) => { normalised.push(JSON.stringify(entry[1])); normalizeNode(entry, options); };
  builds.length = 0;
  Editor.withoutNormalizing(editor, () => {
    if (key === 'insert') editor.insertText('x');
    if (key === 'backspace') editor.deleteBackward('character');
    if (key === 'delete') editor.deleteForward('character');
    if (key === 'enter') editor.insertBreak();
  });
  return {
    name, text, line, lineText, offset, key,
    after: flattenNodeText(editor.children as Descendant[]),
    types: (editor.children as Element[]).map((l) => l.type),
    normalisedPaths: normalised,
    unitBuildsByLine: [...builds],
    unitBuilds: builds.length,
  };
}

it('records what one drain normalises and builds per keystroke', { timeout: 120000 }, () => {
  const rows = [
    drain('positive control: in-line insert, one-line text', 'ab', 0, 1, 'insert'),
    drain('in-line insert, 5 plain lines', 'a\nb\nc\nd\ne', 2, 1, 'insert'),
    drain('enter mid-line, 5 plain lines', 'a\nbc\nc\nd\ne', 1, 1, 'enter'),
    drain('merge two plain lines (same unit)', 'a\nb\nc\nd\ne', 2, 0, 'backspace'),
    drain('merge a plain line into a closing fence (two units: above and below the block)', 'a\n```\nx\n```\nb\nc', 4, 0, 'backspace'),
    drain('merge a closing fence into its code line (the block opens to the end)', 'a\n```\nx\n```\nb\nc', 3, 0, 'backspace'),
    drain('merge an opening fence into the line above (fence opened mid-line)', 'a\n```\nx\n```\nb\nc', 1, 0, 'backspace'),
    drain('delete forward at end of a plain line before an opening fence', 'a\n```\nx\n```\nb\nc', 0, 'end', 'delete'),
    drain('merge two quote lines', '> a\n> b\nc', 1, 0, 'backspace'),
    drain('enter mid code line inside a fence', 'a\n```\nxy\n```\nb', 2, 1, 'enter'),
    drain('merge two code lines inside a fence', 'a\n```\nx\ny\n```\nb', 3, 0, 'backspace'),
    drain('in-line insert in a code line', 'a\n```\nxy\n```\nb', 2, 1, 'insert'),
  ];
  writeFileSync(process.env.QA_OUT as string, JSON.stringify(rows, null, 1));
});
