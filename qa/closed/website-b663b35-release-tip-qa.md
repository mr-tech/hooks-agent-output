---
ID: n/a
Origin: "release chain/fix-get-one-absent-not-found -> website master b82931402f416e850a785468f9443fa3eadfae44 -> b663b354fb236c3ee58d8b0be01778e1908e0e10 (fast-forward)"
UUID: 46f49f6e
Verified-At: "b663b35 — repos=website; the tip's tree 774b75be is the Phase 2 Verified-At tree (qa/fix-get-one-absent-not-found-qa.md, 5b9472ef)"
Status: Released
Status-Detail: "Released 2026-11-21T10:11:09Z: website master b829314 -> b663b35 on origin (release-move.js exit 0 on this record). Release-tip verdict for website master b829314 -> b663b35. Steps 1b and 2 ran. Of 30 open handoffs, 1 names a website release (the lockfile pin check), and it ran and holds. There is no gated time-based set."
Phase: 3
---

# QA Release-Tip Verification: chain/fix-get-one-absent-not-found → website b663b35

**Release identifier**: `chain/fix-get-one-absent-not-found`, website `b663b354fb236c3ee58d8b0be01778e1908e0e10`, onto `origin/master` `b829314` (a fast-forward of one commit).

**Requested by**: `devops-fix-get-one-absent-not-found`, by SendMessage after the Phase 2 record `5b9472ef`. Devops's packaging capture (`next build` at the tip) is to be written under `verification/fix-get-one-absent-not-found/devops/next-build-b663b35/`. This record does not rest on it.

**Scope** (qa-phase-3.md, first line). Devops records the tip's tree as the Phase 2 `Verified-At` tree. I re-derived that at 10:07Z:
- `git rev-parse b663b35^{tree}` gives `774b75bed23e336b0d536c1c63be300dfcefdfce`.
- `git ls-remote origin master` gives `b82931402f41…`.
- `git merge-base --is-ancestor b829314 b663b35` exits 0.
- `git diff --name-only b829314 b663b35` lists the 6 paths the Phase 2 record verified: 3 production files and 3 test files.

So only step 1b and step 2's gated time-based set run. Steps 3 and 5 have nothing to compare: one chain is bundled, and the tree is the Phase 2 tree, whose verdict (suite 2316/2316 exit 0, the sweep, the probes) covers the tip. No plan-level QA document is reopened (step 1).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T10:07 | devops-fix-get-one-absent-not-found (SendMessage) | Phase 3 release-tip record for website master `b829314` → `b663b35` | Release Verified. The tip is the Phase 2 tree. Step 1b: 30 open handoffs; 1 names a website release, and its pin check holds. Step 2: no gated time-based set. |
| 2026-11-21T10:11 | devops-fix-get-one-absent-not-found | Document closed | Status: Released. The release this record verified was pushed: website `master` `b829314` → `b663b35`, 10:11:05Z to 10:11:09Z, `release-move.js --qa-record` on this record (exit 0). |

## Step 1b — open handoffs whose Review-Trigger names this verdict or a website production push

The record has no `tools/open-handoff-trigger-sweep.py`.

**Enumeration.** A node frontmatter parse of every `handoff/*.md` keeps `Status: Open` and prints each `Review-Trigger` value whole, with folded lines joined.
- Output: `verification/fix-get-one-absent-not-found/qa/phase3-handoff-triggers.txt`, "open handoffs: 30".
- Cross-check: `grep -l "^Status: Open" handoff/*.md | wc -l` also gives 30.

I read each value against "this verdict, or a production push of website":

| Handoff | Disposition |
|---|---|
| `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` | **Matches**: "before the next website release whose package.json or lockfile differs from d1bb9b0's" (`git diff --quiet d1bb9b0 b663b35 -- package.json pnpm-lock.yaml` exit 1). **Ran**: the lockfile at `b663b35` still names `paracord` tarball `3f203086ae38…` and `project-utils` commit `749606d01b7f…`, the commits the handoff records. `package.json` and `pnpm-lock.yaml` are unchanged `b829314..b663b35` (exit 0). Capture: `verification/fix-get-one-absent-not-found/qa/phase3-git-deps-pin-check.txt`. It holds. The handoff stays `Open` (devops's), with its edit limb unfired. |
| `handoff/fix-message-not-found-post-deploy-2026-11-21.md` | Names the production deploy carrying `fix-message-not-found`. That deploy is its recorded E-WEBSITE-PUSH (07:51:38Z, `f4baebb`), so this push is not its event. Its open absent-number limb is re-read by this chain's post-deploy row B-1 (`qa/fix-get-one-absent-not-found-qa.md`, register). That row closes it after this push, per the 08:57Z determination. |
| `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md` | This chain's source. Its trigger, "when … `message.ts` getOne is next edited", is fired by this chain and is being discharged by it. It closes after B-1's post-deploy re-read (determination 08:57Z), not at this verdict. |
| `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md` | Created by this chain (ruling 09:16Z). Its trigger names a later edit of the cited Navigation.tsx lines, not a push. Not fired. |
| `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md` | "when a production request-level read of /api/trpc status codes is next made". Phase 2's 10:01Z read was four unbatched `getOne` calls of my own, from the site's origin. It read only those four responses, which is not a read of production's request-level status codes, and it cannot see outside callers. Not fired. Named here for its owner, steering. |
| `handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` | "when QA next runs in this record". This fires on every QA run, not on this verdict. Its QA item (item 1) is recorded as discharged in its own `Status-Detail`, so nothing is left for QA. |
| `handoff/pusher-message-update-channels-are-public-2026-11-19.md` | Names `src/server/api/routers/shared.ts`, which does not exist at `b663b35` (`ls`). This chain edited `src/server/api/utils/shared.ts`. Neither it nor `usePusher.ts` is a push trigger. Not fired by this verdict. |
| The other 23 | Each `Review-Trigger` names an edit, a report, a host event, a scoping or another chain's release. None names this verdict or a website production push. Each value is in the capture above. |

**This push as an event for this chain's own carrier.** Devops's Stage 1 carrier for B-1 names this push as its E-WEBSITE-PUSH. That is the row's earliest-decidable event, read after the push, not before this verdict.

## Step 2 — gated time-based set

None ran.
- Website's Test Conventions (`agent-output/CLAUDE.md`, "Test Conventions (`website`)") name no gated location for time-based tests.
- `git grep -n -E "time-based|TIME_BASED|timeBased" b663b35 -- 'vitest.config.*' package.json` printed no lines.

## Verdict

**Release Verified** at website `b663b35` (tree `774b75be…`).
- The verdict rests on the Phase 2 record `qa/fix-get-one-absent-not-found-qa.md` (`5b9472ef`, same tree), and on step 1b and step 2 above.
- Release consequence: devops's to establish. The determination records Vercel production from `master` and no `.github/workflows`. This record did not read the release mechanism.

## Assumption Not Checked

This record assumes Vercel installs with the frozen lockfile, and does not test it. If it does, Vercel resolves the `paracord` and `project-utils` commits in the capture above. The manifests are unchanged `b829314..b663b35`.
- **Falsity signature:** the production build of `b663b35` resolves another commit of either package.
- **Owner:** devops, which reads the deployment. The carrier is `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md`.

Phase 2's own Assumption Not Checked stands, carried by B-1: whether the Next bundle loads `shared.ts` and `message.ts` as one module instance.
