---
UUID: b5c69a32
Status: Open
Status-Detail: "Carrier of QA's post-deploy row B-1 (absent-number limb and the header limb) for fixer chain fix-get-one-absent-not-found (website master, Vercel production), which also closes QA's and the code reviewer's Assumption Not Checked. Created at devops Stage 1; the release is not pushed, so B-1 is undecidable and its Result is blank. Does not gate the release act."
Owning-Stage: qa
Review-Trigger: "the production deploy of website master carrying fix-get-one-absent-not-found (the E-WEBSITE-PUSH row of this record's event ledger filled) — then B-1"
Secret-Files: none
---

# fix-get-one-absent-not-found post-deploy row (B-1)

## What is seeded

The fixer chain `fix-get-one-absent-not-found` ships website `master` (Vercel production by git integration; `website/.github/workflows`
is absent) from `b829314` to the chain tip `b663b35`. For a signed-in caller, `message.getOne` answers one `NOT_FOUND` with the one
text for a number no row holds, whichever kysely build raised the error; and `/message/m/<id>/edit` in the not-found state drops the
editor's header controls (name field, File/Edit/View/Help menus, Send). The row is QA's register row B-1
(`qa/fix-get-one-absent-not-found-qa.md`, "Blocking-condition register"), carried in full below. The register is point-in-time; this
record's `Result` line is authoritative on execution state. The row does not gate the release act.

It also settles the one Assumption Not Checked that the code review (`code-review/fix-get-one-absent-not-found-code-review.md`) and QA
Phase 2 (`qa/fix-get-one-absent-not-found-qa.md`) both state, the same one: the Next production server bundle holds
`src/server/api/utils/shared.ts` and `src/server/api/routers/message.ts` as one module instance in the tRPC route, so the class
`getMessage` throws is the class `getOne` checks. **Falsity signature:** after the deploy, a number no row holds still answers 500
"no result" on hooks.gg.

**Why it is here and not run by devops.** The reader needs a signed-in Discord test account on live hooks.gg. The devops session
`devops-fix-get-one-absent-not-found` carries no `mcp__playwright__*` tools, and the `discord-test-browser` skill forbids loading them
from a session not launched with `--browser`; the `qa` and `uat` stage agents carry that browser. So there is no crontab line: the
reader is a qa-role session (`qa-fix-get-one-absent-not-found` is the one that minted the row and ran its instrument at minting) that
steering starts or wakes after devops's release-complete cue. The precedent is
`handoff/fix-message-not-found-post-deploy-2026-11-21.md` (B-1 of the chain before this one). Screenshots stay untracked and are never
committed. The reader reads `~/.claude/skills/discord-test-browser/test-estate.json` first and writes only to the row's `Result` and
the changelog below. **Not allowed: any save or other production write.** The reader never writes the event ledger; devops does, at
Stage 2.

## Event ledger (devops writes; a reader never edits it)

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-WEBSITE-PUSH | website `master` moved to the release | blank until Stage 2 | website `master` → `b663b354fb236c3ee58d8b0be01778e1908e0e10` (was `b82931402f416e850a785468f9443fa3eadfae44`) | devops, Stage 2, on the owner's release approval |

## Row

### B-1  (qa-role session, signed in as the test account)

- **Class**: post-deploy-observable
- **Condition**: C1 and C2 in production (settles scope items 1 and 2, and the Assumption Not Checked above): signed in, a number no
  row holds gets the one not-found answer, and `/edit` for it shows the notice without the editor bar.
- **Instrument**: in the stage browser, signed in as the test account on `https://hooks.gg/message`: `browser_evaluate` of
  `fetch('/api/trpc/message.getOne?input=' + encodeURIComponent(JSON.stringify({json: id})))` for `6022` and `999999999999` (absent;
  re-confirm that `6022` is still absent, since QA used it at 10:01Z and a number is absent only while no row holds it), `1000` (a
  server not managed) and `6010` (loads). Then open `/message/m/6022/edit` and read: the notice ("This message doesn't exist, or you
  don't have access to it."); `input[aria-label="Message Name"]` absent; no File/Edit/View/Help buttons; no `a[href$="/send"]`;
  `[aria-label="toggle site theme"]` and `[aria-label="user menu"]` present; `message.getOne` requests in `browser_network_requests`.
  Shown to work at minting: run read-only 10:01:25Z
  (`verification/fix-get-one-absent-not-found/qa/prod-getone-pre-deploy-2026-11-21T1001Z.json`).
- **Subject / fallback**: qa through the stage browser / the owner by the same page.
- **Earliest decidable**: Vercel production serves a website build whose commit contains `b663b35`. Establish it from the event ledger
  above (the push) and, for the read, from the first absent-number answer changing from 500. A 500 before the first 404 is the old
  build still serving, not a falsifier: read again after a short wait before calling it.
- **Predicted**: **Fixed:** `6022` and `999999999999` give 404 `NOT_FOUND` "This message doesn't exist, or you don't have access to
  it.", byte-identical to `1000`'s body; `6010` gives 200; `/message/m/6022/edit` shows the notice, no name field, no menus, no Send,
  plus the theme toggle and user menu, after 1 `getOne` request (404). **Unfixed (measured 10:01:25Z on the build then serving):**
  `6022` and `999999999999` give 500 "no result"; `1000` gives 404; `6010` gives 200.
- **Failure mode**: if `6022` still answers 500 after the new build serves, the fix did not reach the runtime; the likeliest cause is a
  duplicated module instance in the Next bundle (the Assumption Not Checked), and the user still sees a blank editor that retries. If
  the editor bar still shows above the notice, the header half did not ship. If `6010` fails, loading broke. A falsifier goes to the
  owner through `steering-hooks`.
- **Owner**: qa. **Result**: blank — not yet decidable.

## After the read holds

Closing is not the reader's: when `Result` records the prediction held on both limbs, `steering-hooks` closes this record, the earlier
carrier `handoff/fix-message-not-found-post-deploy-2026-11-21.md` (B-1, UUID e450d19c) and
`handoff/get-one-absent-number-still-500-in-production-2026-11-21.md` (UUID 7c3e91a4) `Addressed` at the chain's closure. A falsifier
closes none of them.

## Evidence

QA Phase 2 at `Verified-At` `b663b35` (`qa/fix-get-one-absent-not-found-qa.md`, record `5b9472ef`); code review round 1 `APPROVED` at
`b663b35` (`code-review/fix-get-one-absent-not-found-code-review.md`, record `84473927`); the steering determination
`steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T08:57Z".

## Origin

Raised by QA Phase 2 (register row B-1 and Assumption Not Checked) and the code review's Assumption Not Checked of fixer chain
`fix-get-one-absent-not-found`; created by devops at Stage 1 (steering brief `steering/fix-get-one-absent-not-found-brief-devops.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T10:08 | devops-fix-get-one-absent-not-found | Created at Stage 1. Row B-1 carried in full; the event ledger is blank until Stage 2. No crontab line: the reader is a qa-role session with the browser, started or woken by steering after the push. |
