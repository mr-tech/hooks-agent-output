/**
 * QA Phase 3 — STALE-PREDICTION DIFFERENTIAL, chain 013.
 *
 * WHAT THIS SETTLES. `uat`'s rev 18 marked eight register rows PREDICTION STALE because the
 * surfaces beneath them were touched at `e343927` and `2d90e8a`. That marking was taken from the
 * commits' FILE LISTS, not from executing the rows' predicates. This instrument executes them.
 *
 * It DUMPS, it does not judge: for every register row that predicts a user-visible string or a
 * disposition, it computes that value from the real product functions and the real surface source,
 * and writes a deterministic report. The report is produced at the QA-verified baseline
 * `4a7126b` and at the live tip `2d90e8a`, and the two are DIFFED.
 *
 *   identical report line  ->  the row's prediction did not move; the staleness marking is
 *                              over-broad on that row and QA may lift it.
 *   changed report line    ->  the row's prediction DID move; QA re-derives it to the new value.
 *
 * This is the "execute both trees over the verified surface, never read the diff's file list"
 * discipline in qa.md ("Verdict Freshness"), applied to register rows rather than to a verdict.
 *
 * NON-VACUITY. Section Z asserts that the report is non-empty and that every row id the register
 * marks stale appears in it. A dump that silently produced nothing would otherwise diff clean
 * against another dump that produced nothing, and read as "no movement".
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it, vi } from 'vitest';

import {
  applyDisposition, computeLoadDiff, describeDropSet, describeLoadDiff,
  noticeMessageForSettled, resolveContentLoss,
} from '~/utils';
import { validateContentRequirements } from '~/utils/limits';
import { describeUnsupportedComponentTypes, discordMessageImportShape } from '~/server/api/utils/shapes';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const OUT = process.env.QA_P3_REPORT ?? '/tmp/qa013-p3-report.txt';
const FLAG = 1 << 15; // 32768

const PASTE = resolve(__dirname, '../../app/message/_components/NewMessageJsonInput.tsx');
const NMMODAL = resolve(__dirname, '../../app/message/_components/NewMessageModal.tsx');
const JMB = resolve(__dirname, '../../app/message/m/[id]/_components/JsonModalBody.tsx');
const LAYOUT = resolve(__dirname, '../../app/message/m/[id]/layout.tsx');
const PROVIDER = resolve(__dirname, '../../providers/MessageProvider/index.tsx');

const read = (p: string) => { try { return readFileSync(p, 'utf8'); } catch { return '<<ABSENT>>'; } };

/** How many top-level components survive the REAL lenient filter, via the real import shape. */
function filterProbe(components: unknown): number {
  try {
    const out = discordMessageImportShape.parse({ content: 'x', components }) as { components?: unknown[] };
    return (out.components ?? []).length;
  } catch { return -1; }
}

const lines: string[] = [];
const put = (s: string) => { lines.push(s); };

const CONTAINER = { type: 17, components: [{ type: 10, content: 'hello' }] };
const THUMB = { type: 11, media: { url: 'https://example.invalid/a.png' } };

/** The eight cells of M8's selector: (bit, hasV2Components, hasClassicContent). */
function cell(bit: boolean, comps: boolean, classic: boolean) {
  const d: Record<string, unknown> = {};
  if (bit) d.flags = FLAG;
  if (comps) d.components = [CONTAINER];
  if (classic) d.content = 'hi';
  return d;
}

