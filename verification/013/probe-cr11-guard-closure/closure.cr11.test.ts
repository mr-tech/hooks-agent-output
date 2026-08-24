import { describe, it, expect, vi } from 'vitest';
import { writeFileSync } from 'fs';
import { join } from 'path';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { discordMessageImportShape } from '~/server/api/utils/shapes';
import {
  applyDisposition, noticeMessageForSettled, resolveContentLoss,
} from '~/utils';

/**
 * CR11 — is the round-10 MEDIUM-2 class CLOSED at 54fed63?
 *
 * Same construction as CR10: the effect body's control flow transcribed verbatim,
 * every function it calls being the real one. The ONLY difference between the two
 * surfaces below is the single line 54fed63 deleted, so any behavioural difference
 * is attributable to that line and to nothing else.
 *
 * `clearOnCatch: true`  == 82af843 (pre-fix)  -> the CONTROL
 * `clearOnCatch: false` == 54fed63 (post-fix) -> the tree under review
 */
function makeSurface(clearOnCatch: boolean) {
  let lastNoticeClass: null | string = null;
  const toasts: string[] = [];

  function onTextChange(jsonMessageString: string) {
    try {
      const parsed = JSON.parse(jsonMessageString);
      const validated = discordMessageImportShape.parse(parsed) as any;
      const disposition = resolveContentLoss(
        validated.flags as number | undefined,
        validated.components as undefined | { type: number }[],
        validated.content,
        validated.embeds,
      );
      if (disposition.requiresChoice) {
        lastNoticeClass = disposition.noticeClass;
        return;
      }
      const notice = noticeMessageForSettled(disposition as any);
      if (notice && lastNoticeClass !== disposition.noticeClass) toasts.push(notice);
      lastNoticeClass = disposition.noticeClass;
      applyDisposition(validated);
    } catch {
      if (clearOnCatch) lastNoticeClass = null;
    }
  }

  return { onTextChange, toasts: () => toasts };
}

const drive = (seq: string[], clearOnCatch = false) => {
  const s = makeSurface(clearOnCatch);
  seq.forEach((t) => s.onTextChange(t));
  return s.toasts();
};

const ROW_D = '{"flags":32768,"content":"hello"}';
const BROKEN = '{"flags":32768,"content":"hello"';
const ROW_A = '{"content":"hello"}';
const ROW_E = '{"flags":32768,"content":"hi","components":[{"type":17,"components":[{"type":10,"content":"x"}]}]}';

describe('CR11-A — the three sequences CR10 demonstrated are now closed', () => {
  const cases: [string, string[]][] = [
    ['delete one char, retype it', [ROW_D, BROKEN, ROW_D]],
    ['add a second key (invalid intermediates)', [
      ROW_D, '{"flags":32768,"content":"hello",', '{"flags":32768,"content":"hello","u',
      '{"flags":32768,"content":"hello","username":"x"}',
    ]],
    ['8 invalid->valid round trips', [ROW_D, ...Array(8).fill([BROKEN, ROW_D]).flat()]],
    ['truncated paste-over intermediate', [ROW_D, '{"flags":32768,"content":', ROW_D]],
  ];

  cases.forEach(([name, seq]) => {
    it(`${name}: exactly ONE toast at 54fed63`, () => {
      expect(drive(seq, false)).toHaveLength(1);
    });

    it(`${name}: CONTROL — the 82af843 guard still fires more, so the check discriminates`, () => {
      expect(drive(seq, true).length).toBeGreaterThan(1);
    });
  });
});

describe('CR11-B — the sequences that already worked did not regress', () => {
  it('10x identical row-D text still toasts once', () => {
    expect(drive(Array(10).fill(ROW_D))).toHaveLength(1);
  });

  it('continuous valid typing still toasts once', () => {
    const seq = ['hello', 'hello ', 'hello w', 'hello wo', 'hello wor']
      .map((c) => `{"flags":32768,"content":"${c}"}`);
    expect(drive(seq)).toHaveLength(1);
  });

  it('a first-ever row D still toasts (the guard did not swallow the real one)', () => {
    expect(drive([ROW_D])).toHaveLength(1);
  });
});

