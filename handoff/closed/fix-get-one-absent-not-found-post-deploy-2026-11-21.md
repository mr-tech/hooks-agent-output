---
UUID: b5c69a32
Status: Addressed
Status-Detail: "B-1 read on hooks.gg 10:13:30Z-10:14:17Z by qa-fix-get-one-absent-not-found: HOLDS on both limbs (absent numbers answer the one 404; /edit shows the notice without the editor bar), which also settles the review's and QA's Assumption Not Checked. Closed Addressed by steering-hooks at the chain's closure, with e450d19c and 7c3e91a4."
Owning-Stage: qa
Review-Trigger: "the production deploy of website master carrying fix-get-one-absent-not-found (the E-WEBSITE-PUSH row of this record's event ledger filled) — then B-1"
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
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-21T10:11:05Z to 10:11:09Z (`release-move.js` exit 0; `ls-remote` read back `b663b354…` at 10:11:12Z) | website `master` `b663b354fb236c3ee58d8b0be01778e1908e0e10` (was `b82931402f416e850a785468f9443fa3eadfae44`) | devops, Stage 2, on the owner's release approval at the Phase 2B prompt (`deployment/fix-get-one-absent-not-found-deployment.md`; captures `verification/fix-get-one-absent-not-found/devops/release-move-real.txt`, `post-move-readback.txt`) |

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
- **Owner**: qa. **Result** (qa-fix-get-one-absent-not-found, 2026-11-21T10:13:30Z to 10:14:17Z): **HOLDS on both limbs.**
  - **How I established that the new build serves.** At 10:01:25Z, on the old build, `999999999999` answered 500 "no result", which shows no row held it then. It is also eight digits beyond the test account's own `6010`. `900000000000500` lies in the local-build id range (CLAUDE.md, the `Messages_id_seq` restart). At 10:13:30Z both answer 404. Only `b663b35`'s `getOne` can give a 404 for a number no row holds, and the first read after the push already did, so no re-read was needed.
  - **Absent numbers.** `6022`, `999999999999` and `900000000000500` all give 404 `NOT_FOUND` "This message doesn't exist, or you don't have access to it.", with bodies byte-identical to `1000`'s. As predicted.
  - **Is `6022` still absent?** The fixed build cannot settle this: by design, it gives an absent number and another user's message the same answer. The absent-number limb therefore rests on `999999999999` and `900000000000500`, which no row can hold. `6022` answers exactly as they do.
  - **Server not managed:** `1000` gives 404 with the one text. **Own message:** `6010` gives 200. Both as predicted.
  - **Page.** I checked `/message/m/999999999999/edit` (10:13:56Z) and `/message/m/6022/edit` (10:14:17Z), each read 12 s after the notice showed:
    - the notice shows ("Back to your messages" links to `/message`);
    - `input[aria-label="Message Name"]` is absent, there are no File/Edit/View/Help buttons, and there is no `a[href$="/send"]`;
    - the theme toggle and the user menu are present;
    - there is 1 `message.getOne` request (404), from both performance entries and, for `6022`, `browser_network_requests`.

    As predicted: the header half shipped.
  - **The Assumption Not Checked is settled.** An absent number answers 404 on the production build, so the class `getMessage` throws is the class `getOne` checks there.
  - **Read only.** I made no save and no other write. The browser was closed afterwards, with no profile holder, and its caches were emptied. Capture: `verification/fix-get-one-absent-not-found/qa/post-deploy/b1-reads-2026-11-21T1013Z.json`. Screenshots: none taken.

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
| 2026-11-21T10:11 | devops-fix-get-one-absent-not-found | E-WEBSITE-PUSH written at Stage 2: website `master` b829314 -> b663b35 pushed 2026-11-21T10:11:09Z. B-1 stays blank; the reader is a qa-role session with the browser (`qa-fix-get-one-absent-not-found` minted the row). Vercel's build of the push is not read from the host; start B-1 only once hooks.gg serves the new build (the first `6022` answer is 404 rather than 500), and say in the Result how that was established. |
| 2026-11-21T10:14 | qa-fix-get-one-absent-not-found | B-1 read on hooks.gg, 10:13:30Z to 10:14:17Z: HOLDS on both limbs. Disclosure: the stamp gate refused my first stamp for this row, which I typed a minute ahead of the clock (10:15 against 10:14Z); I re-stamped it from `date -u` (a gate satisfied). Absent numbers give the one 404 with bodies byte-identical to `1000`'s, and `6010` gives 200. `/edit` shows the notice with no name field, menus or Send, after 1 request. The Assumption Not Checked is settled. Result written; capture `verification/fix-get-one-absent-not-found/qa/post-deploy/b1-reads-2026-11-21T1013Z.json`. Closing is steering's. |
| 2026-11-21T10:16 | steering-hooks | Document closed | Status: Addressed. B-1's Result records HOLDS on both limbs (record `aefd6beb`); closed per § After the read holds, with `handoff/fix-message-not-found-post-deploy-2026-11-21.md` (e450d19c) and `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md` (7c3e91a4). |
| 2026-11-24T02:57 | steering-hooks-fixer | Removed the frontmatter's empty `Secret-Files` field, on his selection relayed by steering-statbot-fixer (statbot `steering/selection-ledger/2026-11-24.md`, block `2026-11-24T02:56Z — steering-statbot-fixer`). Nothing else changes. |
