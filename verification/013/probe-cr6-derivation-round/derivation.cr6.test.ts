import { describe, it, expect, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { IS_COMPONENTS_V2_FLAG } from '~/constants';
import { resolveContentLoss, gateBeforePersist, applyDisposition } from '~/utils';
import { applyModeSwitch } from '~/utils/messageMode';

const BIT = IS_COMPONENTS_V2_FLAG;
const CONTAINER = { type: 17, components: [] };
const TEXT_DISPLAY = { type: 10, content: 'x' };
const ACTION_ROW = { type: 1, components: [{ type: 2, label: 'b' }] };

type Draft = {
  flags: number | undefined,
  components: undefined | { type: number }[],
  content: undefined | string,
  embeds: undefined | unknown[],
};

const FLAGS: (number | undefined)[] = [undefined, 0, BIT, 4, 4 | BIT];
const COMPONENTS: (undefined | { type: number }[])[] = [
  undefined, [], [ACTION_ROW], [CONTAINER], [CONTAINER, ACTION_ROW],
  [ACTION_ROW, CONTAINER], [TEXT_DISPLAY], [ACTION_ROW, CONTAINER, TEXT_DISPLAY],
];
const CONTENTS: (undefined | string)[] = [undefined, '', '   ', 'hi'];
const EMBEDS: (undefined | unknown[])[] = [
  undefined, [], [{}], [{ _key: 'a' }], [{ title: 'x' }],
  [{ title: 'x' }, { description: 'y' }], [{ fields: [] }],
];

const CORPUS: Draft[] = [];
for (const flags of FLAGS) {
  for (const components of COMPONENTS) {
    for (const content of CONTENTS) {
      for (const embeds of EMBEDS) {
        CORPUS.push({
          flags,
          components: components && JSON.parse(JSON.stringify(components)),
          content,
          embeds: embeds && JSON.parse(JSON.stringify(embeds)),
        });
      }
    }
  }
}

// The oracle for a "dropped key": run the real serialiser and compare the three
// user-content keys by value. Written here independently of index.ts's own
// diffDroppedKeys so it is a check, not a restatement.
function enactedDrops(draft: Draft, mode: 'classic' | 'v2'): string[] {
  const after = applyModeSwitch(mode, draft as never) as unknown as Draft;
  const out: string[] = [];
  const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  if (!same(draft.components ?? [], after.components ?? [])) out.push('components');
  if ((draft.content ?? '') !== (after.content ?? '')) out.push('content');
  if (!same(draft.embeds ?? [], after.embeds ?? [])) out.push('embeds');
  return out;
}

describe('CR6-A — MEDIUM-1 (round 5) closure: the gate and the applier cannot disagree', () => {
  it('applyDisposition takes exactly two declared parameters (draft, chosenOption?)', () => {
    // .length counts declared params; an optional-typed param still counts. 3 = the old signature.
    expect(applyDisposition.length).toBe(2);
    expect(String(applyDisposition).slice(0, 400)).not.toMatch(/disposition\s*[,:)]/);
  });

  it('D18 invariant over 1120 drafts: gate.mustAsk === true <=> applyDisposition(draft) throws', () => {
    let mustAsk = 0; let settled = 0;
    for (const draft of CORPUS) {
      const gate = gateBeforePersist(draft as never);
      let threw = false;
      try { applyDisposition(draft as never); } catch { threw = true; }
      expect(threw).toBe(gate.mustAsk);
      if (gate.mustAsk) mustAsk += 1; else settled += 1;
    }
    expect(mustAsk).toBeGreaterThan(0);
    expect(settled).toBeGreaterThan(0);
    // eslint-disable-next-line no-console
    console.log(`CR6-A corpus: ${CORPUS.length} drafts, mustAsk=${mustAsk}, settled=${settled}`);
  });

  it('no settled draft loses classic content it was carrying (D18 subject)', () => {
    let checked = 0;
    for (const draft of CORPUS) {
      const gate = gateBeforePersist(draft as never);
      if (gate.mustAsk) continue;
      const next = applyDisposition(draft as never) as unknown as Draft;
      const hadContent = !!draft.content?.trim();
      const lost = hadContent && !next.content?.trim();
      // a settled draft may only lose content if it never had meaningful content
      expect(lost).toBe(false);
      checked += 1;
    }
    expect(checked).toBeGreaterThan(0);
  });
});

