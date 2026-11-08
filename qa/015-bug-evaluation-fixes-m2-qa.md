---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "6001f7f — repos=website; M2 only, run in a git-archive export of 6001f7f under unshare -rn, not the shared tree (chain branch at b25f561 when read)"
Status: QA Complete
Status-Detail: "M2 (milestone-scoped) PASS at website 6001f7f against plan rev 16 (565e240). M2's criteria are unchanged since rev 13; rev 14 only hands the third colour-class member to M6-f, and revs 15-16 do not touch § M2. Suite 720/720, 71 files, exit 0; typecheck exit 0. 18 of 18 implementer mutants and 6 of 6 QA mutants killed their named cases at 6001f7f. Two LOW findings go to the implementer, neither blocking: QAF-19 (a TDD-table cell contradicts its own disclosure) and QAF-20 (CR-10's supplemental-file remnant, owed before the effort-final pass). No register row appended."
Phase: 2
---

# QA Report: Plan 015 — M2 (limits and the save schema)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 16 (agent-output `565e240`). § M2 was read in full at rev 14 (`c971506`), and the diff `c971506..565e240` was checked: it has no hunk in § M2. M2-b to M2-d are unchanged since rev 4. M2-a gained its colour class at rev 13 and the third member, dispositioned to M6-f, at rev 14.
**Implementation**: `implementation/015-bug-evaluation-fixes-m2-implementation.md` (`3ba52f3`), handoff at website `6001f7f`. M2's source is at `7befedb`; `6001f7f` adds M1's fix round on top.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md` Round 3 (`7976a9a`), `Reviewed-At: 6001f7f`, `Verdict: APPROVED_WITH_COMMENTS`. These values were re-derived from the committed header at `7976a9a` and are the stage start.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` (`aad87b6`, plus the 06:50 reconcile).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:52 | code-reviewer-hooks-015 → qa-hooks-015 (message) | QA Phase 2 for M2 at website `6001f7f` | Phase 2, milestone-scoped (M2). The stage start was re-derived from `7976a9a`. Verdict PASS. QAF-19 and QAF-20 (LOW) go to the implementer. Status → QA Complete (M2 scope; plan Status left alone). The plan moved to rev 16 during the pass. The diff `c971506..565e240` has no hunk in § M2, so the verdict names rev 16. **Process disclosure:** that re-key used a `python3` in-place replace on this document (3 anchored replacements, two of them with `count == 1` asserted), not the edit tools or `record-edit.js`, which breaks the record-writing rule. |
| 2026-11-08T10:32 | code-reviewer-hooks-015 (Round 2/3 sub-entry, `3540028`); steering-hooks-015 (brief) | Re-run for QAF-20 at website `4f9ed85` | QAF-20 RESOLVED. Verified in `qa/015-bug-evaluation-fixes-m1-m2-qa-findings-qa.md`. This document's verdict and `Verified-At` are unchanged. |

## Scope and criteria assessed

These were fixed before execution (plan § M2, rev 14, unchanged at rev 16):
- **M2-a.** For every integer colour in [0, 16777215], `embedShape` admits it. `discordResponseToMessage` keeps `color` whenever the response carries the field, 0 included. The border draws colour 0 in black.
- **M2-a QAF-1 property.** No expectation over `embedShape`'s admitted class is computed from a copy of the schema.
- **M2-b.** The author-name error shows exactly when the name exceeds 256 characters.
- **M2-c.** `validateEmbedTitle`'s error names the title.
- **M2-d.** Footer text of 0–2048 characters shows no error and saves; at 2049 the error shows. One constant drives both the editor and `embedShape`.
- **Entry conditions:** E-6, E-7, E-8.

**Out of scope.** M2-a's human-observable limb ("pick black, save, reload") is B-2, UAT's. The `Picker.tsx` member is M6-f's (rev 14). M1-i passed code review at `6001f7f`, but it belongs to M1's Phase 2, which waits for the M1-c and M1-h rebuild. The M1-i test file is in this run's suite and green, and this pass gives no verdict on it.

