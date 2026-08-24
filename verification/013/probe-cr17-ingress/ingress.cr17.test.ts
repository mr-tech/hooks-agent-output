import { describe, it, expect, vi } from 'vitest';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { ComponentType } from 'discord-api-types/v10';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import discordResponseToMessage from '~/utils/discordResponseToMessage';
import { discordMessageShape } from '~/server/api/utils/shapes';
import { IS_COMPONENTS_V2_FLAG } from '~/constants/messageLimits';

/**
 * CR17 — M3 Discord ingress at 12f4ce6. discordResponseToMessage and
 * discordMessageShape are the REAL ones (imported), so this reads the tree.
 */

const author = { username: 'u', id: '123', avatar: null, discriminator: '0' };
const base = (over: any) => ({ author, content: '', embeds: [], components: [], flags: 0, ...over });

describe('CR17-A — the whole flags field is carried (RULED-ACCEPTABLE, not a finding)', () => {
  // Architecture system-architecture.md:91, owner ruling: non-V2 bits are
  // "user data that passes through every surface unexamined and unchanged."
  it('SUPPRESS_EMBEDS (4) rides through unchanged alongside the V2 bit', () => {
    const SUPPRESS_EMBEDS = 4;
    const flags = SUPPRESS_EMBEDS | IS_COMPONENTS_V2_FLAG;
    const { data } = discordResponseToMessage(base({
      flags, components: [{ type: ComponentType.TextDisplay, content: 'hi' }],
    }));
    // The whole field is preserved — conformant with the pass-through ruling.
    expect(data.flags).toBe(flags);
    expect((data.flags! & IS_COMPONENTS_V2_FLAG)).toBe(IS_COMPONENTS_V2_FLAG);
    expect((data.flags! & SUPPRESS_EMBEDS)).toBe(SUPPRESS_EMBEDS);
  });

  it('flags 0 produces no flags key (falsy guard)', () => {
    const { data } = discordResponseToMessage(base({ flags: 0 }));
    expect(data.flags).toBeUndefined();
  });
});

describe('CR17-B — M3-b core: converter kept-set EXACTLY matches the strict persist shape', () => {
  const KEEP_TOP = [1, 9, 10, 12, 13, 14, 17];
  const wellFormed: Record<number, any> = {
    1: { type: 1, components: [{ type: 2, style: 5, label: 'b', url: 'https://e.com' }] },
    9: { type: 9, components: [{ type: 10, content: 'x' }], accessory: { type: 11, media: { url: 'https://e.com/a.png' } } },
    10: { type: 10, content: 'x' },
    12: { type: 12, items: [{ media: { url: 'https://e.com/a.png' } }] },
    13: { type: 13, file: { url: 'https://e.com/a.png' } },
    14: { type: 14, divider: true, spacing: 1 },
    17: { type: 17, components: [{ type: 10, content: 'x' }] },
  };

  it('every kept top-level type survives BOTH the converter and the strict shape', () => {
    for (const t of KEEP_TOP) {
      const { data, droppedComponentTypes } = discordResponseToMessage(base({
        flags: IS_COMPONENTS_V2_FLAG, components: [wellFormed[t]],
      }));
      expect(droppedComponentTypes, `type ${t} should be kept`).toEqual([]);
      const parsed = discordMessageShape.safeParse(data);
      expect(parsed.success, `type ${t} should persist: ${JSON.stringify(parsed.success ? '' : (parsed as any).error?.issues)}`).toBe(true);
    }
  });

  it('an unsupported top-level type (Select 3) is dropped and LABELLED', () => {
    const { droppedComponentTypes } = discordResponseToMessage(base({
      flags: IS_COMPONENTS_V2_FLAG,
      components: [{ type: 3, custom_id: 'x', options: [] }, { type: 10, content: 'keep' }],
    }));
    expect(droppedComponentTypes).toContain('Select Menu');
  });

  it('a non-link button inside an ActionRow is dropped and LABELLED', () => {
    const { droppedComponentTypes } = discordResponseToMessage(base({
      components: [{ type: 1, components: [
        { type: 2, style: 1, label: 'interactive', custom_id: 'x' },
        { type: 2, style: 5, label: 'link', url: 'https://e.com' },
      ] }],
    }));
    expect(droppedComponentTypes).toContain('Button');
  });
});

