---
ID: n/a
Origin: fix-normalize-fence-loop
UUID: a0de90fd
Status: Active
Status-Detail: "Stage 1 done (documents Committed, closed, record 3376c7e0). Phase 2A readiness complete at website af3d95a; waiting on QA's open-handoff sweep (step 1b) for the tip, then the owner's release approval. Nothing pushed."
---

# Deployment Record: fix-normalize-fence-loop

**Plan Reference**: none (fixer route; determination `steering/fix-normalize-fence-loop-rulings.md` block "2026-11-23T08:55Z"; the owner's word for devops to website `master`, same block).
**Stage start**: the QA Phase 2 verdict, `qa/closed/fix-normalize-fence-loop-qa.md`, `QA Complete`, `Verified-At: af3d95a — repos=website` (record `c03ffba3`, re-read at write time; the stage documents were closed `Committed` at record `3376c7e0`). The code review's anchor reads `Reviewed-At: 61e5dfe — repos=website`, Round 1 sub-entry 1b `APPROVED` (record `1e93f428`), re-read at write time. The fixer's anchor reads `Handoff-At: 61e5dfe — repos=website`. No UAT on a `fix-` chain.
**Roadmap**: `agent-output/roadmap/` holds only `.gitkeep`; proceeding with reduced context, nothing cited. The scoping determination names no epic or criterion, so no roadmap obligation is owed (deployment-record.md step 6).
**Release Identifier**: website `master` → `af3d95acc4f4b1b25f78b71bd2baa555c0724a72` (no `version` field, no tags, no CHANGELOG; none synthesised).
**Brief**: `steering/fix-normalize-fence-loop-brief-devops.md` with `…-brief-common.md`; both read whole.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T13:15 | `steering-hooks-fixer` (brief above) | Stage 1 and Phase 2A for `chain/fix-normalize-fence-loop` at `af3d95a` | Stage 1 done: implementation, code-review and QA documents carry Status `Committed` and are in `closed/` (record `3376c7e0`). Tip build exit 0, rollback patch dry-run exit 0, `release-move.js` dry run exit 0. Nothing pushed. Disclosure: the record's stamp gate refused three changelog stamps I typed ahead of the clock in the closed documents; I restamped them from `date -u`. Waiting on QA's step 1b, then the owner's ask |

## Stage 1 verification (website, at af3d95a)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-normalize-fence-loop`, HEAD `af3d95acc4f4b1b25f78b71bd2baa555c0724a72`; no upstream; nothing pushed | `git branch --show-current`; `git rev-parse HEAD` |
| Nothing in scope uncommitted | website `git status --porcelain`: only `?? .playwright-mcp/` (not this chain's); record repo, `git status --porcelain` over `verification/fix-normalize-fence-loop`, `implementation`, `code-review`, `qa`, `deployment`: empty before this record | `git status --porcelain` |
| Chain range | 9 commits `0411d3b..af3d95a`; 9 paths; production paths `slate.d.ts` +4, `codeFence.ts` +20 (new), `flattenNodeText.ts` +1, `getInitialValue.ts` +11, `withNormalizeNode.ts` +32 = 68 added lines; three test files | `git log`; `git diff --numstat 0411d3b af3d95a` |
| Fast-forward onto production | `git merge-base HEAD origin/master` = `0411d3ba146018a5a8d3e8a45398d7d04f499d18`, equal to remote `master` (`git ls-remote origin master`, 13:09Z and 13:15Z) | `merge-base`; `ls-remote` |
| QA binds the tip | Phase 2 `Verified-At af3d95a`, the same commit as the tip; tree `1b9682356f1897435fab391f6a4e64768dbb2303` (`git rev-parse af3d95a^{tree}`). QA also records `git diff --quiet 61e5dfe af3d95a -- ':!*__tests__*'` exit 0, so production code equals the reviewed `61e5dfe` | QA document |
| Release consistency | `package.json` carries no `version` field; no CHANGELOG, no tags. The two cross-repo pins, `project-utils` (`github:hooks-gg/project-utils#40ba5d3a…`) and `paracord` (`github:mr-tech/paracord#3f203086…`), are unchanged: `git diff --stat origin/master HEAD -- package.json pnpm-lock.yaml vercel.json next.config.js` printed nothing | `git diff --stat` |
| Open disagreements with predecessor documents | none. QAF-4 is routed to S-29 and does not hold the release (QA's Handoff). The code review's Assumption Not Checked was discharged by QA (mounted-editor test, dev-build walk, per QA's document) | documents read |

## Blocking-condition register

Authority: `qa/closed/fix-normalize-fence-loop-qa.md`, "Blocking-condition register": **no rows**. No pre-release row exists, so none is unterminated, and QA records no post-deploy row, so Stage 1 step 8 creates no carrier handoff and installs no crontab line. QA's one Assumption Not Checked (the production bundle behaves as `next dev` for open, leave and keystroke) names devops as owner; this record carries it as the post-deploy walk below, a read run in this release session straight after the deploy. A walk that finishes inside this session never holds the record open, so no handoff is written for it.

## Stage 2 readiness (Phase 2A, 2026-11-23T13:15)

Included: chain `fix-normalize-fence-loop` only. Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 | — |
| Tip assembled | the chain branch itself: a fast-forward of remote `master`, no merge commit | `release-move.js website master af3d95a… --dry-run --reason "…"` exit 0, "ff-from-remote ok; sibling serving refs (none) on one line ok" |
| Release-tip verdict | The assembled tip is the Phase 2 `Verified-At` commit, so the tip's tree is that verdict's tree (`af3d95a^{tree}` = `af3d95a^{tree}`). Phase 2 covers it. Owed: QA's step 1b, the open-handoff sweep (`stage-procedures/qa-phase-3.md`). The record has no `tools/open-handoff-trigger-sweep.py`; my own read-only enumeration over `handoff/*.md` (35 files, 34 with `Status: Open`, the whole `Review-Trigger` value matched on `website`, `production push`, `push of`, `master`, `this verdict`, `release`, `deploy`, `editor`, `slate`, `normali`) lists 21 records. None names this verdict, this release's push, or a file this diff touches (`codeFence.ts`, `getInitialValue.ts`, `flattenNodeText.ts`, `withNormalizeNode.ts`, `slate.d.ts`). Nearest miss: `fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md` (trigger: the emoji insert handler or `SlateEditor` `setOnInsert` next edited, or a signed-in guild session walk). This diff does not edit that path, so it is not triggered. Two name other chains' shipped events (`fix-api-secret-compare-post-deploy`, `vercel-dashboard-cron-list-after-cron-removal`). QA's own sweep is requested of steering before the move | `python3` read of `handoff/*.md` frontmatter |
| Consistency | see Stage 1 table | |
| Populations (4b) | the release has no consumer or pin population of its own: website is a leaf deployment; the two pins and the lockfile are unchanged in the range | `git diff --stat` printed nothing |
| Packaging (build at the tip) | `npx next build` (Next.js 16.4.6, Turbopack) in a `git archive` export of `af3d95a` (tree `1b968235…`) with a full copy of `node_modules`, under `systemd-run --user --scope -p MemoryMax=8G`: **exit 0**, "Compiled successfully", 13:14:34Z to 13:14:59Z. Env: `SKIP_ENV_VALIDATION=1` and three dummy values on the command line; no `.env*` value was read. Export deleted (`ls -d` no such path), no `next build` process left (`ps` count 0). No lockfile or package-manager change, so the host-major install check does not apply | `verification/fix-normalize-fence-loop/devops/next-build-af3d95a.{txt,exit}`, `…-times.txt` |
| Workspace | website `git status --porcelain`: only `?? .playwright-mcp/`; HEAD `af3d95a` on the chain branch. Predecessor exclusion (untracked `.playwright-mcp/` captures): `release-move` reported "untracked 17 path(s) left alone", so it affects no release mechanism | dry-run output |
| History rewritten | no; the verified commit is the tip and reachable | `git cat-file -e` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor` (`git ls-remote --heads origin`, 13:15Z). Only `master` is in release-move's serving list: "one serving ref at origin (master); no pair" (`--report` exit 0) | `release-move.js website --report` |

**Phase 2C block (re-derived against the mechanism, per repository: website):**
- **Deploy mechanism.** Re-derived: `.github/` has no `workflows/` (`git ls-tree -r --name-only HEAD | grep -c '^.github/workflows'` gives 0); `release-move` prints "workflows none"; `vercel.json` is absent; `package.json` has no deploy script. Vercel look-only reads (`vercel ls --prod`, `vercel inspect`, 13:12Z): the newest production deployment `hooks-gg-website-c8t6ruw19-hooks-gg.vercel.app`, Ready, created 08:38:24Z (the previous release's push), carries the aliases `hooks.gg`, `www.hooks.gg` and `hooks-gg-website-git-master-hooks-gg.vercel.app`, so a `master` push is what Vercel's git integration builds as production. **Accepted as written, a named risk**: which commit Vercel's integration checks out for that build (its default-ref behaviour) is not read here; the post-deploy read of the new deployment is the check.
- **Rollback.** The reversing patch was dry-run: `git diff 0411d3b af3d95a` written to `verification/fix-normalize-fence-loop/devops/release-0411d3b-af3d95a.diff` (503 lines), then `git apply --check -R` against the tree at `af3d95a`, exit 0 (the revert applies cleanly). The established fast path is a Vercel promote of the previous deployment (`c8t6ruw19`, not exercised, accepted as written). A git rollback is a new revert commit pushed as a fast-forward, and needs a new ask.
- **Ordering.** Dry run → QA's step 1b → the owner's yes → move → `ls-remote` → Vercel read → post-deploy walk. Nothing interleaves with the move.
- **Serving refs.** As in the table.
- **Release tooling.** `release-move.js` takes the repository as a path relative to the workspace root (`/usr/local/bin/hooks`) or absolute.

**Runbook (one artifact; results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `0411d3ba146018a5a8d3e8a45398d7d04f499d18` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | `0411d3b…` at 13:15Z; to be re-read just before the move |
| 2 | QA's step 1b recorded for this tip | no record → the move takes neither `--qa-record` nor `--reason`; stop | pending |
| 3 | `cd /usr/local/bin/hooks && node ~/.claude/tools/release-move.js website master af3d95acc4f4b1b25f78b71bd2baa555c0724a72 --dry-run <evidence flag per step 2>` | exit ≠ 0 → stop | a dry run with `--reason` exited 0 at 13:13Z ("every check passed; nothing moved"); to be re-run after step 2 |
| 4 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | pending |
| 5 | the same command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | pending |
| 6 | `git ls-remote origin refs/heads/master` equals `af3d95a…`; tree on `master`, `git status --porcelain` shows no tracked change | any difference → route to the owner | pending |
| 7 | `git branch -d chain/fix-normalize-fence-loop` (merged); `ls-remote --heads origin 'chain/*'` shows no chain branch on origin | `-d` refuses → name it to the owner; do not force | pending |
| 8 | look-only: `vercel ls --prod` shows a new production deployment, Ready, serving `https://hooks.gg`; `vercel inspect` names the alias (`timeout 60`, stdin closed, retry twice) | not Ready, or Error → report to the owner; never redeploy or change settings | pending |
| 9 | post-deploy walk on hooks.gg production, signed out, saving nothing, by a `browser-walker` helper: (1) paste `> a`, a bare code-fence line, then `foo` into the message editor and type one character: accepted, no error; (2) paste `>>> a` then `b` on the next line and leave the box, read the text back: unchanged | the character is lost or a "Could not completely normalize" error shows, or the text reads `> a` / `> b` → the fix did not reach the build; report to the owner, a promote of the previous deployment is his call | pending |

## User-visible flows (the fixer's, quoted to the owner with the release)

From `implementation/closed/fix-normalize-fence-loop-implementation.md`, "User-visible flows":

1. A message with a quote line and a code block with no language opens, and you can type anywhere in it. Before the fix every keystroke was lost.
2. A message with a `>>>` quote, opened and closed without editing, keeps its text exactly. This holds in titles and field names too.
3. Typing `>>> ` at the start of a line makes the rest of the message a quote, and the saved text keeps `>>> `.
4. Pressing Enter inside a `>>>` quote starts a new quoted line with no marker of its own.
5. Pressing Backspace at the start of a `>>>` line removes the quote from that line and the lines after it.
6. Copying quoted lines from the editor copies them as they are written (`>>> ` kept, the lines after it without `> `).

## Forward items beyond the register (deployment-record.md step 5c)

| Item | Carrier |
|---|---|
| A quote line taken into a newly opened code block loses its `> ` on save (same at base); QAF-4 (346 of 15,480 random edits) is a wider trigger for the same mechanism | row S-29 of `verification/slate-formatting-effort/scoping/inventory.md`, owned by `steering-hooks-fixer` for the Slate formatting effort; QA's `INBOX.md` entry "2026-11-23 — qa-fix-normalize-fence-loop — FYI" |
| Residue: messages already saved with a rewritten `>>>` text stay rewritten; the original is not recoverable | the fixer's Diagnosis, "Residue in production"; the owner's to check (production data) |
| Not traced: whether opening a box without saving persisted the rewrite on the server | fixer's Diagnosis; uncarried beyond that document |
| Assumption Not Checked, code review (mount) | discharged by QA (C4), per QA's document |
| Assumption Not Checked, QA (production bundle against `next dev`) | runbook step 9 |
| Architecture entry | none known; steering lodges any at closure (brief) |
