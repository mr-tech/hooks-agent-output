/**
 * QA Phase 2 — probe for F-QA15 (row D unreachable at the Message JSON modal).
 *
 * CLAIM UNDER TEST: at tip 4e9da96 the Message JSON modal's Load button is gated on a content
 * floor computed over the UNRESOLVED parsed draft, so every member of disposition row D
 * (V2 flag set + classic content + NO V2 components) leaves Load permanently disabled — blocking
 * the very repair path M2-a names for records 5712/5842/5855/5856.
 *
 * WHY THIS IS EXECUTABLE WITHOUT A DOM: the gate is `!validatedDraft || !!contentFloorError`, and
 * `contentFloorError` is a pure function of the parsed draft. This probe executes the floor over
 * the row-D CLASS and asserts the gate EXPRESSION as source text. What it cannot do is observe
 * React applying `isDisabled`; that residue is stated at the foot and routed, not absorbed.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it, vi } from 'vitest';

import { validateContentRequirements } from '~/utils/limits';
import { resolveContentLoss } from '~/utils';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const JMB = resolve(__dirname, '../../app/message/m/[id]/_components/JsonModalBody.tsx');
const SRC = readFileSync(JMB, 'utf8');

/** The gate, transcribed from source and re-asserted below so drift breaks this probe. */
const loadDisabled = (draft: unknown | null) => {
  if (!draft) return true;
  return !!validateContentRequirements(draft as never);
};

const FLAG = 1 << 15;
const ROW = (d: Record<string, unknown>) => d;

// ---------------------------------------------------------------------------------------------
// A. The gate expression is what this probe models. If the source changes, this fails first.
// ---------------------------------------------------------------------------------------------
describe('A — the modelled gate is the shipped gate', () => {
  it('Load is disabled on !validatedDraft || !!contentFloorError', () => {
    expect(SRC).toContain('isDisabled={!validatedDraft || !!contentFloorError}');
  });

  it('the floor is computed over the UNRESOLVED draft — no applyDisposition between them', () => {
    expect(SRC).toContain('const contentFloorError = validatedDraft\n    ? validateContentRequirements(validatedDraft) : undefined;');
    const effect = SRC.slice(SRC.indexOf('useEffect(() => {\n    setDismissedChoice'));
    const parseEffect = effect.slice(0, effect.indexOf('}, [messageString]);'));
    expect(parseEffect).toContain('setValidatedDraft(parsed)');
    expect(parseEffect).not.toContain('applyDisposition');
  });
});

// ---------------------------------------------------------------------------------------------
// B. ROW D AS A CLASS — not one member. Every combination of the row's free dimensions.
//    Row D membership: flag set AND classic content present AND no V2 components.
// ---------------------------------------------------------------------------------------------
describe('B — every member of row D is refused by the Load gate', () => {
  const ACTION_ROW = { type: 1, components: [{ type: 2, style: 5, label: 'x', url: 'https://e.co' }] };
  const rowDMembers: Array<[string, Record<string, unknown>]> = [
    ['content only (the plan\'s own M8-D member, record 5712 shape)', ROW({ content: 'hi', flags: FLAG })],
    ['embeds only', ROW({ embeds: [{ title: 't' }], flags: FLAG })],
    ['content AND embeds', ROW({ content: 'hi', embeds: [{ title: 't' }], flags: FLAG })],
    ['content + a non-V2 action row', ROW({ content: 'hi', flags: FLAG, components: [ACTION_ROW] })],
    ['embeds + a non-V2 action row', ROW({ embeds: [{ title: 't' }], flags: FLAG, components: [ACTION_ROW] })],
    ['whitespace-padded content', ROW({ content: '  hi  ', flags: FLAG })],
    ['flag OR-ed with other bits (SUPPRESS_EMBEDS)', ROW({ content: 'hi', flags: FLAG | 4 })],
    ['flag OR-ed with EPHEMERAL', ROW({ content: 'hi', flags: FLAG | 64 })],
  ];

  it.each(rowDMembers)('row D member — %s — is genuinely row D', (_label, draft) => {
    const d = resolveContentLoss(
      draft.flags as number | undefined,
      draft.components as undefined | { type: number }[],
      draft.content as string | undefined,
      draft.embeds as never,
    );
    // Row D does NOT require a choice (that is row E) — so it reaches setValidatedDraft(parsed).
    expect(d.requiresChoice).toBe(false);
  });

  it.each(rowDMembers)('row D member — %s — LOAD IS DISABLED (the defect)', (_label, draft) => {
    expect(loadDisabled(draft)).toBe(true);
    expect(validateContentRequirements(draft as never))
      .toBe('Components V2 messages cannot contain embeds or content.');
  });
});

