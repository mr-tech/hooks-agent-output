import { describe, it, expect, vi } from 'vitest';
import { writeFileSync } from 'fs';
import { join } from 'path';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { discordMessageImportShape } from '~/server/api/utils/shapes';
import { computeLoadDiff, describeLoadDiff, typedDeepEqual } from '~/utils';
import type { LoadDiff } from '~/utils';

/**
 * CR13 — round-12 HIGH-1 closure at 7890fc9, and the class sweep re-run.
 *
 * `describeLoadDiff` is the REAL function (imported), so unlike CR10 this probe
 * reads the tree and would fail if the fix were reverted.
 */

const OVERWRITE = /overwrite the current message/i;

function body(current: any, incoming: any): string {
  return describeLoadDiff(computeLoadDiff(current, incoming));
}
const validate = (raw: any) => discordMessageImportShape.parse(raw) as any;

/** The 299b842 body, transcribed verbatim — the CONTROL. */
function describeLoadDiffOld(diff: LoadDiff): string {
  const parts: string[] = [];
  if (diff.removedTypes.length) parts.push(`remove ${diff.removedTypes.join(', ')}`);
  if (diff.addedTypes.length) parts.push(`add ${diff.addedTypes.join(', ')}`);
  if (diff.modeChanges) parts.push('switch');
  if (!parts.length) return 'No component or mode changes.';
  return `This will ${parts.join('; ')}.`;
}

const BOX = (t: string) => ({ type: 17, components: [{ type: 10, content: t }] });
const ROW = { type: 1, components: [{ type: 2, style: 5, label: 'b', url: 'https://e.com' }] };

const PATHS: [string, any, any][] = [
  ['edit text inside a container', { flags: 32768, components: [BOX('a')] }, { flags: 32768, components: [BOX('b')] }],
  ['replace a classic message body', { content: 'hello' }, { content: 'totally different' }],
  ['replace all embeds', { embeds: [{ title: 'a' }] }, { embeds: [{ title: 'b' }, { title: 'c' }] }],
  ['collapse 3 containers to 1', { flags: 32768, components: [BOX('a'), BOX('b'), BOX('c')] }, { flags: 32768, components: [BOX('a')] }],
  ['remove an Action Row', { components: [ROW] }, { content: 'now just text' }],
  ['add a Container + mode switch', { content: 'hi' }, { flags: 32768, components: [BOX('x')] }],
  ['flag-only mode change', { components: [ROW] }, { flags: 32768, components: [ROW] }],
  ['identical', { content: 'same' }, { content: 'same' }],
];

describe('CR13-A — HIGH-1 CLOSED: every reachable path states the overwrite', () => {
  PATHS.forEach(([name, current, incoming]) => {
    it(`${name}: the body names the overwrite`, () => {
      expect(body(current, validate(incoming))).toMatch(OVERWRITE);
    });
  });

  it('CONTROL — the 299b842 body FAILS this on the no-diff paths, so the check discriminates', () => {
    const noDiff = computeLoadDiff({ flags: 32768, components: [BOX('a')] },
      validate({ flags: 32768, components: [BOX('b')] }));
    expect(describeLoadDiffOld(noDiff)).not.toMatch(OVERWRITE);
    expect(describeLoadDiff(noDiff)).toMatch(OVERWRITE);
  });

  it('the diff clauses are still present and still correct where there IS a diff', () => {
    const b = body({ content: 'hi' }, validate({ flags: 32768, components: [BOX('x')] }));
    expect(b).toMatch(OVERWRITE);
    expect(b).toMatch(/add Container/);
    expect(b).toMatch(/switch from Classic to Components V2/);
  });

  it('STRUCTURAL: no input can produce a body lacking the sentence — exhaustive over the diff space', () => {
    const TYPES = [[], ['Action Row'], ['Container', 'Section']];
    let n = 0;
    TYPES.forEach((removedTypes) => TYPES.forEach((addedTypes) => [true, false].forEach((modeChanges) => {
      const d: LoadDiff = {
        addedTypes, removedTypes, modeChanges, fromMode: 'classic', toMode: modeChanges ? 'v2' : 'classic',
      };
      expect(describeLoadDiff(d)).toMatch(OVERWRITE);
      n += 1;
    })));
    expect(n).toBe(18);
  });
});

