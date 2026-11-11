---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Status: Blocked
Status-Detail: "Code review Round 1 REJECTED at 460000b (code-review/fix-website-save-gate-embeds-code-review.md). CR-2 done at website 08b0d7f. Blocked on CR-1: steering-queue-hooks carries the row-E partition decision (options a/b/c); no code change for CR-1 until it reaches me. Then re-handoff for the Round 1 re-review."
Handoff-At: 460000b — repos=website
Origin-Chain: 013
---

# fix-website-save-gate-embeds — implementation

## Scope statement

Relayed by `steering-queue-hooks` in
`steering/queue-hooks-briefs/fixer-save-gate-embeds-brief.md`. The route is the owner's selection of
2026-11-11 (`steering/queue-hooks-rulings.md`, block "selections 5 to 8", prompt 7: "Agent: re-check,
scope a fix (Recommended)"), which was put to him as: *the save check and the send check disagree on
near-empty embeds, so a pasted V2 component plus an empty embed saves in a state that cannot be
sent, with no choice shown to the user.*

> One defect, repository `website` only. A draft holding a Components V2 component plus embeds that
> are present but empty must not be saved in a state the send check refuses without the user being
> shown a choice.
>
> In: `src/utils/index.ts` (`hasClassicContent`, `resolveContentLoss`, `gateBeforePersist`),
> `src/utils/limits.tsx` (`validateContentRequirements`), their tests under `src/utils/__tests__/`,
> and the gate's three callers only where its wiring requires. Out: `src/server/**`;
> `project-utils`; `preview-image-generator`; the V2-emptiness class
> (`handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`); the unreachable
> choice UI in the New Message dialog
> (`handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`).

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/queue-hooks-rulings.md`, block "2026-11-11T08:33Z — re-checks at website `6d78b19` and the scoping determinations", paragraph "Held item 4, save check versus send check: the `fixer` agent". Relayed by the brief above, with its route. |
| 2 | Bounded scope statement | Quoted above. |
| 3 | Fix branch | `fix/website-save-gate-embeds`, read by `git -C website branch --show-current` as my first act. HEAD `6d78b19`, `git status --short` empty. |

Read at start: the brief whole, the two rulings blocks, the lifecycle `SKILL.md` and its
`documents` and `seams` references, and the workspace `CLAUDE.md` (Test Conventions). Not read:
`architecture/website.md` W-1/W-2 and `system-architecture.md` D-005. I used them only as the brief
states them (W-1: no serialiser deletes user content on its own; W-2: saving in a bad state is
allowed and the server does not gate it).

## Diagnosis

**Cause.** The row-E decision in `resolveContentLoss` (`src/utils/index.ts`, introduced by `92ce026`,
"013 M8 EC-3: pure resolver and persist gate") asks for a choice only when
`hasClassicContent({content, embeds})` is true. `hasClassicContent` (from `344e7b4`) ignores an embed
whose every key other than `_key` is empty. `validateContentRequirements`
(`src/utils/limits.tsx`) counts every embed (`embeds.length > 0`). So for V2 components beside `{}`,
`{title:''}`, `{_key}` or `{fields:[]}`, the gate settles to row B/C with `mustAsk: false`. The
editor's Save (`useApiMethods.saveMessage`) and the Save-as menu (`SaveAsMenu.onSubmit`) then persist
the draft unchanged, and the send check refuses it with "Components V2 messages cannot contain
embeds or content."

**Instrument.** The red run under Test below: `gateBeforePersist` returns `mustAsk: false` for all four
shapes, and the mounted `useApiMethods` writes the draft on Save with no choice. Those are the same
four shapes the 013 probe named (`verification/013/probe-cr16-persist-gate/divergence.txt`).

**Reachability (from a read of the code paths, not run).**
- In the editor, Add Embed (`DiscordMessageEditor`, `setEmbeds([...embeds, {}])`) shows only in
  Classic mode. V2 components can be added only in V2 mode. The Classic→V2 switch (`switchToV2`)
  clears embeds. Both JSON load paths (`JsonModalBody.commitLoad`, `NewMessageJsonInput`) apply the
  disposition, which clears embeds for a settled V2 draft. Every load into the provider
  (`MessageProvider`: `getOne`, `getFromCode`, the local store) runs `detectMessageMode`, so a draft
  holding V2 components opens in V2 mode, where Add Embed is hidden.
- No UI route builds the draft. It is reached through a **stored message** (or a local-store draft)
  that already holds V2 components beside an empty embed: one written by an older build, or through
  the API, which does not gate saves (W-2). Opening such a message and pressing Save re-persisted it
  unchanged.

**Residue in production.** The failing call is the `message.upsert` write. Before this fix it
persisted such a draft unchanged, and nothing ran before or beside it. Any stored message in that
state stays as it is: this fix repairs no stored row, but the next editor Save or Save-as of such a
message now shows the choice. Whether any stored rows have this shape is the owner's to check
against the live database. I have not read it.

**Direction (inside W-1).** The gate now agrees with the send check, and only where V2 components
are present: any embed beside them makes the draft row E. The choice shown is the existing
mixed-draft choice ("Save as Components V2 — This will drop your embeds." / "Save as Classic — This
will drop your Components V2 components."). Nothing is dropped without the user choosing it. I
rejected the other direction (have the send check ignore empty embeds) because the draft would then
reach Discord carrying both an embed and the V2 flag. `hasClassicContent` is unchanged, so the
editor's mode-switch confirmation and rows A/C/D behave as before.

**Observed on the way, not absorbed (code read, not run):** the same symptom on another predicate
pair. A stored draft with the V2 **flag** set, classic content, and no V2 components settles to row D
(`mustAsk: false`). The editor's Save persists it unchanged with the flag, and
`validateContentRequirements` refuses it (`hasFlagV2 && hasContent`). This is outside the bounded
statement (no embed is involved), so I sent it to steering for re-scoping.

## Change

- `src/utils/index.ts`: row E's condition in `resolveContentLoss` becomes
  `hasComponents && (hasContent || (embeds?.length ?? 0) > 0)`. 1 line changed.
- `src/utils/__tests__/utils.disposition-resolver.test.ts`: one `it.each` (4 cases) in the
  `gateBeforePersist` block. 19 lines added, 1 import line changed.
- `src/providers/MessageProvider/__tests__/useApiMethods.save-choice.test.tsx`: new, a DOM mount of `useApiMethods`. Added at `460000b` under `src/utils/__tests__/` and moved here unchanged at `08b0d7f` (CR-2).

No caller changed: each of the three already routes `mustAsk` to its choice UI.

**Declined work, routed.** A held save goes to `pendingSaveChoice` (editor) or `pendingChoice`
(Save-as) and runs when the user picks an option (`commitSaveChoice` → `applyDisposition(draft,
mode)` → `upsertMessage`), or is dropped on Cancel. The DOM test follows one held save to its write.
This hold existed before the fix and the fix adds no new lifetime, so no exit table is owed.

## Test

Spec-form. The defect shipped in 013's release, but no incident record cites it, so per axiom B the
tests state the behaviour, not the bug.

- **Red** (final test text at `6d78b19`'s `src/utils/index.ts`, in an isolated export
  `git worktree add --detach … 6d78b19`, with the two test files copied in, then removed):
  `npx vitest run src/utils/__tests__/utils.disposition-resolver.test.ts src/utils/__tests__/useApiMethods.save-choice.test.tsx`
  → 5 failed / 31 passed, exit 1. The four gate cases fail with `expected false to be true` on
  `mustAsk`. The DOM case fails with `expected [ … ] to have a length of +0 but got 1`: the save
  wrote at once. Capture: `verification/fix-website-save-gate-embeds/red-run.txt`; the export's tree is
  in `red-tree.txt`.
- **Green** (shared tree, the fix applied): same command → 36 passed, exit 0.
  `verification/fix-website-save-gate-embeds/green-run.txt`.

## Verification

| Check | Result | Capture (`verification/fix-website-save-gate-embeds/`) |
|---|---|---|
| Whole suite, `npx vitest run --reporter=json` | 1135 / 1135 passed, 0 failed, 117 files; process exit 0 | `suite.json`, `suite-run.txt` |
| `pnpm run typecheck` (both programs) | exit 0 | `typecheck.txt` |
| eslint over the three touched files | exit 1, 34 findings. All 34 already exist at `6d78b19`: linting each file's base blob through `--stdin` gives the same 34 (file · message · rule), so none is on a changed line. The new test file has none. | `lint.txt`, `lint-base.txt` |
| `convention-check.js website --since=6d78b19` | 34 FAIL (the 34 eslint findings above), 0 CANDIDATE, 1 SKIP | `convention-check.txt` |
| Build verification | The workspace `CLAUDE.md` names no pinned-build check for `website`. `next build` not run. No package-manager operation, so the lockfile has no diff. | — |

**Deviation, disclosed:** the convention check's rule is "every FAIL fixed". I left the 34
pre-existing findings unfixed. Two are in production code outside the change (`import/no-cycle` at
`index.ts:17`, a module-structure question, and `no-nested-ternary` at `index.ts:258`). The other 32
are in the existing test file: 26 formatting (`object-curly-newline`), 2 `import/first`, 4 `no-non-null-assertion` (corrected per the code review's CR-3; this document first called all 32 formatting). Fixing them would widen the diff well beyond the
named defect. The change is lint-neutral against `6d78b19` (above). The reviewer may rule otherwise.

**SKIP, unchecked by the tool:** the ID-token and basename checks did not run. Read by eye: the new
basename `useApiMethods.save-choice.test.tsx` matches the positive form, and no title in either file
carries an ID token.

## User-visible flows

- **Editor → Save** on a stored V2 message that carries an empty embed: the "Choose which to keep"
  prompt now appears, where before it saved silently in a state that could not be sent.
- **Save as…** on the same message: the same prompt, in the Save-as dialog.
- **Editor → JSON → Load**, and the **New Message dialog's JSON tab**, with pasted JSON holding V2
  components plus an empty embed: these now offer the same choice (dismissed first, reopenable),
  where before they silently loaded as V2 and dropped the empty embed. This is the existing
  mixed-draft choice appearing for a draft the send check also calls mixed. No other notice changes.
- **New Message dialog → Save** (bot, webhook or code tab) on such a draft: unchanged. It was
  already blocked by the content-floor error (the out-of-scope handoff on the unreachable choice).

## Handoff

- SHA: website `460000b` on `fix/website-save-gate-embeds`.
- Reviews: `code-reviewer-fix-website-save-gate-embeds`. Under 20 production lines, so no QA Phase 2:
  the reviewer also runs the suite and the red test (the red needs `6d78b19`'s `src/utils/index.ts`
  in an isolated export, never the shared tree).
- Merges: devops at release, under the owner's approval. The fix branch is deleted after the merge.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-11T08:44 | fixer | Document created. Fix committed at website `460000b` (commit time). Handed off to code review. |
| 2026-11-11T09:01 | fixer | Code review Round 1 REJECTED at `460000b`. CR-2: test moved to `src/providers/MessageProvider/__tests__/` at website `08b0d7f`, sha256 unchanged; pass set identical before and after (1/1 passed, exit 0 both; `verification/fix-website-save-gate-embeds/move-compare.txt`); typecheck and eslint exit 0 after. CR-3 lint-breakdown correction applied. CR-1 held for steering's decision. Status → Blocked. |