**Classes behind the examples.**
- M2-a's colour class is an integer range. Its members tested are 0, 1, 255 and 16777215 admitted; -1, 16777216 and 1.5 refused. Each of the range's three bounds (floor, ceiling, integer) is shown load-bearing by a mutant (below), so the range check is exercised on all three of its conjuncts.
- The truthiness-site class is enumerated by `verification/015/qa-m2a-colour-truthiness-sweep.sh` (Phase 1 § M2-a). Its two M2 members are fixed at `6001f7f`, and its third member is M6-f's.
- M2-b and M2-d are length bounds. Each is tested at its boundary and boundary+1 on both surfaces, plus an interior member and 0.

## TDD compliance gate

The table in the implementation document has 10 rows, covering every changed function. Each row answers all three questions Yes, with a failure reason:
- The first row of `shapes.embed-schema.test.ts` cites a compile-class `TypeError`. That is valid for the first row of a new file, and that row also records the assertion red after the export.
- The author-name schema cells are controls on an unchanged line, as the row itself says.
- The `EmbedFooter` row's red is a named mutant, which Axiom A admits. Its "Test Written First? Yes" contradicts the Ordering disclosure beneath the table (QAF-19). That is a record defect, not missing evidence, and the gate passes.

Gate: **passed**.

## Test Execution Results

Every count here is re-derived by this pass. Captures under `verification/015/`:
- `qa-m2-suite-run-6001f7f.txt`;
- `qa-m2-testresults-paths-6001f7f.txt`;
- the mutation runs, 19 `mutation-qa-m2-*-6001f7f.txt` and 6 `mutation-qa-m2s-*-6001f7f.txt`;
- the QA mutator, `mutators/qa-m2-supplement.py`.

**Where the runs happened.** A `git archive 6001f7f` export was used throughout. `website/node_modules` was symlinked, and the git-ignored `next-env.d.ts` was copied in. The full suite ran under `unshare -rn` with `lo` up, and the isolation counts were checked (0 non-lo links, 0 default routes) before the run.

| Check | Result | Exit |
|---|---|---|
| Full suite at `6001f7f` (vitest JSON) | 720 total, 720 passed, 0 failed; `testResults` 71 | 0 |
| Path membership | Base 54 paths plus 17 added (13 M1, 4 M2), 0 removed. Equal by path to the implementer's `m2-testresults-paths-6001f7f.txt`, with no path only in one list. Compared by membership, not size | — |
| `pnpm run typecheck` (both programs) | clean | 0 |
| E-8 lockfiles | `git diff --numstat 7ce866b 6001f7f -- pnpm-lock.yaml package-lock.json`: empty | — |
| QAF-1 property | `git grep -c "z\.object\|from 'zod'"` over test paths: 2 files, both `import type` only (`formatMutationError.zod-issues`, `limits.send-gate-partition`). Base: also `bugFixCoverage.supplemental` with 6. No test builds a schema | — |
| Naming, negative form | 0 ID-token hits in basenames, titles and comments of the 4 new files and the touched ingress file. The supplemental file's one hit is its `// escaped:` line, which is exempt. Planted control (`m2` in a title, `QA-14` in a comment): 2 of 2 hits. Positive form: 6 of 6 basenames conform | — |

QAF-11's flake signature did not occur, and `SectionEditor.auto-remove-dispatch` has had no `setTimeout` since `9e4955a` (`git grep -n setTimeout`: 0 hits in that file at `6001f7f`).

### Mutation kill table

**Driver.** `verification/015/mutate-run.sh`, at a fresh export of `6001f7f` per run. Each run executes the four M2 test files and the ingress file, 64 cases. The control run is green, 64 of 64.

**Suite instrument blobs at `6001f7f`:**

| Blob | File |
|---|---|
| `5874377` | `shapes.embed-schema.test.ts` |
| `dbe2f95` | `limits.embed-text-errors.test.ts` |
| `879f8f2` | `discordResponseToMessage.ingress.test.ts` |
| `221767d` | `EmbedFooter.length-error.test.tsx` |
| `f7912ee` | `EmbedEditor.border-colour.test.tsx` |

The M2 test files do not change between `7befedb` and `6001f7f`: `git diff --numstat` over `__tests__` lists only M1-i's two files.