/**
 * CR13-B — the class sweep, re-run. The class is:
 *   "a confirmation whose message asserts the absence of change over a wider
 *    scope than the comparison it performed."
 *
 * The implementer swept `withConfirmation(` in `*.tsx` -> 3 hits. That predicate
 * cannot see `showConfirmation(` (the underlying call the wrapper delegates to)
 * nor any call in a `.ts` file. The broadened sweep returns FIVE sites; the two
 * it could not see are asserted here.
 */
describe('CR13-B — hasChanged conflates "has unsaved edits" with "is authenticated"', () => {
  // Transcribed verbatim from MessageProvider/index.tsx at 7890fc9:
  //   status === 'authenticated' && !typedDeepEqual(savedMessage?.data, message?.data)
  const hasChanged = (status: string, saved: any, current: any) => status === 'authenticated'
    && !typedDeepEqual(saved, current);

  const saved = { content: 'original' };
  const edited = { content: 'the user has typed a lot of new work here' };

  it('an authenticated user with edits: hasChanged is true', () => {
    expect(hasChanged('authenticated', saved, edited)).toBe(true);
  });

  it('an UNAUTHENTICATED user with the SAME edits: hasChanged is false', () => {
    expect(hasChanged('unauthenticated', saved, edited)).toBe(false);
    // The data differs identically in both cases — only the session differs.
    expect(typedDeepEqual(saved, edited)).toBe(false);
  });

  it('usePusher: the cross-tab reload prompt then omits its data-loss clause', () => {
    // Transcribed verbatim from usePusher.ts:48 at 7890fc9.
    const prompt = (hc: boolean) => `The message you are viewing has been updated. Would you like to reload it?${hc ? ' Any changes you have made will be lost.' : ''}`;
    expect(prompt(hasChanged('authenticated', saved, edited))).toMatch(/changes you have made will be lost/);
    expect(prompt(hasChanged('unauthenticated', saved, edited))).not.toMatch(/lost/);
  });

  it('Navigation Reload: enabled:hasChanged means the dialog is SKIPPED entirely', () => {
    // Transcribed verbatim from ConfirmationProvider.showConfirmation at 7890fc9.
    let confirmed = false;
    let shown = false;
    const showConfirmation = (o: { enabled: boolean, onConfirm: () => void }) => {
      if (!o.enabled) { o.onConfirm(); } else { shown = true; }
    };
    showConfirmation({
      enabled: hasChanged('unauthenticated', saved, edited),
      onConfirm: () => { confirmed = true; },
    });
    // No dialog, and the destructive action ran immediately.
    expect(shown).toBe(false);
    expect(confirmed).toBe(true);
  });
});

describe('CR13-REPORT', () => {
  it('writes the closure and sweep tables', () => {
    writeFileSync(
      join(__dirname, 'closure-and-sweep.txt'),
      [
        'CR13 — round-12 HIGH-1 closure at 7890fc9.',
        '',
        'path                                 body states the overwrite?',
        ...PATHS.map(([n, c, i]) => `  ${n.padEnd(34)} ${OVERWRITE.test(body(c, validate(i))) ? 'YES' : 'NO'}`),
        '',
        'CLOSED. The 299b842 control fails the no-diff paths, so this is a measurement.',
        'Exhaustive over the 18-cell diff space: no input produces a body without it.',
        '',
        '--- class sweep, re-run and broadened ---',
        'implementer predicate: withConfirmation( in *.tsx        -> 3 sites',
        'broadened: withConfirmation|showConfirmation, *.ts+*.tsx -> 5 sites',
        '',
        '  JsonModalBody.tsx:215        withConfirmation   FIXED this round',
        '  Navigation.tsx:132 (Clear)   withConfirmation   static string, not a member',
        '  Navigation.tsx:161 (Reload)  withConfirmation   MEMBER (via enabled: hasChanged)',
        '  DiscordMessageEditor:228     showConfirmation   MISSED by predicate; computed message,',
        '                                                  but both branches assert loss -> NOT a member',
        '  usePusher.ts:43              showConfirmation   MISSED by predicate (.ts file); MEMBER',
        '',
        'Root cause of the two members: hasChanged is gated on status === "authenticated",',
        'so it is false for an unauthenticated user no matter how much they have edited.',
        'PRE-EXISTING and untouched by chain 013 — routed, not fixed here.',
        '',
      ].join('\n'),
    );
    expect(PATHS.length).toBe(8);
  });
});
