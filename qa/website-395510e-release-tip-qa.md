---
ID: n/a
Origin: release website master -> 395510e97f82a5177d5edbb38b5d44858f745f3d
UUID: c080fdf3
Verified-At: "395510e — repos=website; tip tree 28b8af26 = the Phase 2 Verified-At tree"
Status: Release Verified
Status-Detail: "Release Verified at website 395510e (tree 28b8af26), a fast-forward of origin/master 0e3d903. Step 1b: 0 of 22 open handoffs are triggered by this verdict or a website production push. Step 2: this workspace has no gated time-based set. Push next (devops; the owner approves it)."
Phase: 3
---

# QA Release-Tip Verification: website master → 395510e

**Release identifier**: `website master -> 395510e97f82a5177d5edbb38b5d44858f745f3d`.
**Bundled**: one chain, `016-send-check-validity`. Its Phase 2 record is `qa/016-send-check-validity-qa.md`
(record `500a501`, `Verified-At: 395510e`, PASS at plan revision 7). This pass does not reopen it (step 1).
**Requested by**: `devops-hooks-016`, by SendMessage, 2026-11-11 (Phase 2A step 3).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T14:18 | devops-hooks-016 (message) | Phase 3 release-tip verdict | Release Verified at `395510e`. The tip is the Phase 2 tree, so steps 3 and 5 have nothing to compare. Step 1b: 0 of 22 open handoffs are triggered by this verdict or a website production push. Step 2: this workspace has no gated time-based set. |

## Tip identity (re-derived here, not taken from the request)

- `git -C website rev-parse 395510e^{tree}` returns `28b8af26aa27587f5f7f34f5dc91383264ccd40b`. That is the tree of the Phase 2
  `Verified-At` commit itself, since the `Verified-At` is `395510e`. The chain branch head (`rev-parse HEAD`) is
  `395510e97f82…`.
- `git -C website merge-base --is-ancestor origin/master 395510e` exits 0. `git ls-remote origin master` returns `0e3d903c…`.
  The release is therefore a fast-forward, the tree that ships is `28b8af26`, and there is no merge result to construct.
- `git log origin/master..395510e` lists 9 commits, all on `chain/016-send-check-validity`. The bundle is one chain, so there
  is no plan interaction to verify (step 3). The suite is not re-run here, because the Phase 2 runs at this tree stand
  (§ Phase 2 — results of the Phase 2 record).

## Step 1b — open handoffs triggered by this verdict or a website production push

Instrument: `node verification/fix-website-save-gate-embeds/qa-phase3/open-handoff-triggers.js .`, run from the record root.
It is committed at `fc154a2`, sha256 `6124cb19…610f2e`. It reads each `handoff/*.md` frontmatter, keeps `Status: Open`, and
joins the whole `Review-Trigger` value with its folded lines. Output: `verification/016/qa-phase3/open-handoffs.tsv`.
Count: **22** open handoffs. A second instrument, `grep -l '^Status: Open' handoff/*.md | grep -c ''`, also gives 22.

Predicate: the whole trigger names this release-tip verdict, or a production push, deploy or release of `website`.
**Members: 0 of 22**, read row by row from the TSV. As a cross-check, a keyword grep for
`push|deploy|release|verdict|phase 3|ship` over the 22 rows matches 3. All three are about the preview-image-generator service,
which this release does not include: rows 9, 11 and 13 (`preview-image-failure-shows-broken-not-stale-2026-08-24`,
`preview-image-generator-drain-under-load-unobserved-2026-11-08`, `preview-image-generator-host-security-posture-2026-11-08`).

Two triggers outside the predicate do fire on this run:

- `qa-014-bc7-closing-observation-and-test-inventory-2026-11-10` ("when QA next runs in this record"). This chain's Phase 1
  discharged item 1 (handoff changelog row 2026-11-11T10:57). Items 2 and 3 belong to the analyst and to the record
  vocabulary, not to QA. QA owes nothing further, and the handoff stays `Open`.
- `save-gate-embeds-owner-checks-on-hooks-gg-2026-11-11` fires on the owner's saves on hooks.gg. Its carrier is the previous
  release's deployment, and this verdict does not discharge it.

## Step 2 — gated time-based set

None. The Test Conventions in the workspace `CLAUDE.md` name no gated location for time-based cells.
`git -C website grep -nE "TIME_BASED|RUN_TIME|describe\.runIf|it\.runIf|skipIf\(" 395510e -- src bot` exits 1 with no hit.

## Blocking-condition register

The rows are in `qa/016-send-check-validity-qa.md` (B-1 to B-6). This pass appends none. The UAT document and then the
deployment record hold the execution state of each row. The post-deploy rows B-3, B-4 and B-6 go to devops's Stage 1 carrier.

## Verdict

**Release Verified** at website `395510e` (tree `28b8af26`), under the release identifier above. This record states only what
the tip is verified against. What a push of `master` deploys is devops's to establish.

## Assumption Not Checked

This pass assumes that the remote `master` stays at `0e3d903` until the push, so that the release remains this fast-forward.
It does not watch the remote. If the assumption fails, `git ls-remote origin master` will not equal `0e3d903c…` at push time,
or the fast-forward will be refused. Devops closes this at the push, with its `release-move.js` check.