describe('CR17-C — the gap: a Section accessory is NOT filtered, so a non-link button accessory persists opaquely', () => {
  const sectionWithButtonAccessory = {
    type: ComponentType.Section,
    components: [{ type: 10, content: 'text' }],
    accessory: { type: 2, style: 1, label: 'interactive', custom_id: 'x' }, // NON-link button
  };

  it('the converter carries the Section unchanged — the interactive accessory is NOT dropped', () => {
    const { data, droppedComponentTypes } = discordResponseToMessage(base({
      flags: IS_COMPONENTS_V2_FLAG, components: [sectionWithButtonAccessory],
    }));
    // M3-b's loud-drop does NOT fire — the accessory is neither a top-level nor
    // a container-child type, so it is outside the class the converter filters.
    expect(droppedComponentTypes).toEqual([]);
    expect((data.components as any)[0].accessory.style).toBe(1); // carried as-is
  });

  it('the carried Section then FAILS the strict persist shape — opaque, not loud', () => {
    const { data } = discordResponseToMessage(base({
      flags: IS_COMPONENTS_V2_FLAG, components: [sectionWithButtonAccessory],
    }));
    const parsed = discordMessageShape.safeParse(data);
    // This is the D9-avoided failure mode: an opaque Zod rejection at upsert,
    // with no named drop telling the user what to remove.
    expect(parsed.success).toBe(false);
  });

  it('a thumbnail accessory (the common case) persists fine — so the gap is only non-link buttons', () => {
    const { data } = discordResponseToMessage(base({
      flags: IS_COMPONENTS_V2_FLAG,
      components: [{ type: 9, components: [{ type: 10, content: 't' }], accessory: { type: 11, media: { url: 'https://e.com/a.png' } } }],
    }));
    expect(discordMessageShape.safeParse(data).success).toBe(true);
  });

  it('REPORT', () => {
    writeFileSync(join(__dirname, 'ingress-findings.txt'), [
      'CR17 — M3 Discord ingress at 12f4ce6.',
      '',
      'A. whole flags field carried -> RULED-ACCEPTABLE (arch:91 pass-through). Not a finding.',
      'B. converter kept-set == strict persist shape discriminants {1,9,10,12,13,14,17}. Clean.',
      '   unsupported top-level + non-link ActionRow buttons dropped and labelled. Clean.',
      'C. GAP: a Section accessory is never filtered. A non-link (interactive) button',
      '   accessory is carried unchanged, then FAILS discordMessageShape at persist with',
      '   an opaque Zod error -- the exact D9-avoided mode. Thumbnail accessory is fine.',
      '   Outside M3-b\'s declared class (accessories are neither top-level nor container-child).',
      '',
    ].join('\n'));
    expect(true).toBe(true);
  });
});

import { gateBeforePersist, validateContentRequirements, applyDisposition } from '~/utils';

/**
 * CR17-D — RETRACTED AS A LIVE DEFECT, kept as a reachability result.
 *
 * I first read M3-c's `disableSave |= !!contentFloorError` as blocking the M8-G
 * row-E choice, because validateContentRequirements errors on row E (V2+content),
 * not only on empty. The MECHANICS are real (asserted below). But it is NOT a
 * reachable defect: `loadedMessage` in NewMessageModal can never be row E, so the
 * block never fires on a row-E message. Chasing reachability rather than asserting
 * it is what retracted this.
 *
 * WHY loadedMessage is never row E:
 *   loadedMessage = discordMessage ?? webhookMessage ?? commandMessage ?? jsonMessage
 *   - the first three are Discord ingress; Discord never sends V2 + content.
 *   - jsonMessage is set ONLY by NewMessageJsonInput, which resolves row E in its
 *     OWN choice UI and calls setMessage(applyDisposition(...)) — a RESOLVED message
 *     with the mutual exclusivity already collapsed to one mode.
 * So gateBeforePersist(loadedMessage).mustAsk is always false here, which also
 * means M8-G's pendingChoice branch in NewMessageModal is DEAD CODE (INFO).
 */
