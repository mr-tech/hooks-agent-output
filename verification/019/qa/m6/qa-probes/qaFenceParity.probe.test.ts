// QA probe (not a suite file), website 119471f: AC-6.5's inputs left out by hasCleanFences. For each surface, every range
// where the lift and the frozen engine spans differ, with the type the Slate layer gives the range's line.
// Placed in src/components/SlateEditor/utils/__tests__/; QA_OUT names the output.
import { beforeAll, it, vi } from 'vitest';
import { writeFileSync } from 'node:fs';

import getInitialValue from '../getInitialValue';
import frozen from '../../__tests__/helpers/data/emojiSpans.json';
import {
  EMOJI_SURFACES, emojiInputs, emojiRangesOf, hasCleanFences, PARTIAL_SURFACES,
} from '../../__tests__/helpers/emojiInputs';

import type { Element } from 'slate';

import { startEngine } from '~/utils/markdown/engine';

vi.mock('~/env.mjs', () => ({ env: {} }));
beforeAll(async () => { await startEngine(); });

const FROZEN = frozen.spans as Record<string, Record<string, number[][]>>;

it('classifies every differing range of the fence-parity inputs', { timeout: 300000 }, () => {
  const all = emojiInputs();
  const out: Record<string, unknown> = { inputs: all.length };
  for (const surface of EMOJI_SURFACES) {
    const left = all.filter((input) => !hasCleanFences(input.text));
    const rows: unknown[] = [];
    for (const input of left) {
      const lines = getInitialValue(input.text, surface as 'content', PARTIAL_SURFACES.has(surface)) as Element[];
      const lifted = emojiRangesOf(lines).map((r) => JSON.stringify(r));
      const expected = (FROZEN[surface][input.key] ?? []).map((r) => JSON.stringify(r));
      const only = (a: string[], b: string[]) => a.filter((x) => !b.includes(x));
      const lineOf = (start: number) => input.text.slice(0, start).split('\n').length - 1;
      const diff = [...only(lifted, expected).map((r) => ['lift only', r]), ...only(expected, lifted).map((r) => ['engine only', r])]
        .map(([side, r]) => { const [s] = JSON.parse(r as string) as number[]; const li = lineOf(s); return { side, range: r, line: li, type: lines[li]?.type, lineText: input.text.split('\n')[li] }; });
      if (diff.length) rows.push({ key: input.key, diff });
    }
    out[surface] = {
      left: left.length,
      differing: rows.length,
      rangesNotOnCodeLine: rows.flatMap((r) => (r as { diff: { type: string }[] }).diff).filter((d) => d.type !== 'codeBlock').length,
      rows,
    };
  }
  writeFileSync(process.env.QA_OUT as string, JSON.stringify(out, null, 1));
});
