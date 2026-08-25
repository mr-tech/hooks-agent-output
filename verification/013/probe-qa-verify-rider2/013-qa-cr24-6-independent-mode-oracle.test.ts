/**
 * QA verify pass, rider 2 — CR24-6, ruled and closed.
 *
 * THE SEAM THE REVIEWER ROUTED HERE. M9-b's fix computes the confirmation's modes through
 * `settledMode`, which calls `resolveContentLoss` and returns `.mode`. M9-b's own pre-registered
 * spec establishes its expectation through `modeAfterLoad`, which ALSO calls `resolveContentLoss`
 * and returns `.mode`. So a defect inside `resolveContentLoss` moves the code and its oracle
 * together and the suite stays green. The reviewer's Assumption Not Checked is exactly this:
 * "this review assumes `resolveContentLoss` classifies row D correctly and does not test it."
 *
 * WHY THE EXISTING SPEC DOES NOT CLOSE IT. Its header claims its expectations are "not derived
 * from `computeLoadDiff`". That is literally true and NARROWER than the independence it asserts:
 * not deriving from `computeLoadDiff` is not the same as not deriving from `resolveContentLoss`,
 * and `resolveContentLoss` is the function both sides share.
 *
 * WHAT THIS ORACLE DOES INSTEAD. Every expected mode below is a LITERAL, transcribed by QA from
 * D17's five rows as the plan states them in its Objective section, and from nothing else:
 *
 *   "no flag and no V2 components -> Classic, nothing shown; V2 components without the flag and
 *    without content -> V2 with the flag set and a warning; the flag over components within the
 *    schema and no content -> V2, nothing shown; the flag over content or embeds without V2
 *    components -> a warning and Classic (the bit cleared, the body kept); V2 components together
 *    with content or embeds, whatever the flag -> the user chooses Classic or V2"
 *
 * No expectation here is computed. Nothing in this file calls `resolveContentLoss`, `settledMode`,
 * `applyDisposition`, `isMessageV2` or `detectMessageMode`. It drives the REAL shipped
 * `computeLoadDiff` / `describeLoadDiff` and compares against the plan's own prose.
 *
 * NON-VACUITY IS DEMONSTRATED, NOT ASSERTED: see run-mutant-*.txt beside this file. Mutating
 * `resolveContentLoss`'s row-D branch turns this spec red while M9-b's own spec stays green,
 * which is the whole claim.
 */
import { describe, expect, it, vi } from 'vitest';

import { computeLoadDiff, describeLoadDiff } from '~/utils';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const V2_FLAG = 32768;                                   // literal, not imported
const CONTAINER = { type: 17, components: [{ type: 10, content: 'hello' }] };
const ACTION_ROW = { type: 1, components: [] };          // NOT a V2 component type

type Mode = 'classic' | 'v2' | 'choice';

/**
 * The eight cells of (flag bit, V2 components present, classic content present), each with the
 * settled mode WRITTEN OUT from D17's rows above. Transcribed once, by hand, from the plan.
 */
const CELLS: { id: string; draft: Record<string, unknown>; d17Row: string; expected: Mode }[] = [
  { id: 'bit=0 v2=0 classic=0', draft: {},
    d17Row: 'no flag and no V2 components', expected: 'classic' },
  { id: 'bit=0 v2=0 classic=1', draft: { content: 'hi' },
    d17Row: 'no flag and no V2 components', expected: 'classic' },
  { id: 'bit=0 v2=1 classic=0', draft: { components: [CONTAINER] },
    d17Row: 'V2 components without the flag and without content', expected: 'v2' },
  { id: 'bit=0 v2=1 classic=1', draft: { content: 'hi', components: [CONTAINER] },
    d17Row: 'V2 components together with content or embeds', expected: 'choice' },
  { id: 'bit=1 v2=0 classic=0', draft: { flags: V2_FLAG },
    d17Row: 'the flag over components within the schema and no content', expected: 'v2' },
  { id: 'bit=1 v2=0 classic=1', draft: { flags: V2_FLAG, content: 'hi' },
    d17Row: 'the flag over content or embeds without V2 components', expected: 'classic' },
  { id: 'bit=1 v2=1 classic=0', draft: { flags: V2_FLAG, components: [CONTAINER] },
    d17Row: 'the flag over components within the schema and no content', expected: 'v2' },
  { id: 'bit=1 v2=1 classic=1', draft: { flags: V2_FLAG, content: 'hi', components: [CONTAINER] },
    d17Row: 'V2 components together with content or embeds', expected: 'choice' },
];

/** A current message whose own settled mode is unambiguous, so `fromMode` is not under test. */
const CURRENT_CLASSIC = { content: 'existing text' };
const CURRENT_V2 = { flags: V2_FLAG, components: [CONTAINER] };

const COMMITTING = CELLS.filter((c) => c.expected !== 'choice');

