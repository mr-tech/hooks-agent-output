---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "e58f2ed — repos=website; M4 at the code review's Round 4 Reviewed-At; git-archive export with its own frozen offline install; the stub-tree records moved no production path"
Status: QA Complete
Status-Detail: >-
  M4 at website e58f2ed passes, milestone-scoped. The TDD gate passes on re-open, with the five stub-tree records. AC-3.1, AC-3.6,
  AC-3.7 (with RK-9's count unchanged at 6,142), AC-3.8 (ii) (no members), AC-4.1 and AC-4.3 to AC-4.8 pass, and so does AC-2.6's
  notice in the client chunk. AC-4.2 passes its class probe; its walk is UAT's (B-2), as is AC-4.4's (B-7). QAF-37 LOW is a stated
  limit under the cap. A production change to an M4 path expires this verdict.
Phase: 2
---

# QA Report: 019 — M4, the preview on the engine (Phase 2)

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 12, registrations to R-50 (R-44's six
stated limits on M4, R-45's cap on M4 to M6, R-47's CR-14 note), milestone M4.
**Code review**: `code-review/019-slate-formatting-discord-engine-code-review.md`, Round 4, APPROVED_WITH_COMMENTS at
`Reviewed-At: e58f2ed` (record `d31214e4`).
**Implementation**: `implementation/019-slate-formatting-discord-engine-m4-implementation.md` (`Handoff-At: e58f2ed`; the stub-tree
records at record `d81cb502`).
**Blocking-condition register**: the chain's one register, in `qa/019-slate-formatting-discord-engine-qa.md`. This pass appends no
row; B-2 and B-7 are the M4 rows it leaves open for UAT.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-24T01:10 | code-reviewer-019 (message: M4 APPROVED_WITH_COMMENTS at `e58f2ed`, record `d31214e4`) | QA Phase 2 on M4 | Phase 2, step 2: the TDD compliance gate **rejected** M4: five production rows had no test-first red. No M4 suite was run for that verdict. Steering's Phase 2 brief had not arrived: this pass read the plan's R-44 to R-47 rows, the 2026-11-24T00:49Z cap and the code review's Round 4 Assumption Not Checked itself. Disclosed: the record's stamp gate refused this row's first write, which carried a typed minute; the row now carries `date -u`'s minute. Also disclosed: `plan-row-commit.js` refused the plan's R-49 and R-50 rows committed together ("a hunk other than one changelog row"). Each was then committed alone, R-49 at `6eb5b62e` and R-50 at `8e5da35a`. To hold R-50 back, its line was removed from the plan by a short Python script, not by the file-editing tools the record asks for, and then re-added with the Edit tool. Its stamp was re-taken at 01:11. |
| 2026-11-24T01:27 | implementer-019 (message: the five stub-tree records, record `d81cb502`; no production path moved) | Re-open M4 at the gate, then the pass | The gate passes on the stub-tree records (§ TDD compliance gate). Phase 2 at `e58f2ed`, in an export with its own frozen install: offline 3,454 of 3,454, exit 0; live 41 of 41, exit 0; typecheck exit 0; `next build` exit 0. QA probes: the R-44 exclusion set, found by two instruments (402 and 1, the same members); AC-4.2's link × emoji class (1,050 inputs, 0 offending, control fires). Five QA mutants, each KILLED and count-checked. **QA Complete**, milestone-scoped. QAF-37 LOW is a stated limit. Disclosed: the stamp gate refused the plan's R-51 row, which carried a typed minute (01:31). The row now carries `date -u`'s 01:29, committed at `ba9da3aa`. |

## Scope and stage start

- **Stage start.** The code review's committed Round 4 verdict, APPROVED_WITH_COMMENTS at `Reviewed-At: e58f2ed` (record
  `d31214e4`), re-derived from the record. The stub-tree records changed no website path, so the reviewed SHA is the tree here.
- **Rulings.** The cap on M4 to M6 (effort rulings block 2026-11-24T00:49Z, record `8de0ac3`): a gap below HIGH is a stated limit
  with no fix round, and a severity floor is excepted.
