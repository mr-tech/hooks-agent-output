import { describe, it, expect, afterAll, vi } from 'vitest';
import { writeFileSync } from 'fs';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { IS_COMPONENTS_V2_FLAG } from '~/constants/messageLimits';
import { hasV2Components, validateContentRequirements } from '~/utils';
// Namespace import, not a named one: the three M7 exports do not exist on pre-M7 trees, and a
// missing NAMED export is a link-time error while a missing namespace member is just `undefined`.
// One instrument therefore runs against every tree.
import * as modeModule from '~/utils/messageMode';

const LABEL = process.env.PROBE_LABEL ?? 'unlabelled';
const OUT = process.env.PROBE_OUT;
const SUPPRESS_EMBEDS = 4;
const SUPPRESS_NOTIFICATIONS = 4096;
const V2_ERROR = 'Components V2 messages cannot contain embeds or content.';

type Data = Record<string, unknown>;

// ---------------------------------------------------------------------------
// The OLD side is a MODEL, not a probe, and is declared as one.
//
// `detectMode` at 495463a is declared inside `useValue()` in a React provider and is not
// importable. Its decision, quoted verbatim from `git show 495463a:src/providers/
// MessageProvider/index.tsx`, is:
//
//     if (msg?.data?.components) {
//       const isV2 = hasV2Components(msg.data.components as { type: number }[]);
//       editableState.setMessageMode(isV2 ? 'v2' : 'classic');
//     }
//
// The two lines below are that condition and nothing else; `hasV2Components` is the REAL one,
// imported from the tree under test, so the only transcribed part is the guard. Everything on
// the NEW side is imported and nothing about it is modelled.
// ---------------------------------------------------------------------------
function oldMode(data: Data): 'v2' | 'classic' | null {
  if (!data.components) return null; // no mode written at all — research G4
  return hasV2Components(data.components as { type: number }[]) ? 'v2' : 'classic';
}

const detectMessageMode = (modeModule as { detectMessageMode?: (m: unknown) => unknown })
  .detectMessageMode;
const isMessageV2 = (modeModule as { isMessageV2?: (d: unknown) => boolean }).isMessageV2;
const showV2PatchWarningFn = (modeModule as {
  showV2PatchWarning?: (m: unknown, o: unknown, s: boolean) => boolean;
}).showV2PatchWarning;

const HAS_M7 = typeof detectMessageMode === 'function';

function newMode(data: Data): 'v2' | 'classic' | null {
  if (!HAS_M7) return oldMode(data);
  return detectMessageMode!({ data }) as 'v2' | 'classic' | null;
}

function effectiveIsV2(data: Data): boolean {
  // On a pre-M7 tree the product's answer to "is this V2" at these two call sites is the bare
  // structural one, which is precisely the defect M7 exists to fix.
  if (typeof isMessageV2 === 'function') return isMessageV2(data);
  return hasV2Components(data.components as { type: number }[] | undefined);
}

function oldWarning(message: Data | null, oldMessage: unknown, showEdit: boolean): boolean {
  // Quoted verbatim from 495463a's send/page.tsx:
  //   const messageHasV2 = message?.data?.components
  //     ? hasV2Components(message.data.components as { type: number }[]) : false;
  //   const showV2PatchWarning = showEdit && !!oldMessage && messageHasV2;
  const d = message?.data as Data | undefined;
  const messageHasV2 = d?.components
    ? hasV2Components(d.components as { type: number }[])
    : false;
  return showEdit && !!oldMessage && messageHasV2;
}

function newWarning(message: Data | null, oldMessage: unknown, showEdit: boolean): boolean {
  if (typeof showV2PatchWarningFn !== 'function') return oldWarning(message, oldMessage, showEdit);
  return showV2PatchWarningFn(message, oldMessage, showEdit);
}

// ---------------------------------------------------------------------------
// The input class: every combination of (flags bit state) x (component structure).
// Flags column covers absent, zero, the V2 bit alone, the V2 bit beside an unrelated bit, and
// unrelated bits alone (D7's residue). Components column covers absent, empty, Action-Rows-only
// (D12/OQ-7's shape), a V2 leaf, and a V2 container.
// ---------------------------------------------------------------------------
const FLAG_CASES: [string, Data][] = [
  ['flags absent', {}],
  ['flags 0', { flags: 0 }],
  ['V2 bit', { flags: IS_COMPONENTS_V2_FLAG }],
  ['V2 bit + SUPPRESS_NOTIFICATIONS', { flags: IS_COMPONENTS_V2_FLAG | SUPPRESS_NOTIFICATIONS }],
  ['SUPPRESS_EMBEDS only', { flags: SUPPRESS_EMBEDS }],
  ['SUPPRESS_NOTIFICATIONS only', { flags: SUPPRESS_NOTIFICATIONS }],
];

