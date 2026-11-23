---
ID: n/a
Origin: "release chain/fix-emoji-pretransform-widths -> website master febf20e39905c977b0d42081137817cb7b704478 -> 0411d3ba146018a5a8d3e8a45398d7d04f499d18 (fast-forward)"
UUID: c9a84d4f
Verified-At: "0411d3ba146018a5a8d3e8a45398d7d04f499d18 — repos=website; the tip's tree d4f88461 is the Phase 2 Verified-At tree (qa/closed/fix-emoji-pretransform-widths-qa.md, record b3537900)"
Status: Release Verified
Status-Detail: "Release-tip verdict for website master febf20e -> 0411d3b. Step 1b ran: 35 open handoffs; 8 match the sweep predicate and 1 is triggered by this push (this chain's post-deploy carrier, B-1, read after the deploy). Step 2: website has no gated time-based set."
Phase: 3
---

# QA Release-Tip Verification: chain/fix-emoji-pretransform-widths → website 0411d3b

**Release identifier**: `chain/fix-emoji-pretransform-widths`, website `0411d3ba146018a5a8d3e8a45398d7d04f499d18`, onto `origin/master` `febf20e`. This is a fast-forward of 4 commits.

**Requested by**: `devops-fix-emoji-pretransform-widths`, through `steering-hooks-fixer` (message at about 08:4xZ). The devops record is `deployment/fix-emoji-pretransform-widths-deployment.md`. Its own handoff enumeration is treated as a candidate list, not a result.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-23T08:36 | `steering-hooks-fixer` for `devops-fix-emoji-pretransform-widths` | Phase 3 at the release tip `0411d3b` | Phase 3. The tip is the Phase 2 tree, so steps 1b and 2 ran. Step 1b: 1 of 35 open handoffs is triggered by this push, and it is post-deploy by construction. Step 2: there is no gated time-based set. **Release Verified.** |

## Scope (qa-phase-3.md, first line)

Devops records the tip's tree as the Phase 2 `Verified-At` tree. I re-derived that at 08:36Z:
- `git rev-parse 0411d3b^{tree}` gives `d4f88461c7a03f59e67381f24ab9c33e2f071d28`. The tip is the Phase 2 `Verified-At` commit itself (`qa/closed/fix-emoji-pretransform-widths-qa.md`), so the trees are identical.
- `git ls-remote origin master` gives `febf20e39905…`.
- `git merge-base --is-ancestor origin/master 0411d3b` exits 0, and `git rev-list --count origin/master..0411d3b` gives 4.
- `git diff --name-only origin/master 0411d3b` lists 9 paths: 6 production files under `src/components/SlateEditor/utils/` and `src/utils/markdown/`, and 3 test files.

So steps 3 and 5 have nothing to compare: one chain is bundled, on its own verified tree. Step 1 holds: the Phase 2 document is not reopened.

## Step 1b — open handoffs naming this verdict or a website production push

The record has no `tools/open-handoff-trigger-sweep.py`. The instrument is `verification/fix-emoji-pretransform-widths/qa/phase3/handoff-trigger-sweep.py` (blob `0085c3d0`), and its output is `sweep-output.txt` beside it.
- Command: `python3 -I handoff-trigger-sweep.py /usr/local/bin/hooks/agent-output`, exit 0.
- Population: every `.md` file directly under `handoff/` (`closed/` excluded). That is 35 files, all with `Status: Open`.
- Field: the whole `Review-Trigger` frontmatter value, folded lines included. Folded `>-` values were read in full; see `backfill-valid-guard…` and `message-init-cached-edits…` in the output.
- Predicate (case-insensitive): a file is a candidate when it matches (`website` and any of `push|deploy|release|production|prod|master|vercel`), or `fix-emoji-pretransform-widths|emoji`, or `phase 3|release-tip|release tip`.
- Result: **8 CANDIDATE, 12 NEAR (one half of the first conjunct only), 15 OUT; total 35.**
- Positive control: both handoffs devops created at Stage 1 fall inside the candidates.
- Devops's own enumeration matched a different word set (`website`, `production`, `vercel`, `master`, `release tip`, with any match counting) and listed 16. The two instruments agree on the verdict-bearing result: one handoff is triggered by this push, this chain's post-deploy carrier.

