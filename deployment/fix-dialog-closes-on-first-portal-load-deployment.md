---
ID: n/a
Origin: fix-dialog-closes-on-first-portal-load
UUID: 3887600d
Status: Active
Status-Detail: "Stage 1 and Phase 2A done at website 1ad625e; nothing pushed. Awaiting the owner's release approval (Phase 2B), asked in this session."
---

# Deployment Record: fix-dialog-closes-on-first-portal-load

**Plan Reference**: none (fixer route; scoping determination `steering/fix-dialog-closes-on-first-portal-load-rulings.md`, block "2026-11-18T21:59Z"; the owner's commission, `steering/backlog-2026-11-18-rulings.md`, block "2026-11-18T21:53Z", item 1).
**Stage start**: no UAT and no QA on this route (determination: "QA Phase 2 if the fix adds 20 or more production lines, otherwise the reviewer also runs the suite and the red test"; 6 production lines). The stage start is the code review at its `Reviewed-At`: `code-review/fix-dialog-closes-on-first-portal-load-code-review.md`, `Reviewed-At: "1ad625e — repos=website"`, `Verdict: APPROVED_WITH_COMMENTS`, `Round: 1`, agent-output `6016a46`, header re-read at write time.
**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep`; proceeding with reduced context, nothing cited.
**Release Identifier**: website `master` → `1ad625e2161b58c5f870c9db369f4056df690a03` (no `version` field, no tags, no `CHANGELOG.md`; none synthesised).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-18T22:31 | steering-roadmap (brief `devops-fix-dialog-closes-on-first-portal-load.md`) | Stage 1 and Phase 2A for `fix/dialog-closes-on-first-portal-load` at 1ad625e | Brief, common part, rulings file, fixer document, code review and both handoffs read whole. Tip build `next build` exit 0 in an isolated export. Dry run exit 0 with `--reason`. Nothing pushed. |

## Stage 1 verification (website, at 1ad625e)

| Check | Result | Instrument |
|---|---|---|
| Tree under release | branch `fix/dialog-closes-on-first-portal-load`, HEAD `1ad625e2161b58c5f870c9db369f4056df690a03`; tree `git rev-parse 1ad625e^{tree}` recorded in `verification/fix-dialog-closes-on-first-portal-load/devops/next-build-1ad625e-meta.txt` | `git branch --show-current`; `git rev-parse` |
| Nothing in scope uncommitted | website `git status --porcelain`: only the untracked `.playwright-mcp/` (foreign). `git status --porcelain -- verification/fix-dialog-closes-on-first-portal-load` in the record: reviewed before this record's commit (see "Workspace") | `git status --porcelain` |
| Fix range | 1 commit `395510e..1ad625e` (`git log --oneline master..HEAD`); 3 paths: `Child.tsx` +6/−4 (production), `.eslintrc.json` +7/−1 (lint configuration), new test +73/0 | `git diff --numstat 395510e 1ad625e` (the reviewer's and the rulings' figures agree) |
| Fast-forward onto production | `git merge-base --is-ancestor master 1ad625e` exit 0; `master` = `origin/master` = `395510e` (`git ls-remote origin master`) | exit status; `ls-remote` |
| Verdict binds the tip | code review `Reviewed-At 1ad625e` = the release tip; the release is a fast-forward, so there is no assembled tree distinct from it | header |
| Release consistency | `package.json` has no `version`; `git tag` 0 lines; `CHANGELOG.md` absent at `1ad625e` (`git cat-file -e` exit 128). `git diff --quiet 395510e 1ad625e -- package.json pnpm-lock.yaml pnpm-workspace.yaml vercel.json next.config.js .gitignore` exit 0: no dependency, lockfile or pin changed. No cross-repo reference is in the release. | exit status |
| Open disagreements with predecessor documents | none that the release depends on. CR-2 (the fixer's document cites the webpack alias route; the production build takes Turbopack; the conclusion stands, "no action on code") and CR-3 (the lint rule has no automatic enforcement point; two blind phrasings with 0 members today) are the reviewer's INFO items; neither is disputed here. | code review |

## Blocking-condition register

The chain has no QA document and no UAT document, so it has no register of blocking-condition rows; no pre-release row exists to terminate and no post-deploy-observable row exists. The code review's one open assumption is not a register row: it is the review's Assumption Not Checked, owned by the production look below.

Documents of the chain closed at Stage 1 step 8: see "Chain documents and terminal tokens".

## Stage 2 readiness (Phase 2A, 2026-11-18T22:31)

Included: chain `fix-dialog-closes-on-first-portal-load` only. Execution mode: **Mode A, agent-executed**, the move run in this session on the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 (the fix branch at `1ad625e`) | — |
| Tip assembled | the fix branch itself: a fast-forward of remote `master`; no merge commit | `release-move.js … --dry-run` exit 0, "ff-from-remote ok" |
| Release-tip verdict | **No QA Phase 2 or Phase 3 exists, by the determination's stage set.** The evidence at the tip is the code review at `Reviewed-At 1ad625e`: full suite at `1ad625e`, 123 files, 1508 of 1508 passed, exit 0 (`verification/fix-dialog-closes-on-first-portal-load/code-review/suite-1ad625e.*`); the red test reproduced on the pre-fix tree (case 1 failed, exit 1); the class-catch lint probe. `release-move.js` takes `--reason` naming this record (the form for a verdict covering the tip). Stated to the owner in the ask as a gap against Phase 2A step 3's literal wording, which presumes a QA verdict; the stage set removed QA by a determination he could veto. | code review; dry run |
| Open-handoff sweep (qa-phase-3 step 1b analogue) | 23 handoffs `Status: Open`; by `Review-Trigger` text, none names a website production push or release. The two this chain touches have event triggers on file edits: `upload-message-dialog-closes-on-first-portal-load-2026-11-08.md` and `anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` | `grep` over `handoff/*.md` |
| Consistency | see Stage 1 table | |
| Populations (4b) | the release has no consumer, pin or subscriber population: website is a leaf deployment; no package or pin changes (`git diff --quiet` over `package.json`, lockfile: exit 0). The four portal consumers (`NewMessageModal`, `SaveAsMenu`, `Navigation`, `ColorPicker`) reach `FloatingPortal` only through `AnchoredPopover/Child.tsx` — the reviewer's shared-path reading; not re-enumerated here. | code review "The four portal consumers" |
| Packaging (build at the tip) | `next build` (Next.js 16.1.6, Turbopack) in an isolated `git archive` export of `1ad625e`, `node_modules` copied (`cp -a`) after a first attempt with a symlinked `node_modules` was refused by Turbopack ("Symlink node_modules is invalid, it points out of the filesystem root"; capture kept), under `systemd-run --user --scope` caps (540 s, 6 GB, 2000 tasks): **exit 0**, "Compiled successfully in 8.7s", "Running TypeScript", 9 static pages generated, 10 app routes and 8 page-router routes listed; 22:31:00Z to 22:31:23Z. `SKIP_ENV_VALIDATION=1`; no `.env.local` in the export; no env value read. The build ran no lint (Next 16.1.6 runs none). Export deleted (`ls -d` exit 2). No lockfile or package-manager change, so the host-major install check does not apply. | `verification/fix-dialog-closes-on-first-portal-load/devops/next-build-1ad625e.txt`, `.exit`, `-meta.txt`, `next-build-symlink-node_modules-attempt.txt` |
| Workspace | website: HEAD `1ad625e` on the fix branch, only the foreign untracked `.playwright-mcp/`. Predecessor exclusions (the reviewer's: the foreign `.playwright-mcp/`): `release-move` reports "untracked 17 path(s) left alone" — it does not refuse on them, so they affect no release mechanism. | `git status --porcelain`; dry run |
| History rewritten | no; the reviewed commit is the tip | `git cat-file -e` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor` (`git ls-remote --heads origin`, 22:3xZ). Only `master` is in release-move's serving list: "sibling serving refs (none) on one line ok" | dry run |

**Phase 2C block (re-derived against the mechanism, per repository: website):**
- **Deploy mechanism.** Re-derived: `.github/` is present but `.github/workflows` is absent (`ls`); `release-move` prints "workflows none … a push to master triggers no GitHub Actions workflow in this repository"; `vercel.json` holds only a `crons` entry (configuration, not a trigger); `package.json` has no deploy script. **Accepted as written, a named risk**: that a push of `master` builds and serves production through Vercel's git integration, which is outside the repo and not read. Evidence on record, not re-read: `steering/queue-hooks-rulings.md` line 142 ("the 2026-10-10 and 2026-11-10 releases went live from a push of `master`") and the closed deployment records that cite the owner's attestations. What commit the integration builds (the default ref it checks out) is a named risk about what was built, accepted as written. The production look below establishes the fix live; it is the Assumption Not Checked's owner, not a check of serving state.
- **Rollback.** Reversing patch dry-run: `git diff 395510e 1ad625e` written to a file and `git apply --check -R` against the tree at `1ad625e` (result in the runbook row 0 below). The owner's established fast path is Vercel promote of the previous deployment (not exercisable from here: accepted as written). A git rollback is a new revert commit pushed as a fast-forward and needs a new ask.
- **Ordering.** Dry-run → owner's yes → move → `ls-remote` → production look. Nothing interleaves with the move. A release step that runs a tool the diff changes: none (the diff touches `Child.tsx`, `.eslintrc.json` and a test; the move runs `release-move.js`, not changed by it).
- **Serving refs.** As in the table.

**Runbook (one artifact; results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 0 | `git -C /usr/local/bin/hooks/website diff 395510e 1ad625e > <scratch>.diff && git -C … apply --check -R <scratch>.diff` | exit ≠ 0 → rollback by patch is not clean; say so in the ask | `git diff 395510e 1ad625e` written to a file (132 lines), `git apply --check -R` against the tree at `1ad625e`: exit 0, 22:32Z. Pass |
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `395510e97f82a5177d5edbb38b5d44858f745f3d` → stop; the tip is no longer a fast-forward | `395510e…` at 22:3xZ; re-read just before the move |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master 1ad625e2161b58c5f870c9db369f4056df690a03 --dry-run --reason <text>` | exit ≠ 0 → stop | exit 0 at 22:3xZ ("every check passed; nothing moved") |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | pending |
| 4 | the same command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | pending |
| 5 | `git ls-remote origin refs/heads/master` equals `1ad625e…`; tree on `master`, `git status --porcelain` shows no tracked change | any difference → route to the owner | pending |
| 6 | `git branch -d fix/dialog-closes-on-first-portal-load` (merged); `ls-remote --heads origin 'fix/*'` shows none | `-d` refuses → name it to the owner; do not force | pending |
| 7 | production look, fresh page load of hooks.gg as the test account (`discord-test-browser`): "new message" → "Upload Message" → open "Save To" | the dialog vanishes, or the page flashes to `LoadingDots` → falsity: tell the owner; Vercel promote of the previous deployment is his call | pending |

## User Confirmation

Pending: put to the owner directly by this session as a selection prompt (Phase 2B) with the release identifier, the User-visible flows list from `implementation/fix-dialog-closes-on-first-portal-load-implementation.md`, the gap named in "Release-tip verdict", the Vercel premise and the rollback.

## Release Execution

Not yet executed.

## Chain documents and terminal tokens (Phase 2D steps 2b, 5b, 5c)

To be completed at Phase 2D.

## Post-Release Status

To be completed at Phase 2D.

## Next Actions

To be completed at Phase 2D.