// ---------------------------------------------------------------------------------------------
// C. DISCRIMINATING CONTROLS IN BOTH DIRECTIONS. Without these, "disabled" would also be the
//    verdict of a floor that refuses everything, and the probe would prove nothing.
// ---------------------------------------------------------------------------------------------
describe('C — controls: the gate PERMITS the rows it is supposed to permit', () => {
  it('row A (classic content, no flag, no V2) — Load ENABLED', () => {
    expect(loadDisabled(ROW({ content: 'hi' }))).toBe(false);
  });

  it('row B (V2 components + flag, no classic body) — Load ENABLED', () => {
    expect(loadDisabled(ROW({ flags: FLAG, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] }))).toBe(false);
  });

  it('row C (V2 components, no flag, no classic body) — Load ENABLED', () => {
    expect(loadDisabled(ROW({ components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] }))).toBe(false);
  });

  it('classic with an action row and no flag — Load ENABLED', () => {
    expect(loadDisabled(ROW({ content: 'hi', components: [{ type: 1, components: [] }] }))).toBe(false);
  });

  it('CONJUNCT ISOLATION — the flag alone carries the refusal: drop the flag and the SAME body loads', () => {
    const body = { content: 'hi' };
    expect(loadDisabled({ ...body, flags: FLAG })).toBe(true);
    expect(loadDisabled(body)).toBe(false);
  });

  it('CONJUNCT ISOLATION — the body alone carries it: keep the flag, empty the body, and it loads', () => {
    expect(loadDisabled({ content: 'hi', flags: FLAG })).toBe(true);
    expect(loadDisabled({ flags: FLAG, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] })).toBe(false);
  });
});

// ---------------------------------------------------------------------------------------------
// D. REGRESSION ANCHOR — the same class at base c85945f was NOT gated on the floor at all.
//    Base gated Load on `!!error || !isValid`, where isValid meant only "parses under the shape".
// ---------------------------------------------------------------------------------------------
describe('D — this is a regression introduced by 013, not a pre-existing condition', () => {
  it('the tip gate names contentFloorError; the base gate did not exist in that form', () => {
    expect(SRC).toContain('contentFloorError');
    expect(SRC).not.toContain('isDisabled={!!error || !isValid}');
  });

  // The other half of the regression claim — that base's gate PERMITTED row D — is a fact about
  // git history, not about this tree, so it is evidenced with git (see README, reproduce section)
  // rather than by importing base source into a tip-resident spec.
});

// ---------------------------------------------------------------------------------------------
// E. END TO END ON THE REAL RECORD. Blocks A-D establish the gate's behaviour over the row-D
//    class. This block runs the plan's own named production record, 5712, through the SHIPPED
//    seed -> parse -> resolve -> floor pipeline, so the finding does not rest on source reading.
//    Fixture copied verbatim from 012-json-editor-repair-path.test.ts (STORED_5712_FULL).
// ---------------------------------------------------------------------------------------------
import { jsonModalSeed } from '~/utils';

describe('E — record 5712 end to end through the shipped Load path', () => {
  const STORED_5712_FULL = {
    id: '5712',
    name: 'MOTM',
    data: {
      username: 'MOTM',
      flags: 32768,
      content: 'Complimenti {{user}} ! Sei il Member of The Month in ...',
      embeds: [],
      components: [],
    },
  };
  const seeded = () => JSON.parse(jsonModalSeed(STORED_5712_FULL as never));

  it('the seed CARRIES the flag into the textarea — 012 asserted it would not, and under D18 it does', () => {
    expect(seeded().flags).toBe(FLAG);
  });

  it('the engine computes the RIGHT repair — row D, classic mode, flag-conflict notice', () => {
    const s = seeded();
    const d = resolveContentLoss(s.flags, s.components, s.content, s.embeds);
    expect(d.requiresChoice).toBe(false);
    expect(d.mode).toBe('classic');
    expect((d as unknown as { noticeClass?: string }).noticeClass).toBe('warn-v2-flag-conflict');
  });

  it('THE DEFECT — and the gate then refuses to let the user apply that repair', () => {
    expect(loadDisabled(seeded())).toBe(true);
  });

  it('CONTROL — strip the flag from the same record and the identical body loads fine', () => {
    const { flags: _drop, ...noFlag } = seeded();
    expect(loadDisabled(noFlag)).toBe(false);
  });
});
