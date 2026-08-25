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
import CodeMessageNotice from '~/app/message/m/[id]/_layout/CodeMessageNotice';

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

describe('CodeMessageNotice — does the converted code-import notice actually render?', () => {
  it('renders NOTHING when there is no dropped-components fact', () => {
    mockUseMessage.mockReturnValue({ codeMessageDroppedNotice: null });
    expect(render(CodeMessageNotice({} as any))).toBe(null);
  });

  it('renders the notice TEXT when the fact is present — the behaviour the text-pinning spec cannot see', () => {
    mockUseMessage.mockReturnValue({ codeMessageDroppedNotice: NOTICE });
    const out = render(CodeMessageNotice({} as any));
    expect(out).not.toBe(null);
    expect(text(out)).toBe(NOTICE);
  });

  it('carries a visible styling hook rather than rendering bare/unstyled', () => {
    mockUseMessage.mockReturnValue({ codeMessageDroppedNotice: NOTICE });
    const out = render(CodeMessageNotice({} as any));
    expect(out.tag).toBe('div');
    expect(out.className).toContain('text-warning');
  });

  it('CLEARS when the fact goes away — a persistent notice that cannot clear is its own defect', () => {
    mockUseMessage.mockReturnValue({ codeMessageDroppedNotice: NOTICE });
    expect(render(CodeMessageNotice({} as any))).not.toBe(null);
    mockUseMessage.mockReturnValue({ codeMessageDroppedNotice: null });
    expect(render(CodeMessageNotice({} as any))).toBe(null);
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

/**
 * WHAT THIS CANNOT ESTABLISH — stated so a green run is not mistaken for the whole property.
 *
 *  1. VISIBILITY. This proves an element with `text-warning` is returned. It does not prove the
 *     user sees it: CSS cascade, z-index, `overflow:hidden`, a parent with `display:none`, or
 *     colour-on-colour contrast are all invisible here.
 *  2. PLACEMENT. `layout.tsx` mounts <CodeMessageNotice /> between <Navigation/> and {children}.
 *     That it lands somewhere the eye goes — above the fold, not under a sticky nav — is untested.
 *  3. THE REAL MOUNT. CodeMessageNotice is a 'use client' component inside an async server layout.
 *     This calls the function directly; it does not prove Next.js's server/client boundary hands it
 *     a live MessageProvider context at runtime. A null context would throw in production and pass
 *     here.
 *  4. THE PASTE SURFACE. NewMessageJsonInput's `settledNotice` is NOT covered here: it is local
 *     component state driven by useUpdateEffect, so reaching it needs a hook driver, which needs
 *     the harness D28 rules out. Its render path is asserted only as source text. THIS IS THE
 *     LARGER OF THE TWO GAPS and it is the site the owner's ruling actually named.
 *
 * Items 1-3 and especially 4 are the owner's to close by observation. Falsity signature for the
 * part that reaches him: he pastes a rows-B/D payload into New Message and sees NO persistent
 * warning in the modal (or sees one that never clears when he fixes the JSON).
 */
