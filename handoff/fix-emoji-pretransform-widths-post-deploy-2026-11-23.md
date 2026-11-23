---
UUID: 0ed42776
Status: Open
Status-Detail: "Carries the chain's post-deploy register row B-1 (paste read on the production message editor after the website master release) and its two guidance limbs. Open until a read decides each; blocks nothing before the release act."
Owning-Stage: devops (the chain's devops stage, run in the session that executes the release, through a browser-walker helper)
Review-Trigger: When Vercel production serves a deployment whose commit contains website 0411d3b, the deploy event of the website master release of fix-emoji-pretransform-widths.
---

# Handoff — post-deploy read of fix-emoji-pretransform-widths (website)

## What is seeded

One register row and two guidance limbs, all decidable only after the website `master` release of chain `fix-emoji-pretransform-widths`
serves on production (Vercel deploys `master`; the repository has no `.github/workflows`). None gates the release act. The release is the
move of website `master` from `febf20e` to the chain tip `0411d3b`.

### Item 1 — register row B-1 (post-deploy-observable), carried in full

Source: `qa/fix-emoji-pretransform-widths-qa.md` (now `qa/closed/`), "Blocking-condition register", row B-1, `Verified-At` `0411d3b`.

| Field | Value |
|---|---|
| ID | B-1 |
| Class | post-deploy-observable |
| Condition | C1 (E-1) on production: pasting `x🙂 abcdefghijklmnopq` into the production message editor keeps all 17 letters |
| Primary instrument | The stage browser on the production site's message editor (hooks.gg): paste the line with a real Ctrl+V, read the editor line's text, save nothing |
| Subject / fallback | devops through a `browser-walker` helper; the owner as fallback subject |
| Earliest-decidable condition | The Vercel production deployment of a `master` commit that contains `0411d3b`'s changes is live. Whether the editor is reachable without a save, signed out, is devops's to establish |
| Predicted value | Fixed: the line reads `x`, emoji, ` abcdefghijklmnopq`. Unfixed (base, as measured in `verification/fix-emoji-pretransform-widths/qa/walk-r2/base-step2.json`): `x`, emoji, `lmnopq`. One observation decides it, because the unfixed form loses 11 letters deterministically |
| Failure mode | If production still shows `x`, emoji, `lmnopq`, the fix did not reach the deployed build, and users still lose text after a pasted emoji |
| Owner | devops |
| State | open |

### Item 2 — guidance limbs in the same walk (not register rows)

Composed by `steering-hooks-fixer` for this walk, in the same session as B-1:

- Paste `wow :ok🙂 hi` with a real paste. Expected exactly `wow :ok🙂 hi`, the 🙂 a plain character and no element.
- Where the emoji picker is reachable without signing in, pick a standard emoji into a `js` code line after `x = 1;` and read that
  nothing after the cursor changes. This is QA's picker assumption, standard-emoji limb.

Nothing is saved in any step. Captures go under `verification/fix-emoji-pretransform-widths/devops/`; screenshots stay uncommitted.
If a real browser is not available, the row is recorded "not run" and says so.

## Evidence

- QA walk at the tip and at base: `verification/fix-emoji-pretransform-widths/qa/walk-r2/` (5/5 PASS at `0411d3b`, 5/5 FAIL at `febf20e`).
- Release identity: `git -C website rev-parse 0411d3b` = `0411d3ba146018a5a8d3e8a45398d7d04f499d18`; base `master` at `febf20e`
  (`git ls-remote origin master`, 2026-11-23T08:26Z).

## Origin

`qa/fix-emoji-pretransform-widths-qa.md` Phase 2 (QA Complete, 2026-11-23T08:24Z), register row B-1; guidance from
`steering/fix-emoji-pretransform-widths-brief-devops.md`. Raised by devops Stage 1, step 8.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-23T08:26 | `devops-fix-emoji-pretransform-widths` | Created at Stage 1. B-1 carried in full. No timed read: the walk runs in the release session after the deploy, so no crontab line is installed. |
