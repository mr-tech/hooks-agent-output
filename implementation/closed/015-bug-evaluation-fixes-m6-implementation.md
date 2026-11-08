---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Committed
Status-Detail: "Committed with chain 015 (website b96e364 and preview-image-generator 8de2b53). Earlier detail is in the body and changelog."
Handoff-At: "476c633 — repos=website"
---

# Implementation 015 — M6 (editor components and markdown)

## Plan Reference

`agent-output/planning/015-bug-evaluation-fixes.md` § M6 at rev 21 (`3d193f9`) as read at resume; Decisions Register D1 to D30 read. Later revisions (22 to 24) touch M5-h only, which is held. QA Phase 1: `qa/015-bug-evaluation-fixes-qa.md` § M6 (last commit of that file when read: `c4e82b3`). Earlier deliveries: M0, M1, M2, M4 (`46a9cab`, `6c42032`), M5 (`23a621e`, `da24eb7`). M3 is removed (D30).

## Date

2026-11-08

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T08:00 | steering-hooks-015 → implementer-hooks-015 (message "Resume chain 015 at M6") | Implement M6, then M7, M8 | M6 coded in `dbaf58f`; its (i) cells and nested add cells in `4fbc920`; read-only error cell `e3d4821`. Fix-round items riding the same handoff: CR-17, CR-19 (`a665901`), QAF-26 (`13be10d`), QAF-29 (`24ac49f`), a dead-code removal and a discriminating emoji member (`ef5a9cc`). |
| 2026-11-08T09:06 | steering-hooks-015 → implementer-hooks-015 (messages: code review Round 14 `e0054f7`; QA M6 `a7dfb4d`; planner rev 25 `dd9e88a`) | Fix round: CR-22, CR-24, CR-25, QAF-30, QAF-31, QAF-32 | Delivery 2: CR-22 `9cc06d8`; CR-24 `4aa9d3a`; QAF-30 to QAF-32 `b608555`. |
| 2026-11-08T21:31 | devops-hooks-015 | Document closed | Status: Committed (was Active). Stage 1 closure: chain 015 committed on chain/015-bug-evaluation-fixes at website b96e364 and preview-image-generator 8de2b53, not pushed or merged. Moved to closed/. |

## Implementation Summary

Each fix lands at its finding's site; the property, not the example, is what the cells assert.

