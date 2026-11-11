---
ID: n/a
Origin: fix-website-save-gate-embeds
UUID: 07e578ce
Reviewed-At: 460000b — repos=website
Status: In Review
Round: 1
Verdict: REJECTED
---

# Code Review: fix-website-save-gate-embeds

**Plan Reference**: none (fixer route). Scope: the bounded statement in
`/usr/local/bin/hooks/agent-output/steering/queue-hooks-briefs/fixer-save-gate-embeds-brief.md`.
**Implementation Reference**: `/usr/local/bin/hooks/agent-output/implementation/fix-website-save-gate-embeds-implementation.md` (record `522af59`)
**Date**: 2026-11-11
**Reviewer**: Code Reviewer (`code-reviewer-fix-website-save-gate-embeds`)

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T08:58 | steering-queue-hooks (brief `code-reviewer-save-gate-embeds-brief.md`) | Round 1: review the fix at `Handoff-At 460000b`, under-20 route (suite + red test run here) | Round 1 REJECTED on CR-1 (HIGH): the fix moves plan 013's owner-ruled row-E cell on the JSON surfaces, a design decision the fixer's brief required to be blocked on. The code is correct for the save defect, and the red and green runs reproduce. CR-2 (LOW, test placement) and CR-3 (LOW, 34 pre-existing lint FAILs, ruled lint-neutral and routed). Captures in `verification/fix-website-save-gate-embeds/code-review-round1/`. |

## Scope, identity and inputs

- **Tree**: website `460000b` (`git rev-parse HEAD` = `460000bbb67c…`, on `fix/website-save-gate-embeds`,
  `git status --short` empty). Re-verified at the start and the end of the review. Files were read
  via `git show 460000b:…`, and the runs used detached exports.
- **Criteria assessed this round**, as stated at round open: the bounded statement, *"A draft
  holding a Components V2 component plus embeds that are present but empty must not be saved in a
  state the send check refuses without the user being shown a choice"*, plus its fence. Neither
  has grown since.
- **Architecture read**: `architecture/website.md` W-1, W-2. `architecture/system-architecture.md`
  D-005, plus D-004 (cited by D-005). Plan 013's (`planning/closed/013-components-v2-editing-surfaces.md`)
  D13, D17 and M8 (the cell table, M8-A…G, and the readings), because `resolveContentLoss` is
  that milestone's resolver.