describe('CR11-C — ATTACK: did removing the reset SUPPRESS a toast that should fire?', () => {
  it('a genuine class change still fires, even across an invalid intermediate', () => {
    // row D -> (broken) -> row B: different notice class, must still warn.
    const ROW_B = '{"components":[{"type":17,"components":[{"type":10,"content":"x"}]}]}';
    const toasts = drive([ROW_D, BROKEN, ROW_B]);
    expect(toasts).toHaveLength(2);
    expect(toasts[0]).not.toBe(toasts[1]);
  });

  it('leaving the conflict and returning still warns (row A excursion, deliberately preserved)', () => {
    // Round 10 judged this DEFENSIBLE and did not ask for it to change.
    // Asserting it here so a later "tidy" cannot silently remove it.
    expect(drive([ROW_D, ROW_A, ROW_D])).toHaveLength(2);
  });

  it('row E does not swallow a following settled warning', () => {
    // requiresChoice sets the ref to 'choice'; a later row D must still warn.
    expect(drive([ROW_E, ROW_D])).toHaveLength(1);
  });

  it('an unparseable state at the very start does not suppress the first real warning', () => {
    expect(drive(['{', BROKEN, ROW_D])).toHaveLength(1);
  });
});

describe('CR11-D — the one behaviour this guard does NOT give, stated rather than implied', () => {
  it('a DIFFERENT message on the same notice class is not re-warned', () => {
    const OTHER_ROW_D = '{"flags":32768,"content":"a totally different message"}';
    // One warning, not two. This is pre-existing (true for valid paths before the
    // fix too), it is what "de-duplicate by notice class" means, and it is NOT a
    // round-10 finding. Recorded so nobody reads CR11-A as a stronger claim.
    expect(drive([ROW_D, BROKEN, OTHER_ROW_D])).toHaveLength(1);
  });
});

describe('CR11-REPORT', () => {
  it('writes the closure summary', () => {
    const rows: [string, string[]][] = [
      ['delete one char, retype it', [ROW_D, BROKEN, ROW_D]],
      ['add a second key', [ROW_D, '{"flags":32768,"content":"hello",', '{"flags":32768,"content":"hello","username":"x"}']],
      ['8 invalid->valid round trips', [ROW_D, ...Array(8).fill([BROKEN, ROW_D]).flat()]],
      ['truncated paste-over', [ROW_D, '{"flags":32768,"content":', ROW_D]],
      ['10x identical row-D', Array(10).fill(ROW_D)],
      ['row D -> broken -> row B (must warn)', [ROW_D, BROKEN, '{"components":[{"type":17,"components":[{"type":10,"content":"x"}]}]}']],
      ['row D -> row A -> row D (defensible)', [ROW_D, ROW_A, ROW_D]],
    ];
    writeFileSync(
      join(__dirname, 'closure-summary.txt'),
      [
        'CR11 — round-10 MEDIUM-2 residual, at 54fed63 (one line deleted from the catch branch).',
        'The two columns differ ONLY by that line, so any difference is attributable to it.',
        '',
        'sequence                                  82af843   54fed63',
        ...rows.map(([n, s]) => `  ${n.padEnd(40)} ${String(drive(s, true).length).padEnd(9)} ${drive(s, false).length}`),
        '',
        'CLASS CLOSED. The four sequences CR10 raised now give exactly one toast each,',
        'and the control column shows the pre-fix guard still firing more — so this is a',
        'measurement, not a vacuous pass.',
        '',
        'Deliberately UNCHANGED: row D -> row A -> row D still warns twice. Round 10 judged',
        'that defensible and did not ask for it. CR11-C asserts it so a later tidy cannot',
        'silently remove it.',
        '',
        'NOT claimed: a different message on the same notice class is not re-warned',
        '(CR11-D). That is what de-duplication by class means and predates the fix.',
        '',
      ].join('\n'),
    );
    expect(rows.length).toBe(7);
  });
});
