/**
 * CR round 19 — probe for the F-QA15 FIX (closure + holes), tree 53beb37.
 *
 * QA's probe-qa-p2-rowd-load-gate settles the DEFECT's presence at 4e9da96. Its Block-B facts
 * assert the UNRESOLVED row-D draft is refused — a pure fact unchanged by the fix, so it proves
 * nothing about whether the fix works. Instrument validity is indexed to the claim: this probe is
 * built for a DIFFERENT claim — "the shipped gate at 53beb37 lets every row-D member load, and
 * still refuses everything that must stay blocked."
 *
 * FIXED GATE (JsonModalBody.tsx:159-160, 273):
 *   contentFloorError = validatedDraft ? validateContentRequirements(applyDisposition(validatedDraft)) : undefined
 *   isDisabled = !validatedDraft || !!contentFloorError
 * commitLoad (line 73) loads `applyDisposition(validatedDraft)` — the gate floors EXACTLY what load produces.
 *
 * Executable without a DOM: contentFloorError is a pure function of the parsed draft. The React
 * residue (observing isDisabled applied to the button) is identical to QA's and is NOT absorbed here.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it, vi } from 'vitest';

import { validateContentRequirements } from '~/utils/limits';
import { applyDisposition, resolveContentLoss } from '~/utils';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const JMB = resolve(__dirname, '../../../../website/src/app/message/m/[id]/_components/JsonModalBody.tsx');
const SRC = readFileSync(JMB, 'utf8');

const FLAG = 1 << 15;

/** The FIXED gate, transcribed from source and re-anchored below so a revert breaks this probe. */
const loadDisabled = (draft: Record<string, unknown> | null): boolean => {
  if (!draft) return true;                                  // !validatedDraft
  return !!validateContentRequirements(applyDisposition(draft as never)); // floor over RESOLVED draft
};

// --- The 8 row-D members QA enumerates: flagV2 + classic content + NO V2 components -------------
const AR = { type: 1, components: [{ type: 2, style: 5, label: 'x', url: 'https://e.co' }] };
const ROW_D: Array<[string, Record<string, unknown>]> = [
  ['content-only (5712 shape)', { flags: FLAG, content: 'hi', embeds: [], components: [] }],
  ['embeds-only', { flags: FLAG, content: '', embeds: [{ title: 't' }], components: [] }],
  ['content+embeds', { flags: FLAG, content: 'hi', embeds: [{ title: 't' }], components: [] }],
  ['content-only + action row', { flags: FLAG, content: 'hi', embeds: [], components: [AR] }],
  ['embeds-only + action row', { flags: FLAG, content: '', embeds: [{ title: 't' }], components: [AR] }],
  ['whitespace-padded content', { flags: FLAG, content: '  hi  ', embeds: [], components: [] }],
  ['flag | SUPPRESS_EMBEDS', { flags: FLAG | (1 << 2), content: 'hi', embeds: [], components: [] }],
  ['flag | EPHEMERAL', { flags: FLAG | (1 << 6), content: 'hi', embeds: [], components: [] }],
];

describe('CR21-A — the modelled gate is the SHIPPED (fixed) gate; a revert breaks this first', () => {
  it('gate is !validatedDraft || !!contentFloorError', () => {
    expect(SRC).toContain('isDisabled={!validatedDraft || !!contentFloorError}');
  });
  it('floor is now computed over the RESOLVED draft (applyDisposition between parse and floor)', () => {
    expect(SRC).toContain('validateContentRequirements(applyDisposition(validatedDraft))');
  });
  it('commitLoad loads exactly what the gate floors', () => {
    expect(SRC).toContain('const next = applyDisposition(validatedDraft);');
  });
});

describe('CR21-B — CLOSURE: every row-D member is classified row D and now LOADS', () => {
  it.each(ROW_D)('%s: requiresChoice=false, mode=classic', (_n, d) => {
    const disp = resolveContentLoss(d.flags as number, d.components as never, d.content as never, d.embeds as never);
    expect(disp.requiresChoice).toBe(false);
    expect(disp.row).toBe('D');
    expect(disp.mode).toBe('classic');
  });
  it.each(ROW_D)('%s: fixed gate ENABLES load (contentFloorError undefined)', (_n, d) => {
    expect(loadDisabled(d)).toBe(false);
  });
});

