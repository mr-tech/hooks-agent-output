/**
 * QA-R19 re-specification (D28): is D25's ONE instruction -- "switch to Classic and save" --
 * lossless for EVERY member of the class the guidance addresses?
 *
 * The class is not taken from prose. It is the code's own row D:
 *   resolveContentLoss(flags, components, content, embeds).row === 'D'
 * i.e. V2 bit set, no V2-typed component, and classic content present. Members are enumerated by
 * cross product over the dimensions the class allows, and each member's membership is asserted
 * against resolveContentLoss itself before Route A is run over it.
 *
 * Route A is executed as the composer executes it: applyModeSwitch('classic', draft), which is what
 * handleModeSwitch calls. Losslessness expectations are stated as independent facts (literal
 * expected values), never computed by calling the code under test.
 *
 * Anchor: website a74b9e2 (released chain-013 tree).
 */
import { describe, expect, it } from 'vitest';

import { IS_COMPONENTS_V2_FLAG } from '~/constants/messageLimits';
import { hasV2Content, resolveContentLoss } from '~/utils';
import { validateMessage } from '~/utils/limits';
import { applyModeSwitch } from '~/utils/messageMode';

const ACTION_ROW = { type: 1, components: [{ type: 2, style: 5, label: 'Docs', url: 'https://x.test' }] };
const EMBED = { title: 'An embed', description: 'body' };

const CONTENTS = [
  { key: 'content', value: 'Hello there' },
  { key: 'nocontent', value: '' },
];
const EMBEDSETS = [
  { key: 'embed', value: [EMBED] },
  { key: 'noembed', value: [] as unknown[] },
];
const COMPONENTSETS = [
  { key: 'actionrow', value: [ACTION_ROW] },
  { key: 'nocomponents', value: [] as unknown[] },
];

type Member = { name: string; data: Record<string, unknown> };
const all: Member[] = [];
for (const c of CONTENTS) {
  for (const e of EMBEDSETS) {
    for (const k of COMPONENTSETS) {
      all.push({
        name: `${c.key}+${e.key}+${k.key}`,
        data: {
          username: 'Guild Owner',
          content: c.value,
          embeds: e.value,
          components: k.value,
          flags: IS_COMPONENTS_V2_FLAG,
        },
      });
    }
  }
}

/** Membership decided by the shipped classifier, not by my reading of it. */
const rowOf = (d: Record<string, unknown>) => resolveContentLoss(
  d.flags as number,
  d.components as { type: number }[],
  d.content as string,
  d.embeds as unknown[],
).row;

const members = all.filter((m) => rowOf(m.data) === 'D');
const nonMembers = all.filter((m) => rowOf(m.data) !== 'D');

describe('the class is enumerated by the shipped classifier', () => {
  it('the cross product splits into members and non-members, both non-empty', () => {
    expect(all).toHaveLength(8);
    expect(members.length).toBeGreaterThan(0);
    expect(nonMembers.length).toBeGreaterThan(0);
    expect(members.length + nonMembers.length).toBe(8);
  });

  it('every member has the V2 bit, classic content, and no V2-typed component', () => {
    for (const m of members) {
      expect((m.data.flags as number) & IS_COMPONENTS_V2_FLAG).toBe(IS_COMPONENTS_V2_FLAG);
      expect(hasV2Content(m.data.components as { type: number }[])).toBe(false);
      const hasClassic = !!(m.data.content as string).trim()
        || (m.data.embeds as unknown[]).length > 0;
      expect(hasClassic).toBe(true);
    }
  });

  it('SHAPE (iii) / cell B3 -- content AND a type-1 component -- is a member', () => {
    // This is the shape R19 asserted had no lossless path. Its membership must be explicit.
    expect(members.map((m) => m.name)).toContain('content+noembed+actionrow');
  });
});

describe('Route A is lossless and bit-clearing for EVERY member', () => {
  for (const m of members) {
    it(`${m.name}: one switch to Classic keeps everything and clears only the bit`, () => {
      const out = applyModeSwitch('classic', m.data) as Record<string, unknown>;
      expect((out.flags as number) & IS_COMPONENTS_V2_FLAG).toBe(0);
      expect(out.content).toBe(m.data.content);
      expect(out.embeds).toEqual(m.data.embeds);
      expect(out.components).toEqual(m.data.components);
      expect(validateMessage(out as never)).toBe('');
    });

    it(`${m.name}: needs ONE press -- no confirmation modal is triggered`, () => {
      // handleModeSwitch gates the modal on hasV2Content for the V2->classic direction.
      expect(hasV2Content(m.data.components as { type: number }[])).toBe(false);
    });
  }
});

describe('R19 stays falsifiable -- Route A IS lossy for a component it cannot keep', () => {
  it('a top-level component that is neither type 1 nor V2-typed is DROPPED by the switch', () => {
    // Out of `topLevelComponentShape`, so unauthorable through supported paths -- but the toggle
    // would silently discard it, which is the live edge of the one-instruction form.
    const oddball = {
      username: 'Guild Owner',
      content: 'Hello there',
      embeds: [] as unknown[],
      components: [{ type: 3, placeholder: 'a select menu at top level' }],
      flags: IS_COMPONENTS_V2_FLAG,
    };
    expect(rowOf(oddball)).toBe('D');           // it IS a class member
    const out = applyModeSwitch('classic', oddball) as Record<string, unknown>;
    expect(out.components).toEqual([]);          // ...and its component is gone
    expect(out.content).toBe('Hello there');     // content still kept
  });
});

describe('row C is correctly outside the guidance', () => {
  it('bit + V2 component + no classic content classifies as C, not D', () => {
    expect(rowOf({
      username: 'Guild Owner',
      content: '',
      embeds: [],
      components: [{ type: 10, content: 'text display' }],
      flags: IS_COMPONENTS_V2_FLAG,
    })).toBe('C');
  });
});