describe('CR24-6 — the confirmation names the mode the Load produces, against a literal D17 oracle', () => {
  it.each(COMMITTING.map((c) => [c.id, c] as const))(
    '%s — toMode equals the mode D17 states, not the mode the code computes',
    (_id, cell) => {
      const from = cell.expected === 'v2' ? CURRENT_CLASSIC : CURRENT_V2;
      const diff = computeLoadDiff(from as never, cell.draft as never);
      expect(diff.toMode).toBe(cell.expected);
    },
  );

  it.each(COMMITTING.map((c) => [c.id, c] as const))(
    '%s — the dialog announces a mode change IFF D17 says the mode changes',
    (_id, cell) => {
      for (const [label, current, currentMode] of [
        ['over a Classic message', CURRENT_CLASSIC, 'classic'],
        ['over a V2 message', CURRENT_V2, 'v2'],
      ] as const) {
        const text = describeLoadDiff(computeLoadDiff(current as never, cell.draft as never));
        const announces = /switch from .* to /.test(text);
        const shouldAnnounce = currentMode !== cell.expected;
        expect(announces, `${label}: ${JSON.stringify(text)}`).toBe(shouldAnnounce);
      }
    },
  );

  it('row D over a V2 message announces the switch to Classic, in those words', () => {
    // The 5712/5842 repair sitting. Stated as a literal string, from D17's row-D wording.
    const rowD = { flags: V2_FLAG, content: 'hi' };
    expect(describeLoadDiff(computeLoadDiff(CURRENT_V2 as never, rowD as never)))
      .toContain('switch from Components V2 to Classic');
  });

  it('row D over a Classic message announces NO mode change', () => {
    const rowD = { flags: V2_FLAG, content: 'hi' };
    expect(describeLoadDiff(computeLoadDiff(CURRENT_CLASSIC as never, rowD as never)))
      .not.toMatch(/switch from/);
  });

  // -------------------------------------------------------------------------------------------
  // ROW-E AS THE *CURRENT* MESSAGE. Added 2026-08-25 after code review round 25 (`41ca30b`)
  // established that `settledMode` is applied to BOTH of `computeLoadDiff`'s arguments and that
  // only `incoming` is guarded — `current` is `message?.data`, a stored record, guarded by nothing.
  //
  // The original version of this oracle did NOT cover this: it filtered row E out via COMMITTING
  // (correct — row E never becomes `validatedDraft`) and both its CURRENT_ fixtures were non-row-E.
  // That was a real gap and the reviewer found it, not me.
  //
  // The expected value is a literal from the plan's Objective invariant, not computed:
  //   "a message is Components V2 iff its `flags` carry IS_COMPONENTS_V2_FLAG or its components
  //    include a V2 type"
  // A stored row-E record has V2 components, so it IS V2 — whatever its flag.
  // -------------------------------------------------------------------------------------------
  const ROW_E_STORED_WITH_FLAG = { flags: V2_FLAG, content: 'hi', components: [CONTAINER] };
  const ROW_E_STORED_NO_FLAG = { content: 'hi', components: [CONTAINER] };

  it.each([
    ['row-E stored record, flag set', ROW_E_STORED_WITH_FLAG],
    ['row-E stored record, no flag', ROW_E_STORED_NO_FLAG],
  ])('%s reads as V2 when it is the CURRENT message', (_label, stored) => {
    // Objective invariant: V2 components present -> the message is V2.
    const diff = computeLoadDiff(stored as never, { content: 'hi' } as never);
    expect(diff.fromMode).toBe('v2');
  });

  it('loading a Classic draft over a stored row-E record announces the switch to Classic', () => {
    const text = describeLoadDiff(
      computeLoadDiff(ROW_E_STORED_WITH_FLAG as never, { content: 'hi' } as never),
    );
    expect(text).toContain('switch from Components V2 to Classic');
    expect(text).toContain('remove Container');
  });

  it('loading a V2 draft over a stored row-E record announces NO mode change', () => {
    const text = describeLoadDiff(
      computeLoadDiff(ROW_E_STORED_WITH_FLAG as never, { flags: V2_FLAG, components: [CONTAINER] } as never),
    );
    expect(text).not.toMatch(/switch from/);
  });

  // ---- CONTROLS. These must pass before and after any fix, or the fix over-reached.
  it('CONTROL — a flag-only draft over a Classic message is still a switch TO V2', () => {
    expect(describeLoadDiff(computeLoadDiff(CURRENT_CLASSIC as never, { flags: V2_FLAG } as never)))
      .toContain('switch from Classic to Components V2');
  });

  it('CONTROL — component add/remove is still named, independently of mode', () => {
    const text = describeLoadDiff(computeLoadDiff(
      { flags: V2_FLAG, components: [ACTION_ROW] } as never,
      { flags: V2_FLAG, components: [CONTAINER] } as never,
    ));
    expect(text).toContain('add Container');
    expect(text).toContain('remove Action Row');
  });

  it('CONTROL — an identical draft says only that it overwrites', () => {
    expect(describeLoadDiff(computeLoadDiff(CURRENT_V2 as never, CURRENT_V2 as never)))
      .toBe('This will overwrite the current message.');
  });

  it('this oracle never reaches the function under test', () => {
    const src = require('fs').readFileSync(__filename, 'utf8');
    for (const forbidden of ['resolveContentLoss', 'settledMode', 'applyDisposition',
      'isMessageV2', 'detectMessageMode']) {
      // Only the header may name them; no executable line may call them.
      const calls = src.split('\n')
        .filter((l: string) => !l.trim().startsWith('*') && !l.trim().startsWith('/*'))
        .filter((l: string) => l.includes(`${forbidden}(`));
      expect(calls, `${forbidden} is called on an executable line`).toHaveLength(0);
    }
  });
});
