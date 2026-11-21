---
UUID: c3c76c16
Status: Open
Status-Detail: "One post-deploy row, P-2 (the hooks.gg recent list read by a Discord test account), owed after the push of website master to 6f76c6d; blank until then. The row is carried in full. No stage has read it: the devops session that owns the deployment record has no browser tools."
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
| E-WEBSITE-PUSH | website `master` moved to the release | (blank until Stage 2) | website `master` `6f76c6de2daab590777c047e9439cf5f5a9ed215` (was `76da25ccd8fbd063803d4896b9eda3c3759d7221`) | devops, Stage 2 (`deployment/fix-recent-message-ids-deployment.md`) |

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
- **Owner**: uat-role session. **Result**: (blank)

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
