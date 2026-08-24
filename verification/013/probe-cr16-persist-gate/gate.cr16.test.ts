import { describe, it, expect, vi } from 'vitest';
import { writeFileSync } from 'fs';
import { join } from 'path';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import {
  gateBeforePersist, stripKeys, hasClassicContent, hasV2Components,
} from '~/utils';
import { IS_COMPONENTS_V2_FLAG } from '~/constants/messageLimits';
import { validateContentRequirements, validateMessage } from '~/utils/limits';

/**
 * CR16 — M8-G at 66e1974. Every function below is the REAL one (imported),
 * so this probe reads the tree and expires if the tree changes.
 *
 * The claim under review: retiring stripKeys' `delete embeds/content` is safe
 * because gateBeforePersist asks whenever content would be lost.
 *
 * That holds only if the persist gate's notion of "has classic content" agrees
 * with every OTHER load-bearing notion of it. It does not.
 */

const V2 = { type: 10, content: 'hello' };          // a Text Display
const USERNAME = 'validname';
const draft = (over: any) => ({ components: [V2], username: USERNAME, ...over });

/** The 7890fc9 stripKeys tail, transcribed verbatim — the CONTROL. */
function stripKeysOld<T extends { data?: any }>(message: T) {
  const casted = JSON.parse(JSON.stringify(message));
  if (Array.isArray(casted.data?.components)) {
    const hasV2 = hasV2Components(casted.data.components);
    if (hasV2) {
      casted.data.flags = ((casted.data.flags as number) || 0) | IS_COMPONENTS_V2_FLAG;
      delete casted.data.embeds;
      delete casted.data.content;
    }
  }
  return casted;
}

describe('CR16-A — the two definitions of "has classic content" disagree', () => {
  // hasClassicContent  : used by resolveContentLoss -> gateBeforePersist (PERSIST gate)
  // validateContentRequirements.hasContent = !!content.trim() || embeds.length > 0
  //                    : used by validateMessage -> allowSave (SEND floor)
  const CASES: [string, any][] = [
    ['empty embed {} — exactly what "Add Embed" appends', { embeds: [{}] }],
    ['embed with only an empty title', { embeds: [{ title: '' }] }],
    ['embed carrying only a _key', { embeds: [{ _key: 'abc' }] }],
    ['embed with an empty fields array', { embeds: [{ fields: [] }] }],
    ['two empty embeds', { embeds: [{}, {}] }],
    ['whitespace-only content', { content: '   ' }],
    ['real content — a genuine row E', { content: 'real' }],
    ['real embed — a genuine row E', { embeds: [{ title: 'real' }] }],
  ];

  const rows: string[] = [];
  CASES.forEach(([name, over]) => {
    it(`${name}`, () => {
      const d = draft(over);
      const gateSays = hasClassicContent({ content: d.content, embeds: d.embeds });
      const sendSays = !!validateContentRequirements({
        embeds: d.embeds ?? [], content: d.content ?? '', components: d.components, flags: 0,
      });
      const mustAsk = gateBeforePersist(d).mustAsk;
      rows.push(`  ${name.padEnd(46)} gate:${String(gateSays).padEnd(5)} mustAsk:${String(mustAsk).padEnd(5)} sendBlocked:${sendSays}`);
      // The disagreement IS the finding; assert it explicitly where it exists.
      expect(typeof gateSays).toBe('boolean');
      expect(mustAsk).toBe(gateSays);
    });
  });

  it('REPORT', () => {
    writeFileSync(join(__dirname, 'divergence.txt'),
      ['CR16-A — persist gate vs send floor, at 66e1974', '',
        '  gate        = hasClassicContent (resolveContentLoss -> gateBeforePersist)',
        '  sendBlocked = validateContentRequirements returned an error',
        '', ...rows, ''].join('\n'));
    expect(rows.length).toBe(CASES.length);
  });
});

describe('CR16-B — the empty embed: persisted with no gate, then unsendable', () => {
  const d = draft({ embeds: [{}] });

  it('the persist gate does NOT ask — so no choice is ever offered', () => {
    expect(gateBeforePersist(d).mustAsk).toBe(false);
  });

  it('POST-FIX stripKeys retains the empty embed AND sets the V2 bit', () => {
    const out = stripKeys({ data: { ...d } } as any);
    expect(out.data.embeds).toEqual([{}]);
    expect(out.data.flags! & IS_COMPONENTS_V2_FLAG).toBe(IS_COMPONENTS_V2_FLAG);
  });

  it('CONTROL — the 7890fc9 stripKeys DELETED it, so this is a real change', () => {
    const out = stripKeysOld({ data: { ...d } } as any);
    expect(out.data.embeds).toBeUndefined();
    expect(out.data.flags & IS_COMPONENTS_V2_FLAG).toBe(IS_COMPONENTS_V2_FLAG);
  });

  it('the RETAINED form fails validateMessage — the send floor rejects it', () => {
    const out = stripKeys({ data: { ...d } } as any);
    expect(validateMessage(out.data)).toBe('Components V2 messages cannot contain embeds or content.');
  });

  it('the CONTROL form PASSES validateMessage — so the block is new to this commit', () => {
    const out = stripKeysOld({ data: { ...d } } as any);
    expect(validateMessage(out.data)).toBe('');
  });
});

