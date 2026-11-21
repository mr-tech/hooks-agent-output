# Rulings — fixer chain `fix-message-link-import-empty` (website: the Message Link import returns an empty message)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 3c of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z" and
"2026-11-21T09:02Z". Brief common part: `steering/fix-message-link-import-empty-brief-common.md`. tmux category:
`fix-message-link-import-empty`.

## 2026-11-21T10:20Z — scoping determination: diagnose-first fixer chain, website

**His words.** `steering/fix-import-save-conflict-rulings.md`, block 09:02Z, by selection: "Agent: diagnose-first chain (Recommended)"
— "add a diagnose-first fixer chain to the queue after chain 3b. It establishes the cause on the test server first. If the fix is your
toggle in Discord's developer portal (the bot's Message Content intent), that step comes to you; if it is code, the chain fixes it."

**Source.** `handoff/message-link-import-returns-empty-message-2026-11-21.md` (UUID 6cc5f883), IN whole: on production, `message.getFromUrl`
answered 200 with `content: ""`, `embeds: []` and no components for two messages the test bot posted with content in the Claude test
server (capture `verification/fix-import-save-conflict/qa/pd1/evidence/getFromUrl-direct-read.json`). Its Review-Trigger fired with
this chain's opening.

**Shape.** Defect, in production (pre-existing; unchanged `f4baebb..b663b35` per the sweep's premise reads). Cause not proven: the
Message Content intent is an inference. Blast radius: every Message Link import of a message the bot did not author (if the intent
holds). Specification: importing a message by its link loads its content, embeds and components into the draft. End step: if code,
website `master` (Vercel production), his word asked by devops in its own session; if the cause is the portal setting, his act in
Discord's developer portal, then a read-only production read. **Release ref:** `release-move.js website --report` 10:20Z: "One serving
ref at origin (master); no pair". Tree: `master` `b663b35` = `origin/master`, `?? .playwright-mcp/` only.
**Released chains whose scope touched this route:** `fix-import-save-conflict` (`b829314`; the new-message dialog; its PD-1 found this
and is closed); `fix-get-one-absent-not-found` (`b663b35`; not this route).

**Scope sweep** (helper, `verification/fix-message-link-import-empty/scoping/sweep.md`, at `origin/master` `b663b35`). Property: "a
Discord message read from Discord's API through the app's bot comes back with its `content`, `embeds` or `components` empty or missing,
although the original has them." Sites: S1 `message.ts:115` (`getFromUrl`, bot token; `content` verbatim, embeds kept only when
`rich`, components filtered) — the one bot-token message read. S4 `useValidateWebhook.ts:56` and S5 `WebhookProvider.tsx:107` — client
GETs with the webhook token (a webhook reads its own messages). S6 `bot/serverCommands.ts:28` — the `get_message` command reads the
message from the interaction payload, no REST read. S7/S8 read the Redis store S6 wrote. No gateway client or intent configuration in
`website` or `project-utils`. No code changes `content`, so a blank `content` comes from the API response; missing embeds or components
can also come from the converter's filters.

**Stage set:** `fixer-fix-message-link-import-empty` (diagnosis first; then, for a code cause, the fix with a red test) →
`code-reviewer-fix-message-link-import-empty` (and QA Phase 2, `qa-fix-message-link-import-empty`, at 20 or more added production lines;
under 20 the reviewer also runs the suite and the red tests) → devops for website `master` (his word). A qa-role session with the
browser takes any production read the diagnosis needs (read only, test account), started by steering on the fixer's request. Where
the diagnosis names a portal setting, the chain stops there: the finding goes to him as a prompt, no code is written for it, and after
his act a qa-role session reads production. No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** are quoted to him with
the release.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `b663b35`, on `chain/fix-message-link-import-empty`:
1. **Diagnose** why S1 returns an empty message for a message with content, on the Claude test server (guild `1566742402180456559`):
   the fixer posts fixtures there (test bot or a test webhook, allowed) that discriminate the candidate causes — at least a message by
   another author with plain content, one that mentions the bot, one the bot itself authored, a Components V2 message and one with a
   non-`rich` embed — and reads them through S1's own code path. The record names the cause with the read that established it.
2. **Fix, for a code cause only**: a Message Link import of a message with content, embeds or components loads them into the draft.
   Red test seen to fail at `b663b35`, through the real converter and the real response shape.
Write set: website `src/server/api/routers/message.ts` (`getFromUrl` only), `src/utils/discordResponseToMessage.ts`,
`src/app/message/_components/NewMessageModal.tsx` (the Message Link limb only), their `__tests__/`; in the record, the fixer's document
and `verification/fix-message-link-import-empty/`. A change to paracord, project-utils, the Discord app's settings or any other site is a
re-scope.

**Exclusions.** S4/S5 webhook-token reads: OUT (a webhook reads its own messages; named for the fixer to re-include if the diagnosis
implicates them — a re-scope). S6-S8, the `get_message` command and the code store: OUT (no REST read). S2/S3 and S9-S11: OUT (not
message reads). `preview-image-generator`: not swept (I14, not completed); OUT, uncovered.

**What the sweep did not cover:** paracord's source; the developer-portal setting; any live Discord read; `preview-image-generator`;
consumers of `WebhookProvider`'s state; Discord's terms for the Message Content intent on an app in many servers (unread).
