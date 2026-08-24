import { describe, it, expect, vi } from 'vitest';
import { writeFileSync } from 'fs';
import { join } from 'path';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { IS_COMPONENTS_V2_FLAG } from '~/constants';
import { discordMessageImportShape } from '~/server/api/utils/shapes';
import {
  applyDisposition, describeDropSet, enforceImportMutualExclusivity,
  noticeMessageForSettled, resolveContentLoss,
} from '~/utils';

const BIT = IS_COMPONENTS_V2_FLAG;

/**
 * CR9 — the paste surface (NewMessageJsonInput.tsx) at ee3bc3e.
 *
 * Built for ONE claim: that the disposition the user is shown is taken on the object
 * the user actually pasted. The surface computes it on the POST-Zod object instead.
 *
 * Sequence replicated verbatim from NewMessageJsonInput.tsx's useUpdateEffect at ee3bc3e:
 *   const parsed    = JSON.parse(jsonMessageString);
 *   const validated = discordMessageImportShape.parse(parsed) as MessageData;
 *   const disposition = resolveContentLoss(
 *     validated.flags, validated.components, validated.content, validated.embeds);
 */

type Raw = Record<string, unknown>;

/** What the surface actually does at ee3bc3e. */
function surfaceDisposition(raw: Raw) {
  const validated = discordMessageImportShape.parse(raw) as any;
  return resolveContentLoss(
    validated.flags as number | undefined,
    validated.components as undefined | { type: number }[],
    validated.content,
    validated.embeds,
  );
}

/** What the user's pasted bytes actually imply, before the shape's preprocess. */
function pastedDisposition(raw: Raw) {
  return resolveContentLoss(
    raw.flags as number | undefined,
    raw.components as undefined | { type: number }[],
    raw.content as undefined | string,
    raw.embeds as undefined | unknown[],
  );
}

function componentsAfterParse(raw: Raw): unknown[] {
  const v = discordMessageImportShape.parse(raw) as any;
  return (v.components ?? []) as unknown[];
}

// A container (type 17 — a V2 type) whose only child is a button (type 2).
// 2 is NOT in SUPPORTED_CONTAINER_CHILD_TYPES {1,9,10,12,13,14}, so the container
// is emptied and then dropped whole by filterSupportedComponents.
const CONTAINER_UNSUPPORTED_CHILD = {
  type: 17,
  components: [{ type: 2, style: 5, label: 'b', url: 'https://example.com' }],
};

// A container whose child IS supported — the positive control for the same shape.
const CONTAINER_SUPPORTED_CHILD = {
  type: 17,
  components: [{ type: 10, content: 'hello' }],
};

describe('CR9-A — the disposition is taken on the post-preprocess object, not on what was pasted', () => {
  it('a V2 container with an unsupported child + content + flag: pasted says E, surface says D', () => {
    const raw: Raw = {
      flags: BIT,
      content: 'hello',
      components: [CONTAINER_UNSUPPORTED_CHILD],
    };

    // The container survives JSON.parse untouched — this is genuinely what the user pasted.
    expect((raw.components as unknown[]).length).toBe(1);

    const pasted = pastedDisposition(raw);
    const surface = surfaceDisposition(raw);

    // What the user pasted is a genuine both-kinds-of-content conflict: row E, must ask.
    expect(pasted.row).toBe('E');
    expect(pasted.requiresChoice).toBe(true);

    // What the surface computes: the container is gone before the resolver ever sees it.
    expect(componentsAfterParse(raw)).toEqual([]);
    expect(surface.row).toBe('D');
    expect(surface.requiresChoice).toBe(false);

    // THE DEFECT: no choice is offered, and the container is destroyed with no notice of it.
    expect(pasted.row).not.toBe(surface.row);
  });

  it('POSITIVE CONTROL: the same shape with a supported child reaches row E on both paths', () => {
    const raw: Raw = {
      flags: BIT,
      content: 'hello',
      components: [CONTAINER_SUPPORTED_CHILD],
    };
    expect(componentsAfterParse(raw)).toHaveLength(1);
    expect(pastedDisposition(raw).row).toBe('E');
    expect(surfaceDisposition(raw).row).toBe('E');
  });

  it('the notice the user is shown actively misdescribes what happened', () => {
    const raw: Raw = {
      flags: BIT,
      content: 'hello',
      components: [CONTAINER_UNSUPPORTED_CHILD],
    };
    const surface = surfaceDisposition(raw) as any;
    const notice = noticeMessageForSettled(surface);

    // The user is told their message was saved as Classic because it had content+flag.
    expect(notice).toMatch(/saved as Classic/);
    // It names the FLAG as what was cleared. It never says any component was removed:
    // no drop/remove/lose/delete verb appears anywhere in the notice.
    expect(notice).not.toMatch(/drop|remov|lost|lose|delet|discard/i);
    // The only thing it reports clearing is the flag — not the container.
    expect(notice).toMatch(/flag cleared/);

    // And the object that lands has no components at all.
    const validated = discordMessageImportShape.parse(raw) as any;
    const landed = applyDisposition(validated) as any;
    expect(landed.components ?? []).toEqual([]);
    expect(landed.content).toBe('hello');
  });
});