// -------------------------------------------------------------------------------------------
// A. BC-7 / BC-8 / BC-9 / BC-10 / BC-18 / BC-21 — the disposition and the notice, all 8 cells.
// -------------------------------------------------------------------------------------------
describe('A — disposition and settled-notice text, all eight cells', () => {
  it('dumps every cell', () => {
    put('## A — resolveContentLoss over all eight cells (BC-7, BC-8, BC-9, BC-10, BC-18, BC-21)');
    for (const bit of [false, true]) {
      for (const comps of [false, true]) {
        for (const classic of [false, true]) {
          const d = cell(bit, comps, classic);
          const disp = resolveContentLoss(
            d.flags as number | undefined,
            d.components as undefined | { type: number }[],
            d.content as undefined | string,
            d.embeds as undefined | unknown[],
          );
          const id = `bit=${bit ? 1 : 0} v2comp=${comps ? 1 : 0} classic=${classic ? 1 : 0}`;
          put(`CELL ${id}`);
          put(`  row=${disp.row} mode=${String(disp.mode)} noticeClass=${disp.noticeClass} requiresChoice=${disp.requiresChoice}`);
          if (disp.requiresChoice) {
            for (const o of disp.options) {
              put(`  option mode=${o.mode} dropSet=[${o.dropSet.join(',')}] label=${JSON.stringify(describeDropSet(o.dropSet))}`);
            }
            put('  settledNotice=<n/a: choice>');
          } else {
            put(`  settledNotice=${JSON.stringify(noticeMessageForSettled(disp))}`);
            const applied = applyDisposition(d as never) as Record<string, unknown>;
            put(`  applied.flags=${String(applied.flags)} applied.content=${JSON.stringify(applied.content)} applied.components=${JSON.stringify(applied.components)}`);
            put(`  contentFloorError=${JSON.stringify(validateContentRequirements(applied as never) ?? null)}`);
          }
        }
      }
    }
    expect(lines.length).toBeGreaterThan(8);
  });
});