const COMPONENT_CASES: [string, Data][] = [
  ['components absent', {}],
  ['components []', { components: [] }],
  ['ActionRow only', { components: [{ type: 1, components: [] }] }],
  ['V2 TextDisplay', { components: [{ type: 10, content: 'x' }] }],
  ['V2 Container', { components: [{ type: 17, components: [] }] }],
  ['ActionRow + V2 Container', { components: [{ type: 1, components: [] }, { type: 17, components: [] }] }],
];

type Row = {
  id: string; data: Data; flagSet: boolean; structuralV2: boolean;
};

const CORPUS: Row[] = [];
FLAG_CASES.forEach(([fName, f], fi) => {
  COMPONENT_CASES.forEach(([cName, c], ci) => {
    const data = { ...f, ...c };
    CORPUS.push({
      id: `R${fi}${ci}`,
      data,
      flagSet: !!(((data.flags as number | undefined) ?? 0) & IS_COMPONENTS_V2_FLAG),
      structuralV2: hasV2Components(data.components as { type: number }[] | undefined),
    });
    void cName; void fName;
  });
});

const matrix: string[] = [`=== CR3 matrix (${LABEL}) === M7 exports present: ${HAS_M7}`];
function record(line: string) { matrix.push(line); }

// ===========================================================================
describe('A — M7-a: the mode predicate and validateContentRequirements never disagree', () => {
  CORPUS.forEach((row) => {
    const expected = row.flagSet || row.structuralV2; // stated from the fixture, not computed by the code under test
    it(`A ${row.id} flagSet=${row.flagSet} structuralV2=${row.structuralV2}`, () => {
      // The oracle for validateContentRequirements' own `hasV2`: give it content, and it emits
      // the V2 error IFF its internal hasV2 is true. This is the product's error, not a model.
      const limitsSaysV2 = validateContentRequirements({
        content: 'x', embeds: [], components: (row.data.components ?? []) as never, flags: (row.data.flags as number | undefined) ?? 0,
      }) === V2_ERROR;
      const predicateSaysV2 = effectiveIsV2(row.data);
      record(`A    | ${row.id} | limits=${limitsSaysV2} predicate=${predicateSaysV2} expected=${expected} | ${limitsSaysV2 === predicateSaysV2 ? 'agree' : 'DISAGREE'}`);
      expect(limitsSaysV2).toBe(expected);
      expect(predicateSaysV2).toBe(expected);
    });
  });
});

describe('B — mode classification, old model vs the tree under test', () => {
  CORPUS.forEach((row) => {
    it(`B ${row.id}`, () => {
      const o = oldMode(row.data);
      const n = newMode(row.data);
      record(`B    | ${row.id} | old=${String(o)} new=${String(n)} | ${o === n ? 'same' : 'CHANGED'}`);
      // Every cell whose classification changed must be explained by exactly one of M7-a's two
      // clauses: the flag is now read (flagSet), or a mode is now written where the pre-M7 guard
      // wrote NONE (o === null). A change outside those two is scope M7 does not have.
      //
      // The second class is larger than the implementation document describes: the pre-M7 guard
      // wrote no mode for ANY message with no `components` key, not only flag-carrying ones, so
      // an ordinary classic message now actively sets Classic where it previously left whatever
      // mode was standing. M7-a's "and Classic otherwise" requires this; it is recorded here
      // because it is a behaviour change and reading the diff does not surface its extent.
      if (o !== n) expect(o === null || row.flagSet).toBe(true);
      if (o === null && n !== null) record(`B*   | ${row.id} | mode now WRITTEN where none was (${String(n)}) | flagSet=${row.flagSet}`);
      // No message that was V2 may become Classic: the change is one-directional.
      expect(o === 'v2' && n === 'classic').toBe(false);
      // After M7 no message may be left with NO mode written (research G4's gap).
      if (HAS_M7) expect(n).not.toBe(null);
    });
  });
});

describe('C — M7-c: the patch warning only ever grows', () => {
  CORPUS.forEach((row) => {
    it(`C ${row.id}`, () => {
      const message = { data: row.data };
      const o = oldWarning(message, { id: '1' }, true);
      const n = newWarning(message, { id: '1' }, true);
      record(`C    | ${row.id} | oldWarn=${o} newWarn=${n} | ${o === n ? 'same' : 'CHANGED'}`);
      // Monotonic: nothing that warned before may stop warning.
      expect(o && !n).toBe(false);
      if (HAS_M7) expect(n).toBe(row.flagSet || row.structuralV2);
      // The two suppressing conjuncts still suppress, whatever the message is.
      expect(newWarning(message, { id: '1' }, false)).toBe(false);
      expect(newWarning(message, null, true)).toBe(false);
    });
  });
});