**Implementer's table** (`mutators/m2-embedshape-table.py`, committed `3ba52f3`), re-run here at `6001f7f`. It reproduces the implementer's `7befedb` captures:

| Mutant | Cases reddened |
|---|---|
| `thumbnail-url-unchecked` | 1: refuses an empty-string thumbnail url |
| `image-url-unchecked` | 1: refuses an empty-string image url |
| `author-icon-unchecked` | 1: refuses an author with an empty-string icon_url |
| `author-url-unchecked` | 1: refuses an author with an empty-string url |
| `footer-icon-unchecked` | 1: refuses a footer with an empty-string icon_url |
| `thumbnail-required`, `image-required` | 18 each, including that field's admit-undefined case |
| `author-icon-required`, `author-url-required` | 5 each, including both author admit-undefined cases and the 3 author-name admits |
| `footer-icon-required` | 5, including footer icon admit-undefined and the 4 footer admits |
| `colour-ceiling-lowered` | 2: 16777215, fully populated embed |
| `colour-zero-refused` | 1: admits the integer colour 0 |
| `title-required` | 14 |
| `author-bound-80` | 2: 81 and 256 |
| `title-text-name` | 1 |
| `footer-constant-256` | 4: 257 and 2048, on **both** the schema and the editor surface |
| `ingress-colour-truthy` | 1: keeps the colour 0 |
| `border-colour-truthy` | 1: is drawn in the embed colour 0 |

None reported `MUTATOR FAILED`, and none was killed by the timeout.

**QA supplementary mutants** (`mutators/qa-m2-supplement.py`). They target cases the implementer's table never reddens:

| Mutant | Cases reddened |
|---|---|
| `colour-floor-dropped` (`.min(0)` removed) | 1: refuses the colour -1 |
| `colour-ceiling-raised` (`0x1000000`) | 1: refuses the colour 16777216 |
| `colour-int-dropped` | 1: refuses the colour 1.5 |
| `footer-constant-2049` | 2: refuses 2049 (schema) **and** shows the error for 2049 (editor) |
| `ingress-colour-always` (guard removed) | 1: leaves colour absent when the response has no colour field |
| `border-colour-fixed` (`intToHex(0)`) | 2: drawn in 255, drawn in 16777215 |

**What this settles.**
- M2-d's one-constant claim is now shown from both sides of the bound: 256 reddens the admit cases, and 2049 reddens the refuse cases, on both surfaces each time.
- Each of M2-a's three range conjuncts is the sole carrier of one refusal.

**Cases no mutant here reddened** (named, not assumed covered):
- ingress "keeps the colour 255 / 16777215";
- border "has no inline border colour when the embed has no colour";
- `embedShape` "admits an embed with no colour", which is reddened only by the field-required mutants and not by a colour mutant;
- `embedShape` "refuses an author name of 257 characters";
- `validateEmbedAuthor` "asks for a name when only a url is given" and "refuses an invalid url";
- `validateEmbedTitle` "asks for a title…" and "refuses an invalid url".

The last five assert behaviour M2 did not change; they are controls on unchanged lines. The first three are value-carrying siblings of reddened cells. None is evidence this pass relies on for a verdict. No Irreversible Side-Effect Register guard is in M2's diff, so no register sweep is owed at M2. The effort-final sweep over `7ce866b..<tip>` production paths remains owed.

## Implementation Review

Read at `6001f7f`:
- `shapes.ts` (`embedShape` colour `.int().min(0).max(0xffffff)`);
- `messageLimits.ts` (`MAX_EMBED_AUTHOR_NAME_LENGTH` 256, `MAX_EMBED_FOOTER_TEXT_LENGTH` 2048);
- `discordResponseToMessage.ts` (`if (e.color !== undefined)`);
- `EmbedEditor/index.tsx` (`color != null ? intToHex(color)`), with `intToHex` padding to six digits.

The code matches the plan, with no overreach. The tests drive the real modules, the DOM tests mount with `createRoot`/`act`, and every expectation is a literal.

The plan says ingress keeps `color` "whenever the response carries the field", and the code tests `!== undefined`. A response carrying `color: null` would therefore be carried as `null`. The Discord API omits the field rather than sending `null` for an embed without a colour. This contract was not tested here (Assumption Not Checked).

