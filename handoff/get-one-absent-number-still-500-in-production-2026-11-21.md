---
UUID: 7c3e91a4
Status: Open
Status-Detail: "Escaped defect of fixer chain fix-message-not-found, released to production at website f4baebb (07:51:38Z). For a number no row holds, message.getOne still answers 500 'no result', and /message/m/<id>/edit still shows the blank editor and retries. The other two cases answer the one 404. Cause established: the NoResultError instanceof check compares two copies of kysely's class. Needs a fixer round; no rollback is needed, because the absent-number answer is what production gave before the release."
Owning-Stage: steering thread for the website access surfaces (steering-hooks), to route a fixer round
Review-Trigger: "on delivery to steering-hooks by SendMessage from qa-fix-message-not-found (2026-11-21), and when website src/server/api/routers/message.ts getOne is next edited"
Secret-Files: none
---

# message.getOne still answers 500 for an absent number in production

## What is seeded

**Observed** (row B-1, `handoff/fix-message-not-found-post-deploy-2026-11-21.md`). Live hooks.gg, signed in as test account 1, after
website `master` moved to `f4baebb`. Reads were at 07:53:46Z, then after a 60 s wait at 07:54:27Z to 07:54:31Z, 9 requests in all:
- `6022` and `999999999999` (no row) answer 500 `INTERNAL_SERVER_ERROR` "no result".
- `1000` (a server the account cannot manage) answers the new 404 "This message doesn't exist, or you don't have access to it.".
- `6010` loads.
- One instance (`x-vercel-id` segment `zxj7b`) answered both shapes, so the new build is what serves.
- `/message/m/6022/edit` shows no notice, keeps the editor shell, and logged 4 console errors in 12 s.

Captures: `verification/fix-message-not-found/qa/post-deploy/b1-reads-2026-11-21.json`.

**Cause, established.** `getOne` maps the load's error with `asNotFound(NoResultError)`, which tests `error instanceof NoResultError`
(website `6b539e5`, `src/server/api/routers/message.ts`, `asNotFound`). The class is imported by ESM `import { NoResultError } from
'kysely'`. The Kysely instance that throws comes from `project-utils`' `getPostgres()`, whose `dist/postgres.js` does
`require("kysely")`. kysely 0.26.1's `exports` map sends `import` to `dist/esm/index.js` and `require` to `dist/cjs/index.js`, so the
two are different classes. Under Node:
- `verification/fix-message-not-found/qa/post-deploy/kysely-dual-class-check.mjs` gives `sameClass: false` and
  `cjsErrorInstanceofEsmClass: false`.
- Its positive control, `cjsErrorInstanceofCjsClass`, gives `true`.

The output is in `kysely-dual-class-check.out` beside it. Production's bundled routes show the same effect, as observed above.

**Why every instrument missed it.** The chain's tests, the reviewer's probe and QA's sweep all replaced `project-utils`' `getPostgres`
with a fake driver built from the ESM kysely, so the thrown error and the checked class were one class. The fixer's check (both packages
`readlink` to one `kysely@0.26.1` directory) did not distinguish the two entry files.

**What the fix needs** (the fixer's design to choose; this record states the constraint, not the remedy). The absent-row test in `getOne`
must not depend on class identity across module formats. One form is to test the error by `name === 'NoResultError'`. Another is to
read with `executeTakeFirst` in `getOne`'s own path; `getMessage` has other callers, which the fixer named. The red test must make the
thrown error come from the CommonJS kysely, the form `project-utils` uses, for example a fake driver built with `require('kysely')`. This
is an escaped defect (a release shipped it), so a bug-form test with an `// escaped:` line naming this record is earned.

**Also observed, lower weight** (B-1's layout limb, at `/message/m/1000/edit`, where the notice does render). The editor's header row stays above
the notice: an editable "Message Name" field (placeholder "New Message", value `' '`, neither disabled nor read-only), the
File/Edit/View/Help menu, and a "Send" link to `/message/m/0/send`. So the not-found page still wears a new message's controls (common
brief hazard 5). Whether that is wanted is product copy and needs his word, if a round takes it.

**Unchanged by this.** For the absent number production gives what it gave before the release (500 and the blank editor), so the release
is no regression for that case. The other two cases and the page notice work in production (B-1).

## Evidence

- `verification/fix-message-not-found/qa/post-deploy/b1-reads-2026-11-21.json` (the reads).
- `verification/fix-message-not-found/qa/post-deploy/kysely-dual-class-check.{mjs,out}` (the class check).
- `qa/closed/fix-message-not-found-qa.md` (the Phase 2 PASS this falsifies for the absent-number class; the method failure is above).

## Origin

QA row B-1 of fixer chain `fix-message-not-found`, read post-deploy by `qa-fix-message-not-found`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T07:57 | qa-fix-message-not-found | Created, from B-1's post-deploy read; cause established by the class check. |
