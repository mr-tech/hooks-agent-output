// QA probe (not a suite test): does a Unicode emoji the content parser's pre-transform rewrites ever sit in a
// text leaf of a mounted SlateEditor, and how does the text after it colour? Copied into an export at
// src/components/SlateEditor/__tests__/ and run there; prints one JSON line per case for the QA record.
import { appendFileSync } from 'fs';
import { act } from 'react';
import { Editor, Text, Transforms } from 'slate';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';

import type { ReactNode } from 'react';
import type { Editor as SlateEditorType } from 'slate';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';
import { EmojiPickerContext, useEmojiPicker } from '~/components/EmojiPicker/utils';
import SlateEditor from '~/components/SlateEditor';
import { decorator } from '~/components/SlateEditor/utils';
import { translateSurrogatesToInlineEmoji } from '~/utils/markdown/emoji';
import markdown from '~/utils/markdown';
import MarkdownProvider from '~/providers/MarkdownProvider';

vi.mock('~/env.mjs', () => ({ env: {} }));

const captured = vi.hoisted(() => ({ editor: null as null | SlateEditorType }));
vi.mock('slate-react', async (importOriginal) => {
  const real = await importOriginal<typeof import('slate-react')>();
  return {
    ...real,
    withReact: (<T extends SlateEditorType>(e: T) => {
      const editor = real.withReact(e);
      captured.editor = editor;
      return editor;
    }) as typeof real.withReact,
  };
});

const PickerState = ({ children }: { children: ReactNode }) => (
  <EmojiPickerContext.Provider value={useEmojiPicker()}>{children}</EmojiPickerContext.Provider>
);

afterEach(() => {
  unmountDom();
  captured.editor = null;
});

const mount = (initialValue: string) => {
  const host = mountDom(
    <MarkdownProvider passthrough={markdown}>
      <PickerState>
      <SlateEditor
        aria-label='probe'
        initialValue={initialValue}
        onChange={() => {}}
        emojiParser={markdown.interactive.parseEmoji}
        contentParser={markdown.interactive.parseContent}
      />
      </PickerState>
    </MarkdownProvider>,
  );
  if (!captured.editor) throw new Error('editor not captured');
  return { host, editor: captured.editor };
};

const report = (label: string, host: HTMLElement, editor: SlateEditorType) => {
  const decorate = decorator(editor, true, false, markdown.interactive.parseContent);
  const leaves = Array.from(Editor.nodes(editor, { at: [], match: Text.isText }), ([n, p]) => ({
    path: p,
    text: n.text,
    rewritten: translateSurrogatesToInlineEmoji(n.text) !== n.text,
    decorated: Text.decorations(n, decorate([n, p])).map(({ leaf }) => {
      const { syntax: isSyntax, classNames } = leaf as Text & { syntax?: boolean, classNames?: string[] };
      const tag = [isSyntax ? 'S' : '', ...[...(classNames ?? [])].sort()].filter(Boolean).join('+');
      return `${JSON.stringify(leaf.text)}:${tag || '-'}`;
    }).join(' '),
  }));
  const elements = editor.children.map((c) => (c as { children: { type?: string }[] }).children.map((x) => x.type ?? 'text'));
  const dom = Array.from(host.querySelectorAll('[data-slate-leaf]')).map((el) => `${JSON.stringify(el.textContent)}:${el.className || '-'}`);
  const row = { label, elements, leaves, dom: dom.join(' ') };
  appendFileSync(process.env.QA_OUT as string, `${JSON.stringify(row)}\n`);
  return row;
};

const CASES = ['🙂 **a**', '\\🙂 **a**', '**🙂 a**', '`🙂` **a**'];

describe('mounted editor holding an emoji before formatting', () => {
  for (const text of CASES) {
    it(`initial value ${JSON.stringify(text)}`, () => {
      const { host, editor } = mount(text);
      const row = report(`initial ${text}`, host, editor);
      expect(row.leaves.length).toBeGreaterThan(0);
    });

    it(`typed ${JSON.stringify(text)}`, () => {
      const { host, editor } = mount('');
      act(() => {
        Transforms.select(editor, Editor.end(editor, []));
        editor.insertText(text);
      });
      const row = report(`typed ${text}`, host, editor);
      expect(row.leaves.length).toBeGreaterThan(0);
    });
  }

  for (const parts of [['🙂', ' ', '*', '*', 'a', '*', '*'], ['\\', '🙂', ' **a**'], ['x🙂 abcdefghijklmnopq']]) {
    it(`typed in steps ${JSON.stringify(parts)}`, () => {
      const { host, editor } = mount('');
      act(() => { Transforms.select(editor, Editor.end(editor, [])); });
      for (const part of parts) {
        act(() => {
          Transforms.select(editor, Editor.end(editor, []));
          editor.insertText(part);
        });
      }
      const row = report(`steps ${JSON.stringify(parts)}`, host, editor);
      expect(row.leaves.length).toBeGreaterThan(0);
    });
  }

  it('fenced code block element shapes', () => {
    const { host, editor } = mount('a\n```js\nconst a = 1;\n```\nb');
    const shapes = editor.children.map((c) => {
      const e = c as unknown as { type: string, lang: string, startCodeBlock: boolean };
      return { type: e.type, lang: e.lang, startCodeBlock: e.startCodeBlock };
    });
    appendFileSync(process.env.QA_OUT as string, `${JSON.stringify({ label: 'code block shapes', shapes })}\n`);
    report('code block', host, editor);
    expect(shapes.length).toBe(5);
  });

  it('control: a plain bold line renders its syntax and bold classes', () => {
    const { host, editor } = mount('x **a**');
    const row = report('control x **a**', host, editor);
    expect(row.dom).toContain('"a":strongText');
  });
});
