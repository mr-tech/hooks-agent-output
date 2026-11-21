---
UUID: c3c76c16
Status: Addressed
Status-Detail: "P-2 EXECUTED 2026-11-21T06:48Z-06:50Z by uat-fix-recent-message-ids, prediction held on both limbs: account 1 (admin) lists Claude-server message 6029; account 2 (member) omits it with 6029 in its stored list. 6029 deleted; account 2's list restored. Closed."
Owning-Stage: uat
Review-Trigger: "the production deploy of website master carrying fix-recent-message-ids (the E-WEBSITE-PUSH row of this record's event ledger filled) — then P-2"
---

# Handoff: fix-recent-message-ids post-deploy row (P-2)

## What is seeded

The fixer chain `fix-recent-message-ids` ships website `master` (Vercel production by git integration; `website/.github/workflows` is
absent) from `76da25c` to `6f76c6d`. The fix filters the hydrated recent-message list: a server (guild) message row survives only when its
server is in `redis.fetchUserGuilds`' owner-or-Administrator list. That list is trimmed by `hasDiscordPermissions` over the
`permissions` field Discord returns on `/users/@me/guilds`. No test exercises Discord's real wire form of that field (QA's Assumption Not
Checked, `qa/fix-recent-message-ids-qa.md`; steering's ruling, `steering/fix-recent-message-ids-rulings.md` block "2026-11-21T06:27Z",
which routes the read to the devops record as a post-deploy row). The row does not gate the release act.

**Why it is here and not run by devops.** The reader needs a signed-in Discord test account on live hooks.gg. The devops session
`devops-fix-recent-message-ids` has no `mcp__playwright__*` tools (checked by `ToolSearch` "playwright browser", 2026-11-21T06:4xZ), and the
`discord-test-browser` skill forbids loading them from a session not launched with `--browser`. The `qa` and `uat` stage agents carry that
browser. Screenshots stay untracked and are never committed (his 09:01Z ruling, `steering/017-rulings.md`). Reader reads
`~/.claude/skills/discord-test-browser/test-estate.json` first. The reader never writes the event ledger; devops does, at Stage 2.

## Event ledger (devops writes; a reader never edits it)

| Event | What it is | When (UTC) | Ref and SHA | Source |
|---|---|---|---|---|
| E-WEBSITE-PUSH | website `master` moved to the release | 2026-11-21T06:45:00Z to 06:45:05Z (`release-move.js` exit 0; `ls-remote` read back `6f76c6de…` at 06:45:09Z) | website `master` `6f76c6de2daab590777c047e9439cf5f5a9ed215` (was `76da25ccd8fbd063803d4896b9eda3c3759d7221`) | devops, Stage 2, on the owner's release approval at the Phase 2B prompt (`deployment/fix-recent-message-ids-deployment.md`) |

## Row

### P-2  (uat-role session)