describe('CR9-B — no-flag variant: the flip is not dependent on the V2 flag', () => {
  it('unsupported-child container + content, no flag: pasted E, surface A (fully silent)', () => {
    const raw: Raw = {
      content: 'hello',
      components: [CONTAINER_UNSUPPORTED_CHILD],
    };
    const pasted = pastedDisposition(raw);
    const surface = surfaceDisposition(raw) as any;

    expect(pasted.row).toBe('E');
    expect(surface.row).toBe('A');
    expect(surface.noticeClass).toBe('none');
    // Row A yields NO notice at all: the components vanish in complete silence.
    expect(noticeMessageForSettled(surface)).toBeNull();
  });
});

describe('CR9-C — enumeration of the flip class over container child types', () => {
  // SUPPORTED_CONTAINER_CHILD_TYPES = {1,9,10,12,13,14}. Everything else empties the
  // container and drops it. Sweep the child-type space that a real Discord payload can carry.
  // Each child is built WELL-FORMED for its own type, so that a non-E outcome is
  // attributable to the preprocess dropping it and never to the child failing its
  // own shape. A bare {type:t} would conflate those two and did on the first run.
  const CHILDREN: Record<number, Raw> = {
    1: { type: 1, components: [{ type: 2, style: 5, label: 'b', url: 'https://example.com' }] },
    2: { type: 2, style: 5, label: 'b', url: 'https://example.com' },
    3: { type: 3, custom_id: 'c', options: [{ label: 'a', value: 'a' }] },
    4: { type: 4, custom_id: 'c', style: 1, label: 'l' },
    9: { type: 9, components: [{ type: 10, content: 'x' }] },
    10: { type: 10, content: 'x' },
    11: { type: 11, file: { url: 'https://example.com/a.png' } },
    12: { type: 12, items: [{ media: { url: 'https://example.com/a.png' } }] },
    13: { type: 13, file: { url: 'https://example.com/a.txt' } },
    14: { type: 14 },
    17: { type: 17, components: [{ type: 10, content: 'x' }] },
  };

  const outcome: Record<number, string> = {};

  Object.keys(CHILDREN).map(Number).forEach((t) => {
    it(`container child type ${t}`, () => {
      const raw: Raw = {
        flags: BIT,
        content: 'hello',
        components: [{ type: 17, components: [CHILDREN[t]] }],
      };
      let surfaceRow: string;
      try {
        surfaceRow = surfaceDisposition(raw).row;
      } catch {
        // The shape rejected it outright — the user sees a Zod error. NOT a silent flip.
        surfaceRow = 'THROW(visible error)';
      }
      // Every case here is genuinely row E as pasted: a V2 container plus content.
      expect(pastedDisposition(raw).row).toBe('E');
      outcome[t] = surfaceRow;
      expect(typeof surfaceRow).toBe('string');
    });
  });

  it('REPORT — which child types silently flip the disposition away from E', () => {
    const silent = Object.keys(outcome).map(Number)
      .filter((t) => outcome[t] !== 'E' && !outcome[t].startsWith('THROW'));
    const visible = Object.keys(outcome).map(Number)
      .filter((t) => outcome[t].startsWith('THROW'));
    const held = Object.keys(outcome).map(Number).filter((t) => outcome[t] === 'E');

    writeFileSync(
      join(__dirname, 'sweep-child-types.txt'),
      [
        'CR9-C sweep — container (type 17) with ONE well-formed child of each type.',
        'Every input is row E as pasted (V2 container + content). What does the surface see?',
        '',
        ...Object.keys(outcome).map(Number).sort((a, b) => a - b)
          .map((t) => `  child type ${String(t).padStart(2)} -> surface row ${outcome[t]}`),
        '',
        `SILENT FLIP away from E (content lost, no choice): ${JSON.stringify(silent)}`,
        `VISIBLE rejection (user sees a Zod error):         ${JSON.stringify(visible)}`,
        `HELD at row E (correct):                          ${JSON.stringify(held)}`,
        '',
        'SUPPORTED_CONTAINER_CHILD_TYPES = {1,9,10,12,13,14} (shapes.ts)',
        'V2_COMPONENT_TYPE_VALUES        = [9,10,11,12,13,14,17] (messageLimits.ts)',
        '',
      ].join('\n'),
    );
    // The class is non-empty: at least one well-formed payload loses content silently.
    expect(silent.length).toBeGreaterThan(0);
    // CONTROL: the supported children must NOT be in the silent set, or the
    // instrument is measuring shape rejection rather than the preprocess drop.
    expect(held.length).toBeGreaterThan(0);
  });
});