describe('CR21-C — HOLE CHECK: things that MUST stay blocked still are, through the fixed gate', () => {
  // The implementer's test asserts only that row-D loads. These assert the fix opened NO hole.
  it('empty draft (no content/comps/flag) stays BLOCKED — floor Branch 2', () => {
    expect(loadDisabled({ flags: 0, content: '', embeds: [], components: [] })).toBe(true);
  });
  it('flag-only empty draft (row C, switchToV2 keeps it empty) stays BLOCKED', () => {
    const d = { flags: FLAG, content: '', embeds: [], components: [] };
    expect(resolveContentLoss(d.flags, d.components as never, d.content, d.embeds).row).toBe('C');
    expect(loadDisabled(d)).toBe(true);
  });
  it('whitespace-only content, no flag/comps stays BLOCKED (trim => empty)', () => {
    expect(loadDisabled({ flags: 0, content: '   ', embeds: [], components: [] })).toBe(true);
  });
});

describe('CR21-D — controls: legit non-row-D drafts still LOAD (fix is not a blanket permit)', () => {
  const TD = { type: 10, content: 'hello' };
  it('row B (V2 comps, no content, no flag) LOADS', () => {
    const d = { flags: 0, content: '', embeds: [], components: [TD] };
    expect(resolveContentLoss(d.flags, d.components as never, d.content, d.embeds).row).toBe('B');
    expect(loadDisabled(d)).toBe(false);
  });
  it('row C (flag + V2 comps, no content) LOADS', () => {
    const d = { flags: FLAG, content: '', embeds: [], components: [TD] };
    expect(resolveContentLoss(d.flags, d.components as never, d.content, d.embeds).row).toBe('C');
    expect(loadDisabled(d)).toBe(false);
  });
  it('row A (classic content, no flag) LOADS', () => {
    const d = { flags: 0, content: 'hi', embeds: [], components: [] };
    expect(resolveContentLoss(d.flags, d.components as never, d.content, d.embeds).row).toBe('A');
    expect(loadDisabled(d)).toBe(false);
  });
});

describe('CR21-E — the load-bearing coupling that keeps the gate from THROWING', () => {
  // applyDisposition(draft) with no chosenMode THROWS if requiresChoice (row E). The gate calls it
  // unguarded. It is safe ONLY because the parse effect stores validatedDraft=null for row E
  // (setValidatedDraft(null) on requiresChoice). This asserts the invariant that makes that true:
  // every row-E member has requiresChoice=true (=> null stored) AND would throw if floored directly.
  const ROW_E: Array<[string, Record<string, unknown>]> = [
    ['V2 comp + content', { flags: 0, content: 'hi', embeds: [], components: [{ type: 10, content: 'x' }] }],
    ['V2 comp + embeds + flag', { flags: FLAG, content: '', embeds: [{ title: 't' }], components: [{ type: 10, content: 'x' }] }],
  ];
  it.each(ROW_E)('%s: requiresChoice=true (=> effect stores null, gate short-circuits)', (_n, d) => {
    expect(resolveContentLoss(d.flags as number, d.components as never, d.content as never, d.embeds as never).requiresChoice).toBe(true);
  });
  it.each(ROW_E)('%s: applyDisposition throws without chosenMode (why null is load-bearing)', (_n, d) => {
    expect(() => applyDisposition(d as never)).toThrow(/chosenMode is required/);
  });
});

describe('CR21-F — parity: floor V2_TYPES and disposition hasV2Components share one constant', () => {
  // switchToClassic filters resolved components to type-1 only, so hasStructuralV2 over a resolved
  // row-D draft is false regardless. This asserts the source single-source so the two never diverge.
  it('both derive from V2_COMPONENT_TYPE_VALUES', () => {
    const limits = readFileSync(resolve(__dirname, '../../../../website/src/utils/limits.tsx'), 'utf8');
    const index = readFileSync(resolve(__dirname, '../../../../website/src/utils/index.ts'), 'utf8');
    expect(limits).toContain('const V2_TYPES = new Set<number>(V2_COMPONENT_TYPE_VALUES)');
    expect(index).toContain('export const V2_COMPONENT_TYPES = new Set<number>(V2_COMPONENT_TYPE_VALUES)');
  });
});
