// Differential probe for code review of fix-decorator-offsets: runs the tree's real decorator over a seeded
// random corpus through every interactive parser an editor passes it, and writes every range to PROBE_OUT.
import { writeFileSync } from 'node:fs';

import { createEditor } from 'slate';
import { it, vi } from 'vitest';

import decorator from '../decorator';

import type { Descendant, Text } from 'slate';

import markdown from '~/utils/markdown';

vi.mock('~/env.mjs', () => ({ env: {} }));

const TOKENS = ['*', '**', '***', '_', '__', '~~', '||', 'a', 'b', ' ', ' ', 'c d', '[a](https://x.y)', '[b](<https://x.y>)',
  '`', '<https://x.y>', 'https://x.y', '# ', '-# ', '> ', '\\*', ':smile:', '<@123>'];

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s ^ (s >>> 15), 0x2c1b3c6d) + 0x6d2b79f5) >>> 0;
    s ^= s >>> 12;
    return (s >>> 0) / 4294967296;
  };
}

const FIXED = ['**ab**', '*ab*', '**a** *b*', '**a *b* c** d', '***ab***', '***ab*** cd', '__*a*__', '||**a**||', '***~~a~~***',
  '**[a](https://x.y)**', '**b [a](https://x.y)**', '# **a**', '-# **a**', '-# *a* b', '-# a **b**', '## ***a***', 'x -# ***a*** y',
  '> ***a***', '- ***a***', '***a** b*', '***a* b**', '*a **b***', '****a****', '_**a**_', '**_a_**', '__**a**__', '~~**a**~~'];

function corpus(): string[] {
  const r = rng(20261122);
  const out = new Set<string>(FIXED);
  while (out.size < 6000) {
    const n = 1 + Math.floor(r() * 9);
    let s = '';
    for (let i = 0; i < n; i++) s += TOKENS[Math.floor(r() * TOKENS.length)];
    out.add(s);
  }
  return [...out];
}

const PARSERS = [
  ['parseContent', markdown.interactive.parseContent, false],
  ['parseEmbedTitle', markdown.interactive.parseEmbedTitle, true],
  ['parseEmbedField', markdown.interactive.parseEmbedField, true],
] as const;

it('writes the decorator ranges for the corpus', () => {
  const rows: unknown[] = [];
  for (const text of (process.env.PROBE_INPUTS ? JSON.parse(process.env.PROBE_INPUTS) as string[] : corpus())) {
    for (const [name, parser, isEmbed] of PARSERS) {
      for (const mounted of [true, false]) {
        const editor = createEditor();
        const span = { type: 'span', text } as unknown as Text;
        editor.children = [{
          type: 'div', lang: '', startCodeBlock: false, children: [span],
        } as unknown as Descendant];
        let ranges: unknown;
        try {
          ranges = decorator(editor, mounted, isEmbed, parser)([span, [0, 0]]).map((range) => [
            range.anchor.offset, range.focus.offset, Boolean(range.syntax), [...(range.classNames as string[])].sort().join(','),
          ]);
        } catch (e) {
          ranges = `THROW ${(e as Error).message}`;
        }
        const types = new Set<string>();
        const visit = (n: unknown): void => {
          if (Array.isArray(n)) { n.forEach(visit); return; }
          if (n && typeof n === 'object') {
            types.add(String((n as { type?: unknown }).type));
            visit((n as { content?: unknown }).content);
          }
        };
        visit(parser(text, { inCodeBlock: false, mounted, isEmbed }));
        rows.push({
          text, parser: name, mounted, ranges, types: [...types].sort(),
        });
      }
    }
  }
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(rows));
});
