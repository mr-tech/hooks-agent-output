// QA instrument (not a suite test): code lines split by two emoji elements, or by a custom Discord emoji element. Each text
// node is decorated as the editor does; the expectation is highlight.js over the line's flattened text (each emoji element at
// its parsed content, the text the editor sends), sliced to the node's own span. Writes per-row counts to MULTI_OUT.
import { writeFileSync } from 'node:fs';

import hljs from 'highlight.js';
import { createEditor, Text } from 'slate';
import { expect, it, vi } from 'vitest';

import decorator from '../decorator';

import type { Descendant } from 'slate';

import markdown from '~/utils/markdown';

vi.mock('~/env.mjs', () => ({ env: {} }));

const emoji = (src: string) => ({
  type: 'emoji', lang: '', startCodeBlock: false, empty: false,
  ast: markdown.interactive.parseEmoji(src)[0], children: [{ type: 'span', text: '' }],
});

const LINES: [string, (string | ReturnType<typeof emoji>)[]][] = [
  ['js', ['const s = "a ', emoji(':smile:'), ' b ', emoji(':smile:'), ' c";']],
  ['js', ['f(`t ', emoji(':smile:'), ' ${y} ', emoji(':smile:'), '`);']],
  ['js', ['const s = "a ', emoji('<:e:1>'), ' b";']],
  ['python', ['print("x ', emoji('<a:e:1>'), ' y ', emoji(':smile:'), ' z")']],
  ['js', ['// c ', emoji('<:e:1>'), ' d ', emoji('<:e:1>'), ' e']],
];

function expectedFor(text: string, lang: string): string[] {
  const out: string[] = []; const stack: string[] = [];
  const cls = (s: string) => { let pad = 0; return s.split('.').map((n) => n + '_'.repeat(pad++)).join(' '); };
  const walk = (node: unknown) => {
    if (typeof node === 'string') { for (let i = 0; i < node.length; i += 1) out.push(stack.filter(Boolean).map((s) => `hljs-${cls(s)}`).sort().join('+')); return; }
    const n = node as { scope?: string, children: unknown[] };
    stack.push(n.scope ?? ''); n.children.forEach(walk); stack.pop();
  };
  (hljs.highlight(text, { language: lang, ignoreIllegals: true })._emitter as unknown as { rootNode: { children: unknown[] } }).rootNode.children.forEach(walk);
  return out;
}

it('writes multi-split code-line rows', () => {
  const rows = LINES.map(([lang, parts]) => {
    const children = parts.map((p) => (typeof p === 'string' ? { type: 'span', text: p } : p));
    const editor = createEditor();
    editor.children = [{ type: 'codeBlock', lang, startCodeBlock: true, children } as unknown as Descendant];
    const flat = children.map((c) => ('text' in c ? c.text : (c.ast as { content: string }).content)).join('');
    const expected = expectedFor(flat, lang);
    let at = 0; let right = 0; let total = 0; const wrong: string[] = [];
    children.forEach((c, i) => {
      if (!('text' in c)) { at += (c.ast as { content: string }).content.length; return; }
      const span = c as unknown as Text;
      const ranges = decorator(editor, true, false, markdown.interactive.parseContent)([span, [0, i]]);
      let k = 0;
      for (const { leaf } of Text.decorations(span, ranges)) {
        const l = leaf as Text & { syntax?: boolean, classNames?: string[] };
        const got = l.syntax ? 'S' : [...(l.classNames ?? [])].sort().join('+');
        for (let j = 0; j < l.text.length; j += 1) {
          total += 1;
          if (got === expected[at + k]) right += 1; else wrong.push(`${JSON.stringify(c.text[k])}@${at + k}:${got}≠${expected[at + k]}`);
          k += 1;
        }
      }
      at += c.text.length;
    });
    return { lang, flat, total, right, wrong };
  });
  writeFileSync(process.env.MULTI_OUT as string, JSON.stringify(rows, null, 1));
  expect(rows.length).toBe(LINES.length);
});
