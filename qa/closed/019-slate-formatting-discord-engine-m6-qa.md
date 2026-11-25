---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "48eb60a — repos=website; M6 Fix Round 6 at code review's Round 9 sub-entry Reviewed-At; git-archive exports with their own frozen offline installs, 686 of 686 blobs"
Status: Committed
Status-Detail: "Committed at website 48eb60a (devops Stage 1, 2026-11-25), awaiting release."
Phase: 2
---

# QA Report: 019 — M6, the Slate layer: round trip and input (Phase 2)

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 15 (record `79eeced6`), registrations
to R-78, milestone M6.
**Code review**: `code-review/019-slate-formatting-discord-engine-code-review.md`, § "Round 6 at `119471f` (M6)",
APPROVED_WITH_COMMENTS at `Reviewed-At: 119471f` (record `8c2a4593`).
**Implementation**: `implementation/019-slate-formatting-discord-engine-m6-implementation.md` (`Handoff-At: 119471f`).
**Blocking-condition register**: the chain's one register, in `qa/019-slate-formatting-discord-engine-qa.md`. This pass appends no
row. B-10 (AC-6.8) was minted at the Phase 1 re-key on Revision 16.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-24T06:58 | code-reviewer-019 (message: M6 APPROVED_WITH_COMMENTS at `119471f`, record `8c2a4593`) | QA Phase 2 on M6 | Phase 2, step 2: the TDD compliance gate **rejected** M6. Five new or changed production functions have a "No" under test-first and no stub-tree red and green. `parseUnit` also has a "No". No M6 suite was run for this verdict. Steering's M6 Phase 2 brief had not arrived, so this pass read the plan's D-20 to D-22, R-77 and R-78 and the code review's Round 6 itself. The export of `119471f` is installed (frozen, offline, exit 0) and kept for the pass. |
| 2026-11-24T07:57 | implementer-019 (message: stub-tree records at `78f93bdd`, no production path moved) | Re-open the gate; run Phase 2 at `119471f` | The gate passes on the stub-tree records. Offline 3,651 of 3,651, exit 0; typecheck exit 0; live 41 of 41; `test:discord` offline exits 1, loud; `next build` exit 0. M4 differential 0 of 14,280 (control 2,356); M5 differential 0 of 6,486 (control 681). Hand mutants: 13 of 15 killed, W9 and W12 survive. AC-3.3's cap is exceeded (141.9 s against 31.1 s). AC-6.8 fails here as it should. **QAF-50 MEDIUM** (a severity floor: partial mode's plain lines, unasserted). QAF-46 to QAF-49 LOW. The 451-mutant sweep was withdrawn unscored: its controls failed under load, and the effort-final sweep moves to the fix tip. Verdict **QA Failed**. |
| 2026-11-24T09:14 | planner-019 (message: CR-20 fix round hand-off, Outstanding 2; implementation record `9c6bb958`, plan R-92 at `7100aab8`) | Probe Outstanding 2 at the chain base `af3d95a` and set a severity | Not the fix-round refresh: code review's verdict on the round has not been given. Both trees throw Slate's cap error, the chain base `af3d95a` and the fix tip `42128cd` alike, on the same threshold: they settle at 122 lines and throw from 123. After the throw the document is correct. So the defect is **pre-existing**: **QAF-51 LOW**, for the planner's handoff. No browser look was taken. Captured at `verification/019/qa/m6/gt-marker-base/`. The record-write hook refused a shell heredoc for that README, so it was written with the Write tool. |
| 2026-11-24T09:32 | code-reviewer-019 (message: Round 6 sub-entry APPROVED_WITH_COMMENTS at `42128cd`, record `602344e`) | QA Phase 2 on CR-20's fix round | Phase 2: Testing In Progress at `42128cd`. Scope and criteria are recorded before execution (§ Refresh on CR-20's fix round). Steering's brief has not arrived. |
| 2026-11-24T14:35 | steering-hooks-fixer (message: stop; effort rulings block 14:33Z, record `d7eb0a40`) | Stop the M6 refresh at the next seam, end every run, record results for the next fix round | Stopped, no verdict published. Status is back to QA Failed, the verdict at `119471f`. Before the stop, criteria 1 to 6 and 8 had held at `42128cd` (§ Results at `42128cd`). The effort-final sweep was stopped partway through its second pass and is unscored. Its processes were killed and confirmed gone. Nothing of this pass is running. |
| 2026-11-25T12:37 | code-reviewer-019 (message: Round 9 sub-entry APPROVED_WITH_COMMENTS at `48eb60a`, record `2f94aff4`; plan R-131 `744b54b1`) | Phase 2 on M6 Fix Round 6 | Phase 2: Testing In Progress at `48eb60a`. The stage start is re-derived from the committed review record (`Reviewed-At: 48eb60a`). Steering's brief has not arrived, so this pass works from the plan's Decisions Register (D-27 to D-31), R-126 to R-132 and the Round 9 sub-entry's Assumption Not Checked. |
| 2026-11-25T15:48 | steering-hooks-fixer (message: the owner's waiver of the effort-final sweep, rulings block 15:46Z, record `95913e2e`) | Stop the sweep; verdict on what has run | Phase 2 verdict: **QA Complete** at `48eb60a`. The sweep is stopped and recorded as not run on the waiver; its partial pass-1 tables are not scored. Entry conditions are all met. QAF-56 MEDIUM is a stated limit. Next is UAT, with B-11 (§ Pass on Fix Round 6, Verdict). |
| 2026-11-25T17:10 | devops-019 | Document closed | Status: Committed at website `48eb60a`, awaiting release. |

## Scope and stage start

- **Stage start.** The code review's committed Round 6 verdict, APPROVED_WITH_COMMENTS at `Reviewed-At: 119471f` (record
  `8c2a4593`), re-derived from the record.
- **Rulings.** The cap on M4 to M6 (effort rulings block 2026-11-24T00:49Z): a gap below HIGH is a stated limit with no fix
  round, and a severity floor is excepted. The cap governs findings. It does not govern this gate.
- **Tree.** Website `119471f`, exported with `git archive` into this session's scratchpad (677 tracked paths). It has its own
  `pnpm install --frozen-lockfile --offline` (exit 0, `verification/019/qa/m6/install-119471f.*`) and Next's `next-env.d.ts`
  copied in. The shared tree was not switched or written.

## TDD compliance gate

**Rejected: TDD Compliance Checklist Missing or Incomplete.** The rule (implementer.md, TDD Compliance Checklist): a "No" under
"Test Written First?" is closed by an assertion-level red against a stub-tree copy whose function holds no body, then a green at
the real code, with both recorded. This is the standard M4's gate was re-opened on (M4 document, § TDD compliance gate).

To find out which functions are new in M6, I ran `git -C website grep -q <name> 2e36107 -- src` and read the exit code: 1 means the
name is absent at M5's tip. These rows are closed:
- `resolveEmoji` and `revertToText` (stub-tree, 17 of 21 and 7 of 21 failing, green 21 of 21).
- The guard-branch rows ("No: survivors") for `emojiLayout`, `liftLoaded`, `styleUnit`, `resolveCarried` and `carriesMarker`.
  Each of these functions has its own test-first row, and each later test is red under its own mutant.
- `nativeEmojiSpans`, a test helper rather than production code.

These remain open:

