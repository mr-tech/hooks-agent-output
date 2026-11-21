---
ID: n/a
Origin: fix-desktop-draft-as-typed
UUID: fa2fab0b
Status: Active
Status-Detail: "Stage 1 done and Phase 2A in progress at website b68f94c (nothing pushed). Waiting on QA's release-tip record and the pre-push production baseline of row P-1; then the owner's release word (Phase 2B)."
---

# Deployment Record: fix-desktop-draft-as-typed

**Plan Reference**: none (fixer chain; the owner's scope words, `steering/fixer-queue-2026-11-21-rulings.md` blocks 2026-11-21T05:50Z and 05:59Z; the scoping determination, `steering/fix-desktop-draft-as-typed-rulings.md`, block 2026-11-21T10:43Z, with the 11:13Z and 11:14Z blocks).
**Stage start**: QA's pre-release walk `qa/closed/fix-desktop-draft-as-typed-qa.md` (record `71fc7b56`), `Verified-At` `b68f94c`, its Status "QA Complete" at that commit, read at the record at write time. There is no UAT on this chain (stage set: fixer, code review, the walk, devops). Anchors re-read, all `b68f94c`: fixer `Handoff-At` (`implementation/closed/fix-desktop-draft-as-typed-implementation.md`, rev 2 after CR-1, record `f25ef260`), code review `Reviewed-At` (`code-review/closed/fix-desktop-draft-as-typed-code-review.md`, record `488b209`, round 1 `APPROVED_WITH_COMMENTS`, CR-1 MEDIUM corrected as a record-only edit), QA walk `Verified-At`.
**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep`; nothing is cited from it. The determination names no epic or criterion, so the chain owes the roadmap no entry.
**Release Identifier**: website `master` `b663b354fb236c3ee58d8b0be01778e1908e0e10` → `b68f94cda114bcef1efd59954aba321e246dd683` (two commits, `9d60769` and `b68f94c`, a fast-forward). `package.json` carries no `version` field (`grep -c '"version"'` 0), the repo has no CHANGELOG and no tags (`git tag | wc -l` 0); none synthesised.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T11:29 | steering-hooks (brief `steering/fix-desktop-draft-as-typed-brief-devops.md` with its common part, on QA's walk verdict at `b68f94c`) | Stage 1 and Phase 2A for `chain/fix-desktop-draft-as-typed` at `b68f94c` | Briefs, rulings, fixer, code-review and QA documents read whole. Tip build `next build` exit 0 in an isolated export (removed). Dry run passed; the reversing patch applies. Fixer, code-review and QA documents set `Committed` and moved to `closed/` (record `46e199f1`). Carrier handoffs created: P-1 (`handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md`, 4bbe68a5) and the residue (`…-residue-2026-11-21.md`, 9e2b7c14). QA asked for the release-tip record and the pre-push production baseline (message 33ecd1d3). Nothing pushed. Disclosures: two table rows I wrote carried a stamp ahead of the clock and the stamp gate refused them; I rewrote each from the clock (a stamp error, no gate was worked around). One piped `grep -vc` over a `git diff --name-only` read printed 3 for the paths outside `src/`; the rtk filter regroups piped output, so I re-derived the count with `git diff --numstat … -- . ':(exclude)src'` (0 bytes of output) and `git diff --numstat | grep -vc 'src/'` (0), and use the second form below. |

## Stage 1 verification (website, at b68f94c)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-desktop-draft-as-typed`, HEAD `b68f94cda114bcef1efd59954aba321e246dd683`, no upstream; `master` and `origin/master` both `b663b354fb236c3ee58d8b0be01778e1908e0e10` | `git branch --show-current`; `git rev-parse`; `git ls-remote origin master` at 2026-11-21T11:29Z (`verification/fix-desktop-draft-as-typed/devops/ls-remote-before.txt`) |
| Nothing in scope uncommitted | website `git status --porcelain`: `?? .playwright-mcp/` only (foreign; `release-move` leaves 17 untracked paths alone). Record: the chain's stage documents committed (fixer `f25ef260`, code review `488b209`, QA `71fc7b56`, this stage's closure `46e199f1`); `verification/fix-desktop-draft-as-typed/` (controls, review, qa, scoping, devops) is committed | `git status --porcelain` |
| Chain range | 2 commits `b663b35..b68f94c`; 6 paths (3 production, 3 new test files), all under `src/` (`git diff --numstat b663b35 b68f94c` lists 6 lines; 0 of them outside `src/`). Production lines added: `Desktop.tsx` 4, `EmbedAuthor.tsx` 8, `EmbedFooter.tsx` 5 = **17**; the fixer's, the reviewer's and the steering recount are 17. No disagreement | `git log`; `git diff --numstat` |
| Fast-forward onto production | `release-move.js` "ff-from-remote ok"; remote `master` = `b663b35` | `ls-remote`; dry run |
| QA binds the tip | QA's `Verified-At` `b68f94c` and the code review's `Reviewed-At` `b68f94c` are the tip itself; tip tree `25ab048b9081065557c84ca7d73fd87017b0633b` (`git rev-parse b68f94c^{tree}`), the tree QA's walk recorded in its `Verified-At` note. Per-plan verdict, not the release-tip verdict: the release-tip record is requested (Phase 2A below) | QA document; `git rev-parse` |
| Release consistency | `package.json` has no `version`; no CHANGELOG, no tags. `git diff --quiet b663b35 b68f94c -- package.json pnpm-lock.yaml vercel.json` exit 0. The one cross-repo dependency, `project-utils: github:hooks-gg/project-utils#master`, is locked to `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` (`pnpm-lock.yaml` lines 166–168, 5397), the current remote `master` of project-utils (`git -C project-utils ls-remote origin master`) and the sibling clone's HEAD. The chain changes nothing in project-utils; the pin names the intended target | exit status; `ls-remote` |
| Open disagreements with predecessor documents | none open. CR-1 was corrected by the fixer and the reviewer routed it as record-only; QA read flow 5 and found it consistent with the code, and reports one consequence the flow does not mention (at route 0, opening the editor without typing writes a draft holding the same text on the fixed build; harmless, no finding) | the documents |

