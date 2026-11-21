---
UUID: 4bbe68a5
Status: Addressed
Status-Detail: "P-1 read on hooks.gg 11:36:35Z-11:37:33Z by qa-fix-desktop-draft-as-typed: HOLDS. On saved message 6008, at desktop width in a fresh tab, typed content and author-name text came back after a reload and the leave prompt fired; the pre-push baseline was lost and no prompt. This settles QA's Assumption Not Checked. Closed Addressed by qa on steering-hooks' brief. The source handoff (f1356f4b) is steering's to close at the chain's closure."
Owning-Stage: qa
Review-Trigger: "the production deploy of website master carrying fix-desktop-draft-as-typed (the E-WEBSITE-PUSH row of this record's event ledger filled) — then P-1"
Secret-Files: none
---

# fix-desktop-draft-as-typed post-deploy row (P-1)

## What is seeded

The fixer chain `fix-desktop-draft-as-typed` ships website `master` (Vercel production by git integration; `website/.github/workflows`
is absent) from `b663b35` to the chain tip `b68f94c`. On desktop, text typed into the open content editor, the embed author name and
the footer reaches the message as it is typed, so the existing draft effect stores it (as on mobile). Before the fix the text was held
in local state until the editor closed or blurred, and a reload before then lost it. The row is the one Assumption Not Checked of QA's
pre-release walk (`qa/fix-desktop-draft-as-typed-qa.md`, "Assumption Not Checked": the walk was on route 0, a new message, with no
database; the saved-message route `/message/m/<id>/edit` goes through `writeDraft` / `removeDraft` by deep equality and was not
walked), and it reads the stated limit of plan 017's B-9 (`handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`, row B-9 PASS
with "text typed into the still-open content editor was lost on a reload"). The register is point-in-time; this record's `Result` line
is authoritative on execution state. The row does not gate the release act.

**Why it is here and not run by devops.** The reader needs a signed-in Discord test account on live hooks.gg. The devops session
carries no `mcp__playwright__*` tools (ToolSearch for them returned none), and the `discord-test-browser` skill forbids loading them
from a session not launched with `--browser`; the `qa` and `uat` stage agents carry that browser. So there is no crontab line (the
row is event-form, not timed, and a headless launcher run has no signed-in browser): the reader is a qa-role session
(`qa-fix-desktop-draft-as-typed` walked the same flows at route 0) that steering starts or wakes after devops's release-complete cue.
The precedent is `handoff/closed/fix-get-one-absent-not-found-post-deploy-2026-11-21.md`. Screenshots stay untracked and are never
committed. The reader reads `~/.claude/skills/discord-test-browser/test-estate.json` first and writes only to the row's `Result`
and the changelog below. **Not allowed: Save, Send or any production write on hooks.gg.** The reader never writes the event ledger;
devops does, at Stage 2.

## Event ledger (devops writes; a reader never edits it)

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-21T11:32:56Z to 11:33:01Z (`release-move.js` exit 0; `ls-remote` read back `b68f94cd…` at 11:33:03Z) | website `master` → `b68f94cda114bcef1efd59954aba321e246dd683` (was `b663b354fb236c3ee58d8b0be01778e1908e0e10`) | devops, Stage 2, on the owner's release approval at the Phase 2B prompt, answered 2026-11-21T11:32Z (`deployment/closed/fix-desktop-draft-as-typed-deployment.md`; captures `verification/fix-desktop-draft-as-typed/devops/release-move-real.txt`, `post-move-readback.txt`) |

## Row

### P-1  (qa-role session, signed in as the Discord test account)

- **Class**: post-deploy-observable
- **Condition**: scope items 1 and 2 of the determination on the saved-message route, in production, at desktop width: on an existing
  saved message of the test account, text typed into the open content editor and into an embed's author name survives a reload done
  before clicking away, and the leave-page prompt fires on that reload.
- **Precondition**: a saved message owned by the test account on production, at `/message/m/<id>/edit` (plan 017's B-9 walk used
  `6024`; whether it still exists is unread; any saved message of the test account serves). If none exists, the row is reported
  **NOT EXECUTED** to `steering-hooks` and is **not** satisfied by creating one.
- **Instrument**: in the stage browser (Chrome, 1440x900), signed in as the test account on `https://hooks.gg/message/m/<id>/edit`.
  Type a short suffix at the end of the content editor (e.g. ` QA after one`) and into an embed's author name (e.g. `a b`; add an
  embed or an author only if the saved message has none **in the local state, never saved**), reload with the field still focused and
  read: the text in the field, and whether a `beforeunload` dialog is raised (register **no** auto-accept dialog handler on the page;
  as a control, the QA walk's runs A-C in `verification/fix-desktop-draft-as-typed/qa/leave-prompt-and-field-results.md` raised it on
  the fixed build). Afterwards type each field back to its saved text (or remove the added author) so the draft is removed, reload
  once more and read that no draft remains. **No Save.**