- **Files reviewed** (every file in the document's Change list; `git diff --numstat 6d78b19 460000b`
  re-run: `src/utils/index.ts` 1/1, `utils.disposition-resolver.test.ts` 19/1,
  `useApiMethods.save-choice.test.tsx` 82/0): all three. Also every caller of
  `resolveContentLoss`, `gateBeforePersist` and `applyDisposition` (`git grep` at `460000b`,
  non-test: 3, 3 and 8 sites).

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` (exists, read).
**Alignment Status**: MAJOR_DEVIATIONS (CR-1).

W-1 and W-2 / D-005 are met. The fix deletes nothing on its own: the user chooses through the
existing row-E options. The server is untouched. The deviation is from plan 013's decision table.
D17 (owner ruling over *"User submits JSON"*) and M8's cell partition define "content and/or
embeds" as `hasClassicContent` (M8 reading (1), carried from D13 reading (i)). The fix redefines
row E's embed limb as key presence (`embeds.length > 0`). Because the one resolver serves both the
persist gate and the two JSON surfaces, the redefinition reaches D17's own surface (CR-1). D-004
records that *"normalise the bit on every save-path writer"* was put to the owner and not taken,
because *"it would repair records silently"*. That is the precedent for one of CR-1's remedies.

## TDD Compliance Check

**TDD Table Present**: No. The fixer route (`~/.claude/agents/fixer.md`) does not carry one; the
document's Test section gives red, then green. `tdd-check.py` covers Python sources only: N/A.
**Red/green reproduced here** (under-20 route):
- Red tree = `460000b` with `6d78b19:src/utils/index.ts` (`red-tree.diff`). Running the two test
  files gives 5 failed / 31 passed, exit 1. The four gate cases fail with `expected false to be
  true`, and the DOM case with `expected [ … ] to have a length of +0 but got 1`. This matches the
  fixer's capture. The whole suite on the red tree gives 1130/1135, and exactly those 5 fail, exit 1
  (`suite-red-summary.txt`).
- Fix tree gives 36/36, exit 0. Whole suite 1135/1135, 117 `testResults` files, exit 0
  (`suite-summary.txt`). `pnpm run typecheck`: exit 0.

**Expectations independence**: the gate cases state `options` as literals. The sendability limb
calls the production `validateContentRequirements`, which is the send check the statement names,
not a transcription. The DOM case drives the real `useApiMethods`. Spec-form is correct: no escaped
artefact is cited (axiom B). No ID token is in either test file's basename, titles, comments or
added lines. The CLAUDE.md class was applied by hand because the tool SKIPs it; 0 hits.
**Concerns**: none in the tests. They assert the persist half only. No test asserts the JSON-surface
behaviour the change also moved (CR-1).

## Findings

### Critical
None.

### High

CR-1 HIGH Round 1
**CR-1 HIGH Round 1 Architecture Alignment**: The fix changes the owner-ruled row-E partition on the JSON submission surfaces, which the brief reserved as a design decision.
- **Location**: `src/utils/index.ts` `resolveContentLoss` (row-E condition) at `460000b`. It reaches
  `JsonModalBody` (the `useEffect` over `messageString`, and `commitLoad`) and the
  `NewMessageJsonInput` `useUpdateEffect`, through their `disposition.requiresChoice` branches.
- **Class**: A change to the persist gate's predicate that also changes the disposition D17/M8 rule
  for JSON submission. The cell partition is ruled per surface, and the shared resolver does not
  separate the persist question from the submission question.
- **Enumeration**: `git grep -n -E 'resolveContentLoss|gateBeforePersist' 460000b -- src
  ':!src/**/__tests__/**'` finds 3 direct `resolveContentLoss` consumers (`JsonModalBody` ×2,
  `NewMessageJsonInput`) and 3 `gateBeforePersist` consumers (`useApiMethods.saveMessage`,
  `SaveAsMenu.onSubmit`, `NewMessageModal.onSubmit`). Inside `src/utils/index.ts`, `applyDisposition`
  and `settledMode` also read it. The population of the change, measured by
  `code-review-round1/row-differential.mjs` over 800 exhaustive cells on both trees: **144 cells move
  (72 B→E, 72 C→E), 656 unchanged**. Every moved cell has V2 components beside embeds that are all
  empty by `hasClassicContent`, with blank or absent content. Reachability on the JSON surfaces is
  measured, not read: `import-shape-reach.txt` shows `discordMessageImportShape` keeps `{}`,
  `{title:''}` and `{fields:[]}`, and reduces `{_key}` to `{}`. Rows B/C before the fix become row E
  after it. The predicate cannot see consumers reached through a re-export or a future caller.
  `settledMode` (`computeLoadDiff`) is unaffected in value (`isMessageV2` returns `v2` for these
  cells, as `mode` did before).
- **Issue**: At `6d78b19` a pasted `{"components":[<container>],"embeds":[{}]}` landed as V2 with
  the empty embed dropped. That is M8-B (with the flag-added warning) or M8-C (silent), and it met
  M8-F's post-condition, because `applyDisposition` → `switchToV2` clears embeds. D17's governing
  principle is *"fail gracefully when no content will be lost"*, and an empty embed loses none.
  At `460000b` the same paste is held behind the "Choose which to keep" choice. The choice's text
  says the message has *"both Components V2 and classic content"*. Its *Save as Classic* option
  drops the user's components to keep an embed with nothing in it. Whether Discord accepts a
  Classic message whose only embed is empty is an unmeasured hypothesis. The persist-side defect is
  real and the fix closes it (red/green above). The JSON-surface change, though, is outside the
  bounded statement, whose subject is saving. It contradicts the cell table M8 registered under an
  owner ruling the owner said he *"will not hear another word about"*. The fixer's brief made any
  change *"beyond the choice already shown for mixed drafts"* a `BLOCKED:` item. These drafts are
  not mixed under the ruled partition, so the case should have been blocked. The fixer's document
  lists the change under User-visible flows instead. Magnitude: 144 of 800 corpus cells on two of
  the five JSON/persist surfaces. How many real pastes hit them is unmeasured.
- **Required Action**: eliminate the class by deciding, at the right owner, which partition the
  persist gate and the JSON surfaces each use. Then implement that decision and nothing else. The
  fixer cannot choose this.
  - **Decision (steering's, owner's where steering judges it so)**. Plan 013 states that its
    readings, including reading (1), are *"flagged here for steering and not put to the owner …
    correctable by one line each"*. The options:
    (a) **Accept the fix as written.** Correct M8 reading (1) so that row E's embed limb is key
    presence at every surface. The tree at `460000b` then needs no change for CR-1, the re-review is
    an identity sub-entry, and the owner's pre-release check (the rulings file already carries it)
    sees the new JSON-surface choice.
    (b) **Keep the ruled partition on the JSON surfaces.** The persist gate alone asks whenever V2
    components sit beside any embed, matching the send check, and `resolveContentLoss` reverts.
    This keeps D17's surface unchanged, but it gives row E two definitions. M8-F's parity (the two
    JSON surfaces) still holds. M8-G, though, defines its persisting-writer class as *"row E's
    cell"*, so (b) widens M8-G's class beyond M8-E's. That is a recorded split, not a silent one.
    (c) **The writers persist the settled disposition** (`applyDisposition(draft)` when the gate
    does not ask, as the JSON surfaces already do), so rows B/C drop the empty embeds at save. This
    keeps the ruled partition everywhere with one predicate. But it is a silent repair at the
    save-path writers, the shape D-004 records the owner as not taking for the bit. It would also
    clear the bit on a row-D save, which is the D19 shape and against D15/M7-a for stored records.
    A ruling is needed before anyone builds it. I do not recommend it.
  - **Minimum (whichever is decided)**: a test on each JSON surface for a V2 container beside `{}`
    that states the decided outcome (choice shown, or lands V2 with no choice). Its falsity
    signature: it fails under the other option's resolver. Place it beside the existing
    `JsonModalBody.conflict-resting-state` and `NewMessageJsonInput.conflict-resting-state` tests
    (extend them; do not add new files).

### Medium
None.

### Low/Info

CR-2 LOW Round 1
**CR-2 LOW Round 1 Test Conventions**: The new DOM test of `useApiMethods` sits under `src/utils/__tests__/`, not beside its module.
- **Location**: `src/utils/__tests__/useApiMethods.save-choice.test.tsx` at `460000b`. The module is
  `src/providers/MessageProvider/useApiMethods.ts`.
- **Class**: A test file whose module segment names a production module in another directory
  breaks the workspace rule that tests live beside the code they cover, under that code's `__tests__/`.
- **Enumeration**: for every `src/**/__tests__/*.test.ts[x]`, I looked up its module segment among
  the production `.ts[x]` basenames and kept those whose only matches sit outside the test's own
  directory. That gives 8 real members: `useApiMethods.save-choice` (new), `useApiMethods.json-editor-repair`,
  `usePusher.hash-parity`, `messageStore.dropped-set-report`, `messageValidity.predicate` (all under
  `src/utils/__tests__/`), and `cron.scheduled-selection` and `interactions-edge.signature-before-parse`
  (`src/server/api/__tests__/` vs `src/pages/api/`). The script also printed false positives where
  the path holds regex metacharacters (`[id]`) or the module is `page`; I removed those by hand.
  The predicate cannot see a test whose module segment names a function, not a file (e.g.
  `gateBeforePersist.thumbnail`, `loadDiff.*`).
- **Issue**: The fixer followed a misplaced sibling. `src/providers/MessageProvider/__tests__/`
  already exists, with `MessageProvider.transient-toast.test.tsx` driving `saveMessage` on a mounted
  provider and `helpers/mountMessageProvider.tsx`. The document names no existing covering test
  (CLAUDE.md, "Before adding a test").
- **Required Action**: Minimum, inside this fix's fence (the gate's callers' tests): move the new file to
  `src/providers/MessageProvider/__tests__/useApiMethods.save-choice.test.tsx`, unchanged in content.
  The pass set must match before and after. The 7 pre-existing members are outside the fence, and
  `INBOX.md` (entry of 2026-11-11 by this reviewer) routes them.

CR-3 LOW Round 1
**CR-3 LOW Round 1 Conventions**: `convention-check` reports 34 eslint FAILs on the touched files. All predate the chain base.
- **Location**: `src/utils/index.ts` (`import/no-cycle` on the `~/utils/messageMode` import;
  `no-nested-ternary` in `settledMode`), and `src/utils/__tests__/utils.disposition-resolver.test.ts`
  (26 `object-curly-newline`, 2 `import/first`, 4 `@typescript-eslint/no-non-null-assertion`).
- **Class**: eslint violations in files a fix touches, inherited from the base.
- **Enumeration**: `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website
  --since=6d78b19` gives 34 FAIL, 0 CANDIDATE, 1 SKIP. A second instrument, differently shaped:
  eslint `--stdin` over each touched file's blob at `6d78b19` and at `460000b`, compared as
  `file | rule | message` multisets, gives an identical 34. None falls on a changed line (test file:
  0 hits on line 9 or lines 204–221). The new test file has 0. This cannot see a finding that moved
  from one line to another with the same rule and message. The changed-line check covers that.
- **Ruling** (the brief put the deviation to me): the change is lint-neutral against its base,
  which is the standard the prior chain on this tree was released under (`6d78b19`, "keep the
  comment sweep lint-neutral against master"). Fixing whole-file debt here would widen a one-line
  defect fix past its fence. **Accepted. No action owed by this fix.** The 34 are routed to
  `INBOX.md` (same entry). One correction to the fixer's document: the 32 test-file findings are not
  all formatting. 6 are `import/first` and `no-non-null-assertion`. This does not move the ruling.

INFO, Round 1 (not numbered, no action): the fixer's out-of-scope observation (flag over classic
content, no V2 components) is the D19 shape, answered in the rulings file block "fixer handoff
received", item 1. A flag-only draft beside an empty embed and no V2 components (row C, persisted
unchanged, refused by `hasFlagV2 && embeds.length > 0`) belongs to the same flag class and goes to
the same destination. It is not this fix's.

## Verdict

**Status**: REJECTED
**Rationale**: CR-1 (HIGH) rejects. The fix is correct and well evidenced for the save defect.
Red and green reproduce, the suite and typecheck are green, and every mode-less `applyDisposition`
call (4 sites) sits behind a `requiresChoice` guard, so the wider row E throws nowhere. But the fix
also redefines an owner-ruled disposition on the JSON submission surfaces, which its brief
reserved for a decision. If steering decides CR-1(a), the tree needs no code change for CR-1, and
the re-review is a sub-entry of this round (identity plus the CR-2 move).

## Required Actions

1. **CR-1**: to steering for the decision (a), (b) or (c). Then the fixer implements the decided option
   and the Minimum's JSON-surface test.
2. **CR-2**: the fixer moves the new test file (any option).
3. **CR-3**: none (ruled, routed).

## Assumption Not Checked

Round 1: This review assumes that the "Choose which to keep" UI on the editor Save and the Save-as
dialog renders and works for these drafts the way it does for existing row-E drafts. I did not
drive either surface in a browser. The DOM test reaches `useApiMethods` state, not the rendered
dialog. If this is false, Save on a stored V2 message with an empty embed does nothing visible and
writes nothing, or the dialog shows no options. Owner: devops's pre-release walk with the owner
(the rulings file already carries his own check for this release), named again in Next Steps.

## Next Steps

- **steering-queue-hooks**: decide CR-1 (a)/(b)/(c), putting it to the owner if steering judges it his.
  Carry the Assumption Not Checked to the release step.
- **fixer-fix-website-save-gate-embeds**: CR-2 now. CR-1 once steering's decision arrives. Re-review
  is a sub-entry of Round 1.
- No devops hand-off until approval.

*Gate disclosure, Round 1*: the stamp-gate hook refused this document's first write because the
changelog stamp was typed, not read from the clock. I substituted the stamp with `date -u` output.
It is a gate whose remedy is the change it demands, so I satisfied it, not worked around it.
