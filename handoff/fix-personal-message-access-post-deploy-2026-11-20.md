---
UUID: 9c923fab
Status: Open
Status-Detail: "Carrier of fix-personal-message-access's post-deploy rows. B-2 and B-1 are EXECUTED on the fixed limb (2026-11-20, uat-hooks-fix-personal-message-access); R-1, the owner's residue read of the production Messages table, is outstanding and his, put by steering. No row gates the release act or the commit."
Owning-Stage: uat
Review-Trigger: "the production deploy of website master carrying the fix (the E-WEBSITE-PUSH row of this record's event ledger filled, and the deployment Ready) — then B-2 first and B-1 after it; for the residue read, the owner's answer to steering's release question"
---

# Handoff: fix-personal-message-access post-deploy rows (B-2, B-1, residue read)

## What is seeded

The fixer chain `fix-personal-message-access` ships website `master` (Vercel production, by git integration; there is no beta and
`website/.github/workflows` is absent). Its fix is committed on `chain/fix-personal-message-access` at `983681c` and was not pushed when
this record was written (it was pushed at Stage 2: see the ledger). Three items can only be decided against production once the push has deployed. None gates the release act.
The rows are QA's register's (`qa/closed/fix-personal-message-access-qa.md`, "Blocking-condition register", rows B-2 and B-1,
class post-deploy-observable), carried in full. The register is point-in-time; this record's `Result` lines are authoritative on
execution state.

**Mechanism.** No crontab line and no launcher: the reader is a uat-role session, spawned by steering after the push, because
the read crosses a Discord OAuth sign-in and is not a single scripted look. It uses the test accounts on live hooks.gg under his standing
ruling (`steering/015-rulings.md`, line 429). Screenshots stay untracked and are never committed (his 09:01Z ruling,
`steering/017-rulings.md`). The reader never writes the event ledger; devops does, at Stage 2.

Together B-2 and B-1 are security's RC-2 (`security/fix-personal-message-access-security-audit.md`, Required Controls): the one read of
the session path (the session carrying the caller's own id) on production. That assumption is the Assumption Not Checked of both
the code review and security's identity instrument, run locally only.

## Event ledger (devops writes; a reader never edits it)

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-20T01:33:53Z to 01:33:58Z (`release-move.js` exit 0; `ls-remote` read back at 01:33:58Z) | website `master` `983681ca6cd7cbacd0796ed093e094057ad7f9be` (was `787bec5627702d2881b826e596ec2b8f8853c4fa`) | devops, Stage 2, on his release approval at the Phase 2B prompt (`deployment/fix-personal-message-access-deployment.md`) |

## Rows, carried in full from the register

### B-2  (uat-role session; read first)

- **Class**: post-deploy-observable (running-code precondition)
- **Condition**: production serves the fixed `messageIdShape`, which settles that the fix is the running code before B-1 is read.
- **Instrument**: signed in to hooks.gg as a test account, `GET /api/trpc/message.getOne?input={"json":"99999999999999999999"}`, then
  read the HTTP status and the error code.
- **Subject / fallback**: uat-role session on the test accounts / owner.
- **Earliest decidable**: a Vercel production deploy of website `master` whose tree contains `75f1543`'s production files (the release
  tip `983681c` does).
- **Predicted**: fixed, 400 `BAD_REQUEST` (the shape refuses before any query). Unfixed, 500 (`787bec5`'s `/^[0-9]+$/` admits the number
  and postgres raises out of range). One observation decides.
- **Failure mode**: if it still answers 500, the deploy is not serving the fix and B-1 says nothing.
- **Known read**: signed out, at the minting read 2026-11-19T23:45:54Z, the answer is 401 `UNAUTHORIZED`, because the auth middleware answers
  before the input (`verification/fix-personal-message-access/qa/prod-look-getone-past-int8.json`). The signed-in unfixed value was never read.
- **Owner**: uat-role session. **Result**: `EXECUTED` 2026-11-20T01:37:58Z, uat-hooks-fix-personal-message-access. Signed in as test account 1 (session id `1219217003659788418`, matched to its credential): HTTP **400 `BAD_REQUEST`** (zod regex refusal). This is the fixed limb, so production serves the fixed `messageIdShape` and B-1 is readable. Evidence: `verification/fix-personal-message-access/post-deploy/b2-getone-past-int8-signed-in.json`; walk record `…/post-deploy/README.md`.

### B-1  (uat-role session; after B-2 passed)

- **Class**: post-deploy-observable (distinguishes fixed from unfixed; S2 escaped)
- **Condition**: test account 1 cannot open test account 2's personal message on production.
- **Instrument**: the walk in `verification/access-defects/browser-check/README.md`: account 2 creates and saves a personal message,
  account 1 opens `/message/m/<n>/edit`, then account 2 deletes it. Message numbers on production are real; the walk deletes what it
  creates, as the 2026-11-19 walk did.
- **Subject / fallback**: uat-role session on the two test accounts / owner.
- **Earliest decidable**: B-2 passed.
- **Predicted**: fixed, the editor's load error, with none of account 2's content on the page. Unfixed, shown on production
  2026-11-19T08:58Z: message 6020 opened in full by account 1. One observation decides.
