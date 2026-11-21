---
ID: n/a
Origin: fix-desktop-draft-as-typed
UUID: fa2fab0b
Status: Active
Status-Detail: "Handed off to code review at b68f94c; code review alone (17 added production lines, under 20). Merge is devops's at release, on the owner's word."
Handoff-At: b68f94c — repos=website
Origin-Chain: none
---

# Fix — desktop text drafted as it is typed

## Scope statement

The owner's words come through steering's determination (`steering/fix-desktop-draft-as-typed-rulings.md`, block "2026-11-21T10:43Z", which quotes his selections in `steering/fixer-queue-2026-11-21-rulings.md` blocks "05:50Z", "Agent: save as you type (Recommended)", and "05:59Z", "Agent: all typed text (Recommended)"). The route is this fixer chain → code review → devops for website `master`. Bounded scope, quoted from the block:

1. On desktop, text typed into the open content editor reaches the message as it is typed, as on mobile, so the existing draft effect (`MessageProvider/index.tsx` L188-198) stores it; every consumer of `DiscordContentEditor` inherits this.
2. The embed author name and the footer text reach the message as typed. The trim they apply today happens where it does not eat a space the user is still typing (hazard 2).
3. The image URL dialog and the JSON dialog keep committing on their button (unchanged).

## Entry Conditions