- **Criteria assessed, fixed before execution.** AC-4.1 to AC-4.8; M4's limbs of AC-3.1, AC-3.6, AC-3.7 (with RK-9's count) and
  AC-3.8 (ii); AC-2.5's surface limbs; AC-2.6's notice in the client chunk (owed since M2); R-44's six limits; the code review's
  owed items (`pnpm test:discord` at `e58f2ed` in an export; the self-check sweep's survivors).
- **Tree.** Website `e58f2ed`, exported with `git archive` into this session's scratchpad, with its own `pnpm install
  --frozen-lockfile --offline` (exit 0, `verification/019/qa/m4/frozen-install-e58f2ed.*`). The suite and live runs are the M3
  refresh pass's runs in an export of the same SHA (`verification/019/qa/m3-refresh/`, blob identity 654 of 654). Next's generated
  `next-env.d.ts` was copied in. The shared tree, which holds M5's uncommitted work, was not switched or written.
- **Irreversible Side-Effect Register.** M4 changes no guard of E-1 to E-9. Every change to a fetch or file-write site in
  `f4060c5..e58f2ed` (`git diff -G 'fetch\(|writeFileSync|mkdirSync'`: three test files) is an M3 fix commit (`1698c80`,
  `2c1590f`, `380e82d`, by `git log` over those paths), so this pass owes no register sweep. The effort-final mutation sweep stays
  owed, over `git diff 5ec0621..<final tip>` production paths.

## TDD compliance gate

**Passes on re-open.** Five production rows had no test-first red at the first read (§ Changelog, 01:10). Each now has a stub-tree
red and a green at `e58f2ed` (implementation document, § Stub-tree records). Read from the captures under `verification/019/impl/`:

| Row | Stub | Red (`m4-stubred-N.txt`) | Green (`m4-stubgreen-N.txt`) |
|---|---|---|---|
| 1 quote, lists, blank line | `renderNode` cases return null | `Tests 4 failed \| 20 passed (24)`, 4 AssertionErrors | `24 passed (24)` |
| 2 subtext | the subtext case returns null | `1 failed \| 23 passed (24)`, 1 AssertionError | `24 passed (24)` |
| 3 pending and rejected | `previewParser` always gives null | `1 failed \| 1 passed (2)`, 1 AssertionError | `2 passed (2)` |
| 4 the seven surfaces' wiring | `useGuildChannels` returns null | `10 failed \| 9 passed (19)`; every failure an AssertionError (`expected '#111' to be '#general'`; vitest groups the repeated error) | `19 passed (19)` |
| 5 the span edit | `Markdown.tsx` `onChange(span, text)` does not rewrite | `14 failed \| 1 passed (15)`, 14 AssertionErrors | `15 passed (15)` |

Row 3's pending case cannot go red on a bodiless stub, because its correct output is nothing. Its red is mutant M4-m2 ("pending
draws source not null", `m4-mutants-slice1.txt`, exit 1). That is the most the stub method can give for an absence, and it is
accepted. Row 5's two earlier stubs gave a TypeError, not an assertion. The implementer recorded the span-rewrite stub instead and
says so.

## Execution

| Command (in an export of `e58f2ed`) | Result | Capture |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` | **exit 0**; 212 files, 3,454 of 3,454 | `m3-refresh/suite-offline-e58f2ed.*` |
| `npx vitest run --project discord-node --project discord-dom` (network): the code review's owed item | **exit 0**; 41 of 41; `discordPreview.legacy-equality.test.tsx` 4 of 4 | `m3-refresh/discord-live-e58f2ed.*` |
| `pnpm run typecheck` (both programs) | **exit 0** | `m4/typecheck-e58f2ed.{log.txt,exit}` |
| `SKIP_ENV_VALIDATION=1 pnpm run build` | **exit 0** | `m4/build-e58f2ed.{log.txt,exit}` |
| AC-2.6 chunk read: M2's `probe-notice-in-chunks.sh` (sha256 `3312943a…02af0`, record `0b00154b`) | the edit page's manifest names `static/chunks/1x36-po9nbvc_.js`: copyright 1, permission 1. Population: 94 `.js` files under `.next/static`, 5 hold each string, as at M2 | `m4/notice-in-chunks-e58f2ed.out` |
| QA probe, R-44 (e) and (g): the exclusion set by the tests' pattern over the canonical form, and by a walk of the raw engine parse | exit 0; 2,378 inputs; **402 by the pattern and 402 by the walk, with no member in one and not the other**; the oversized timestamp is `corpus:191` by both. The walk sees every mention kind (user 134, static 283, game 74, command 66 and others), so it can see the region | `m4/qaExclusionProbe.print.test.ts` (sha256 in `qaExclusionProbe.sha256`), `qaExclusionProbe-e58f2ed.{json,log.txt,exit}` |
| QA probe, AC-4.2's class: 7 emoji (Unicode, skin tone, joiner, flag, keycap, custom, a typed `:slight_smile:`) × 6 link forms × 5 URL shapes × 5 places | exit 0; 1,050 inputs, 769 render an anchor; **0** anchors with a `:name:` short code in `href` or text that the source does not hold. Positive control on the same run: the reader flags `https://x.y/:slight_smile:` | `m4/qaLinkEmojiProbe.print.test.tsx` (sha256 in `qaLinkEmojiProbe.sha256`), `qaLinkEmojiProbe-e58f2ed.{json,log.txt,exit}` |
| QA mutants, product (`mutation-run.py`, `--dep node_modules`, `unshare -rn`, suite `src/utils/markdown src/components src/app/preview`) | control passed, 1,368 tests; **3 of 3 KILLED**, each count-checked: QA-S1 (`preview.tsx:42:walk-last:2`, the self-check survivor not re-run), QA-N1 (`Markdown.tsx` passes `channels: null`; 10 cases), QA-N2 (the span rewrite drops the character after the span; 6 cases) | `m4/qa-m4-mutants.json` (blob `0a367fb5`), `qa-m4-mutants-out/` |
| QA mutants, instrument: `collapseRepeatedStyles` collapses any nested style (QA-C1), or none (QA-C2) | **2 of 2 KILLED**, 41 tests, count-checked | `m4/qa-m4-instrument-mutants.json`, `qa-m4-instrument-mutants-out/` |
| ID-token scan, the workspace class, over the 32 test files `f4060c5..e58f2ed` adds or changes (basenames, titles, comments) | **0** hits. Positive control on the same run: 2 of 2 planted lines (`QAF-12` in a title, `CR-7` in a comment; `v2` is not a token) | `m4/id-token-scan-e58f2ed.txt` |

## Criteria

| Criterion | Class, and how it was checked | Result |
|---|---|---|
| AC-3.1 (content, agree class) | Live, `discordPreview.legacy-equality`: the DOM in the loose form, with both R-44 (f) normalisations on both sides, against legacy, for every agreeing input outside the exclusion | **Pass**, live at `e58f2ed`. The exclusion is R-44 (e)'s. A second case asserts that every left-out input really differs, so the exclusion hides no agreeing input. **Residue:** the legacy-side pattern's `game` limb has no member. The canonical form maps no legacy game-mention node (`canonicalForm.ts` has no `game` case), so inputs holding a game mention never enter the agree class; they are M3's unexamined `GAME_MENTION / content` cell (CR-5, carried) |
| AC-3.6 (content, engine tree) | Offline, `preview.dom-equals-engine-tree`, over all 2,378 inputs in twelve slices, the visible form | **Pass.** The left-out set is 402 mention inputs plus 1 timestamp, re-derived by a second instrument (above), matching R-44 (e) and (g). QAF-37 LOW: the case that states the exclusion cannot fail |
| AC-3.7 (five legacy-only surfaces, frozen residue list) | Live equality against the list, offline family check; RK-9's count | **Pass.** Live 4 of 4. The list at `e58f2ed` holds 6,142 entries: embedDescription 1,280, v2Text 1,280, fieldValue 1,289, embedTitle 1,457, embedTitleWithUrl 836, with 15 families and no repeated surface-and-input pair (read from the JSON). This equals M4's recorded count, so **RK-9's falsifier has not fired.** The stale-entry and family limbs each have a real member and a real non-member case (`residueList.check`, titles read). Families are labels (R-44 (c), SL-13) |
| AC-3.8 (ii) | Every adjustment's reached members | **No members, re-derived.** No file under `src/utils/markdown` at `e58f2ed` names an adjustment (`git ls-tree`: 0), and no commit ever added one (`git log --all --diff-filter=A -- '*adjustment*'`: 0). R-44 (d) |
| AC-4.1 | AC-3.1, AC-3.6, AC-3.7 | **Pass** |
| AC-4.2 Links | The class probe (above); the two worked examples in `preview.engine-tree-render` | **Pass** on the class. The label is the punycoded address (`https://x.xn--y-bz3s/`), which is what AN-5 observed Discord draw (analysis, AN-5 re-post). The walk is UAT's (B-2), and production is B-5 |
| AC-4.3 Timestamps | `preview.timestamp-edit`, member by member against the criterion's list | **Pass.** Members: a code span, a code block, identical duplicates (first and second), escaped, an invalid letter, inside a spoiler (first and second), inside a link label (the engine leaves it as text, so the edit goes to the next one), the bare form, the middle of three, added before, added between and after, and `localDate` after a re-render. Killed: M4-t1 to M4-t4, M4-t9 and QA-N2 |
| AC-4.4 Mentions | `preview.mention-table` (60 cells: 12 kinds × 5 list states, the no-`unknown` clause over the cells and the generator corpus); `page.channel-names`, seven surfaces with and without the provider | **Pass.** Killed: M4-n1 to M4-n14 and QA-N1. The walk is UAT's (B-7) |
| AC-4.5 | The absent export (`utils.static-pre-transform-gone`); `git grep staticParserFor` | **Pass.** At `e58f2ed` the only hits are that test's own two lines. Positive control: at `af3d95a` the grep finds `index.tsx` (4) and `utils.ts` (1). R-44 (h) |
| AC-4.6 Link schemes | Engine-level allow-list (`engine.link-schemes`), the renderer-level fixture control both ways (`preview.engine-tree-render`, named per QAF-17); the code review's 24,170 renders per surface | **Pass.** Clicking a rendered link in a real browser is not exercised, and no criterion asks for it |
| AC-4.7 Timestamp styles | `preview.timestamp-styles`, against the criterion's literals | **Pass.** All nine letters and the bare form; `R` under a fixed clock; the five fixtures (en-US UTC; New York mounted; New York before mount; en-GB; vi-VN through react-aria's locale and `LoadLocale`), each literal equal to the plan's. The test sets the zone and the locale itself. NM-45 and NM-46 are M4-t6 and M4-t5/t5b, red |
| AC-4.8 Spoiler pieces | `MarkdownSpoiler.pieces-reveal-together` | **Pass.** "Every surface": the shared reveal is `SpoilerRevealProvider`, wrapping the one `renderLosslessTree` that all six `previewParser` surfaces use (`preview.tsx`, `index.tsx`), so one site covers every surface |
| AC-2.5, surface limbs | `preview.engine-not-ready`, on the one `Markdown.tsx` every surface draws through | **Pass** for the automated limbs; B-1 is UAT's |
| AC-2.6 | The notice in the edit page's client chunk (above) | **Pass.** No M4 line touches the notice (`git diff f4060c5 e58f2ed -G 'notice\|ENGINE_NOTICE'`: 0 files), and M2's mechanism-removed control still shows the read can see the notice's absence |
| Self-check sweep | The implementer's 71 mutants at `771c64f`, 10 survivors, 9 re-run at `e58f2ed` | **Judged.** Six killed on re-run. One survivor, `preview.tsx:42:walk-last:2`, was never re-run; QA killed it (QA-S1). Three are equivalent, and I agree. `MarkdownTimestamp.tsx:45`'s two: at `af3d95a` the label already formatted `dayjs(localDate ?? date.toDate())`, so `.utc()` never reached the text (base read). `:65`'s `\|\|` to `&&`: `onChange` is wired only in the branch holding `onEdit` |

