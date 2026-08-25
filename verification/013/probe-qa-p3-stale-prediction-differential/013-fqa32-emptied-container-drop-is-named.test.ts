/**
 * ============================================================================================
 * WITHDRAWN 2026-08-25 BY OWNER RULING. DO NOT IMPLEMENT AGAINST THIS SPEC.
 *
 * This spec asserts that a composite the lenient filter empties must be NAMED to the user. The
 * owner has ruled the opposite, in his own wording and unprompted: offered an option labelled
 * "Remove it, and say so", he rewrote the label to **"Remove it, don't say so"** and submitted
 * that. The silence is INTENDED. An implementer who makes these assertions pass builds the
 * behaviour he declined.
 *
 * QA does not merely defer to the ruling — it agrees with it. An emptied Container is an EMPTY
 * BOX: nothing was in it, so nothing is lost by removing it, and naming the removal is noise on
 * a path where nothing happened. The case where content IS lost — a composite emptied BY an
 * unsupported child — is named already, and the control below ("a Container emptied BY an
 * unsupported child names that child" -> ["Select Menu"]) is what proves it.
 *
 * The file is retained struck rather than deleted: it is the record of what was measured, and
 * its four CONTROLS remain true statements about the shipped filter.
 *
 * See the QA document, "P3.18 — BC-6 reaches unsupported TYPES, not emptied instances".
 * ============================================================================================
 *
 * PRE-REGISTERED FAILING SPEC — F-QA32. Written by QA before any fix exists.
 *
 * DO NOT UPDATE THE EXPECTATIONS TO MATCH THE CODE. A disagreement here is a finding.
 *
 * THE DEFECT. `filterTopLevelComponent` (src/server/api/utils/shapes.ts) drops a Container that
 * has no surviving children by returning `null` — WITHOUT calling `dropped?.add(...)`. The same
 * holds for an Action Row left with no buttons. `describeUnsupportedComponentTypes` therefore
 * returns `[]`, so the surfaces render no "Not supported on Hooks.gg:" notice, and the component
 * is removed from the user's message with nothing said anywhere.
 *
 * THE USER-VISIBLE OUTCOME, executed (verification/013/probe-qa-p3-stale-prediction-differential/
 * report-2d90e8a.txt, section E2): pasting
 *     {"content":"hi","components":[{"type":17,"components":[]}]}
 * yields disposition row A with settledNotice null, contentFloorError null and no dropped-types
 * notice — a GREEN state over a component that was silently deleted. That is the exact failure
 * BC-5's operator-terms cell names: "Green means safe. A green state over an empty object teaches
 * the user to trust it."
 *
 * SCOPE. This is BC-6's class — "the lenient filter NAMES the dropped types" — and BC-6's stated
 * example (a top-level Thumbnail-11) is only one member of it. The emptied-container member is
 * not covered by any existing fixture. Pre-existing: unchanged at 4a7126b, d7c4836 and 2d90e8a.
 * D34 (e343927) did not create it, but it widened the surrounding input class from "rejected" to
 * "accepted", so more payloads now reach this path than before.
 *
 * WHAT A FIX MUST NOT DO. The four controls below must stay green: a Container that keeps a child
 * is not a drop, and the existing named drops must keep being named exactly as they are.
 */
import { describe, expect, it, vi } from 'vitest';

import { describeUnsupportedComponentTypes, discordMessageImportShape } from '~/server/api/utils/shapes';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const CONTAINER = { type: 17, components: [{ type: 10, content: 'hello' }] };
const THUMB = { type: 11, media: { url: 'https://example.invalid/a.png' } };
const SELECT = { type: 3, custom_id: 'x', options: [] };

/** Top-level components that survive the real lenient filter, via the real import shape. */
function kept(components: unknown): unknown[] {
  const out = discordMessageImportShape.parse({ content: 'x', components }) as { components?: unknown[] };
  return out.components ?? [];
}

/**
 * The invariant, stated as a fact of the domain and not read off the implementation:
 * whenever the filter removes a top-level component, the user is told something was removed.
 */
function isSilentDrop(components: unknown[]): boolean {
  return kept(components).length < components.length
    && describeUnsupportedComponentTypes(components).length === 0;
}

describe('F-QA32 — every component the lenient filter removes is named to the user', () => {
  it('a Container emptied of children is not dropped silently', () => {
    expect(isSilentDrop([{ type: 17, components: [] }])).toBe(false);
  });

  it('an Action Row with no buttons is not dropped silently', () => {
    expect(isSilentDrop([{ type: 1, components: [] }])).toBe(false);
  });

  it('the emptied Container does not produce a green state beside surviving classic content', () => {
    const components = [{ type: 17, components: [] }];
    expect(kept(components)).toHaveLength(0);
    // Something must reach the user. Today: nothing does.
    expect(describeUnsupportedComponentTypes(components).length).toBeGreaterThan(0);
  });

  // ---- POSITIVE CONTROLS. Each already passes and must keep passing after any fix.
  it('CONTROL: an unsupported top-level type is still named', () => {
    expect(describeUnsupportedComponentTypes([THUMB])).toEqual(['Thumbnail']);
    expect(isSilentDrop([THUMB])).toBe(false);
  });

  it('CONTROL: a Container emptied BY an unsupported child names that child', () => {
    expect(describeUnsupportedComponentTypes([{ type: 17, components: [SELECT] }])).toEqual(['Select Menu']);
    expect(isSilentDrop([{ type: 17, components: [SELECT] }])).toBe(false);
  });

  it('CONTROL: a Container that keeps a child is not a drop and names nothing', () => {
    expect(kept([CONTAINER])).toHaveLength(1);
    expect(describeUnsupportedComponentTypes([CONTAINER])).toEqual([]);
    expect(isSilentDrop([CONTAINER])).toBe(false);
  });

  it('CONTROL: no components at all is not a drop', () => {
    expect(isSilentDrop([])).toBe(false);
    expect(describeUnsupportedComponentTypes(undefined)).toEqual([]);
  });
});