| Function (website `119471f`) | New at M6? | Row | What is missing |
|---|---|---|---|
| `pointAtOffset` (`withNormalizeNode.ts`) | yes (exit 1 at `2e36107`) | `resolveEmoji, revertToText, pointAtOffset, flatOffset, startsOf`: No | No stub of its own. The row says these "run inside `revertToText` and `resolveEmoji`". Stubbing a caller does not show the callee's tests fail without the callee |
| `flatOffset` (`withNormalizeNode.ts`) | yes | same row | same |
| `startsOf` (`withNormalizeNode.ts`), with `widthOf` and `sourceWidthOf` (`emojiLift.ts`) that it reads | yes | same row | same |
| `holdsSpan` (`emojiLift.ts`, exported) | yes | `liftLoaded over several runs, holdsSpan, …`: No | This is its only row. A mutant red (`\|\|` at `:92`) is recorded, but no stub-tree red |
| `emojiToImage`, the `emoji` case of `renderElementFactory` | changed: it now reads `alt`, `title`, `src` and `custom` from the new element, not `ast` | its row: No | Five mutant reds are recorded, but no stub-tree red |
| `parseUnit` (`unitParse.ts`) | the name is new; the code moved from `styleUnit` | `… parseUnit's parity`: No | Either a stub-tree red and green, or the row cites the both-trees evidence for a behaviour-preserving extraction (implementer.md, exemptions). Code review's measurement, 0 of 36,690 nodes differing over 2,659 inputs with a planted control of 24, would serve if the row cites it |

Each stub-tree record is a red at assertion level, then a green, recorded in the TDD Compliance row. Each runs in an isolated export,
as `1aaa960`'s were. The remedy is the implementer's; a waiver is the owner's to give. Records with no change to production are
not a fix round: the gate re-opens on them, and the pass runs at `119471f`.

## Gate re-opened

This section replaces the rejection pass's owed list, verdict, Assumption Not Checked and handoff. That pass's verdict was QA
Failed at the TDD gate, with the five functions above and `parseUnit`. Its changelog row (06:58) and record `a5d676e` carry it.

- **Stage start for the pass.** Implementer-019's stub-tree records (record `78f93bdd`), with no production path moved: website
  is still `119471f`. Read from `verification/019/impl/m6-stub2-119471f-*.txt`. Each stub fails at assertion level:
  `pointAtOffset` 6 of 70, `flatOffset` 7, `startsOf` 22, `widthOf` 7, `sourceWidthOf` 21, `holdsSpan` 25, `emojiToImage` 2,
  `parseUnit` 62. The unstubbed control passes 70 of 70. `parseUnit`'s row also cites code review's both-trees measurement.
  **The gate passes.**
- **The rejection pass's Assumption Not Checked, discharged.** Every cited red capture (`m6-red-1.txt` to `m6-red-8.txt`) was
  read. Each shows failures:
  - assertion-level everywhere except `m6-red-2`, which is the module-not-found red in its file's first row, and `m6-red-3`,
    which is the signature TypeError its row names.
  - Two "green" files show failures, `m6-green-1b` (4 failed) and `m6-green-3` (2 failed). They are intermediate runs, and no
    row cites either.

## Scope

- **Criteria assessed, fixed before execution.** AC-6.1, AC-6.1b, AC-6.2, AC-6.5, AC-6.6 and AC-6.7 at Revision 15. Also
  AC-3.3's limbs at M6, its 60 s cap included. AC-6.8 arrived with Revision 16, after the list was fixed (growth, routed on the
  Reading Order). It is assessed here only as its "Seen red" at `119471f`.
- **Also assessed:** the M5 document's owed items (m5-d2 at `runUnit.ts`, NM-68 and NM-69 on QAF-42's forms, SL-17, R-74's ids,
  Outstanding 4, W8, W9, W12, CR-7's exit check), the M4 and M5 differentials, and the Irreversible Side-Effect Register guards
  M6 changed. AC-6.3 is UAT's (B-4), and AC-6.4 is an optional owner observation (handoff `5b19c3e4` item 2). M6 makes no edit
  of `setOnInsert`.
