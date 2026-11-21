# Brief, common part — fixer chain `fix-desktop-draft-as-typed`

From `steering-hooks`, written 2026-11-21T10:43Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-desktop-draft-as-typed-rulings.md`. tmux category:
`fix-desktop-draft-as-typed`.

## Determination and stage set

- His words: `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:50Z" (Q3, save as
  you type) and "2026-11-21T05:59Z" (reach: all typed text; the two dialogs keep their button); both quoted in the determination.
- Scoping determination, the bounded scope statement, the write set, exclusions and what the sweep did not cover:
  `/usr/local/bin/hooks/agent-output/steering/fix-desktop-draft-as-typed-rulings.md`, block "2026-11-21T10:43Z". The block governs.
- Stage set, quoted from that block: "`fixer-fix-desktop-draft-as-typed` → `code-reviewer-fix-desktop-draft-as-typed` (and QA Phase 2,
  `qa-fix-desktop-draft-as-typed`, only at 20 or more added production lines; under 20 the reviewer also runs the suite and the red
  tests) → devops for website `master` (his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted to
  him with the release."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`). His word is needed, asked by devops in its
  own session.
- Source (discharged by the chain's closure): `/usr/local/bin/hooks/agent-output/handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md`.
- Scope sweep: `/usr/local/bin/hooks/agent-output/verification/fix-desktop-draft-as-typed/scoping/sweep.md` (at `76da25c`; its region
  re-read at `b663b35` in the determination). Its line numbers predate `b663b35` for `MessageProvider/index.tsx` (+6).

Repositories: `/usr/local/bin/hooks/website` (the change, branch `chain/fix-desktop-draft-as-typed`, cut by steering from `origin/master`
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

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His standing rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

Secret files: preview-image-generator's `.github/workflows/prod.yml` is flagged by the secret-file gate, which refuses line-printing
`grep`/`git grep` calls that could reach it. This chain needs nothing in preview-image-generator: keep every search to `website` by
explicit path, report any refusal to steering by message, and never re-issue a refused call in another form.

Record documents are written with the Write or Edit tool (or `record-edit.js`), never a shell heredoc (the record-write gate). Never
point a test or a probe at the database `website/.env.local` names: a test database is a throwaway container. Screenshots and captured
media stay untracked. Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)" — component tests
mount with `createRoot`/`act` under the DOM project; its environment-fidelity convention binds the Slate tests (hazard 5).

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (L131, L181 on the draft store). A change to
  what it states goes to the architect through `agent-output/INBOX.md`.
- Per-repo record: `/usr/local/bin/hooks/agent-output/architecture/website.md`, A-7 (L305-318): a change to the drafts goes through
  `messageDrafts.ts` and keeps plan 017 M3's write matrix true. This chain writes through the existing effect and changes the store not
  at all; the write matrix row "An edit at route 0 (typed, …) | written (`message` effect)" becomes true of desktop too.
- Plan 017's store and bound: `planning/closed/017-existing-items-backlog.md` L517-558 (M3), L544-546 (the bound's rationale assumes
  per-keystroke writes).

## Hazard-bearing analysis (each a candidate to re-derive)

1. Per-keystroke draft writes (sweep §5): each change of `message` runs `writeDraft` — a whole-map `JSON.parse`, two `JSON.stringify`,
   `setItem` and a synchronous `storage` event; route 0 adds a second `setItem`. Mobile pays this today; desktop will. 017's figures
   (17.2 ms / 5.1 ms at 7.4 MB, bound 1 MiB) were not re-measured. A debounce is a re-scope (determination, Exclusions).
2. The author name and footer commit a trimmed value (`EmbedAuthor.tsx:57-61`, `EmbedFooter.tsx:123` at `b663b35`). Committing
   `trim()` per keystroke, with `usePassedProp` resetting local state from the prop, would eat a trailing space as it is typed ("a b"
   cannot be typed). The trim must not run on the typed value mid-edit.
3. `usePassedProp` (`utils/hooks/index.ts` L43-47) resets local state when its prop changes; `ContentEditable.tsx` L36-40 re-syncs
   `innerText` from `value`. A per-keystroke round trip through the prop can move the caret in `ContentEditable` (sweep §3, unassessed).
   `SlateEditor` ignores `initialValue` changes (memo at L151), so the content editor's text is not reset.
4. `SlateEditor` calls `onChange(string)` once on mount (`SlateEditor/index.tsx` L58-59). With the fix, opening the desktop editor calls
   the message setter with the current text; if a setter builds a new `message` on an equal value, focusing alone writes a draft (mobile
   already does). Setter bodies were not read.
5. Environment fidelity: Slate in a DOM substitute may not accept typed input as a browser does. A test asserts only a path the
   substitute is checked to match; a path it cannot drive is recorded as an outstanding item, never asserted against a fake.
6. The leave-page warning (`utils/hooks/useUnloadAlert.ts`) was not read; whether it fires on the reload is unknown either side of
   the fix.

## What this brief did not check

- Pre-017 behaviour at `1ad625e`; mobile `BottomPortal` close; `useLocalStorage` readers of the `storage` event; production data.