## Findings

QAF-37 LOW Phase 2
In `preview.dom-equals-engine-tree.test.tsx`, the case "leaves out only the inputs holding a command, game or static mention ...
or a timestamp beyond the safe integers" filters the inputs by `excluded()` and then asserts that each one matches the same two
patterns `excluded()` tested. It cannot fail. A wider exclusion would pass it. Adding `role` (60 inputs, by this pass's probe), for
example, still leaves at least 1,915 held inputs (1,975 less at most 60), above the `> 1900` floor. The property it names, that AC-3.6 leaves out only D-17's
source-text kinds and X-27's timestamp, is true at `e58f2ed`: this pass re-derived the set by a tree walk (402 and 1, the same
members). Remedy: assert the exclusion's membership against an independent fact, for example the walk's kinds, or the
left-out sources as a literal list. Under the cap this is a stated limit for the Planner batch, sent to `planner-019`.

## Verdict

**QA Complete**, milestone-scoped, for M4 at website `e58f2ed`. Every assessed criterion passes (§ Criteria). QAF-37 LOW is a stated
limit under the cap. The verdict binds to `e58f2ed`, and a production change to an M4 path expires it. The plan's Status is not
moved: M5 and M6 remain. Rows inherited and not discharged: B-1 to B-8 (register in `qa/019-slate-formatting-discord-engine-qa.md`).
M4's own rows, B-2 (AC-4.2) and B-7 (AC-4.4), are UAT's walks on a local production build.

## Assumption Not Checked

This pass assumes the DOM jsdom builds from the preview's React tree is the DOM Chrome builds from it, and does not test it. In
particular it assumes that whitespace, highlight.js's class output and the anchor `href` normalisation are the same in both.
`canonFromDom` reads jsdom only, so AC-3.1, AC-3.6, AC-3.7 and the link probe describe jsdom's rendering. Falsity signature: in
UAT's B-2 or B-7 walk, Chrome shows an `href`, a pill or a block that differs from what the jsdom reading predicts for the same
input. **Owner: UAT**, at the B-2 and B-7 walks.

## Handoff

- To `planner-019`: QAF-37 LOW, a stated limit for the Planner batch.
- To UAT, once the chain reaches it: B-2 and B-7 on a local production build of the tip, with the local id sequence moved first
  (workspace `CLAUDE.md`).
- Carried: the effort-final mutation sweep over `5ec0621..<final tip>` production paths. M5's pass takes the G5, W12 and W9
  survivors (M3 document), and M6's takes W8.
