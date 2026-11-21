---
ID: n/a
Origin: "release chain/fix-recent-message-ids -> website 6f76c6de2daab590777c047e9439cf5f5a9ed215"
UUID: 3b9e71d4
Verified-At: "6f76c6d — repos=website; the tip's tree fc58d634 is the Phase 2 Verified-At tree (qa/fix-recent-message-ids-qa.md, ec750c0)"
Status: Released
Status-Detail: "Release-tip verdict for website master 76da25c -> 6f76c6d. Steps 1b and 2 ran. Of 32 open handoffs, 1 names a website release (a lockfile pin check), which ran and holds. There is no gated time-based set. Released: website master moved to 6f76c6d on 2026-11-21T06:45:05Z (deployment/fix-recent-message-ids-deployment.md)."
Phase: 3
---

# QA Release-Tip Verification: chain/fix-recent-message-ids → website 6f76c6d

**Release identifier**: `chain/fix-recent-message-ids`, website `6f76c6de2daab590777c047e9439cf5f5a9ed215` onto `origin/master`
`76da25c` (a fast-forward).

**Requested by**: `devops-fix-recent-message-ids` by SendMessage, 06:4xZ. Readiness record:
`deployment/fix-recent-message-ids-deployment.md`, which devops is writing.

**Scope** (qa-phase-3.md, first line). Devops records the tip's tree as the Phase 2 `Verified-At` tree. I re-derived that:
`git rev-parse 6f76c6d^{tree}` = `fc58d634ebc3f600524fe7d7c69da1c4a4eb2b8a`, and `master` = `origin/master` = `76da25c`. So only
step 1b and step 2's gated time-based set run here. Steps 3 and 5 have nothing to compare, since one plan is bundled and the tree is
the same one Phase 2 ran on. The Phase 2 document is not reopened.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T06:41 | devops-fix-recent-message-ids, release request | Phase 3 at the release tip `6f76c6d` | Phase 3: Release Verified. Of 32 open handoffs, 1 names a website release; it was run and holds. No gated time-based set exists. |
| 2026-11-21T06:47 | devops-fix-recent-message-ids | Release executed; record closed | Status: Released. Website master 76da25c -> 6f76c6d pushed 2026-11-21T06:45:05Z by release-move.js (exit 0) with this record as its evidence; origin master read back as 6f76c6d. My Assumption Not Checked (Vercel installs with the frozen lockfile) is carried by deployment/fix-recent-message-ids-deployment.md and handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md. |

## Step 1b — open handoffs whose Review-Trigger names this verdict or a website production push

The record has no `tools/open-handoff-trigger-sweep.py`.

**Instrument.** I wrote `verification/fix-recent-message-ids/qa/phase-3/handoff-trigger-sweep.py`, committed with this record.

- It reads every `handoff/*.md` outside `closed/`.
- It joins each frontmatter `Review-Trigger`, folded lines included.
- It prints every handoff whose `Status` is `Open`, and pre-filters on
  `/website|push|deploy|release|master|vercel|hooks\.gg|fix-recent-message-ids|verdict/i`.

**Count.** Output is in `…/phase-3/handoff-trigger-sweep-out.txt`: 32 files read, 32 `Open`, 19 matching the pre-filter. A
cross-check, `grep -l '^Status: *"\?Open' handoff/*.md`, also gives 32.

The pre-filter is not the decision. I read all 32 triggers in that output and judged each against "names this verdict, or a
production push of website".

**Named by the release.** One handoff:

| Handoff | Trigger limb | Run / disposition |
|---|---|---|
| `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` | "before the next website release whose package.json or lockfile differs from d1bb9b0's" | **Ran.** `package.json` and `pnpm-lock.yaml` at `6f76c6d` are identical to `76da25c` (`git diff --quiet`, exit 0), and they differ from `d1bb9b0`. The lockfile still holds `paracord` tarball `3f203086…` and `project-utils` `749606d0…` (`grep -c` 4 and 4; negative control `1b7cadb`, 0). This release moves neither pin. The handoff stays `Open` for its owning stage, devops, since its edit limb is unfired. Capture: `…/phase-3/git-deps-pin-check.txt`. |

**Named by a QA run** ("when QA next runs in this record"). One handoff:

| Handoff | Disposition |
|---|---|
| `handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` | Fired, nothing for QA. Item 1 was discharged on 2026-11-11. Items 2 and 3 are the analyst's and the record vocabulary's. The re-routing request is already in `INBOX.md` from 018's QA. |

**Fired by this chain's edits or opening, not by the push.** These are listed so devops and steering see them at closure.

| Handoff | Disposition |
|---|---|
| `handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md`, `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` | The chain's two sources. Its closure discharges both (brief common part, "Sources"). That closure is steering's or devops's. |
| `handoff/authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19.md` | Its open question, "whether `session.user.guilds` holds only managed guilds", is now **established and tested**. `fetchUserGuilds` keeps only owner or Administrator servers. `src/utils/redis/__tests__/redis.fetch-user-guilds.test.ts` at `6f76c6d` kills the trim-removed mutant and both disjunct mutants (`qa/fix-recent-message-ids-qa.md`, Phase 2 refresh). Closing it is the job of its Owning-Stage, the steering thread. |
| `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md` | Not fired. Its limb "a production request-level read of /api/trpc status codes" fires if devops's post-deploy Vercel log read reads `/api/trpc` status codes. The read the record asks for is `/api/auth/session` errors. |
| `handoff/hydrated-recent-ids-not-canonicalised-2026-11-21.md` (CR-1) | Not fired. Its trigger is a later edit of `keepMessageNumbers` or `hydratedAuthCallback`, and round 2 edited neither. |

**The other 26 triggers.** None names this verdict or a website push. Each names one of:
- an edit to a path outside `git diff --name-only 76da25c 6f76c6d` (8 paths, all under `src/server/` and
  `src/utils/redis/__tests__/`);
- a scoping event;
- a user report;
- a scheduled reader;
- another repository;
- another release (017's "after both releases are live").

Two triggers name paths that resemble this chain's but are different files:
- `pusher-message-update-channels-are-public` names `src/server/api/routers/shared.ts`. This chain edited
  `src/server/api/utils/shared.ts`.
- `get-one-absent-number-fails-without-not-found` names `getMessage` in `utils/shared.ts`, and the diff does not touch that
  function.

## Step 2 — the gated time-based set

**None in this workspace.**
- `vitest.config.ts` at `6f76c6d` has two projects (`node`, `dom`), with no flag-gated or excluded location.
- `package.json` has only `test` and `test:watch`.
- `agent-output/CLAUDE.md`'s Test Conventions name no gated location.

The suite was not re-run here, because the tree is Phase 2's. Phase 2's run of record at this tree: 2283/2283, vitest exit 0
(`verification/fix-recent-message-ids/qa/refresh-6f76c6d/suite-6f76c6d.*`).

## Step 4 — verdict

**Release Verified** at website `6f76c6d` (tree `fc58d634…`), release `chain/fix-recent-message-ids`. Any change to the tip's tree
expires this verdict. At release, devops sets this record to `Released` and closes it with the deployment record (Phase 2D).

## Assumption Not Checked

This pass assumes that Vercel builds the pushed `master` with a frozen lockfile install, and does not test it. The pin check above
reads the lockfile, not what Vercel installs.
- **Signature of falsity:** the deployed build resolves `paracord` other than `3f203086…`, visible in the Vercel build log's
  install lines.
- **Owner:** devops, which owns the git-dependencies handoff.
