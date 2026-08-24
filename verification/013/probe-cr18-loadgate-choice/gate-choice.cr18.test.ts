import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { discordMessageImportShape } from '~/server/api/utils/shapes';
import {
  applyDisposition, resolveContentLoss, validateContentRequirements,
} from '~/utils';

/**
 * CR18 — round-16 M4-c: JsonModalBody's Load button now reads
 *   isDisabled = !!error || !isValid || !!contentFloorError
 * where contentFloorError = validateContentRequirements(validatedDraft), and
 * validatedDraft is the UN-resolved discordMessageImportShape.parse(raw).
 *
 * The inline row-E choice flow (commitSettled -> setPendingChoice -> commitChoice)
 * is reached ONLY through the Load button's onConfirm. This probe executes the
 * REAL functions to test whether M4-c's added `|| !!contentFloorError` clause
 * makes that choice flow unreachable.
 *
 * Two row-E predicates are in play, and they DISAGREE on the flag:
 *   resolveContentLoss.requiresChoice : hasV2Components(structural) && hasClassicContent
 *   validateContentRequirements error : (structuralV2 || flagV2) && (content||embeds)
 * The gate predicate is a SUPERSET of the choice predicate, so every draft that
 * requiresChoice also trips the gate.
 */

const CONTAINER = (t: string) => ({ type: 17, components: [{ type: 10, content: t }] });

// Faithful models of the JsonModalBody surface at e61e602 -----------------
function parse(raw: any) {
  return discordMessageImportShape.parse(raw) as any; // sets validatedDraft, isValid=true, error=null
}
// M4-c gate (the tree under review):
function loadDisabled_M4c(raw: any): boolean {
  const validatedDraft = parse(raw);
  const contentFloorError = validatedDraft ? validateContentRequirements(validatedDraft) : undefined;
  return !!contentFloorError; // error=null, isValid=true for a parseable raw
}
// Parent gate (e61e602~1) — the CONTROL:
function loadDisabled_parent(raw: any): boolean {
  parse(raw); // isValid=true, error=null
  return false; // !!error || !isValid  ==  false for a parseable raw
}
// Does the disposition system WANT to show the inline choice for this draft?
function choiceWanted(raw: any): boolean {
  const v = parse(raw);
  return resolveContentLoss(
    v.flags as number | undefined,
    v.components as undefined | { type: number }[],
    v.content,
    v.embeds,
  ).requiresChoice;
}

const ROW_E = { flags: 32768, content: 'hello there', components: [CONTAINER('body')] };
const ROW_D = { flags: 32768, content: 'just classic text' };          // flag + content, no structural V2
const ROW_B = { components: [CONTAINER('only v2')] };                    // structural V2, no content
const ROW_A = { content: 'plain classic' };                             // classic only
const EMPTY = { flags: 32768 };                                         // nothing to show

describe('CR18-A — a genuine row-E paste: the choice is WANTED but the Load button is DISABLED', () => {
  it('resolveContentLoss wants the choice', () => {
    expect(choiceWanted(ROW_E)).toBe(true);
  });
  it('M4-c disables Load on exactly that draft -> commitSettled/pendingChoice unreachable', () => {
    expect(loadDisabled_M4c(ROW_E)).toBe(true);
  });
  it('CONTROL: the parent gate left it ENABLED, so the choice flow used to be reachable', () => {
    expect(loadDisabled_parent(ROW_E)).toBe(false);
  });
});

describe('CR18-B — SUPERSET: every draft that requiresChoice is disabled by the M4-c gate', () => {
  const CORPUS = [
    ROW_E,
    { content: 'x', components: [CONTAINER('y')] },                     // structural V2 + content, no flag
    { flags: 32768, embeds: [{ title: 'real embed' }], components: [CONTAINER('y')] }, // V2 + embed
    { components: [{ type: 9, components: [{ type: 10, content: 'sec' }], accessory: { type: 11, media: { url: 'https://e.com/a.png' } } }], content: 'hi' }, // section + content
  ];
  CORPUS.forEach((raw, i) => {
    it(`corpus[${i}]: requiresChoice === (gate disables) — the choice can never be reached`, () => {
      const wanted = choiceWanted(raw);
      const disabled = loadDisabled_M4c(raw);
      // The implication we care about: wanted => disabled.
      if (wanted) expect(disabled).toBe(true);
    });
  });
});

describe('CR18-C — collateral: row D (flag+content, cleanly resolvable) is also blocked', () => {
  it('resolveContentLoss SETTLES row D to classic with no choice', () => {
    expect(choiceWanted(ROW_D)).toBe(false);
    const v = parse(ROW_D);
    const d = resolveContentLoss(v.flags, v.components, v.content, v.embeds);
    expect(d.requiresChoice).toBe(false);
    expect(d.mode).toBe('classic');
  });
  it('but M4-c disables Load anyway — a resolvable input is blocked', () => {
    expect(loadDisabled_M4c(ROW_D)).toBe(true);
  });
});

describe('CR18-D — the gate SHOULD apply to the RESOLVED object, which always passes', () => {
  it('row E resolved to either mode passes validateContentRequirements', () => {
    const v = parse(ROW_E);
    const asV2 = applyDisposition(v, 'v2');
    const asClassic = applyDisposition(v, 'classic');
    expect(validateContentRequirements(asV2)).toBeUndefined();
    expect(validateContentRequirements(asClassic)).toBeUndefined();
  });
  it('the empty floor is NOT resolvable and correctly stays blocked under any gate', () => {
    expect(loadDisabled_M4c(EMPTY)).toBe(true);
    expect(choiceWanted(EMPTY)).toBe(false);
  });
});

describe('CR18-E — non-members: legitimately loadable drafts stay enabled', () => {
  it('row B (structural V2, no content) loads', () => {
    expect(loadDisabled_M4c(ROW_B)).toBe(false);
    expect(choiceWanted(ROW_B)).toBe(false);
  });
  it('row A (classic only) loads', () => {
    expect(loadDisabled_M4c(ROW_A)).toBe(false);
    expect(choiceWanted(ROW_A)).toBe(false);
  });
});
