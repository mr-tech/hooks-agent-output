import { describe, it, expect, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { IS_COMPONENTS_V2_FLAG } from '~/constants';
import { messageShape, discordMessageImportShape } from '~/server/api/utils/shapes';
import { applyDisposition, resolveContentLoss, describeDropSet, hasV2Components } from '~/utils';
import { applyModeSwitch } from '~/utils/messageMode';

const BIT = IS_COMPONENTS_V2_FLAG;
const CONTAINER = { type: 17, components: [{ type: 10, content: 'hello' }] };
const ACTION_ROW = { type: 1, components: [{ type: 2, style: 5, label: 'b', url: 'https://example.com' }] };

// ORACLE, stated before the attack: a payload "lands" if the server-side validator
// RETURNS it (parse success). The 5712 shape is: the V2 flag bit set, AND classic
// content (content or a meaningful embed) present on the same record.
function is5712(data: { flags?: unknown, content?: unknown, embeds?: unknown[] }): boolean {
  const flagged = !!(((data.flags as number | undefined) ?? 0) & BIT);
  const classic = !!(typeof data.content === 'string' && data.content.trim())
    || !!(Array.isArray(data.embeds) && data.embeds.length > 0);
  return flagged && classic;
}

describe('CR7-A — the server-side persist surface accepts the shape D19 exists to abolish', () => {
  const PAYLOADS = [
    { name: 'flag + content', data: { flags: BIT, content: 'a body the user typed' } },
    { name: 'flag + embed', data: { flags: BIT, embeds: [{ title: 'x' }] } },
    { name: 'flag + content + V2 container', data: { flags: BIT, content: 'hi', components: [CONTAINER] } },
    { name: 'flag + embed + V2 container', data: { flags: BIT, embeds: [{ title: 'x' }], components: [CONTAINER] } },
    { name: 'flag + content + embed + container', data: { flags: BIT, content: 'hi', embeds: [{ title: 'x' }], components: [CONTAINER] } },
    { name: 'residue flag 4 | BIT + content', data: { flags: 4 | BIT, content: 'hi' } },
  ];

  for (const p of PAYLOADS) {
    it(`messageShape ACCEPTS a 5712-shaped record: ${p.name}`, () => {
      const res = messageShape.safeParse({ name: 'probe', data: p.data });
      expect(res.success).toBe(true);
      expect(is5712(p.data)).toBe(true);
    });
  }

  it('NEGATIVE CONTROL: the same validator DOES reject something, so acceptance is meaningful', () => {
    const tooLong = { name: '', data: { content: 'x' } };
    expect(messageShape.safeParse(tooLong).success).toBe(false);
    const badFlags = { name: 'probe', data: { flags: -1, content: 'hi' } };
    expect(messageShape.safeParse(badFlags).success).toBe(false);
  });

  it('there is no mutual-exclusivity refinement anywhere on the persist input shape', () => {
    // Enumerated by execution rather than by reading: if such a refinement existed,
    // at least one of the six 5712 payloads above would fail. None do.
    const accepted = PAYLOADS.filter((p) => messageShape.safeParse({ name: 'probe', data: p.data }).success);
    expect(accepted.length).toBe(PAYLOADS.length);
  });
});

describe('CR7-B — the Load path: what filterSupportedComponents leaves for switchToClassic', () => {
  it('the import shape admits ONLY type 1 or a V2 type at top level, so switchToClassic\'s type===1 filter is exact', () => {
    const raw = {
      content: 'hi',
      components: [
        ACTION_ROW,
        CONTAINER,
        { type: 2, style: 5, label: 'naked button', url: 'https://example.com' },
        { type: 3, custom_id: 'z', options: [{ label: 'a', value: 'a' }] },
      ],
    };
    const parsed = discordMessageImportShape.parse(raw) as { components: { type: number }[] };
    const types = parsed.components.map((c) => c.type).sort((a, b) => a - b);
    expect(types).toEqual([1, 17]);
    // Everything the shape admits is either kept by switchToClassic (type 1) or is a V2 type.
    for (const t of types) {
      const keptByClassic = t === 1;
      const isV2 = hasV2Components([{ type: t }]);
      expect(keptByClassic !== isV2).toBe(true);
    }
  });

  it('BUT the pre-parse strip is silent: components the user pasted vanish with no notice and no row-E choice', () => {
    const raw = {
      content: 'hi',
      components: [{ type: 3, custom_id: 'z', options: [{ label: 'a', value: 'a' }] }],
    };
    const parsed = discordMessageImportShape.parse(raw) as { components: { type: number }[] };
    expect(parsed.components).toEqual([]);
    const d = resolveContentLoss(0, parsed.components, 'hi', undefined);
    expect(d.row).toBe('A');
    expect(d.requiresChoice).toBe(false);
    expect(d.noticeClass).toBe('none');
  });

  it('a container whose children are ALL unsupported is dropped entirely, again silently', () => {
    const raw = {
      content: 'hi',
      components: [{ type: 17, components: [{ type: 3, custom_id: 'z', options: [{ label: 'a', value: 'a' }] }] }],
    };
    const parsed = discordMessageImportShape.parse(raw) as { components: { type: number }[] };
    expect(parsed.components).toEqual([]);
    expect(resolveContentLoss(0, parsed.components, 'hi', undefined).requiresChoice).toBe(false);
  });
});

describe('CR7-C — applyDisposition after the round-6 fix: the mode signature, re-attacked', () => {
  it('the stale-label replay from round 6 (CR6-C) is now unrepresentable: no label crosses the boundary', () => {
    expect(applyDisposition.length).toBe(2);
    expect(String(applyDisposition)).not.toMatch(/chosenOption/);
  });

  it('a mode is honoured on row E and IGNORED on every settled row', () => {
    const rowE = { flags: 0, content: 'hi', embeds: [], components: [CONTAINER] };
    expect(applyDisposition(rowE as never, 'v2').content).toBe('');
    expect(applyDisposition(rowE as never, 'classic').components).toEqual([]);
    // settled rows re-derive and ignore the caller entirely
    const rowD = { flags: BIT, content: 'hi', embeds: [], components: [] };
    expect(applyDisposition(rowD as never, 'v2').content).toBe('hi');
    expect(!!(applyDisposition(rowD as never, 'v2').flags! & BIT)).toBe(false);
  });

  it('GUARD re-attacked from first principles: every falsy / non-mode value on row E', () => {
    const rowE = { flags: 0, content: 'hi', embeds: [], components: [CONTAINER] };
    for (const bad of [undefined, null, '', 0, false, NaN]) {
      expect(() => applyDisposition(rowE as never, bad as never)).toThrow(/chosenMode/);
    }
  });

  it('GUARD HOLE: a truthy non-mode string is NOT rejected — it falls through to Classic', () => {
    const rowE = { flags: 0, content: 'hi', embeds: [], components: [CONTAINER] };
    const out = applyDisposition(rowE as never, 'V2' as never); // wrong case
    expect(out.content).toBe('hi');       // NOT cleared
    expect(out.components).toEqual([]);   // components dropped instead
    expect(applyModeSwitch('V2' as never, rowE as never).components).toEqual([]);
  });
});

describe('CR7-D — describeDropSet: the notice the user actually reads', () => {
  it('a partial components drop is described as "your Components V2 components"', () => {
    const draft = { flags: 0, content: 'hi', embeds: [], components: [CONTAINER, ACTION_ROW] };
    const d = resolveContentLoss(draft.flags, draft.components, draft.content, draft.embeds);
    const classic = d.options!.find((o) => o.mode === 'classic')!;
    expect(describeDropSet(classic.dropSet)).toBe('This will drop your Components V2 components.');
    const after = applyModeSwitch('classic', draft as never) as unknown as { components: unknown[] };
    expect(after.components).toEqual([ACTION_ROW]); // the Action Row survives; the notice is true
  });

  it('describeDropSet on an empty set says nothing will be lost — and no row-E option can be empty', () => {
    expect(describeDropSet([])).toBe('Nothing will be lost.');
    const draft = { flags: 0, content: 'hi', embeds: [], components: [CONTAINER] };
    const d = resolveContentLoss(draft.flags, draft.components, draft.content, draft.embeds);
    for (const o of d.options!) expect(o.dropSet.length).toBeGreaterThan(0);
  });
});
