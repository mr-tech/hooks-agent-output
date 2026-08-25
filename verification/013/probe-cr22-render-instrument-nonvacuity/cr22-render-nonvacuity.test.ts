/**
 * CR22 — code-review re-attack of QA's adopted render instrument (F-QA23), from first principles.
 *
 * Steering flagged a PROVENANCE gap: the behavioural gate for CodeMessageNotice rests on QA's
 * mutant execution; the implementer only READ QA's logs. My gate must not inherit that. This probe
 * re-establishes, by MY OWN execution, that the render-by-function-call technique QA's instrument
 * uses actually DISCRIMINATES — i.e. it kills the two mutants QA named (never-render, empty-box)
 * and a styling mutant, while passing on the REAL shipped component.
 *
 * No production source is touched. The real component is imported (control); the mutants are inline
 * functions of the SAME shape run through a byte-copy of the instrument's render()/text() helpers.
 */
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
const mockUseMessage = vi.fn();
vi.mock('~/providers/MessageProvider', () => ({ useMessage: () => mockUseMessage() }));

import NullableComponent from '~/components/NullableComponent';
import CodeMessageNotice from '~/app/message/m/[id]/_layout/CodeMessageNotice';

// EXACT copy of the instrument's helpers (technique under test).
function render(el: any): any {
  if (el === null || el === undefined || typeof el === 'boolean') return null;
  if (typeof el === 'string' || typeof el === 'number') return String(el);
  if (Array.isArray(el)) return el.map(render).filter((x) => x !== null);
  if (typeof el.type === 'function') return render(el.type(el.props));
  return { tag: el.type, className: el.props?.className, children: render(el.props?.children) };
}
function text(node: any): string {
  if (node === null) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(text).join('');
  return text(node.children);
}
const NOTICE = 'Not carried: Thumbnail. Discord does not support these on hooks.gg.';

// The two assertions the instrument rests CodeMessageNotice on, as a reusable oracle.
function assertRealNoticeBehaviour(Comp: (p: any) => any) {
  mockUseMessage.mockReturnValue({ codeMessageDroppedNotice: NOTICE });
  const out = render(Comp({}));
  expect(out).not.toBe(null);          // renders something
  expect(text(out)).toBe(NOTICE);      // renders the notice TEXT
  expect(out.className).toContain('text-warning'); // carries the styling hook
}

describe('CONTROL — the real shipped CodeMessageNotice satisfies the oracle', () => {
  it('passes the instrument oracle under my own execution', () => {
    expect(() => assertRealNoticeBehaviour(CodeMessageNotice as any)).not.toThrow();
  });
});

describe('MUTANTS — the oracle must FAIL on each, or the instrument is vacuous', () => {
  // M-NR: never renders (NullableComponent with a falsy show) — QA's "notice never renders".
  const MutantNeverRender = () => render(
    NullableComponent({ show: null,
      children: { type: 'div', props: { className: 'text-warning', children: NOTICE } } } as any),
  ) && null;
  // Model faithfully: component whose show is hard-nulled -> returns null.
  const NeverRender = () => NullableComponent({ show: null,
    children: { type: 'div', props: { className: 'text-warning', children: NOTICE } } } as any);

  // M-EB: renders the box but empty (notice not interpolated) — QA's "renders empty box".
  const EmptyBox = () => NullableComponent({ show: NOTICE,
    children: { type: 'div', props: { className: 'text-warning', children: '' } } } as any);

  // M-UNSTYLED: renders the text but drops the styling hook.
  const Unstyled = () => NullableComponent({ show: NOTICE,
    children: { type: 'div', props: { className: 'px-4', children: NOTICE } } } as any);

  it('never-render mutant is KILLED', () => {
    expect(() => assertRealNoticeBehaviour(NeverRender)).toThrow();
  });
  it('empty-box mutant is KILLED', () => {
    expect(() => assertRealNoticeBehaviour(EmptyBox)).toThrow();
  });
  it('unstyled mutant is KILLED', () => {
    expect(() => assertRealNoticeBehaviour(Unstyled)).toThrow();
  });
  void MutantNeverRender;
});
