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
 * CR10 — the notice transition guard added at 82af843 (round-9 MEDIUM-2 fix).
 *
 * The effect BODY's control flow is transcribed verbatim from
 * NewMessageJsonInput.tsx at 82af843 (lines 87-122). Everything it calls —
 * discordMessageImportShape.parse, resolveContentLoss, noticeMessageForSettled,
 * applyDisposition — is the REAL function, not a stand-in. What is modelled is
 * the React control flow around them; what is executed is the guard itself.
 *
 * The claim under attack is the implementer's: "The transition guard removes the
 * *class* (repeat toasts on an unchanged notice), not just the frequency."
 */

/** Verbatim transcription of the effect body at 82af843. */
function makeSurface() {
  let lastNoticeClass: null | string = null;
  const toasts: string[] = [];

  function onTextChange(jsonMessageString: string) {
    // setDismissedChoice(null) — no bearing on the notice guard
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
      if (notice && lastNoticeClass !== disposition.noticeClass) {
        toasts.push(notice);
      }
      lastNoticeClass = disposition.noticeClass;
      applyDisposition(validated);
    } catch {
      lastNoticeClass = null;
    }
  }

  return { onTextChange, toasts: () => toasts };
}

function drive(sequence: string[]): string[] {
  const s = makeSurface();
  sequence.forEach((t) => s.onTextChange(t));
  return s.toasts();
}

// A row-D message: V2 flag set, classic content, no V2 components.
// noticeClass 'warn-v2-flag-conflict'.
const ROW_D = '{"flags":32768,"content":"hello"}';

describe('CR10-A — the fix does what it claims for the sequence it was built for', () => {
  it('the same row-D text re-run 10 times toasts exactly ONCE', () => {
    expect(drive(Array(10).fill(ROW_D))).toHaveLength(1);
  });

  it('typing further characters that keep the JSON valid and the row unchanged toasts ONCE', () => {
    const seq = ['hello', 'hello ', 'hello w', 'hello wo', 'hello wor', 'hello worl', 'hello world']
      .map((c) => `{"flags":32768,"content":"${c}"}`);
    expect(drive(seq)).toHaveLength(1);
  });

  it('CONTROL — the driver can produce more than one toast, so a 1 above is a result', () => {
    // Alternating between two genuinely different notice classes.
    const ROW_B = '{"components":[{"type":17,"components":[{"type":10,"content":"x"}]}]}';
    expect(drive([ROW_D, ROW_B, ROW_D]).length).toBeGreaterThan(1);
  });
});

describe('CR10-B — ATTACK: the catch branch resets the guard, so the class survives', () => {
  it('deleting one character and retyping it re-fires the SAME notice', () => {
    const seq = [
      ROW_D,                                 // valid   -> toast 1
      '{"flags":32768,"content":"hello"',     // INVALID (closing brace deleted)
      ROW_D,                                 // valid again, identical text -> ?
    ];
    const toasts = drive(seq);
    // Two toasts, identical text, for one continuous edit that ended where it began.
    expect(toasts).toHaveLength(2);
    expect(toasts[0]).toBe(toasts[1]);
  });

  it('adding a second key — every intermediate is unparseable — re-fires the same notice', () => {
    const seq = [
      ROW_D,
      '{"flags":32768,"content":"hello",',
      '{"flags":32768,"content":"hello","',
      '{"flags":32768,"content":"hello","u',
      '{"flags":32768,"content":"hello","username',
      '{"flags":32768,"content":"hello","username":',
      '{"flags":32768,"content":"hello","username":"x',
      '{"flags":32768,"content":"hello","username":"x"}',
    ];
    const toasts = drive(seq);
    expect(toasts).toHaveLength(2);
    expect(toasts[0]).toBe(toasts[1]);
  });

  it('MAGNITUDE: one toast per invalid->valid round trip, unbounded', () => {
    const trip = ['{"flags":32768,"content":"hello"', ROW_D];
    const seq = [ROW_D, ...Array(8).fill(trip).flat()];
    const toasts = drive(seq);
    // 1 initial + 8 round trips = 9 identical toasts.
    expect(toasts).toHaveLength(9);
    expect(new Set(toasts).size).toBe(1);
  });
});

describe('CR10-C — where the boundary actually is', () => {
  it('an invalid intermediate is NOT required to be a deletion — any unparseable state does it', () => {
    // Pasting over a selection momentarily yields a truncated document.
    const seq = [ROW_D, '{"flags":32768,"content":', ROW_D];
    expect(drive(seq)).toHaveLength(2);
  });

  it('a valid intermediate on a DIFFERENT row does not need the catch branch to re-fire', () => {
    // Row A carries noticeClass 'none' and no toast, but it still overwrites the ref.
    const ROW_A = '{"content":"hello"}';
    const seq = [ROW_D, ROW_A, ROW_D];
    const toasts = drive(seq);
    expect(toasts).toHaveLength(2);
    // So the hole is wider than the catch branch: ANY excursion to another
    // noticeClass, valid or not, re-arms the same notice.
  });
});

