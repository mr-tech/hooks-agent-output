/**
 * QA instrument — owner ruling 2026-08-25 (toast vessel), RENDER half.
 *
 * Purpose: close as much of code review's routed "Assumption Not Checked" as an instrument can.
 * That assumption: the shipped spec `013-owner-toast-vessel-2026-08-25.test.ts` pins SOURCE TEXT
 * (readFileSync + toContain) and therefore cannot fail for any behavioural reason. For a UX change
 * whose entire substance is "the notice renders in the surface instead of a toast", that leaves
 * the substance unverified while the suite is green.
 *
 * D28 COMPLIANCE — this instrument adds NO DOM harness. No jsdom, no happy-dom, no
 * @testing-library/react, no change to vitest.config.ts. React function components are plain
 * functions: this calls them and inspects the returned element objects. That is ordinary function
 * testing, not a mounted render, and it is explicitly NOT a substitute for the owner's own
 * observation (see "WHAT THIS CANNOT ESTABLISH" at the foot of this file).
 */
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

const mockUseMessage = vi.fn();
vi.mock('~/providers/MessageProvider', () => ({ useMessage: () => mockUseMessage() }));

// The REAL NullableComponent — its truthiness contract is under test, not stubbed.
import NullableComponent from '~/components/NullableComponent';

/** Evaluate function components until only host elements remain. ~10 lines, no library. */
function render(el: any): any {
  if (el === null || el === undefined || typeof el === 'boolean') return null;
  if (typeof el === 'string' || typeof el === 'number') return String(el);
  if (Array.isArray(el)) return el.map(render).filter((x) => x !== null);
  if (typeof el.type === 'function') return render(el.type(el.props));
  return { tag: el.type, className: el.props?.className, children: render(el.props?.children) };
}

/** All text a subtree would put on screen. */
function text(node: any): string {
  if (node === null) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(text).join('');
  return text(node.children);
}

const NOTICE = 'Not carried: Thumbnail. Discord does not support these on hooks.gg.';

describe('NullableComponent — the render primitive both converted sites depend on', () => {
  // Every conjunct of `!error && settledNotice` is made the sole carrier of the decision.
  it.each([
    ['a non-empty string renders', 'some notice', true],
    ['null does not render', null, false],
    ['undefined does not render', undefined, false],
    ['EMPTY STRING does not render', '', false],
    ['false (the !error conjunct losing) does not render', false, false],
  ])('%s', (_label, show, shouldRender) => {
    const out = render(NullableComponent({ show, children: { type: 'p', props: { children: 'X' } } } as any));
    expect(out === null).toBe(!shouldRender);
  });
});

describe('paste surface guard `!error && settledNotice` — conjunct isolation', () => {
  // The paste surface's component function is NOT reachable here (see trace-paste-surface-unreachable.txt:
  // useCopyToClipboard calls useRef before settledNotice is reached, and React's dispatcher is null
  // outside a renderer). What IS closable is the guard's own logic, enumerated through the real
  // NullableComponent so each conjunct is the sole carrier of the decision in some fixture.
  const guard = (error: null | string, settledNotice: null | string) => render(
    NullableComponent({ show: !error && settledNotice, children: { type: 'p', props: { children: settledNotice } } } as any),
  );

  it('notice present, no error -> RENDERS (only settledNotice carries it)', () => {
    expect(guard(null, 'row D notice')).not.toBe(null);
  });
  it('notice present, error present -> SUPPRESSED (only !error carries it)', () => {
    expect(guard('bad json', 'row D notice')).toBe(null);
  });
  it('no notice, no error -> nothing (only settledNotice carries it)', () => {
    expect(guard(null, null)).toBe(null);
  });
  it('an error must not resurrect a stale notice', () => {
    expect(guard('bad json', null)).toBe(null);
  });
});