| # | Condition | Where |
|---|---|---|
| 1 | Scoping determination naming this agent | `steering/fix-desktop-draft-as-typed-rulings.md`, block "2026-11-21T10:43Z" (record commit `39dd56f`); relayed in `steering/fix-desktop-draft-as-typed-brief-fixer.md` and `-brief-common.md` |
| 2 | Bounded scope statement, write set and exclusions | Same block: "Scope statement (bounded)", "Write set", "Exclusions" (a debounce, an unload flush and the two dialogs are OUT) |
| 3 | Fix branch | website `chain/fix-desktop-draft-as-typed`, cut by steering from `origin/master` `b663b35`. `git branch --show-current` printed `chain/fix-desktop-draft-as-typed` at session start |
| 4 | Record on the mechanism | `architecture/website.md` A-7 (L305-318: drafts go through `messageDrafts.ts`, and plan 017 M3's write matrix holds); `architecture/system-architecture.md` L131, L181. The sweep: `verification/fix-desktop-draft-as-typed/scoping/sweep.md`. This change does not touch the store, and the write-matrix row "An edit at route 0 (typed, …) \| written (`message` effect)" is now true of desktop too |

## Diagnosis

**Cause.** Each of the three surfaces held typed text in local state and passed it to the message only when it closed or blurred. The draft effect watches `message`, so it never saw text that was still being typed:

- `src/components/DiscordContentEditor/Desktop.tsx` at `b663b35` L95: `SlateEditor onChange={setLocalValue}`, local state only. `onChange(_value)` runs only in `_onClose` (L45-48, `onBlurWithin`). Mobile (`Mobile.tsx` L98-99) passes `onChange` straight to `SlateEditor`.
- `EmbedAuthor.tsx` at `b663b35` L136: `ContentEditable onChange={setLocalUsername}`. `setName(localUsername.trim())` runs only in `onBlurWithin` (L58-61).
- `EmbedFooter.tsx` at `b663b35` L118: `ContentEditable onChange={setLocalText}`. `setText(localText?.trim())` runs only in `onBlur` (L123).

**Instrument.** I read each code path (lines above), then ran the red test (Test, below): at `b663b35` the parent's value is still the old one after typing (`expected 'Old' to be 'Hello'`, `expected 'Old' to be 'Ann'`, `expected [] to deeply equal [ 'H', 'Hi', 'Hi ' ]`).

**Origin-Chain.** `git blame` at `b663b35` puts the three lines in `4fe53b6` (2023-08-22), `4f67ca7` (2023-02-23) and `4ff6b46` (2023-10-19). All three predate the pipeline's chains, so `none`.

**Consumers of the typed value, now that it reaches `message` on each change** (read from code at `b68f94c`):

| Consumer | Before (desktop) | After |
|---|---|---|
| Draft effect, `MessageProvider/index.tsx` L188-198 | runs on close/blur | runs on each change: `writeRouteZeroDraft` at route 0; `removeDraft` when data equals the saved data; else `writeDraft`. Same form, written more often (hazard 1; not re-measured; a debounce is OUT) |
| `hasChanged` (`MessageProvider` L125-128) → leave-page warning (`useUnloadAlert`, `edit/page.tsx` L103), navigation guard (L132), `usePusher` (L321) | false while typing until close | true as soon as typed text differs from the saved message. **A reload, or leaving the page, mid-typing on desktop now raises "Changes you made may not be saved."**, and the in-app navigation guard and the remote-update prompt see the edit. Mobile already behaves this way. This answers hazard 6: at base the warning did not fire, because the typed text was not yet in `message` |
| Message preview and other readers of `message` | updated on close | updated per change, as on mobile |
| `usePassedProp` in Desktop / EmbedAuthor / EmbedFooter | local only | the prop comes back equal to the local value just set. `setLocalProp(() => prop)` is a same-value update, so React bails out |
| `ContentEditable` re-sync effect (L36-40, hazard 3) | input value = local state, changed per keystroke | the same string per keystroke (local is set first, and the round trip sets it to an equal value). Its dependency `inputProps.value` takes the same sequence of values as at base, so the round trip adds no re-sync. The caret is not observed in a browser (outstanding item 2) |
| Author name / footer trim (hazard 2) | trim on blur | unchanged: trim on blur. The per-keystroke commit is the raw value, so a space being typed stays (test case "keeps a trailing space…"; negative control `*-trim-per-keystroke` killed it) |

**Base compared with fix, behaviours that are new:**

- *Open writes once (hazard 4).* `SlateEditor` calls `onChange(string)` on mount (`components/SlateEditor/index.tsx` L58-59). The setters do not bail out on an equal value (`useStateSetter`, `utils/hooks/index.ts` L93-102, always builds a new object). So opening the desktop content editor now calls the message setter with the current text and runs the draft effect once. At base the same write happened at close (`_onClose` → `onChange(_value)`), and mobile already does it at open. For a field that already has text, the data is equal: for a saved message that is a `removeDraft`, and otherwise it rewrites equal data with a new `editedAt`. For an unset field (`undefined`) the data is not equal. Opening sets it to `''`, `typedDeepEqual` treats `undefined` and `''` as unequal, and so `hasChanged` turns true, a draft is written and the leave-page prompt is armed. At base the same `''` was set at close. So the state is the same one base reached, but it now arrives at open instead of at close. The reviewer's probe shows this (`verification/fix-desktop-draft-as-typed/review/probes/`: passes at `b663b35`, fails at `b68f94c` with "expected '' to be undefined").
- *Untrimmed mid-edit values.* While the field has focus, the embed author name and footer text in `message` are the raw typed value, which can carry a leading or trailing space until blur. A reload mid-edit restores that raw value from the draft. Save and Send are pressed outside the field, which blurs it first and commits the trimmed value. The footer's display path trims already (`displayText`, `EmbedFooter.tsx` L45). Nothing new is sent; the raw value is only held between blur commits.

**Residue in production.** The handoff names a stated limit, not an escaped defect. No write ran wrongly: before the fix, typed text was simply never drafted. So no production state needs correcting. The release is a Vercel deploy of client code. A tab opened before the deploy keeps the old bundle until it reloads, and every tab loaded after the deploy drafts as typed.

**Lifetimes, declined work, irreversible effects.** The change adds no lifetime (no listener, timer, lock or entry), declines no work, and adds no irreversible side effect: the localStorage draft writes already existed and are reversible.

## Change

- `src/components/DiscordContentEditor/Desktop.tsx`: `SlateEditor`'s `onChange` sets the local value and calls the `onChange` prop with the same string, as `Mobile.tsx` does (+4 −1).
- `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx`: the name field's `onChange` sets local state and calls `setName` with the raw value; blur still commits `trim()` (+4 −1). In a separate style commit, two inferred type arguments are dropped and two existing `||` sites get a per-line `prefer-nullish-coalescing` disable, so that `convention-check.js` passes (+4 −2; no behaviour change, since `??` would change how `''` is handled).
- `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx`: the same for the footer text; blur still commits `trim()` (+4 −1). The style commit drops one inferred type argument (+1 −1).
- Tests (new, spec-form): `src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx`, `…/EmbedEditor/__tests__/EmbedAuthor.typed-name-reaches-embed.test.tsx` and `…/EmbedEditor/__tests__/EmbedFooter.typed-text-reaches-embed.test.tsx`. Before adding tests I looked for existing ones on these surfaces. The only ones are `EmbedFooter.length-error` and `EmbedFooter.missing-text`, which cover other behaviours. There was no `DiscordContentEditor` or `EmbedAuthor` test.

Commits on `chain/fix-desktop-draft-as-typed`: `9d60769` (fix and tests) and `b68f94c` (style). **Production lines added: 17** (`git diff --numstat b663b35 b68f94c` added column over the three production paths: 4 + 8 + 5), which is under 20, so code review alone (the reviewer also runs the suite and the red tests).

Item 3 is unchanged by construction. `git diff --quiet b663b35 b68f94c -- src/components/ImageUploader.tsx 'src/app/message/m/[id]/_components/JsonModalBody.tsx'` exits 0. The existing tests on those surfaces pass at both SHAs (they are in both full-suite runs below): `src/components/__tests__/ImageUploader.enter-scope.test.tsx` (`setImage` is called on Save / Enter) and `src/components/__tests__/ImageUploader.url-validation.test.tsx` for the image URL dialog, and the `JsonModalBody.*` tests under `src/app/message/m/[id]/_components/__tests__/` for the JSON dialog.

## Test

All under `verification/fix-desktop-draft-as-typed/`.

**Red run.** `controls/run.py`, row `red-base`: a `git archive` export of `b663b35` with the three test files overlaid from the fix commit. 10 cases ran and 8 failed, each on the defect itself (`controls/out/red-base.stdout`, `.json`, `table.json`):

- content editor: "puts text typed into the open editor on the message before the editor closes", "puts each successive edit on the message as it is typed"
- author: "puts a typed name on the embed author while the field still has focus", "…on an embed that had no author…", "keeps a trailing space the user is still typing on the embed author name"
- footer: the three corresponding cases.

The earlier in-tree red run of the first draft of these tests is kept in `red-base-in-tree.txt`; it was taken before any production edit.

**Green run.** Row `control-fix` at `b68f94c`: 10 of 10 passed, exit 0. The in-tree run is in `green-fix-in-tree.txt`.

**Negative controls** (`controls/run.py`, each in its own `git archive` export of `b68f94c`, with `node_modules` symlinked; output to files; the process group is killed at exit or after 240 s; table in `controls/out/table.json`):

| Control | Mutation | Killed (failing cases) |
|---|---|---|
| `desktop-stale-value` | `onChange(str)` → `onChange(_value)` | both content-editor cases |
| `author-trim-per-keystroke` | `setName(value)` → `setName(value.trim())` | the trailing-space case |
| `author-stale-value` | `setName(value)` → `setName(localUsername)` | the 3 as-typed author cases |
| `author-no-blur-trim` | blur `localUsername.trim()` → `localUsername` | "commits the typed name trimmed when the field loses focus" |
| `footer-trim-per-keystroke` | `setText(value)` → `setText(value.trim())` | the trailing-space case |
| `footer-stale-value` | `setText(value)` → `setText(localText)` | the 3 as-typed footer cases |
| `footer-no-blur-trim` | `onBlur` `setText(localText?.trim())` → `setText(localText)` | "commits the typed footer text trimmed when the field loses focus" |

Two cases pass at the red run: the trim-on-blur cases, which show the "trim where it does not eat a space" half of item 2 and hold at both SHAs. Each is killed by its `*-no-blur-trim` control. I wrote a third base-passing case ("leaves the typed text on the message when the editor closes") and then dropped it: at the fix tree no single control turns it red, because the per-change call makes the close commit redundant. The diff adds no guard clause.

**Values the tests supply instead of production (Iron Law 5):**

- The content-editor test replaces `~/components/dynamics/SlateEditor` with a stub that keeps the real contract read at `components/SlateEditor/index.tsx` L58-59: `onChange(initialValue)` on mount, and `onChange(string)` per change. The strings are invented. If the real editor did not emit per change, the test would pass while desktop still lost typed text on reload. Slate under jsdom is not checked to accept typed input (hazard 5), so the real typing path is outstanding item 1, for the owner's check. `EmojiPicker`, `Markdown`, `MarkdownProvider`, `useCustomEmojis` and `IsMobileProvider` are stubbed to mount the desktop branch.
- In the author and footer tests, the real `ContentEditable` reads `textContent` on `input`, so the reader is the production one. The test writes `textContent` instead of the browser's typing. A browser writes a trailing space in a contenteditable as U+00A0, and `String.prototype.trim` strips that too. The test sets `tabIndex = 0` on the field because jsdom does not make a contenteditable focusable as a browser does. Without it `focus()` cannot reach react-aria's focus-within, which checks `document.activeElement`.

No time-based test was added.

## Verification

- **Existing suite** (`npx vitest run --reporter=json`, the whole suite): base `b663b35` ran 2316 cases, 2316 passed, 159 files, exit 0 (`suite-base.json`). Tip `b68f94c` ran 2326 cases, 2326 passed, 162 files, exit 0 (`suite-fix.json`, `suite-fix-console.txt`). The difference is +10 cases and +3 files, the three new files.
- **Build verification**: `pnpm run typecheck` (both `tsc` programs) exits 0 at the tip (`typecheck-fix.txt`). The workspace's `CLAUDE.md` names no other build check (no `verify-pinned-build.sh`, no pinned dependency). `next build` was not run. There was no package-manager operation and no lockfile change.
- **Lint**: `npx eslint <the 3 production files and 3 test files> --max-warnings=0` exits 0 (`lint-fix-tree.txt`). `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=b663b35` gives 0 FAIL and 0 CANDIDATE (`convention-check.txt`). Its 18 SKIPs are 17 untracked `.playwright-mcp/*.png` files, which are another session's and were not examined, plus "SKIP id-token, basename", which did not run. For that check I applied `CLAUDE.md`'s ID-token class by hand to the three basenames and every `describe`/`it` title in them, and found no match. The new files carry no comments.
- **Disclosure: the lint script rewrote the shared tree, and I restored it.** The repo's `lint` script is `eslint --fix . --max-warnings=0`. I ran `pnpm run lint` once, at about 10:58Z, and it rewrote 78 tracked files. Porcelain immediately before it listed only my 3 modified files and my untracked tests, so every other hunk came from that run. I saved the whole diff (`lint-fix-accident.diff`, file list `lint-fix-accident-files.txt`) and wrote the other 75 files back from `HEAD` with `git show HEAD:<path> > <path>`. I reverted the autofix hunks in my own 3 files by hand. Porcelain afterwards listed only my 3 files and `.playwright-mcp/`. The lint fixes later committed in `b68f94c` were made deliberately, in my files only. Lint since then has run without `--fix`.

## User-visible flows

These are for the owner's own check (no UAT runs). Each happens on a desktop-width window:

1. Message content: open the content editor, type, and reload before clicking away. The typed text comes back from the draft. Reloading mid-typing now raises the browser's "Changes you made may not be saved." prompt.
2. The same in an embed title, description, field name, field value, and a Text Display inside a Section and inside a Container.
3. Embed author name: type a name with a space in it ("a b"). The space can be typed, and the preview shows the name as it is typed. Reload before clicking away and the name comes back. Click away and surrounding spaces are trimmed.
4. Embed footer text: the same as 3.
5. Opening the desktop content editor on a field that already has text, without typing, leaves the message unchanged. Opening an empty field (for example a new embed's description) sets it to empty text, and that counts as an unsaved change: a draft is written and a reload raises the leave-page prompt. Closing already did this before the fix, and mobile does it on open.
6. Image URL dialog and JSON dialog: typed text still applies only on Save / Load (unchanged).
7. While typing on desktop, a save of the same message from another tab now raises "Message Update Detected", as it does on mobile, because the edit counts as an unsaved change as soon as it is typed.

## Outstanding items

1. The real Slate editor's typing path under the fix is not driven by any test (jsdom fidelity, hazard 5). The User-visible flows, items 1-2, are the check.
2. Caret position in the author and footer fields under the per-keystroke round trip has not been observed in a browser. By code reading, the value sequence is unchanged (Diagnosis, `ContentEditable` row). The check is User-visible flows, item 3.
3. Per-keystroke draft-write cost on desktop has not been re-measured (hazard 1). A debounce is OUT by the determination; a measured cost that needs one goes back to steering.

## Handoff

- SHA: `b68f94c` (website, `chain/fix-desktop-draft-as-typed`, no upstream).
- Review: `code-reviewer-fix-desktop-draft-as-typed`. With 17 production lines there is no QA Phase 2, and the reviewer runs the suite and the red tests (`controls/run.py` reproduces both: `python3 controls/run.py <website> <work> <out>`).
- Merge: devops, into website `master` (Vercel production), on the owner's word asked in its own session.
- Delivery: at 11:10Z `ListAgents` listed no `code-reviewer-fix-desktop-draft-as-typed` session, so the spawn cue went to `steering-hooks` (msg `9a107bcc-bc37-423a-8700-623d39aade7c`).

## Changelog

| Date (UTC) | Rev | Change |
|---|---|---|
| 2026-11-21T11:04 | 1 | Document created at handoff: diagnosis, red run at `b663b35`, fix `9d60769` and style `b68f94c`, 7 negative controls killed, suite / typecheck / lint green, the lint-script rewrite and its restoration disclosed; handed to code review at `b68f94c`. |
| 2026-11-21T11:13 | 2 | CR-1 (code review Round 1, `code-review/fix-desktop-draft-as-typed-code-review.md`, record `488b209`) corrected; the code is unchanged. User-visible flow 5 previously said "Opening the desktop content editor without typing leaves the message unchanged. It drafts the same text, which closing already did." That is false for an unset field: opening sets it to `''`, which counts as a change. Flow 5 now separates a field that has text from an empty one. Class sweep: `grep -n -i "unchanged\|equal\|no new state\|not a new state"` over this document gave 10 hits. Two had the same error: flow 5, and the Diagnosis line "The data is equal, so for a saved message it is a `removeDraft`… This is new timing, not a new state", now rewritten for the unset case. The other 8 are true as written: item 3 and the two dialogs, a test assertion quote, the draft-effect row, `usePassedProp`, `ContentEditable`, the trim row, and outstanding item 2. The earlier wording followed the Diagnosis's equal-value reading, which held only for a field with text. |
