---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "119471f — repos=website; M6 at the code review's Round 6 Reviewed-At; git-archive exports with their own frozen offline installs, 677 of 677 blobs"
Status: QA Failed
Status-Detail: >-
  M6 at website 119471f fails, milestone-scoped: AC-6.8 (Revision 16) fails here as expected, so CR-20's fix round is owed; AC-3.3's
  60 s cap is exceeded (141.9 s against 31.1 s); QAF-50 MEDIUM, a severity floor (partial mode's plain lines, unasserted). The
  TDD gate passes on the stub-tree records. AC-6.1, AC-6.1b, AC-6.2, AC-6.5, AC-6.6 and AC-6.7 pass; QAF-46 to QAF-49 LOW are
  stated limits. The refresh and the effort-final sweep run on the fix round's tip.
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

## Resumption State

Written at steering's ask (`/checkpoint`, about 413K tokens), at a seam: every pass is committed.

- **Done.**
  - **M6 Phase 2:** QA Failed at `119471f`, record `4da9b76b`, plan R-89 at `150f5097`. Sent to implementer-019 (QAF-50 for the
    fix round) and to planner-019, which registered QAF-46 to QAF-49 at R-90, record `14309101`.
  - **m5-d2 in its `runUnit.ts` form:** KILLED by `decorator.native-box-classes` (`hand-pass-shard-1/`). It is not owed again
    unless the fix round changes `runUnit.ts`.
  - **Phase 1:** re-keyed through Revision 20 (records `d53b1b30`, `e74108e`, `4764a6e`, `0dca93e`). Nothing is open there: QAF-42,
    QAF-43 and QAF-44 are closed, and QAF-45 is folded as SL-22.
- **Next: the M6 refresh on CR-20's fix round.** Stage start is code review's committed sub-entry and its `Reviewed-At`, never the
  message. Run in a `git archive` export of that SHA, with a frozen offline install, `next-env.d.ts` copied in, and blob identity
  checked (`verification/019/qa/m6/blob-identity.py`). Owed:
  - the TDD rows of the round (each new function red at assertion level, or stub-tree red and green);
  - the whole offline suite (JSON and exit code), typecheck, live, `pnpm test:discord` offline and `next build`;
  - **the full 1,000 generator inputs once, `MOUNTED_GENERATOR_COUNT=1000`, with its exit code** (planner-019, R-92: AC-3.3's
    full count has no home in `pnpm test:discord`; `pnpm test` runs 400). It is owed again at Phase 3 on the release tip;
  - Outstanding 1 (3 of 161,136 differences, `\` typed on an unclosed fence's opening line) is residue in QAF-48's class;
  - QAF-51's browser look: `>` typed at the start of `>> a` on a message of 123 lines, in the round's build;
  - **typed-generated alone, once, before the suite** (this document's Assumption Not Checked: no extra writes, no timeout);
  - **AC-3.3's 60 s cap:** both whole suites back to back, `2e36107` and the fix tip, against the chain base's 31.1 s;
  - **AC-6.8:**
    - the count limb, with its cross-size equality and floor on the sized texts: plain, `> `, `>>>`, CF-28's many-unit text,
      the fenced-quote texts, and `a🙂` at 200 and 1,000 lines;
    - the time limb from the `*.bench.ts` under `__tests__/` (CF-26, SL-20). Read how it runs under the config's projects, and
      record the load beside each median (16 ms bound);
    - SL-23's left-out keystrokes, and SL-24's growth-probe line;
    - NM-70 and NM-71 red, and NM-72 expected to survive (P-Q23 to P-Q25 in the Phase 1 document);
  - QAF-50's case red under W12. QAF-46's `🫩` member red under a mutation;
  - the M4 and M5 differentials if the round touches their paths: `qaPreviewDump` and `qaDecoratorDump`, both with their
    planted controls;
  - **the effort-final sweep** over `git diff 5ec0621..<fix tip>` production paths, with `mutant-gen.js` plus
    `qa-hand-mutants-119471f.json` re-checked for exact-once at the new tip. Run it through a helper, with at most two shards and
    the whole suite. **`--exclude` does not work under this config's projects**, so use explicit file filters if scoping, with a
    survivors-only whole-suite second pass. Every survivor is dispositioned.
- **Watch.** Under five-way load the typed-generated file overran 300 s, and its single-line case then reported extra writes.
- **Approach in flight.** None.
- **Local state.** Website is on `chain/019-slate-formatting-discord-engine`, HEAD `119471f`, the implementer's. I wrote nothing
  there. Scratch exports kept for the refresh: `m5x` (`2e36107`) and `m6x` (`119471f`), both under this session's scratchpad.
  The probe export and the sweep work directories are deleted. No process of mine is running.
- **Evidence run but not recorded.** None.
- **Questions sent.** None open.
- **Cache-warm wake.** Deleted at this checkpoint. Arm it again on the next turn.