describe('CR17-D — the mechanics (real) and the reachability (which retracts the defect)', () => {
  const rowE = {
    components: [{ type: 10, content: 'a text display (V2)' }],
    content: 'classic content that cannot coexist',
    flags: IS_COMPONENTS_V2_FLAG,
  } as any;

  const contentFloorError = (m: any) => validateContentRequirements(m);
  const disableSave = (loadedMessage: any) => !loadedMessage
    || !!(loadedMessage ? contentFloorError(loadedMessage) : undefined);

  it('MECHANICS: IF a row-E message reached loadedMessage, Save would be disabled while the choice is owed', () => {
    expect(gateBeforePersist(rowE).mustAsk).toBe(true);   // choice owed
    expect(disableSave(rowE)).toBe(true);                 // ...but Save disabled
  });

  it('REACHABILITY: the two real NewMessageJsonInput emit-arms never yield row E', () => {
    // Arm 1 (row E): requiresChoice branch -> commitChoice -> applyDisposition(v, mode).
    //   The no-mode form THROWS on row E, and the code guards it (requiresChoice
    //   is handled before line 111), so only the mode arms are emitted for row E.
    expect(() => applyDisposition(rowE)).toThrow(/chosenMode is required/);
    for (const out of [applyDisposition(rowE, 'v2'), applyDisposition(rowE, 'classic')]) {
      expect(gateBeforePersist(out).mustAsk).toBe(false);   // resolved, never row E
    }
    // Arm 2 (settled, non-row-E): applyDisposition(validated) with no mode is only
    // reached when !requiresChoice, so its input is already not row E.
    const settledInput = { content: 'classic only', components: [], embeds: [] } as any;
    expect(gateBeforePersist(applyDisposition(settledInput)).mustAsk).toBe(false);
  });

  it('CONSEQUENCE: M3-c blocks EMPTY (correct) and does not block any reachable choice', () => {
    const empty = { content: '', components: [], embeds: [] } as any;
    expect(gateBeforePersist(empty).mustAsk).toBe(false);
    expect(disableSave(empty)).toBe(true);   // M3-c blocks empty, fail-safe, no choice owed
  });

  it('a valid classic message is not blocked', () => {
    expect(disableSave({ content: 'hello', components: [], embeds: [] } as any)).toBe(false);
  });
});

import { discordMessageImportShape } from '~/server/api/utils/shapes';

/**
 * CR17-E — is the Section-accessory gap M3-specific, or shared with the paste path?
 */
describe('CR17-E — Section non-link accessory: ingress defers to opaque save-fail; paste catches at paste', () => {
  const section = {
    type: 9,
    components: [{ type: 10, content: 'text' }],
    accessory: { type: 2, style: 1, label: 'interactive', custom_id: 'x' },
  };
  const raw = { content: '', components: [section], flags: IS_COMPONENTS_V2_FLAG };

  it('paste path: discordMessageImportShape REJECTS it at paste time (loud, in NewMessageJsonInput)', () => {
    const parsed = discordMessageImportShape.safeParse(raw);
    expect(parsed.success).toBe(false);
  });

  it('ingress path: the converter carries it (no shape at ingress), deferring to an opaque save-fail', () => {
    const { data, droppedComponentTypes } = discordResponseToMessage(base({
      flags: IS_COMPONENTS_V2_FLAG, components: [section],
    }));
    expect(droppedComponentTypes).toEqual([]);              // not named
    expect(discordMessageShape.safeParse(data).success).toBe(false); // fails only at persist
  });
});
