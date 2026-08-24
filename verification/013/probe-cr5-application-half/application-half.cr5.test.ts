import { describe, it, expect, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import * as utils from '~/utils';
import { IS_COMPONENTS_V2_FLAG } from '~/constants';

const resolveContentLoss = (utils as any).resolveContentLoss;
const applyDisposition = (utils as any).applyDisposition;
const gateBeforePersist = (utils as any).gateBeforePersist;

const V2 = [{ type: 17, components: [] }];
const AR = [{ type: 1, components: [] }];
const BIT = IS_COMPONENTS_V2_FLAG;

describe('CR5-A — the eight cells survive the signature change (flags: number)', () => {
  const TABLE = [
    { id: 'c1', flags: 0,   comps: undefined, content: undefined, row: 'A', mode: 'classic' },
    { id: 'c2', flags: 0,   comps: undefined, content: 'hi',      row: 'A', mode: 'classic' },
    { id: 'c3', flags: 0,   comps: V2,        content: undefined, row: 'B', mode: 'v2' },
    { id: 'c4', flags: 0,   comps: V2,        content: 'hi',      row: 'E', mode: null },
    { id: 'c5', flags: BIT, comps: undefined, content: undefined, row: 'C', mode: 'v2' },
    { id: 'c6', flags: BIT, comps: undefined, content: 'hi',      row: 'D', mode: 'classic' },
    { id: 'c7', flags: BIT, comps: V2,        content: undefined, row: 'C', mode: 'v2' },
    { id: 'c8', flags: BIT, comps: V2,        content: 'hi',      row: 'E', mode: null },
  ];
  for (const t of TABLE) {
    it(`${t.id} -> row ${t.row}`, () => {
      const d = resolveContentLoss(t.flags, t.comps, t.content, undefined);
      expect(d.row).toBe(t.row);
      expect(d.mode).toBe(t.mode);
      expect('dropSet' in d).toBe(false);  // MEDIUM-1: the dead field is gone
    });
  }
  it('MEDIUM-3 is closed: a non-V2 flag no longer misroutes', () => {
    expect(resolveContentLoss(4, undefined, 'hi', undefined).row).toBe('A');
    expect(resolveContentLoss(4 | BIT, undefined, 'hi', undefined).row).toBe('D');
  });
  it('the OLD boolean call shape now silently under-reads rather than type-erroring at runtime', () => {
    // true & 32768 === 0 — a stale caller passing a boolean gets the flag-clear branch.
    expect(resolveContentLoss(true as any, undefined, 'hi', undefined).row).toBe('A');
    expect(resolveContentLoss(BIT, undefined, 'hi', undefined).row).toBe('D');
  });
});

describe('CR5-B — the advertised dropSet versus what is actually enacted', () => {
  it('the CLASSIC option advertises dropping "components" but Action Rows SURVIVE', () => {
    const d = resolveContentLoss(0, [...V2, ...AR], 'hi', undefined);
    expect(d.row).toBe('E');
    const classic = d.options.find((o: any) => o.mode === 'classic');
    expect(classic.dropSet).toEqual(['components']);          // advertised: all components
    const after = applyDisposition({ flags: 0, content: 'hi', embeds: [], components: [...V2, ...AR] }, d, classic);
    console.log('CR5-B classic-option result components:', JSON.stringify(after.components));
    expect(after.components).toEqual([{ type: 1, components: [] }]); // enacted: Action Rows kept
    expect(after.content).toBe('hi');
  });
  it('the V2 option advertises content+embeds and enacts exactly that', () => {
    const d = resolveContentLoss(0, V2, 'hi', undefined);
    const v2 = d.options.find((o: any) => o.mode === 'v2');
    expect(v2.dropSet).toEqual(['content', 'embeds']);
    const after = applyDisposition({ flags: 0, content: 'hi', embeds: [{ title: 't' }], components: V2 }, d, v2);
    expect(after.content).toBe('');
    expect(after.embeds).toEqual([]);
    expect(after.flags & BIT).toBe(BIT);
  });
  it('applyDisposition never reads dropSet at all — an arbitrary dropSet changes nothing', () => {
    const d = resolveContentLoss(0, V2, 'hi', undefined);
    const bogus = { mode: 'v2', dropSet: ['nothing', 'at', 'all'] };
    const after = applyDisposition({ flags: 0, content: 'hi', embeds: [], components: V2 }, d, bogus as any);
    expect(after.content).toBe('');   // content still dropped despite dropSet not naming it
  });
});

describe('CR5-C — the guard, re-attacked', () => {
  it('row E with no chosenOption throws, and names the parameter', () => {
    const d = resolveContentLoss(0, V2, 'hi', undefined);
    expect(() => applyDisposition({ content: 'hi', components: V2 }, d)).toThrow(/chosenOption/);
  });
  it('row E accepts an option that is NOT one of the two offered', () => {
    const d = resolveContentLoss(0, V2, 'hi', undefined);
    const notOffered = { mode: 'classic', dropSet: [] };
    expect(() => applyDisposition({ content: 'hi', components: V2 }, d, notOffered as any)).not.toThrow();
  });
  it('a settled row IGNORES a stray chosenOption rather than rejecting it', () => {
    const d = resolveContentLoss(BIT, undefined, 'hi', undefined); // row D, mode classic
    const stray = { mode: 'v2', dropSet: ['content', 'embeds'] };
    const after = applyDisposition({ flags: BIT, content: 'hi', embeds: [] }, d, stray as any);
    expect(after.content).toBe('hi');   // the stray v2 option did NOT destroy the body
    expect(after.flags & BIT).toBe(0);
  });
});

describe('CR5-D — draft and disposition are not tied to each other', () => {
  it('a disposition computed from one draft, applied to another, silently destroys a body', () => {
    const emptyV2 = { flags: 0, content: undefined, embeds: undefined, components: V2 };
    const d = resolveContentLoss(emptyV2.flags, emptyV2.components, emptyV2.content, emptyV2.embeds);
    expect(d.row).toBe('B');            // "nothing to lose - save as V2"
    expect(d.requiresChoice).toBe(false);

    const otherDraft = { flags: 0, content: 'a body the user typed', embeds: [{ title: 'keep me' }], components: V2 };
    expect(gateBeforePersist(otherDraft).mustAsk).toBe(true);   // this draft is row E - it MUST ask
    const after = applyDisposition(otherDraft, d);              // but the stale row-B disposition applies
    console.log('CR5-D content after mismatched apply:', JSON.stringify(after.content), 'embeds:', JSON.stringify(after.embeds));
    expect(after.content).toBe('');     // destroyed, with no choice presented
    expect(after.embeds).toEqual([]);
  });
});
