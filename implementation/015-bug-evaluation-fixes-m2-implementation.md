---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "M2 (F-12, F-13, F-14, F-43) delivered and committed on website chain/015-bug-evaluation-fixes; awaiting code review. M3 onward is not started."
Handoff-At: "6001f7f — repos=website"
---

# Implementation 015 — M2 (limits and the save schema)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md`, § M2, at rev 10 (the revision current when this was written; the M2 text is unchanged since rev 7). QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` § M2 and QAF-1. Earlier deliveries: M0 (`037935d`), M1 (`be881c9`; its fix round is in the M1 document).

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T06:37 | steering-hooks-015 → implementer-hooks-015 (brief) | Implement M2 | M2-a to M2-d delivered at website `7befedb`; the handoff tip `6001f7f` also carries M1's fix round (CR-4, M1-h reopened by the owner's OQ-I ruling). QAF-1 is closed in this milestone. |

## Implementation Summary

- **A black embed saves.** `embedShape` admits colour 0 (the integer range [0, 16777215]). Ingress from a Discord message keeps colour 0, and the editor draws the border in black. The last limb is the human-observable one in the plan ("pick black, save, reload — the embed is black"); it needed the border site to stop treating 0 as "no colour".
- **The author-name error** shows at over 256 characters (it showed at over 80).
- **The title error** reads "Title is too long." (it read "Name is too long.").
- **The footer** takes 2048 characters in the editor and in the save schema, from one constant (`MAX_EMBED_FOOTER_TEXT_LENGTH`).
- **QAF-1:** the standing suite's copy of `embedShape` is gone. Its cases now run against the real schema.

## Milestones Completed

M2-a, M2-b, M2-c, M2-d.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Same start as M0 (rulings `7efd8b0`). Rev 9's re-derivation paragraph states that M2 premises are unmoved by M1 and that M2 onward is not held (steering's message) | Not a test |
| User-visible surface: flow lines recorded, no decision flow | Below | Not a test |
| QAF-1 (standing-suite defect, binds at M2 regardless of the planner) | `shapes.embed-schema.test.ts`; `bugFixCoverage.supplemental.test.ts` loses the copy | 17 mutants, TDD table |
| E-6, E-7, E-8 | TDD table; Test Execution Results | `verification/015/m2-*` |

**User-visible flows** (product vocabulary; pattern ladder in brackets):

| Flow | Surface and trigger | What happens next | Rung |
|---|---|---|---|
| Author name too long | Embed author name field, typing over 256 characters | The existing "Name is too long." error shows (it used to show over 80) | 1: `validateEmbedAuthor`, same function, only its bound moves |
| Title too long | Embed title, typing over 256 characters | The error reads "Title is too long." | 1: the same function already says "Title is required if URL is provided." |
| Footer too long | Embed footer text, typing over 2048 characters | The existing error state shows (it used to show over 256) | 1: `EmbedFooter`'s existing check, only its constant moves |
| Black embed | Colour picker set to black, then Save | The save succeeds and the embed keeps a black border after reload | 1: `ContainerEditor` already tests `accent_color != null`; `EmbedEditor` now does too |