What this push changes is the 9 paths above. None is `package.json`, `src/env.mjs`, `vercel.json`, a file under `src/pages/api/`, `src/server/`, `src/middleware.ts` or `src/providers/MessageProvider/`, and none is the emoji picker or `SlateEditor/index.tsx`.

| # | Handoff | Disposition |
|---|---|---|
| 1 | `fix-emoji-pretransform-widths-post-deploy-2026-11-23.md` | **Triggered by this push.** Its trigger is this release's deploy event, so it is post-deploy by construction and cannot run before this verdict. It carries register row B-1 (owner devops), which is runbook step 9 in the deployment record. It does not gate the release act. |
| 2 | `fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md` | Not triggered. Its trigger is an edit of the picker or `setOnInsert`, or a signed-in guild walk. The diff touches neither. |
| 3 | `fix-api-secret-compare-post-deploy-2026-11-21.md` | Not triggered by this push as an event. Its trigger is the deploy of `0c14d5b`, another chain's release. `git merge-base --is-ancestor 0c14d5b origin/master` exits 0, so that event is already past. This push's deployment also contains `0c14d5b`, but it changes nothing that the handoff's reads observe (the bot endpoint and `secretEquals`). Its reads stay with their owning stage, devops. |
| 4 | `vercel-dashboard-cron-list-after-cron-removal-2026-11-21.md` | Not triggered. Its trigger is the `fix-delete-dead-cron` release, which is already on `master`: `vercel.json` and `src/pages/api/cron.ts` are absent at `origin/master` (`git cat-file -e`, non-zero). The owner's dashboard read stays owed, and this push does not change it. |
| 5 | `project-utils-consumers-outside-workspace-lose-prisma-kysely-2026-11-22.md` | Not triggered. Its trigger is re-pinning a tree outside website; it matched on `master`. |
| 6 | `pusher-message-update-channels-are-public-2026-11-19.md` | Not triggered. Its trigger is an edit of `shared.ts` or `usePusher.ts`, or an access-control chain. The diff touches neither. |
| 7 | `website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md` | Not triggered. Its trigger is a change to the production install or to `package.json`'s dependency sections. The diff touches neither. |
| 8 | `website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` | Not triggered. Its trigger is an edit of the tRPC route, middleware, Redirects or `package.json` deps, a zod or tRPC version change, or a hosting change. The diff touches none of them. |

NEAR rows, read for the predicate's edge (12): none names this verdict or a website production push.
- `qa-014-bc7-closing-observation-and-test-inventory` names "when QA next runs in this record". That fires on a QA run, not on this push or verdict. It has stood through several QA runs since 2026-11-10, and it is outside step 1b's scope. Steering may route it.
- The `src/env.mjs`, `src/pages/api/`, `cron.ts` and `keepMessageNumbers` triggers are edits this diff does not make.

## Step 2 — gated time-based set

Website has none. `vitest.config.ts` at the tip defines two projects, `node` (`src/**/*.test.ts`, `bot/**/*.test.ts`) and `dom` (`src/**/*.test.tsx`). Neither has a flag, a condition or an excluded directory, and `package.json` has only `test` and `test:watch`. `git grep -c -E 'TIME_BASED|RUN_TIMED|runIf|skipIf' 0411d3b` over the test files of both projects exits 1 with 0 bytes of output: no file matches. Nothing to run.

The suite itself is not re-run. The tip is the Phase 2 tree, where it ran 2643/2643 with exit 0 (`verification/fix-emoji-pretransform-widths/qa/suite-0411d3b.{json,exit}`).

## Verdict

**Release Verified** at website `0411d3b`, for the fast-forward `febf20e → 0411d3b`. Any other tip voids it.

Post-deploy, not gating: B-1 (handoff 1 above), owned by devops.

## Assumption Not Checked

This pass assumes that a push of `master` serves the pushed commit on production. Falsity signature: after the push, B-1's read on hooks.gg still shows `x`🙂`lmnopq`. That is devops's to establish; the deployment record lists it as a named risk.
