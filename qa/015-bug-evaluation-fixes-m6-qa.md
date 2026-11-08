---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "476c633 — repos=website; M6-a, the M6-b to M6-l re-run (QAF-30 to QAF-32) and CR-24; git-archive exports under unshare -rn. Earlier: 24ac49f (QA Failed, M6-b to M6-l)"
Status: QA Failed
Status-Detail: "At website 476c633 against plan rev 27. M6-b to M6-l PASS: QAF-30, QAF-31 and QAF-32 RESOLVED, the six survivors killed. CR-24 (BottomPortal, ColorPicker) PASS. M6-a QA Failed on coverage: QAF-34 MEDIUM, the interactive title parser has no preservation cell and m6a-title-codeblock-interactive survives. RK-1 differential: 0 of 12,486 comparisons differ."
Phase: 2
---

# QA Report: Plan 015 — M6 (editor components and markdown), M6-b to M6-l

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 25 (agent-output `dd9e88a`), § M6, read in full. Rev 25 changes M6-a only (CR-23); M6-b to M6-l read the same at revs 23 to 25.
**Implementation**: `implementation/015-bug-evaluation-fixes-m6-implementation.md` (`709a7fa`), `Handoff-At: 24ac49f`.
**Code review**: `code-review/015-bug-evaluation-fixes-code-review.md` Round 14 (`e0054f7`), `Reviewed-At: 24ac49f`, `Verdict: REJECTED` for M6-a (CR-22) and F-45's class (CR-24). M6-b to M6-l are met, M6-e as stated. Re-derived from the committed Round 14 section at `e0054f7`; this is the stage start. Steering's resume brief (cross-session, 08:2xZ) names the same.
**Phase 1 and the chain's register**: `qa/015-bug-evaluation-fixes-qa.md` § M6, keyed to rev 25 at `983a84d`. This pass reconciles B-4 there.
**Same handoff, refreshed here and recorded in their own documents**: QAF-26 (M1, `13be10d`), QAF-29 (M5-e, `24ac49f`), and the production refresh of M4 (CR-17) and M5-c (CR-19) under `a665901`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T08:33 | code-reviewer-hooks-015 → qa-hooks-015 (message: `e0054f7`); steering-hooks-015 (resume brief) | QA Phase 2 for M6-b to M6-l at website `24ac49f` | Phase 2, milestone-scoped. Created and first committed with Status QA Failed (M6-b to M6-l scope; plan Status left alone). QAF-30 and QAF-31 MEDIUM, QAF-32 LOW go to the implementer. B-4 gains a `/preview` leg (code review's routed assumption). |
| 2026-11-08T09:52 | code-reviewer-hooks-015 → qa-hooks-015 (`2fa6d8b`); steering-hooks-015 (brief at rev 27) | Re-run of M6-b to M6-l (QAF-30 to QAF-32), M6-a and CR-24 at `476c633` | M6-b to M6-l PASS. CR-24 PASS. M6-a QA Failed (QAF-34 MEDIUM). |

## Scope and criteria assessed

Fixed before execution (plan § M6, rev 25; Phase 1 § M6):
- **M6-b.** A URL is valid exactly when its path (before `?` or `#`), lower-cased, ends in one of D8's eight extensions. Phase 1 members: the plan's five, each extension upper-cased, `a.png#frag`, `a.png/`, `apng`, `.webmx`, as a literal list.
- **M6-c.** A read-only embed with nothing displayable renders nothing.
- **M6-d.** A read-only field's edit, delete and move bounds act on the field shown, with a hidden earlier field.
- **M6-e (Author only).** After unmount no timer runs. F-45's class (CR-24) is outside this verdict.
- **M6-f.** The picker opens on six-digit hex for `0`, `255`, `0xffffff`; the `0` cell is discriminated by the non-black-fallback mutant.
- **M6-g.** A longer emoji sequence wins over its shorter mapped prefix.
- **M6-h.** `aria-expanded` follows visibility, both directions.
- **M6-i.** Six duplicate sites put the copy at `idx + 1`, the original at `idx`, the follower at `idx + 2`.
- **M6-j.** A footer without `text` renders.
- **M6-k.** `delete(key)` removes the entry; the sibling key survives.
- **M6-l.** (i) adds from 39 complete; the top-level add at 40 is refused. (ii) `validateMessage` at 40/41, 41 by nesting, literal text. (iii) one counter; its nesting mutation reddens both consumers. (vi) the line and border at 40/41/higher; live drop; place after a text-length error; border equal to the text-length error's; add button hidden at 40 and 41; `/preview` at 41 and 40.
- **Entry conditions:** E-5 to E-9.

**Classes behind the examples.**
- M6-i's class is "a duplicate's position relative to its original". With content-equal copies, "before the original" and "after the original" give the same content order; only identity separates them. QAF-31.
- M6-l (vi)'s add gate is the class "totals at or above 40"; 40 is one member, 41 the other Phase 1 names. QAF-30.
- M6-b's class is enumerated by the test as a literal list (8 × 2 cases plus 6 accepts and 9 refusals).

**Out of scope.** M6-a (CR-22 open; its RK-1 differential runs after the fix), F-45's class (CR-24), M5-h/M5-i (`09c7c45` onward).

## TDD compliance gate

The table has 19 rows (16 M6 rows; QAF-26, QAF-29, CR-19). Every new function or behaviour has a row with an assertion-level red and a named failure. The three "No" rows (M6-g, M6-i nested, M6-l (i)) are controls on behaviour the base already had, each closed by a named killed mutant in `m6-sweep-summary-4fbc920.txt` / `-ef5a9cc.txt`. No file's rows rest on compile-time failures alone (M6-b's and M6-l (ii)'s first reds are a missing module or export, each followed by an assertion red). **Passed.**

## Test Execution Results

Captures under `verification/015/`:

| Capture | What |
|---|---|
| `qa-p2-m6-run-24ac49f.txt`, `qa-p2-m6-testresults-24ac49f.json`, `qa-p2-m6-testresults-paths-24ac49f.txt` | Full suite and typecheck at `24ac49f` (`qa-m4-suite-run.sh`) |
| `mutation-qa-tz-la-whole-suite-24ac49f.txt` | The whole suite with `TZ=America/Los_Angeles` (`mutate-run.sh`, no mutator) |
| `mutators/qa-m6-supplement.py`, `qa-m6-sweep-summary-24ac49f.txt`, `qa-m6x-sweep-summary-24ac49f.txt`, `mutation-qa-m6-*-24ac49f.txt`, `mutation-qa-m6x-*-24ac49f.txt` | QA's M6 mutants, the I-3 guard sweep and the CR-17/CR-19 refresh mutants, with controls |

| Check | Result | Exit |
|---|---|---|
| Full suite at `24ac49f` (export; isolation 0 non-lo links, 0 default routes; export blob of `message.ts` = tree blob `3e6b41b`) | 1029 total, 1029 passed, 0 failed; `testResults` 108; stderr 0 lines | 0 |
| Path membership vs `qa-p2-testresults-paths-da24eb7.txt` | 19 added (the 19 M6 test files), 0 removed: 89 + 19 = 108 | — |
| `pnpm run typecheck` (both programs) | clean | 0 |
| Whole suite under `TZ=America/Los_Angeles` (QAF-29's per-file zone, checked for leakage both ways) | 108 files, 1029 passed, 0 Unhandled | 0 |
| E-8 lockfiles | `git diff da24eb7 24ac49f -- pnpm-lock.yaml package.json` empty (implementation document; code review re-read) | — |
| Test conventions | `convention-check.js website --since=da24eb7` ran over the shared tree (chain branch at `09c7c45`): 0 FAIL; its 1 CANDIDATE is `src/app/preview/__tests__/page.invalid-data.test.tsx` (M5-h, `09c7c45`, outside this verdict); 1 SKIP (id-token). The id-token rule by hand over the 22 test files `da24eb7..24ac49f` (basenames, comment lines, `describe`/`it`/`test` title lines): 0 hits; positive control on two planted lines (`cr-22`, `m6`) fires 2 of 2 | — |

**Suite instrument blobs at `24ac49f`:** `947a9cb` `DiscordMessageEditor.component-limit`; `8497e65` `DiscordMessageEditor.duplicate-placement`; `ba1d287` `ActionRowEditor.add-button`; `bbc9ed4` `ActionRowEditor.duplicate-placement`; `ac98c97` `ContainerEditor.duplicate-placement`; `080ea89` `MediaGalleryEditor.duplicate-placement`; `3df9759` `SectionEditor.add-text-display`; `95b7f33` `SectionEditor.duplicate-placement`; `835d545` `Picker.default-colour`; `83ad249` `EmbedEditor.empty-embed-hidden`; `2f4cdef` `EmbedFields.read-only-field-index`; `feeb4f9` `EmbedFooter.missing-text`; `0c78489` `Author.timer-cleanup`; `f54f057` `isValidImageUrl.extensions`; `d743058` `limits.component-count`; `6090648` `UpsertMapMap.delete`; `be201bf` `emoji.longest-sequence-first`; `be3252e` `MarkdownSpoiler.aria-expanded`; `5f03367` `rules.multi-line-code-block` (M6-a, not under verdict). All committed. QA instruments: `qa-sweep.sh` `dd44129`, `mutate-run.sh` `e13ecd0`, `mutators/qa-m6-supplement.py` committed with this document.

### Mutation kill table

**Scope.** Two parts.
- **The I-3 guard M6 changed.** I-3 (the webhook post) fires only for a valid message, and M6-l adds a branch to `validateMessage`. The sweep is seeded at that branch and its decision constant: the branch removed, the comparator at the limit, the constant moved.
- **Cells Phase 1 names that the implementer's mutants do not reach**: the nested duplicate's side of the original, the add gate at 41, the line's place, and (iii)'s "both consumers".

**Excluded:** the implementer's 55 M6 mutants (`m6-sweep.sh`, committed captures), not re-run here. M6's production diff falls to the effort-final sweep.

**Controls:** `ActionRowEditor`, `ContainerEditor`, `MediaGalleryEditor`, `SectionEditor` duplicate placement 1 of 1 each; `component-limit` 17 of 17; `limits.component-count` 13 of 13; `limits.send-gate-partition` 36 of 36; all exit 0.

| Mutant | Target | Run against | Result | Cases reddened / disposition |
|---|---|---|---|---|
| `m6i-actionrow-copy-before` | `next.splice(idx, 0, clone)` | `ActionRowEditor.duplicate-placement` | **survived** (1 passed) | QAF-31 |
| `m6i-container-copy-before` | same, `ContainerEditor` | `ContainerEditor.duplicate-placement` | **survived** (1 passed) | QAF-31 |
| `m6i-gallery-copy-before` | same, `MediaGalleryEditor` | `MediaGalleryEditor.duplicate-placement` | **survived** (1 passed) | QAF-31 |
| `m6i-section-copy-before` | same, `SectionEditor` | `SectionEditor.duplicate-placement` | **survived** (1 passed) | QAF-31 |
| `m6l-add-gate-only-at-40` | `totalComponentCount !== MAX_TOTAL_COMPONENTS` | `component-limit` | **survived** (17 passed) | QAF-30 (a) |
| `m6l-line-above-text-error` | the components line rendered before the text-length line | `component-limit` | **survived** (17 passed) | QAF-30 (b) |
| `m6l-border-dropped` | `componentCountError` leaves the border condition | `component-limit` | **killed** (4) | the three "red border above the limit" cells and the not-editing cell |
| `m6l-nesting-recursion-removed` | the child loop in `countTotalComponents` removed | `component-limit` | **killed** (2) | "offers adds only below the limit: 10 containers of one section each (40 in all)"; "… red border above the limit: 11 containers of one section each" |
| same | same | `limits.component-count` | **killed** (2) | "counts a container holding a section of one text and an accessory"; "refuses 11 containers each holding a section (44 in all) …". (iii) holds: both consumers redden |
| `i3-validate-skips-count` | `if (componentCountError) return …` removed | `limits.component-count` | **killed** (3) | the three refusals (41 flat, 41 nested, 44) |
| same | same | `limits.send-gate-partition` | survived (36 passed) | Not a gap: that file's partition excludes the count stage by design (implementation document, Patterns Extended); the branch is killed above |
| `i3-comparator-at-limit` | `total >= MAX_TOTAL_COMPONENTS` | `limits.component-count` | **killed** (3) | the three "accepts … (40 in all)" cells |
| `i3-limit-41` | `MAX_TOTAL_COMPONENTS = 41` | `limits.component-count` | **killed** (3) | the three refusals |

Score: 11 QA mutants at sites matching "the four nested duplicate `splice` lines; `canAddComponent`'s comparator; the error block's order; the border condition; `countTotalComponents`'s child loop; `validateComponentCount`'s comparator, the constant and `validateMessage`'s count branch" at `24ac49f`, run against 7 files (13 mutant runs). Excludes every other production line. Killed: 5 of 11 mutants; the I-3 guard's three sites, all killed.

### Same-handoff refresh: CR-17 (M4) and CR-19 (M5-c) under `a665901`

`a665901` changes production code under two earlier verdicts: M4's webhook-URL text becomes one constant `INVALID_URL_ERROR` at both sites (`useValidateWebhook.ts`, `WebhookMenu/index.tsx`), and M5-c's flag ref becomes `useLatest(hasChanged)` (`usePusher.ts`). Both verdicts were expired by it. The refresh executes the verified surface at `24ac49f`: the full suite above, plus one mutant per change (`qa-m6x-sweep-summary-24ac49f.txt`). Controls: `NewMessageModal.failed-webhook-load` 2/2, `WebhookMenu.failed-webhook-load` 2/2, `useValidateWebhook.validation-effects` 21/21, `usePusher.update-prompt` 4/4, all exit 0.

| Mutant | Target | Run against | Result |
|---|---|---|---|
| `m4-invalid-url-text` | `INVALID_URL_ERROR` text changed once | `NewMessageModal.failed-webhook-load` | **killed** (1): "shows "Invalid URL" once, on the shared error line, when the network fails" |
| same | same | `WebhookMenu.failed-webhook-load` | **killed** (2): network failure and Discord refusal |
| same | same | `useValidateWebhook.validation-effects` | **killed** (1): "shows "Invalid URL" and no webhook when the webhook fetch rejects" |
| `m5c-flag-frozen-at-subscribe` | `{ current: hasChanged }` per render, so the subscribed effect reads the first render's value | `usePusher.update-prompt` | **killed** (2): both "after the subscription was made" cells |

Both sites read the one constant, and the cells hold the text as a literal. M4's and M5-a to M5-g's verdicts are re-anchored at `24ac49f` in their own documents.

## Re-run at `476c633`

Stage start: code review `2fa6d8b` (Rounds 16 to 18), `Reviewed-At` `476c633` for the website, re-derived from the committed section. Suite at website `476c633` (git-archive export, `unshare -rn`): 1118/1118 cases in 114 files, vitest exit 0, `pnpm run typecheck` exit 0 (`verification/015/qa-p2-r2-run-476c633.txt`, `qa-p2-r2-testresults-476c633.json`). 6 files were added since `24ac49f` and 0 removed, compared by path membership (`qa-p2-r2-testresults-paths-476c633.txt`).
- **TDD gate:** passed. The fix round's rows (CR-22's blank-line members, and both CR-24 cleanups) are Yes/Yes with assertion-level reasons (`m6-implementation.md`).
- **M6-b to M6-l:**
  - The six survivors from `24ac49f` are killed: `cl-gate40` 3, `cl-lineabove` 1, and each `*-before` 1.
  - New mutants are killed: `cl-frozen` 1 (the live drop), `pg-editonly` 1 and `cl-editonly` 1 (`/preview`), and `ef-or` 1 (QAF-32).
  - `pg-frozen` survives. It is equivalent on `/preview`, whose `data` never changes after mount, and the editor's cell kills it.
  - **QAF-30, QAF-31 and QAF-32 are RESOLVED** (`b608555`, test-only). `EmbedFields` now asserts literal key lists, and the duplicate cells assert the original's `_key` at `idx`.
  - A note, not a finding: the delete case's expected value, `fields.filter((_, i) => i !== slot)`, is a generic remove-at-index, and `slot` is a literal fixture column. The quantity under test (which slot) is not computed by production code.
- **CR-24:**
  - `BottomPortal.unmount-cleanup`: the entry is gone after its owner unmounts while it is open. A presence control runs first.
  - `ColorPicker.scroll-lock-release`: the lock is released when the picker is removed while open. A presence control runs first.
  - `bp-noop` 1 and `cp-noop` 1 are killed. PASS.
- **M6-a** (`rules.multi-line-code-block.test.ts`):
  - Unit members, over `parseContent` and `parseEmbedField`:
    - 2-line, 3-line and 1-line bodies, with and without a tag. The tagged 1-line body is in the RK-1 space.
    - CR-22's empty and whitespace-only interior lines.
  - Mutants killed: `rules-split` 14, `rules-single` 22, `rules-title-s` 1.
  - RK-1 (`qa-rk1-differential/`): 6,243 members × 2 parsers. The tags include `c++`, `c#` and `objective-c`. The space covers leading and trailing blanks, unterminated fences and CRLF. **0 differences at `476c633`.** Positive controls: 4,546 differences at `24ac49f` and 6,402 at the base.
  - **Survivor:** `rules-title-i` (`m6a-title-codeblock-interactive`, which restores `codeBlock` to the interactive title rule set). No case calls `markdown.interactive`: `git grep -c interactive 476c633` over the markdown and component `__tests__` exits 1. See QAF-34.
- **Verdict:** M6-b to M6-l PASS, CR-24 PASS, M6-a QA Failed.

## Implementation Review (Post-Implementation)

**Per criterion** (assertions read in the test files at `24ac49f`):
- **M6-b: met.** All Phase 1 members are present as literals (`EXTENSIONS` is the test's own list, not read from the module); the implementer's seven mutants cover substring, case, query, fragment, two dropped extensions and an added one.
- **M6-c: met.** Four hidden and seven shown read-only fixtures, plus the editing control.
- **M6-d: met, with QAF-32.** The hidden-earlier, two-hidden and hidden-middle fixtures drive set, delete and the move bounds by literal slot. The "only the displayed fields are rendered" expectation is computed by `fields.filter((f) => f.name && f.value)`, a transcription of the production filter.
- **M6-e (Author): met.** `getTimerCount()` is 0 after unmount, before and after the first tick; a zero count also rules out a setter firing later. CR-24 stands outside.
- **M6-f: met.** Members `undefined`, `0`, `1`, `255`, `0x00ff00`, `0xffffff` with literal hex; `m6f-truthiness-nonblack-fallback` reddens the `0` cell (implementer's capture).
- **M6-g: met.** The probe-found member `😶‍🌫️🏿` discriminates the one-argument comparator.
- **M6-h, M6-j, M6-k: met.**
- **M6-i: top level met; nested not discriminated** (QAF-31). The top-level cells assert the original's key at `idx` (`next[1]._key` is `'e1'`/`'c1'`); the four nested cells assert content order and that the copy's key differs from its neighbour, which a copy placed before the original also satisfies.
- **M6-l (i), (ii), (iii): met.** The adds from 39 complete (Section, Container, Action Row, and a container duplicate keeping all children); the nested adds are gated only by the parent's `canAddChild`. (ii) refuses 41 by nesting with the literal text. (iii) both consumers redden under the recursion mutant.
- **M6-l (vi): partly met** (QAF-30). Present and discriminated: no line at 40, the literal line at 41 and 44, the border (by `m6l-border-dropped`), the not-editing mount. Absent or undiscriminated: the add gate at 41, the place, the live drop, `/preview`.
  - **The border cell's form.** Phase 1 asked for the border compared between mounted states, never a class name read from the source. The cells compare `className` against `styles.errorBorder`, imported from the styles module, which is the key the text-length error also uses. That is a value import, not a source-text read, and `m6l-border-dropped` reddens 4 cases. Accepted as equivalent; no finding.

**Same-handoff refreshes** (recorded in their own documents):
- **M1** (`qa/015-bug-evaluation-fixes-m1-qa.md`): `i2-row-read-by-session-token` killed (8 of 12), `i4-user-count-unscoped` killed (6 of 10). QAF-26 RESOLVED.
- **M5-a to M5-g** (`qa/015-bug-evaluation-fixes-m5-qa.md`): `m5e-utc-getters` killed (2 of 9). QAF-29 RESOLVED. CR-19 refresh below.
- **M4** (`qa/015-bug-evaluation-fixes-m4-qa.md`): CR-17 refresh below.

## Findings

QAF-34 MEDIUM Phase 2 — M6-a preserves "a title renders no code block, unchanged" for both title parsers. Only the static parser has a cell.
- **Shown by:** mutant `m6a-title-codeblock-interactive` restores `codeBlock` to the interactive title rule set, and it survives the suite (`mutation-qa-r2*-476c633.txt`).
- **Where:** the interactive parser is wired at `EmbedTitle` and `EmbedField` as `interactiveParser={markdown?.interactive.parseEmbedTitle}`. Phase 1 § M6-a (rev 25 reconcile) asks for the preservation cell "static and interactive".
- **What a user would see under the mutant:** while the user edits an embed title, a fenced body renders as a code block in the editor, and not in Discord or the preview.
- **Required (implementer):** in `rules.multi-line-code-block.test.ts`, tighten the title case to cover `markdown.interactive.parseEmbedTitle` as well, as one `describe.each` over both title parsers. The case must be seen red under the mutant and green at the tip. Otherwise, show by execution that the mutant is equivalent.
- **Blocks:** M6-a's verdict. A behaviour the change claims to preserve has no assertion.

QAF-30 MEDIUM Phase 2 — M6-l (vi) is the owner's ruling (D32, D33), and four of its Phase 1 cells have no assertion that fails when the behaviour is lost.
- **(a) The add gate above 40.** D32: "the Add Component button and counter still hide at 40 and over". The cells check 38, 39 and 40 only. Mutant `m6l-add-gate-only-at-40` (`!==` for `<`) offers adds again at 41 and passes 17 of 17.
- **(b) The place.** D32: the line shows "following the text-length errors". Mutant `m6l-line-above-text-error` moves it above `v2TextError`'s line and passes 17 of 17. No cell mounts both errors.
- **(c) The live drop.** D32: "(N live)". No cell removes a component from 41 and reads the line and border again (Phase 1 (vi), "live").
- **(d) `/preview`.** D33: the line and border also show on `/preview`. The not-editing cell mounts the editor, not the page; `git grep -c -E 'limit is 40|components; the limit' 24ac49f -- src/app/preview src/app/message` finds no cell. Phase 1 (rev 23 reconcile) owes `/preview` at 41 (line and border) and at 40 (neither).
- **Required (implementer):** tighten `DiscordMessageEditor.component-limit.test.tsx`, plus one cell beside the existing `/preview` page tests.
  - (a) Add 41 (flat and nested) to "offers adds only below the limit" with `false`; seen red under `m6l-add-gate-only-at-40`.
  - (b) One mount with a text-length error and over 40: the components line is the next `.text-error` sibling after the text-length line, under the components; seen red under `m6l-line-above-text-error`.
  - (c) Mount at 41, re-render at 40 (the same root, new `message`): no line and no error border.
  - (d) The `/preview` page with a 41-component `data`: the literal line and the error border; with 40: neither.
  - Each new cell is seen red under a mutation of its own behaviour (the two named mutants for (a) and (b)), and green at the fix tip.

QAF-31 MEDIUM Phase 2 — M6-i's nested duplicate cells cannot tell a copy placed before the original from one placed after it. D9 places the copy "directly after the original".
- **Shown by:** `m6i-{actionrow,container,gallery,section}-copy-before` (`splice(idx, 0, clone)`) each pass their file's one case.
- **Why:** each cell asserts content order and `next[idx+1]._key !== next[idx]._key`. A copy before the original gives the same content order and also two distinct keys. Phase 1 § M6-i asks for "the original at `idx`". The top-level cells do this; the nested ones do not.
- **What a user would see under the mutant:** identical content, but the original's identity moves to `idx + 1`, so an item the user had focused or open (a menu, an edit panel) appears to move down after duplicating.
- **Required (implementer):** in each of the four files, capture the original's `_key` from the fixture and assert `next[idx]._key` equals it (as the top-level cells do), seen red under that file's mutant and green at the fix tip.

QAF-32 LOW Phase 2 — `EmbedFields.read-only-field-index.test.tsx`, "only the displayed fields are rendered", computes its expected keys with `fields.filter((f) => f.name && f.value)`. That is the production filter's predicate transcribed into the test (axiom E; the conventions' "Self-referential oracle" class).
- It still discriminates today, because the transcription is not imported. But a shared misreading of "displayable" would pass both.
- **Required (implementer):** replace it with a literal key list per `CASES` row (`['b']`, `['c']`, `['a', 'c']`, `['a', 'b']`), seen red under a one-token mutation of the production filter (`&&` → `||`). It rides QAF-30 and QAF-31's round and does not block on its own.

## Assumption Not Checked

This pass assumes that the Add Component menu behaves in Chrome as it does under jsdom with the suite's inert `ResizeObserver` stub. In the cells, at 39 the menu opens, offers Section, Container and Action Row, and a click completes the add. The cells assert that, but only under jsdom. It is not tested in a browser here, because a browser act needs steering's go.
- **Signature of its falsity:** in B-4's walk, at 39 components the Add Component menu does not open or does not offer Section, or the add does not complete.
- **Owner of closing:** UAT, through B-4.

## Blocking-condition register

B-4 is reconciled in the chain's register (`qa/015-bug-evaluation-fixes-qa.md`). It gains a `/preview` leg, which is code review's routed assumption: "the M6-l red line is visible in a real browser on Send and `/preview`". No row is minted. Rows inherited by M6 and not discharged: B-4 and B-5 (M6-a). Both are UAT's.

## Handoff

- **476c633 pass:** QAF-34 MEDIUM goes to the implementer (implementer-hooks-015), test-only. Then a scoped re-run of M6-a's title cells only, re-running `rules-title-i`.

- **Implementer (implementer-hooks-015):** QAF-30 and QAF-31 MEDIUM, QAF-32 LOW. All are test-only. Then a re-run of M6-b to M6-l on the round's diff, re-running the six survivors (`mutators/qa-m6-supplement.py`, driver `qa-sweep.sh`).
- **Verdict:** QA Failed for M6-b to M6-l at `24ac49f`, on suite coverage. No production defect was found.
