# Rulings — steering-roadmap (Hooks.gg existing-items backlog, 2026-11-18)

Thread `steering-roadmap`, cwd `/usr/local/bin/hooks`, no alias, no coordinator. This is the
effort-wide rulings file for the chains his 21:4xZ command opened. Each chain keeps its own file
beside this one (`fix-dialog-closes-on-first-portal-load-rulings.md`; the planned chain's
`<ID>-rulings.md` once the planner mints the ID).

## 2026-11-18T21:53Z — commission (his words)

> "Check if <your_name>-docket.md exists and read into your memory first if so, before anything else.
> Then report the queue and the held items, and wait for instruction."

No docket existed for this thread (`docket-roadmap.md` absent in every memory namespace, `find`).

> "Determine what should be worked on next for the Hooks.gg project."

This thread answered with a five-item ranking: (1) Upload Message opens no dialog after a fresh page
load (`handoff/upload-message-dialog-closes-on-first-portal-load-2026-11-08.md`); (2) a failed
preview generation shows a broken image, not the old one
(`handoff/preview-image-failure-shows-broken-not-stale-2026-08-24.md`); (3) the saving tab shows
"Message Update Detected" for its own save
(`handoff/save-originating-tab-raises-its-own-update-prompt-2026-08-25.md`); (4) unsaved-change
warnings do nothing for signed-out users
(`handoff/unsaved-change-guards-disabled-for-unauthenticated-users-2026-08-24.md`); (5) hygiene: the
34 known lint findings (architecture Recommendation 1), deleting `enforceImportMutualExclusivity`
(Recommendation 6), the six test files outside their `__tests__/`
(`handoff/website-tests-not-beside-their-module-2026-11-08.md`), and the editor error-line text no
test asserts (`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md`). The ranking is
this thread's, not his.

> "Do all 5 in whatever order and group however you determine best."

Standing effect: his word opens chains for all five items; order and grouping are this thread's
determination, his to veto from this record. His 2026-11-11 ruling still binds: new feature work is
planned after the existing items (`steering/queue-hooks-rulings.md` line 35); these five are
existing items.

## 2026-11-18T21:53Z — grouping determination (scope statements follow the sweeps)

- **Chain A, `fix-dialog-closes-on-first-portal-load` — the `fixer` agent — item 1.** Cause proven
  by execution (analysis `analysis/closed/015-bug-evaluation-fixes-upload-dialog-analysis.md` V-1
  to V-6, cited by the handoff; not re-read this turn) and a one-property mutation that opens the
  dialog; one shared file per the handoff's stated remedy. Unfixed at website `origin/master`
  `395510e`: `src/components/AnchoredPopover/Child.tsx:22` carries `{ ssr: true }` and no `loading`
  (`grep -n -A3 'dynamic('`, this thread, 21:3xZ); file last changed `344e7b4` 2026-04-07
  (`git log -3 -- <path>`). First in the website tree, because it is live on production and
  smallest.
- **Chain B, one planned chain — full pipeline — items 2, 3, 4, 5.** Item 2 has a design choice
  (whether a failed generation is surfaced; whether the fix needs the image service) and may cross
  into `preview-image-generator`; item 3 is undiagnosed; item 4 turns on an unmeasured question
  (can a signed-out user hold meaningful unsaved edits) and names a fourth guard that has never
  worked; all three are user-visible, so UAT is owed. Item 5 rides as hygiene milestones in the
  same plan, since every part touches website files the other milestones may also touch, and one
  tree serves one chain. Planning, critique, architect conformance and QA Phase 1 run while chain A
  holds the tree; chain B's implementation starts when the tree is free of chain A's branch.
