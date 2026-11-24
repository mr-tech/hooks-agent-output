// QA probe (not a suite file): each tree's own whole stack, M5 (2e36107) signature (getInitialValue, then the decorator) over the corpus, link inputs
// and 2,000 generator inputs on 6 surfaces. Per surface and input: whether the loaded value holds an inline element, and a hash
// of every text node's decorations. Placed in src/components/SlateEditor/utils/__tests__/; QA_OUT names the output.
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { createEditor, Text } from 'slate';
import { beforeAll, it, vi } from 'vitest';

import decorator from '../decorator';
import getInitialValue from '../getInitialValue';

import type { Descendant, Element } from 'slate';

import { startEngine } from '~/utils/markdown/engine';
import markdown from '~/utils/markdown';
import { CORPUS, LINK_INPUTS } from '~/utils/markdown/__tests__/helpers/discordInputs';
import { generateInputs } from '~/utils/markdown/__tests__/helpers/markdownGenerator';

vi.mock('~/env.mjs', () => ({ env: {} }));
beforeAll(async () => { await startEngine(); });

const SURFACES = ['content', 'embedDescription', 'fieldValue', 'embedTitle', 'embedTitleWithUrl', 'v2Text'] as const;
const PARTIAL = new Set(['embedTitle', 'embedTitleWithUrl']);
const INPUTS = [
  ...CORPUS.map((c) => ({ src: `corpus:${c.id}`, text: c.text })),
  ...LINK_INPUTS.map((text, i) => ({ src: `link:${i}`, text })),
  ...generateInputs(20261123, 2000).map((g, i) => ({ src: `gen:${i}`, text: g.text })),
];
const load = (text: string, surface: (typeof SURFACES)[number]) => getInitialValue(text, markdown.interactive.parseEmoji, PARTIAL.has(surface)) as Element[];

it('dumps the decorations of every text node', { timeout: 900000 }, () => {
  const rows: Record<string, { element: boolean; nodes: number; hash: string }> = {};
  for (const surface of SURFACES) {
    for (const input of INPUTS) {
      const value = load(input.text, surface);
      const editor = createEditor();
      editor.children = value as Descendant[];
      const decorate = decorator(editor, true, false, surface);
      const parts: string[] = [];
      let element = false;
      value.forEach((line, li) => line.children.forEach((child, ci) => {
        if (!Text.isText(child)) { element = true; return; }
        parts.push(JSON.stringify(decorate([child, [li, ci]])));
      }));
      rows[`${surface}|${input.src}`] = { element, nodes: parts.length, hash: createHash('sha256').update(parts.join('\n')).digest('hex') };
    }
  }
  writeFileSync(process.env.QA_OUT as string, JSON.stringify({ inputs: INPUTS.length, rows }, null, 1));
});
