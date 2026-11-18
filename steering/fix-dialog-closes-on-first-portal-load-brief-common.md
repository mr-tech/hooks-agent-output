# Brief, common part — fix-dialog-closes-on-first-portal-load

From `steering-roadmap`, written 2026-11-18 at the determination. Every brief of this chain names
this file second, after its `Duties negated:` line, and adds only what is its stage's own.

## Determination and stage set

`/usr/local/bin/hooks/agent-output/steering/fix-dialog-closes-on-first-portal-load-rulings.md`,
block "2026-11-18T21:59Z — scoping determination" (the bounded scope statement is there, and governs
where older text disagrees). Stage set, quoted: "fixer, then code review at its `Handoff-At`; QA
Phase 2 if the fix adds 20 or more production lines, otherwise the reviewer also runs the suite and
the red test; then devops for website `master`." No plan, critic, Phase 1 or UAT. The push of
website `master` reaches production and needs the owner's word, asked by a devops session.

Repositories: `/usr/local/bin/hooks/website` (source; branch `fix/dialog-closes-on-first-portal-load`,
cut by steering at `395510e97f82a5177d5edbb38b5d44858f745f3d`, no upstream) and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` on every call.

## Standing prohibitions relied on (quoted whole)

From `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Local builds of `website` — before the first
save" (it binds any local build on which this chain saves a message — the Upload Message dialog
creates one):

> A locally served build publishes its save event to the Pusher app named in `website/.env.local`,
> on the channel `message-update-<message id>`, and a fresh local database numbers messages from 1.
> Whether that Pusher app is production's is not established on this box, so treat it as
> production's: a local save on a low id can raise "Message Update Detected" for a real user editing
> the production message with the same id.
>
> **Before any save on a local build, move the local message ids out of production's range**:
>
> ```sql
> ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001;
> ```
>
> Run it after the schema is pushed and before the first save, and record in the stage document the
> id range the walk wrote. A local database that already holds low-numbered messages is recreated,
> not reused. `.env.local` holds credentials: read key names, hosts and ports only, never a value.

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages" (it binds any look at hooks.gg with a Discord
account):

> **Use the channels I've provided, fully and without asking.** The Discord test server (guild
> `1566742402180456559`) is the agents' own: type, send, run commands and change it as a test needs,
> as a test account or the test bot. A webhook or channel I hand over for a tool — the watchdog, the
> challenge alerts — is used for its stated purpose. Each place I add is used the same way.
>
> **A message that reaches a real person is mine to send.** Customers, users, staff and the public —
> any other Discord server, a DM, modmail, a support thread, a forum, email, a ticket reply — get
> nothing from an agent.

Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)" —
in particular axiom (E) and the Source-text assertion class (a test never reads production source
text), and the DOM tests' environment-fidelity convention.

## Architecture record

`/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (Components, website) and
`/usr/local/bin/hooks/agent-output/architecture/website.md`. Neither carries a Problem Area for this
defect; the carrier is
`/usr/local/bin/hooks/agent-output/handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md`.

## Hazard analysis (this thread's, composed at the determination — each a candidate to re-derive)

1. **The test environment may lie about the mechanism.** The handoff's step 4 is Headless UI's
   `useOnDisappear` seeing a zero rect. jsdom's layout returns zero rects for every element, so a
   jsdom test may close the dialog for a reason unrelated to the defect, or never exercise the
   suspension at all. The environment-fidelity convention applies: where jsdom cannot show the
   mechanism, the red test runs in a real browser, or the surface is an outstanding item. Not
   measured by this thread.
2. **"First load in the page's life" is module-cache state.** Inside one test file, only the first
   render of the dynamic sees an unloaded module; a later case sees it loaded and passes either way.
   A red test that is red only by ordering is not evidence.
3. **The record disagrees with the installed library.** Chain 004's closed plan, analysis and
   architecture findings assert `next/dynamic` has no Suspense boundary; the scope sweep's helper
   read Next 16.1.6 `loadable.js:49` as `hasSuspenseBoundary = !opts.ssr || !!opts.loading`. Read
   from the working tree's `node_modules`, not a ref. The executable artifact wins (global
   `CLAUDE.md`); re-derive before relying on either.
4. **The class catch touches lint configuration.** Chain B (planned, not yet minted) will clear the
   website's known lint findings. A new lint rule in this chain must add no finding beyond the one
   site this fix changes; the sweep found the other ten `next/dynamic` calls each carrying `loading`
   or `ssr: false`.
5. **Production is Vercel.** Which SHA Vercel serves is unread; a production look after the push
   establishes the fix there, not the push alone.

## Not checked by this thread

Whether `loading: () => null` (the analysis's mutation) is the right remedy or only a proof; what a
first popover open looks like with it; each portal consumer's dialog host at render (the sweep's
import graph over-approximates); `Navigation`'s host; the production evidence (not re-run).