- **Baseline (taken before the push by qa-fix-desktop-draft-as-typed, 2026-11-21T11:28:12Z to 11:29:32Z)**: the same steps on
  production's unfixed build, `verification/fix-desktop-draft-as-typed/devops/baseline/production-baseline-2026-11-21.md` (record
  `f04ee116`). Observed as predicted: typed text lost after the reload and no prompt, for the content editor (` QA base one`) and the
  author name (` a b`); the positive control (typed, clicked away, reload) raised the prompt. **Use message `6008`** (the test account's
  classic message with content and two embeds, saved author name empty): `6024` answers "doesn't exist or no access" for this
  account. **Cleanup note from the baseline:** typing the suffix back out and clicking away did not clear the `6008` draft on the
  unfixed build (the page still judged the message changed; cause not established). The baseline removed only the `6008` entry from
  `localStorage.messageDrafts` (a browser-local write), left the other entries (`6020`, `0:vqjq7pvgfv`) and confirmed a final reload
  with no dialog. The after-read may do the same: remove only its own `6008` entry and say so; the type-back is tried first and its
  result recorded.
- **Subject / fallback**: qa through the stage browser / the owner by the same page.
- **Earliest decidable**: Vercel production serves a website build whose commit contains `b68f94c`. Establish it from the event ledger
  above and from the first read in which typed text survives; a loss before the first survival is the old build still serving or a
  tab opened before the deploy (it keeps the old bundle until it reloads), not a falsifier: reload the tab, wait a short while and
  read again before calling it.
- **Predicted**: typed text is present in both fields after the reload, the leave prompt fires on it, and after the type-back the
  draft is gone. This is QA's flows 1 and 3 at the saved route.
- **Falsifier**: after the new build serves (on a freshly loaded tab), the typed text is gone after the reload. Then the saved-message
  route does not behave as route 0 did, and the fix did not reach it. A falsifier goes to the owner through `steering-hooks`.
- **Owner**: qa. **Result**: **HOLDS**. Read 2026-11-21T11:36:35Z to 11:37:33Z by `qa-fix-desktop-draft-as-typed` on message
  `6008`, in a fresh tab. Capture: `verification/fix-desktop-draft-as-typed/qa/p1-after-read.md`.
  - **Content limb**: " QA after one" came back after the reload (tail `… help you!\n  QA after one`, and the `6008` draft holds it).
  - **Author-name limb**: "a b" came back (char codes 97,32,98; draft `embeds[0].author.name` `a b`).
  - **Leave prompt**: the `beforeunload` dialog fired on both reloads. The baseline read "lost, no prompt" on both limbs, with
    the same account, message and instrument.
  - **Cleanup**: the type-back left the `6008` draft. It then held `embeds[0].author = {"name":""}` where the saved author is
    empty, the same leftover the unfixed build showed. So I removed only the `6008` entry from `localStorage.messageDrafts`,
    and the final reload at 11:37:33Z raised no dialog and left no `6008` draft. No Save and no production write.

## Closing duty

This record closes the source handoff's discharge: `handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md` (UUID
f1356f4b) is closed `Addressed` by steering at the chain's closure, **after P-1 is read and holds**. Plan 017's carrier
(`handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`, UUID 26c40e4f) carries a changelog row for this release; its open
rows B-7 and B-10 are not this chain's and keep it open.

## Changelog

| Date (UTC) | Agent | Change | Token |
|---|---|---|---|
| 2026-11-21T11:27 | devops-fix-desktop-draft-as-typed | Created at Stage 1: row P-1 carried in full; baseline requested of qa; event ledger blank. | opened |
| 2026-11-21T11:31 | devops-fix-desktop-draft-as-typed | Baseline of P-1 recorded (QA, `f04ee116`): as predicted on message 6008; cleanup note added to the instrument. | baseline-read |
| 2026-11-21T11:34 | devops-fix-desktop-draft-as-typed | E-WEBSITE-PUSH filled (Stage 2). P-1 is now decidable; its reader is a qa-role session steering starts or wakes. | e-push |
| 2026-11-21T11:38 | qa-fix-desktop-draft-as-typed | Document closed. Status: Addressed. P-1 Result recorded as HOLDS on both limbs, with the leave prompt observed (capture `verification/fix-desktop-draft-as-typed/qa/p1-after-read.md`). Cleanup removed only the reader's own `6008` local draft. The closing duty for the source handoff stays with steering. | p1-holds |