No flow holds a decision, so no ask goes to steering. The only wording choice is "Title is too long.", taken from the sibling message in the same function.

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/server/api/utils/shapes.ts` | `embedShape` exported (QAF-1 imports it); colour `.positive()` → `.min(0)`. Lint gate: five signatures wrapped in M1 already | +2 −2 |
| `src/constants/index.ts`, `src/constants/messageLimits.ts` | `MAX_EMBED_AUTHOR_NAME_LENGTH` (256) and `MAX_EMBED_FOOTER_TEXT_LENGTH` (2048, was 256) move to `messageLimits.ts`, which `index.ts` already re-exports with `export *`, so `limits.tsx` can import them without `env.mjs` | +2 −3 |
| `src/utils/limits.tsx` | author-name error uses the 256 bound; title error text. Lint gate: three over-long lines wrapped, one `eslint-disable-next-line` on the unused `validateEmbed` | see diff |
| `src/utils/discordResponseToMessage.ts` | `if (e.color !== undefined)`. Lint gate: one over-long call wrapped | +7 −2 |
| `src/components/DiscordMessageEditor/components/EmbedEditor/index.tsx` | `color != null ? intToHex(color)` | +1 −1 |
| `src/utils/__tests__/discordResponseToMessage.ingress.test.ts` | colour cases added to the existing file | +25 |
| `src/utils/__tests__/bugFixCoverage.supplemental.test.ts` | the transcribed-schema describe is removed (moved, below); the `zod` import and the header comment that described it go; two non-null assertions removed for the lint gate | −146 |

## Files Created

| Path | Purpose |
|---|---|
| `src/server/api/utils/__tests__/shapes.embed-schema.test.ts` | The 12 URL-field cases moved from the supplemental file, now against the real `embedShape`, plus colour, footer and author-name cases |
| `src/utils/__tests__/limits.embed-text-errors.test.ts` | M2-b and M2-c |
| `src/components/DiscordMessageEditor/components/EmbedEditor/__tests__/EmbedFooter.length-error.test.tsx` | M2-d, editor side |
| `src/components/DiscordMessageEditor/components/EmbedEditor/__tests__/EmbedEditor.border-colour.test.tsx` | M2-a, the black border |
| `agent-output/verification/015/mutators/m2-embedshape-table.py`, `mutation-m2-*-7befedb.txt` | The one-token mutants and their runs |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Embed validators | `validateEmbedAuthor` / `validateEmbedTitle` in `limits.tsx`; only the bound and the text change. Rung 1 |
| Constants | `messageLimits.ts` is where the other embed limits live, and `index.ts` re-exports it. The two constants joined them. Rung 1 |
| Nullish colour test | `ContainerEditor`'s `accent_color != null`. Rung 2 (same class of surface) |
| DOM mount | The `SectionEditor.auto-remove-dispatch` test's `createRoot` / `act` mount with three provider mocks. Rung 2 |
| Test location for the moved cases | `shapes.*.test.ts` beside `src/server/api/utils/shapes.ts`, named by module and behaviour per CLAUDE.md |

## TDD Compliance

All reds were observed against the code before the fix, except where a mutant is named; mutants run through `verification/015/mutate-run.sh` in isolated exports of `7befedb` (a control run on the unmutated export is green: 64 of 64, `mutation-m2-control-7befedb.txt`). The mutator table is `mutators/m2-embedshape-table.py`.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `embedShape` colour 0 | `shapes.embed-schema.test.ts` | Yes | Yes | First run before the export: `TypeError` (`embedShape` undefined), compile-class and valid for this first row of the new file only. After the export, before the fix: `admits the integer colour 0` failed on `expected false to be true` | Yes |
| `embedShape` footer text 257 and 2048 | same | Yes | Yes | `expected false to be true` for 257 and 2048 at the 256 bound | Yes |
| `embedShape` author name 257 refused; 80, 81, 256 admitted | same | Yes | Yes | Green at the base (the schema already used 256): controls for M2-b's save-schema side. Mutants `footer-constant-256` and the colour mutants below do not touch them; the author bound in the schema is the existing line, so these four cells are controls and not red rows | Yes |
| `embedShape` colour range and ceiling | same | Yes | Yes | Mutant `colour-ceiling-lowered` (`0xfffff`) reddens `admits the integer colour 16777215` and `admits a fully populated embed with valid urls`. Mutant `colour-zero-refused` reddens `admits the integer colour 0` | Yes |
| QAF-1: the 12 moved cases | same | Yes | Yes | One-token mutants, each reddening exactly its cases: `thumbnail-url-unchecked` → `refuses an empty-string thumbnail url`; `image-url-unchecked` → image; `author-icon-unchecked`; `author-url-unchecked`; `footer-icon-unchecked`, each one case. The admit-side cases: `thumbnail-required`, `image-required`, `author-icon-required`, `author-url-required`, `footer-icon-required` each redden the `admits … undefined` case of their field (the first two also redden 16 cases that use no thumbnail or image, since the field becomes required for every fixture). `title-required` reddens 14 fixtures without a title and not the `every optional url omitted` case, which carries one | Yes |
| `validateEmbedAuthor` bound | `limits.embed-text-errors.test.ts` | Yes | Yes | `AssertionError: expected 'Name is too long.' to be ''` for 81 and 256 characters. Mutant `author-bound-80` re-creates it on the final text (2 failed) | Yes |
| `validateEmbedTitle` text | same | Yes | Yes | `expected 'Name is too long.' to be 'Title is too long.'`. Mutant `title-text-name` (1 failed) | Yes |
| `discordResponseToMessage` colour 0 | `discordResponseToMessage.ingress.test.ts` | Yes | Yes | `expected undefined to be +0`. Mutant `ingress-colour-truthy` (1 failed, the colour 0 cell) | Yes |
| `EmbedEditor` border | `EmbedEditor.border-colour.test.tsx` | Yes | Yes | `expected '' to be 'rgb(0, 0, 0)'`. Mutant `border-colour-truthy` (1 failed) | Yes |
| `EmbedFooter` length error (editor side) | `EmbedFooter.length-error.test.tsx` | Yes | Yes | Written after the constant change, so its red is a mutant: `footer-constant-256` reddens `shows no error for footer text of 257 characters` and `… of 2048 characters`; the same mutant reddens `shapes.embed-schema.test.ts`'s 257 and 2048 cases. So one constant moves both surfaces, as M2-d claims (4 failed, 60 passed) | Yes |

**Ordering disclosure (TDD).** For `EmbedFooter.length-error.test.tsx` I changed the constant before writing the DOM test, because the schema test already needed it; the DOM test's red is the named mutant, not a run against the pre-change tree. The row says so. For the ingress and `limits` tests the red was observed before the fix.

## Class Sweep

Not a fix round. Enumerations run for the gaps my instruments exposed (`verification/015/m2-enumerations-7befedb.txt`):

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-12: falsy test on an integer colour | `grep -rnE "(\bcolor\|accent_color\|accentColor)\b *(\?\|&&\|\|\|)\|!+(\w+\.)*(color\|accent_color)\b\|if \((\w+\.)*(color\|accent_color)\)\|(\w+\.)*(color\|accent_color) *\? " src bot` (E15) | 2 hits, both type declarations (`global.d.ts:271`, `:355`, `accent_color?: number`) | Not applicable: declarations, not tests. Base had 2 real members, `discordResponseToMessage.ts` and `EmbedEditor/index.tsx`; both fixed. `ContainerEditor` was already `!= null` |
| F-12: a colour schema with `.positive()` | `grep -rn "z.number().int()" src` (E10) | 3 hits: `shapes.ts:114` (`accent_color`, already `.min(0)`), `:137` (fixed), `:201` (flags, unrelated) | Fixed or not applicable |
| QAF-1: tests that build their own zod schema | `grep -rln "z.object" src --include=*.test.ts --include=*.test.tsx` (E11) | 0 hits | Residual 0 (base had 1: the supplemental file) |
| F-13: the username bound used for a non-username | `grep -rn "MAX_NAME_LENGTH" src` (E12), non-test | 7 hits: `shapes.ts:10,191`, `limits.tsx:11,26`, `Header.tsx:25,110`, `messageLimits.ts:16` | All remaining uses are the username/message-name bound (`validateUsername`, `username` in the shape, the header input). The author-name use is gone. Not applicable |
| F-43: the footer bound | `grep -rnE "footer.*(256\|2048)\|FOOTER_TEXT" src` (E13), non-test | 5 production hits: the import and `max()` in `shapes.ts`, the constant, the import and the check in `EmbedFooter.tsx`, and a placeholder name | One constant drives both. No literal 256 or 2048 for the footer remains |
| F-14: "Name is too long" text | `grep -rn "Name is too long" src` (E14), non-test | 1 hit: `limits.tsx:80`, the author-name error | Correct there: it is the author's name error. The title no longer uses it |

## Test Execution Results

Raw outputs: `agent-output/verification/015/m2-testresults-paths-6001f7f.txt`. Counts from the vitest JSON reporter.

| Command | Result | Exit |
|---|---|---|
| `npx vitest run --reporter=json` at `6001f7f` (M1 fix round and M2) | 720 tests, 720 passed, 0 failed, 71 files | 0 |
| Path membership vs M1's list (`m1-testresults-paths-be881c9.txt`) | 1 path gone: `parseServerCookies.cookie-header.test.ts`, deleted with its module (M1 fix round, CR-4). 5 new: `Server.session-cookie-redirect.test.ts` and the four M2 files | — |
| `pnpm run typecheck` at `6001f7f` | 0 errors | 0 |
| `git diff --numstat 7ce866b -- pnpm-lock.yaml package-lock.json` | empty | — |
| `node ~/.claude/tools/convention-check.js website --since=be881c9` | 0 FAIL, 0 CANDIDATE, 4 SKIP | 0 |
| Mutation runs on the M2 test files (4 files, 64 cases) | Control green; 18 mutants, every one reddened its named cases (outputs in `verification/015/mutation-m2-*-7befedb.txt`) | — |

- **Convention-check gate satisfaction, disclosed.** The tool's eslint pass is whole-file for every changed file. It flagged lines in `limits.tsx` (three over-long lines and an unused function, `validateEmbed`), `discordResponseToMessage.ts` (one long call) and `bugFixCoverage.supplemental.test.ts` (two non-null assertions) that I did not write. I wrapped the long lines and replaced the assertions with optional chaining. For `validateEmbed`, dead code that nothing imports, I added an `eslint-disable-next-line` instead of deleting it, since deleting it is beyond the plan. The reviewer may prefer deletion.
- **SKIP.** The id-token basename check is unchecked by the tool (as at M1); I ran the CLAUDE.md negative form by hand over the new files: 0 hits, no planted control. The other SKIPs are `src/constants/index.ts` (no added lines) and the deleted files.

## Outstanding Items

1. **Rename of `bugFixCoverage.supplemental.test.ts`.** QA's QAF-1 says its rename is owed under (C) if the file is otherwise touched. I touched it (removed the embed describe), but its remaining three describes cover `constructImageUrl`, a Redis key format and `useParsePathname`'s regex, three different modules; there is no single module segment to rename it to. Splitting them by module is a separate clean-up. I did not do it. **Asks QA** whether the remnant needs splitting now. The remaining describes were not audited for transcribed oracles (the Redis key one and the `useParsePathname` one may be members of Axiom E's class).
2. **The EmbedFooter error is not visible text.** `EmbedFooter.tsx` computes `error` and sets `data-erroring-state`; the line that would render the message is commented out in the source (read at `7ce866b`). The test asserts the state, which is what the editor shows. Not changed.
3. **`validateEmbed` is dead code** (see the disclosure above).
4. **Self-diagnosis (method), the colour border.** The plan's M2-a names `embedShape` and ingress; the human-observable limb ("the embed is black") needed a third site, the border. I found it by reading what "reload" shows rather than by the named sites. Had I stopped at the two named sites, B-2 in the walk would have shown a default border for a black embed.
5. **Self-diagnosis (method), mutant table.** The first run of my mutant table had two entries that matched twice (`accent_color` contains `color:`) and one mislabelled (`footer-icon-unchecked` made the field required). I caught both because the run output showed 0 fail for a mutant that should have reddened a case, and the "MUTATOR FAILED" line. Both were fixed and re-run; the table in the repository is the corrected one.

## Next Steps

Code review of `6001f7f`, then QA Phase 2 for M2. Then M3 (DOM, three dialogs; its flows hold a decision to check before code).

## Resumption State (checkpoint 2026-11-08T06:40Z, implementer-hooks-015)

- **Done.** M0 (`037935d`), M1 (`be881c9`, fix round to `6001f7f`), M2 (`7befedb`, same tip). Documents: the M0, M1 and M2 implementation documents under `implementation/`. Website chain tip `6001f7f` on `chain/015-bug-evaluation-fixes`, handed to code-reviewer-hooks-015 by message (M1 fix round: CR-4, M1-h's second window; M2). preview-image-generator is untouched at `471578f`. Gate at `6001f7f`: vitest 720/720, 71 files, exit 0; typecheck 0; convention-check 0 FAIL.
- **Waiting on others.**
  - Code review of `6001f7f` (a combined M1 sub-entry and M2).
  - CR-3 (sign-out reading a cached null): folded by the planner in plan rev 12 (`c5d6acd`), gate round pending. Do not touch `removeUserSession` until the gates pass it; steering will say.
  - M1-i: the planner restates it, since `parseServerCookies` is deleted.
  - CR-5 declined (optional).
- **Next: M3** (F-15, F-39: Enter on a dialog must not confirm from another button).
  - Fix: at each of the three sites (`ConfirmationDialog.tsx` `Inner`, `WarningDialog.tsx`, `ImageUploader.tsx`), change the guard from `document.activeElement?.tagName !== '~/components/Button'` to `!== 'BUTTON'`, one token per site, mirroring the per-dialog hook (the plan says no shared helper exists).
  - Flows (no decision found; rung 1 each): Enter with a button focused runs only that button's action. Enter with no button focused is unchanged (the dialog's confirm or submit). Ask steering only if a decision appears.
  - The decision table is 3 dialogs × 3 focus states, plus Clear in the uploader (10 cells).
- **In flight, uncommitted, untracked:** `website/src/components/__tests__/dialogs.enter-key.test.tsx` (the 10 cells; not linted, not yet committed).
  - At the base, 4 of 10 pass: the three no-button-focused cells and the Clear cell. Six fail with `expected "vi.fn()" to be called 1 times, but got 0 times` or `no set button`. That is a defect in my helper, not yet a red against production code.
  - `pressEnter` dispatches keydown plus a `click` with `detail: 0`. react-aria's Button does not fire `onPress` from it under jsdom.
  - The SectionEditor test (`SectionEditor.auto-remove-dispatch.test.tsx`, `pressDelete`) presses a Button with `pointerdown`, `pointerup` and a click with `detail: 1`. Try that sequence for the button's own activation, after the keydown that react-hotkeys-hook listens for. Check that a real Enter on a focused button does both: the keydown reaches the hotkey and the press runs the button.
  - The uploader's save button is labelled `Save` (my test looks for `/set/i`). Its Cancel and Clear are found by label.
  - react-hotkeys-hook ignores events whose target is an input, textarea or select by default, so the uploader's "no button focused" cell must blur to `document.body`, as written.
  - Get the cells red against the base before the fix (assertion-level), then apply the one-token fixes. Name the mutants for the cells green at the base.
- **Evidence not yet recorded.** None outstanding. Mutation exports under the scratchpad are deleted. `verification/015/mutate-run.sh` takes `EXPORT_ROOT` and `MUT_ID` from the environment.
- **Held state.** `website/node_modules` untouched. `.next/dev/types` deleted at M0 per D7 (record: the M0 document).
- **Questions sent.** To steering: M1 and M2 summaries, the planner asks (answered in rev 9), M1-i's restatement (passed to the planner). No open question to the owner from me.
- **Remaining after M3.** M4 (send page; user-visible, check flows first), M5, M6 (QAF-11 is already fixed, so no longer owed there), M7 (bot; tests now collected), M8 (preview-image-generator: E-1 applies from the first local run; export without `.env`, install inside the export, `unshare -rn`, `ip link set lo up`, self-check).

