---
UUID: 3039bc8a
Status: Open
Status-Detail: "Carries the chain's post-deploy register row B-1 (bot Get JSON read after the website master deploy) and the code review's Assumption Not Checked (Statbot single-message ids). Open until a read decides each; blocks nothing before the release act."
Owning-Stage: devops (the post-deploy read of fix-api-secret-compare, run by a devops stage the owner starts for it, or by the owner where no stage holds the instrument)
Review-Trigger: When Vercel production serves a deployment whose commit contains website 0c14d5b, the deploy event of the website master release of fix-api-secret-compare.
---

# Handoff — post-deploy reads of fix-api-secret-compare (website)

## What is seeded

Two items, both decidable only after the website `master` release of chain `fix-api-secret-compare` serves on production (Vercel
deploys `master`; the repository has no `.github/workflows`). Neither gates the release act. The release is the push of website
`chain/fix-api-secret-compare` tip `0c14d5b` onto `master` (base `b68f94c`).

### Item 1 — register row B-1 (post-deploy-observable), carried in full

Source: `qa/fix-api-secret-compare-qa.md` (now `qa/closed/`), "Blocking-condition register", row B-1, `Verified-At` `0c14d5b`.

| Field | Value |
|---|---|
| ID | B-1 |
| Class | post-deploy-observable |
| Condition | Scope item 2 and the runtime premise: after the website `master` deploy, the bot endpoint (`/api/interactions-server`) still accepts production's configured `HOOKS_API_TOKEN`, and the Node runtime runs `secretEquals` (`crypto.createHash('sha256')`, `crypto.timingSafeEqual`) |
| Primary instrument | One run of the hooks bot's "Get JSON" (`get_message`) on any message, after the release commit serves on production |
| Subject / fallback | The test account in the agents' Discord test server (guild `1566742402180456559`), if the hooks bot is there; fallback the owner |
| Earliest-decidable condition | Vercel production serving a deployment whose commit contains `0c14d5b` |
| Predicted value | The message JSON comes back. One failure refutes by construction: a 401-shaped "command failed" means production's `HOOKS_API_TOKEN` is empty or unset; a 500 means the runtime premise is false |
| Failure mode | Every hooks-bot user loses Get JSON until a non-empty token is set in Vercel or the release is reverted |
| Owner | devops |
| Deadline | none set by the QA row; the row stays open until a read decides it |
| State | Open |

