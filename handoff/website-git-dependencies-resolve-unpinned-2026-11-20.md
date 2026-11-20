---
UUID: efcca7d0
Status: Open
Status-Detail: "Website's two git dependencies, paracord and project-utils, are named without a commit in package.json and held only by pnpm-lock.yaml. A lockfile regeneration re-resolves paracord (3f20308 to 1b7cadb, a second zod tree moves) and can move project-utils. Frozen installs, which Vercel and the QA exports use, are unaffected. Carried from plan 018's closure; pre-existing, outside H-002."
Owning-Stage: devops
Review-Trigger: "when website's pnpm-lock.yaml is next regenerated or edited (pnpm install without --frozen-lockfile, pnpm add, pnpm update), or before the next website release whose package.json or lockfile differs from d1bb9b0's"
---

# Handoff — website: `paracord` and `project-utils` are git dependencies pinned only by the lockfile

## What is seeded

`package.json` at website `d1bb9b0` (and at base `7923a1d`) specifies `"paracord": "github:mr-tech/paracord"` (no commit, tag or branch)
and `"project-utils": "github:hooks-gg/project-utils#master"` (a moving branch). `pnpm-lock.yaml` holds them at `paracord` tarball
`3f203086ae38699f26dbee90dadbb395a96be227` (0.0.5) and `project-utils` commit `749606d01b7f2ab6c8cfd920c6ddf23ef75c3a3f`, identical at base and
tip (devops Stage 1 read, `git show d1bb9b0:pnpm-lock.yaml`, lines 166-168, 332-334 and the two package entries). Plan 018's implementer
found that regenerating the lockfile (`pnpm install --lockfile-only --offline`) re-resolved `paracord` to `1b7cadb` (0.0.9) and moved a second
zod tree (3.25.76 → 4.6.7 under `zod-validation-error`), 11 lines added and 15 removed; the regenerated file was discarded and the one specifier
was edited by hand (`implementation/closed/018-next-upgrade-save-size-cap-m2-implementation.md`, the paragraph "Finding (not fixed, outside the plan)").
Code review CR-7 INFO widened it to `project-utils`. A frozen install (`pnpm install --frozen-lockfile`, Vercel's CI default and every QA export) is unaffected.

**What a later stage does:** when the lockfile is next regenerated or a release changes `package.json`, confirm `paracord` and `project-utils` still name
the commits above; pin each by commit in `package.json` by the `pinned-dep-shipping` method if the owner routes it. A zod move under
`zod-validation-error` bears on plan 018's M1-i, which rests on zod 3.22.4 (the zod specifier is pinned exactly at 3.22.4; `zod-validation-error`'s own tree is not).

## Evidence

- Lockfile entries at `d1bb9b0` and `7923a1d`: same `paracord` `3f20308` and `project-utils` `749606d` (devops Stage 1, 2026-11-20).
- Planner batch rows M2-I4 and CR-7 of `planning/closed/018-next-upgrade-save-size-cap.md`, stated limits whose Stage-1 note (confirm both pins at the tip) is discharged by the read above.

## Origin

Plan 018's Planner batch (M2-I4, CR-7), carried here by devops at Stage 1 because the plan closes at Committed.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T07:09 | devops-hooks-018 | Opened at Stage 1; the release tip's lockfile read: `paracord` 3f20308 and `project-utils` 749606d, unchanged from base. |
