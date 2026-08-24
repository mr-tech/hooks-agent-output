import { describe, it, expect, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import * as utils from '~/utils';
import { IS_COMPONENTS_V2_FLAG } from '~/constants';

const resolveContentLoss = (utils as any).resolveContentLoss;
const gateBeforePersist = (utils as any).gateBeforePersist;
const HAS_EC3 = typeof resolveContentLoss === 'function';

const V2 = [{ type: 17, components: [] }];
const AR = [{ type: 1, components: [] }];

// The plan's own 8-cell table, transcribed from planning rev 17 M8 "The class and its
// enumeration". Expected values are literals off that table, never computed from the code.
const TABLE = [
  { id: 'c1', bit: false, comps: undefined, content: undefined, row: 'A', mode: 'classic', notice: 'none',                 choice: false },
  { id: 'c2', bit: false, comps: undefined, content: 'hi',      row: 'A', mode: 'classic', notice: 'none',                 choice: false },
  { id: 'c3', bit: false, comps: V2,        content: undefined, row: 'B', mode: 'v2',      notice: 'warn-v2-flag-added',   choice: false },
  { id: 'c4', bit: false, comps: V2,        content: 'hi',      row: 'E', mode: null,      notice: 'choice',               choice: true  },
  { id: 'c5', bit: true,  comps: undefined, content: undefined, row: 'C', mode: 'v2',      notice: 'none',                 choice: false },
  { id: 'c6', bit: true,  comps: undefined, content: 'hi',      row: 'D', mode: 'classic', notice: 'warn-v2-flag-conflict',choice: false },
  { id: 'c7', bit: true,  comps: V2,        content: undefined, row: 'C', mode: 'v2',      notice: 'none',                 choice: false },
  { id: 'c8', bit: true,  comps: V2,        content: 'hi',      row: 'E', mode: null,      notice: 'choice',               choice: true  },
  // Action-Rows-only is "no V2 components" (D13); rides the same rows as comps: undefined.
  { id: 'c5b',bit: true,  comps: AR,        content: undefined, row: 'C', mode: 'v2',      notice: 'none',                 choice: false },
  { id: 'c1b',bit: false, comps: AR,        content: undefined, row: 'A', mode: 'classic', notice: 'none',                 choice: false },
];

describe.skipIf(!HAS_EC3)('CR4-A — the eight cells against the plan table', () => {
  for (const t of TABLE) {
    it(`${t.id}: bit=${t.bit} comps=${t.comps ? (t.comps[0].type === 17 ? 'V2' : 'AR') : 'none'} content=${!!t.content} -> ${t.row}`, () => {
      const d = resolveContentLoss(t.bit, t.comps, t.content, undefined);
      expect(d.row).toBe(t.row);
      expect(d.mode).toBe(t.mode);
      expect(d.noticeClass).toBe(t.notice);
      expect(d.requiresChoice).toBe(t.choice);
    });
  }
});

describe.skipIf(!HAS_EC3)('CR4-B — dropSet across the whole domain', () => {
  it('top-level dropSet is EMPTY in every one of the ten cells, row E included', () => {
    const seen = TABLE.map((t) => ({
      id: t.id, row: t.row,
      drop: JSON.stringify(resolveContentLoss(t.bit, t.comps, t.content, undefined).dropSet),
    }));
    const nonEmpty = seen.filter((s) => s.drop !== '[]');
    console.log('CR4-B dropSet by cell:', JSON.stringify(seen));
    expect(nonEmpty).toEqual([]); // documents the vestigial field: constant across the domain
  });

  it('row E reports dropSet [] on the ONE row where content is definitely lost', () => {
    const d = resolveContentLoss(true, V2, 'hi', undefined);
    expect(d.requiresChoice).toBe(true);
    expect(d.dropSet).toEqual([]);          // a caller branching on dropSet.length sees nothing
    expect(d.options?.length).toBe(2);      // the drops live only here
  });
});

describe.skipIf(!HAS_EC3)('CR4-C — the flagBit parameter invites a wrong bit at the call site', () => {
  it('a caller passing !!flags instead of !!(flags & BIT) misroutes a non-V2 flag', () => {
    const flags = 4; // SUPPRESS_EMBEDS — D7 residue, NOT the V2 bit
    const correct = resolveContentLoss(!!(flags & IS_COMPONENTS_V2_FLAG), undefined, 'hi', undefined);
    const misuse  = resolveContentLoss(!!flags, undefined, 'hi', undefined);
    console.log('CR4-C correct row', correct.row, 'misuse row', misuse.row);
    expect(correct.row).toBe('A');
    expect(misuse.row).toBe('D');           // silently warns and re-modes a message with no V2 bit
    expect(misuse.row).not.toBe(correct.row);
  });

  it('gateBeforePersist masks correctly and is NOT susceptible — the number contract is safe', () => {
    expect(gateBeforePersist({ flags: 4, content: 'hi' }).mustAsk).toBe(false);
    expect(gateBeforePersist({ flags: 4, components: V2, content: 'hi' }).mustAsk).toBe(true);
  });
});

describe.skipIf(!HAS_EC3)('CR4-D — gateBeforePersist over the domain', () => {
  it('mustAsk is true on exactly the two row-E cells and false on the other eight', () => {
    const rows = TABLE.map((t) => {
      const flags = t.bit ? IS_COMPONENTS_V2_FLAG : 0;
      return { id: t.id, expectedRow: t.row, mustAsk: gateBeforePersist({ flags, components: t.comps, content: t.content }).mustAsk };
    });
    console.log('CR4-D gate:', JSON.stringify(rows));
    for (const r of rows) expect(r.mustAsk).toBe(r.expectedRow === 'E');
  });

  it('an empty draft does not ask', () => {
    expect(gateBeforePersist({}).mustAsk).toBe(false);
  });
});

describe.skipIf(!HAS_EC3)('CR4-E — content emptiness boundary (D13 reading (i))', () => {
  it('whitespace-only content is NOT content, so V2 components stay row B not row E', () => {
    expect(resolveContentLoss(false, V2, '   ', undefined).row).toBe('B');
  });
  it('an embed with a meaningful field IS content, so it reaches row E', () => {
    expect(resolveContentLoss(false, V2, undefined, [{ title: 'x' }]).row).toBe('E');
  });
  it('an empty embed object is NOT content', () => {
    expect(resolveContentLoss(false, V2, undefined, [{}]).row).toBe('B');
  });
});
