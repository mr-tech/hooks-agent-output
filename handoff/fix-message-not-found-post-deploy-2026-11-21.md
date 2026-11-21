---
UUID: e450d19c
Status: Open
Status-Detail: "Carrier of QA's post-deploy row B-1 for fixer chain fix-message-not-found (website master, Vercel production). Created at devops Stage 1; the release is not pushed, so B-1 is undecidable and its Result is blank. Does not gate the release act."
Owning-Stage: qa
Review-Trigger: "the production deploy of website master carrying fix-message-not-found (the E-WEBSITE-PUSH row of this record's event ledger filled) — then B-1"
---

# Handoff: fix-message-not-found post-deploy row (B-1)

## What is seeded

The fixer chain `fix-message-not-found` ships website `master` (Vercel production by git integration; `website/.github/workflows` is
absent) from `6f76c6d` to the chain tip `f4baebb` (`6b539e5` is the production change; `f4baebb` adds QA's test cases only). For a
signed-in caller, `message.getOne` answers one `NOT_FOUND` with one text for a number no row holds, another user's personal message and
a server message of a server he cannot manage. `/message/m/[id]/edit` and `/send` show one notice with a link back, and the load is not
retried on a 4xx. The row is QA's register row B-1 (`qa/fix-message-not-found-qa.md`, "Blocking-condition register"), carried in full
below. The register is point-in-time; this record's `Result` line is authoritative on execution state. The row does not gate the
release act.

**Why it is here and not run by devops.** The reader needs a signed-in Discord test account on live hooks.gg. The devops session
`devops-fix-message-not-found` carries no `mcp__playwright__*` tools, and the `discord-test-browser` skill forbids loading them from a
session not launched with `--browser`; the `qa` and `uat` stage agents carry that browser. So there is no crontab line: the reader is a
qa-role session that steering spawns after devops's release-complete cue (the precedent is
`handoff/closed/fix-recent-message-ids-post-deploy-2026-11-21.md`, P-2). Screenshots stay untracked and are never committed. The reader
reads `~/.claude/skills/discord-test-browser/test-estate.json` first and writes only to the row's `Result` and the changelog below. The
read is read-only on production: no save and no delete. The reader never writes the event ledger; devops does, at Stage 2.

## Event ledger (devops writes; a reader never edits it)

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-21T07:51:34Z to 07:51:38Z (`release-move.js` exit 0; `ls-remote` read back `f4baebb…` at 07:51:40Z) | website `master` `f4baebb000ac6fa31714108c9d2bf261dc3de4a4` (was `6f76c6de2daab590777c047e9439cf5f5a9ed215`); contains `6b539e5` | devops, Stage 2, on the owner's release approval at the Phase 2B prompt (`deployment/fix-message-not-found-deployment.md`; captures `verification/fix-message-not-found/devops/release-move-real.txt`, `post-move-readback.txt`) |

## Row

### B-1  (qa-role session, signed in as the test account)

- **Class**: post-deploy-observable
- **Condition**: scope items 1 to 3 on production: signed in, an absent number and a server message the user can't manage get the one
  not-found answer. The edit page shows the notice after one request. The user's own message still loads.
- **Instrument**: in the stage browser, signed in as the test account on `https://hooks.gg/message`, `browser_evaluate` of
  `fetch('/api/trpc/message.getOne?input=' + encodeURIComponent(JSON.stringify({json: id})))` for `6022` (absent), `1000` (a server the
  test account can't manage) and `6010` (loads). Then open `/message/m/6022/edit` and count `message.getOne` requests in
  `browser_network_requests` after the notice shows. Shown to work at minting: QA ran it read-only at 07:35Z, values in
  `verification/fix-message-not-found/qa/raw/prod-signed-in-getone-pre-deploy.json`.
- **Subject / fallback**: qa through the stage browser / the owner by the same page.
- **Earliest decidable**: the Vercel production deployment serves a website commit containing `6b539e5`. Establish it from the event
  ledger above (the push) and, for the read itself, from the first `6022` answer changing from 500: a 500 "no result" before the first
  fixed answer is the old build still serving, not a falsifier; read again after a short wait before calling it.
- **Predicted**: **Fixed:** `6022` and `1000` give 404 `NOT_FOUND` "This message doesn't exist, or you don't have access to it.",
  byte-identical bodies; `6010` gives 200; the page shows the notice with 1 request. **Unfixed (measured 07:35Z):** `6022` gives 500
  "no result", `1000` gives 403 `FORBIDDEN`.
- **Failure mode**: if `6022` still answers 500 after the push has been serving, the server half did not ship, and the user still sees a
  blank editor that retries four times. If the two answers differ, the page still tells a deleted number from another server's. If
  `6010` fails, the change broke loading.
- **Page limb, from QA's Assumption Not Checked** (`qa/fix-message-not-found-qa.md`, "Assumption Not Checked"): at
  `/message/m/6022/edit` the notice renders legibly inside the real layout: not hidden, clipped or overlapped, and no stray editable name
  field above it. Falsity signature: any of those. Also carried here, from QAF-3: the page makes no second `getOne` request after a
  not-found answer (the request count above).
- **Owner**: qa. **Result**: _blank_

## Evidence

QA Phase 2 at `Verified-At` `f4baebb` (`qa/fix-message-not-found-qa.md`, record `c4c2afc`); the code review sub-entry 1.1 at `f4baebb`
(`code-review/fix-message-not-found-code-review.md`, record `c152bae`); the steering determination
`steering/fix-message-not-found-rulings.md`, block "2026-11-21T06:46Z".

## Origin

Raised by QA Phase 2 (register row B-1 and Assumption Not Checked) of fixer chain `fix-message-not-found`; created by devops at Stage 1
(steering brief `steering/fix-message-not-found-brief-devops.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T07:44 | devops-fix-message-not-found | Created at Stage 1. Row B-1 carried in full; the event ledger is blank until Stage 2. No crontab line: the reader is a qa-role session with the browser, spawned by steering after the push. |
| 2026-11-21T07:52 | devops-fix-message-not-found | E-WEBSITE-PUSH written at Stage 2: website `master` 6f76c6d -> f4baebb pushed 2026-11-21T07:51:38Z. B-1 stays blank; the reader is the qa-role session (`qa-fix-message-not-found` has been told). Vercel's build of the push is not read from the host; start B-1 only once hooks.gg serves the new build (the first `6022` answer is 404 rather than 500), and say in the Result how that was established. |
