import { describe, it, expect, vi } from 'vitest';
import { writeFileSync } from 'fs';
import { join } from 'path';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { discordMessageImportShape } from '~/server/api/utils/shapes';
import { computeLoadDiff, describeDropSet, describeLoadDiff } from '~/utils';

/**
 * CR12 — the M2-c overwrite confirmation at 299b842.
 *
 * The dialog body is exactly:
 *   validatedDraft
 *     ? describeLoadDiff(computeLoadDiff(message?.data ?? {}, validatedDraft))
 *     : 'This will overwrite the current message.'
 * with title 'Are you sure?' and confirm button 'Load' — so `message` is the whole
 * informative body. Both functions below are the REAL ones.
 *
 * The milestone is "M2-c The overwrite confirmation is TRUTHFUL."
 */

const PRIOR_TEXT = 'This will overwrite the current message.';

/** The dialog body the user actually reads, for a validated draft. */
function dialogBody(current: any, incoming: any): string {
  return describeLoadDiff(computeLoadDiff(current, incoming));
}

/** The Load path validates through the import shape first. */
function validate(raw: any) {
  return discordMessageImportShape.parse(raw) as any;
}

describe('CR12-A — the dominant path: edit the seeded JSON, then Load', () => {
  it('editing the text inside a container tells the user "No component or mode changes."', () => {
    // The modal is SEEDED with the current message, so the overwhelmingly common
    // Load is "I edited this message's own JSON and I am loading it back".
    const current = {
      flags: 32768,
      components: [{ type: 17, components: [{ type: 10, content: 'original text' }] }],
    };
    const incoming = validate({
      flags: 32768,
      components: [{ type: 17, components: [{ type: 10, content: 'EDITED text' }] }],
    });

    const body = dialogBody(current, incoming);
    expect(body).toBe('No component or mode changes.');

    // The user IS overwriting their message, and the word is gone from the dialog.
    expect(body).not.toMatch(/overwrit/i);
    expect(PRIOR_TEXT).toMatch(/overwrit/i);
  });

  it('a classic message whose content is replaced says the same thing', () => {
    const current = { content: 'hello' };
    const incoming = validate({ content: 'something completely different' });
    expect(dialogBody(current, incoming)).toBe('No component or mode changes.');
  });

  it('embeds replaced wholesale says the same thing', () => {
    const current = { embeds: [{ title: 'original' }] };
    const incoming = validate({ embeds: [{ title: 'replaced' }, { title: 'and another' }] });
    expect(dialogBody(current, incoming)).toBe('No component or mode changes.');
  });
});

describe('CR12-B — count and structure changes are invisible to the diff', () => {
  it('three containers collapsing to one reports no change', () => {
    const box = (t: string) => ({ type: 17, components: [{ type: 10, content: t }] });
    const current = { flags: 32768, components: [box('a'), box('b'), box('c')] };
    const incoming = validate({ flags: 32768, components: [box('a')] });
    expect(dialogBody(current, incoming)).toBe('No component or mode changes.');
  });

  it('a container whose entire contents are swapped reports no change', () => {
    const current = {
      flags: 32768,
      components: [{ type: 17, components: [{ type: 10, content: 'x' }] }],
    };
    const incoming = validate({
      flags: 32768,
      components: [{ type: 17, components: [{ type: 12, items: [{ media: { url: 'https://e.com/a.png' } }] }] }],
    });
    expect(dialogBody(current, incoming)).toBe('No component or mode changes.');
  });
});

describe('CR12-C — CONTROL: where a top-level type really changes, the text is correct and useful', () => {
  it('a removal is named', () => {
    const current = { components: [{ type: 1, components: [] }] };
    const incoming = validate({ content: 'now just text' });
    const body = dialogBody(current, incoming);
    expect(body).toMatch(/remove/i);
    expect(body).toMatch(/Action Row/);
  });

  it('an addition and a mode switch are named together', () => {
    const current = { content: 'hi' };
    const incoming = validate({
      flags: 32768,
      components: [{ type: 17, components: [{ type: 10, content: 'x' }] }],
    });
    const body = dialogBody(current, incoming);
    expect(body).toMatch(/add/i);
    expect(body).toMatch(/Container/);
    expect(body).toMatch(/switch from Classic to Components V2/);
  });

  it('a flag-only mode change with identical components is still named', () => {
    const ROW = { type: 1, components: [{ type: 2, style: 5, label: 'b', url: 'https://e.com' }] };
    const current = { flags: undefined, components: [ROW] };
    const incoming = validate({ flags: 32768, components: [ROW] });
    expect(dialogBody(current, incoming)).toMatch(/switch from Classic to Components V2/);
  });
});