## Blocking-condition register (the chain's one register)

None of the chain's documents carries a blocking-condition register: the fixer's document has none, the code review raised none, and QA's walk states none (`Findings: None`; its changelog row records that the brief narrowed it to one walk). So no pre-release row is unterminated and nothing blocks the commit. Step 2c (plan at rest) does not apply: the chain has no plan, critique or Planner batch. The one open observation is **post-deploy-observable**, **P-1** (the saved-message route), carried in full, with its prediction, instrument, precondition and falsifier, by `handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md` (UUID 4bbe68a5, `Owning-Stage` qa, `Review-Trigger` the E-WEBSITE-PUSH row of its ledger), and named here and in QA's closure row. No crontab line: the reader needs the signed-in test-account browser, which this session does not carry (ToolSearch for `mcp__playwright__*` returned no tools; the `discord-test-browser` skill, "present only in sessions launched with `--browser` and in qa/uat"), and the row is an event, not a time; the reader is a qa-role session steering starts or wakes after my release-complete cue. The chain's other limits (per-keystroke cost, non-Chrome browsers) are carried by `handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md` (UUID 9e2b7c14). No architecture findings document carries this chain's ID (`grep -l "fix-desktop-draft-as-typed" agent-output/architecture/*.md` is a sweep for Phase 2D).

## Stage 2 readiness (Phase 2A)

