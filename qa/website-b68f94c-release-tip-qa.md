---
ID: n/a
Origin: "release chain/fix-desktop-draft-as-typed -> website master b663b354fb236c3ee58d8b0be01778e1908e0e10 -> b68f94cda114bcef1efd59954aba321e246dd683 (fast-forward)"
UUID: f2a4ebc8
Verified-At: "b68f94c — repos=website; the tip's tree 25ab048b is the Phase 2 Verified-At tree (qa/closed/fix-desktop-draft-as-typed-qa.md, 71fc7b56)"
Status: Release Verified
Status-Detail: "Release-tip verdict for website master b663b35 -> b68f94c. Steps 1b and 2 ran. Of 30 open handoffs, 2 name this website release: the lockfile pin check ran and holds, and this chain's post-deploy carrier fires after the push. There is no gated time-based set."
Phase: 3
---

# QA Release-Tip Verification: chain/fix-desktop-draft-as-typed → website b68f94c

**Release identifier**: `chain/fix-desktop-draft-as-typed`, website `b68f94cda114bcef1efd59954aba321e246dd683`, onto
`origin/master` `b663b35` (a fast-forward of 2 commits).

**Requested by**: `devops-fix-desktop-draft-as-typed`, by SendMessage after the Phase 2 record `71fc7b56`. That record has
since been closed by devops Stage 1 (`46e199f1`) and is now at `qa/closed/fix-desktop-draft-as-typed-qa.md`.

**Scope** (qa-phase-3.md, first line). Devops records the tip's tree as the Phase 2 `Verified-At` tree. I re-derived that at
11:29:50Z:
- `git rev-parse b68f94c^{tree}` gives `25ab048b9081065557c84ca7d73fd87017b0633b`, the tree of the walk's export
  (`verification/fix-desktop-draft-as-typed/qa/fix/meta.txt`).
- `git ls-remote origin master` gives `b663b354fb23…`.
- `git merge-base --is-ancestor b663b35 b68f94c` exits 0.
- `git rev-list --count b663b35..b68f94c` gives 2.
- `git diff --name-only b663b35 b68f94c` lists 6 paths: the 3 production files and 3 test files the review and the walk
  covered.

So only step 1b and step 2's gated time-based set run. Steps 3 and 5 have nothing to compare: one chain is bundled, and the
tree is the Phase 2 tree. The Phase 2 verdict covers the tip: the browser walk at this pass, and the code review's suite,
red tests and controls at the same SHA. No plan-level QA document is reopened (step 1).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T11:30 | devops-fix-desktop-draft-as-typed (SendMessage) | Phase 3 release-tip record for website master `b663b35` → `b68f94c` | Release Verified. The tip is the Phase 2 tree. Step 1b: 30 open handoffs, 2 name this website release; the pin check holds, and the post-deploy carrier fires after the push. Step 2: no gated time-based set. |

## Step 1b — open handoffs whose Review-Trigger names this verdict or a website production push

The record has no `tools/open-handoff-trigger-sweep.py`.

**Enumeration.** A node frontmatter parse of every `handoff/*.md` keeps `Status: Open` and prints each `Review-Trigger` value
whole, with folded lines joined.
- Output: `verification/fix-desktop-draft-as-typed/qa/phase3-handoff-triggers.txt`, "open handoffs: 30".
- Cross-check: `grep -l "^Status: Open" handoff/*.md | wc -l` also gives 30.

I read each value against "this verdict, or a production push of website":

| Handoff | Disposition |
|---|---|
| `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` | **Matches**: "before the next website release whose package.json or lockfile differs from d1bb9b0's" (`git diff --quiet d1bb9b0 b68f94c -- package.json pnpm-lock.yaml` exit 1). **Ran**: the lockfile at `b68f94c` still names the `paracord` tarball `3f203086ae38…` and the `project-utils` commit `749606d01b7f…` (each 4 lines). `package.json` and `pnpm-lock.yaml` are unchanged `b663b35..b68f94c` (exit 0). Capture: `verification/fix-desktop-draft-as-typed/qa/phase3-git-deps-pin-check.txt`. It holds. The handoff stays `Open` (devops's). |
| `handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md` | **Matches**: "the production deploy of website master carrying fix-desktop-draft-as-typed … then P-1". This is devops's Stage 1 carrier for this chain, and this push is its event. It is read after the push, not before this verdict. The production baseline devops asked for (pre-push, unfixed) is `verification/fix-desktop-draft-as-typed/devops/baseline/production-baseline-2026-11-21.md`. |
| `handoff/fix-desktop-draft-as-typed-residue-2026-11-21.md` | Triggers on a draft-store change or a report of lag or a jumping caret. Not fired. |
| `handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md` | This chain's source. "The content editor's commit-on-close is next changed" is fired by this chain, which discharges it at its closure (common brief). Not this verdict's to close. |
| `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md` | Triggers on "a production request-level read of /api/trpc status codes". At 11:27Z, during the baseline, I made four unbatched `message.getOne` GETs of my own from the site's origin with a malformed input shape. All four answered 400. That reads only my own responses and only my input error. It is not a request-level read of production and cannot see outside callers. Not fired. Named here for its owner, steering. |
| `handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` | "when QA next runs in this record". This fires on every QA run, not on this verdict. Its QA item is recorded as discharged in its own `Status-Detail` (the `b663b35` release-tip record read the same). |
| The other 24 | Each `Review-Trigger` names an edit, a report, a host event, a scoping, an intent grant or another chain's release. None names this verdict or a website production push. Each value is in the capture above. |

## Step 2 — gated time-based set

None ran.
- Website's Test Conventions (`agent-output/CLAUDE.md`, "Test Conventions (`website`)") name no gated location for
  time-based tests.
- `git grep -n -E "time-based|TIME_BASED|timeBased" b68f94c -- 'vitest.config.*' package.json` printed no lines (exit 1).

## Verdict

**Release Verified** at website `b68f94c` (tree `25ab048b…`).
- The verdict rests on the Phase 2 record `qa/closed/fix-desktop-draft-as-typed-qa.md` (`71fc7b56`, same tree), and on
  step 1b and step 2 above.
- Release consequence: devops's to establish. The determination records Vercel production from `master` and no
  `.github/workflows`. This record did not read the release mechanism.

## Assumption Not Checked

This record assumes Vercel installs with the frozen lockfile, and does not test it. If it does, Vercel resolves the pinned
`paracord` and `project-utils` commits above.
- **Falsity signature:** the production build of `b68f94c` resolves another commit of either package.
- **Owner:** devops, which reads the deployment. The carrier is `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md`.

Phase 2's own Assumption Not Checked stands: the saved-message route was not walked on the fixed build. Production's unfixed
behaviour on that route now has a baseline (the capture above, message 6008).
