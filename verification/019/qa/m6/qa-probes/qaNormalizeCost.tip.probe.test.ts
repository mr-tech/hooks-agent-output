// QA probe (not a suite file): per-keystroke normalise cost at the surface limits, M6 signature.
// Placed in src/components/SlateEditor/utils/__tests__/ of an export; QA_OUT names the output file.
import { createEditor, Transforms } from 'slate';
import { beforeAll, it, vi } from 'vitest';
import { writeFileSync } from 'node:fs';

import getInitialValue from '../getInitialValue';
import withNormalizeNode from '../withNormalizeNode';

import type { Descendant } from 'slate';

import { startEngine } from '~/utils/markdown/engine';

vi.mock('~/env.mjs', () => ({ env: {} }));

beforeAll(async () => { await startEngine(); });

function timeEdits(surface: 'content' | 'embedDescription', lines: number, width: number, where: 'middle' | 'last') {
  const text = Array.from({ length: lines }, (_, i) => `l${String(i).padStart(Math.max(width - 1, 1), '0')}`.slice(0, width)).join('\n');
  const editor = withNormalizeNode(createEditor(), false, surface);
  editor.children = getInitialValue(text, surface, false) as Descendant[];
  const line = where === 'middle' ? Math.floor(lines / 2) : lines - 1;
  const times: number[] = [];
  for (let k = 0; k < 12; k += 1) {
    const t0 = performance.now();
    Transforms.insertText(editor, 'x', { at: { path: [line, 0], offset: 0 } });
    times.push(performance.now() - t0);
  }
  const sorted = times.slice(2).sort((a, b) => a - b);
  return { surface, lines, chars: text.length, where, median: sorted[Math.floor(sorted.length / 2)], max: sorted.at(-1) };
}

it('normalize cost per keystroke at the surface limits', { timeout: 600000 }, () => {
  const rows = [
    timeEdits('content', 40, 49, 'middle'),
    timeEdits('content', 1000, 1, 'middle'),
    timeEdits('content', 1000, 1, 'last'),
    timeEdits('embedDescription', 2048, 1, 'middle'),
    timeEdits('embedDescription', 2048, 1, 'last'),
  ];
  writeFileSync(process.env.QA_OUT as string, JSON.stringify(rows, null, 1));
});
