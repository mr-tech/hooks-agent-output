/**
 * PRE-REGISTERED FAILING SPEC — F-QA29. Written by QA before any fix exists.
 *
 * DO NOT UPDATE THE EXPECTATIONS TO MATCH THE CODE. A disagreement here is a finding, not a
 * stale fixture. These expectations are stated as independent facts of the domain — "the
 * confirmation must name the mode the Load actually produces" — and are NOT derived from
 * computeLoadDiff, which is the function under test.
 *
 * THE DEFECT. `JsonModalBody` computes its Load confirmation as
 *     describeLoadDiff(computeLoadDiff(message?.data ?? {}, validatedDraft))
 * over the RAW validated draft, while `commitLoad` applies `applyDisposition(validatedDraft)` and
 * sets the editor mode from `disposition.mode`. For disposition row D — V2 flag set, classic
 * content present, no V2 components — those disagree: the raw draft is V2 by flag, the Load
 * produces Classic with the flag cleared. The dialog therefore announces
 *     "It will switch from Classic to Components V2."
 * immediately before an irreversible Load that leaves the message Classic.
 *
 * WHY IT MATTERS AND WHO IT REACHES. Row D is the shape of records 5712/5842 — the repair path
 * this chain exists to make safe (F-QA15). The operator following that route is told the opposite
 * of what happens, in the one dialog standing between them and an overwrite. This is BC-1's own
 * clause 2 ("whether the message type changes") failing, found before the operator sitting rather
 * than by it.
 *
 * EXISTING COVERAGE AND WHY IT IS GREEN. `013-m2c-load-diff.test.ts` asserts computeLoadDiff in
 * isolation over fixtures that never carry `content`, so no fixture can express row D and the
 * disagreement is unobservable there. Its flag-only case is row C, which agrees.
 */
import { describe, expect, it, vi } from 'vitest';

import { applyDisposition, computeLoadDiff, describeLoadDiff, resolveContentLoss } from '~/utils';
import { isMessageV2 } from '~/utils/messageMode';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const V2_FLAG = 1 << 15;
const CONTAINER = { type: 17, components: [{ type: 10, content: 'hello' }] };

/** What the Load actually produces — the independent fact the confirmation must agree with. */
function modeAfterLoad(draft: Record<string, unknown>): 'classic' | 'v2' {
  const d = resolveContentLoss(
    draft.flags as number | undefined,
    draft.components as undefined | { type: number }[],
    draft.content as undefined | string,
    draft.embeds as undefined | unknown[],
  );
  return d.requiresChoice ? 'classic' : d.mode;
}

function confirmationFor(current: Record<string, unknown>, incoming: Record<string, unknown>) {
  return describeLoadDiff(computeLoadDiff(current as never, incoming as never));
}

describe('F-QA29 — the Load confirmation must name the mode the Load actually produces', () => {
  const CURRENT_CLASSIC = { content: 'existing text' };
  const CURRENT_V2 = { flags: V2_FLAG, components: [CONTAINER] };

  it('row D over a Classic message: does NOT announce a switch to Components V2', () => {
    const incoming = { content: 'hi', flags: V2_FLAG };
    expect(modeAfterLoad(incoming)).toBe('classic'); // the domain fact, stated first
    expect(confirmationFor(CURRENT_CLASSIC, incoming)).not.toMatch(/to Components V2/);
  });

  it('row D over a Classic message: announces no mode change at all, because there is none', () => {
    const incoming = { content: 'hi', flags: V2_FLAG };
    expect(confirmationFor(CURRENT_CLASSIC, incoming)).not.toMatch(/switch from/);
  });

  it('row D over a V2 message: announces the switch to Classic that actually happens', () => {
    const incoming = { content: 'hi', flags: V2_FLAG };
    expect(modeAfterLoad(incoming)).toBe('classic');
    expect(confirmationFor(CURRENT_V2, incoming)).toMatch(/switch from Components V2 to Classic/);
  });

  it('the flag alone never decides what the dialog says — applyDisposition does', () => {
    const incoming = { content: 'hi', flags: V2_FLAG };
    // The raw draft reads as V2 by flag. That is exactly the trap.
    expect(isMessageV2(incoming as never)).toBe(true);
    expect(modeAfterLoad(incoming)).toBe('classic');
    const applied = applyDisposition(incoming as never) as Record<string, unknown>;
    expect(applied.flags).toBe(0);
  });

  // ---- POSITIVE CONTROLS. Each must PASS both before and after the fix, or the fix over-reached.
  it('CONTROL row B: a genuine Classic -> V2 switch is still announced', () => {
    const incoming = { components: [CONTAINER] };
    expect(modeAfterLoad(incoming)).toBe('v2');
    expect(confirmationFor(CURRENT_CLASSIC, incoming)).toMatch(/switch from Classic to Components V2/);
  });

  it('CONTROL row C: flag + components over Classic is still announced as a switch to V2', () => {
    const incoming = { flags: V2_FLAG, components: [CONTAINER] };
    expect(modeAfterLoad(incoming)).toBe('v2');
    expect(confirmationFor(CURRENT_CLASSIC, incoming)).toMatch(/switch from Classic to Components V2/);
  });

  it('CONTROL: added and removed component types are still named', () => {
    const incoming = { flags: V2_FLAG, components: [CONTAINER] };
    const text = confirmationFor({ flags: V2_FLAG, components: [{ type: 1, components: [] }] }, incoming);
    expect(text).toMatch(/add Container/);
    expect(text).toMatch(/remove Action Row/);
  });

  it('CONTROL: an identical draft still says only that it overwrites', () => {
    expect(confirmationFor(CURRENT_V2, { flags: V2_FLAG, components: [CONTAINER] }))
      .toBe('This will overwrite the current message.');
  });
});
