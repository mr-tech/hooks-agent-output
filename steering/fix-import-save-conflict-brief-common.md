# Brief, common part — fixer chain `fix-import-save-conflict`

From `steering-hooks`, written 2026-11-21T07:54Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-import-save-conflict-rulings.md`. tmux category:
`fix-import-save-conflict`.

## Determination and stage set

- His words: `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, block "2026-11-21T05:50Z" (Q2); this
  thread's reading of them, block "2026-11-21T05:59Z"; both quoted in the determination.
- Scoping determination, the bounded scope statement, the write set, exclusions and what the sweep did not cover:
  `/usr/local/bin/hooks/agent-output/steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T07:54Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-import-save-conflict` → `code-reviewer-fix-import-save-conflict` (and QA Phase 2,
  `qa-fix-import-save-conflict`, only at 20 or more added production lines; under 20 the reviewer also runs the suite and the red tests)
  → devops for website `master` (his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted to him
  with the release."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`). His word is needed, asked by devops in its
  own session.
- Source (discharged by the chain's closure): `/usr/local/bin/hooks/agent-output/handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md`.

Repositories: `/usr/local/bin/hooks/website` (the change, branch `chain/fix-import-save-conflict`, cut by steering from `origin/master`
`f4baebb`, no upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use
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

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His standing rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

Secret files: preview-image-generator's `.github/workflows/prod.yml` is flagged by the secret-file gate, which refuses line-printing
`grep`/`git grep` calls that could reach it. This chain needs nothing in preview-image-generator: keep every search to `website` by
explicit path, report any refusal to steering by message, and never re-issue a refused call in another form.

Record documents are written with the Write or Edit tool (or `record-edit.js`), never a shell heredoc (the record-write gate). Never
point a test or a probe at the database `website/.env.local` names: a test database is a throwaway container or the fake kysely
driver. Screenshots and captured media stay untracked. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test
Conventions (`website`)" — component tests mount with `createRoot`/`act` under the DOM project.

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`. A change to what it states about the
  persist gate or content dispositions goes to the architect through `agent-output/INBOX.md`.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`.
- Plan 013's rulings on the conflict: `planning/closed/013-components-v2-editing-surfaces.md` D17 (line 118: row E offers Classic or V2,
  the other dropped) and D31 (line 132).

## Hazard-bearing analysis (each a candidate to re-derive)

1. The floor (`validateContentRequirements`) fires on row D as well as row E (sweep §1); a fix that only opens the row E choice leaves
   row D's Save off.
2. The JSON tab resolves before the draft reaches the modal (`NewMessageJsonInput.tsx:96-110`); the import tabs hand the modal a raw
   draft, so the modal (or the import path) must resolve it once, not twice — a draft resolved twice could drop content the user chose
   to keep.
3. `JsonModalBody.tsx:171` floors the resolved draft (`validateContentRequirements(applyDisposition(...))`) — the pattern to match.
4. `NewMessageModal.persist-gate-wiring.test.tsx`'s harness mounts the modal and is reusable; its header avoids row E on purpose.
5. Whether Discord returns row E is unanswered (qa BC-17); the fix is tested on the converter's mechanical output.

## What this brief did not check

- Production data; `PresetDialog` and `Form` submit handling; server `upsert` on a row E payload; `EditMessageMenu`.