import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { describeUnsupportedComponentTypes, discordMessageImportShape } from '~/server/api/utils/shapes';
import { resolveContentLoss } from '~/utils';

/**
 * CR20 — held planner item 7, re-derived at 4e9da96 (NOT steering's framing).
 *
 * Item 7 (round 9, probe-cr9 24/24 at ee3bc3e): the disposition is computed on the
 * POST-z.preprocess object, so filterSupportedComponents deletes a V2 component before
 * resolveContentLoss sees it → row E flips to a settled row (M8-E "nothing lands until
 * you choose" bypassed) AND the notice named only the flag. Silent-flip class from the
 * cr9 child sweep: [2,3,4,11,17]. Recorded remedy: M4-b under D18/D9 ("drop them, SAY
 * what was dropped"), then undelivered.
 *
 * This probe asks: does the DELIVERED M4 (M4-b built: describeUnsupportedComponentTypes)
 * discharge item 7's substance? All functions are the REAL ones (imported → reads the tree).
 *
 * The disposition still runs on the filtered object (structural fact, unchanged), so the
 * FLIP still happens. The question item 7 turns on is whether the drop is now DISCLOSED —
 * D9's remedy accepts drop-with-disclosure. So the test of discharge is: for every member
 * of the silent-flip class, does describeUnsupportedComponentTypes NAME the dropped type?
 */

const IS_V2 = 1 << 15; // 32768, IS_COMPONENTS_V2_FLAG
const TD = { type: 10, content: 'kept text' };           // supported container child (TextDisplay)
const parseComponents = (raw: any) =>
  ((discordMessageImportShape.parse(raw) as any).components ?? []);
const flips = (raw: any) => {
  const v = discordMessageImportShape.parse(raw) as any;
  return !resolveContentLoss(v.flags, v.components, v.content, v.embeds).requiresChoice;
};

// The silent-flip class as a top-level component (each well-formed enough to reach the filter):
const TOP_LEVEL_UNSUPPORTED = [
  { type: 3, label: 'Select Menu' },
  { type: 4, label: 'Text Input' },
  { type: 5, label: 'User Select Menu' },
];
// As a container child (the cr9 case): a container holding ONLY an unsupported child.
const CHILD_UNSUPPORTED = [
  { type: 2, label: 'Button' },        // non-link button as container child
  { type: 11, label: 'Thumbnail' },    // the cr9 headline: V2 type, not a supported child
  { type: 3, label: 'Select Menu' },
];

describe('CR20-A — DISCHARGED for named drops: every silent-flip member is now NAMED by describeUnsupportedComponentTypes', () => {
  TOP_LEVEL_UNSUPPORTED.forEach(({ type, label }) => {
    it(`top-level type ${type} (${label}): named AND stripped from the parse`, () => {
      const raw = { flags: IS_V2, content: 'hi', components: [{ type, custom_id: 'x' }] };
      const named = describeUnsupportedComponentTypes(raw.components);
      expect(named).toContain(label);                 // D9: "say what was dropped"
      expect(parseComponents(raw)).toHaveLength(0);    // it really is filtered out
    });
  });
  CHILD_UNSUPPORTED.forEach(({ type, label }) => {
    it(`container child type ${type} (${label}): container destroyed whole, child NAMED`, () => {
      const raw = { flags: IS_V2, content: 'hi', components: [{ type: 17, components: [{ type, custom_id: 'x', url: 'https://e.com' }] }] };
      const named = describeUnsupportedComponentTypes(raw.components);
      expect(named).toContain(label);                 // the child is named even though the container vanishes
      expect(parseComponents(raw)).toHaveLength(0);
    });
  });
});

describe('CR20-B — the flip still happens, but it is now the D9 drop-with-disclosure outcome (named), not silent', () => {
  it('a container of only a Thumbnail + content + flag: flips away from E, AND names "Thumbnail"', () => {
    const raw = { flags: IS_V2, content: 'hi', components: [{ type: 17, components: [{ type: 11, media: { url: 'https://e.com/a.png' } }] }] };
    expect(flips(raw)).toBe(true);                     // row E -> settled (structural fact unchanged)
    expect(describeUnsupportedComponentTypes(raw.components)).toContain('Thumbnail'); // but disclosed
  });
});

describe('CR20-C — RESIDUAL: a container EMPTY as pasted flips silently — names NOTHING', () => {
  it('{type:17, components:[]} + content + flag: flips, but describeUnsupportedComponentTypes = []', () => {
    const raw = { flags: IS_V2, content: 'hi', components: [{ type: 17, components: [] }] };
    expect(flips(raw)).toBe(true);                     // still flips E -> settled
    expect(describeUnsupportedComponentTypes(raw.components)).toEqual([]); // and says nothing
    // NB: the empty container carries no renderable content, so this residual loses nothing visible.
  });
});

describe('CR20-D — CONTROL: a SUPPORTED V2 container correctly HOLDS row E and names nothing', () => {
  it('{type:17, components:[TextDisplay]} + content + flag: requiresChoice stays TRUE, nothing dropped', () => {
    const raw = { flags: IS_V2, content: 'hi', components: [{ type: 17, components: [TD] }] };
    expect(flips(raw)).toBe(false);                    // genuine row E held — the choice IS offered
    expect(describeUnsupportedComponentTypes(raw.components)).toEqual([]); // correctly nothing to disclose
    expect(parseComponents(raw)).toHaveLength(1);      // the container survives
  });
});

describe('CR20-E — the naming shares the filter recursion, so disclosure cannot drift from the drop', () => {
  it('ActionRow non-link button and Section unsupported accessory are both named', () => {
    const rawRow = { components: [{ type: 1, components: [{ type: 2, style: 1, custom_id: 'x', label: 'no' }] }] };
    expect(describeUnsupportedComponentTypes(rawRow.components)).toContain('Button');
    const rawSection = { components: [{ type: 9, components: [TD], accessory: { type: 2, style: 1, custom_id: 'x', label: 'no' } }] };
    expect(describeUnsupportedComponentTypes(rawSection.components)).toContain('Button');
  });
});