- **Not the effort's last Phase 2 verdict.** Steering's block 07:05Z (D-23) puts CR-20's fix round after this pass, so the
  effort-final mutation sweep over `git diff 5ec0621..<final tip>` production paths is owed at that round's tip. That puts this
  pass under the earlier-milestone rule: it sweeps only the register guards M6 changed (below).
  - A 451-mutant sweep (`effort-sweep-mutants-5ec0621-119471f.json`, mutant-gen over the range, plus QA's 15) was started and is
    **withdrawn, never scored**. Every shard's control failed (`sweep-pass1-shard-*`): its `--exclude` flags did not take effect
    under the config's projects, and the smoke control also ran 3,651 cases. Under five parallel runs, the typed-generated file
    passed its 300 s timeout, and its still-running drive broke the next case.
  - The mutant set and its hash stay in `sweep-inputs.sha256` for the effort-final sweep.
- **Trees.** Website `119471f` and `2e36107`, each a `git archive` export with its own `pnpm install --frozen-lockfile
  --offline` (exit 0). Blob identity: 677 of 677 and 668 of 668 (`blob-identity-*.txt`). Probes ran in a third export of
  `119471f` with `node_modules` linked, and each planted file was restored to its blob (`*-restore.txt`). The shared tree was not
  switched or written. Captures are under `verification/019/qa/m6/`.

## Execution

| Command (exports as above) | Result | Capture |
|---|---|---|
| `unshare -rn` (lo up) `npx vitest run --project node --project dom --reporter=json` | **exit 0**; 234 files, 3,651 of 3,651; 0 files under `__tests__/discord/`. With the 6 live files and 41 cases that is the implementer's 3,692 over 240 | `suite-offline-119471f.*` |
| `unshare -rn` `pnpm run typecheck` | **exit 0** | `typecheck-119471f.*` |
| live `npx vitest run --project discord-node --project discord-dom` | **exit 0**; 6 files, 41 of 41 | `discord-live-119471f.*` |
| `unshare -rn` `pnpm test:discord`, whole | **exit 1**; `https://discord.com/app` on 6 lines; `grep -c -E '[0-9]+ passed'`: 0 (AC-3.5's loud failure) | `discord-offline-119471f.*` |
| `SKIP_ENV_VALIDATION=1 pnpm run build`, with the network | **exit 0** | `build-119471f.*` |
| AC-3.3's cap: both whole offline suites run back to back, `/usr/bin/time` | `2e36107` **70.6 s** wall, 3,280 of 3,280, exit 0. `119471f` **141.9 s**, 3,651 of 3,651, exit 0. The typed-generated file takes 41.4 s and 137.8 s. The chain base `af3d95a` took 31.1 s (Phase 1 capture) | `suite-timing-*`, `suite-timing.load.txt` |
| Keystroke cost at the field limits, both trees (P-Q22) | 1,999 content characters as 1,000 lines: **2.3 ms** at `2e36107`, **433 ms** at `119471f`. 4,095 description characters as 2,048 lines: **3.8 ms**, **1,798 ms** | `normalize-cost-limits-*.json` |
| AC-6.8's "Seen red" at the tip (P-Q23 to P-Q25): `qaMergeDirties.probe.test.ts`, with a `vi.mock` pass-through of `../runUnit` | The count grows with the line count: one-line control 2, 5 lines 6, fenced-quote texts 201 and 2,049 | `merge-dirties-119471f.json` |
| **M4 differential**: `qaPreviewDump.probe.test.tsx` (the M5 file, sha256 in `preview-dump-probe.sha256`), 6 surfaces × 2,380 rows | **0 of 14,280 rows differ.** 14,274 non-empty at each tree, and the keys are identical. Control, same instrument: the bold arm planted as `<b>` at `119471f` moves **2,356** | `preview-dump-*` |
| **M5 differential**, a second instrument beside code review's module swap (record `8c2a4593`: 0 of 36,690 nodes): each tree's own `getInitialValue` and `decorator`, 6 surfaces × 2,378 inputs (`qaDecoratorDump.{base,tip}.probe.test.ts`) | **0 of 6,486** element-free surface-and-input rows differ (9,969 text nodes). Controls: m5-d2 planted moves 0, because this input set holds no member of the quote-prefix class (x8 sits in `NATIVE_BOX_FROZEN`, which code review's set has and this one lacks). `strongText` planted as `bText` moves **681**. So the zero is measured on element-free inputs, and the quote-prefix class rests on code review's instrument and on m5-d2 below | `decorator-dump-*` |
| Register guards and named mutants: QA's 15 (`qa-hand-mutants-119471f.json`), `mutation-run.py` (blob `b26916e7`) through `sweep-driver.sh whole`, `unshare -rn`, the whole offline suite, 2 shards | **13 of 15 KILLED**, both controls 3,651 of 3,651, exit 0. Survivors: W9 and W12 (below) | `hand-pass-shard-{1,2}/`, mutant blobs `86bff1dc`, `e07e2b10` |
| Fence-parity inputs (Outstanding 4): `qaFenceParity.probe.test.ts` | 52 of 3,040 inputs per surface are left out by `hasCleanFences`. The lift differs from the frozen engine spans on 7, 7, 7, 3, 11 and 7 of them (content, embedDescription, fieldValue, embedTitle, embedTitleWithUrl, v2Text), which reproduces the implementer's count. Every difference is "engine only", and most sit on a line the Slate layer types `div`, not `codeBlock` (QAF-48) | `fence-parity-119471f.json` |
| `🫩` (AC-6.2's newer emoji), `qaNewerEmoji.probe.test.ts` | Helper and lift agree: `[[0,2]]`, `[[1,3]]` in `a🫩b`, `[[2,4]]` in bold. It is absent from AC-6.5's hand control (QAF-46) | `newer-emoji-119471f.json` |
| W12's effect, `qaPartialQuote.probe.test.ts` | Shipped: typing `> a` in an embed-title editor leaves a `div`, saved `> a`. With W12: a `blockQuote` with prefix `> `, saved `> a` (QAF-50) | `partial-quote-*.json` |
| Reads: CR-7's exit check, AC-6.6, AC-6.1b | `git grep -c "BASE_RED\|holdsEmoji" 119471f -- src`: no output, exit 1 (control at `f4060c5`: 14 lines over 5 files). `simple-markdown` is named only by its own absence test; the patch, workspace file and ambient types are absent (exit 128 at the tip, 0 at `2e36107`); the lockfile lost 15 lines and gained 0. Four `saveMessage(` sites and five `api.message.upsert` writers, identical at `5ec0621` and `119471f`, all user acts | `reads-119471f.txt` |
| Test audit over the 37 test files `2e36107..119471f` adds or changes | ID-token scan: 0 hits, control 3 of 3. Positive name form: all conform. No time-based cell. One hand-rolled renderer (QAF-47). The absence test reads `package.json` and `pnpm-workspace.yaml`, a manifest rather than a module's text, and its import scan is the module-graph instrument AC-6.6 names | `id-token-scan-119471f.txt`, `test-audit-119471f.txt` |

### The 15 named and guard mutants

The mutants are listed by row, with the cases that killed each read from the kill tables:

| Mutant | Guard or criterion | Outcome |
|---|---|---|
| `qa-m5-d2-runUnit-no-quote-prefix` | M5 D-15, at `runUnit.ts` | **KILLED** by `decorator.native-box-classes` alone. That closes the M5 document's Assumption Not Checked |
| `qa-NM-68-carry-ignores-multiline-quote` | AC-6.7 | **KILLED**: the Enter row "at the end of a quote line inside a multi-line quote", the typed-block drive, the typed-generated drive |
| `qa-NM-69-carry-ignores-unquoted-fence` | AC-6.7 | **KILLED**: two Enter rows (fence opened on a plain line), the typed-block and typed-generated drives |
| `qa-carry-on-paste` | AC-6.7, paste column | **KILLED**, 12 cases including the pasted limb |
| `qa-carry-never-fires` | AC-6.7, Enter column | **KILLED**, 10 Enter rows |
| `qa-typed-marker-not-taken-in` | AC-6.7, typing column | **KILLED**, 9 cases |
| `qa-S29-prefix-not-kept` | AC-6.1, S-29 (E-2) | **KILLED**, 4 cases of `quote-and-fence-lines-settle` |
| `qa-E2-save-writes-alt`, `-writes-title`, `-drops-element` | E-2 / AC-6.2: `flattenNodeText`'s element branch | **KILLED**, 124, 185 and 185 cases, the 23 forms among them |
| `qa-E2-quote-prefix-default` | E-2: a quote line saves its own prefix | **KILLED**, 45 cases |
| `qa-W8-trailing-empty-span-kept` | M3's W8 | **KILLED**, by the pasted limb, now that the hold-outs are gone |
| `qa-NM-44-helper-ignores-mask` | AC-6.5's mask control | **KILLED**, 8 in `discordOracle.emoji-spans` and 2 in `discordEmojiSpans.frozen-literals` |
| `qa-W9-smart-quote-swap` | M3's W9 | **SURVIVED**. The repair is untested anywhere, and M6 changes none of its lines (QAF-49) |
| `qa-W12-partial-runs-block-normalise` | partial mode, AC-6.7 "M6 does not change it" | **SURVIVED** (QAF-50) |

`flattenNodeText`'s `allowEmoji` gate was not mutated. It is called with `false` only inside the smart-quote repair, which is
W9's untested surface.

## Criteria

| Criterion | How it was checked | Result |
|---|---|---|
| AC-6.1 (AC-3.3 over its classes; S-29; S-17) | `quote-and-fence-lines-settle` 47 of 47 (the 15,480-edit differential with no hold-out list), the typed, pasted and generated limbs, `opening-writes-stored-text` 11 of 11; S-29's guard is killed | **Pass** on text. AC-3.3's 60 s cap: **Fail**, below |
| AC-3.3's cap | `pnpm test`'s added wall time stays under 60 s | **Fail at `119471f`**: 141.9 s against 31.1 s at the chain base, about 111 s added (70.6 s at M5, about 40 s added). The typed-generated file accounts for 137.8 s, the per-line rebuild CR-20 names. Re-measured on the fix round. The planner's rule then applies if it still misses (the generator count drops to fit) |
| AC-6.1b | the read above | **Pass** |
| AC-6.2 | 23 forms × opened, typed and pasted × 2 modes, 135 of 135; every listed form has a member; the E-2 mutants are killed | **Pass**. Copy: `onCopy.cut` copies `flattenNodeText`, the saved path, so the copy limb rides on the save kills. Its fixture sets `alt` equal to `source`, so the copy test alone cannot tell them apart |
| AC-6.5 loaded text | `getInitialValue.emoji-spans-equal-the-engines`, 2,988 of 3,040 per surface | **Pass** on the compared inputs. The 52 left out are QAF-48 |
| AC-6.5 typed edits | `withNormalizeNode.emoji-set-equals-the-engines`, 8 of 8, 14.8 s | **Pass** |
| AC-6.5 hand control | `discordOracle.emoji-spans`, 113 of 113, NM-44 killed | **Pass**, less `🫩` (QAF-46). **SL-17:** `\*a😄` and `a\_b😄` are reddened by the implementer's `helper-offsets-in-unescaped-text` (read in `m6-mut-3493290-helper-offsets-in-unescaped-text.txt`: 7 cases, both among them). **QAF-40's join:** the helper takes spans from `parseLossless`, so no join exists. The named mutant reddens only `😄😄` (read). `😄:smile:` and `:smile:😄` are held by their literals alone |
| AC-6.6 | the reads above; `simpleMarkdown.absent-from-product` 3 of 3; frozen offline install exit 0 | **Pass** |
| AC-6.7 | `withNormalizeNode.quote-continues-on-enter`, 28 of 28; the six AC-6.7 mutants are killed | **Pass** on full mode. **QAF-42 closed**: NM-68 and NM-69 are red on Enter rows at the governed line, and on the typed drives. "Partial mode … M6 does not change it": QAF-50 |
| AC-6.8 (Revision 16, growth) | "Seen red" only | **Fails at `119471f`**, as its revision states: the counts grow with size (P-Q23 to P-Q25), and the 2,048-line description takes 1,798 ms against 16 ms. CR-20's fix round is owed (D-23) |
| R-74 | `decorator.preview-equals` names `link:61`, `gen:870` and `gen:1677` as `BOX_READS_ELEMENT_AS_QUESTION_MARK`, and asserts the named list exactly, with 2,200 compared or more | **Pass** |
| CR-7's exit check | the read above | **Pass** |
| CR-21 | `git grep -q emoji-regex 119471f -- src`: exit 1 (no importer); exit 0 at `2e36107` | Agreed, LOW; a stated limit (R-78) |
| M4 and M5 surfaces | the two differentials | **Zero movement**, so M4's and M5's verdicts re-anchor at `119471f` on the surfaces the dumps cover |
| E-5 (drafts) | `MessageDraft` is `{ data: EditableMessageData, … }` (`src/@types/global.d.ts`), so drafts hold the message's text fields, never Slate nodes | The element's new shape does not reach a stored draft |

## Findings

QAF-46 LOW Phase 2
AC-6.5's hand-written control names "every AC-6.2 emoji form on its own". AC-6.2 lists "an emoji newer than the site's table",
and `discordOracle.emoji-spans` has no member for it: `🫩` appears only in `SlateEditor.emoji-forms-reach-the-message`, which
reads the saved text, not the spans. The behaviour holds (P: helper and lift both `[[0,2]]`), but nothing would fail if the
helper or the lift dropped a newer emoji. Property wanted: `['an emoji newer than the site\'s table', '🫩', 2]` in `ALONE`. A
stated limit under the cap.

QAF-47 LOW Phase 2
`src/utils/markdown/__tests__/preview.fenced-code-block-draw.test.ts` (renamed at `4897f1c` from
`rules.multi-line-code-block.test.ts`, which already did this) defines `render()` with `renderToStaticMarkup`. It does not use
the project's DOM harness. That is the Test Conventions' "Hand-rolled renderer" class, whose disposition is "convert to the DOM
harness", left standing on a surface M6 touched. A stated limit under the cap.

QAF-48 LOW Phase 2
AC-6.5's loaded-text property leaves out 52 inputs per surface by `hasCleanFences`. The implementer cites X-19 for that, and
X-19 covers only "the native box's unclosed-fence-while-typing parse, where the Slate layer's `codeBlock` recognition governs
instead". On 3 to 11 inputs per surface the lift drops an emoji the engine lifts. In most of those cases the Slate layer types
the line `div`, so its code recognition is not what governs (for example `gen:469`, `  - ```🙂 https://x.y…`). The run
unit's fence-framed parse decides. In the editor the emoji shows as its text, and the preview shows it as an image. The saved
text is unchanged. So the exclusion is wider than its stated limit. Property wanted: either X-19's row names this class (a
fence opened mid-line, or unclosed, in the run unit's parse), or the lift and the engine agree on it. A stated limit under the
cap.

QAF-49 LOW Phase 2 (pre-existing)
`withNormalizeNode.ts` `handleElement`'s smart-quote repair (U+2018, U+2019, U+201C, U+201D replaced by `'` and `"`) has no
test. W9, which swaps the two replacements, survives the whole suite, as it did at M3 (`2c1590f`). M6 changes none of its lines
(`git diff -U0 2e36107..119471f` over the file). Property wanted: typing each of the four code points saves its ASCII
replacement, as literals. Routed to the Planner batch.

QAF-50 MEDIUM Phase 2 (a severity floor, excepted from the cap)
AC-6.7 says of the single-line editor: "Partial mode is outside the table, and M6 does not change it". So a partial-mode line
stays a plain line, whatever its text, is a behaviour M6 claims to preserve. M6 edited the gate that holds it
(`if (!partialMarkdown) return handleEditor(…, surface)`), and no assertion fails when it is lost. W12 removes the gate and
survives the whole suite. P (`partial-quote-*.json`): typing `> a` into an embed-title editor gives a `div` on the shipped code
and a `blockQuote` under W12, which the title editor would draw as a quote. The saved text is `> a` either way, which is why the
text properties cannot see it. The gap is pre-existing (W12 survived at M3), but the floor turns on the claim, not on the
gap's age. Remedy, for the fix round: a spec-form case that types `> a` into a single-line editor and asserts the line's type
is `div`, recorded red under W12.

QAF-51 LOW Phase 2 (pre-existing)
Typing `>` at the start of `>> a` turns it into `>>> a`, which retypes every line below it. On a message of 123 lines or more,
that keystroke throws Slate's "Could not completely normalize the editor after 126 iterations". Measured at the chain base
`af3d95a` (built the way the base's `SlateEditor/index.tsx` builds it, which covers both content and embed description) and at
the fix tip `42128cd` (`editorHolding` on `content` and `embedDescription`). Both trees settle at 122 lines and throw from 123,
which also covers 200, 1,000 and 2,048. A positive control on the same run shows the probe sees the cap. After the throw, the
model on both trees is in its intended end state: every line is `blockQuote`, the text is intact and the caret is after the
`>`. So the saved text is not harmed. The chain neither introduced the defect nor moved its threshold.
(`verification/019/qa/m6/gt-marker-base/`: probes, outputs and README.) The severity rests on the model state. This record
assumes, and does not test, that slate-react in a browser shows the user nothing worse than a console error, with the editor
still usable after the throw. The falsity signature: in the browser, the editor stops taking input, or the page's error
boundary replaces it, after `>` is typed on a 123-line message. That would raise the severity. **Owner: QA**, as a single
browser look at Phase 2 on the fix round, against the build that pass runs. Property wanted (for the handoff, not this chain):
the keystroke settles at any message length, or it degrades without throwing. Routed to planner-019, which carries it by a
handoff.

## Verdict

**QA Failed**, milestone-scoped, for M6 at website `119471f`:
- on AC-6.8, which fails here as its revision expects, so CR-20's fix round is owed (D-23);
- on AC-3.3's 60 s cap;
- on QAF-50, a severity floor.

AC-6.1, AC-6.1b, AC-6.2, AC-6.5, AC-6.6 and AC-6.7 pass on full mode, with QAF-46 to QAF-49 as stated limits. M4's and M5's
verdicts re-anchor at `119471f` on the surfaces the two dumps cover. QAF-42 is closed.

The fix round's refresh covers:
- the round's diff;
- AC-6.8's two limbs, with the time limb's load recorded;
- AC-3.3's cap, re-timed back to back;
- QAF-50's new case, red under W12;
- NM-70 to NM-72, with NM-72 expected to survive;
- SL-23's left-out keystrokes and SL-24's growth-probe line;
- the effort-final sweep over `5ec0621..<fix tip>`, run with explicit file filters rather than `--exclude`, and at most two
  shards.

The plan's Status is not moved. Rows inherited and not discharged: B-1 to B-10.

## Assumption Not Checked

This pass assumes that `vitest`'s typed-generated drive, run alone, completes within its 300 s case timeout on the fixed tree.
It does not test that. It saw the drive overrun only under five-way load, at `119471f`. Falsity signature: in the fix round's
refresh, the typed-generated file times out or reports extra writes in its single-line case while nothing else runs. That
would mean the drive leaks its typing loop past a timeout into the next case, which is a test-isolation defect. **Owner: QA**,
at the fix round's refresh, which runs that file alone once before the suite.

## Handoff

- To `implementer-019`, for CR-20's fix round: QAF-50's case (a severity floor). AC-6.8 and AC-3.3's cap are re-measured on the
  fix.
- To `planner-019`: QAF-46, QAF-47, QAF-48 and QAF-49 for the Planner batch, all stated limits under the cap. QAF-42 is closed.
- Then code review's sub-entry, and QA's refresh over the round's diff, with the effort-final sweep.

## Refresh on CR-20's fix round at `42128cd`

### Stage start and scope

- **Stage start**: code review's Round 6 sub-entry, **APPROVED_WITH_COMMENTS** at `Reviewed-At: 42128cd` (record `602344e`,
  re-derived with `git show 602344e:code-review/…`). Plan Revision 20, registrations to R-95 (record `524ee859`): the delta since
  R-89 is registrations only, and no criterion moved. Steering's brief for this pass has not arrived. I read the Decisions
  Register rows R-91, R-92 and R-95 and code review's Assumption Not Checked myself.
- **The round's diff**: `119471f..42128cd`, whose tree is `10abfa9`'s. The only production path is
  `src/components/SlateEditor/utils/withNormalizeNode.ts`. The 8 test paths are the count test, `keystrokes.ts`, the bench,
  `roundTripInputs.ts`, the typed-generated and pasted files, `quote-and-fence-lines-settle` and `discordOracle.emoji-spans`
  (`git diff --name-only 119471f 42128cd`). The M4 dump surface (`qaPreviewDump`: preview rules) and the M5 dump surface
  (`decorator.tsx`, `getInitialValue`) are not among them, so neither differential is owed.

### Criteria this pass assesses (recorded before execution)

1. AC-6.8's count limb: its size equality per text, kind and place, the floor, the positive control, and seen red at `119471f`.
2. AC-6.8's timed limb: the bench's medians against 16 ms with the box load beside them. CR-22 is the reading: exit 124 from
   `withNormalizeNode.keystroke-time.bench.ts` is the limb's red.
3. AC-3.3's 60 s cap: both whole offline suites run back to back (`2e36107`, then `42128cd`), against `af3d95a`'s 31.1 s plus 60 s.
   The full 1,000 generator inputs run once through `MOUNTED_GENERATOR_COUNT=1000`, with the exit code (R-92).
4. QAF-50 is closed by a case that goes red under W12. QAF-46 is closed by `🫩` going red under a mutation.
5. M6's earlier criteria at the new tree: AC-6.1, AC-6.1b, AC-6.2, AC-6.5, AC-6.6 and AC-6.7, by the whole offline suite,
   typecheck, live, `test:discord` offline and `next build`.
6. NM-70 to NM-72, SL-23's left-out keystrokes and SL-24's growth line.
7. The effort-final sweep over the production paths of `5ec0621..42128cd`.
8. QAF-51's browser look.

Residue, not a criterion: Outstanding 1, widened at R-95 to any keystroke in an input with unclean fences, is in QAF-48's class.
CR-23 (the fence-close cost) is with steering for the owner's word, and no AC-6.8 limb covers it.

### Results at `42128cd` (stopped, unpublished: carried to the next fix round)

Steering stopped this pass (effort rulings block 14:33Z, record `d7eb0a40`). The owner selected a fix inside 019, before release,
for the code-fence normalise throw in QAF-51's form and for CR-23. That round changes production code, so no verdict is taken at
`42128cd`. What was measured stands as evidence about `42128cd`, not as a verdict. The next refresh re-runs whatever the round's
diff touches.

Trees: website `42128cd` and `2e36107` in `git archive` exports with frozen offline installs. Blob identity was 680 of 680
before the suite runs (`fix/blob-identity-42128cd.txt`) and 668 of 668. `119471f` was 677 of 677, and its red runs used a copy
carrying the fix round's count test and helper. Captures are in `verification/019/qa/m6/fix/`. The shared tree was not
switched or written.

| Criterion | Command | Result | Capture |
|---|---|---|---|
| 3 (assumption check) | typed-generated file alone, `unshare -rn`, `--project dom` | 2 of 2, exit 0, 33.8 s: the previous pass's Assumption Not Checked holds | `typedgen-alone-42128cd.*` |
| 3, AC-3.3's cap | both whole offline suites back to back, `/usr/bin/time` | `2e36107`: 50.2 s, 3,280 of 3,280, exit 0. `42128cd`: **64.0 s**, 3,715 of 3,715, 235 files, exit 0, against the 91.1 s line (`af3d95a` 31.1 s plus 60 s). Load 0.7 at the start, 10.5 at the end, self-made | `suite-timing-*` |
| 3, the full count (R-92) | `MOUNTED_GENERATOR_COUNT=1000`, typed and pasted files | 17 of 17, exit 0, 90.3 s; the four generator titles read "the first 1000 generator inputs" | `full-count-42128cd.*` |
| 1, count limb | in the whole suite: `keystroke-run-unit-builds` 54 of 54 | Seen red at `119471f`: **52 of 54 failed** by assertion (`expected 2049 to be 201`, `expected 2051 to be 203`). Passing at `119471f`: the positive control and the floor | `count-red-119471f.*` |
| 1, the named member and SL-23 | `qaCountClass.probe` | AC-6.8's two-unit Enter (`a⏎```⏎xy⏎```⏎b`, Enter after `x`, at the same block index) builds **2** at 5, 250 and 2,560 lines, with the line alone at each. Of 120 cells (text, size, line, kind and place), 0 are left out by `leavesOtherLinesAlone`. Its control, a Backspace that opens a fence's lines, reads not alone | `count-class-42128cd.*`, `qaCountClass.probe.test.tsx.txt` |
| 2, time limb | `vitest bench --run --project dom` on the bench, load 2.7 | exit 0. Every median is at most **9.9 ms** (`a🙂`, 1,000 lines). Plain: 1.3, 1.4, 3.2 and 5.9 ms at 200, 400, 1,000 and 2,048 lines. Quote: 1.1, 1.4, 3.0 and 6.3 ms. `>>>`: 1.0, 1.3, 2.7 and 5.6 ms. Fenced blocks: 2.2 ms | `bench-42128cd.*` |
| 2, its red (CR-22) | `FRAME_MS` planted at 0.001, `-t "plain lines, 400"`, a 150 s cap | **exit 124** after printing a 2.3 ms median, user time 0.00 s. Per CR-22, exit 124 from this file is the limb's red. Restored byte-equal | `bench-planted-0.001-42128cd.*` |
| 4, QAF-50 | W12 (the `if (!partialMarkdown)` guard removed) on `quote-and-fence-lines-settle` | **2 of 49 failed**: `keeps "> a" a plain line while it is typed` and the `>>> a` form. Restored byte-equal | `w12-42128cd.*`, `mutant-restore.txt` |
| 4, QAF-46 | the oracle helper drops spans from U+1FA70 up | **2 of 121 failed**: `🫩` alone and inside bold. Restored byte-equal | `newer-emoji-oracle-mutant-42128cd.*` |
| 5 | `pnpm run typecheck`; live discord; `pnpm test:discord` offline; `next build` | Typecheck exit 0. The first run, exit 2, was on my own probe file, removed before the rerun (`typecheck-42128cd-with-qa-probe.*`). Live 41 of 41, 6 files. Offline exit 1, `https://discord.com/app` on 6 lines, 0 "N passed" lines. Build exit 0 | `typecheck-*`, `discord-*`, `build-42128cd.*` |
| 6 | NM-70 to NM-72 | NM-71 is the reviewer's `cr-loop-back` and the implementer's `hand:loop-back`: killed by the count test (CR sub-entry). NM-70 is not placeable: this fix builds no cache (`git diff 119471f 42128cd -- withNormalizeNode.ts` adds no map or cache). NM-72 is not placeable: each changed line gets its own `resolveEmoji`. SL-24's growth line is in the describe name "2,048 lines is past the field limit, used for growth only" | the count test, read |
| 8, QAF-51's browser look | `fix/browser/gt-caret-walk.js`, two `next start` builds, the local database (`uat-local-stack.sh`; ids from 900000000000001; no save) | At `42128cd`, in the message content editor, the throw fired on the 123-line runs. The editor stayed mounted and kept taking input, so QAF-51 stays LOW. Not settled: in 2 of 4 throwing runs, the next character landed at line 122 while the visible caret read line 0 offset 1. The instrument's Control+Home also misplaced the caret on some runs that did not throw. The base half is invalid, because Enter did not split lines there. Recorded in the handoff (`slate-quote-marker-normalize-iteration-cap-2026-11-24.md`, 10:00) | `fix/browser/*` |

**7, the effort-final sweep: stopped, unscored.** Mutants: `mutant-gen.js --range 5ec0621..42128cd` gives 433 over 24
production files, 0 dropped (`effort-sweep-mutants-5ec0621-42128cd.json`). To those I added QA's 15 (each exact-once at
`42128cd`), code review's 2 and the implementer's `code-line-shares`, for 451 in all (`sweep/all-mutants.json`, sha256
`1fb80209…`). They are grouped by file into 2 shards (`sweep/plan.tsv`). Driver: `sweep/sweep-driver.sh`. Runner:
`mutation-run.py`, network-isolated, at most 900 s per run.
- **Pass 1** used `vitest related --run <file>`, the test files that import the mutated file. I checked first that it collects
  the right files under this config: 38 files for `withNormalizeNode.ts`, including the count test, `quote-and-fence-lines-settle`,
  typed-generated and `emoji-set-equals` (`related-probe-*`). All 25 group controls passed. **402 KILLED, 48 SURVIVED, 1
  ABORTED** of 451 mutants, from the 25 tables under `sweep/pass1-shard-*`. Survivors by file: `withNormalizeNode.ts` 17 (and
  1 aborted, `cr-rebuild-per-shared-line`), `preview.tsx` 9, `emojiLift.ts` 7, `unitStyles.ts` 5, `MarkdownTimestamp.tsx` 3,
  `engine.ts` 2, and 1 each in `Desktop.tsx`, `MarkdownSpoiler.tsx`, `decorator.tsx`, `onKeyDown.ts` and
  `MarkdownCodeBlock.tsx`.
- **Pass 2** re-ran the 49 against the whole offline suite. Its control passed 3,715 of 3,715. It was **killed at the stop**
  after 40 of the 49: **0 killed, 39 survived, 1 aborted** (`sweep/pass2-shard-*.log.txt`; the runner writes no table for an
  interrupted run). Not run: `unitStyles.ts:107` (two forms), `MarkdownSpoiler.tsx:30`, `engine.ts:129` (walk-first and
  walk-last), `Desktop.tsx:25`, `MarkdownTimestamp.tsx:45:not`, `MarkdownTimestamp.tsx:65` and `MarkdownCodeBlock.tsx:8`.
- **Not dispositioned.** Every survivor is judged at the next refresh, against that round's tree. A judgement at `42128cd` would
  be spent on code the round may rewrite: 15 of the 39 whole-suite survivors are in `withNormalizeNode.ts`. Two are already
  dispositioned elsewhere: W9 (QAF-49) and `code-line-shares` (accepted as equivalent in the CR sub-entry). The others are in
  `preview.tsx`, `emojiLift.ts`, `unitStyles.ts`, `decorator.tsx`, `onKeyDown.ts` and `MarkdownTimestamp.tsx`.
- **For the next refresh:** the 9 mutants not run, and the 39 whole-suite survivors and the aborted one, re-checked for
  exact-once at the new tip. Each survivor is dispositioned. Any production file the round changes is swept again in whole
  over its added lines. The pass-1 kills stand for files the round leaves byte-identical, with `git diff --quiet` per file as
  the evidence.
- Captures: each run's stdout, the tables, the logs and the progress files. The 526 per-run stderr files (65 MB, mostly
  jsdom's "Not implemented: navigation" noise) are in `sweep/run-stderr.tar.gz`, whose listing equals the file list. The
  tables' stderr paths resolve inside that archive.

**Findings at `42128cd`.** No new QAF. The unsettled caret placement after QAF-51's throw is recorded in its handoff, which
the fix round now discharges. Its test should assert where the next character lands after the keystroke, as well as the
absence of the throw.

## Pass on Fix Round 6 at `48eb60a`

### Stage start and tree

- **Stage start.** Code review's committed Round 9 sub-entry, APPROVED_WITH_COMMENTS at `Reviewed-At: 48eb60a` (record
  `2f94aff4`), re-derived from the record; plan R-131 (`744b54b1`). The plan is at Revision 25 with registrations to R-133. Its
  delta since this document last read it is registrations only (R-126 to R-133), and none of them moves a criterion.
- **Tree.** Website `48eb60a` (the chain branch's head), exported with `git archive` into this session's scratchpad: 686 of
  686 tracked blobs equal (`verification/019/qa/m6/fr6/blob-identity-48eb60a.txt`). It has its own frozen, offline install
  (exit 0, `install-48eb60a.*`), with `next-env.d.ts` copied in. The control trees use the same method: `40947a6`,
  `a7ad3f2`, `af3d95a` and `5ec0621` (`blob-identity-controls.txt`, `install-<sha>.exit`, all 0). The pass-through tree `x48n`
  is `48eb60a` with the `getDirtyPaths` override made a pass-through (`mutant-no-suppression-48eb60a.diff.txt`, read back from
  the export). The shared tree was neither switched nor written.

### TDD compliance gate (Fix Rounds 1 to 6)

**Passes.** A helper enumerated the new and changed production functions of each round's diff and matched each to its round's
table (`verification/019/qa/m6/fr6/tdd-audit-fr1-fr6.md`). I re-derived each flagged function's newness myself: `git grep -q
-w` exit codes at the round's base, at the round and at `48eb60a`. Then I read each row. The rule is for new functions and
classes. Changed functions with no row of their own (`handleEditor` in Fix Rounds 1 and 2, and `liftLoaded`'s `only` and
`emojiLayout`'s sort in Fix Round 4) are not gate items; their coverage is the sweep's to judge. Each flagged new function is
dispositioned below:

| Function (new in) | Disposition |
|---|---|
| `settleLine` (FR3) | Covered by a test-first row: FR3 row 1, `resolveEmoji` once per call. It is red at `85ece66` by assertion (`expected 999494 to be less than or equal to 398940`), and `settleLine` is the code that turned it green. The row does not name the function. The red is not a caller's stub (the 119471f gate's case); the test came first |
| `sameType` (FR4) | The same: FR4 row 1 (`rebuildLines`), test-first, red at `2b82972` by assertion (`expected 4987 to be less than or equal to 2014`) |
| `buildLines` (FR4) | An extraction claimed to keep behaviour. The claim is established by executing both trees: code review's load differential runs `getInitialValue` over 3,287 texts × 2 surfaces × partial mode at `2b82972` and `a7ad3f2`, and 0 of 13,148 differ (`verification/019/code-review/m6fix4-a7ad3f2/load-differential.out.txt`) |
| `firstStartingFrom` (FR4) | Inside the `holdsSpan` / `spansInLine` refactor row. Its exemption evidence is executed on both trees: the new cases pass at `2b82972`'s code, and the paste, fixed-point and settle outputs are byte-identical across the change |
| `ownLines` (FR4) | Written after the first sweep's survivors, and red against `ownLines`' own mutants in the increment sweep. That is the standard the 119471f gate closed guard-branch rows on |
| `holdsBadCodepoint` (FR4) | Absent at `48eb60a` (`git grep` exit 1), so it owes no row on this tree |
| `emojiAgrees` (FR5) | A refactor with both-trees evidence: four corpora byte-identical (`cmp`) between `70c5a86` and `ded68fc`, and the class probe identical |
| `linesOf`'s top-level `split_node`, `merge_node`, `remove_node` and `insert_node` branches (FR6) | `linesOf` itself is not new (present at `40947a6`). The branches are behaviour changes. FR6 row 1 is test-first and red at `40947a6` by assertion. Its whole-line rows (`e2b5a15`) were written after, and their red is mutant reds of the branch |
| `linesOf`'s `move_node` branch (FR6) | No test. The branch is CR-31's stated limit (plan R-132, R-133). An untested branch is a sweep item: its survivors are dispositioned in this pass's sweep, never assumed covered |

### Criteria this pass assesses (recorded before execution)

1. **Entry conditions.**
   - SL-29 (D-27, block 20:58Z's line), with two interleaved rounds against `af3d95a`.
   - SL-30 (D-30): the implementer's positions probe, mounted, 126 rows. `a7ad3f2` is the real-tree control (61 of 126 red in
     the implementer's run). The `5ec0621` control named at Phase 1 cannot run this probe, because the mount helper is absent
     there (record `91388b39`'s finding, of the same kind).
   - R-129 and R-130: code review's off-selection probe at the tip, 24 rows, each with no throw and fresh-load shapes, with
     `40947a6` as the control. Its timer clause is this stage's mounted probe over the 16 none and other-unit rows
     (`fr6/qaMountedOffSelection.probe.test.tsx.txt`), with a planted pending-timer row and the `40947a6` control.
2. **AC-6.9's obligations**, as listed in the Resumption State: CF-35's equality against the round's own pass-through tree, and
   the remaining limbs.
3. **The owed list**: the whole offline suite (JSON and exit code), typecheck (both programs), live, `test:discord` offline,
   `next build`, `MOUNTED_GENERATOR_COUNT=1000`, AC-3.3's 60 s cap, AC-6.8's limbs, the reds of QAF-50 and QAF-46, the M4 and
   M5 differentials if their paths moved, and the effort-final sweep over `git diff 5ec0621..48eb60a` production paths.
4. **Code review's Round 9 owed items.**
   - Its Assumption Not Checked: the browser drag-and-drop move of a backtick off line 0 into a run past a code block.
   - Its sub-entry's ask: log `editor.apply` during the paste and drag walks for any top-level `move_node`.

Driver: `verification/019/qa/m6/fr6/run-fr6.sh`, one worker, no network, each probe in its own capped scope.

### Findings (this pass)

QAF-56 MEDIUM Phase 2
- **What.** AC-6.8's timed limb (plan § M6, AC-6.8, "Time") reads: "the median wall time of one keystroke's normalise, over 50
  keystrokes … is at most 16 ms … on each of the 200, 400, 1,000 and 2,048-line texts". At `48eb60a`, the 2,048-line "lines
  after a `>>> ` marker" text read a 17.1 ms median in one of six bench rounds, at load 1.29 with p95 60 ms. The other five
  read 8.0 to 8.6 ms at load 0.9 to 1.2. Read as the criterion words it, that round misses the property.
- **Severity.** It is MEDIUM because a criterion's property was not held in a reading. The user effect is at most about one
  frame (16.7 ms) on a 2,048-line `>>>` description.
- **Disposition.** A stated limit under the plan's Revision 19 line ("an AC-6.8 finding below HIGH is a stated limit unless
  it is a severity floor"). It is not a severity floor: no preserved behaviour is unasserted. So it does not block this
  verdict.
- **Not a regression of this round.** Earlier tip rounds of the same row read `40947a6` 8.4 and 9.2 ms, and `372339f`
  8.7/9.9 and 8.3/9.1 ms.
- **Routed.** The run that read 17.1 ms hung until the kill (CR-22's form, a stated limit). How many runs make a reading is
  criterion text, so it goes to planner-019 for the seam fold (message of this pass).
- The call is this stage's. Steering returned it under its 19:20Z ruling (message received 2026-11-25).

### Execution (website `48eb60a`)

All evidence is under `verification/019/qa/m6/fr6/`, with the box load beside each run in `loads.txt`.

| Item | Instrument | Result | Evidence |
|---|---|---|---|
| Typecheck | `pnpm run typecheck` (both programs) | exit 0 | `typecheck-48eb60a.*` |
| Whole offline suite | `vitest run --project node --project dom`, JSON reporter, in a clean export (`x48s`, 686 of 686 blobs), under `unshare -rn` with `lo` up | **4,785 of 4,785, 238 files, exit 0**, 70.0 s. Disclosed: the driver's first run had `lo` down, and 15 cases that use a loopback server failed (`fetch failed`, empty renders), exit 1. That was my instrument error, not the tree's. It is kept as `suite-48eb60a-lo-down.*` and not scored | `suite-48eb60a.*` |
| AC-3.3's 60 s cap | the suite's wall time against `af3d95a`'s 31.1 s plus 60 s = 91.1 s | 70.0 s, within. Load 0.95 at the start (`loads.txt`) | `suite-48eb60a.time` |
| `test:discord` live | network on | 41 of 41, exit 0 | `discord-live-48eb60a.*` |
| `test:discord` offline | `unshare -rn`, `lo` up | exit 1, loud (`OracleError … fetch failed`), as designed | `discord-offline-48eb60a.*` |
| The full count (R-92) | `MOUNTED_GENERATOR_COUNT=1000`, the pasted and typed generator files | 17 of 17, exit 0, 92.0 s; the title reads "the first 1000 generator inputs" | `full-count-48eb60a.*` |
| `next build` | tip `x48s` and base `xaf`, `.env.local` copied in (not read) | exit 0, both | `build-x48s.*`, `build-xaf.*` |
| **R-129, the 24 rows** | code review's `crprobe.offselection-inline` (sha256 in `placed-probes.sha256`) | **24 of 24 clean** at the tip: no throw, 0 lines unlike a fresh load, and forced normalise 0 on every row. The control `40947a6` reads **12 of 24 red** (insert and delete × none and other-unit, at 100 to 1,000), matching code review's recorded 12 | `offsel-48eb60a.jsonl`, `offsel-40947a6.jsonl` |
| **R-130, the timer clause** | `qaMountedOffSelection.probe` (this stage's), mounted through the suite's `mountEditor`, pending timers run | **16 of 16** none and other-unit rows clean at the tip: no throw on the edit or the timer, no window or console error, fresh-load shapes, last write equal to the expected text. The planted pending-timer row is caught (`timerThrown: planted pending-timer error`) on both trees. The control `40947a6` reads **12 of 16 red**, all on the edit. No real timer error was seen on either tree, so the timer limb's power rests on the planted row | `mounted-offsel-48eb60a.jsonl`, `mounted-offsel-40947a6.jsonl` |
| **SL-30** (D-30) | the implementer's `crprobe.sl30-positions` (sha256 `3c1eb81d…`), mounted, 18 scenarios × sizes, 126 rows | **0 of 126 red** at the tip. The control `a7ad3f2` reads 61 of 126 red, 21 of them with a timer error | `sl30-summary.txt`, `sl30-*.jsonl` |
| **SL-29** (D-27) | code review's `crprobe.sl29-{tip,base}`, two interleaved rounds against `af3d95a`, judged by `sl29-table9b.py` (block 20:58Z's line) | **0 of 20 over the line** | `sl29-table-48eb60a.txt` |
| **CF-35's equality** | code review's fixed-point corpus on the tip and on its own pass-through tree (`x48n`), the implementer's comparator `cf35-equality.py` | **0 of 36,560 documents differ**, and 0 selections. Both trees have the same 8 non-fixed-point keystrokes (QAF-48's class residue) and 0 errors. The comparator has fired on a real difference before: 6 of 36,560 at `a7ad3f2` against its mutant (code review, `m6fix4-a7ad3f2/compare-fixedpoint-tip-vs-nosuppression-mutant.out.txt`) | `cf35-equality-48eb60a.out.txt` |
| M4 and M5 differentials | whether the paths moved | **Not owed**. `git diff --name-only 119471f 48eb60a` over production paths lists four files under `SlateEditor/utils/` (`emojiLift`, `getInitialValue`, `quoteMarker`, `withNormalizeNode`). No preview or decorator module imports them (`git grep` of their importers at `48eb60a`) | this row |
| Round 8's assumption: a 1,000-line `a🙂` paste in Chrome, tip against `af3d95a` | the `browser-walker` helper in the stage Chrome. `next start` builds on `127.0.0.1:3107` (tip) and `:3108` (base), at `/message` → `/message/m/0/edit`, the first embed description. A real clipboard paste, timed in the page to two frames with no new operation, `editor.apply` logged (`walk/run-paste.js`). Six rounds per build, interleaved. The local stack was up and nothing was saved | Every round reads 1,000 lines, 1,000 images, no error and no top-level `move_node`. Paste to settled: tip 1,422 to 1,558 ms (median 1,500), base 1,268 to 1,479 ms (median 1,326). The ratio of medians is about 1.13, under the 1.25 line, so nothing goes to steering. The tip's paste logs `remove_node` 999 and `insert_node` 1,001 (the line rebuild); the base's logs `remove_text` 1,000, `insert_node` 2,000 and `set_selection` 1,000 | `walk/run-paste-310{7,8}-{1,2}.json` |
| Code review Round 9's Assumption Not Checked: the browser drag of the backtick ending line 0 into a run past a code block | `walk/run-drag.js` (a native mouse drag), then `walk/run-drag-synthetic-310{7,8}.js` (slate-react's `dragstart`, `dragover` and `drop` at real coordinates, one `DataTransfer`), with `editor.apply` logged. Text: `a🙂` with a backtick, 98 `a🙂`, `a🙂` with a backtick, a code block, `z` (offselection-inline's delete/other-unit shape at N 100). Oracle: a fresh load at the tip of the text before and after the drop (`qaDragTextFreshLoad.probe`, `drag-text-fresh-load-48eb60a.json`): before 1 emoji, because the two backticks pair into inline code across the lines; after 100 | The native drag moved nothing (`opTypes` set_selection only), so it was not exercised. **The synthetic drag moved the text on both builds**: `remove_text` at [0,2], then `insert_node` at the end of `z`, with no error. Top-level `move_node` 0, so slate-react's drag does not reach CR-31's branch. At the tip, images go from 1 to 100, with 0 lines holding a raw emoji, which matches the oracle. The 99 `remove_node`/`insert_node` pairs are the rebuild. The pre-drop image counts differ (tip 1, base 100) because the tip's load is the engine's reading of multi-line inline code, and the base's load predates the engine | `walk/run-drag*.json`, `drag-text-fresh-load-48eb60a.json` |
| AC-6.8's timed limb (median at or under 16 ms, 200 to 2,048 lines) | `withNormalizeNode.keystroke-time.bench.ts`, `vitest bench`, one worker, six rounds in the clean export, with the load in `loads.txt` | The row "lines after a `>>> ` marker, 2,048 lines" read **17.1 ms in round 1** (load 1.29, p95 60 ms). That run then hung until the 25-minute kill (exit 124), CR-22's form. Rounds 2 to 6 read 8.2, 8.0, 8.4, 8.1 and 8.6 ms at load 0.9 to 1.2. Every other row of every round is at or under 11.8 ms. Earlier tip rounds of that row: `40947a6` 8.4 and 9.2 ms; `372339f` 8.7/9.9 and 8.3/9.1 ms. Steering returned the call to this stage. It is **QAF-56 MEDIUM**, a stated limit under Revision 19 (§ Findings, this pass) | `bench-keystroke-time-48eb60a-r1..r6.txt` |
| AC-6.9's fence and quote time bench (its own growth and ceiling bounds) | `withNormalizeNode.fence-and-quote-time.bench.ts`, two rounds | exit 0 both rounds. Its 2,048-line rows are 44 to 86 ms, within its own ceilings, matching `40947a6`'s 45 to 88 ms | `bench-fence-and-quote-time-48eb60a-r{1,2}.txt` |
| Code review's sub-entry: `editor.apply` logged during the paste and drag walks, for any top-level `move_node` | the walks above | **0 top-level `move_node`** in 12 paste rounds and 2 drag runs, on both builds | as above |

### The effort-final sweep: not run, on the owner's waiver

The owner waived it at rulings block "2026-11-25T15:46Z" (record `95913e2e`). His words: "Is there much value in maintaining the
mutation sweeps since we're just going to be rebuilding? In fact, we should only be doing the bare minimum on 019 now." He chose
"Agent: stop the sweep (Recommended)". Steering relayed the waiver; I read it in the record before acting.

- **What had run.** The mutant set was written and committed: 615 generated, 24 hand and 16 Phase 1 named mutants (`fr6/sweep/`,
  records `1205cf7`, `730773d`). Pass 1 started 13:30:29Z. One file finished before the stop (`preview.tsx`, 14:52:40Z). Its
  tables and the other files' partial tables stay under `fr6/sweep/pass1-shard-*`. **They are not scored**: no figure from
  them enters this verdict.
- **Stopped.** At 15:48Z the helper was stopped, and the two drivers (reparented to init) were killed with their whole trees
  (34 processes, by process group). `pgrep -af 'mutation-run|sweep-driver|vitest related'` then matched only my own shell. The
  scratch work directory was removed.
- **Disclosed.** The runner's `--dep node_modules` binds the website tree's `node_modules` read-only (`bwrap --ro-bind`), not
  the export's. Its lockfile matches `48eb60a`.
- **What is therefore not read.** These were owed through the sweep and stand unread on the waiver:
  - the kills of every generated mutant;
  - the hand mutants on Fix Round 6's `linesOf` branches, and the coupling mutants on `noteEdited`'s two conjuncts;
  - NM-73 to NM-88 at the tip;
  - QAF-50's case under W12, re-anchored;
  - QAF-46's member under its mutation.

### Verdict

**QA Complete for M6 at `48eb60a`**, on what has run, with the sweep not run on the owner's waiver. This pass is
milestone-scoped, so the plan-level Status is left alone.

- **Entry conditions: all met.**
  - R-129: 24 of 24, with the control 12 of 24 red.
  - R-130's timer clause: 16 of 16 mounted, with the planted row and the control 12 of 16 red.
  - SL-30: 0 of 126, with the control 61 of 126 red.
  - SL-29: 0 of 20 over the line.
- **AC-6.9.**
  - CF-35's equality: 0 of 36,560.
  - The no-throw, fresh-load, write and caret limbs: in the suite and in the probes above, all green, with real-tree controls red.
  - The growth and ceiling bench: exit 0 both rounds.
- **AC-6.8.**
  - The count limb is green in the suite.
  - The timed limb holds in 5 of 6 rounds. The sixth is QAF-56 MEDIUM, a stated limit (R-134).
- **The suite and builds.**
  - Suite: 4,785 of 4,785, exit 0, at 70.0 s, so AC-3.3's 91.1 s line holds.
  - Typecheck exit 0, `next build` exit 0, live 41 of 41, `test:discord` offline loud.
  - The full count: 17 of 17, exit 0.
- **Code review's Round 9 items.** The drag is exercised by its own events and matches the fresh-load oracle. No top-level
  `move_node` was seen in 12 paste rounds or 2 drags. The Chrome 1,000-line paste runs at about 1.13 times the base.
- **Findings open from this pass.** QAF-56 MEDIUM, a stated limit. QAF-42 LOW (R-69) stays open as before.
- **Blocking-condition register.** This pass appends no row. Rows inherited and not discharged: B-11 (AC-6.9's human-observable
  form), which is UAT's on this build. Rows B-1 to B-10 are as the register states; this pass did not touch them.

### Assumption Not Checked

This pass assumes that the suite's AC-6.9 limbs and the probes above discriminate the defects the waived sweep would have
seeded. In particular, it assumes Fix Round 6's `linesOf` branch notes (`split_node`, `merge_node`, `remove_node`) are each the
sole carrier of a case. It does not test this, because the sweep that would have shown it was waived.
- **The signature of its falsity.** A wrong line noted by one of those branches would leave a run of emoji lines unsettled after
  an off-selection split, merge or removal, while every case stays green. That is CR-31's form, on the other branches.
- **Who owns closing it.** No stage: the owner waived the sweep for this effort. Any later chain that keeps `linesOf` owns it.

### Handoff

The plan row is R-135 (`8f07d03f`). Disclosed: the stamp gate refused my first stamp on that row, which I had typed a minute
ahead of the clock. It was re-stamped from `date -u` and committed.

UAT next, through steering: no `uat` session is listed. UAT runs B-11 on a local production build of `48eb60a`, and the
`next build` for that is already proven here (exit 0).

## Resumption State

Closed at devops Stage 1 (2026-11-25, website `48eb60a`); the section as it stood is at record `4fe3c793`.
