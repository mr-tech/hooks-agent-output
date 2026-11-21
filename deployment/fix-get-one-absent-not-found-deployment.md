---
ID: n/a
Origin: fix-get-one-absent-not-found
UUID: fcce3991
Status: Active
Status-Detail: "Stage 1 and Phase 2A complete; nothing pushed. Awaiting the owner's release approval (Phase 2B), asked in this session."
---

# Deployment Record: fix-get-one-absent-not-found

**Plan Reference**: none (fixer chain; the owner's scope words, `steering/fixer-queue-2026-11-21-rulings.md` blocks 2026-11-21T05:32Z and 07:59Z; the scoping determination, `steering/fix-get-one-absent-not-found-rulings.md`, block 2026-11-21T08:57Z, with the 09:03Z, 09:16Z and 09:51Z blocks).
**Stage start**: QA Phase 2 `qa/fix-get-one-absent-not-found-qa.md` (now `qa/closed/`), `Verified-At` `b663b35`, record `5b9472ef`, read at the record at write time. There is no UAT on this chain. Anchors re-read, all `b663b35`: fixer `Handoff-At` (`implementation/fix-get-one-absent-not-found-implementation.md`, record `9e357ef5`), code review `Reviewed-At` `b663b35`, round 1 `APPROVED`, 0 findings (record `84473927`), QA Phase 3 `Verified-At` `b663b35` (record `0f0b91bd`).
**Roadmap**: `agent-output/roadmap/` was not read for this stage; the determination names no epic or criterion, so the chain owes the roadmap no entry. Nothing is cited from it.
**Release Identifier**: website `master` `b82931402f416e850a785468f9443fa3eadfae44` → `b663b354fb236c3ee58d8b0be01778e1908e0e10` (one commit, a fast-forward). `package.json` carries no `version` field (`grep -c '"version"'` 0), the repo has no CHANGELOG and no tags (`git tag | wc -l` 0); none synthesised.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T10:10 | steering-hooks (brief `steering/fix-get-one-absent-not-found-brief-devops.md` with its common part, on QA's Phase 2 PASS at `b663b35`) | Stage 1 and Phase 2A for `chain/fix-get-one-absent-not-found` at `b663b35` | Briefs, QA, code review, fixer document and rulings read whole. Tip build `next build` exit 0 in an isolated export (removed). Both dry runs passed; the reversing patch applies. QA Phase 3 requested by message and received (record `0f0b91bd`). Carrier handoff for B-1 created. Fixer, code-review and QA documents set `Committed` and moved to `closed/`. Nothing pushed. Disclosures: the first two attempts at the tip build failed on my own invocation (the first because the backgrounded wrapper exited and the scope killed the copy; the second because the script `cd`s into the export and I passed relative log paths); each partial export and capture directory was removed and the build re-run with absolute paths — no gate was involved. |

## Stage 1 verification (website, at b663b35)

| Check | Result | Instrument |
|---|---|---|
| Tree on the chain branch at the head under release | `chain/fix-get-one-absent-not-found`, HEAD `b663b354fb236c3ee58d8b0be01778e1908e0e10`, no upstream; `master` and `origin/master` both `b82931402f416e850a785468f9443fa3eadfae44` | `git branch --show-current`; `git rev-parse`; `git ls-remote origin master` at 2026-11-21T10:06Z |
| Nothing in scope uncommitted | website `git status --porcelain`: `?? .playwright-mcp/` only (foreign; `release-move` leaves 17 untracked paths alone). Record: the chain's stage documents are committed (fixer `9e357ef5`, code review `84473927`, QA `5b9472ef`, Phase 3 `0f0b91bd`); this stage's `verification/fix-get-one-absent-not-found/devops/` and the carrier handoff are committed with this record (below). The fixer's, reviewer's and QA's `verification/fix-get-one-absent-not-found/` subtrees were already committed (QA `d1c5744e`, `ebe3a2c9`) | `git status --porcelain` |
| Chain range | 1 commit `b829314..b663b35`; 6 paths (3 production, 3 test). Production lines added: `git diff --numstat b829314 b663b35` over production paths: `Navigation.tsx` 139, `shared.ts` 7, `message.ts` 3 = **149**; the fixer's, reviewer's and QA's counts are 149 (136 of `Navigation.tsx`'s are a re-indent). No disagreement | `git log`; `git diff --numstat` |
| Fast-forward onto production | `git merge-base --is-ancestor` (checked by `release-move.js`: "ff-from-remote ok"); remote `master` = `b829314` | `ls-remote`; dry run |
| QA binds the tip | Phase 2 `Verified-At` `b663b35`; the tip's tree is `774b75bed23e336b0d536c1c63be300dfcefdfce` (`git rev-parse b663b35^{tree}`), the tree that verdict ran against (the same SHA). QA's Phase 3 record re-derived the same tree | QA documents |
| Release consistency | `package.json` has no `version`; no CHANGELOG, no tags. `git diff --name-only b829314 b663b35` outside `src/` prints 0 lines; `git diff --quiet b829314 b663b35 -- package.json pnpm-lock.yaml vercel.json` exit 0. The one cross-repo dependency, `project-utils: github:hooks-gg/project-utils#master`, is locked to `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f` (`pnpm-lock.yaml` lines 166–168, 5397–5398), the current remote `master` of project-utils (`git -C project-utils ls-remote origin master`) and the sibling clone's HEAD. The chain changes nothing in project-utils; the pin names the intended target | exit status; `ls-remote` |
| Open disagreements with predecessor documents | none open. Recorded, not disputed: the reviewer's and QA's lint disposition (five pre-existing Navigation.tsx findings shipped and recorded, `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md`, UUID b88e8be8, stays `Open` on its own trigger) | the documents |

## Blocking-condition register (the chain's one register)

Authority: `qa/closed/fix-get-one-absent-not-found-qa.md`, "Blocking-condition register": **one row, B-1, class post-deploy-observable**, so no pre-release row is unterminated and nothing blocks the commit. The code review and the fixer's document carry no register row. Step 2c (plan at rest) does not apply: the chain has no plan, critique or Planner batch. B-1 never blocks the release act; it is carried in full, with its prediction, instrument and falsifier, by `handoff/fix-get-one-absent-not-found-post-deploy-2026-11-21.md` (UUID b5c69a32, `Owning-Stage` qa, `Review-Trigger` the E-WEBSITE-PUSH row of its ledger), named here and in QA's closure row. No crontab line: the reader needs the signed-in test-account browser, which this session does not carry (the `discord-test-browser` skill, "present only in sessions launched with `--browser` and in qa/uat"); the reader is a qa-role session steering starts or wakes after my release-complete cue, as for the chain before this one.

## Stage 2 readiness (Phase 2A)

Included: chain `fix-get-one-absent-not-found` only. Execution mode: **Mode A, agent-executed**, the move run in this session after the owner's answer to the ask put in this session (a role session, not a subagent).

| Step | Result | Instrument |
|---|---|---|
| All chains committed | 1 of 1 | — |
| Tip assembled | the chain branch itself, a fast-forward of remote `master`; no merge commit, nothing assembled on a scratch branch | `release-move.js … --dry-run`: "ff-from-remote ok" |
| Release-tip verdict | QA Phase 2 `Verified-At` `b663b35` covers the tip (tree `774b75be…` both sides). Phase 3 record `qa/website-b663b35-release-tip-qa.md`, `Phase` 3, `Status` `Release Verified`, `Verified-At` `b663b35`, record commit `0f0b91bd`. Step 1b: 30 open handoffs read; one names a website release (the lockfile pin check), ran and holds; no gated time-based set | QA's record and its message of 2026-11-21T10:0xZ |
| Populations (4b) | website is a leaf deployment. The one pin, project-utils, is unchanged and current; no package, subscriber or consumer is changed (outside `src/`, 0 paths). Re-derived at the mechanism | exit status |
| Packaging (build at the tip) | `pnpm exec next build` (Next.js, node v24.14.0, pnpm 10.28.2) in an isolated `git archive` export of `b663b35` (tree `774b75be…`), `node_modules` copied, the Production variable names set to dummy values (no `.env.local` copied, nothing remote written), under `systemd-run --user --scope` caps (900 s, 6 G, 2000 tasks): **exit 0**, "Compiled successfully", 9 static pages, `/message/m/[id]/edit` and the other app routes built; 2026-11-21T10:08:07Z to 10:08:34Z. Export deleted (`ls -d` exit 2). The diff carries no lockfile or package-manager change, so the host-major install check does not apply | `verification/fix-get-one-absent-not-found/devops/next-build-b663b35/{build.log,build-output.txt,meta.txt,exit}`, `…/devops/build-tip.sh` |
| Workspace | the chain commit is on the branch; website porcelain as above. Predecessor exclusions: `.env.local*`, `.next`, `.vercel`, `node_modules` and tsbuildinfo files are ignored; the untracked `.playwright-mcp/` is left alone by `release-move`. None affects a release mechanism: the move is a push of a commit | `git status --porcelain`; dry-run output |
| History rewritten | no; the verified commit is the tip and is reachable | `git merge-base --is-ancestor` |
| Serving refs | remote heads: `backup`, `external-message-api`, `master`, `redesign`, `regex-refactor`. `release-move.js --report`: "one serving ref at origin (master); no pair". The split check is trivially met; no ref but `master` moves | `release-move.js --report` exit 0 |

**Assumption Not Checked, swept (Phase 2A step 9b).**
- **Code review and QA Phase 2** (the same one): the Next production bundle holds `shared.ts` and `message.ts` as one module instance in the tRPC route. The release form exercises it on every `message.getOne` for an absent number. The read that closes it is B-1's absent-number limb after the push; it cannot be run before, since it needs the new code serving. No live session could run it before the first ref moves. The fix does not depend on which kysely build the query runs under (the thrown class is the website's own: reviewer's read of kysely's `executeTakeFirstOrThrow`, plus the real-postgres probe at both SHAs), so only the module-identity limb is open.
- **QA Phase 3** (Vercel installs with the frozen lockfile): the diff changes no manifest or lockfile (`git diff --quiet … -- package.json pnpm-lock.yaml vercel.json` exit 0), so the resolution is the one Vercel made for the build now serving. Not read from the host; **accepted as written, a named risk**, with `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` as its owner (stays `Open`, its edit limb unfired).
- **Hazards the sweep did not cover** (the brief): the outer `/message` header; `SendMenuTitle`; the Next bundle's module resolution (above); production data. Named risks, not closed by this release.