describe('CR12-D — what the prior text did that the new text does not', () => {
  it('the prior text was true on EVERY path; the new text is not', () => {
    const paths: [string, any, any][] = [
      ['edit inside a container', { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'a' }] }] },
        { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'b' }] }] }],
      ['replace content', { content: 'a' }, { content: 'b' }],
      ['collapse 3 containers to 1', { flags: 32768, components: [1, 2, 3].map(() => ({ type: 17, components: [{ type: 10, content: 'x' }] })) },
        { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] }],
    ];
    paths.forEach(([, current, incoming]) => {
      const body = dialogBody(current, validate(incoming));
      // Every one of these IS an overwrite. The prior text said so; this does not.
      expect(body).toBe('No component or mode changes.');
      expect(PRIOR_TEXT).toMatch(/overwrit/i);
      expect(body).not.toMatch(/overwrit/i);
    });
  });
});

describe('CR12-E — the joinWithAnd extraction is behaviour-preserving, established by execution', () => {
  // The 54fed63 describeDropSet body, transcribed verbatim from that tree.
  const DROP_SET_LABELS: Record<string, string> = {
    components: 'your Components V2 components',
    content: 'your message content',
    embeds: 'your embeds',
  };
  function describeDropSetOld(dropSet: readonly string[]): string {
    if (dropSet.length === 0) return 'Nothing will be lost.';
    const labels = dropSet.map((key) => DROP_SET_LABELS[key] ?? key);
    const joined = labels.length === 1
      ? labels[0]
      : `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;
    return `This will drop ${joined}.`;
  }

  it('agrees with the real post-extraction function over a randomised corpus', () => {
    // Deterministic PRNG — no Math.random, so this is reproducible.
    let seed = 20260824;
    const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
    const KEYS = ['components', 'content', 'embeds', 'unknownKey', '', 'x'];

    let compared = 0;
    for (let i = 0; i < 2000; i += 1) {
      const n = Math.floor(rnd() * 5);
      const set = Array.from({ length: n }, () => KEYS[Math.floor(rnd() * KEYS.length)]);
      expect(describeDropSet(set)).toBe(describeDropSetOld(set));
      compared += 1;
    }
    expect(compared).toBe(2000);
  });

  it('POSITIVE CONTROL: the comparator reports DIFFER when the old body is perturbed', () => {
    const perturbed = (d: readonly string[]) => describeDropSetOld(d).replace(' and ', ' plus ');
    // A two-element set is where the join actually appears.
    expect(describeDropSet(['content', 'embeds'])).not.toBe(perturbed(['content', 'embeds']));
  });

  it('the zero-length early return survived the extraction', () => {
    expect(describeDropSet([])).toBe('Nothing will be lost.');
  });
});

describe('CR12-REPORT', () => {
  it('writes the dialog table', () => {
    const cases: [string, any, any][] = [
      ['edit text inside a container', { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'a' }] }] },
        { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'b' }] }] }],
      ['replace a classic message body', { content: 'hello' }, { content: 'totally different' }],
      ['replace all embeds', { embeds: [{ title: 'a' }] }, { embeds: [{ title: 'b' }, { title: 'c' }] }],
      ['collapse 3 containers to 1', { flags: 32768, components: [1, 2, 3].map(() => ({ type: 17, components: [{ type: 10, content: 'x' }] })) },
        { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] }],
      ['remove an Action Row', { components: [{ type: 1, components: [] }] }, { content: 'now just text' }],
      ['add a Container + mode switch', { content: 'hi' },
        { flags: 32768, components: [{ type: 17, components: [{ type: 10, content: 'x' }] }] }],
      ['flag-only mode change', { components: [{ type: 1, components: [{ type: 2, style: 5, label: 'b', url: 'https://e.com' }] }] },
        { flags: 32768, components: [{ type: 1, components: [{ type: 2, style: 5, label: 'b', url: 'https://e.com' }] }] }],
    ];
    writeFileSync(
      join(__dirname, 'dialog-table.txt'),
      [
        'CR12 — the M2-c overwrite confirmation body at 299b842.',
        'Dialog is: title "Are you sure?" / this message / button "Load".',
        `Prior text on every path was: "${PRIOR_TEXT}"`,
        '',
        ...cases.map(([n, c, i]) => `  ${n.padEnd(32)} -> "${dialogBody(c, validate(i))}"`),
        '',
        'The last three are correct and are a real improvement.',
        'The first four are Loads that overwrite the user\'s message and tell them',
        '"No component or mode changes." — the overwrite warning is gone from the',
        'dominant path, which is editing the seeded JSON and loading it back.',
        '',
      ].join('\n'),
    );
    expect(cases.length).toBe(7);
  });
});