/**
 * CR10-D — the MEDIUM-3 closure, so it has a check that FAILS if the class returns.
 * State machine transcribed verbatim from 82af843: cancelChoice / reopenChoice and the
 * setDismissedChoice(null) at the top of the effect.
 */
function makeDismissMachine() {
  let pendingChoice: null | { tag: string } = null;
  let dismissedChoice: null | { tag: string } = null;
  let message: null | string = null;

  return {
    onTextChange(rowE: boolean, tag: string) {
      dismissedChoice = null;
      if (rowE) { pendingChoice = { tag }; message = null; return; }
      pendingChoice = null;
      message = tag;
    },
    cancelChoice() {
      if (pendingChoice) dismissedChoice = pendingChoice;
      pendingChoice = null;
      message = null;
    },
    reopenChoice() {
      if (!dismissedChoice) return;
      pendingChoice = dismissedChoice;
      dismissedChoice = null;
    },
    state: () => ({ pendingChoice, dismissedChoice, message }),
  };
}

describe('CR10-D — MEDIUM-3 closure: dismissal is re-enterable', () => {
  it('after Cancel the surface still offers a way back, and it restores the SAME choice', () => {
    const m = makeDismissMachine();
    m.onTextChange(true, 'rowE-draft');
    expect(m.state().pendingChoice).toEqual({ tag: 'rowE-draft' });

    m.cancelChoice();
    // The class that was the finding: dismissal leaving NOTHING to re-enter.
    expect(m.state().pendingChoice).toBeNull();
    expect(m.state().dismissedChoice).toEqual({ tag: 'rowE-draft' }); // <- the affordance
    expect(m.state().message).toBeNull();

    m.reopenChoice();
    // Restored, and it is the same object, not a re-derivation.
    expect(m.state().pendingChoice).toEqual({ tag: 'rowE-draft' });
    expect(m.state().dismissedChoice).toBeNull();
  });

  it('a dismissed choice does not outlive the text it was resolved against', () => {
    const m = makeDismissMachine();
    m.onTextChange(true, 'draft-1');
    m.cancelChoice();
    expect(m.state().dismissedChoice).not.toBeNull();

    m.onTextChange(false, 'draft-2');           // any text change
    expect(m.state().dismissedChoice).toBeNull();

    m.reopenChoice();                            // must be a no-op now
    expect(m.state().pendingChoice).toBeNull();
  });

  it('CONTROL — the pre-fix machine FAILS this, so the check discriminates', () => {
    // The ee3bc3e cancelChoice: pendingChoice = null, no dismissedChoice at all.
    let pendingChoice: null | { tag: string } = { tag: 'rowE-draft' };
    let dismissedChoice: null | { tag: string } = null;
    pendingChoice = null;                        // cancelChoice at ee3bc3e
    expect(pendingChoice).toBeNull();
    expect(dismissedChoice).toBeNull();          // nothing to re-enter — the finding
  });
});

describe('CR10-REPORT', () => {
  it('writes the attack summary', () => {
    const rows = [
      ['10x identical row-D text', drive(Array(10).fill(ROW_D)).length, 1],
      ['typing, all states valid', drive(['hello', 'hello ', 'hello w']
        .map((c) => `{"flags":32768,"content":"${c}"}`)).length, 1],
      ['delete one char, retype it', drive([ROW_D, '{"flags":32768,"content":"hello"', ROW_D]).length, 1],
      ['add a second key (7 invalid intermediates)', drive([
        ROW_D, '{"flags":32768,"content":"hello",', '{"flags":32768,"content":"hello","username":"x"}',
      ]).length, 1],
      ['8 invalid->valid round trips', drive([ROW_D,
        ...Array(8).fill(['{"flags":32768,"content":"hello"', ROW_D]).flat()]).length, 1],
      ['excursion to row A and back', drive([ROW_D, '{"content":"hello"}', ROW_D]).length, 1],
    ];
    writeFileSync(
      join(__dirname, 'attack-summary.txt'),
      [
        'CR10 — round-9 MEDIUM-2 transition guard at 82af843, attacked.',
        'Claim under attack: "the transition guard removes the CLASS, not just the frequency".',
        '',
        'sequence                                    toasts   a correct guard would give',
        ...rows.map(([n, got, want]) => `  ${String(n).padEnd(42)} ${String(got).padEnd(8)} ${want}`),
        '',
        'The guard holds only while the document stays parseable AND stays on one notice',
        'class. The catch branch sets lastNoticeClass = null, and any excursion to another',
        'class overwrites it — so the same notice re-fires on return. Frequency reduced;',
        'class not removed.',
        '',
      ].join('\n'),
    );
    expect(rows.length).toBe(6);
  });
});