- **Failure mode**: if account 1 still sees account 2's content, any signed-in user can still read any personal message by its number.
- **Owner**: uat-role session. **Result**: `EXECUTED` 2026-11-20T01:41Z, uat-hooks-fix-personal-message-access (walk driven by its `browser-walker` helper). Account 2 (`1219222937962283038`) created and saved personal message **6021** with the marker `access-check-post-deploy 2026-11-20T01:40:17Z`, and its own `getOne` returned 200 with the marker. Account 1 (`1219217003659788418`) opened `/message/m/6021/edit` at 01:41:13Z: **none of account 2's content was on the page**. The page's own `getOne` 6021 answered 404 on each of its four requests, and account 1's direct `getOne` answered **404 `NOT_FOUND`**. This is the fixed limb. Account 2's own editor still loaded the message, and account 2 then deleted 6021 at 01:41:50Z ("Message deleted.", folder "No Messages"). Observed beside the prediction: no load-error wording had rendered at the 8 s read. The editor was a blank shell while its query was still retrying (F-1 LOW in the walk record; it does not move the row). `getOne` on the deleted number answered 500 "no result": that is the absent-number error the chain sent to a handoff (F-2). Evidence: `verification/fix-personal-message-access/post-deploy/b1-*`, `README.md`. Screenshots are untracked at `/home/dev/.cache/ms-playwright-mcp/output/b1-pd-*.png`.

### R-1  (his production database read; put by steering at the release question)

- **Class**: owner-only read (not observable by any agent; no agent read path to hooks.gg's production database is recorded). It gates
  no release act.
- **Condition**: whether rows planted at browser-sent message numbers, or rows carrying both an owner and a guild, already sit in
  production's `Messages` table.
- **Instrument** (queries, corrected by `verification/access-defects/scoping/residue-refutation.md`):
  - planted rows at or past the sequence:
    `select id, fk_users_id, "createdAt" from "Messages" where id > (select last_value from "Messages_id_seq") or (id = (select last_value from "Messages_id_seq") and not (select is_called from "Messages_id_seq"));`
    Limits: a sequence cache above 1 was not tested, and no query finds planted rows the sequence has already passed.
  - both owners:
    `select count(*) from "Messages" where fk_users_id is not null and fk_guilds_id is not null`
- **Predicted**: the first returns nothing; the second returns 0 (code since `98ecb0b`, 2023-07-26, writes `fk_users_id: null` for a server
  row; the writer before that is unread).
- **Failure mode, first query**: a planted row whose number the sequence has not reached makes the id-less save that draws it fail once
  with a unique violation, where `787bec5` overwrote the planter's row; one retry draws the next number. Rows already written by a collision
  stay readable by their planter.
- **Failure mode, second query**: a count above 0 means a row's creator can overwrite a server message as a personal one if they are
  no longer the server's admin. This is the same at `787bec5`; the chain does not introduce it.
- **Owner**: him, through `steering-roadmap-hooks`. **Result**: _blank_

## Forward items this record does not hold

The chain's other handoffs carry their own triggers (listed in the deployment record's forward-item sweep). One of them,
`handoff/upsert-message-count-problem-area-false-after-access-fix-2026-11-19.md` (Owning-Stage architect), fires at this release.

## Evidence

QA's register and Assumption Not Checked at `Verified-At` `983681c` (`qa/closed/fix-personal-message-access-qa.md`); the code review's
Assumption Not Checked (`code-review/closed/fix-personal-message-access-code-review.md`); security's Required Controls RC-2
(`security/fix-personal-message-access-security-audit.md`); the 2026-11-19 production walk
(`verification/access-defects/browser-check/README.md`, record `497f0de`); the residue refutation
(`verification/access-defects/scoping/residue-refutation.md`, record `c4b843d`).

## Origin

Raised by QA Phase 2 (rows B-1, B-2, the both-owners count) and by the implementation's Diagnosis ("Residue already in production") of fixer
chain `fix-personal-message-access`; created by devops at Stage 1 (steering brief `steering/fix-personal-message-access-brief-devops.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T00:21 | devops-hooks-fix-personal-message-access | Created at Stage 1. Rows B-2, B-1 and R-1 carried in full; the event ledger is blank until Stage 2. No crontab line: the reader is a uat-role session spawned by steering after the push. Disclosure: the stamp-gate hook refused this row's first time, which I had typed ahead of the clock (00:25 against 00:21); it now carries the `date -u` minute. A gate satisfied, not a control worked around |
| 2026-11-20T01:34 | devops-hooks-fix-personal-message-access | E-WEBSITE-PUSH written at Stage 2: website master 787bec5 -> 983681c pushed 2026-11-20T01:33:58Z. B-2, B-1 and R-1 stay blank; the reader is the uat-role session steering spawns |
| 2026-11-20T01:43 | uat-hooks-fix-personal-message-access | B-2 and B-1 Result lines written, both `EXECUTED` and both on the fixed limb. B-2: 400 `BAD_REQUEST` at 01:37:58Z. B-1: account 1 was refused account 2's message 6021 (404 `NOT_FOUND`, no content), and 6021 was deleted by account 2. RC-2 (the session path on production) is read. R-1 stays blank and is his. The Status stays Open for R-1 |
