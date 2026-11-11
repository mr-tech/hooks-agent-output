---
ID: 016
Origin: 016
UUID: 54673438
Status: Released
Status-Detail: "Released 2026-11-11T18:29:46Z: website master 0e3d903 -> 395510e97f82a5177d5edbb38b5d44858f745f3d on the owner's release answer (selection prompt, 18:29Z). Post-deploy rows B-3, B-4, B-6 ride handoff/send-check-validity-post-deploy-2026-11-11.md (Open, owning stage uat)."
---

# Deployment Record: plan 016, the send check refuses what Discord refuses

**Plan Reference**: `agent-output/planning/closed/016-send-check-validity.md`, `Revision: 7`, `Status: Released` (R-19; Committed at R-18).
**Stage start**: the UAT document `uat/closed/016-send-check-validity-uat.md`, `Release-Decision: APPROVED FOR RELEASE`, `Verified-At 395510e` (record `ceb9d93`, re-read at `605ad1d`); QA Phase 2 `qa/closed/016-send-check-validity-qa.md`, `Verified-At 395510e` (record `2af91e5`); code review `Reviewed-At 395510e` (record `892daad`). All three re-derived at the record by header read at the write.
**Roadmap**: `agent-output/roadmap` holds only `.gitkeep` for this workspace (the plan's Epic-Alignment: none registered; the workspace has no roadmap by the owner's standing instruction). Proceeding with reduced context; nothing is cited from it.
**Release Identifier**: website `master` → `395510e97f82a5177d5edbb38b5d44858f745f3d` (a fast-forward of `0e3d903ce98e108c7ca848b992ad89ac538f4b44`). No `version` field, no tags, no CHANGELOG (plan M3); none synthesised.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T14:15 | steering-queue-hooks (brief `steering/queue-hooks-briefs/devops-016-brief.md`) | Stage 1 and Phase 2A for chain 016 at website `395510e` | Brief and rulings file read whole. Stage 1 recorded at `436a30a`: chain documents Committed and closed, post-deploy carrier minted, tip built. QA Phase 3 requested and returned: Release Verified at `395510e` (`qa/website-395510e-release-tip-qa.md`, record `596c23c`). Release ask prepared. Nothing pushed. |
| 2026-11-11T14:25 | architect-hooks-016 → devops-hooks-016 (message) | Architecture reconciliation owed at Stage 1 | Landed at record `ab14544` against website `395510e`: `website.md` A-4's D-10 clause, the preview-chrome Problem Area resolved (RK-5 residue), `hideValidation` under D-001's consequences, the fixture Problem Area retired. Findings document `Resolved` under `architecture/closed/` (existence and status read here). Phase 2D step 5 is therefore discharged for chain 016: no further architect inbox line is owed. Release ask still unanswered. |
| 2026-11-11T17:33 | steering-queue-hooks (brief `steering/queue-hooks-briefs/devops-016-respawn-brief.md`) | Respawn after a machine restart (boot 17:27Z); fresh session under the same name | First brief, rulings file and this record read whole. No answer of the owner's to the release ask is on record, so it is treated as unanswered. Runbook steps 1 and 2 re-derived at 17:32:59Z: website on `chain/016-send-check-validity` at `395510e97f82a5177d5edbb38b5d44858f745f3d`, tree `28b8af26…` (equal to the verdict's), `git status --porcelain` only `.playwright-mcp/`; `git ls-remote origin refs/heads/master` = `0e3d903…`; `git merge-base --is-ancestor 0e3d903 395510e` exit 0; `release-move.js … --dry-run` exit 0 ("ff-from-remote ok; sibling serving refs (none)"; "workflows none"). Prompts are off (`prompt-gate-off` present): the ask is put in plain text. Nothing pushed, nothing merged. |
| 2026-11-11T18:32 | owner → devops-hooks-016 (selection prompt, 18:29Z) | Release answer, Phase 2C and 2D | Release answer "Push master to 395510e". Moved website `master` `0e3d903` -> `395510e` at 18:29:46Z (`release-move.js` exit 0); remote read back `395510e`; chain branch deleted. Documents set `Released` and closed, handoff updated, deployed-against-verified reconciled (same SHA). Status Released. UAT cue and retrospective cue go to steering. |
| 2026-11-11T18:44 | uat-hooks-016 → devops-hooks-016 (message; record `798ecc6`) | Post-deploy rows | B-3, B-4 and B-6 EXECUTED, PASS on hooks.gg at `395510e` (UAT's rows 18:35Z to 18:43Z in the handoff). Both handoffs set `Addressed` and moved to `handoff/closed/`. Next Actions rows 1 and 2 are done; row 3 (retrospective) is steering's cue, sent at release. | 

## Stage 1 verification (website, at 395510e)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/016-send-check-validity`, HEAD `395510e97f82a5177d5edbb38b5d44858f745f3d` | `git rev-parse HEAD` |
| Nothing in scope uncommitted | website: `git status --porcelain` shows only `.playwright-mcp/` (untracked, another session's, left in place). Record: the only uncommitted non-image path is `steering/selection-ledger/2026-11-11.md` (steering's, untouched); the images under `verification/016/uat/` stay uncommitted by the owner's standing rule on captured media | `git status --porcelain` |
| Range | nine commits `0e3d903..395510e` (ae7c8fe, 44ecd05, df0fc0b, 7a268dc, 4cdb81a, 7c66b68, ee114ff, 64a3d26, 395510e), 15 paths: 7 production (122 added, 12 removed lines) and 8 test or fixture (the 4287-line corpus fixture among them) | `git log --oneline`; `git diff --numstat` |
| Fast-forward onto production | `git merge-base --is-ancestor 0e3d903 395510e` exit 0; remote `master` = `0e3d903` | exit status; `git ls-remote origin refs/heads/master` |
| Release consistency | no `version` field, no tag, no CHANGELOG. `git diff --name-only 0e3d903 395510e` lists no path outside `src/`, so `package.json`, `pnpm-lock.yaml` and `vercel.json` are unchanged and the `project-utils` pin (`github:hooks-gg/project-utils#master`, the lockfile pins a commit) is not moved by this release | `git diff --name-only`; `grep` of `package.json` |
| Open disagreements with predecessor documents | none. The QA, UAT and code-review documents agree on the SHA, the plan revision and the register. UAT-1 LOW (B-6(b) read on the red border) is carried into the post-deploy handoff | document reads |
| Chain documents | plan, implementation, code review, QA and UAT: `Status: Committed`, moved to `closed/` (record `436a30a`, `git diff --quiet HEAD` exit 0 for each) | `git diff --quiet HEAD -- <path>` |

## Blocking-condition register (Stage 1 step 2b)

One register: `qa/closed/016-send-check-validity-qa.md` § "Blocking-condition register", with UAT's copy in its document. Terminal states, read from the UAT document: B-1, B-2 and B-5 (pre-release) `EXECUTED` PASS at `395510e`. B-3, B-4 and B-6 are post-deploy-observable and block nothing; they are carried by `handoff/send-check-validity-post-deploy-2026-11-11.md` (`Owning-Stage` uat, event-form `Review-Trigger`; record `436a30a`). No scheduled reader is installed: the executor is the UAT stage, so there is no crontab line and no launcher brief, and none is recorded. No pre-release row is unterminated and the UAT document exists. No second travelling list was found.

## Stage 2 readiness (Phase 2A)

Included: chain 016 only (1 of 1 committed). Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| Tip assembled | the chain branch itself, a fast-forward of remote `master`; no merge commit, so the tip is `395510e` | `release-move.js … --dry-run` exit 0, "ff-from-remote ok" |
| Release-tip verdict | `Release Verified` at `395510e`, tip tree `28b8af26aa27587f5f7f34f5dc91383264ccd40b` on both sides (`git rev-parse 395510e^{tree}`); step 1b: 22 open handoffs enumerated, 0 whose `Review-Trigger` names this verdict or a website production push; no gated time-based set (`qa/website-395510e-release-tip-qa.md`, record `596c23c`) | QA's record, header read at the write |
| Populations (4b) | the release is a leaf deployment of `website`: no package, pin or subscriber moves. One consumer population rests on the stored `valid` column and the public v1 API: Statbot's statroles test-notification path rejects a message whose `valid` is false (`isHooksggMessageRejected` → `hooksgg_message_invalid`, `statbot-api/src/v3/routes/guilds/statroles.ts` line 322 at statbot-api `60b844d`, read from code, not run), as plan 012 D1 specifies. Other Statbot consumers were not enumerated; the reach is named, not established | `git grep`; read |
| Packaging (build at the tip) | `npx next build` (Next.js 16.1.6, Turbopack) in an isolated `git archive` export of `395510e` (tree `28b8af26…` recorded), `node_modules` copied, under `systemd-run --user --scope` caps: **exit 0**, routes listed, 14:17:23Z to 14:17:45Z. Env from the local `.env.local` (values never printed; the build writes nothing remote). Export deleted. No lockfile or package-manager change, so the host-major install check does not apply | `verification/016/devops/next-build.txt`, `build-steps.txt`, `build-exit.txt`, `build-tip.sh` |
| Workspace | website HEAD `395510e`; `release-move` reports "untracked 17 path(s) left alone" (the `.playwright-mcp/` capture files). Predecessor exclusions: gitignored `next-env.d.ts`, `.env.local*` do not affect the move | dry-run output |
| History rewritten | no. The verified commit is the tip and reachable | `git cat-file -e` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor`. Only `master` is a serving ref (release-move: "sibling serving refs (none) on one line ok") | `git ls-remote --heads origin`; dry-run |

**Phase 2C block (re-derived against the mechanism, per repository: website):**
- **Deploy mechanism.** Re-derived: `.github/` holds an untracked `prompts/` directory and no `workflows` (release-move: "workflows none"); `vercel.json` holds only a `crons` entry; `package.json` has no deploy script. **Accepted as written, a named risk**: that a push of `master` builds and serves production through Vercel's git integration. The integration is outside the repo and not read. Evidence on record: `architecture/system-architecture.md` ("the website deploys on Vercel", owner ruling 2026-08-23) and the owner's attestations on earlier pushes (`deployment/closed/fix-website-save-gate-embeds-deployment.md` and the records it cites).
- **Rollback.** The reversing patch was dry-run: `git format-patch --stdout 0e3d903..395510e | git apply --check -R` against the tree at `395510e`, exit 0 (27 paths; the revert applies cleanly). The plain `git diff … | git apply --check -R` form could not be used: the output filter rewrites `git diff`, and `apply` read "No valid patches" (exit 128), so the patch was taken from `format-patch`. The owner's established fast path is a Vercel promote of the previous deployment (not exercisable from here, accepted as written). A git rollback is a new revert commit pushed as a fast-forward and is the owner's call and a new ask. **M1 never ships or stays live without M1b** (QA SE-6): a revert of M1b alone is not an option; a revert of the whole range, or of M1 alone, is. The push carries both, since the fast-forward carries all nine commits.
- **Ordering.** Dry-run → owner's yes → move → `ls-remote` → UAT cue for the post-deploy rows. Nothing interleaves with the move.
- **Serving refs.** As in the table.
- **Deployed Node major (QA's routed assumption).** `package.json` has no `engines` field and the repo has no `.nvmrc` or `.node-version` (`ls`, exit 2 each); `@types/node` 22.15.29 is a type package, not the runtime. The Vercel project's Node setting is outside the repo and **unread**. Accepted as written, a named risk. What bounds it: the whitespace rule is `String.prototype.trim` plus two stated exceptions, and the check on this box (Node 24.14.0) reads U+0085 as content (`trim()` length 1) and U+FEFF as removed (length 0), the two the plan's exceptions correct. The only drift a runtime major could add is the Unicode version of `Zs`, which touches no measured member (QA, § Phase 2 — results). The browser half is UAT's B-1 in real Chrome (a single space refused). If a runtime disagrees with the corpus on a whitespace member, the signature is a B-3 or B-4 read differing from the corpus.

**Runbook (one artifact; results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin refs/heads/master` | not `0e3d903ce98e108c7ca848b992ad89ac538f4b44` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | `0e3d903…` at 14:21:23Z (before the ask). Re-read just before the move |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 395510e97f82a5177d5edbb38b5d44858f745f3d --dry-run` | exit ≠ 0 → stop | exit 0 at 14:20Z ("every check passed; nothing moved"). Re-run just before the move |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | yes, 2026-11-11T18:29Z (selection prompt); steps 1 and 2 re-read 18:29:11Z to 18:29:34Z, unchanged |
| 4 | the same command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | `OK moved master: 0e3d903… -> 395510e…` on origin, tree on master, exit 0, 18:29:46Z |
| 5 | `git ls-remote origin refs/heads/master` equals `395510e…`; tree on `master`, `git status --porcelain` shows only `.playwright-mcp/` | any difference → route to the owner | `ls-remote` = `395510e97f82a5177d5edbb38b5d44858f745f3d`; branch `master`; `git status --porcelain` only `.playwright-mcp/` (18:29:49Z) |
| 6 | `git branch -d chain/016-send-check-validity` (merged); `ls-remote --heads origin 'chain/*'` shows none | `-d` refuses → name it to the owner; do not force | `git branch -d` exit 0; `ls-remote --heads origin 'chain/*'` empty; no local `chain/016*` (18:29:49Z) |
| 7 | cue `uat-hooks-016` with the handoff `handoff/send-check-validity-post-deploy-2026-11-11.md` (B-3, B-4, B-6; message 5996 re-saved, read on the red border) | a falsifier seen → Vercel promote of the previous deployment, the owner's call | UAT has no live session: the spawn cue goes to `steering-queue-hooks` by message at the close of this turn, naming the handoff. Rows B-3, B-4, B-6 stay open on it |

## What changes for users (carried to the release ask)

From UAT's "Key Changes for Changelog" and the plan:
- The send page and the editor refuse the Components V2 messages Discord refuses (the measured class: 86 refused of 120 corpus members), with a reason that names the part ("A Text Display is empty.").
- The Thumbnail and gallery-item description inputs stop at 1024 characters. Save does not refuse a longer description (D-10); Send does.
- A message holding a File component is refused everywhere, on a new send and on an edit (D-11). Risk: a File naming an existing attachment on an edit, which Discord may accept, is refused (RK-1; unmeasured).
- Preview images (`/preview`) no longer carry validation error lines or the red border, the old over-limit lines included (D-14, reversing the 2026-11-08 choice). Images generated before release keep their chrome until the message is saved again (RK-5).
- The stored `valid` flag is false for messages saved after release in a refused V2 shape, and the public v1 API serves it. Rows stored before release keep their old value until their next save (RK-3). Statbot rejects a `valid: false` message (plan 012 D1).
- Stated limits: the generic send-failure toast stays (X-1); the editor's "Invalid URL." marker and the send check can disagree (RK-4); the add menu still offers File (X-2).

## User Confirmation

**Confirmed** by the owner in this session, selection prompt "Release 016", answer "Push master to 395510e (Recommended)", 2026-11-11T18:29Z (read back 18:29:34Z, remote `master` still `0e3d903`, HEAD `395510e`, dry run exit 0 at 18:29:11Z). The prompt stated the user-visible changes, the Vercel mechanism as accepted-as-written, and the rollback forms. (The earlier plain-text ask of 17:33Z went unseen as a prompt; a peer message from steering carried no answer.)

## Release Execution

**Execution mode**: agent-executed (Mode A), in this session; authorizer: the owner (selection prompt, 2026-11-11T18:29Z). **Release date**: 2026-11-11, push at 18:29:46Z.

| Item | Result |
|---|---|
| Command | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 395510e97f82a5177d5edbb38b5d44858f745f3d` after its `--dry-run` (exit 0 at 18:29:11Z) |
| Output | `OK moved master: 0e3d903ce98e108c7ca848b992ad89ac538f4b44 -> 395510e97f82a5177d5edbb38b5d44858f745f3d on origin; tree on master`, exit 0 |
| Repository and SHA shipped | website only: `395510e97f82a5177d5edbb38b5d44858f745f3d` (nine commits, 7 production and 8 test or fixture paths). No other repository moved |
| Serving ref at cutover | `master` at `395510e…`, read back with `git ls-remote origin refs/heads/master` at 18:29:49Z. The only serving ref; no sibling to order against |
| Deploy evidence | The push to `master`, with the owner's answer; per the deploy-evidence rule it is the deployment. No host-side read was made or is owed. Named risk, accepted as written: that a push of `master` builds through Vercel's git integration (outside the repo, unread) |
| Tree afterwards | on `master` at `395510e`; `git status --porcelain` only `.playwright-mcp/`; `chain/016-send-check-validity` deleted with `git branch -d` (merged), none on origin |
| NOT VERIFIED | none. The deployed Node major stays an unread input to QA's routed assumption (named in the Phase 2C block), carried as a falsifier on the post-deploy handoff |

## Deployed against verified (Phase 2D step 2)

website: deployed ref `master`, commit at it `395510e97f82a5177d5edbb38b5d44858f745f3d` (the pushed commit, read from local git and `ls-remote`). The QA Phase 2, code-review, UAT and release-tip (Phase 3) verdicts all bind `395510e`: **the verdict's SHA is the deployed commit**, so there is no surface diff to take. Tip tree `28b8af26aa27587f5f7f34f5dc91383264ccd40b`, the Phase 2 tree.

## Post-Release Status

Released 2026-11-11T18:29:46Z. Post-deploy rows B-3, B-4 and B-6 are not read yet: they ride `handoff/send-check-validity-post-deploy-2026-11-11.md` (`Status: Open`, `Owning-Stage` uat, Review-Trigger met by this push). This record does not wait on them.

- **Known issues / stated limits (plan Risks and Exclusions):** RK-1 (a File naming an existing attachment on an edit is refused; unmeasured), RK-3 (stored `valid` stale until next save), RK-4 (the editor's "Invalid URL." marker and the send check can disagree), RK-5 (preview images generated before release keep their chrome until the message is saved again), X-1 (generic send-failure toast), X-2 (File upload path and add-menu entry), X-10 (base tree's existing lint findings).
- **Rollback plan:** Vercel promote of the previous deployment (the owner's call; not exercisable from here). The git form is a revert commit pushed as a fast-forward and is a new ask; the reversing patch was dry-run against the tree (`git apply --check -R`, exit 0, 27 paths). M1 never ships or stays live without M1b: revert the whole range or M1 alone, never M1b alone.

## Phase 2D obligations

- **Plans**: 016 only, `Released` (planning R-19). Chain documents by frontmatter `ID: 016`/`Origin: 016` (`grep -rl`): plan, implementation, code review, QA, UAT now `Released` and in `closed/`; the release-tip QA record `Released`, moved to `qa/closed/`; critiques (five) `Resolved` and the architecture findings `Resolved`, all under `closed/`. No `fix-` chain's `Handoff-At` was in scope of this range.
- **Fixer branch**: none (a chain branch, deleted above).
- **Architecture**: discharged at Stage 1 (record `ab14544`, changelog row of 14:25Z); no further architect line is owed.
- **Roadmap**: the workspace has no roadmap (only `.gitkeep`, by the owner's standing instruction), so no roadmap obligation exists to lodge in `INBOX.md`.
- **Forward items beyond the register** (swept by `grep -l 'Assumption Not Checked'` over the chain's documents and a read of the plan's Risks, Exclusions and Planner batch):
  - QA Phase 2's Assumption Not Checked (deployed Node major, whitespace): carried as a falsifier on the post-deploy handoff, signature a B-3 or B-4 read disagreeing with the corpus. The deployed major itself is uncarried by any instrument (the Vercel setting is outside the repo).
  - The earlier QA re-key passes' assumptions (fixture byte identity, text-reading suite cases, X-12, revision 4/5 reads): each owned by QA Phase 2 or UAT, whose PASS and APPROVED verdicts at `395510e` sit above them; their individual closures were not re-read here. The code review's is recorded closed by UAT's B-1 pair (its Status-Detail).
  - Release-tip QA's remote-`master` assumption: closed at the push (remote read `0e3d903` at 18:29:34Z).
  - RK-1 → `handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md` Item 2; X-1 → Item 1 of the same handoff (`Open`); QAF-13 → `handoff/editor-error-lines-render-text-unasserted-2026-11-11.md` (`Open`); X-9 → `handoff/website-tests-not-beside-their-module-2026-11-08.md` (`Open`); RK-3, RK-4, RK-5, X-3 to X-8, X-10, X-11: stated limits with no carrier beyond the plan.
  - `handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (`Open`) closes on B-3's fixed read (plan M3); devops closes it on the executor's recorded result, not before.
  - Planner batch: every row discharged or a stated limit (read in the closed plan).

## Next Actions

| Action | Owner | Carrier |
|---|---|---|
| Read B-3, B-4, B-6 in production; re-save message 5996 and read its new image on the red border | UAT stage (owner fallback only) | `handoff/send-check-validity-post-deploy-2026-11-11.md` (`Open`) |
| Close the emptiness handoff on B-3's fixed read; close the post-deploy handoff on all three | devops, on the executor's message | the two handoffs above |
| Retrospective for chain 016 | steering's spawn cue, sent with this close | this record's closing |