// -------------------------------------------------------------------------------------------
// B. BC-6 / BC-19-residue — the dropped-types notice: the computed list AND the rendered template.
// -------------------------------------------------------------------------------------------
describe('B — dropped-component-types notice, computed list and rendered template', () => {
  it('dumps the list and every surface template', () => {
    put('');
    put('## B — dropped types notice (BC-6, and the wording every surface renders)');
    put(`describeUnsupportedComponentTypes([Thumbnail-11]) = ${JSON.stringify(describeUnsupportedComponentTypes([THUMB]))}`);
    put(`describeUnsupportedComponentTypes([container, Thumbnail-11]) = ${JSON.stringify(describeUnsupportedComponentTypes([CONTAINER, THUMB]))}`);
    put(`describeUnsupportedComponentTypes(undefined) = ${JSON.stringify(describeUnsupportedComponentTypes(undefined as never))}`);
    for (const [name, path] of [['PASTE', PASTE], ['NEW_MESSAGE_MODAL', NMMODAL], ['JSON_MODAL_BODY', JMB]] as const) {
      const src = read(path);
      const m = src.match(/`[^`]*\$\{droppedComponentTypes\.join[^`]*`/);
      put(`TEMPLATE ${name} = ${m ? JSON.stringify(m[0]) : '<<NO TEMPLATE FOUND>>'}`);
    }
    // The code-import (bot code path) notice: present or removed from the product.
    put(`CODE_PATH provider exposes codeMessageDroppedNotice = ${read(PROVIDER).includes('codeMessageDroppedNotice')}`);
    put(`CODE_PATH layout mounts <CodeMessageNotice /> = ${read(LAYOUT).includes('<CodeMessageNotice />')}`);
    expect(true).toBe(true);
  });
});

// -------------------------------------------------------------------------------------------
// C. BC-1 — the Load confirmation string, over the transitions the row names.
// -------------------------------------------------------------------------------------------
describe('C — Load confirmation text (BC-1)', () => {
  it('dumps the confirmation for each transition', () => {
    put('');
    put('## C — Load confirmation (BC-1): describeLoadDiff(computeLoadDiff(current, incoming))');
    const CUR_CLASSIC = { content: 'old' };
    const CUR_V2 = { flags: FLAG, components: [CONTAINER] };
    const CUR_V2_ROW = { flags: FLAG, components: [{ type: 1, components: [] }] };
    const cases: [string, Record<string, unknown>, Record<string, unknown>][] = [
      ['classic -> V2 container', CUR_CLASSIC, { components: [CONTAINER] }],
      ['V2 container -> classic', CUR_V2, { content: 'hi' }],
      ['V2 container -> V2 action row', CUR_V2, CUR_V2_ROW],
      ['V2 container -> V2 container (no change)', CUR_V2, { flags: FLAG, components: [CONTAINER] }],
      ['classic -> classic', CUR_CLASSIC, { content: 'hi' }],
    ];
    for (const [name, cur, inc] of cases) {
      const diff = computeLoadDiff(cur as never, inc as never);
      put(`CASE ${name}`);
      put(`  added=[${diff.addedTypes.join(',')}] removed=[${diff.removedTypes.join(',')}] modeChanges=${diff.modeChanges} ${diff.fromMode}->${diff.toMode}`);
      put(`  text=${JSON.stringify(describeLoadDiff(diff))}`);
    }
    // Does the confirmation describe the RESOLVED draft or the raw one? Source-pinned.
    const jmb = read(JMB);
    const rawArg = jmb.includes('describeLoadDiff(computeLoadDiff(message?.data ?? {}, validatedDraft))');
    put(`JMB confirmation arg is raw validatedDraft = ${rawArg}`);
    put(`JMB commitLoad applies applyDisposition = ${jmb.includes('applyDisposition(validatedDraft)')}`);
    put(`JMB commitLoad sets mode from disposition = ${jmb.includes('editableState.setMessageMode(disposition.mode)')}`);

    // BC-1's second clause is "whether the message TYPE changes". The confirmation is computed
    // over the raw draft; the Load applies applyDisposition. Where those two disagree the
    // confirmation names a transition that does not happen. Dumped, not asserted.
    put('CONFIRMATION vs WHAT LOAD ACTUALLY DOES (BC-1 clause 2)');
    const CUR_CLASSIC2 = { content: 'old' };
    const CUR_V2B = { flags: FLAG, components: [CONTAINER] };
    const rows: [string, Record<string, unknown>, Record<string, unknown>][] = [
      ['row D incoming (flag + content, no components), current Classic', CUR_CLASSIC2, { content: 'hi', flags: FLAG }],
      ['row D incoming, current V2', CUR_V2B, { content: 'hi', flags: FLAG }],
      ['row B incoming (components, no flag), current Classic', CUR_CLASSIC2, { components: [CONTAINER] }],
      ['row C incoming (flag + components), current Classic', CUR_CLASSIC2, { flags: FLAG, components: [CONTAINER] }],
    ];
    for (const [name, cur, inc] of rows) {
      const said = describeLoadDiff(computeLoadDiff(cur as never, inc as never));
      const disp = resolveContentLoss(
        inc.flags as number | undefined,
        inc.components as undefined | { type: number }[],
        inc.content as undefined | string,
        inc.embeds as undefined | unknown[],
      );
      const applied = applyDisposition(inc as never) as Record<string, unknown>;
      put(`  ${name}`);
      put(`    confirmation says : ${JSON.stringify(said)}`);
      put(`    Load actually sets: mode=${String(disp.mode)} flags=${String(applied.flags)} components=${JSON.stringify(applied.components)} content=${JSON.stringify(applied.content)}`);
      const saidV2 = said.includes('to Components V2');
      const saidClassic = said.includes('to Classic');
      const agrees = (disp.mode === 'v2' && !saidClassic) || (disp.mode === 'classic' && !saidV2);
      put(`    agrees=${agrees}`);
    }
    expect(true).toBe(true);
  });
});

// -------------------------------------------------------------------------------------------
// D. The row-E resting state (D31) — what the surface shows WITHOUT a click.
// -------------------------------------------------------------------------------------------
describe('D — row-E resting state after D31 (BC-9, BC-18)', () => {
  it('dumps the resting-state wiring at both JSON surfaces', () => {
    put('');
    put('## D — row-E resting state (D31): does the effect populate pendingChoice or dismissedChoice?');
    for (const [name, path] of [['PASTE', PASTE], ['JSON_MODAL_BODY', JMB]] as const) {
      const src = read(path);
      put(`${name} effect sets dismissedChoice on requiresChoice = ${/requiresChoice\)\s*\{\s*setDismissedChoice/.test(src.replace(/\s+/g, ' ').replace(/ \{ /g, ' { '))}`);
      put(`${name} contains "setDismissedChoice({ validated" = ${src.includes('setDismissedChoice({ validated')}`);
      put(`${name} contains "setPendingChoice({ validated" = ${src.includes('setPendingChoice({ validated')}`);
      const rest = src.match(/This message has both Components V2 and classic content — nothing was [a-z]+\./);
      put(`${name} resting notice = ${rest ? JSON.stringify(rest[0]) : '<<NONE>>'}`);
      put(`${name} settledNotice render guard present = ${src.includes('show={!error && settledNotice}')}`);
    }
    expect(true).toBe(true);
  });
});

// -------------------------------------------------------------------------------------------
// E. e343927 (D34) — the five relaxed emptiness floors. Which INPUTS changed status, and does
//    any register row predict over them? Added after the first differential run, which could not
//    see this change because every payload in section A has non-empty children.
// -------------------------------------------------------------------------------------------
describe('E — the five relaxed emptiness floors (e343927 / D34)', () => {
  it('dumps import-shape acceptance and disposition for each now-legal empty child', () => {
    put('');
    put('## E — empty-child payloads across the five shapes relaxed at e343927 (D34)');
    const EMPTY: [string, Record<string, unknown>][] = [
      ['empty Container', { components: [{ type: 17, components: [] }] }],
      ['empty Text Display in Container', { components: [{ type: 17, components: [{ type: 10, content: '' }] }] }],
      ['empty Action Row (top level)', { components: [{ type: 1, components: [] }] }],
      ['empty Section components', { components: [{ type: 17, components: [{ type: 9, components: [], accessory: { type: 11, media: { url: 'https://example.invalid/a.png' } } }] }] }],
      ['empty Media Gallery items', { components: [{ type: 17, components: [{ type: 12, items: [] }] }] }],
      ['empty Container + classic content', { content: 'hi', components: [{ type: 17, components: [] }] }],
    ];
    for (const [name, payload] of EMPTY) {
      let parsed: unknown = null;
      let accepted = false;
      let err = '';
      try {
        parsed = discordMessageImportShape.parse(payload);
        accepted = true;
      } catch (e) {
        err = (e as { issues?: unknown[] }).issues
          ? JSON.stringify((e as { issues: { path: unknown[], message: string }[] }).issues
            .map((i) => `${i.path.join('.')}: ${i.message}`))
          : String(e);
      }
      put(`EMPTY ${name}`);
      put(`  importShapeAccepts=${accepted}`);
      if (!accepted) { put(`  rejectReason=${err}`); continue; }
      const d = parsed as Record<string, unknown>;
      const disp = resolveContentLoss(
        d.flags as number | undefined,
        d.components as undefined | { type: number }[],
        d.content as undefined | string,
        d.embeds as undefined | unknown[],
      );
      put(`  row=${disp.row} mode=${String(disp.mode)} noticeClass=${disp.noticeClass} requiresChoice=${disp.requiresChoice}`);
      if (!disp.requiresChoice) {
        put(`  settledNotice=${JSON.stringify(noticeMessageForSettled(disp))}`);
        const applied = applyDisposition(d as never) as Record<string, unknown>;
        put(`  contentFloorError=${JSON.stringify(validateContentRequirements(applied as never) ?? null)}`);
      }
    }
    put('');
    put('## E2 — is a component that the lenient filter removes ALWAYS named? (BC-6 class)');
    const FILTER_CASES: [string, unknown][] = [
      ['top-level Thumbnail-11 (unsupported type)', [THUMB]],
      ['Container with zero children', [{ type: 17, components: [] }]],
      ['Action Row with zero buttons', [{ type: 1, components: [] }]],
      ['Container whose only child is an unsupported type', [{ type: 17, components: [{ type: 3, custom_id: 'x', options: [] }] }]],
      ['Container with one Text Display (control: survives)', [CONTAINER]],
    ];
    for (const [name, comps] of FILTER_CASES) {
      const named = describeUnsupportedComponentTypes(comps as never);
      const kept = filterProbe(comps);
      const removed = (comps as unknown[]).length - kept;
      put(`  ${name}`);
      put(`    topLevelIn=${(comps as unknown[]).length} topLevelKept=${kept} removed=${removed} namedToUser=${JSON.stringify(named)}`);
      put(`    SILENT_DROP=${removed > 0 && named.length === 0}`);
      // and the whole-message outcome when classic content is also present
      const payload = { content: 'hi', components: comps } as Record<string, unknown>;
      let outcome = '';
      try {
        const parsed = discordMessageImportShape.parse(payload) as Record<string, unknown>;
        const disp = resolveContentLoss(
          parsed.flags as number | undefined,
          parsed.components as undefined | { type: number }[],
          parsed.content as undefined | string,
          parsed.embeds as undefined | unknown[],
        );
        const notice = disp.requiresChoice ? 'CHOICE' : noticeMessageForSettled(disp);
        const floor = disp.requiresChoice
          ? null : validateContentRequirements(applyDisposition(parsed as never) as never) ?? null;
        outcome = `row=${disp.row} settledNotice=${JSON.stringify(notice)} floorError=${JSON.stringify(floor)} droppedNotice=${JSON.stringify(named)}`;
      } catch (e) {
        outcome = `REJECTED: ${String((e as Error).message).split('\n')[0]}`;
      }
      put(`    with content:"hi" -> ${outcome}`);
    }
    expect(true).toBe(true);
  });
});

// -------------------------------------------------------------------------------------------
// F. BC-18's TWO LIMBS, executed as an edit sequence — "appears and stays put" and
//    "clears when the JSON is corrected". This is the only limb pair in the register where an
//    observation can diverge from its prediction (uat rev 25, R25.2), so it is the one that has
//    to be executed rather than reasoned about.
//
//    The reducer below transcribes NewMessageJsonInput's useUpdateEffect. It does not hardcode
//    which state the row-E branch writes: it READS that from the surface source, so the same
//    reducer models the baseline tree and the tip tree correctly and the transcription cannot
//    silently mis-model whichever tree it was not written against.
//
//    WHAT THIS CANNOT ESTABLISH: that React renders the state. The paste surface's component
//    function is not reachable without a hook driver (see probe-qa-paste-surface-render/
//    trace-paste-surface-unreachable.txt), and D28 rules that harness out. This executes the
//    STATE MACHINE and pins the render guards as source text. The eye is the owner's, which is
//    what BC-18 is for.
// -------------------------------------------------------------------------------------------
describe('F — BC-18 edit sequence: appears, stays put, clears', () => {
  it('dumps what the paste surface holds after each edit', () => {
    put('');
    put('## F — BC-18 edit sequences at the New Message paste surface');

    const src = read(PASTE);
    const rowEWritesDismissed = src.includes('setDismissedChoice({ validated');
    const rowEWritesPending = src.includes('setPendingChoice({ validated');
    put(`REDUCER row-E branch writes: ${rowEWritesDismissed ? 'dismissedChoice' : ''}${rowEWritesPending ? 'pendingChoice' : ''}`);
    // Exactly one of the two must hold, or the transcription is not modelling this tree.
    expect(rowEWritesDismissed !== rowEWritesPending).toBe(true);

    type S = {
      error: null | string; dropped: string[]; settled: null | string;
      pending: boolean; dismissed: boolean;
    };
    const START: S = {
      error: null, dropped: [], settled: null, pending: false, dismissed: false,
    };

    /** Transcribed from NewMessageJsonInput's useUpdateEffect. */
    function effect(prev: S, json: string): S {
      const next: S = { ...prev, dismissed: false, settled: null };
      try {
        const parsed = JSON.parse(json) as { components?: unknown };
        next.dropped = describeUnsupportedComponentTypes(parsed.components);
        const validated = discordMessageImportShape.parse(parsed) as Record<string, unknown>;
        const disposition = resolveContentLoss(
          validated.flags as number | undefined,
          validated.components as undefined | { type: number }[],
          validated.content as undefined | string,
          validated.embeds as undefined | unknown[],
        );
        next.error = null;
        if (disposition.requiresChoice) {
          if (rowEWritesDismissed) next.dismissed = true; else next.pending = true;
          return next;
        }
        next.pending = false;
        next.settled = noticeMessageForSettled(disposition);
        return next;
      } catch (err) {
        next.pending = false;
        if ((err as { issues?: unknown }).issues) {
          next.error = 'ZodError(import shape)';
        } else {
          next.dropped = [];
          next.error = `JSON parse: ${(err as Error).message.split('\n')[0]}`;
        }
        return next;
      }
    }

    /** Transcribed from the surface's JSX. pendingChoice returns EARLY — the editor is replaced. */
    function visible(s: S): string {
      if (s.pending) return 'CHOICE UI ONLY — editor and all notices replaced';
      const out: string[] = [];
      if (s.error) out.push(`error: ${s.error}`);
      if (s.dropped.length) out.push(`dropped-types notice: ${s.dropped.join(', ')}`);
      if (!s.error && s.settled) out.push(`PERSISTENT WARNING: ${s.settled}`);
      if (!s.error && s.dismissed) out.push('resting conflict notice + Resolve link');
      return out.length ? out.join(' | ') : '(nothing)';
    }

    const ROW_B = JSON.stringify({ components: [CONTAINER] });
    const ROW_D = JSON.stringify({ content: 'hi', flags: FLAG });
    const SEQUENCES: [string, string[]][] = [
      ['BC-18 row B: warn, retype (stays), then correct by setting the flag',
        [ROW_B, ROW_B, JSON.stringify({ flags: FLAG, components: [CONTAINER] })]],
      ['BC-18 row D: warn, retype (stays), then correct by dropping the flag',
        [ROW_D, ROW_D, JSON.stringify({ content: 'hi' })]],
      ['BC-18 row D: correct by deleting the content instead',
        [ROW_D, JSON.stringify({ flags: FLAG, components: [CONTAINER] })]],
      ['BC-18 row B: correction path that TRAVERSES row E (add content)',
        [ROW_B, JSON.stringify({ content: 'hi', components: [CONTAINER] })]],
      ['BC-18 row D: correction path that TRAVERSES row E (add components)',
        [ROW_D, JSON.stringify({ content: 'hi', flags: FLAG, components: [CONTAINER] })]],
      ['BC-18 row D: mid-edit broken JSON, then corrected',
        [ROW_D, '{"content":"hi","flags":327', JSON.stringify({ content: 'hi' })]],
    ];

    for (const [name, steps] of SEQUENCES) {
      put(`SEQ ${name}`);
      let s = START;
      steps.forEach((json, i) => {
        s = effect(s, json);
        put(`  step${i + 1} json=${json}`);
        put(`    sees: ${visible(s)}`);
      });
    }

    put(`RENDER GUARD settled  = ${src.includes('show={!error && settledNotice}')}`);
    put(`RENDER GUARD dismissed= ${src.includes('show={!error && dismissedChoice}')}`);
    put(`EFFECT clears settledNotice at top of every run = ${src.includes('setSettledNotice(null);')}`);
    put('BC-18 residue: React actually rendering these is NOT established here — owner observation.');
    expect(true).toBe(true);
  });
});

// -------------------------------------------------------------------------------------------
// Z. Non-vacuity, and the write.
// -------------------------------------------------------------------------------------------
describe('Z — non-vacuity', () => {
  it('the report names every row the register marks stale, and is not empty', () => {
    const body = lines.join('\n');
    for (const row of ['BC-1', 'BC-6', 'BC-7', 'BC-8', 'BC-9', 'BC-10', 'BC-18', 'BC-21']) {
      expect(body).toContain(row);
    }
    expect(lines.filter((l) => l.startsWith('CELL ')).length).toBe(8);
    expect(body.length).toBeGreaterThan(1500);
    writeFileSync(OUT, `${body}\n`);
  });
});