describe('D — M7-b: the flag algebra, through applyModeSwitch (the plan-named instrument)', () => {
  const apply = (modeModule as {
    applyModeSwitch?: (m: string, p: Data) => Data;
  }).applyModeSwitch!;
  const BITS = [0, SUPPRESS_EMBEDS, SUPPRESS_NOTIFICATIONS, SUPPRESS_EMBEDS | SUPPRESS_NOTIFICATIONS];
  BITS.forEach((bits, i) => {
    it(`D${i} to V2 sets the bit and preserves other bits (other=${bits})`, () => {
      const out = apply('v2', { flags: bits, content: 'hi', embeds: [{}], components: [{ type: 1 }] });
      record(`D    | to-v2 other=${bits} | flags=${out.flags} content=${JSON.stringify(out.content)} components=${JSON.stringify(out.components)}`);
      expect(out.flags).toBe(bits | IS_COMPONENTS_V2_FLAG);
      expect(out.content).toBe('');
      expect(out.embeds).toEqual([]);
      expect(out.components).toEqual([{ type: 1 }]); // Action Rows survive the outbound leg
    });
    it(`D${i} to Classic clears the bit and preserves other bits (other=${bits})`, () => {
      const out = apply('classic', { flags: bits | IS_COMPONENTS_V2_FLAG, components: [{ type: 1 }, { type: 17 }] });
      record(`D    | to-classic other=${bits} | flags=${out.flags} components=${JSON.stringify(out.components)}`);
      expect(out.flags).toBe(bits);
      expect(out.components).toEqual([{ type: 1 }]);
    });
  });
  it('D-RT round trip V2 -> Classic restores the original bits exactly', () => {
    const start = { flags: SUPPRESS_NOTIFICATIONS, components: [{ type: 1 }] };
    const back = apply('classic', apply('v2', { ...start }));
    record(`D    | round-trip | flags=${back.flags}`);
    expect(back.flags).toBe(SUPPRESS_NOTIFICATIONS);
  });
  it('D-OQ7 a V2 draft with only Action Rows reopens in V2 (OQ-7 cannot recur)', () => {
    const draft = apply('v2', { flags: 0, components: [{ type: 1 }] });
    record(`D    | OQ-7 | mode after reload=${String(newMode(draft))}`);
    expect(newMode(draft)).toBe('v2');
  });
});

describe('E — 5712: M7 makes the lossless exit reachable without the destructive leg', () => {
  // The stored 5712 shape: the V2 bit set, no V2 components, real content.
  const STORED_5712: Data = { flags: IS_COMPONENTS_V2_FLAG, components: [], content: 'Message of the moment' };
  it('E1 loads in V2 after M7 (it loaded in Classic before)', () => {
    record(`E    | 5712 load mode | old=${String(oldMode(STORED_5712))} new=${String(newMode(STORED_5712))}`);
    expect(newMode(STORED_5712)).toBe(HAS_M7 ? 'v2' : 'classic');
  });
  it('E2 one toggle to Classic clears the bit WITH THE CONTENT INTACT', () => {
    const apply = (modeModule as { applyModeSwitch?: (m: string, p: Data) => Data }).applyModeSwitch!;
    const out = apply('classic', { ...STORED_5712 });
    record(`E    | 5712 one-toggle exit | flags=${out.flags} content=${JSON.stringify(out.content)}`);
    expect((out.flags as number) & IS_COMPONENTS_V2_FLAG).toBe(0);
    expect(out.content).toBe('Message of the moment');
  });
});

describe('CTRL — positive controls: the instrument can fail', () => {
  it('CTRL-1 a deliberately structural-only predicate DISAGREES with limits on a flag-only row', () => {
    const flagOnly = { flags: IS_COMPONENTS_V2_FLAG, components: [] };
    const structuralOnly = hasV2Components(flagOnly.components as { type: number }[]);
    const limitsSaysV2 = validateContentRequirements({
      content: 'x', embeds: [], components: [] as never, flags: IS_COMPONENTS_V2_FLAG,
    }) === V2_ERROR;
    record(`CTRL | 1 structural-only=${structuralOnly} limits=${limitsSaysV2} | ${structuralOnly === limitsSaysV2 ? 'AGREE (control failed)' : 'disagree (as required)'}`);
    expect(structuralOnly).toBe(false);
    expect(limitsSaysV2).toBe(true);
  });
  it('CTRL-2 the corpus actually contains cells in every quadrant', () => {
    const q = (f: boolean, s: boolean) => CORPUS.filter((r) => r.flagSet === f && r.structuralV2 === s).length;
    record(`CTRL | 2 quadrants flag/struct: TT=${q(true, true)} TF=${q(true, false)} FT=${q(false, true)} FF=${q(false, false)}`);
    expect(q(true, true)).toBeGreaterThan(0);
    expect(q(true, false)).toBeGreaterThan(0);
    expect(q(false, true)).toBeGreaterThan(0);
    expect(q(false, false)).toBeGreaterThan(0);
  });
});

afterAll(() => {
  const text = `${matrix.join('\n')}\n`;
  if (OUT) writeFileSync(OUT, text);
  else console.log(text);
});
