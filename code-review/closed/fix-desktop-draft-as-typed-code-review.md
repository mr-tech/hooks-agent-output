---
ID: n/a
Origin: fix-desktop-draft-as-typed
UUID: fa2fab0b
Reviewed-At: b68f94cda114bcef1efd59954aba321e246dd683 — repos=website
Status: Committed
Status-Detail: "Round 1 APPROVED_WITH_COMMENTS at b68f94c; CR-1 corrected by the fixer (record f25ef260). Committed at Stage 1 by devops; not released. The Assumption Not Checked was discharged at route 0 by QA's walk; its saved-message residue is row P-1 of handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md."
Round: 1
Verdict: APPROVED_WITH_COMMENTS
---

# Code Review: fix-desktop-draft-as-typed

**Plan Reference**: none (fixer chain). Scope statement: `steering/fix-desktop-draft-as-typed-rulings.md`, block "2026-11-21T10:43Z"
**Implementation Reference**: `agent-output/implementation/fix-desktop-draft-as-typed-implementation.md` (record commit `2a22bc93`, `Handoff-At: b68f94c`)
**Date**: 2026-11-21
**Reviewer**: `code-reviewer-fix-desktop-draft-as-typed`

## Changelog

| Date (UTC) | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T11:12 | steering-hooks (brief `steering/fix-desktop-draft-as-typed-brief-code-reviewer.md`) | Round 1: review website `b663b35..b68f94c`; under 20 production lines, so suite and red tests run here | Round 1: APPROVED_WITH_COMMENTS at `b68f94c`. 17 production lines (recounted). Red, green and 7 negative controls reproduced; full suite green at both SHAs, exit 0. CR-1 MEDIUM: User-visible flow 5 is wrong for an unset field, shown by a probe. The fixer corrects it before devops quotes the flows. |
| 2026-11-21T11:28 | devops-fix-desktop-draft-as-typed | Stage 1 closure | Status Committed, moved to code-review/closed/; no body change. CR-1 is closed (the fixer's correction, record f25ef260). The Assumption Not Checked (real-browser Slate emit; caret under the round trip) was discharged at route 0 by QA's pre-release walk (qa/fix-desktop-draft-as-typed-qa.md, `Verified-At` b68f94c); the saved-message route is carried by row P-1 of handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md (UUID 4bbe68a5), and the unmeasured per-keystroke cost (Next Steps) by handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md. |

## Stage start and tree identity

- Stage start: the implementation document at `Handoff-At: b68f94c` (website). `chain/fix-desktop-draft-as-typed` = `b68f94cda114…` at the start and the end of the review (`git rev-parse`). The base `b663b35` = `origin/master` (`git ls-remote origin master`).
- **The tree holds only the chain's commits, and no lint rewrite rides in them** (brief item). `git log --oneline b663b35..b68f94c` lists two commits, `9d60769` and `b68f94c`, and `b663b35` is their ancestor. `git diff --numstat b663b35 b68f94c` lists 6 paths: the 3 production files (4+1, 8+3, 5+2) and the 3 new test files. All are in the write set. The 75 files that the fixer's disclosed `eslint --fix` run touched are not among them. I read every hunk of the 3 production diffs (Change, below), and none is an autofix outside what the document lists. This shows the lint rewrite did not reach the commits. Whether the fixer restored the working tree completely is a working-tree matter that I did not check: the review reads the tree through `git show`.
- **Production lines added: 17** (numstat added column: 4 + 8 + 5). That is under 20, so QA Phase 2 is not in the set. Of the 17, 8 are the fix and the rest are the style commit: 3 inferred type arguments dropped (net 0 lines) and 2 `eslint-disable-next-line` lines.
- `system-architecture.md` exists (`ls` and `git -C agent-output ls-files`, both resolved against `/usr/local/bin/hooks/agent-output`).

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md`, `architecture/website.md` A-7
**Alignment Status**: ALIGNED

The change does not touch the draft store. Typed text reaches `message`, and the existing `MessageProvider` draft effect (`useValue`, the `[message]` effect) writes it through `messageDrafts.ts`, as A-7 requires. **Mirror claim checked** ("as `Mobile.tsx` does"): `ContentEditorMobile` passes `onChange` straight to `SlateEditor`. `ContentEditorDesktop` now sets local state and calls the same `onChange` with the same string. So the consumer receives the identical sequence, including the mount call. The 5 call sites of `DiscordContentEditor` (`git grep -l "<DiscordContentEditor"` outside tests: `Embed`, `ContentBody`, `TextDisplayEditor`, `EmbedField`, `EmbedTitle`; the six consumers in the scope statement count field name and value separately) all pass a setter. `useEmbedSetter` and `TextDisplayEditor`'s `setContent` build from a `latest` ref, which the per-render update keeps current, and mobile already drives them per change. No consumer needed a change. The image URL dialog and the JSON dialog are unchanged: `git diff --quiet b663b35 b68f94c -- src/components/ImageUploader.tsx 'src/app/message/m/[id]/_components/JsonModalBody.tsx'` exits 0.

## Hazards re-derived

- **2, the trim while typing: cleared.** The per-keystroke commit is the raw value (`EmbedAuthor` name field `onChange` calls `setName(value)`; `EmbedFooter` text field calls `setText(value)`), and the trim stays on blur (`onBlurWithin` / `onBlur`). `usePassedProp`'s effect gets back a prop equal to the local value set in the same batched event, so `setLocalProp(() => prop)` bails out and nothing is eaten. The negative controls `*-trim-per-keystroke` reproduce as killed (below). A second path could save the untrimmed mid-edit value: the `ctrl+s` save hotkey (`useRegisterHotkeys`, `edit/page.tsx`). It cannot fire inside the field, because react-hotkeys-hook 5.2.4 drops a contenteditable target unless `enableOnContentEditable` is set (`dist/index.js`: `s.target?.isContentEditable && !t?.enableOnContentEditable`), and the registration does not set it. The fixer's claim that "Save and Send blur first" holds for that path too.
- **3, caret: cleared by reading only.** `ContentEditable`'s re-sync effect depends on `inputProps.value`, which takes the same per-keystroke sequence as at base, because local state already changed per keystroke there. The round trip adds no re-sync. The caret was not observed in a browser (Assumption Not Checked).
- **4, a write on open: true, and it falsifies flow 5 for an unset field** (CR-1).
- **5, environment fidelity: complies.** The content-editor test replaces `SlateEditor` with a stub that holds the real contract (`SlateEditor`: `useEffect(() => { onChange(string); }, [string])`, which emits on mount and on each change). It does not assert Slate's typing under jsdom, and the document records the real path as outstanding item 1. One more property I checked: `SlateEditor`'s `memo` comparator excludes only `initialValue`. The new inline `onChange` therefore makes the comparator return false on each Desktop render, so the editor's effect always calls the latest closure. Nothing stale is held.
- **6, the leave-page warning:** it now fires mid-typing on desktop (`hasChanged` drives `useUnloadAlert`, the navigation guard and `usePusher`). This is stated in flows 1 and 7, and it is correct.

## TDD Compliance Check

**TDD Table Present**: No. The fixer's document form (fixer.md, "Sections") has no TDD Compliance table; its **Test** section carries a red run and a green run, and I checked that section in its place.
**All Rows Complete**: n/a
**Concerns**: None. Reproduced with the fixer's own driver (`controls/run.py`, which I read whole before running it), output under `verification/fix-desktop-draft-as-typed/review/controls-rerun/`:
- `red-base`: 10 cases ran and 8 failed, each on the defect. The 2 that pass are the trim-on-blur cases, which hold on both SHAs.
- `control-fix`: 10 of 10 passed, exit 0.
- Every one of the 7 negative controls was killed, with the same failing titles as the fixer's table, and none timed out.

The tests are spec-form, and the change fixes an intra-chain stated limit, not an escaped defect. None carries a bug-form title or a provenance line. The basenames match the positive form. A directory-named module segment for an `index.tsx` has precedent (`WebhookMenu.*`). I applied the ID-token class by hand to the 3 basenames and to the `describe`/`it`/comment lines (`grep -ciE` with the class regex): 0 hits each. Expectations are literals (`'Hello'`, `'a b'`, `'Ann'`), not computed from production. The author and footer tests drive the production `ContentEditable` reader (`textContent` on `input`). The `tabIndex = 0` jsdom accommodation is disclosed. No time-based test.

**Suite** (archive exports, `node_modules` symlinked, output to files, `verification/fix-desktop-draft-as-typed/review/suite/`):

| SHA | numTotalTests | passed | failed | testResults (files) | exit |
|---|---|---|---|---|---|
| `b663b35` | 2316 | 2316 | 0 | 159 | 0 |
| `b68f94c` | 2326 | 2326 | 0 | 162 | 0 |

**Comments.** `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=b663b35` reports 6 files examined, 3 of them test files: 0 FAIL, 0 CANDIDATE, 18 SKIP. 17 SKIPs are untracked `.playwright-mcp/*.png`, not examined. The 18th, "SKIP id-token, basename", is unchecked by the tool, and I covered it by hand (above). The two added `// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing` lines pass the comment gate. They are needed because `val || undefined` turns `''` into `undefined`, and `??` would not.

## Findings

### Critical
None

### High
None

### Medium

**CR-1 MEDIUM Round 1 Owner-facing record**: User-visible flow 5 says opening without typing leaves the message unchanged. For an unset field, opening alone changes it.
- **Location**: `implementation/fix-desktop-draft-as-typed-implementation.md`, § User-visible flows, item 5. The mechanism is `ContentEditorDesktop`'s `SlateEditor` `onChange`, which the mount call of `SlateEditor` reaches with `initialValue = _value ?? ''`.
- **Class**: A User-visible flow line, the text the owner reads with the release, states behaviour the tree under review does not exhibit.
- **Enumeration**: the 7 flows in that section, each checked against `b68f94c`. Flows 1 and 2: per-change reach is shown by test and by reading, and the real Slate path is not driven (Assumption Not Checked). Flows 3 and 4: the space is kept, shown by test and by controls; the caret is not observed. **Flow 5: false for an unset value.** Flow 6: true (dialog paths unchanged, `git diff --quiet` exit 0). Flow 7: true by reading (`usePusher(messageRef, reloadMessage, hasChanged, …)`). 1 hit. Blind spot: a flow whose truth depends on a real browser (Slate typing, caret) cannot be settled by this enumeration and is routed instead.
- **Issue**: The probe `verification/fix-desktop-draft-as-typed/review/probes/` builds on the fixer's content-editor harness and asserts flow 5 as written. At `b663b35` both cases pass. At `b68f94c`, "leaves an unset value unset on the message while the editor is open" fails with `expected '' to be undefined`, and the set-value case passes. `fast-deep-equal({content: undefined}, {content: ''})` is `false` (`probes/out/fast-deep-equal.txt`). So on desktop, focusing an empty field such as a new embed's description, without typing, makes `hasChanged` true. That writes a draft, arms the "Changes you made may not be saved." prompt on reload, and lets a save from another tab raise "Message Update Detected". At base the same state arose only once the editor closed, and mobile already does it on open, so the end state is not new. The fixer's own Diagnosis states it ("An unset `content` becomes `''` at open instead of at close"), but the flow the owner reads says the opposite. An owner who checks flow 5 on an empty field will see a prompt he was told he would not see.
- **Required Action**: correct the flow so that every line holds at `b68f94c`.
  - **Minimum**: rewrite flow 5 to say what happens. Opening an editor whose field already has text, without typing, leaves the message unchanged. Opening an empty field (for example a new embed's description) sets it to empty text. That counts as an unsaved change, so the reload prompt and a draft follow without typing, as closing the editor already caused before and as mobile does on open. No code change is required; the scope is "as mobile does". A record-only correction leaves `b68f94c` and this verdict's tree unchanged.

### Low/Info
None

## Verdict

**Status**: APPROVED_WITH_COMMENTS
**Rationale**: The code meets scope items 1-3 at `b68f94c`, mirroring mobile's wiring, with the trim kept on blur. Red, green, controls and the full suite reproduce. The one finding is in the owner-facing flow list, not in the code: the fix is a correction to the fixer's document before devops quotes the flows to the owner.

## Required Actions

1. CR-1: the fixer corrects User-visible flow 5 in its implementation document before devops quotes the flows with the release. It is a record-only edit, so `Reviewed-At` and this verdict stand.

## Assumption Not Checked

Round 1: This review assumes that in a real desktop browser the Slate editor emits `onChange` on each keystroke, and that the author and footer `ContentEditable` keep the caret in place under the per-keystroke round trip. It does not test either. Falsity signature: on desktop, text typed into an open content editor does not come back after a reload mid-typing, or the caret jumps (to the start, say) after each character in the author name or footer. Owner: the owner's own walk of User-visible flows 1-4, which devops quotes to him with the website `master` release (a Vercel production deploy, by steering's determination; devops's to establish at release). That walk exercises the path on any desktop-width window after the deploy.

## Next Steps

- CR-1 → `fixer-fix-desktop-draft-as-typed`: correct flow 5 (record only).
- Approval → `steering-hooks`. No QA Phase 2 (17 production lines). Next is devops for website `master`, on the owner's word, with the corrected flows and the Assumption Not Checked above routed to the owner's walk of flows 1-4.
- Per-keystroke draft-write cost (hazard 1) remains unmeasured. It is the fixer's outstanding item 3, and a debounce is OUT by the determination. I raised no finding on it.