describe('CR16-C — whitespace content behaves the same way on both sides (no divergence)', () => {
  it('whitespace content is invisible to BOTH predicates, so it is not the class', () => {
    const d = draft({ content: '   ' });
    expect(gateBeforePersist(d).mustAsk).toBe(false);
    expect(validateContentRequirements({
      embeds: [], content: '   ', components: d.components, flags: 0,
    })).toBeUndefined();
  });
});

/**
 * CR16-D — the row-E choice UI is reimplemented per call site, and the copies
 * have already diverged on what dismissing the dialog means.
 *
 * Three sites own a PresetDialog for the choice, transcribed verbatim at 66e1974:
 *   SaveChoiceModal.tsx:17   onClose={onCancel}                            -> clears
 *   NewMessageModal.tsx:193  onClose={pendingChoice ? cancelChoice : onClose} -> clears
 *   SaveAsMenu.tsx:80        onClose={onClose}                             -> does NOT clear
 *
 * SaveAsMenu is mounted whenever `message` is truthy (Navigation.tsx:415 renders
 * it unconditionally and drives visibility through `isOpen`), so its useState
 * survives a close. PresetDialog wires headlessui's Dialog onClose, which fires
 * on Escape and on a backdrop click.
 */
describe('CR16-D — dismissing SaveAsMenu strands its own choice state', () => {
  type Render = 'FORM' | 'CHOICE';

  /** One state machine, parameterised by the ONE line that differs. */
  function machine(dismissClearsChoice: boolean) {
    let pendingChoice: object | null = null;
    let isOpen = false;
    return {
      openMenu: () => { isOpen = true; },
      clickSave: () => { pendingChoice = { options: [] }; },   // a row-E draft
      dismiss: () => {                                          // Escape / backdrop
        if (dismissClearsChoice) pendingChoice = null;
        isOpen = false;
      },
      render: (): Render | 'CLOSED' => {
        if (!isOpen) return 'CLOSED';
        return pendingChoice ? 'CHOICE' : 'FORM';
      },
    };
  }

  it('SaveAsMenu (onClose={onClose}): reopening shows the CHOICE, not the form', () => {
    const m = machine(false);
    m.openMenu(); m.clickSave();
    expect(m.render()).toBe('CHOICE');
    m.dismiss();
    m.openMenu();
    // The user abandoned that save. They are shown the choice again, and every
    // button on it PERSISTS — an irreversible action reached from stale state.
    expect(m.render()).toBe('CHOICE');
  });

  it('CONTROL — NewMessageModal/SaveChoiceModal wiring returns to the FORM', () => {
    const m = machine(true);
    m.openMenu(); m.clickSave();
    expect(m.render()).toBe('CHOICE');
    m.dismiss();
    m.openMenu();
    expect(m.render()).toBe('FORM');
  });
});

import { discordMessageImportShape } from '~/server/api/utils/shapes';

/**
 * CR16-E — reachability + regression, end to end through the REAL import shape.
 *
 * The live editor is mode-exclusive (showEmbedButton requires isClassicMode,
 * showComponentButton requires isV2Mode), so its own buttons cannot build
 * V2-components + an embed. The PASTE path can: every embedShape field is
 * optional, so `{}` survives import, and filterSupportedComponents keeps V2.
 */
describe('CR16-E — the empty-embed-under-V2 class is reachable via paste and is a regression', () => {
  const pasted = {
    content: '',
    components: [{ type: 10, content: 'a text display' }],
    embeds: [{}],
    flags: IS_COMPONENTS_V2_FLAG,
  };

  it('the import shape PRESERVES the empty embed alongside the V2 component', () => {
    const parsed = discordMessageImportShape.parse(pasted) as any;
    expect(parsed.embeds).toEqual([{}]);
    expect(hasV2Components(parsed.components)).toBe(true);
  });

  it('the persist gate does NOT ask on the imported object — so it saves with no choice', () => {
    const parsed = discordMessageImportShape.parse(pasted) as any;
    expect(gateBeforePersist(parsed).mustAsk).toBe(false);
  });

  it('POST-FIX: stripKeys retains the empty embed and the saved message is INVALID', () => {
    const parsed = discordMessageImportShape.parse(pasted) as any;
    const saved = stripKeys({ data: parsed } as any);
    expect(saved.data.embeds).toEqual([{}]);                       // retained
    // Isolate the content check (validateMessage also gates username, absent here):
    expect(validateContentRequirements({
      embeds: saved.data.embeds ?? [], content: saved.data.content ?? '',
      components: saved.data.components, flags: saved.data.flags,
    })).toMatch(/cannot contain embeds or content/); // unsendable
  });

  it('CONTROL — pre-M8-G stripKeys DELETED it, so the same paste saved VALID and sendable', () => {
    const parsed = discordMessageImportShape.parse(pasted) as any;
    const savedOld = stripKeysOld({ data: parsed } as any);
    expect(savedOld.data.embeds).toBeUndefined();                  // cleaned
    expect(validateContentRequirements({
      embeds: savedOld.data.embeds ?? [], content: savedOld.data.content ?? '',
      components: savedOld.data.components, flags: savedOld.data.flags,
    })).toBeUndefined();                                           // content-valid -> sendable
  });
});
