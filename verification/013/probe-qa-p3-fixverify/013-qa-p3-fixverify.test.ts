/**
 * QA refresh pass — independent verification of the F-QA15 fix at 164d720.
 *
 * The fix floors applyDisposition(validatedDraft) instead of the raw draft. This spec is NOT the
 * implementer's; it is QA's own, and it asks the two questions a one-line gate change raises:
 *
 *   1. Does row D now LOAD?              (the defect closed)
 *   2. Does anything now load that SHOULDN'T?  (the fix over-permitting — the real risk, since
 *      applyDisposition rewrites the draft the floor then judges, and could manufacture a draft
 *      that satisfies the floor vacuously)
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it, vi } from 'vitest';

import { applyDisposition, resolveContentLoss, jsonModalSeed } from '~/utils';
import { validateContentRequirements } from '~/utils/limits';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const JMB = resolve(__dirname, '../../app/message/m/[id]/_components/JsonModalBody.tsx');
const SRC = readFileSync(JMB, 'utf8');
const FLAG = 1 << 15;
const CONTAINER = { type: 17, components: [{ type: 10, content: 'x' }] };

/**
 * The FIXED gate. This is a MODEL of a React expression, and a model can drift from the thing it
 * models — so it is COUPLED to source rather than merely transcribed: the exact floor expression is
 * located in JsonModalBody.tsx at module scope, and if it is not there, EVERY test in this file
 * throws rather than silently going on measuring a gate the component no longer has.
 *
 * Without this coupling, reverting the fix in the component left 39/40 assertions green — the model
 * kept computing the fixed behaviour. That is the defect class this file exists to catch, so it must
 * not be present in the file itself.
 */
const FLOOR_EXPR = '? validateContentRequirements(applyDisposition(validatedDraft)) : undefined;';
const GATE_EXPR = 'isDisabled={!validatedDraft || !!contentFloorError}';
if (!SRC.includes(FLOOR_EXPR) || !SRC.includes(GATE_EXPR)) {
  throw new Error(
    'JsonModalBody.tsx no longer carries the gate this file models. '
    + 'Re-derive the model against the component before trusting any assertion here.',
  );
}

const loadDisabled = (draft: unknown | null) => {
  if (!draft) return true;
  return !!validateContentRequirements(applyDisposition(draft as never) as never);
};

describe('A — the modelled gate is the SHIPPED gate at 164d720', () => {
  it('the floor now runs over the RESOLVED draft', () => {
    expect(SRC).toContain('? validateContentRequirements(applyDisposition(validatedDraft)) : undefined;');
  });
  it('the button still consults both terms', () => {
    expect(SRC).toContain('isDisabled={!validatedDraft || !!contentFloorError}');
  });
  it('the parse effect still seeds the UNRESOLVED draft (the fix moved the floor, not the parse)', () => {
    const eff = SRC.slice(SRC.indexOf('useEffect(() => {\n    setDismissedChoice'));
    expect(eff.slice(0, eff.indexOf('}, [messageString]);'))).toContain('setValidatedDraft(parsed)');
  });
});