- **M6-a (F-38).** A fenced block of two or more lines now parses as a code block in `parseContent` and `parseEmbedField` (the content group is `[^\n][^]*?`, Discord's own). `parseEmbedTitle` is unchanged — see Outstanding Items 1.
- **M6-b (F-40, D8).** New `src/utils/isValidImageUrl.ts`: valid exactly when the part of the string before the first `?` or `#`, lower-cased, ends in `.png .jpg .jpeg .webp .gif .apng .tiff .webm`. `ImageUploader` imports it. The "Invalid url." text is unchanged.
- **M6-c (F-41).** `hasValidField` is now "some field has a name and a value", so a read-only embed with no content and no fields renders nothing.
- **M6-d (F-42).** `EmbedFields` takes each field's index in the full list before the read-only filter, and every action (set, delete, move left, move right) uses it.
- **M6-e (F-45).** `Author`'s clock is a `useEffect` that clears the timeout and the interval it started. The finding understated it: react-use's `useMount` ignores the function the callback returns, so the old `clearTimeout` never ran either.
- **M6-f (F-46).** The picker opens on `intToHex(initColor ?? 0)`: six digits for every colour, 0 included. No truthiness test is left on the colour.
- **M6-g (F-47).** The emoji alternation sorts longest first with a two-argument comparator.
- **M6-h (F-48).** `aria-expanded` equals the spoiler's visibility.
- **M6-i (F-49, D9).** A duplicated embed and a duplicated top-level component are inserted directly after the original, as the four nested editors already do.
- **M6-j (F-50).** A footer object without `text` renders (`footer?.text?.trim()`).
- **M6-k (F-37).** `UpsertMapMap.delete(key)` without an inner key removes the entry. The test is `innerKey === undefined`, like `get`, because a bare truthiness test would have made `delete(key, 0)` remove the whole entry.
- **M6-l (F-44, D10, D14).**
  - One counter: `countTotalComponents` is lifted from the editor into `src/utils/limits.tsx`, with a structural parameter (`readonly object[]`) and the same count as before.
  - `validateComponentCount` returns `Message has N components; the limit is 40.` when the total is over 40, and `validateMessage` returns it, so Send is blocked and the stored `valid` is false.
  - `MAX_TOTAL_COMPONENTS` moves from `constants/index.ts` to `constants/messageLimits.ts` (re-exported by `index.ts`, so no importer changes) so that `limits.tsx` stays free of the env module.
  - The editor shows the same text as a red line under the components, with the red border, whether or not it is editing (so also on the Send page and on `/preview`).
  - Every add still completes in full; the Add Component button and its counter are still hidden at 40 or more.

## Milestones Completed

M6-a to M6-l.

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | Steering's message "Resume chain 015 at M6 (editor components and markdown)" (cross-session, 2026-11-08, no stamp). Rev 21 had passed every pre-code gate (rulings `7e95151`). | Not a test |
| QA Phase 1 covers M6 | `qa/015-bug-evaluation-fixes-qa.md` § M6, Awaiting Implementation, last commit `c4e82b3` | The test files below |
| User-visible surface: flows recorded; decision flows asked first | Below. One decision flow (M6-l's error placement) went to steering; the owner chose "Agent: red line + red border" (rulings `c1be05e`) and later that it also shows on `/preview` (rulings `9f321b8`). | `DiscordMessageEditor.component-limit.test.tsx` |
| E-5 (no network in tests) | No M6 surface performs a request; every run was inside `unshare -rn` with lo up | The M6 tests |
| E-6, E-7, E-8 | TDD table; Test Execution Results | `verification/015/m6-*` |
| E-9 (nothing sent) | No walk and no live send at M6 | Not a test |

**User-visible flows** (product vocabulary; pattern ladder in brackets):

| Flow | Surface and trigger | What happens next | Rung |
|---|---|---|---|
| Multi-line code block | Read-only preview of a message, content or an embed field | Renders as a code block | 1: the same rule, regex only |
| Image URL | Image dialog (avatar, embed images, footer icon) | `.jpeg`, `.webp`, upper-case and query-string URLs are accepted; `a.png.html` and `.avif` are refused with the existing "Invalid url." | 1 |
| Empty embed | Preview / send page | An embed with nothing to show is not drawn | 1 |
| Field timestamp edit | Read-only preview | Writes the field it was made in | 1 |
| Picker | Embed and container colour | Opens on the stored colour, including black and any colour with leading zero digits | 1 |
| Emoji | Preview text | Skin-tone and joined emoji show as one emoji | 1 |
| Duplicate | Embed and top-level component menus | The copy appears directly after the original (D9) | 1: the four nested editors |
| Over-40 message | Editor, Send page, `/preview` | At 39, adding a Section completes (41 in all); Send is disabled; a red line "Message has 41 components; the limit is 40." with the red border shows under the components | 1: the text-length error lines of the same block. Owner chose it (rulings `c1be05e`, `9f321b8`) |

## Files Modified

| Path | Changes | Lines |
|---|---|---|
| `src/utils/markdown/rules.tsx` | code block content group | +1 −1 |
| `src/components/ImageUploader.tsx` | uses the shared validator; local one deleted | +1 −7 |
| `src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx` | `hasValidField` | +1 −1 |
| `.../EmbedEditor/EmbedFields.tsx` | index carried through the filter | +2 −1 |
| `.../Author.tsx` | `useEffect` with cleanup replaces `useMount` | +11 −6 |
| `.../EmbedEditor/ColorPicker/Picker.tsx` | `intToHex`; the callback moved out of the JSX (lint gate) | +20 −12 |
| `src/utils/markdown/emoji.tsx` | comparator | +1 −1 |
| `src/utils/markdown/components/MarkdownSpoiler.tsx` | `aria-expanded` | +1 −1 |
| `src/components/DiscordMessageEditor/index.tsx` | duplicates after; counter imported; error line and border | +9 −24 |
| `.../EmbedEditor/EmbedFooter.tsx` | `text?.trim()`; one pre-existing `||` rewritten (lint gate) | +2 −2 |
| `src/utils/maps/UpsertMapMap.ts` | `delete` | +2 −2 |
| `src/utils/limits.tsx` | `countTotalComponents`, `validateComponentCount`, in `validateMessage` | +28 −1 |
| `src/constants/messageLimits.ts`, `src/constants/index.ts` | `MAX_TOTAL_COMPONENTS` moved; `INVALID_URL_ERROR` added (CR-17) | +1 / ±1 |
| `src/utils/hooks/useValidateWebhook.ts`, `.../WebhookMenu/index.tsx` | `INVALID_URL_ERROR` (CR-17) | +2 −2 / +4 −1 |
| `src/providers/MessageProvider/usePusher.ts` | `useLatest(hasChanged)` (CR-19) | +3 −3 |

## Files Created

| Path | Purpose |
|---|---|
| `src/utils/isValidImageUrl.ts` | M6-b |
| `src/utils/markdown/__tests__/rules.multi-line-code-block.test.ts` | M6-a |
| `src/utils/__tests__/isValidImageUrl.extensions.test.ts` | M6-b |
| `.../EmbedEditor/__tests__/EmbedEditor.empty-embed-hidden.test.tsx` | M6-c |
| `.../EmbedEditor/__tests__/EmbedFields.read-only-field-index.test.tsx` | M6-d |
| `.../components/__tests__/Author.timer-cleanup.test.tsx` | M6-e |
| `.../EmbedEditor/ColorPicker/__tests__/Picker.default-colour.test.tsx` | M6-f |
| `src/utils/markdown/__tests__/emoji.longest-sequence-first.test.ts` | M6-g |
| `src/utils/markdown/components/__tests__/MarkdownSpoiler.aria-expanded.test.tsx` | M6-h |
| `src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.duplicate-placement.test.tsx`; `.../ComponentEditors/__tests__/{ActionRow,MediaGallery,Section,Container}Editor.duplicate-placement.test.tsx` | M6-i (two top-level, four nested) |
| `.../EmbedEditor/__tests__/EmbedFooter.missing-text.test.tsx` | M6-j |
| `src/utils/maps/__tests__/UpsertMapMap.delete.test.ts` | M6-k |
| `src/utils/__tests__/limits.component-count.test.ts`; `src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx`; `.../ComponentEditors/__tests__/ActionRowEditor.add-button.test.tsx`, `SectionEditor.add-text-display.test.tsx` | M6-l (counter and validator; editor behaviour at 38 to 41; adds complete) |
| `agent-output/verification/015/`: `m6-sweep.sh`, `mutators/m6-table.py`, `m6-sweep-summary-*.txt`, `mutation-m6*-*.txt`, `m6-*-first-run.txt`, `m6-*-green-run.txt`, `m6-enumerations-ef5a9cc.txt`, `m6-run-24ac49f.txt`, `m6-testresults-24ac49f.json`, `m6-convention-check-24ac49f.txt`, `m6a-blank-line-probe*`, `d28-seed-probes/`, `mutation-qaf26-*`, `mutation-qaf29-*` | Evidence |

## Patterns Extended

| Surface | Pattern extended (rung) |
|---|---|
| Existing tests named before adding | M6-j: `EmbedFooter.length-error.test.tsx` covers the length error only, so a sibling file names the new behaviour. M6-f/-c: `EmbedEditor.border-colour.test.tsx` covers the border; its mount recipe is reused. M6-l: `limits.send-gate-partition.test.ts` excludes the later stages, so the counter has its own file. QAF-26 and QAF-29 tighten the existing `auth.sign-out`, `shared.message-cap` and `formatMessageDate.same-day` files. |
| Mount recipe | `mountDom`/`unmountDom` and `press` from `components/__tests__/helpers` (rung 1); the child-stub idiom for the top-level editor (`vi.mock` of a child that records its props) is new to this suite, used where the real child needs a menu the case does not drive (rung 3: no existing stub of a child; the mock-only helper dir has none) |
| Shared validator | `validateComponentCount` beside `validateDisplayableTextCount`/`validateEmbedCharacterCount`, rendered the same way (rung 1) |
| Shared URL rule | `isValidImageUrl` beside `isValidUrl` in `~/utils` (rung 1) |
| Error line | the existing editor error block (rung 1) |
| Picker colour | `intToHex`, already used by `EmbedEditor` and `ContainerEditor` (rung 1) |
| Error boundary (held M5-h draft) | `react-error-boundary`, already a dependency (`~/components/ErrorBoundary`) |

## TDD Compliance

Mutants run through `verification/015/mutate-run.sh` in isolated exports (`EXPORT_ROOT` under the session scratchpad), network-isolated, named by SHA. Mutator table `mutators/m6-table.py`; driver `m6-sweep.sh`; summaries `m6-sweep-summary-4fbc920.txt` (all) and `m6-sweep-summary-ef5a9cc.txt` (the `m6b` and `m6g` re-run after `ef5a9cc`). First red runs against the unchanged code: `m6-node-first-run.txt` (M6-a, b, k; the emoji row passed), `m6-dom-first-run.txt` (M6-c, d, e, f, h, j), `m6i-first-run.txt`, `m6l-first-run.txt`. "No" under Written First is a control on code that already met the cell; each is closed by a named mutant.

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| fenced code block rule (M6-a) | `rules.multi-line-code-block.test.ts` | Yes | Yes | New file, first row; the run failed on assertions, not imports: `expected null to be 'foo\nbar'`, 8 of 12 cells red (two-line and three-line, with and without a tag, in two parsers); one-line cells and the `parseEmbedTitle` control green. Mutant `m6a-content-single-line`: 8 of 13 red | Yes |
| `isValidImageUrl` (M6-b) | `isValidImageUrl.extensions.test.ts` | Yes | Yes | ModuleNotFoundError (first row of a new module). Mutants: `m6b-substring-match` 5, `m6b-case-sensitive` 9, `m6b-query-kept` 4, `m6b-fragment-kept` 1, `m6b-jpeg-dropped` 3, `m6b-webp-dropped` 3, `m6b-avif-added` 1 cells red | Yes |
| `hasValidField` (M6-c) | `EmbedEditor.empty-embed-hidden.test.tsx` | Yes | Yes | `expected true to be false` for `{}` and `{fields: []}` (2 red); other cells are controls. Mutants `m6c-no-fields-counts-valid` 2, `m6c-name-or-value` 1 | Yes |
| `EmbedFields` indexes (M6-d) | `EmbedFields.read-only-field-index.test.tsx` | Yes | Yes | `expected "vi.fn()" to be called with arguments`, 9 of 16 red (set, delete, move). Mutants `m6d-set-field-first-slot` 4, `m6d-delete-first-slot` 4, `m6d-move-left-shifted` 2, `m6d-move-right-shifted` 4, `m6d-index-after-filter` 9 | Yes |
| `Author` clock (M6-e) | `Author.timer-cleanup.test.tsx` | Yes | Yes | `expected 1 to be +0` (a timer left after unmount), 2 of 3 red; the "ticks while mounted" cell green at the base. Mutants `m6e-timeout-not-cleared` 1, `m6e-interval-not-cleared` 1, `m6e-clock-never-ticks` 1 | Yes |
| `Picker` default colour (M6-f) | `Picker.default-colour.test.tsx` | Yes | Yes | `expected '#ff' to be '#0000ff'` and the 1 and 65280 members (3 red); 0, undefined and white green at the base, as QA predicted. Mutants `m6f-truthiness-nonblack-fallback` 2 (QA's discriminator for the 0 member), `m6f-unpadded` 5, `m6f-undefined-is-white` 1 | Yes |
| emoji replacer sort (M6-g) | `emoji.longest-sequence-first.test.ts` | **No** | Yes | The first four members passed at the base: under this V8 the one-argument comparator happens to order them. A probe (`/tmp` script, 11,250 keys) found 6 misordered prefix pairs, one of them `😶` before `😶‍🌫️🏿`; that member was added and fails under `m6g-sort-one-argument` (1 red; before it was added the mutant survived 4/4). Also `m6g-sort-removed` 4, `m6g-sort-ascending` 4. The row's No is closed by that mutant: an assertion-level red against the pre-change comparator | Yes |
| `MarkdownSpoiler` (M6-h) | `MarkdownSpoiler.aria-expanded.test.tsx` | Yes | Yes | `expected ['true','true'] to deeply equal ['false','true']`. Mutant `m6h-aria-inverted` 1 | Yes |
| duplicate placement, top level (M6-i) | `DiscordMessageEditor.duplicate-placement.test.tsx` | Yes | Yes | `expected 'e1' not to be 'e1'` (the original sat after the copy). The first run used the weaker key assertion; it was tightened to the position of both keys before the green run and is covered by `m6i-embed-copy-before` and `m6i-component-copy-before` (1 red each) | Yes |
| duplicate placement, nested (M6-i) | the four `*Editor.duplicate-placement.test.tsx` | **No** | Yes | Controls: the four nested editors already inserted after. Mutants `m6i-{actionrow,gallery,section,container}-copy-last` 1 red each. The Section fixture is a section of two (a Section holds at most three, and duplicating needs room), duplicating its first, which still tells "after the original" from "at the end" | Yes |
| `EmbedFooter` text (M6-j) | `EmbedFooter.missing-text.test.tsx` | Yes | Yes | TypeError on `footer.text.trim` (3 red). Mutant `m6j-footer-text-unguarded` 3 | Yes |
| `UpsertMapMap.delete` (M6-k) | `UpsertMapMap.delete.test.ts` | Yes | Yes | `expected Map{...} to be undefined`; and `delete('a', 0)` removing nothing is not asserted red at the base because the base ignores the inner key 0 (that cell failed: `expected 'a0' to be undefined`). Mutants `m6k-delete-without-inner-key-noop` 1, `m6k-falsy-inner-key-is-absent` 1 | Yes |
| `countTotalComponents`, `validateComponentCount` (M6-l ii, iii) | `limits.component-count.test.ts` | Yes | Yes | `TypeError: countTotalComponents is not a function` (first row of the export), then `expected '' to be 'Message has 41 components; the limit is 40.'`. Mutants `m6l-comparator-at-limit` (boundary 40/41), `m6l-nesting-recursion-removed`, `m6l-top-accessory-uncounted`, `m6l-child-accessory-uncounted`, `m6l-validate-message-skips-count`, `m6l-error-names-limit-not-total` all red in this file or its sibling | Yes |
| editor error line, border, add gating (M6-l) | `DiscordMessageEditor.component-limit.test.tsx` | Yes | Yes | The shown-line cells failed at the base (`expected undefined to be ...`). Mutants `m6l-editor-line-missing` 3, `m6l-editor-border-missing` 3, `m6l-editor-offers-at-limit` 3, `m6l-editor-counts-top-level-only` 2 (the depth members) | Yes |
| adds complete (M6-l i) | same file; `ActionRowEditor.add-button`; `SectionEditor.add-text-display` | **No** | Yes | Controls on behaviour the code already had (an add never consulted the total). Mutants `m6l-editor-add-refused-near-limit` 3, `m6l-actionrow-add-stricter` 1, `m6l-section-add-stricter` 1 | Yes |
| QAF-26 cells | `auth.sign-out.test.ts`, `shared.message-cap.test.ts` | Tightened | Yes | QA's survivors now fail: `i2-row-read-by-session-token` 8 of 12, `i4-user-count-unscoped` 6 of 10 (`mutation-qaf26-*-13be10d.txt`) | Yes |
| QAF-29 cells | `formatMessageDate.same-day.test.ts` | Tightened | Yes | `m5e-utc-getters` 2 of 9 red (`mutation-qaf29-m5e-utc-getters-24ac49f.txt`) | Yes |
| CR-19 `useLatest` | `usePusher.update-prompt.test.tsx` | Existing | Yes | Mutants re-expressed for the new form: `m5c-pusher-reads-render-flag` and `m5c-pusher-ref-never-updated`, 2 red each (`m5-sweep-summary-ef5a9cc.txt`) | Yes |

Equivalent mutant removed: `m6b-whole-path` (taking the path's last segment before `endsWith`) survived because `endsWith` of a suffix with no `/` is the same on the path and on its last segment. The slice was dead, so the code was simplified (`ef5a9cc`) and the mutant dropped from the table.

## Class Sweep

Each finding's class is defined by its effect over `src/` (and `bot/` where noted); the commands and full hits are in `verification/015/m6-enumerations-ef5a9cc.txt`. Residual = the same command re-run at `ef5a9cc` after the fix.

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| F-45 | `grep -rn -A12 'useMount(' src \| grep -E 'return \(\) =>\|return clear'` | 0 hits | No other `useMount` callback returns a cleanup that react-use would drop. Residual 0 |
| F-45 (timers) | `grep -rn 'setInterval(\|setTimeout(' src` outside tests | 14 | The only `setInterval` is `Author` (fixed). The 13 `setTimeout` sites are one-shot (`useMounted`, copy feedback, focus, hide-sidebar and similar): none re-arms or holds an interval, and a state set after unmount is a no-op in React 18+. Not applicable, reason stated |
| F-46 / M2-a | `grep -rn 'toString(16)' src`; the colour-truthiness grep | 2; 0 | `utils/index.ts:484` is `intToHex` (padded); `:515` is a hash, not a colour. No integer-colour truthiness test remains. Residual 0 |
| F-38 | grep of fenced-code regexes | 2 | `rules.tsx` static rule (fixed); the interactive rule's regex matches the fence line only, a different rule. Not applicable |
| F-40 | grep of extension checks by substring | 17 | All are literal URLs, placeholders or asset paths; no other validator tests an image extension. Residual 0 |
| F-42 | index taken after a filter before a map | 0 | Residual 0 |
| F-49 | `splice(idx, 0` | 0 | Residual 0 (the six handlers all insert at `idx + 1`; pinned by six cells) |
| F-47 | one-argument sort comparators | 0 | Residual 0 |
| F-48 | `aria-expanded` sites | 4 | `MarkdownSpoiler` (fixed); `EmojiList/Section.tsx` is `!collapsed` (correct); the two `StyledAccordionHeading` hits are class names. Not applicable |
| F-50 | property read after an optional chain | 2 | `guild?.emojis.length` and `anchor?.path.length`: both properties are always present on the typed object. Not applicable |
| F-37 | `delete(` in `utils/maps` | 8 | One production method (fixed); the rest are its test calls. The other maps inherit `Map.delete` |
| F-44 | counter and cap sites | 13 | One definition; `shapes.ts` caps the top-level array with the same constant (planned, unchanged) |
| QAF-26 / QAF-29 (class: a stub that answers whatever its parameters) | read of the two files' stubs and `grep -n "createCapturingDatabase(" ` in `src/server` tests | not enumerated beyond the two named files | Open: the same stub idiom is in other M1 files; QA's re-run decides whether the class needs more than the two named filters |

## Test Execution Results

| Command | Results | Notes |
|---|---|---|
| `verification/015/impl-suite-run.sh 24ac49f <scratch> m6` (isolated export, `unshare -rn`) | vitest 1029 tests, 1029 passed, 0 failed, 108 files (reporter `testResults` entries), **exit 0**; `pnpm run typecheck` (both programs) **exit 0**, 0 `error TS`; stderr 0 lines | Counts by `numTotalTests`; `m6-run-24ac49f.txt`, `m6-testresults-24ac49f.json` |
| `node ~/.claude/tools/convention-check.js website --since=7ce866b` | 101 files examined, 58 test files; **0 FAIL, 0 CANDIDATE, 3 SKIP** | SKIPs: `parseServerCookies.ts` (deleted at `6001f7f`), `tsconfig.test.json` (extension), the id-token basename check (no `TEST-CONVENTIONS.md` above the repo). I ran the negative form by hand over the 22 test files this round touched: the only hits are timestamps used as fixture data (`Author.timer-cleanup`, `EmbedFooter.missing-text`), the named exemption |
| Mutation sweep, `m6-sweep.sh 4fbc920` | 12 controls green; 55 mutants: 53 killed at the first run; survivors: `m6b-whole-path` (equivalent, dead code removed) and `m6g-sort-one-argument` (killed after the member was added); re-run at `ef5a9cc`: all `m6b` and `m6g` killed | Summaries as named above. The sweep predates `e3d4821`, `ef5a9cc` and `24ac49f`, which add test cells or a dead-code removal and touch no mutated line |
| Lint | `npx eslint` over the changed and new files: 0 error, 0 warning | See gate satisfaction |

**Gate satisfaction, disclosed.**
1. `eslint --fix` ran on named new test files only (import brace style, member delimiters).
2. Two pre-existing lines in files I touched were rewritten to clear the whole-file check: `Picker.tsx`'s over-long `onChangeComplete` (the callback moved out of the JSX) and `EmbedFooter.tsx`'s `val || undefined` (now `val === ''`, same result for a string).
3. `DiscordMessageEditor.component-limit.test.tsx` stubs `ResizeObserver` with a no-op constructor, only so Headless UI's menu mounts under jsdom; no assertion depends on it firing (the Environment-fidelity convention: recorded here, not asserted).
4. The comment gate: no source comment was added.

**Compatibility.** No dependency or lockfile moved (`git diff da24eb7 24ac49f -- pnpm-lock.yaml package.json` is empty). The held M5-h draft would use `react-error-boundary`, already installed.

## Outstanding Items

1. **Plan premise for M6-a.** The plan says every fenced block parses in `parseContent`, `parseEmbedField` and `parseEmbedTitle`. `parseEmbedTitle` is built with `omit(..., ['codeBlock', 'heading', 'list'])` — deliberately, as Discord's titles carry no code blocks. I fixed the rule where it is live and left the title unchanged, with a control cell that a fence in a title is not a code block. For the planner: restate M6-a's title member, or confirm the omission. QA Phase 1's "each through each of the three parsers" has the same wording.
2. **Follow-up, not in the plan, not changed: a blank line inside a fence.** ```` ```\nfoo\n\nbar\n``` ```` still renders no code block in `parseContent` and `parseEmbedField` (the paragraph rule splits at the blank line before the code rule sees the fence). Probe: `verification/015/m6a-blank-line-probe-run1-24ac49f.txt` (blank line inside: no code block; the same text with no blank line: code block). Severity MEDIUM for users (blank lines in code are common), but a different mechanism from F-38 (the paragraph rule, not the content group), so I did not fold it under D28. For the planner.
3. **RK-1's differential** (Discord's rule against the shipped regex, over tags such as `c++`, empty bodies, an unterminated fence) is QA Phase 2's, as Phase 1 states. Not run here.
4. **M6-l (iv)** is a stated limit (stored `valid` rows before the release); nothing here re-derives them.
5. **Not human-observed.** M6-c leaves an empty `<article>` wrapper (zero height, no content) where the hidden embed was; the cell checks the content is not drawn. A walk (B-4, B-5, UAT) is the instrument for what a user sees. No Playwright act was done.
6. **M5-h (CR-18) is held.** Steering holds the fix until plan rev 24's round passes. My draft (parse inside a try, plus an error boundary around the editor) and its red run `m5h-wrong-shape-first-run.txt` exist; the draft files are parked outside the tree and nothing is committed. For the planner: `{"embeds":""}` and `{"embeds":[{"fields":""}]}` crash the real page (reproduced with `cr-m5-probes/run-real.sh` at `da24eb7`), so a guard built only on `makeEditable` throwing does not cover them.
7. **D28 seed probe** (planner's request): `verification/015/d28-seed-probes/report.md`. Both seeds are mount-only; webhooks arrive after mount on a first visit; whether a folder switch remounts the modal is unestablished (needs a browser read and a Playwright go).
8. **Owed from earlier rounds.** QAF-20 (before the effort-final QA pass): the `useParsePathname` describe and the two `formatKey` self-comparison cases in `bugFixCoverage.supplemental.test.ts`, the "0000" discriminator, the split into behaviour-named files. Not started. QAF-27 LOW (M1-i cells) not started.
9. **Downstream premises.**
   - M6-a: the preview now draws multi-line code blocks, so M8's `/preview` screenshots of messages with such blocks change.
   - M6-l: new saves of a message over 40 components get `valid = false`, which the v1 API serves (chain 012's `valid` field); older rows keep their stored value (X-13).
   - M6-b: images with `.jpeg`, `.webp` or upper-case extensions become acceptable in the editor; `.avif` stays refused.
10. **Self-diagnosis (method).**
    - (a) I first wrote the M6-l error-line placement into the plan's "the error names the count" without checking where the editor would show it; I caught it on reading the editor and asked.
    - (b) I added the emoji cell from the plan's wording ("a longer sequence with a shorter prefix") using members I picked by eye, and they passed at the base. The check I should apply sooner: a cell for an engine-dependent behaviour needs a member that the engine actually gets wrong, found by a probe, before it counts as a red.
    - (c) I took the finding's description of F-45 ("cleanup is `clearTimeout` only") as the defect; the dependency's source showed the cleanup never ran at all.
    - (d) I put a plan example ("a blank line inside") in a first test and removed it when it was a different mechanism; the probe is kept as evidence.

## Next Steps

Code review of `dbaf58f..24ac49f` (M6, plus CR-17 and CR-19 against M4 and M5-c), then QA Phase 2 for M6. QA's re-runs: M1 with the QAF-26 cells (`13be10d`) and M5-e with the QAF-29 cells (`24ac49f`). M5-h after steering lifts the hold. Then M7 and M8.

## Delivery 2 — Round 14 and QA fix round

**CR-25 reconcile note (2026-11-08T09:06).** The Plan Reference above says revisions 22 to 24 "touch M5-h only". That was wrong: rev 22 added M6-l (vi) (D32), and rev 23 added (ii)'s one literal and (vi)'s `/preview` limb (D33). The M6-l code in delivery 1 was built to rev 24, which carries all of them. M6-a is read at rev 25 (`dd9e88a`): parseContent and parseEmbedField only, the title being a preservation cell (CR-23).

### Fixes

- **CR-22 (M6-a).** The paragraph rule now takes a whole fence as one unit. `rules.tsx` has one `FENCE` pattern, used by the code block rule and inside the paragraph rule's match, so a blank or whitespace-only line inside a fence no longer ends the paragraph before the fence closes. The reviewer's preferred "fence at block scope ahead of the paragraph rule" would not cover a fence that follows text in the same paragraph (the reviewer's probe lists the member "text, a newline, then a fence with an empty line inside") ); this does, and one pattern decides a fence in both parsers. Reviewer's probe `cr-m6-probes/run-fence.sh` re-run at `1968281`: 21 of 21 rows say "code block" (`fence-members-run2-1968281.txt`); the two controls hold.
- **CR-24 (F-45's class).** `BottomPortal` and `ColorPickerWrapper` use `useEffect(() => () => …, [])`; `react-use`'s `useMount` was dropped at both. `no-restricted-syntax` (off before) now refuses a function returned from a `useMount` callback, in the concise form and the block form. **The control was observed to fire:** a planted file with four `useMount` bodies drew exactly two errors, on the two returning forms (lines 4 and 5), and none on the block body or `onMount?.()`; the rule over `src` and `bot` then finds 0. Reviewer's `usemount-cleanup-sweep.sh` at `1968281`: 4 call sites (one commented out), concise-form members empty, positive control 1 (`usemount-cleanup-sweep-1968281.txt`).
- **QAF-30.** Four cells: (a) totals of 41 flat, 42 flat and 41 nested are added to "offers adds only below the limit" with `false`; (b) one mount with a text-length error and over 40 shows the two lines in that order, as literals; (c) a mount at 41 re-rendered at 40 shows neither the line nor the border; (d) the `/preview` page with 41 components shows the literal line and the error border, with 40 neither.
- **QAF-31.** In the four nested editors' duplicate cells, the original's `_key` is read from the fixture and the copy's slot is asserted against it.
- **QAF-32.** `EmbedFields.read-only-field-index`'s "only the displayed fields are rendered" takes a literal key list per row (`['b']`, `['c']`, `['a', 'c']`, `['a', 'b']`) instead of the production predicate.

### TDD Compliance

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| fence rule, blank-line members (CR-22) | `rules.multi-line-code-block.test.ts` (tightened) | Yes | Yes | Against the unchanged `rules.tsx` (`24ac49f`), 14 of 27 red (`m6a-fence-blank-line-first-run.txt`): 7 members in each parser (`expected null to be 'foo\n\nbar'`). Mutant `m6a-paragraph-splits-fence`: the same 14 red | Yes |
| portal entry released on unmount (CR-24) | `BottomPortal.unmount-cleanup.test.tsx` | Yes | Yes | New file, first row; assertion level: `expected 'Pick oneportal body' not to contain 'portal body'` (`m6-cr24-first-run.txt`); the mounted-content cell is a control. Mutant `m6e-bottomportal-cleanup-dropped` 1 red | Yes |
| scroll lock released on unmount (CR-24) | `ColorPicker.scroll-lock-release.test.tsx` | Yes | Yes | New file, first row; `expected true to be false` for the lock after the picker is removed while open; the lock-while-open cell is a control. Mutant `m6e-colorpicker-cleanup-dropped` 1 red | Yes |
| QAF-30 (a) to (d) | `DiscordMessageEditor.component-limit.test.tsx`; `page.invalid-data.test.tsx` | Yes | Yes | Not red at the code (the behaviour was already right: controls); each is discriminating under a mutant: QA's `m6l-add-gate-only-at-40` 3 red, `m6l-line-above-text-error` 1 red, and mine `m6l-count-error-computed-once` 1 red (c) and `m6l-count-error-only-when-editing` 1 red (d) | Yes |
| QAF-31 | the four `*Editor.duplicate-placement.test.tsx` | Yes | Yes | QA's `m6i-{actionrow,container,gallery,section}-copy-before`: 1 red in each file | Yes |
| QAF-32 | `EmbedFields.read-only-field-index.test.tsx` | Yes | Yes | Mutant `m6d-displayed-fields-or` (`&&` to `||` in the production filter): 1 red | Yes |

Sweeps: `m6-sweep-summary-4aa9d3a.txt` (CR-22, CR-24 mutants and their controls), `qaf30-qa-sweep-summary-b608555.txt` (QA's seven mutants and the control), `qaf30-own-sweep-summary-b608555.txt` (mine).

### Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-22 (a multi-line construct the paragraph rule can cut at a blank line) | `git grep -n 'inlineRegex\|blockRegex\|anyScopeRegex' a1456c9 -- src/utils/markdown/rules.tsx` | 24 lines in `m5hi-m6fix-m7-m8-enumerations-a1456c9.txt` | The fence is fixed. Blockquote and heading are block rules with their own line patterns (a quote spans lines by `\n *> `; a blank line ends it, as in Discord). Inline code (`:295`) is commented out; spoiler (`:436`) is `(.*?)`, one line by construction; strikethrough `[\s\S]+?` can span lines but is not a fence. **Not probed:** whether Discord lets a spoiler or `~~` span a blank line; that is outside M6-a's property and is a follow-up, not a defect I can show |
| CR-24 / F-45 (a function returned from a `useMount` callback) | the reviewer's `usemount-cleanup-sweep.sh` at `1968281`, and `npx eslint src bot -f unix` filtered for the rule's message | 4 call sites; concise-form members 0; lint hits 0 | The 4 remaining sites return nothing (`Button`, `useMounted`, `DiscordMessageEditor`'s `onMount?.()` whose type is `VoidFunction`) or are commented out. Residual 0. **Not seen by either predicate:** a callback passed by reference, an aliased import. The F-45 row of delivery 1's Class Sweep ("residual 0") was a false negative and is corrected by this row |
| QAF-31 (a placement cell that cannot tell before from after) | the four duplicate-placement files | 4 files | All four now assert the original at its slot |
| QAF-32 / QAF-26 (an expected value built from the production predicate or from the stub's own answer) | `grep -n 'filter(' ` over the M6 test files | read of the two files named | Fixed in the named file; other M6 files were read for the same pattern and hold literals. Not enumerated beyond them |

### Test Execution Results and Outstanding

Gate: one run at `476c633` covers every delivery (1118 of 1118, 114 files, exit 0, typecheck exit 0; see the M7 document). Outstanding: the interactive (editing) parser's fence rule is a different rule (line-by-line) and was not probed; CRLF line ends were not probed (the reviewer lists both as not seen). Self-diagnosis (method): my delivery-1 F-45 sweep followed the flagged site's spelling (`return () =>`), so a concise form passed unseen. The check I should apply sooner: derive the predicate from the library's behaviour (what a returned value does) and include a positive control that plants each form.