- **Release paths, read 21:52Z.** `release-move.js /usr/local/bin/hooks/website master
  395510e97f82… --dry-run` → exit 0, "ff-from-remote ok; sibling serving refs (none)", "workflows
  none"; `--report` → "one serving ref at origin (master); no pair". `release-move.js
  /usr/local/bin/hooks/preview-image-generator prod 8de2b533… --dry-run` → exit 0, "sibling
  serving refs (master) on one line ok", "workflows prod.yml: on push to prod → run: npm ci
  --omit=optional ; … npm run build"; `--report` → "prod contains master". `project-utils`
  `--report` → one serving ref. No split pair in any of the three. Remote refs by `git ls-remote`
  21:51Z: website `master` `395510e`, generator `master` `87dcb41`, `prod` `8de2b53`, no `preview`
  branch at the remote (`preview.yml` triggers on one).
- **Scope sweeps** started 21:52Z, one helper per defect item (1 to 4), each briefed with the
  property only; outputs under `verification/fix-dialog-closes-on-first-portal-load/scoping/` and
  `verification/backlog-2026-11-18/scoping/`. The scope statements are written from them below.
- **Chain A's determination** is in its own file, `steering/fix-dialog-closes-on-first-portal-load-rulings.md`
  (block 21:59Z).

## 2026-11-18T21:59Z — scoping determination: chain B (items 2 to 5)

He vetoes from this record. No stage has started. The planner mints the ID; this thread supplies
none. Refs read by the sweeps: website `origin/master` `395510e`, project-utils `origin/master`
`749606d`, preview-image-generator `origin/prod` `8de2b53`.

**Shape.** Three defects and one hygiene set; no dated outside event. Item 2: cause proven at the
code by the sweep (below), not by execution. Item 3: undiagnosed; the sweep found the one trigger
and the one subscriber and no way for a tab to recognise its own save. Item 4: the guards are
mapped; whether a signed-out user holds meaningful unsaved edits is unmeasured. Specification
uncertainty is real (item 2's failure visibility; item 3's mechanism; item 4's severity), so this
is a planned chain, not a fixer.

**Pipeline: full chain.** Planner, critic, architect conformance, QA Phase 1, implementer, code
review, QA Phase 2, UAT, devops, retrospective. **Security** on the preview-image-generator delta
before release: item 2's fix ships code the generator runs, and the generator runs as root
(`security/closed/015-preview-image-generator-security-audit.md` H-001, cited by the architecture
record). Analyst: only where the plan commissions one (items 3 and 4 are its likely subjects).

**Item 2 — property:** when a message's preview image cannot be produced, the places that show it
show a broken image instead of the last good one. His words: *"Show a stale one is fine."*
(`architecture/preview-image-generator.md`, owner-authored, as the handoff quotes it); on retention:
*"Intended. There's no purpose for retention."* (same handoff).
- Sweep (`verification/backlog-2026-11-18/scoping/preview-failure-sweep.md`): website
  `src/server/api/utils/shared.ts:260` mints the nonce and `:272` upserts it whatever the image
  request does; `postMessagePreviewImage` (`:192-203`) is called with `void` (`:269`, `:277`), no
  status check, empty catch. Generator `src/generateImage.ts:60-64` runs the render and a
  list-then-delete of `previews/<id>/` together in `Promise.all`, so the old image is deleted
  whatever the render does; `PutObject` follows only when both succeed (`:66-72`); `server.ts`
  answers 204 on success and 500 on failure. Read sites: `getPreviewImageUrl`
  (`src/utils/index.ts:541-543`) at `src/app/message/page.tsx:179` and
  `src/app/message/f/[id]/page.tsx:489`; no `onError`. Schema: project-utils
  `prisma/schema.prisma:98-102`.
- Consequence: the handoff's "fall back to the last known-good nonce" has nothing behind it today;
  only a shape where the old image survives a failure and the stored nonce moves only on success
  can show a stale image. That touches both repositories.
- In: the website save path's preview handling (`shared.ts`) and its tests; the generator's
  per-request storage order and its success/failure answer (`src/generateImage.ts`, `src/server.ts`)
  as far as the design needs; the read sites only if the design adds a fallback there.
- Out: retention (his ruling); messages already pointing at a missing image (a data repair; the
  record states "no DB instrument on this box", `architecture/system-architecture.md:189`, and the
  bucket's population is unread, so any repair is a question for him, not this chain's); the generator's host security
  posture (accepted by him, `handoff/preview-image-generator-host-security-posture-2026-11-08.md`);
  `/generate`'s body validation (architecture Problem Areas, Low) unless the plan changes the
  request contract, when it is a rider put to him; project-utils schema changes, unless the design
  needs one, when it is a scope delta put to him.
- Open for him through the plan: whether a failed generation is surfaced to anyone (the handoff's
  "decision about failure visibility").

**Item 3 — property:** the browser tab that saved a message is itself told the message was updated
elsewhere. His words, BC-14, 2026-08-25: *"Everything is fine except "Message Update Detected"
still occurs on save in the tab the save executed."*
- Sweep (`…/scoping/save-tab-notice-sweep.md`): one trigger, `shared.ts:290`
  `pusher.trigger(genMessageChannelKey(message.id), 'message-update', hashMessage(message))`, only
  when `message.id` is set (`:281`), with no sender exclusion; one subscriber,
  `src/providers/MessageProvider/usePusher.ts:42-50`, mounted at `MessageProvider/index.tsx:281`,
  raising the notice when the received hash differs from `hashMessage(normalizeForHash(current))`;
  no socket, client or revision identity anywhere (`git grep` for `socket_?id|socketId` → none).
- In: the trigger, the subscriber and the wiring between them, with tests; the diagnosis of why the
  hashes differ in the saving tab. The cross-tab notice (BC-14 limb c, reported fine) must keep
  working.
- Out: the Pusher app per environment (`.env*`, unread by rule).
- Hazard: any local walk of this surface publishes to the Pusher app in `website/.env.local`,
  treated as production's (`agent-output/CLAUDE.md`, "Local builds of `website`"); that walk's brief
  names `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md`, whose trigger
  it fires.

**Item 4 — property:** a user who is not signed in can lose edits they have not saved without being
warned.
- Sweep (`…/scoping/signed-out-guards-sweep.md`, a helper's report written into the record by this
  thread): the unload and route-change guards (`src/utils/hooks/useUnloadAlert.ts:8`, `:10-16`) and
  the Reload confirmation (`Navigation.tsx:161-168`) are enabled only when `status ===
  'authenticated'` (`MessageProvider/index.tsx:112-115`); `Redirects/Client.tsx:11-13`,
  `SessionProvider.tsx:14` and the sign-in button (`edit/page.tsx:154`) navigate with no check; a
  signed-out user edits `/message/m/0/edit`, whose edits are kept in localStorage; the route-change
  guard's event (`Router.events`, `next/router`) may never fire under the App Router (unverified).
- In: every guard above whose enabling depends on sign-in, and the route-change guard whether or
  not its event fires today — a fix that makes it work signed out makes it work for everyone, which
  he will see stated in the plan; the measurement of what a signed-out user can actually lose.
- Out: the Enter-key compare in `ConfirmationDialog`/`WarningDialog` (015 D30 / X-18; the record's
  real-Chrome read contradicts the helper's reading); the signed-in Log out without a check
  (`NavMenu.tsx:37-41`), a signed-in behaviour; the delete, Clear, Load and mode-switch
  confirmations, which work for both.

**Item 5 — hygiene (no behaviour change; no sweep owed).** Limbs of
`architecture/system-architecture.md` Recommendations, marked: 1 "Clear the 34 known ESLint
findings in the website, or record them as accepted" — **in** (the count at `395510e` is the plan's
to take); 2 per-repo records — out; 3 lockfile as a deliberate step — out (binds any re-pin the
plan makes); 4 "Close the P-6 preview-failure defect" — **in, as item 2**; 5 the generator's host
posture "when the owner reopens it" — out; 6 "Delete `enforceImportMutualExclusivity` or route it
through `isMessageV2`" — **in**. Also in: `handoff/website-tests-not-beside-their-module-2026-11-08.md`
(six files, per Test Conventions, case counts identical before and after) and
`handoff/editor-error-lines-render-text-unasserted-2026-11-11.md` (exact render-text assertions).
Out: `TODO.md`'s middleware dead-matcher tidy and every other `TODO.md` item.

**End step.** Production for both repositories, each push his word, asked by a devops session:
website `master` (Vercel; dry-run 21:52Z exit 0, "workflows none"); preview-image-generator `prod`
(`prod.yml` on push; dry-run 21:52Z exit 0, "prod contains master"). No beta: the generator's
`preview.yml` triggers on a `preview` branch absent at its remote (`git ls-remote`, 21:51Z); whether
a preview environment exists on the host is unread — a hazard line for devops. Order between the
two deploys is the plan's. A generator deploy fires
`handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md` (trigger: the next
production stop of a process that has served requests); devops carries its read.

**Released chains on these routes, and open carriers.** 013 (BC-14; the guards handoff; the
preview-failure handoff's origin), 015 (generator M8; security audit), 016 (send-check; nonce sites
unchanged by its release, unverified). Open carriers each item discharges: the four handoffs named
in the commission block, plus the two hygiene handoffs; adjacent and not discharged: the generator's
generic-pool, API-key and host-posture handoffs.

**Start.** Planning, critique, conformance and QA Phase 1 start now. Implementation starts when the
website tree is free of chain A's branch.

**Gate satisfactions this round (this thread's, disclosed).** (1) `record-write-gate-hook` refused a
shell append to the memory file `dockets.md` (it resolved the name against this repository); the
line was written with the Edit tool, its stated remedy. (2) `stamp-gate-hook` refused chain A's
determination heading typed as 22:00Z with the clock at 21:59Z; the heading carries `date -u`'s
21:59Z.

**Not covered by the sweeps.** The record's lines on items 3 and 4 (the secret-file gate refused
each helper's recursive record grep, naming `preview-image-generator/.github/workflows/prod.yml`;
not retried, by them or this thread): the planner reads the record on those mechanisms. The
generator was swept only by `git show` of named files (its `git grep` was refused likewise).
`src/app/preview/page.tsx`; deployed env values; Pusher SDK sender delivery; Next router-event
semantics; next-auth and react-use internals. One helper inference was checked and not borne out:
generator `src/config.ts:15` reads `API_KEY` from `process.env` (line classification by `awk`, no
content printed, this thread).
