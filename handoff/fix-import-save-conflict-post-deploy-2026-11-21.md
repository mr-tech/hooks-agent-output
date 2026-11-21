---
UUID: e4abdf8b
Status: Open
Status-Detail: "Carrier of the post-deploy row PD-1 for fixer chain fix-import-save-conflict (website master, Vercel production). The release was pushed 2026-11-21T08:53:57Z (E-WEBSITE-PUSH written); PD-1 read 09:00Z: the fix is serving; the Message Link limb is falsified by production's getFromUrl returning blank content (not this release's path). Open until steering routes that observation."
Owning-Stage: qa
Review-Trigger: "the production deploy of website master carrying fix-import-save-conflict (the E-WEBSITE-PUSH row of this record's event ledger filled) — then PD-1"
---

# Handoff: fix-import-save-conflict post-deploy row (PD-1)

## What is seeded

The fixer chain `fix-import-save-conflict` ships website `master` (Vercel production by git integration; `website/.github/workflows` is
absent) from `f4baebb` to the chain tip `b829314`. In the "Create or upload a new message" dialog, a draft imported by the Message Link,
Webhook or Message Context Command tab whose content conflicts is settled (rows A to D, with the JSON tab's notice) or held for the user's
choice of Classic or Components V2 (row E), instead of leaving Save off with no way out; the preview shows the draft Save writes. QA
walked this on a local build with the import responses served in the router's shapes, not Discord's live responses (`qa/fix-import-save-conflict-qa.md`,
"Assumption Not Checked": the running `getFromUrl` and `getFromCode` bodies and Discord's live responses for rows D, B and E are
unchecked; BC-17). The row below is the read of the real path on production. The register is point-in-time; this record's `Result` line
is authoritative on execution state. The row does not gate the release act.

**Why it is here and not run by devops.** The reader needs a signed-in Discord test account on live hooks.gg. The devops session
`devops-fix-import-save-conflict` carries no `mcp__playwright__*` tools, and the `discord-test-browser` skill forbids loading them from a
session not launched with `--browser`; the `qa` and `uat` stage agents carry that browser. So there is no crontab line: the reader is a
qa-role session that steering spawns after devops's release-complete cue (the precedent is `handoff/fix-message-not-found-post-deploy-2026-11-21.md`, B-1).
Screenshots stay untracked and are never committed. The reader reads `~/.claude/skills/discord-test-browser/test-estate.json` first and
writes only to the row's `Result` and the changelog below. The reader never writes the event ledger; devops does, at Stage 2.

**Precondition, met by devops at Stage 1.** The row needs real Discord messages in the Claude test server (guild `1566742402180456559`).
Devops posted two to `#general` (`1566742403195469906`) as the test bot with `verification/fix-import-save-conflict/devops/post-test-messages.py`
(output `post-test-messages-output.txt`; the token is never printed):

| Message | Id | Link |
|---|---|---|
| classic, with content | `1573621671380910101` | `https://discord.com/channels/1566742402180456559/1566742403195469906/1573621671380910101` |
| Components V2 (flag `32768`, a container with one text display) | `1573621673230602251` | `https://discord.com/channels/1566742402180456559/1566742403195469906/1573621673230602251` |

Devops posted only these two; it did not try a post carrying both V2 components and content, or a V2 flag with content and no V2
components (rows E and D), so whether Discord accepts either is still unanswered (BC-17) and the row below does not depend on it. The
row reads what these two give. A reader who can produce a further row by a test bot or test webhook in that server may add it and records
what Discord answered.

## Event ledger (devops writes; a reader never edits it)

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-21T08:53:53Z to 08:53:57Z (`release-move.js` exit 0; `ls-remote` read back `b829314…` at 08:54:00Z) | website `master` `b82931402f416e850a785468f9443fa3eadfae44` (was `f4baebb000ac6fa31714108c9d2bf261dc3de4a4`); contains `5b6c6e3` | devops, Stage 2, on the owner's release approval at the Phase 2B prompt (`deployment/fix-import-save-conflict-deployment.md`; captures `verification/fix-import-save-conflict/devops/release-move-real.txt`, `post-move-readback.txt`) |

## Row

### PD-1  (qa-role session, signed in as the test account)

- **Class**: post-deploy-observable
- **Condition**: on production, signed in as the Discord test account, the dialog's Message Link tab loads a real Discord message from the
  Claude test server and shows its preview with no red error, and Save is enabled once a name is given, for both the Components V2 message and the
  classic message. The Webhook tab, if a test webhook exists in that server, does the same.
- **Instrument**: in the stage browser on `https://hooks.gg/message`, open "Create or upload a new message"; on the Message Link tab paste
  each link in the table above; read the dialog's notice, the preview and Save's enabled state, then enter a name and read Save again.
  **Not allowed: pressing Save** (no production write); read the notice, preview and Save's enabled state only.
- **Subject / fallback**: qa through the stage browser / the owner by the same page.
- **Earliest decidable**: the Vercel production deployment serves a website commit containing `5b6c6e3`. Establish it from the event
  ledger above (the push) and, for the read itself, from the new bundle: a read before the new build serves shows the old behaviour, which is
  not a falsifier until a short wait and a re-read confirm the push has been serving.
- **Predicted** (QA's flows 1 to 3 on a local build): V2 message: preview shows the container's text; no red "Components V2 messages cannot
  contain embeds or content." line; Save enabled after the name. Classic message: preview shows the content; Save enabled; no notice.
- **Falsifier**: no preview, or the old red error with Save off, on the Message Link tab while the Webhook tab works (QA's falsity signature).
  A falsifier goes to the owner; rollback is Vercel promote of the previous deployment (his call).
- **Owner**: qa. **Result** (qa-fix-import-save-conflict, read 2026-11-21T08:57Z to 08:59:40Z on hooks.gg as test account 1; steps
  `verification/fix-import-save-conflict/qa/pd1/pd1-steps.md`, evidence `…/qa/pd1/evidence/`; nothing saved, edited or deleted):
  **prediction FALSIFIED on the real-path limb, by a cause upstream of this release; the release's own change is confirmed serving.**
  - Serving build: PASS. In the stage browser, a V2-flagged message with content (row D) was served by a browser-side route on a fake
    webhook URL; the Webhook tab showed the settled notice "…it has been saved as Classic and the flag cleared.", no red
    "cannot contain" line, the preview text and Continue enabled. The old build shows the red error there instead.
  - Message Link, both fixture messages: FAIL against the prediction. Each loaded an empty draft: the preview reads only "Message must
    have content, embeds, or components.", the JSON tab is `{}`, and Save is disabled after a name. There was no red "cannot contain" line.
  - Cause, read directly: production's `GET /api/trpc/message.getFromUrl` answers 200 for both, with `content: ""`, `embeds: []` and
    no components. The V2 message keeps `flags: 32768` (`…/qa/pd1/evidence/getFromUrl-direct-read.json`). So the server receives from
    Discord a message with its content and components blank, though devops posted both with content (`post-test-messages-output.txt`,
    status 200). That fits Discord blanking content for an app without the Message Content intent, but this is an inference, unverified.
  - Not this release: `src/server` and `src/utils/discordResponseToMessage.ts` are unchanged `f4baebb..b829314` (`git diff --quiet`
    exit 0). At `f4baebb` the dialog floors the raw draft, which gives the same message and the same disabled Save. A rollback would not
    change this read.
  - The Webhook tab with a real test webhook was not read: no test webhook is named in `test-estate.json`.

## Evidence

QA Phase 2 at `Verified-At` `b829314` (`qa/fix-import-save-conflict-qa.md`, record `84e9b6ee`); the code review sub-entry 2 at `b829314`
(`code-review/fix-import-save-conflict-code-review.md`, record `592a7a59`); the steering determination
`steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z"; the brief `steering/fix-import-save-conflict-brief-devops.md`.

## Origin

Raised by the devops brief of fixer chain `fix-import-save-conflict` (the post-deploy row owed, with its preconditions); created by devops
at Stage 1.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T08:50 | devops-fix-import-save-conflict | Opened at Stage 1. Fixture messages posted to the test server as the test bot (two, ids above). PD-1 unread; the push has not happened. |
| 2026-11-21T08:54 | devops-fix-import-save-conflict | E-WEBSITE-PUSH written: website `master` `f4baebb` → `b829314` at 08:53:53Z to 08:53:57Z. PD-1 is now decidable; unread. |
| 2026-11-21T09:00 | qa-fix-import-save-conflict | PD-1 read. The fix is serving (build check PASS). The Message Link limb is falsified upstream: production's `getFromUrl` returns both fixture messages with blank content and components, a path this release did not change. Sent to steering-hooks as owner-needing. The handoff stays Open until the empty-import observation has a carrier. |
