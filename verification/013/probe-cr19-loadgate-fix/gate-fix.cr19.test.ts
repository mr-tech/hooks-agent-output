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
 * CR19 — round-17 delta: the HIGH-1 fix at website `ad9f331`.
 *
 * HIGH-1 (round 16) was: M4-c's Load gate `isDisabled |= !!contentFloorError`,
 * computed over the UN-resolved draft, is a SUPERSET of resolveContentLoss's
 * requiresChoice, so the row-E choice (reached only via the Load button) was
 * unreachable dead code.
 *
 * The fix moved resolveContentLoss INTO the parsing useEffect: on requiresChoice
 * it sets pendingChoice AND setValidatedDraft(null) and returns; the render then
 * short-circuits `if (pendingChoice) return <choice/>` BEFORE the Load button.
 *
 * This probe MODELS the new effect+render wiring, transcribed verbatim from
 * ad9f331:JsonModalBody.tsx (effect lines 122-155, render gate line 165, Load
 * isDisabled line 276, commitLoad guard lines 63-78), and executes the REAL
 * resolveContentLoss / validateContentRequirements / applyDisposition. The
 * predicates are the tree's; the wiring is a faithful model. The discriminating
 * check for the wiring itself is a MOUNTED render — routed to QA Phase 2.
 *
 * cr18's loadDisabled_M4c models the REMOVED wiring (gate reads the raw draft);
 * at ad9f331 it still passes because the PREDICATE superset is unchanged, but it
 * no longer describes the live control flow. cr19 supersedes it for the wiring.
 */

const CONTAINER = (t: string) => ({ type: 17, components: [{ type: 10, content: t }] });
const parse = (raw: any) => discordMessageImportShape.parse(raw) as any;

// ---- MODEL of ad9f331 JsonModalBody effect (lines 122-155) ----------------
type EffectState = {
  error: null | string; isValid: boolean;
  validatedDraft: any | null; pendingChoice: null | { validated: any; disposition: any };
};
function effect_ad9f331(raw: any): EffectState {
  try {
    const parsed = parse(raw);                       // discordMessageImportShape.parse
    const disposition = resolveContentLoss(          // REAL predicate, now IN the effect
      parsed.flags, parsed.components, parsed.content, parsed.embeds,
    );
    if (disposition.requiresChoice) {                // line 136
      return { error: null, isValid: true, validatedDraft: null, pendingChoice: { validated: parsed, disposition } };
    }
    return { error: null, isValid: true, validatedDraft: parsed, pendingChoice: null };
  } catch {
    return { error: 'parse error', isValid: false, validatedDraft: null, pendingChoice: null };
  }
}
// ---- MODEL of the removed e61e602 effect (CONTROL) ------------------------
function effect_e61e602(raw: any): EffectState {
  try {
    const parsed = parse(raw);                       // validatedDraft ALWAYS set; no resolveContentLoss here
    return { error: null, isValid: true, validatedDraft: parsed, pendingChoice: null };
  } catch {
    return { error: 'parse error', isValid: false, validatedDraft: null, pendingChoice: null };
  }
}
// ---- MODEL of the render (line 165 + Load isDisabled line 276) ------------
function choiceViewReached(s: EffectState): boolean { return !!s.pendingChoice; } // `if (pendingChoice) return <choice/>`
function loadDisabled(s: EffectState): boolean {
  if (s.pendingChoice) return false;                 // Load button not even rendered; N/A
  const contentFloorError = s.validatedDraft ? validateContentRequirements(s.validatedDraft) : undefined;
  return !!s.error || !s.isValid || !!contentFloorError; // line 276 (the ported gate)
}
// ---- MODEL of the sibling NewMessageModal submit gate (line 191) ----------
// disableSave = !loadedMessage || !!contentFloorError ; loadedMessage is the
// applyDisposition-resolved message, null in the row-E/dismissed state.
function siblingSubmitDisabled(resolvedMessageOrNull: any | null): boolean {
  const floor = resolvedMessageOrNull ? validateContentRequirements(resolvedMessageOrNull) : undefined;
  return !resolvedMessageOrNull || !!floor;
}
// ---- MODEL of commitLoad guard (lines 63-78) ------------------------------
function commitLoadLoads(s: EffectState): boolean {
  if (!s.validatedDraft) return false;               // line 64 early return
  const d = resolveContentLoss(s.validatedDraft.flags, s.validatedDraft.components, s.validatedDraft.content, s.validatedDraft.embeds);
  if (d.requiresChoice) return false;                // line 71 early return
  return true;                                       // updateMessage would run
}

