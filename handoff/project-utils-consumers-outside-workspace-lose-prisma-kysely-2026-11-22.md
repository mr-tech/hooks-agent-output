---
UUID: b47e8a79
Status: Open
Status-Detail: "project-utils no longer installs prisma-kysely at runtime (released 2026-11-21). A tree outside the workspace that loads prisma-kysely through project-utils fails at its next re-pin. Known unread: /usr/local/bin/hooks-deprecated/cdn. Waits on a re-pin of such a tree."
Owning-Stage: owner
Review-Trigger: "when /usr/local/bin/hooks-deprecated/cdn, or any other tree outside /usr/local/bin/hooks/website that names project-utils, is next re-pinned or re-installed against project-utils master"
---

# Handoff — consumers of project-utils outside the website may lose `prisma-kysely`

## What is seeded

Chain `fix-git-dependency-pins` moved `prisma-kysely` from `dependencies` to `devDependencies` in project-utils (`package.json`, released at project-utils `master` `40ba5d3a5b54447abb0dd44a9fcc7b43a35f8165`, 2026-11-21T23:15Z). A consumer's runtime install of project-utils therefore no longer contains `prisma-kysely`, `@prisma/internals`, `@mrleebo/prisma-ast` or their subtree (283 lockfile entries in project-utils' own lock; 144 packages leave website's install).

The condition: **a tree that loads `prisma-kysely` (or those packages) through project-utils' runtime install fails with `Cannot find module 'prisma-kysely'` at its next install of a project-utils commit at or after `40ba5d3`.** Nothing changes for a consumer until it re-pins.

Population read so far (a consumer is a `package.json` naming `project-utils` outside `node_modules`, searched to depth 5 under `/usr/local/bin` and `/home/dev`, excluding `preview-image-generator`):
- `/usr/local/bin/hooks/website`: read; its runtime never imports `prisma-kysely`; re-pinned to `40ba5d3` and released 2026-11-22T17:04Z, build Ready.
- `/usr/local/bin/hooks-deprecated/cdn` (`"project-utils": "github:hooks-gg/project-utils#master"`): **not read** (a read of it was not completed). It is a deprecated tree (`architecture/system-architecture.md` records the owner's 2026-08-23 ruling that cdn is entirely deprecated).
- `/home/dev/review/website`: a review copy of website, same specifier; not read.
- `/usr/local/bin/statbot`, `/usr/local/bin/paracord`: read by the steering thread (no `package.json` names `project-utils`).
- Consumers on other hosts or in other accounts: unread.

The act: before re-pinning or re-installing any such tree, search its source for `prisma-kysely`, `@prisma/internals` and `@mrleebo/prisma-ast` (by import, require and string); if found, either keep the package in that tree's own dependencies or pin it to a project-utils commit before `40ba5d3`.

## Evidence

`deployment/closed/fix-git-dependency-pins-deployment.md` (consumer population by listing, Release 1), `code-review/closed/fix-git-dependency-pins-code-review.md` round 1, "Assumption Not Checked". The project-utils change: `git -C project-utils show 40ba5d3`. Captures: `verification/fix-git-dependency-pins/code-review/` (R1: installed 301 packages before, 18 after, 283 removed, 0 added).

## Origin

Code review round 1 of `fix-git-dependency-pins` ("Assumption Not Checked": no consumer outside the workspace loads `prisma-kysely` through project-utils), carried through the deployment record's release 1 section.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-22T17:05 | devops | Created at the close of release 2 of `fix-git-dependency-pins`, so the condition has a carrier outside the closing documents. |
