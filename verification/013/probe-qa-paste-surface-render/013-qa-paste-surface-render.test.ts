/**
 * QA instrument — paste surface render path (BC-18's instrument-closable half).
 *
 * SUPERSEDES this pass's own earlier conclusion. The first QA pass at `abcf585` recorded the paste
 * surface as UNREACHABLE without a DOM harness, on the evidence that `NewMessageJsonInput` throws at
 * its second hook (`useCopyToClipboard` -> `useRef`, React's dispatcher being null outside a
 * renderer). That evidence was real but the conclusion drawn from it was too strong: mocking the
 * three custom hooks makes the `useState` order deterministic and the component callable. The
 * earlier claim is withdrawn by execution, not by argument.
 *
 * D28 COMPLIANCE unchanged: no jsdom, no happy-dom, no @testing-library/react, no vitest.config.ts
 * change. Function-call rendering only.
 */
import { describe, expect, it, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/utils/hooks/useCopyToClipboard', () => ({ default: () => [null, () => {}] }));
vi.mock('~/utils/hooks/useCodeMirror', () => ({ default: () => ({ ref: { current: null }, updateDoc: () => {} }) }));
vi.mock('react-use', () => ({ useUpdateEffect: () => {} }));

let stateVals: unknown[] = [];
let stateIdx = 0;
vi.mock('react', async (orig) => {
  const actual = await orig<typeof import('react')>();
  return {
    ...actual,
    useState: (init: unknown) => {
      const v = stateIdx < stateVals.length ? stateVals[stateIdx] : init;
      stateIdx += 1;
      return [v, () => {}];
    },
  };
});

import NewMessageJsonInput from '~/app/message/_components/NewMessageJsonInput';

function render(el: any): any {
  if (el === null || el === undefined || typeof el === 'boolean') return null;
  if (typeof el === 'string' || typeof el === 'number') return String(el);
  if (Array.isArray(el)) return el.map(render).filter((x) => x !== null);
  if (typeof el.type === 'function') return render(el.type(el.props));
  return { tag: el.type, className: el.props?.className, children: render(el.props?.children) };
}
function text(n: any): string {
  if (n === null) return '';
  if (typeof n === 'string') return n;
  if (Array.isArray(n)) return n.map(text).join('');
  return text(n.children);
}

const NOTICE = 'QA-ROW-D-SETTLED-NOTICE';

/** useState call order in NewMessageJsonInput: json, error, dropped, pending, dismissed, settled. */
function renderPaste(opts: { error?: null | string; settled?: null | string }) {
  stateVals = ['{}', opts.error ?? null, [], null, null, opts.settled ?? null];
  stateIdx = 0;
  return render((NewMessageJsonInput as any)({ setMessage: () => {} }));
}

describe('paste surface — the site the owner ruling actually named — renders its settled notice', () => {
  it('RENDERS the settled notice text when there is one and no error', () => {
    expect(text(renderPaste({ settled: NOTICE }))).toContain(NOTICE);
  });

  it('does NOT render it when there is no notice (no stale/blank warning box)', () => {
    expect(text(renderPaste({}))).not.toContain(NOTICE);
  });

  it('SUPPRESSES it when an error is showing — the `!error` conjunct is the sole carrier here', () => {
    expect(text(renderPaste({ error: 'bad json', settled: NOTICE }))).not.toContain(NOTICE);
  });

  it('the notice is styled as a warning, not rendered bare', () => {
    const json = JSON.stringify(renderPaste({ settled: NOTICE }));
    expect(json).toContain('text-warning');
  });

  it('CLEARS: notice present then absent leaves nothing behind', () => {
    expect(text(renderPaste({ settled: NOTICE }))).toContain(NOTICE);
    expect(text(renderPaste({ settled: null }))).not.toContain(NOTICE);
  });
});