describe('CR6-B — MEDIUM-2 (round 5) closure: advertised drop === enacted drop, at key granularity', () => {
  it('every row-E option\'s dropSet equals the keys the real serialiser changes, over the corpus', () => {
    let rowE = 0;
    for (const draft of CORPUS) {
      const d = resolveContentLoss(draft.flags, draft.components, draft.content, draft.embeds);
      if (!d.requiresChoice) continue;
      rowE += 1;
      expect(d.options).not.toBeNull();
      for (const opt of d.options!) {
        expect([...opt.dropSet]).toEqual(enactedDrops(draft, opt.mode as 'classic' | 'v2'));
      }
    }
    expect(rowE).toBeGreaterThan(0);
    // eslint-disable-next-line no-console
    console.log(`CR6-B: ${rowE} row-E drafts, every option's dropSet matched the enacted diff`);
  });

  it('MUTANT CONTROL: a hand-labelled dropSet fails this same check', () => {
    const draft = CORPUS.find((c) => resolveContentLoss(c.flags, c.components, c.content, c.embeds).requiresChoice
      && (c.embeds ?? []).length === 0)!;
    const hardcoded = ['content', 'embeds']; // the pre-52e0e8a literal
    expect(hardcoded).not.toEqual(enactedDrops(draft, 'v2'));
  });
});

describe('CR6-C — the residual: chosenOption still carries a derived label nothing ties to the draft', () => {
  it('applyDisposition reads chosenOption.mode and ignores chosenOption.dropSet entirely', () => {
    const draft: Draft = {
      flags: 0, content: 'hi', embeds: [{ title: 'x' }], components: [CONTAINER],
    };
    const bogus = { mode: 'v2' as const, dropSet: ['nothing', 'at', 'all'] };
    const honest = { mode: 'v2' as const, dropSet: ['content', 'embeds'] };
    const a = applyDisposition(draft as never, bogus) as unknown as Draft;
    const b = applyDisposition(draft as never, honest) as unknown as Draft;
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    expect(a.content).toBe('');
    expect(a.embeds).toEqual([]);
  });

  it('a stale option from ANOTHER draft is accepted, and the label the user saw understates the loss', () => {
    // Draft A: content only, no embeds. Its v2 option advertises dropSet ['content'].
    const draftA: Draft = { flags: 0, content: 'hi', embeds: [], components: [CONTAINER] };
    const optA = resolveContentLoss(draftA.flags, draftA.components, draftA.content, draftA.embeds)
      .options!.find((o) => o.mode === 'v2')!;
    expect([...optA.dropSet]).toEqual(['content']);

    // Draft B: the user has since added an embed. Its own v2 option would say ['content','embeds'].
    const draftB: Draft = { flags: 0, content: 'hi', embeds: [{ title: 'x' }], components: [CONTAINER] };
    const optB = resolveContentLoss(draftB.flags, draftB.components, draftB.content, draftB.embeds)
      .options!.find((o) => o.mode === 'v2')!;
    expect([...optB.dropSet]).toEqual(['content', 'embeds']);

    // Applying A's option to B is accepted; the embed is destroyed while the label said only 'content'.
    const next = applyDisposition(draftB as never, optA) as unknown as Draft;
    expect(next.embeds).toEqual([]);
    expect(next.content).toBe('');
    expect([...optA.dropSet]).not.toContain('embeds');
  });
});

describe('CR6-D — purity: the resolver, the gate and the applier do not mutate their inputs', () => {
  it('no corpus draft (or its nested arrays) is mutated by any of the three', () => {
    for (const draft of CORPUS) {
      const before = JSON.stringify(draft);
      Object.freeze(draft);
      if (draft.components) Object.freeze(draft.components);
      if (draft.embeds) Object.freeze(draft.embeds);
      resolveContentLoss(draft.flags, draft.components, draft.content, draft.embeds);
      gateBeforePersist(draft as never);
      try { applyDisposition(draft as never); } catch { /* row E */ }
      expect(JSON.stringify(draft)).toBe(before);
    }
  });
});

describe('CR6-E — granularity: the key-level label still cannot describe a PARTIAL components loss', () => {
  it('[container, actionRow] -> classic keeps the Action Row, but the label is still the bare key "components"', () => {
    const draft: Draft = {
      flags: 0, content: 'hi', embeds: [], components: [CONTAINER, ACTION_ROW],
    };
    const d = resolveContentLoss(draft.flags, draft.components, draft.content, draft.embeds);
    const classic = d.options!.find((o) => o.mode === 'classic')!;
    expect([...classic.dropSet]).toEqual(['components']);
    const next = applyModeSwitch('classic', draft as never) as unknown as Draft;
    // The Action Row SURVIVES. The label names the whole key.
    expect(next.components).toEqual([ACTION_ROW]);
    expect(next.components!.length).toBe(1);
  });

  it('a draft whose ONLY components are Action Rows never reaches row E, so the case is bounded', () => {
    const d = resolveContentLoss(0, [ACTION_ROW], 'hi', []);
    expect(d.requiresChoice).toBe(false);
    expect(d.row).toBe('A');
  });
});
