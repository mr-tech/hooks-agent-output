# Brief, common part — chain 017 (Hooks.gg backlog items 2 to 5)

From `steering-roadmap`, written 2026-11-18 at the determination. Every brief of this chain names
this file second, after its `Duties negated:` line, and adds only what is its stage's own. Written
as `steering/backlog-2026-11-18-brief-common.md` and renamed here once the planner minted ID 017
(agent-output `d7f6b2e`). Chain rulings file: `steering/017-rulings.md`.

## Determination and stage set

`/usr/local/bin/hooks/agent-output/steering/backlog-2026-11-18-rulings.md`, block "2026-11-18T21:59Z
— scoping determination: chain B (items 2 to 5)" (the bounded scope statement, per item, is there).
His word opening the chain: same file, block "2026-11-18T21:53Z — commission (his words)".

Stage set, quoted: "Planner, critic, architect conformance, QA Phase 1, implementer, code review,
QA Phase 2, UAT, devops, retrospective. **Security** on the preview-image-generator delta before
release … Analyst: only where the plan commissions one."

Repositories: `/usr/local/bin/hooks/website`, `/usr/local/bin/hooks/preview-image-generator`,
`/usr/local/bin/hooks/project-utils` (read; a schema change is a scope delta), and
`/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository:
`git -C <repo>` on every call. **The website tree is held by chain A**
(`fix/dialog-closes-on-first-portal-load`) until that chain releases; read website code at
`origin/master` (`git show origin/master:<path>`), not the checked-out tree, until steering records
this chain's branch.

## Standing prohibitions relied on (quoted whole)

From `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Local builds of `website` — before the first
save" (binds every local walk of items 3 and 4):

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

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **Use the channels I've provided, fully and without asking.** The Discord test server (guild
> `1566742402180456559`) is the agents' own: type, send, run commands and change it as a test needs,
> as a test account or the test bot. A webhook or channel I hand over for a tool — the watchdog, the
> challenge alerts — is used for its stated purpose. Each place I add is used the same way.
>
> **A message that reaches a real person is mine to send.** Customers, users, staff and the public —
> any other Discord server, a DM, modmail, a support thread, a forum, email, a ticket reply — get
> nothing from an agent.

Secret files: two handoffs carry `Secret-Files` (`handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md`,
`handoff/preview-image-generator-host-security-posture-2026-11-08.md`); the generator's
`.github/workflows/*.yml` hold the `/generate` key. The secret-file gate refuses recursive reads it
cannot bound (every scope-sweep helper hit it). Name files explicitly; disclose any refusal; never
re-issue a refused read in another form.

Test Conventions: `/usr/local/bin/hooks/agent-output/CLAUDE.md`, "Test Conventions (`website`)".
The generator carries no tests (same file, repository table).

## Architecture record

`/usr/local/bin/hooks/agent-output/architecture/system-architecture.md` (Problem Areas: the
preview-failure row; Recommendations 1, 4, 6; D-003), `/usr/local/bin/hooks/agent-output/architecture/preview-image-generator.md`
(P-6, the owner's "Show a stale one is fine"; retention), `/usr/local/bin/hooks/agent-output/architecture/website.md`
(W-1, W-2/D-005: the back end reflects what the front end allows).

## Hazard analysis (this thread's, composed at the determination — each a candidate to re-derive)

1. **Item 2 crosses a deploy boundary.** Website and generator deploy separately (Vercel; `prod.yml`).
   Any change to what `/generate` answers or when it deletes must be safe in both deploy orders, and
   during the window between them.
2. **Item 2's failure path is the generator's `Promise.all`.** A render failure after a completed
   delete leaves nothing; a delete moved after the write changes what a concurrent save sees (two
   saves of one message racing). Unanalysed.
3. **Awaiting the generator in the save path changes save latency.** Today the save never waits;
   the handoff records that as the half of his answer that holds ("the save never blocks and never
   slows"). A design that awaits generation inside the save trades that away.
4. **Item 3's notice is also the cross-tab protection that works** (BC-14 limb c). A fix that
   silences the saving tab by weakening the hash compare can silence the other tabs too.
5. **Item 4's route-change guard may be dead for everyone** (`next/router` events under the App
   Router, unverified). Making it work changes behaviour for signed-in users too.
6. **A generator deploy is a production stop** of a process that has served requests: it fires
   `handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md`.
7. **The website tree is shared with chain A** until A releases; nothing of this chain is committed
   in `website` before steering records this chain's branch.

## Not checked by this thread

The record's lines on items 3 and 4 (refused to the sweep helpers); `src/app/preview/page.tsx`;
deployed env values; Pusher's delivery to the sender; whether the generator's host has a preview
environment; the current ESLint count at `395510e`.