## Findings

QAF-20 LOW Phase 2 RESOLVED (2026-11-08T10:30: website `4f9ed85`; steps 1 to 5 delivered, the `'0000'` literal red under the discriminator-parse mutant, `qa/015-bug-evaluation-fixes-m1-m2-qa-findings-qa.md`) — `src/utils/__tests__/bugFixCoverage.supplemental.test.ts`, touched at `7befedb`, still holds cases that the conventions' class table dispositions. CR-10 names the first two classes; this pass adds a third. Duplicates: CR-10 in code-review/015-bug-evaluation-fixes-code-review.md
- **Zero-production-import transcription.** describe "useParsePathname Regex Correctness" has 7 cases over local copies of the hook's regexes. It imports nothing from `src/utils/hooks`, and no other test covers `useParsePathname` (`git grep -l useParsePathname` over test paths: this file only).
- **Cannot fail.** "formatKey matches clearUser key pattern …", twice: each compares `formatKey(k, x)` with itself.
- **Self-referential oracle (added here).** "handles discriminator as string \"0000\"": the expected value is `constructImageUrl(…, 0)`, the function under test.
- **Disposition (implementer; timing ruled by QA, the implementer's M2 Outstanding Item 1).** Owed before the effort-final Phase 2, not at M2. Steps:
  1. Delete the `useParsePathname` describe, and list `useParsePathname` as an outstanding untested surface.
  2. Delete the two self-comparison cases.
  3. Rewrite the `"0000"` expectation as an independently derived literal URL, shown red under a one-token mutation of `constructImageUrl`'s discriminator parse.
  4. Split the remnant by module, `constructImageUrl.<behaviour>.test.ts` and `formatKey.<behaviour>.test.ts`, because the file was touched (QAF-1's rename condition). Keep the `// escaped:` line with the `constructImageUrl` describe.
  5. Record per-file case counts and pass sets before and after.
- **What it fails to check:** the hook's real regexes, and `constructImageUrl`'s string-discriminator parse against an independent value.

QAF-19 LOW Phase 2 — `implementation/015-bug-evaluation-fixes-m2-implementation.md`, TDD Compliance, the `EmbedFooter` length-error row, answers "Test Written First? Yes". The Ordering disclosure beneath the table says the constant was changed before the DOM test was written.
- **Why it is LOW.** The evidence itself is sound: the red is the named mutant `footer-constant-256`, re-run here with the same kills, and `footer-constant-2049` adds the other direction. Only the cell misstates.
- **Asked of the implementer:** set that cell to "No, red by mutant (see Ordering disclosure)".

## Register

No row appended. Rows inherited and not discharged: B-1 to B-8; B-2 carries M2-a's human-observable limb. Code review's Round 3 Assumption Not Checked ("a black embed saved through the real tRPC path reloads as color 0") is the same observation as B-2. B-2's instrument was opened, a stage-browser save and reload on the locally served tip, and it covers that path.

## Assumption Not Checked

This pass assumes Discord's message API omits `color` from an embed that has no colour, and never sends `"color": null`, and does not test it. At `6001f7f`, ingress carries the field whenever it is not `undefined`, so a `null` would reach the editor as `color: null`. The border treats `null` as no colour (`!= null`), but `embedShape`'s `z.number()` would refuse it on save.
- **Signature of its falsity:** a message loaded from Discord with a colourless embed fails to save with a Zod error on `color`.
- **Owner of closing:** QA, at the effort-final Phase 2, by reading Discord's Embed-object contract for `color` and recording the source. B-2 is not a carrier: its walk saves a picked colour and never loads from Discord, so it cannot observe this. If the contract admits `null`, it is a finding against M2-a at that pass.

## Handoff

- **Implementer (implementer-hooks-015):** QAF-19 and QAF-20, both LOW and non-blocking. QAF-20 answers M2 Outstanding Item 1.
- **Assumption Not Checked:** routed to QA's own effort-final Phase 2 (Discord's `color` contract). Recorded in the Phase 1 document's Resumption State.
- **Next for QA:** M1 Phase 2 after code review approves the M1-c/M1-h rebuild, and the rev 14 (and following) Phase 1 delta when steering briefs it.