**Phase 2C block, re-derived against the mechanism (repository: website; the only repository shipped):**
- **Deploy mechanism.** Re-derived: `website/.github/workflows` is absent (`release-move.js` prints "workflows none … a push to master triggers no GitHub Actions workflow"); `vercel.json` holds only a `crons` entry, unchanged by the diff. Vercel's git integration is re-derived from earlier pushes, not read from the host: the closed record `deployment/closed/fix-message-not-found-deployment.md` (push of `f4baebb`, 2026-11-21T07:51:38Z) and its B-1 read, where hooks.gg answered `1000` with a 404 text that exists only in that push's code within minutes. **Accepted as written, a named risk**: which commit the integration checks out is its default-ref behaviour. The push is the deploy evidence.
- **Rollback.** Dry-run: `git diff b829314 b663b35` written to `verification/fix-get-one-absent-not-found/devops/release-b829314-b663b35.diff` (23952 bytes); `git apply --check -R` on it against the tree at `b663b35`, exit 0 (`rollback-apply-check.exit`). The owner's established fast path, Vercel promote of the previous deployment (the one serving `b829314`), is not exercisable from here: **accepted as written**. A git rollback is a new revert commit pushed as a fast-forward, a new ask. The change writes no schema and no stored value; a rollback restores the 500 for an absent number and the editor bar on the not-found page.
- **Ordering.** Website only. The diff is `src/` only and uses no new column, table or env variable; project-utils is unchanged; no migration. Order: dry run, QA's Phase 3 record, the owner's yes, the move, `ls-remote`, then B-1 (the carrier's reader). Nothing interleaves with the move.
- **Serving refs.** As in the table: `master` only.
- **A release step that runs a tool the diff changes**: none; the move runs `release-move.js` from `~/.claude/tools/`, which this diff does not touch.

**Read rows run once before the first go (live value beside the prediction):**

| Row | Pre-push read | Prediction | Reading |
|---|---|---|---|
| B-1 baseline (absent-number limb, production before the push) | QA's read-only run at 2026-11-21T10:01:25Z, `verification/fix-get-one-absent-not-found/qa/prod-getone-pre-deploy-2026-11-21T1001Z.json`: `6022` and `999999999999` give 500 `INTERNAL_SERVER_ERROR` "no result"; `1000` gives 404; `6010` gives 200 | the old build gives 500 for an absent number | as predicted. **Not re-run by this session**: it has no `mcp__playwright__*` tools. The value is QA's, and it is a baseline of the unfixed state only |

**Runbook (one artifact; the results fill in on execution):**

| # | Step | Abort criterion | Result |
|---|---|---|---|
| 1 | `git -C /usr/local/bin/hooks/website ls-remote origin master` | not `b82931402f416e850a785468f9443fa3eadfae44` → stop; the tip is no longer a fast-forward and the verdict must be re-taken | |
| 2 | `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master b663b354fb236c3ee58d8b0be01778e1908e0e10 --dry-run --qa-record /usr/local/bin/hooks/agent-output/qa/website-b663b35-release-tip-qa.md` | exit ≠ 0 → stop | an earlier dry run with the `--reason` form: exit 0 at 2026-11-21T10:07:51Z (`release-move-dry-run-1.txt`); with `--qa-record`: exit 0 at 2026-11-21T10:08:47Z, "ff-from-remote ok; sibling serving refs (none) on one line ok … DRY RUN: every check passed; nothing moved" (`release-move-dry-run-2.txt`). Re-run immediately before step 4 |
| 3 | the owner's yes to the release, in this session | no yes → Aborted; nothing moved | |
| 4 | the step 2 command without `--dry-run` (moves local `master`, pushes, switches the tree back to `master`) | exit 2 → nothing moved, stop; exit 1 → read the report for ref state, route to the owner | |
| 5 | `git ls-remote origin refs/heads/master` equals `b663b354…`; tree on `master`; `git status --porcelain` shows only `?? .playwright-mcp/` | any difference → route to the owner | |
| 6 | `git branch -d chain/fix-get-one-absent-not-found` (merged); `ls-remote --heads origin 'chain/*'` shows none | `-d` refuses → name it to the owner; do not force | |
| 7 | write E-WEBSITE-PUSH into the carrier handoff's ledger; send steering the release-complete cue naming the B-1 reader | — | |
| 8 | **B-1**: carried by `handoff/fix-get-one-absent-not-found-post-deploy-2026-11-21.md`, not run by this session | the handoff's falsifier → the owner, through steering | |

## User Confirmation

Pending. To be put to the owner directly by this session as a blocking selection prompt (`~/.claude/state/prompt-gate-off` absent, `ls -d` exit 2, read at 2026-11-21T10:09Z before this record was written).

## Release Execution

Pending (Mode A).

## Post-Release Status

Pending.

## Next Actions

Pending.
