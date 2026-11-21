# Brief, common part — fixer chain `fix-message-link-import-empty`

From `steering-hooks`, written 2026-11-21T10:20Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-message-link-import-empty-rulings.md`. tmux
category: `fix-message-link-import-empty`.

## Determination and stage set

- His words: `/usr/local/bin/hooks/agent-output/steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T09:02Z", quoted in
  the determination.
- Scoping determination, the bounded scope statement, the write set, exclusions and what the sweep did not cover:
  `/usr/local/bin/hooks/agent-output/steering/fix-message-link-import-empty-rulings.md`, block "2026-11-21T10:20Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-message-link-import-empty` (diagnosis first; then, for a code cause, the fix with a red
  test) → `code-reviewer-fix-message-link-import-empty` (and QA Phase 2, `qa-fix-message-link-import-empty`, at 20 or more added
  production lines; under 20 the reviewer also runs the suite and the red tests) → devops for website `master` (his word). A qa-role
  session with the browser takes any production read the diagnosis needs (read only, test account), started by steering on the
  fixer's request. Where the diagnosis names a portal setting, the chain stops there: the finding goes to him as a prompt, no code is
  written for it, and after his act a qa-role session reads production."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`); his word, asked by devops in its own
  session. Or, for a portal cause, his act in Discord's developer portal.
- Source: `/usr/local/bin/hooks/agent-output/handoff/message-link-import-returns-empty-message-2026-11-21.md` (UUID 6cc5f883); it
  closes only after a production read shows the import loads content.

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-message-link-import-empty`, cut by steering from `origin/master`
`b663b35`, no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use
`git -C <repo>` on every call. The permitted write set is the determination block's; anything else is a re-scope: stop and message
`steering-hooks`.

## Standing prohibitions relied on (quoted whole)

From `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Local builds of `website` — before the first save":

> A locally served build publishes its save event to the Pusher app named in `website/.env.local`, on the channel
> `message-update-<message id>`, and a fresh local database numbers messages from 1. Whether that Pusher app is production's is not
> established on this box, so treat it as production's: a local save on a low id can raise "Message Update Detected" for a real user
> editing the production message with the same id.
>
> **Before any save on a local build, move the local message ids out of production's range**:
>
> ```sql
> ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001;
> ```
>
> Run it after the schema is pushed and before the first save, and record in the stage document the id range the walk wrote. A local
> database that already holds low-numbered messages is recreated, not reused. `.env.local` holds credentials: read key names, hosts and
> ports only, never a value.

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **Use the channels I've provided, fully and without asking.** The Discord test server (guild `1566742402180456559`) is the agents'
> own: type, send, run commands and change it as a test needs, as a test account or the test bot.

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His standing rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

Secret files: preview-image-generator is out of this chain. Keep every search to `website` by explicit path, report any refusal to
steering by message, and never re-issue a refused call in another form.

Record documents are written with the Write or Edit tool (or `record-edit.js`), never a shell heredoc (the record-write gate). Never
point a test at the database `website/.env.local` names. Screenshots and captured media stay untracked. Test Conventions:
`/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)".

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`. A change to what it states goes to the
  architect through `agent-output/INBOX.md`.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`.

## Hazard-bearing analysis (this thread's; each a candidate to re-derive)

1. **Which Discord app reads.** Production reads with production's `DISCORD_BOT_TOKEN`; a local build reads with whatever app
   `.env.local` names, which is not established to be production's. A diagnosis on a local build establishes which app read (its bot
   user, by a read that prints no credential) before it says anything about production; a limb only production can show goes to a
   qa-role read on hooks.gg, by message to steering.
2. **The candidate cause is an inference.** Discord blanks `content`, embeds and components for an app without the Message Content
   intent, unless the bot authored the message or it mentions the bot. Fixtures that split those cases discriminate it; a single
   fixture does not.
3. **The converter drops by design or by defect.** `discordResponseToMessage.ts` keeps only `rich` embeds and filters components. Whether
   a dropped non-`rich` embed is a defect is a product question: put it to steering, never decide it in code.
4. **Discord's terms on the intent are unread.** For an app in many servers the intent may need Discord's approval, not a toggle. The
   diagnosis states what it read about that, or that it is unread.
5. The `get_message` command (S6) reads the message from the interaction payload, so it may load content where the link import does
   not. A comparison of the two is evidence, not a fix.
