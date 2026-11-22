// Grammar oracle for code review of fix-decorator-offsets: generates markdown trees, serialises them, and derives the
// expected rendering of every character from the generated tree (never from the decorator). Renders each string through
// the tree's real decorator and Slate's Text.decorations, and writes expected and received per character to ORACLE_OUT.
import { writeFileSync } from 'node:fs';

import { createEditor, Text } from 'slate';
import { it, vi } from 'vitest';

import decorator from '../decorator';

import type { Descendant } from 'slate';

import markdown from '~/utils/markdown';

vi.mock('~/env.mjs', () => ({ env: {} }));

type Char = { ch: string, syntax: boolean, classes: string[], linkOnly?: boolean };

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s ^ (s >>> 15), 0x2c1b3c6d) + 0x6d2b79f5) >>> 0;
    s ^= s >>> 12;
    return (s >>> 0) / 4294967296;
  };
}

const EMPHASIS: [string, string][] = [['**', 'strongText'], ['*', 'emText'], ['__', 'uText'], ['~~', 'sText'], ['||', 'spoilerText']];

function lit(text: string, syntax: boolean, classes: string[], extra: Partial<Char> = {}): Char[] {
  return [...text].map((ch) => ({ ch, syntax, classes, ...extra }));
}

function gen(r: () => number, depth: number, enclosing: string[], used: Set<string>): Char[] {
  const pick = r();
  const words = ['a', 'b', 'cd', 'abc'];
  if (depth <= 0 || pick < 0.25) return lit(words[Math.floor(r() * words.length)], false, enclosing);
  if (pick < 0.32) return lit('https://x.y', false, [...enclosing, 'linkText']);
  if (pick < 0.38) return [...lit('<', true, []), ...lit('https://x.y', false, [...enclosing, 'linkText']), ...lit('>', true, [])];
  if (pick < 0.45) {
    return [...lit('[', true, []), ...lit(words[Math.floor(r() * 4)], false, [...enclosing, 'linkText']), ...lit('](', true, []),
      ...lit('https://x.y', false, ['linkText'], { linkOnly: true }), ...lit(')', true, [])];
  }
  if (pick < 0.50) return lit('<@123>', false, enclosing);
  if (pick < 0.54) return lit('\\*', false, enclosing);
  if (pick < 0.58) return lit('`c`', false, [...enclosing, 'inlineCodeText']);
  const free = EMPHASIS.filter(([d]) => !used.has(d));
  if (!free.length) return lit('a', false, enclosing);
  const [delim, cls] = free[Math.floor(r() * free.length)];
  const inner = [...enclosing, cls];
  const nextUsed = new Set([...used, delim]);
  if (delim === '**') nextUsed.add('*');
  if (delim === '*') nextUsed.add('**');
  const n = 1 + Math.floor(r() * 3);
  const kids: Char[] = [];
  for (let i = 0; i < n; i++) {
    if (i) kids.push(...lit(' ', false, inner));
    kids.push(...gen(r, depth - 1, inner, nextUsed));
  }
  return [...lit(delim, true, []), ...kids, ...lit(delim, true, [])];
}

function corpus(): Char[][] {
  const r = rng(424242);
  const out: Char[][] = [];
  const seen = new Set<string>();
  while (out.length < 4000) {
    const chars: Char[] = [];
    if (r() < 0.2) chars.push(...lit('# ', true, []));
    const n = 1 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      if (i) chars.push(...lit(' ', false, []));
      chars.push(...gen(r, 3, [], new Set()));
    }
    const text = chars.map((c) => c.ch).join('');
    if (seen.has(text)) continue;
    seen.add(text);
    out.push(chars);
  }
  return out;
}

function render(text: string, parser: typeof markdown.interactive.parseContent, isEmbed: boolean) {
  const editor = createEditor();
  const span = { type: 'span', text } as unknown as Text;
  editor.children = [{ type: 'div', lang: '', startCodeBlock: false, children: [span] } as unknown as Descendant];
  const ranges = decorator(editor, true, isEmbed, parser)([span, [0, 0]]);
  const perChar: { syntax: boolean, classes: string[] }[] = [];
  for (const { leaf } of Text.decorations(span, ranges)) {
    const l = leaf as Text & { syntax?: boolean, classNames?: string[] };
    for (const _ of leaf.text) perChar.push({ syntax: Boolean(l.syntax), classes: [...new Set(l.classNames ?? [])].sort() });
  }
  return perChar;
}

it('writes expected and received rendering for the grammar corpus', () => {
  const rows: unknown[] = [];
  for (const chars of corpus()) {
    const text = chars.map((c) => c.ch).join('');
    for (const [name, parser, isEmbed] of [
      ['content', markdown.interactive.parseContent, false],
      ['field', markdown.interactive.parseEmbedField, true],
    ] as const) {
      if (name === 'field' && text.startsWith('# ')) continue;
      let got: unknown;
      try {
        got = render(text, parser, isEmbed);
      } catch (e) {
        got = `THROW ${(e as Error).message}`;
      }
      rows.push({
        text, parser: name, expected: chars.map((c) => ({ syntax: c.syntax, classes: [...new Set(c.classes)].sort(), linkOnly: c.linkOnly })), got,
      });
    }
  }
  writeFileSync(process.env.ORACLE_OUT as string, JSON.stringify(rows));
});
