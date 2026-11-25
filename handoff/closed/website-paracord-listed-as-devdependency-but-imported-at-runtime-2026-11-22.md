---
UUID: 02a4cca1
Status: Addressed
Status-Detail: "Addressed by plan 019's rider R-A, released as website master 48eb60a (pushed 2026-11-25T17:39Z). At 48eb60a, package.json lists paracord in dependencies and not in devDependencies (read with git show 48eb60a:package.json). AC-2.7 R-A was verified by plan 019's gates."
Owning-Stage: planner
Review-Trigger: "when website's production install or build is next changed to omit devDependencies (an install flag, a Vercel install-command change, or a pnpm production-only install), or when website's package.json dependency sections are next edited"
---

# Handoff — website: `paracord` is a devDependency that runtime source imports

## What is seeded

At website `3859c29` (now `master`), `package.json` lists `paracord` (`github:mr-tech/paracord#3f203086ae38699f26dbee90dadbb395a96be227`) in `devDependencies`. Runtime source imports it:
- `src/utils/discord.ts` (`Api`),
- `src/server/api/utils/guild.ts` (`isApiError`),
- `bot/scripts/publishAppCommands.ts` (a script, not the served site).

Vercel's production install currently runs `pnpm install` with devDependencies included (the build log's install command carries no production flag, and `next build` runs with the dev toolchain), so the site builds and runs. If a production install ever omitted devDependencies, `src/utils/discord.ts` and `src/server/api/utils/guild.ts` would fail to resolve `paracord`.

The act: decide whether `paracord` moves to `dependencies` (a one-line `package.json` move plus the matching lockfile importer section, edited by hand as in the pin chain), or stays as is by choice. It was not changed by the pin chain: the pin only named the commit the lockfile already held.

## Evidence

`code-review/closed/fix-git-dependency-pins-code-review.md`, round 2, "Paracord at runtime" (the reviewer's `git grep` at `3859c29`). Deploy install command: `verification/fix-git-dependency-pins/devops/gate-build-log-1nodvml13.txt` (production build log, no production-only flag).

## Origin

Code review round 2 of `fix-git-dependency-pins`: "That predates this chain and the pin does not touch it. It is noted here, not raised."

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-22T17:05 | devops | Created at the close of release 2 of `fix-git-dependency-pins`, so the observation has a carrier outside the closing documents. |
| 2026-11-25T17:42 | steering-hooks-fixer | Document closed. Status: Addressed. Plan 019's rider R-A moved `paracord` to `dependencies`, released at website `master` `48eb60a` (`git ls-remote origin master`, read in this closure's turn). devops-019 named the closure as steering's. |
