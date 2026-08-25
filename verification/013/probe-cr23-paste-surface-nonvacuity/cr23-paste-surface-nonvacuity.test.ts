/**
 * CR23 — code-review re-attack of QA's adopted paste-surface instrument (F-QA28), from first
 * principles. The paste surface (NewMessageJsonInput.settledNotice) is the site I named at round 20
 * as the OPEN residue. QA withdrew its "unreachable" claim and built an instrument. I do not inherit
 * its discrimination: this replays the same mocks against the REAL component (control) and against
 * two source mutants of that component (copies — the shared tree is untouched), and asserts the
 * instrument's own checks KILL them.
 *
 * The novel risk in this technique is the POSITIONAL useState mock. I verified against the real
 * source that useCopyToClipboard/useCodeMirror/useUpdateEffect are mocked to consume no useState
 * slot, so the order is exactly [json,error,dropped,pending,dismissed,settled] = indices 0..5, and
 * the guard at line 166 reads index1(error) and index5(settledNotice). This probe confirms the
 * injection actually drives the real guard by watching the mutants die.
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
  return { ...actual, useState: (init: unknown) => {
    const v = stateIdx < stateVals.length ? stateVals[stateIdx] : init;
    stateIdx += 1; return [v, () => {}];
  } };
});

import Real from '~/app/message/_components/NewMessageJsonInput';
import MutantNeverRender from './MutantNeverRender';
import MutantDropError from './MutantDropErrorConjunct';

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
function paste(Comp: any, opts: { error?: null | string; settled?: null | string }) {
  stateVals = ['{}', opts.error ?? null, [], null, null, opts.settled ?? null];
  stateIdx = 0;
  return render((Comp as any)({ setMessage: () => {} }));
}
// The instrument's own oracle, as a reusable throwing predicate.
function oracle(Comp: any) {
  expect(text(paste(Comp, { settled: NOTICE }))).toContain(NOTICE);                 // renders
  expect(text(paste(Comp, {}))).not.toContain(NOTICE);                              // no stale box
  expect(text(paste(Comp, { error: 'bad json', settled: NOTICE }))).not.toContain(NOTICE); // suppress on error
  expect(JSON.stringify(paste(Comp, { settled: NOTICE }))).toContain('text-warning'); // styled
}

describe('CONTROL — the REAL NewMessageJsonInput passes the instrument oracle', () => {
  it('passes under my own execution', () => {
    expect(() => oracle(Real)).not.toThrow();
  });
});

describe('MUTANTS at the real render site — the oracle must FAIL on each', () => {
  it('never-render (show={false}) is KILLED', () => {
    expect(() => oracle(MutantNeverRender)).toThrow();
  });
  it('drop-!error-conjunct (show={settledNotice}) is KILLED by the suppress-on-error check', () => {
    // This mutant renders even when error is set; the third oracle line must catch it.
    expect(() => oracle(MutantDropError)).toThrow();
  });
});