describe('CR9-F — the most ordinary payload in the class: an empty container', () => {
  it('an empty V2 container + content + flag flips E -> D and the container is destroyed', () => {
    const raw: Raw = {
      flags: BIT,
      content: 'hello',
      components: [{ type: 17, components: [] }],
    };
    expect(pastedDisposition(raw).row).toBe('E');
    expect(componentsAfterParse(raw)).toEqual([]);
    expect(surfaceDisposition(raw).row).toBe('D');
  });

  it('an empty V2 container with NO content is dropped with no notice whatsoever', () => {
    const raw: Raw = { flags: BIT, components: [{ type: 17, components: [] }] };
    const surface = surfaceDisposition(raw) as any;
    // Pasted: a V2 message. Surface: row C — "V2 flag, nothing in it" — no notice.
    expect(componentsAfterParse(raw)).toEqual([]);
    expect(noticeMessageForSettled(surface)).toBeNull();
  });
});

describe('CR9-D — instrument control: the comparator can report agreement', () => {
  it('a plain classic message agrees on both paths (comparator is not stuck on DIFFER)', () => {
    const raw: Raw = { content: 'just text' };
    expect(pastedDisposition(raw).row).toBe(surfaceDisposition(raw).row);
  });

  it('a plain V2 message agrees on both paths', () => {
    const raw: Raw = { flags: BIT, components: [CONTAINER_SUPPORTED_CHILD] };
    expect(pastedDisposition(raw).row).toBe(surfaceDisposition(raw).row);
  });
});

describe('CR9-G — differential: what ee3bc3e CHANGED for the user at this surface', () => {
  // The pre-ee3bc3e paste surface, transcribed verbatim from b3f8ea9:
  //   const { data: cleaned } = enforceImportMutualExclusivity(parsed);
  //   discordMessageImportShape.parse(cleaned);   // validation only, result discarded
  //   setMessage(cleaned as MessageData);
  function oldSurface(raw: Raw) {
    const { data: cleaned } = enforceImportMutualExclusivity(raw as any);
    discordMessageImportShape.parse(cleaned); // may throw; result deliberately discarded
    return cleaned as any;
  }

  // The ee3bc3e paste surface for a SETTLED row (rows A-D).
  function newSurface(raw: Raw) {
    const validated = discordMessageImportShape.parse(raw) as any;
    return applyDisposition(validated) as any;
  }

  it('the flip case: old kept the container and dropped content; new keeps content and drops the container', () => {
    const raw: Raw = {
      flags: BIT,
      content: 'hello',
      components: [CONTAINER_UNSUPPORTED_CHILD],
    };

    const before = oldSurface(raw);
    const after = newSurface(raw);

    // OLD: V2 detected on the RAW components, so content was stripped and the
    // container survived — in its raw, unfiltered form.
    expect(before.content).toBeUndefined();
    expect(before.components).toHaveLength(1);

    // NEW: the container is gone before the resolver looks, so it settles Classic.
    expect(after.content).toBe('hello');
    expect(after.components ?? []).toEqual([]);

    // BOTH lose user content silently. The commit changed WHICH half is lost,
    // it did not close the silence. Neither satisfies D9 / M4-b.
    expect(before.components?.length).not.toBe((after.components ?? []).length);
    expect(before.content).not.toBe(after.content);
  });

  it('CONTROL: for a payload the preprocess does not touch, the components survive identically', () => {
    const raw: Raw = { flags: BIT, components: [CONTAINER_SUPPORTED_CHILD] };
    const before = oldSurface(raw);
    const after = newSurface(raw);
    // This is the control: where the preprocess removes nothing, no content is lost
    // on either path, so the differential above is attributable to the preprocess.
    expect(before.components).toHaveLength(1);
    expect(after.components).toHaveLength(1);
  });

  it('OBSERVED difference in representation: old DELETES content, new BLANKS it to ""', () => {
    const raw: Raw = { flags: BIT, components: [CONTAINER_SUPPORTED_CHILD] };
    // Old path removed the key entirely.
    expect(oldSurface(raw).content).toBeUndefined();
    // New path (applyModeSwitch, shared with JsonModalBody) leaves an empty string.
    expect(newSurface(raw).content).toBe('');
    // Not this commit's doing — applyModeSwitch is M7/M8 code already reviewed, and
    // JsonModalBody's Load produces the same shape. Recorded because the persisted
    // payload shape differs from what this surface produced before ee3bc3e, and
    // 012's QA has an outstanding re-measure of the 5712/5842 shapes.
  });
});

describe('CR9-E — describeDropSet on the surviving row-E options', () => {
  it('row E options are labelled with a non-empty drop description', () => {
    const raw: Raw = {
      flags: BIT,
      content: 'hello',
      components: [CONTAINER_SUPPORTED_CHILD],
    };
    const d = surfaceDisposition(raw) as any;
    expect(d.requiresChoice).toBe(true);
    d.options.forEach((o: any) => {
      expect(describeDropSet(o.dropSet)).toBeTruthy();
    });
    const byMode = Object.fromEntries(d.options.map((o: any) => [o.mode, o.dropSet]));
    expect(byMode.v2).toContain('content');
    expect(byMode.classic).toContain('components');
  });
});