Included: chain `fix-desktop-draft-as-typed` only. Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 | — |
| Tip assembled | the chain branch itself, a fast-forward of remote `master`; no merge commit, nothing assembled on a scratch branch | `release-move.js … --dry-run`: "ff-from-remote ok" |
| Release-tip verdict | The tip's tree equals the tree of QA's walk `Verified-At` (`25ab048b…` both sides, `git rev-parse b68f94c^{tree}`), so that verdict covers the tip. **Pending: the release-tip record** (`Phase` 3, `Status` `Release Verified`) with the open-handoff sweep (`qa-phase-3.md` step 1b) and the gated time-based set where the workspace has one, requested of `qa-fix-desktop-draft-as-typed` at 2026-11-21T11:2xZ (message 33ecd1d3-efa4-4ffd-a711-ee7936f36b93). Filled below on receipt | QA's record |
| Populations (4b) | website is a leaf deployment. The one pin, project-utils, is unchanged and current; no package, subscriber or consumer is changed (outside `src/`, 0 paths). The population the release condition rests on is every browser tab on the old bundle: a tab opened before the deploy keeps the old bundle until it reloads, and every tab loaded after it drafts as typed (fixer's "Residue in production"); no mechanism of this release reaches an open tab | exit status; fixer's document |
| Packaging (build at the tip) | `pnpm exec next build` (Next.js, node v24.14.0, pnpm 10.28.2) in an isolated `git archive` export of `b68f94c` (tree `25ab048b…`), `node_modules` copied, the Production variable names set to dummy values (no `.env.local` copied, nothing remote written), under `systemd-run --user --scope` caps (900 s, 6 G, 2000 tasks): **exit 0**, "Compiled successfully in 9.2s", 9 static pages, `/message/m/[id]/edit`, `/message/m/new` and the other app routes built; 2026-11-21T11:27:17Z to 11:27:41Z. Export deleted (`ls -d` exit 2). The diff carries no lockfile or package-manager change, so the host-major install check does not apply | `verification/fix-desktop-draft-as-typed/devops/next-build-b68f94c/{build.log,meta.txt,exit}`, `…/devops/build-tip.sh` (the prior chain's script, copied unchanged) |
| Workspace | the chain commits are on the branch; website porcelain as above. Predecessor exclusions: `.env.local*`, `.next`, `.vercel`, `node_modules` and tsbuildinfo files are ignored; the untracked `.playwright-mcp/` is left alone by `release-move`; the fixer's disclosed `eslint --fix` rewrite of 78 files was restored by the fixer and the reviewer's read of the chain's commits shows none of it (`git diff --numstat b663b35 b68f94c` lists the 6 paths only). None affects a release mechanism: the move is a push of a commit | `git status --porcelain`; dry-run output |
| History rewritten | no; the verified commit is the tip and is reachable | `git merge-base --is-ancestor` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor`. `release-move.js --report`: "one serving ref at origin (master); no pair". The split check is trivially met; no ref but `master` moves | `release-move.js --report` exit 0 |

**Assumption Not Checked, swept (Phase 2A step 9b).**
- **Code review** (real-browser Slate per-change emit; caret under the round trip): discharged at route 0 by QA's walk (flows 1, 3, 4 PASS in Chrome on a `git archive` export of `b68f94c`, base `b663b35` beside it losing the same text). Not open.
- **QA's walk** (the saved-message route `/message/m/<id>/edit` behaves as route 0 did; its draft effect goes through `writeDraft` / `removeDraft` by deep equality and needs a database and a signed-in session): the release form exercises it on every edit of a saved message. The read that closes it is P-1 after the push; no live session could run it on the new code before the first ref moves. Its **baseline on the unfixed production build** can run before the push and is requested of QA (message 33ecd1d3).
- **Hazards the sweep did not cover** (the brief; named risks, not closed by this release): pre-017 behaviour at `1ad625e`; `useLocalStorage` readers of the synchronous `storage` event; per-keystroke cost of the 1 MiB draft map (residue handoff 9e2b7c14); browsers other than Chrome (same handoff); mobile `BottomPortal` close.

**Phase 2C block, re-derived against the mechanism (repository: website; the only repository shipped):**
- **Deploy mechanism.** Re-derived: `website/.github/workflows` is absent (`release-move.js` prints "workflows none … a push to master triggers no GitHub Actions workflow"); `vercel.json` holds only a `crons` entry, unchanged by the diff. Vercel's git integration is re-derived from the closed record `deployment/closed/fix-get-one-absent-not-found-deployment.md` (push of `b663b35`, 2026-11-21T10:11:05Z to 10:11:09Z) and its B-1 read at 10:13:30Z, where hooks.gg answered with a 404 text that exists only in that push's code within minutes. **Accepted as written, a named risk**: which commit the integration checks out is its default-ref behaviour. The push is the deploy evidence.
- **Rollback.** Dry-run: `git diff b663b35 b68f94c` written to `verification/fix-desktop-draft-as-typed/devops/release-b663b35-b68f94c.diff` (14728 bytes); `git apply --check -R` on it against the tree at `b68f94c`, exit 0 (`rollback-apply-check.exit`). The owner's established fast path, Vercel promote of the previous deployment (the one serving `b663b35`), is not exercisable from here: **accepted as written**. A git rollback is a new revert commit pushed as a fast-forward, a new ask. The change writes no schema and no stored value of its own: a rollback restores the loss of typed text on a reload; drafts already written to a browser's `localStorage` while the fix served stay in the same form the draft store already holds (reversible by the same `removeDraft`).
- **Ordering.** Website only. The diff is `src/` only and uses no new column, table or env variable; project-utils is unchanged; no migration. Order: dry run, the production baseline of P-1 (QA), the release-tip record (QA), the owner's yes, the move, `ls-remote`, then P-1 after (the carrier's reader). Nothing interleaves with the move.
- **Serving refs.** As in the table: `master` only.
- **A release step that runs a tool the diff changes**: none; the move runs `release-move.js` from `~/.claude/tools/`, which this diff does not touch.

**Read rows run once before the first go (live value beside the prediction):**

| Row | Pre-push read | Prediction | Reading |
|---|---|---|---|
| P-1 baseline (saved route, production before the push) | requested of `qa-fix-desktop-draft-as-typed` (message 33ecd1d3; this session has no browser): the same steps as P-1 on production's unfixed build, no Save | typed text lost after the reload, no leave prompt | pending |

**Runbook (one artifact; the results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `b663b354fb236c3ee58d8b0be01778e1908e0e10` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | pending |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master b68f94cda114bcef1efd59954aba321e246dd683 --dry-run --qa-record <the release-tip record>` | exit ≠ 0 → stop | `--reason` form (naming QA's walk, `Verified-At` `b68f94c`): exit 0 at 2026-11-21T11:29Z, "ff-from-remote ok; sibling serving refs (none) on one line ok … DRY RUN: every check passed; nothing moved" (`release-move-dry-run-1.txt`). The `--qa-record` form is re-run immediately before step 4 |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | pending |
| 4 | the step 2 command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | pending |
| 5 | `git ls-remote origin refs/heads/master` equals `b68f94cd…`; tree on `master`; `git status --porcelain` shows only `?? .playwright-mcp/` | any difference → route to the owner | pending |
| 6 | `git branch -d chain/fix-desktop-draft-as-typed` (merged); `ls-remote --heads origin 'chain/*'` shows none | `-d` refuses → name it to the owner; do not force | pending |
| 7 | write E-WEBSITE-PUSH into the carrier handoff's ledger; send steering the release-complete cue naming the P-1 reader | — | pending |
| 8 | **P-1**: carried by `handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md`, not run by this session | the handoff's falsifier → the owner, through steering | pending |

## User Confirmation

pending (Phase 2B).

## Release Execution

pending (Phase 2C).