**Result:** EXECUTED 2026-11-21T18:43Z, PASS — by `qa-fix-api-secret-compare` through the stage browser, test account 1 in guild
`1566742402180456559`, `#general`. Beside the prediction ("the message JSON comes back"): the guild's member list shows the Hooks.gg app
(read 18:43Z, so the subject exists); the bot's one message command, labelled "Get Message" (`get_message`; its name comes from
`src/lang` via `bot/scripts/app_commands/messageCommands.ts` at website `0c14d5b`), run on a Statbot `/top` message, answered with its
ephemeral load reply ("To load your message into the Hooks.gg editor…", a Hooks.gg link, a load code, "Open Message in Hooks.gg"). That
reply is built by `bot/serverCommands.ts` `get_message`, which the edge relay (`bot/edgeCommands.ts` `get_message`) passes on only when
`/api/interactions-server` answered 200, so the token guard accepted and `secretEquals` ran. Not a 401-shaped failure; not a 500.
Evidence: `verification/fix-api-secret-compare/qa/post-deploy/b1-get-message-read.txt` (load code redacted; no screenshot kept).
Test estate updated in the same turn: `~/.claude/skills/discord-test-browser/test-estate.json`, the guild's "Hooks.gg bot" entry set
`verified: true` with what was read (the server entry's own flag left false: its other contents were not read).
**Precondition — unread beyond the push.** origin `master` = `0c14d5bed78f…` (`git ls-remote`, 18:38Z), pushed 18:35:45Z; the GitHub
deployments API for `hooks-gg/website` answers 404 to this account (`post-deploy/deployments.json`), and no instrument here reads Vercel's
serving deployment. The read ran about 8 minutes after the push. If production still served `b68f94c` at 18:43Z, this PASS says nothing
about the release, and the row stays decidable only by a read after the serving commit is shown.
**Precondition — read 2026-11-21T19:02Z, MET** (steering-hooks, Vercel CLI look-only, on his selection: effort rulings block
2026-11-21T19:02): the production deployment aliased to `hooks.gg` was built from `master` commit `0c14d5b` (its build log: "Cloning
github.com/hooks-gg/website (Branch: master, Commit: 0c14d5b)"), created 18:35:46Z, Ready ~23 s later — before the 18:43Z read. The PASS
above is a read of the release. Evidence: `verification/fix-api-secret-compare/steering/vercel-serving.txt`. **B-1: PASS, terminal.**

The QA's Assumption Not Checked (Vercel's Node runtime for Pages API routes provides both `crypto` functions) closes with this
row: falsity signature, every request to `/api/v1/guilds/*/messages*` and `/api/interactions-server` answering 500 after the deploy.

**Minting limit, and Stage 1's attempt to discharge it.** QA asked that the instrument be shown to work on current production at
Stage 1 (pre-deploy, where a pass is expected whatever the token holds, since the old compare accepts an empty one). **Not
shown.** This devops session holds no `mcp__playwright__*` tools (a `ToolSearch` for them found none, 2026-11-21T18:2xZ), and the
test-estate file lists "Hooks.gg bot" in the test server as reported and unread (`verified: false`). A Get JSON needs a Discord user
driving a browser, so it was not run. The instrument is therefore unshown on current production; the first run of it is the one after
the deploy, and a failure then cannot be told from an instrument that never worked without the owner's or a browser-holding session's
pre-deploy pass.

### Item 2 — the code review's Assumption Not Checked (not a register row)

Source: `code-review/fix-api-secret-compare-code-review.md` (now `code-review/closed/`), "Assumption Not Checked", Round 1: the
Statbot API caller sends a single message's id as a plain decimal of at most 19 digits (statbot-api is outside this workspace and was
not read). If false, the Statbot caller's single-message requests (`GET /api/v1/guilds/{guildId}/messages/{id}`) start answering 400
after the deploy: ids written as `1e3`, `1.5`, a negative, with spaces, zero-padded to 20 or more digits, or above 9223372036854775807
no longer reach the database. Close by a read of production's request log for 400s on `/api/v1/guilds/*/messages/*` once the release
serves. Instrument held by devops: **none under standing permission** (production request logs on Vercel are not a read-only alias or
a Prometheus, Loki or Grafana query). Queued for the owner's read or a sanction for one, put with the release ask.

## Evidence

- `qa/closed/fix-api-secret-compare-qa.md` L207-L220 (register, minting limit), L195-L205 (Assumption Not Checked), Verdict at
  `Verified-At` `0c14d5b`.
- `code-review/closed/fix-api-secret-compare-code-review.md` § "Assumption Not Checked".
- `~/.claude/skills/discord-test-browser/test-estate.json` (read as a file; Hooks.gg bot in the test server, `verified: false`).
- No timed read: no crontab line is installed for either item, because neither read is a scheduled headless run (the instrument is a
  user acting in Discord, and no read-only instrument exists for item 2). The trigger is the deploy event.

## Origin

`implementation/closed/fix-api-secret-compare-implementation.md` (fixer chain `fix-api-secret-compare`); raised by QA Phase 2 (B-1) and
the code review (item 2); created by devops at Stage 1 per `devops.md` step 8. Named in the QA closure row and, at release, in the
deployment record's Post-Release Status.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T18:25 | devops-fix-api-secret-compare | Created at Stage 1: B-1 and the code review's Assumption carried in full; B-1's pre-deploy instrument check not run (no browser in this session) |
| 2026-11-21T18:36 | devops-fix-api-secret-compare | Trigger fired: website origin/master moved b68f94c to 0c14d5b at 2026-11-21T18:35:45Z (deployment/closed/fix-api-secret-compare-deployment.md). Both items still Open; no read has been made; neither is run by a scheduled reader |
| 2026-11-21T18:44 | qa-fix-api-secret-compare | Item 1 (B-1) read on steering's brief (agent-output 46c0ae4): EXECUTED 18:43Z, PASS — Hooks.gg is in the test server; Get Message returned its load reply. Vercel's serving commit unread beyond the push. Item 2 untouched; Status left to steering |
| 2026-11-21T19:02 | steering-hooks | Item 1 precondition read (Vercel CLI, look-only, his selection 19:02): production serves the build of master `0c14d5b`, created 18:35:46Z — B-1 PASS terminal. Item 2 still open: this CLI version returns build logs, not request logs; stays his dashboard read (`OWNER-QUEUE.md`) |