describe('B — F-QA15 IS CLOSED: every row-D member now loads', () => {
  const AR = { type: 1, components: [{ type: 2, style: 5, label: 'x', url: 'https://e.co' }] };
  const rowD: Array<[string, Record<string, unknown>]> = [
    ['content only (5712 shape)', { content: 'hi', flags: FLAG }],
    ['embeds only', { embeds: [{ title: 't' }], flags: FLAG }],
    ['content AND embeds', { content: 'hi', embeds: [{ title: 't' }], flags: FLAG }],
    ['content + non-V2 action row', { content: 'hi', flags: FLAG, components: [AR] }],
    ['embeds + non-V2 action row', { embeds: [{ title: 't' }], flags: FLAG, components: [AR] }],
    ['whitespace-padded content', { content: '  hi  ', flags: FLAG }],
    ['flag | SUPPRESS_EMBEDS', { content: 'hi', flags: FLAG | 4 }],
    ['flag | EPHEMERAL', { content: 'hi', flags: FLAG | 64 }],
  ];

  it.each(rowD)('%s — still genuinely row D', (_l, d) => {
    expect(resolveContentLoss(d.flags as number, d.components as never, d.content as string, d.embeds as never)
      .requiresChoice).toBe(false);
  });

  it.each(rowD)('%s — LOAD IS NOW ENABLED', (_l, d) => {
    expect(loadDisabled(d)).toBe(false);
  });

  it.each(rowD)('%s — and the repair is LOSSLESS: the classic body survives applyDisposition', (_l, d) => {
    const out = applyDisposition(d as never) as Record<string, unknown>;
    if (d.content) expect(out.content).toBe(d.content);
    if (d.embeds) expect(out.embeds).toEqual(d.embeds);
    expect((out.flags as number ?? 0) & FLAG).toBe(0); // the whole point: the bit is cleared
  });
});

describe('C — THE FIX MUST NOT OVER-PERMIT (the risk a resolved-draft floor introduces)', () => {
  it('the empty object is STILL refused — applyDisposition must not manufacture a body', () => {
    expect(loadDisabled({})).toBe(true);
    expect(validateContentRequirements(applyDisposition({} as never) as never))
      .toBe('Message must have content, embeds, or components.');
  });

  it('an all-empty draft with explicit empty collections is STILL refused', () => {
    expect(loadDisabled({ content: '', embeds: [], components: [] })).toBe(true);
  });

  it('whitespace-only content with nothing else is STILL refused', () => {
    expect(loadDisabled({ content: '   ' })).toBe(true);
  });

  it('a flag-only draft with no body at all is STILL refused', () => {
    expect(loadDisabled({ flags: FLAG })).toBe(true);
  });

  it('a flag-only draft with empty collections is STILL refused', () => {
    expect(loadDisabled({ flags: FLAG, content: '', embeds: [], components: [] })).toBe(true);
  });
});

describe('D — rows A/B/C are unchanged by the fix (no collateral)', () => {
  it('row A (classic, no flag) loads', () => { expect(loadDisabled({ content: 'hi' })).toBe(false); });
  it('row B (V2 + flag, no body) loads', () => { expect(loadDisabled({ flags: FLAG, components: [CONTAINER] })).toBe(false); });
  it('row C (V2, no flag, no body) loads', () => { expect(loadDisabled({ components: [CONTAINER] })).toBe(false); });
  it('classic + action row loads', () => { expect(loadDisabled({ content: 'hi', components: [{ type: 1, components: [] }] })).toBe(false); });
});

describe('E — record 5712 end to end through the shipped pipeline, at the fixed tip', () => {
  const STORED_5712_FULL = { id: '5712', name: 'MOTM', data: {
    username: 'MOTM', flags: 32768,
    content: 'Complimenti {{user}} ! Sei il Member of The Month in ...',
    embeds: [], components: [] } };
  const seeded = () => JSON.parse(jsonModalSeed(STORED_5712_FULL as never));

  it('the seed still carries the flag into the textarea (D18 — unchanged, and NOT restored)', () => {
    expect(seeded().flags).toBe(FLAG);
  });
  it('the engine still computes the right repair', () => {
    const s = seeded();
    const d = resolveContentLoss(s.flags, s.components, s.content, s.embeds);
    expect(d.mode).toBe('classic');
    expect((d as unknown as { noticeClass?: string }).noticeClass).toBe('warn-v2-flag-conflict');
  });
  it('THE FIX — and the user can now apply it', () => {
    expect(loadDisabled(seeded())).toBe(false);
  });
  it('and applying it produces a valid, lossless classic record', () => {
    const out = applyDisposition(seeded()) as Record<string, unknown>;
    expect(out.content).toBe(STORED_5712_FULL.data.content);
    expect((out.flags as number ?? 0) & FLAG).toBe(0);
    expect(validateContentRequirements(out as never)).toBeUndefined();
  });
});