- **Class**: post-deploy-observable (real-wire form of Discord's `permissions` field; the owner/Administrator trim runs on it)
- **Condition**: on hooks.gg, signed in as a Discord test account that owns or holds Administrator in a server, the hydrated recent
  list (the strip `session.hydration.messages` feeds on `/message`) shows that server's messages and no other server's.
- **Instrument**: `mcp__playwright__*` on the kept profile (test account 1, administrator of server `1566742402180456559` "Claude" per
  `test-estate.json`, `verified: false`). Open `/message` signed in; read the recent list. If the account's stored list names no Claude-server
  message, save one in that server first (a test account may write its own and the test server's rows) and reload; record the message
  number. Optional second limb, if the walk can make it: test account 2, a plain member of "Claude", with that number placed in its own
  list through its own `user.updatePreferences` call: its recent list must not show the row.
- **Subject / fallback**: uat-role session on the test accounts / owner.
- **Earliest decidable**: a Vercel production deploy of website `master` whose tree contains `6f76c6d`'s `src/server/auth.ts`.
- **Predicted**: test account 1's list shows the Claude-server message (the server is in its owner/Administrator list). Account 2's list
  (optional limb) omits it.
- **Falsifier**: an owner/Administrator account's server rows are absent from its own list. That means the trim dropped a server
  Discord reported, so `hasDiscordPermissions` does not parse the wire value. Route to the owner; the rollback is Vercel promote of
  the previous deployment, his call.
- **Known limits**: a message saved before the deploy reads the same either way (the old build also lists it), so a result only counts if
  read after the deploy is serving; if the list shows no server row at all and no row was saved, nothing is decided.
- **Owner**: uat-role session. **Result**: **EXECUTED 2026-11-21, PASS. The prediction held on both limbs.** Recorded beside the
  prediction; nothing above it is changed.
  - *First read, 06:46Z, read only*: undecidable. The list held six personal rows and no server row, and the Claude server held no message
    (record `5a245a9`).
  - *Owner's selection A* (`steering/fix-recent-message-ids-rulings.md` block 2026-11-21T06:48Z, commit `4a0cf3a`) allowed the save,
    the account-2 limb, the delete and the restore. Nothing else was written on production.
  - *Limb 1, test account 1* (`1219217003659788418`, kept profile, 06:48Z): New Message in the Claude server
    (`/message/f/1566742402180456559`). `message.upsert` returned id **6029** with `guildId` `1566742402180456559`.
    `/api/auth/session` then gave `hydration.messages` = 5996, 6008, 6009, 6010, 6012, **6029**: the server's message is in its own list.
    PASS (not the falsifier).
  - *Limb 2, test account 2* (`1219222937962283038`, its own profile, scripted by the browser-walker helper): `user.guilds` holds no
    entries, so Claude is not among them.
    - Stored list BEFORE = `["6021","6020","5995"]`; hydration before = `[]`.
    - `user.updatePreferences` with `["6029","6021","6020","5995"]` at 06:49:53.014Z returned 200. The stored list then read
      `["6029","6021","6020","5995"]` and hydration `[]`: 6029 omitted. PASS.
    - Restored with BEFORE at 06:49:53.991Z (200). It read back `["6021","6020","5995"]`, an exact match.
  - *Which build served*: the new one. The row's Known limits ask how this was established. The old build listed a server row from the
    stored list without a guild check (the source handoff's defect), so account 2's hydration leaving out an existing server row
    shows `6f76c6d`'s filter serving.
  - *Delete*: 6029 was deleted by account 1 through the server list's message actions at 06:50Z (toast "Message deleted.").
    `message.getOne` 6029 then returned 500, and account 1's hydration no longer lists it.
  - *Residual on account 1's own stored list* (outside the selection's acts, so left as is): it now begins with the deleted `"6029"`,
    which hydration skips. It no longer carries `"6011"`, which the app's own 10-entry cap dropped when 6029 opened. The list before was
    `6012,6010,6023,6024,6022,6020,6008,5996,6009,6011`.
  - Evidence files (untracked, scratch): the walker's `walk.mjs`, `before.json`, `step1.json` and `result.json` under the UAT session's
    scratchpad `p2-acct2/`. No screenshots were taken.

## Evidence

QA Phase 2 at `Verified-At` `6f76c6d` (`qa/fix-recent-message-ids-qa.md`, Assumption Not Checked, record `ec750c0`); steering's ruling
block "2026-11-21T06:27Z" (`steering/fix-recent-message-ids-rulings.md`); the trim and its test
(`website/src/utils/redis/__tests__/redis.fetch-user-guilds.test.ts`, pins the parse against documented Discord values only).

## Origin

Raised by QA Phase 2 (Assumption Not Checked) of fixer chain `fix-recent-message-ids`; created by devops at Stage 1 (steering brief
`steering/fix-recent-message-ids-brief-devops.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T06:42 | devops-fix-recent-message-ids | Created at Stage 1. Row P-2 carried in full; the event ledger is blank until Stage 2. No crontab line: the reader is a uat-role session, spawned by steering after the push. |
| 2026-11-21T06:45 | devops-fix-recent-message-ids | E-WEBSITE-PUSH written at Stage 2: website master 76da25c -> 6f76c6d pushed 2026-11-21T06:45:05Z. P-2 stays blank; the reader is the uat-role session steering spawns. Vercel's build of the push is not read from the host; start P-2 only once hooks.gg serves the new build (a reload shows the recent list filtered), and say in the Result how that was established. |
| 2026-11-21T06:47 | uat-fix-recent-message-ids | P-2 read on hooks.gg as test account 1, read only. NOT EXECUTED, undecidable: the recent list has only personal rows and the Claude server holds no message. The save step was not taken under the read-only brief, and serving of 6f76c6d was not established. Routed to steering-hooks. The handoff stays Open; no screenshots were taken. |
| 2026-11-21T06:51 | uat-fix-recent-message-ids | Document closed. Status: Addressed. P-2 EXECUTED on the owner's selection A (rulings block 06:48Z): account 1 lists Claude-server message 6029, and account 2 omits it with 6029 stored. 6029 deleted; account 2's list restored. Moved to closed/. |
| 2026-11-21T06:52 | uat-fix-recent-message-ids | Account 1's residue restored on steering's word (Standing Defaults: a run removes what it set up). One user.updatePreferences call as test account 1 at 06:52:22Z returned 200. Stored recentMessageIds before: 6029,6012,6010,6023,6024,6022,6020,6008,5996,6009. After: 6012,6010,6023,6024,6022,6020,6008,5996,6009,6011, which reads back as an exact match to the pre-run list. Hydration is now 5996,6008,6009,6010,6011,6012. The Result's residual line is superseded by this row. Nothing further on production. |