const ROW_E   = { flags: 32768, content: 'hello there', components: [CONTAINER('body')] };
const ROW_E2  = { content: 'x', components: [CONTAINER('y')] };                 // structural V2 + content, no flag
const ROW_E3  = { flags: 32768, embeds: [{ title: 'real' }], components: [CONTAINER('y')] }; // V2 + embed
const FLAGONLY= { flags: 32768, content: 'just classic' };                     // flag V2, no structural, content -> MEDIUM-4
const ROW_B   = { components: [CONTAINER('only v2')] };                        // structural V2, no content
const ROW_A   = { content: 'plain classic' };                                 // classic only
const EMPTY   = { flags: 32768 };                                             // nothing

describe('CR19-A — HIGH-1 CLOSED: a genuine row-E paste now REACHES the choice in the effect', () => {
  [ROW_E, ROW_E2, ROW_E3].forEach((raw, i) => {
    it(`row-E[${i}]: effect sets pendingChoice, nulls validatedDraft -> choice view reached`, () => {
      const s = effect_ad9f331(raw);
      expect(s.pendingChoice).not.toBeNull();
      expect(s.validatedDraft).toBeNull();
      expect(choiceViewReached(s)).toBe(true);
    });
    it(`row-E[${i}] CONTROL: the removed e61e602 wiring left the choice UNreachable (gate disabled, no pendingChoice)`, () => {
      const c = effect_e61e602(raw);
      expect(choiceViewReached(c)).toBe(false);      // choice was gated behind the Load button
      expect(loadDisabled(c)).toBe(true);            // ...which the floor gate disabled -> dead code
    });
  });
});

describe('CR19-B — MEDIUM (new this round): incomplete port. Dismissed-choice state leaves Load ENABLED where the sibling disables submit', () => {
  // After cancelChoice (no effect re-run), validatedDraft stays null, pendingChoice null,
  // dismissedChoice set. Model that residual state directly.
  const dismissed: EffectState = { error: null, isValid: true, validatedDraft: null, pendingChoice: null };
  it('JsonModalBody Load is ENABLED in the dismissed state (the defect)', () => {
    expect(loadDisabled(dismissed)).toBe(false);
  });
  it('the approved sibling DISABLES submit in the equivalent (message===null) state', () => {
    expect(siblingSubmitDisabled(null)).toBe(true);
  });
  it('INVARIANT still holds: commitLoad no-ops in the dismissed state (no bad load, integrity intact)', () => {
    expect(commitLoadLoads(dismissed)).toBe(false);
  });
});

describe('CR19-C — MEDIUM-4 unchanged: flag-only-V2 + content stays blocked, no choice offered', () => {
  it('no pendingChoice (requiresChoice false), floor error fires, Load disabled', () => {
    const s = effect_ad9f331(FLAGONLY);
    expect(s.pendingChoice).toBeNull();
    expect(s.validatedDraft).not.toBeNull();
    expect(validateContentRequirements(s.validatedDraft)).toBeDefined();
    expect(loadDisabled(s)).toBe(true);
  });
});

describe('CR19-D — the resolved object always passes the floor (the gate belongs on it, not the raw draft)', () => {
  [ROW_E, ROW_E2, ROW_E3].forEach((raw, i) => {
    it(`row-E[${i}] resolved to either mode passes validateContentRequirements`, () => {
      const v = parse(raw);
      expect(validateContentRequirements(applyDisposition(v, 'v2'))).toBeUndefined();
      expect(validateContentRequirements(applyDisposition(v, 'classic'))).toBeUndefined();
    });
  });
});

describe('CR19-E — non-members: legitimately loadable drafts load; empty floor stays blocked', () => {
  it('row B (structural V2, no content) -> no choice, Load enabled, commitLoad loads', () => {
    const s = effect_ad9f331(ROW_B);
    expect(s.pendingChoice).toBeNull();
    expect(loadDisabled(s)).toBe(false);
    expect(commitLoadLoads(s)).toBe(true);
  });
  it('row A (classic only) -> no choice, Load enabled, commitLoad loads', () => {
    const s = effect_ad9f331(ROW_A);
    expect(s.pendingChoice).toBeNull();
    expect(loadDisabled(s)).toBe(false);
    expect(commitLoadLoads(s)).toBe(true);
  });
  it('empty floor -> no choice, blocked at the BUTTON (isDisabled), which is where the empty-floor guard lives', () => {
    const s = effect_ad9f331(EMPTY);
    expect(s.pendingChoice).toBeNull();
    expect(loadDisabled(s)).toBe(true);              // button disabled -> commitLoad unreachable
    // NB: commitLoad itself has NO content-floor guard (only !validatedDraft / requiresChoice);
    // the empty-floor protection is button-only. That is sound *because* the button is disabled.
    expect(commitLoadLoads(s)).toBe(true);           // would load IF reached; it is not reached
  });
});
