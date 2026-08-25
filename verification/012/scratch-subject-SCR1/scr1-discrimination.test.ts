/**
 * SCR-1 — the scratch subject that re-specified register rows QA-R4 and QA-R15 name.
 *
 * Purpose: prove, by execution against the shipped predicate and the shipped mode-switch
 * functions, that the SCR-1 payload discriminates the thing the rows exist to detect and
 * nothing else. Every expectation below is stated as an independent fact of the domain --
 * no expectation is computed by calling the code under test, and no quantity under test is
 * injected as an argument.
 *
 * Anchor: website a74b9e2 (released chain-013 tree -- the tree the deployed composer runs).
 */
import { describe, expect, it } from 'vitest';

import { IS_COMPONENTS_V2_FLAG } from '~/constants/messageLimits';
import { validateMessage } from '~/utils/limits';
import { applyModeSwitch, detectMessageMode, isMessageV2 } from '~/utils/messageMode';

/** The literal reason string, written out rather than imported (F-QA13: key on the reason). */
const V2_EXCLUSIVITY = 'Components V2 messages cannot contain embeds or content.';

/** SCR-1, exactly as the register rows specify it. Row-D / cell-B5 shape (5712's shape). */
const SCR1 = {
  username: 'QA Scratch',
  content: 'QA-R4/QA-R15 scratch subject - safe to delete.',
  embeds: [],
  components: [],
  flags: IS_COMPONENTS_V2_FLAG,
} as never;

const withFlags = (flags: number) => ({ ...(SCR1 as object), flags } as never);

describe('SCR-1 is refused for the mutual-exclusivity reason and no other', () => {
  it('is refused, and the reason names V2/content mutual exclusivity', () => {
    expect(validateMessage(SCR1)).toBe(V2_EXCLUSIVITY);
  });

  it('SOLE-CARRIER CONTROL: clearing only the V2 bit makes it fully sendable', () => {
    // If this returns any non-empty string, SCR-1 fails a SECOND check as well and
    // QA-R4 would pass vacuously on a record that is broken for an unrelated reason.
    expect(validateMessage(withFlags(0))).toBe('');
  });
});

describe('SCR-1 opens in V2 mode -- QA-R4 precondition', () => {
  it('is detected as V2 by the flag alone (it carries no V2-typed component)', () => {
    expect(isMessageV2(SCR1)).toBe(true);
    expect(detectMessageMode({ data: SCR1 } as never)).toBe('v2');
  });
});

describe('D11 end state on SCR-1 -- QA-R15 predicted value', () => {
  const switched = applyModeSwitch('classic', SCR1) as {
    flags: number; content: string; embeds: unknown[];
  };

  it('clears the V2 bit', () => {
    expect(switched.flags & IS_COMPONENTS_V2_FLAG).toBe(0);
  });

  it('preserves content and embeds byte-for-byte (the guidance claims losslessness)', () => {
    expect(switched.content).toBe('QA-R4/QA-R15 scratch subject - safe to delete.');
    expect(switched.embeds).toEqual([]);
  });

  it('leaves the record sendable', () => {
    expect(validateMessage(switched as never)).toBe('');
  });

  it('clears ONLY that bit -- an unrelated flag survives', () => {
    const twoFlags = applyModeSwitch('classic', withFlags(IS_COMPONENTS_V2_FLAG | 4)) as {
      flags: number;
    };
    expect(twoFlags.flags).toBe(4);
  });
});

describe('QA-R15 flag-free clause is load-bearing, not decoration', () => {
  it('CONFOUNDER: rebuilding as a genuine V2 message is also sendable but KEEPS the bit', () => {
    // This is the pre-D11 path QA-R15's original wording was corrected to exclude:
    // delete the content, add a Text Display (type 10). Send becomes enabled either way.
    const rebuilt = {
      username: 'QA Scratch',
      content: '',
      embeds: [],
      components: [{ type: 10, content: 'hello' }],
      flags: IS_COMPONENTS_V2_FLAG,
    } as never;
    expect(validateMessage(rebuilt)).toBe('');
    expect((rebuilt as { flags: number }).flags & IS_COMPONENTS_V2_FLAG)
      .toBe(IS_COMPONENTS_V2_FLAG);
    // => "Send is enabled" alone does NOT discriminate. Only the persisted flag does.
  });
});
