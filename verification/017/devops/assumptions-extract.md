### FILE qa/017-existing-items-backlog-qa.md line 529: ### Assumption Not Checked (this pass)

This pass assumes the hosted production Postgres evaluates `clock_timestamp()` in an upsert's
`RETURNING` after the row lock, and orders `COLLATE "C"`, as the probe's Postgres 16.16 does. The
hosted server's version was not read. The signature of falsity: two saves of one message committing
out of upsert order in production, visible as an older preview after a quick double save. Owner:
devops, at release readiness (read `server_version` on the production database through whatever
read access the release has), named again in the hand-off.


### FILE qa/017-existing-items-backlog-qa.md line 616: ### Assumption Not Checked (this pass)

This pass assumes the bucket (DigitalOcean Spaces) reports `LastModified` at the write's completion
on one clock for every object of a prefix, as S3 does, and does not test it. If it is false, two
objects written seconds apart could differ by more than L, and a live save's object would be swept.
That would show as a broken preview right after a save, with the image's object missing from the
bucket. Owner: the implementer, as M5-c's first step against the real bucket's `dev/` prefix, two
puts seconds apart and their listed `LastModified` compared. If that read is not run, devops at
release readiness. Named again in the hand-off.
*Reconcile 2026-11-19T00:25Z:* revision 4 (M5-c form 3) argues the bound holds whether the bucket
stamps `LastModified` at a put's start or its end, since both fall inside the writing continuation's
life. It states the residue: a disagreement of more than 60 s between the bucket's own servers'
clocks. QA accepts the argument. The two-put check would write to the real bucket, which no stage
does unasked, and the residue is now a stated limit of the plan, so no measurement is owed and this
assumption is closed into that residue. This is not a verdict change.


### FILE qa/017-existing-items-backlog-qa.md line 781: ### Assumption Not Checked (this pass)

This pass assumes that the helper's jsdom capture carries over to a real browser in one respect: Enter on a focused
react-aria `Button` never reaches `document`. It does not test that. If it is false, the U-on-Reload position is a red row
too. QAF-20's rows stay right, but B-13's limb 2 may then read "two answered" at the unfixed tree where it predicts one.
The owner is UAT, at B-13. Named again in the hand-off.


### FILE qa/017-existing-items-backlog-qa.md line 856: ### Assumption Not Checked (this pass)

This pass assumes that a Preview deployment's post-response lifetime is the same as Production's. Limb 3 ran on a Preview.
Production's function limit is D-10's 60 s, and the Preview's limit is unread (devops's limit). This pass does not test the
assumption.
- **Falsifier.** In production, B-7's count shows "no answer within T" lines, or B-6's look shows a preview that stays
  stale, on saves whose render was quick.
- **Owner.** devops at Stage 1, through B-7's carrier. Named again in the hand-off.


### FILE qa/017-existing-items-backlog-qa.md line 981: ### Assumption Not Checked (this pass)

This pass assumes something about a real browser that it does not test. On a tree without M2-d, an in-app switch between
two messages' editors leaves the first message's pusher-js socket open. Nothing else closes it: not React's unmount, not
the `unsubscribe` of its only channel, and not garbage collection.
- **Falsifier.** B-15's first run at the unfixed tree shows one open Pusher socket after the switch, with the document
  marker still present. B-15 would then not discriminate, and M2-d would be a resource fix that no user can observe.
- **Owner.** QA Phase 2 for M2 runs B-15 once at `60252be` (unfixed) and once at the fix tip before UAT executes it. It is
  named again in the hand-off.


### FILE qa/017-existing-items-backlog-qa.md line 1031: ## Assumption Not Checked

This pass assumes that Pusher delivers a save's broadcast back to the tab that sent it in
production, as the probes model (AN-1 G-4), and does not test it. If it is false, M2's records are
never cleared, every later remote save of the same content is suppressed, and in B-1's walk tab 1
never receives its own broadcast. The owner is UAT, at B-1 (its walk publishes through the real
Pusher app), named again in the hand-off.


### FILE qa/017-existing-items-backlog-qa.md line 1139: ### Assumption Not Checked (effort-final pass)

This pass assumes that the operator classes `mutant-gen` generates, together with each milestone's named and coupling
sets, reach every decision the effort added, and does not test it.
- **What the generator does not make.** It does not delete a statement or a call (for example, the fetch effect's
  `removeDraft`, or a `waitUntil(...)` wrapper), and it does not drop a JSX attribute.
- **The milestone sets.** They placed such mutants only where Phase 1 named them (NM-10 to NM-38, and the coupling sets
  at M4, M5 and M8).
- **Signature if false.** A call-deletion mutant of a changed line survives the suite: removing one of the effort's
  added calls leaves 1814 of 1814 green.
- **Owner.** QA Phase 3 at the release tip, which may add a call-deletion set over the same predicate. Named again in
  the hand-off.


### FILE qa/017-existing-items-backlog-m1-qa.md line 232: ## Assumption Not Checked

This pass assumes that the shared `node_modules`, which the export links, is the install that `pnpm-lock.yaml` at `8147661`
describes, and does not test it. `package.json` and the lockfile are unchanged from `1ad625e`, but whether the installed tree
matches the lockfile was not checked (no `pnpm install --frozen-lockfile --offline` dry check). If it is false, a fresh install
at the release tip runs different dependency versions: a different case count, a failing case, or a typecheck error that this
run did not see. Owner: devops's release-tip QA Phase 3, which runs in a fresh install at the assembled tip.


### FILE qa/017-existing-items-backlog-m2-qa.md line 247: ## Assumption Not Checked

This pass assumes that the `pusher-js` substitute, shared by the AN-1 probe and the new test file, binds one
`message-update` handler per mounted provider, as the real client does for one channel subscription. It does not test
this. If it is false, a real tab would hold two bound handlers after a re-subscribe. The first would consume the record
and the second would compare with no record, so the saving tab would warn about its own save after any id-preserving
re-subscribe. Signature: in B-1's walk, tab 1 shows "Message Update Detected" once per save even with no typing in flight.
Owner: UAT at B-1, which runs on the real Pusher client.


### FILE qa/017-existing-items-backlog-m2-qa.md line 402: ### Assumption Not Checked (this pass)

This pass assumes something it does not test: that a production build (`next build`, then `next start`) opens and closes
the editor's Pusher sockets as the `next dev` builds here did. React's development-only behaviours, such as Strict Mode's
second effect run, could change the count in either direction, and B-15 ran on dev servers only.
- **Falsifier.** On a production build, B-15 reads differently on the fixed tree: more than one open socket at B, or A's
  socket still open on `/message`.
- **Owner.** UAT, which executes B-15. It runs it on a production build if its local build is one; otherwise it states the
  build kind. Named again in the hand-off.


### FILE qa/017-existing-items-backlog-m3-qa.md line 196: ## Assumption Not Checked

This pass assumes that a real browser delivers the native `storage` event to the **other** tabs after a write. The suite
asserts only the synthetic `Event('storage')` that `withLocalStorage.set` dispatches in the writing tab (M3-g's "updates the
other tabs as today"), and does not test the native delivery. jsdom is one window. If the assumption is false, a theme or
preference change in one tab no longer reaches the others. M3 did not change that path, but it now depends on it for
`messageDrafts` too. Signature: in B-2's walk, a draft typed in tab A is not offered to a new tab B, or a theme switch in A
does not repaint B. Owner: UAT at B-2, on a real browser.

Code review round 3's Assumption Not Checked (sessionStorage keeps the tab id across the Discord OAuth round trip) is
UAT's at B-2, as routed.


### FILE qa/017-existing-items-backlog-m4-qa.md line 243: ## Assumption Not Checked

This pass assumes the following and does not test it: in a real browser, with one confirmation open, focus sits on its
autofocused confirm button, so Enter answers that prompt through the button or the gated hotkey.
- **If it is false**, in B-12's lone-prompt limb Enter leaves the link prompt open. A user who answers by keyboard is then
  stuck until he clicks.
- **Owner**: UAT, at B-12. It is named again in the handoff.


### FILE qa/017-existing-items-backlog-m5-qa.md line 246: ## Assumption Not Checked

This pass assumes that production's `Messages."previewImageNonce"` column is `text`, as the Prisma schema declares, and
does not test it.
- **No migration exists** to read: the schema is pushed. No read-only access to Hooks.gg's production database exists
  from this box.
- **Signature if false.** For example, a `varchar(32)` sized to today's 32-character nonces. Every commit of a
  33-character nonce fails with "value too long". The continuation's error is not a generator outcome, so it is not
  among M5-f's classes. Previews never move after the deploy.
- **Owner.** devops at Stage 1, through B-6's look ("the preview shows the new edit within a minute"). A frozen preview
  on that look names this or RK-1. Named again in the hand-off.


### FILE qa/017-existing-items-backlog-m6-qa.md line 183: ## Assumption Not Checked

This pass assumes that a `/preview` page which falls back to "Invalid message data." answers 200 in production, as code
review's Round 7 assumption states, and does not test it. The probe's stub `/preview` serves set statuses, never the
website's page.
- **If it answers 200**, the generator stores that fallback image and answers 204. A message whose data the preview page
  cannot render then shows a stored "Invalid message data." image, not its last good preview.
- **Signature.** On B-6's look, a saved message's preview reads "Invalid message data.".
- **Owner.** UAT, at B-6's predecessor walk B-4 (the local stack serves the real `/preview`), and the owner at B-6.
  Named again in the hand-off.


### FILE qa/017-existing-items-backlog-m7-qa.md line 95: ## Assumption Not Checked

This pass assumes that the `.next/types` copied from the shared tree, generated for the current routes, gives the
`1ad625e` export the same type information the planner's capture had, and does not test it.
- **Signature if false.** Typed-rule counts (`no-unsafe-*`) on `src/app/**` files differ between the re-lint and the
  capture.
- **What it does not hide.** The comparison found 0 differing files. A difference from this source would have shown as
  a failed reproduction, so the assumption can only have produced a false mismatch, never hidden a real one.
- **Owner.** None further: this gate closes it by the result. Recorded because the export was not byte-identical to the
  planner's environment.


### FILE qa/017-existing-items-backlog-m8-qa.md line 272: ## Assumption Not Checked

This pass assumes that in a real browser focus stays inside a closing headlessui panel through its 75 ms leave, as jsdom shows
(`probe-closing-window/tip.probe`). It does not test that.
- **If it is false**, the closing window is jsdom-only. W's and I's `enabled` guards are then equivalent in the browser, and
  QAF-22's case specifies a guard no user can reach. The property is still the plan's, so the finding would stand.
- **Signature**: in a browser, after Escape or Cancel closes a delete warning, `document.activeElement` is outside the dialog
  before the leave ends.
- **Owner**: UAT, at B-13's walk. It is a look at `document.activeElement` straight after closing the image dialog with Enter.
  It is named again in the hand-off.


### FILE code-review/017-existing-items-backlog-code-review.md line 1039: ## Assumption Not Checked

- Round 1: this review assumes that the implementer's tip capture `verification/017/impl/m1/vitest-m1.json` (1505 of 1505, exit 0) is a run of the tree at `8147661`. I recounted from the capture and did not re-run the suite.
  - **If false**: a QA Phase 2 run at `8147661` shows a `numTotalTests` other than 1505, or a `testResults` path set that differs by membership from the capture's 123 paths, or a non-zero exit.
  - **Owner**: QA Phase 2 (`qa-hooks-017`). Closed by QA at agent-output `7d7eb50` (1505 of 1505, exit 0, path set equal by membership).
- Round 2: this review assumes that the tRPC transport delivers the client's `message` to the router unchanged apart from the input schema's parse. If it did not, the server's `hashMessage(message)` would differ from the record `hashMessage(normalizeForHash(payload))` for a real save. The test models the server as `optionalIdMessageShape.parse` plus `hashMessage` over the captured mutation input, and never sends a request through the transport.
  - **If false**: with Pusher delivering, a real two-tab walk shows tab 1 raising "Message Update Detected" for its own save with an edit typed in flight (M2-b fails), while tab 2's notice (M2-c) still shows.
  - **Owner**: UAT, walk B-1 on a local build (plan M2 "Human-observable form"). In production, his B-8 look exercises it only when the in-flight window is hit.

- Round 3: this review assumes that a browser keeps a tab's `sessionStorage` (`messageDraftTab`) across the Discord OAuth round trip and a reload in the same tab, as jsdom models it. If that is false, the tab id changes across sign-in, so the tab's own route-0 entry is not found.
  - **If false**: on the local-stack walk, after signing in, route 0 shows the most-recently-edited copy-in, or the intro when this tab's draft was not the newest, instead of this tab's own draft. `localStorage.messageDrafts` then holds two `0:` entries for one tab.
  - **Owner**: UAT, walk B-2 (plan M3 "Human-observable form"). In production, his B-9 look exercises it only when two route-0 drafts exist.

- Round 4: this review assumes that in a real browser, headlessui 2.2.9 keeps the link prompt open when the update prompt opens as a sibling dialog over it. The update prompt arrives by broadcast with no pointer event, so it should not count as an outside click on the link prompt. I measured the two-open state only in jsdom, and did not test how headlessui's outside-click, inert and focus handling treat two sibling `Dialog`s in a browser.
  - **If false**: on the walk, with unsaved edits, click a link so the link prompt shows, then save the same message from a second tab. The link prompt is then gone when the update prompt appears, or gone after the update prompt is answered, and the page has not navigated. That is M4-b's "neither is dropped" failing.
  - **Owner**: UAT, walk B-3 on the local stack (plan M4 "Human-observable form"), with this step added. In production, his B-9 look exercises it only when another tab saves while a link prompt is open.

- Round 5: this review assumes that in a real browser, Enter on a focused react-aria `Button` never reaches the document, and that when "Message Update Detected" opens over an open delete warning or image dialog, focus lands inside the update prompt. Both are RK-11's. The tests place focus by hand and hold either way: exactly the focused dialog answers. What they cannot show is which dialog a user's Enter reaches in a browser.
  - **If false**: on B-13's walk (two tabs, a delete warning open in tab A, a save from tab B), one Enter with focus on the update prompt's text both reloads and deletes the field. Or focus starts in the warning after the prompt opens, so Enter deletes the field and leaves the update prompt open.
  - **Owner**: UAT, walk B-13 on the local stack (plan M8 "Human-observable form"). In production, the same act after deploy.

- Round 6: this review assumes that DigitalOcean Spaces' `ListObjects` returns `LastModified` for every key of a message's prefix, in a form the SDK parses, and that the client's virtual-hosted addressing (`forcePathStyle: false`) reaches the bucket. The attack ran path-style against a loopback stub, which the SDK picks for an IP endpoint. The delete route already lists and deletes on Spaces with the same client today, but it never reads `LastModified`.
  - **If false**: after two saves of one message more than 120 s apart, a read-only listing of `previews/<id>/` holds more than one object (the sweep finds no age or no reference). Or Vercel's logs carry an SDK error with no `preview-image-failure` prefix after a 204.
  - **Owner**: UAT at B-6, the post-deploy look, under the production release of M5 with M6, with a read-only listing of the saved message's prefix added. devops establishes what that listing may read.

- Round 7: this review assumes that every message the website saves renders on `/preview` without reaching the page's own fallback. `src/app/preview/page.tsx` at `4b8db9c` is a client component that renders "Invalid message data." for unparseable data, and through `ErrorBoundary` for a crashing render, with the main resource still answering 200 (`system-architecture.md`, "`/preview` input guard"). M6-a's `error-status` class therefore never sees those renders. The generator screenshots the fallback, answers 204, and M5 commits it over the stale image the owner's "show a stale one" keeps. That behaviour predates this chain (plan 015 M5-h). What I did not test is whether any saved message reaches it.
  - **If false**: a production preview image shows the line "Invalid message data." for a saved message, with no `preview-image-failure` line on either service for that save.
  - **Owner**: UAT at B-6, the post-deploy look, under the production release of M5 with M6, with this step added: open the preview images of the messages saved in the look and check none shows the fallback line.

- Round 8: this review assumes that the planner's base report `verification/017/entry/lint-1ad625e/nofix.json` is what the shared install gives for `1ad625e` today. I compared against it and did not re-lint `1ad625e`: an export cannot lint, and the shared tree is not mine to move. The lockfile shows no eslint change across the chain. What I did not test is whether the installed plugin set changed outside the lockfile since the capture.
  - **If false**: a lint of `1ad625e` with today's install (a detached worktree resolving `eslint-plugin-react@7.33.2`) shows a per-file, per-rule count different from the capture for any of the 30 modified or renamed files. A file where the base rises can then hide a chain-added finding.
  - **Owner**: QA, at Phase 3's M7-b re-run on the merged tip (plan § M7, "Run … by QA at Phase 2"). That run re-lints both trees with the install it uses.

- Round 9: this review assumes that every transport pusher-js uses in the browser hands `message-update` data through the same `decodeMessage` (the websocket path at `dist/web/pusher.js` lines 1841 and 1947). I read the websocket path and did not trace the HTTP fallback transports. If a fallback delivered the raw string, the producer-side remedy would still give the exact string after its own parse.
  - **If false**: on UAT's B-1 re-walk with the frame captured, a frame whose payload is a JSON string still reaches the handler as something other than that string. That shows as tab A raising the notice for its own save with a quoted hash in the captured frame.
  - **Owner**: UAT, B-1 re-walk on the local stack, capturing frames as walk 6 did.

- Round 10: this review assumes that pusher-js 8.3.0's `disconnect()` closes the instance's socket and stops its reconnection timers in a browser, as its name and the mocks presume. Every case here mocks pusher-js, and the provider probe counts calls, not closed sockets.
  - **If false**: on B-15's walk, with the network panel open, leaving a message page (or switching message) leaves a `wss://ws-*.pusher.com` connection open, or a new one opens after the leave.
  - **Owner**: UAT, B-15 on the local stack.
- Round 10 sub-entry: this review assumes that the edited test file type-checks under `tsconfig.test.json` at `24e9be7`, as the implementer's "typecheck exit 0" states, and does not test it. Vitest does not type-check, and the case adds a new `source` prop (`typeof messageRef`) fed an object literal. Running the suite and the typecheck is QA's.
  - **If false**: `pnpm run typecheck` at `24e9be7` exits non-zero with an error in `usePusher.update-prompt.test.tsx`, while vitest stays 1851 of 1851.
  - **Owner**: QA, M2-d Phase 2 at `24e9be7`. (Closed by QA: typecheck exit 0 at `24e9be7`, `qa/017-existing-items-backlog-m2-qa.md`.)
- Round 10 sub-entry, continued (QAF-27): this review assumes that in a browser pusher-js passes a decoded non-string `data` to the `channel.bind` callback unchanged, so the cases' `Number(<hash>)` input is what the handler would receive. I do not test it. Every case calls the mocked handler directly.
  - **If false**: on a browser walk that delivers a bare number-shaped frame (an old build's), the handler receives a string, and the notice question becomes the exact-compare one the earlier cases already cover. The cases would still pin strictness, but against an input that cannot occur.
  - **Owner**: UAT, the B-1 re-walk on the local stack, recording the handler's received `typeof`.


### FILE critiques/closed/017-existing-items-backlog-critique.md line 319: ## Assumption Not Checked

Cycle 4 pass 2: this pass assumes that QA's B-15 row voids a run whose document was replaced, as
the plan's step says, and does not test it; the row's opening was read, not its void rule. If it
is false, a QA or UAT run that loaded a page counts as a pass on M2-d. QA owns it, in its own
register.

Premises run in cycle 4 pass 2: `git diff --numstat fad6cd4 a971ed8 --
planning/017-existing-items-backlog.md` gives 28 added, 11 removed, three commits. At `a971ed8`:
`grep -c '^### M'` 8; `OPEN QUESTION` 15, `[RESOLVED]` 15.

Cycle 4 pass 1: this pass assumes that, on the unfixed tree, moving inside the app from one
message's editor to another leaves the first Pusher WebSocket open in a real browser, and does not
test it. The record holds code reads only (`steering/017-rulings.md` block 11:10Z: "cleanup
unsubscribes only"). If it is false, the network panel shows one socket before the fix as well as
after, and M2-d's walk step shows nothing; the suite case still shows `disconnect` called. UAT
owns closing it, by one look at `42d15de` before the fix lands, or at the base.

Premises run in cycle 4 pass 1:

- **Boundary.** `git diff --numstat bcc23c6 fad6cd4 -- planning/017-existing-items-backlog.md`: 38
  added, 10 removed, three commits. At `fad6cd4`: `grep -c '^### M'` 8; `OPEN QUESTION` 15,
  `[RESOLVED]` 15.
- **Tip.** The website chain branch is at `42d15de`. `git diff --numstat 1ad625e 42d15de` over
  `usePusher.ts` and `shared.ts`: 34 added and 2 removed, 13 added and 29 removed.
- **Libraries.** `pusher` 5.1.3 and `pusher-js` 8.3.0 are the installed versions
  (`node_modules/*/package.json`).

Cycle 3 pass 2: this pass assumes that QA's kill table shows the `prefetch: true` mutant surviving
at `4b8db9c`, as X-24 says, and does not test it; the QAF-25 row was read, the sweep's capture was
not. If it is false, a case already asserts the default and X-24 excludes nothing. QA owns it, in
its own document. Pass 1's assumption below is discharged by QA's effort-final pass (R-47), read
here as its row and not re-derived.

Cycle 3 pass 1: this pass assumes that the M4 code review and QA Phase 2 records cover each of the
four rows revision 8 adds or corrects in M4-d's table, as the plan's sentence under the table
says, and does not test it. Read this pass: the M4 document holds the section the plan cites, and
`StyledLink.tsx` at `4b8db9c` has the `onClick` path; the review and QA documents were not opened.
If it is false, a click on Invite Bot or on the bot invitation with unsaved edits leaves the page
with no prompt. QA owns closing it, at the effort-final sweep its rows say is owed.

Premises run in cycle 3 pass 1 (website `4b8db9c` unless named):

- **Boundary.** `git diff --numstat 6ade256 5e36106 -- planning/017-existing-items-backlog.md`: 75
  added, 35 removed, 20 commits. At `5e36106`: `grep -c '^### M'` 8; `OPEN QUESTION` 15,
  `[RESOLVED]` 15.
- **M3's fetch cell.** `MessageProvider/index.tsx` calls `removeDraft(fetchedMessage.id)` in the
  fetch effect, as the cell says.
- **M4-a.** `StyledLink.tsx` intercepts from `onNavigate` and from `onClick`; the `onClick` path
  returns early on a prevented event, a non-self `target`, a modifier key, a middle click,
  `download`, or a same-origin href. Steering's 02:43Z block exists.
- **M4-d's rows.** `NavMenu.tsx` holds four string items: `/message/m/new`, `INVITE_URL`,
  `/support` with `newTab`, `/message`. `send/page.tsx` passes `InfoPanel` both a callback and
  `botInviteUrl`; `edit/page.tsx` passes a callback. `CookieConsent.tsx`'s "Learn more" has
  `target="_blank"`.
- **M6-c.** In the generator's `src/server.ts`, a rejection that is not a `PreviewFailure` answers
  500 and reaches `console.error(err)` with no class line. The website's `previewImage.ts` has a
  `status-500` class. QA's tip probe prints `PASS setup-rejects status=500 puts=0 … lines=0`.
- **X-22.** `git diff --quiet 1ad625e 4b8db9c -- src/app/preview/page.tsx` exits 0; `invalidData`
  is the fallback for null data and for the `ErrorBoundary`.
- **Carriers.** `architecture/system-architecture.md` holds the `/generate` body row (X-21) and the
  `/preview` input guard line (X-22). The M4 QA document names QAF-19 (X-23). Steering's 04:14Z
  block exists. The security audit's header says APPROVED with L-001 optional.
- **Status-Detail against the rows.** R-34 (M8), R-37 (M5), R-41 (M6) and R-44 (M7) say QA
  Complete at the SHAs the field names. It names X-22 alone as put to him; steering's 08:32Z block
  puts X-21 too.

One premise read of this pass was not completed: `git log -1` on the generator repository. The
generator's tip was taken from `git diff --numstat 8512a1d -- src/server.ts src/generateImage.ts`,
which printed nothing, and `src/server.ts` was read by name.

Cycle 2 pass 2: this pass assumes that a click on the update prompt's text in a real browser leaves
focus inside that prompt's dialog element, and does not test it. The walk's third step rests on it.
Read this pass: headlessui 2.2.9's installed `dialog.js` gives the dialog element `tabIndex:-1`, so
it can take focus; no browser was run. If it is false, focus falls to the page body and the walk
after M8 shows no dialog answering, where the plan expects Reload. UAT owns closing it, at QA's
B-13.

Premises run in cycle 2 pass 2:

- **Boundary.** `git diff --numstat 21e61eb 6ade256 -- planning/017-existing-items-backlog.md`: 112
  added, 64 removed, three commits. The diff (310 lines) was read whole from a file. At `6ade256`:
  `grep -c '^### M'` 8; `OPEN QUESTION` 15, `[RESOLVED]` 15.
- **F-26's listing.** `git grep -c "useDocumentEventListener('keydown'"` at website `5c3d03f`: one
  file, `EmojiPicker/Root.tsx`, as the plan says.
- **Limb 3's result.** The deployment record at `8f26f37` gives the request at 05:11:02.387Z, the
  read at 05:12:31Z, 6 records, and the 55 s line with `elapsedMs` 55015, as the plan says.
- **Limb 3's outcome rule.** It names no outcome for the control line with none of the five lines.
  The limb is closed as met with all five present, so no finding.

Cycle 2 pass 1: this pass assumes that Enter on a focused react-aria `Button` never reaches the
document in a real browser, as steering's jsdom run showed and M8's third direction bullet says,
and does not test it. SL-4's members 1 and 2 rest on it. If it is false, the unfixed tree at
`5c3d03f` shows two dialogs answering one Enter with focus on Reload, and the walk as written does
discriminate. UAT owns closing it, at RK-11's real-browser walk.

Premises run in cycle 2 pass 1 (website `5c3d03f` unless named; each count by `git grep -c` or a
listing read whole):

- **Boundary.** `git diff --numstat a97628d 21e61eb -- planning/017-existing-items-backlog.md`: 264
  added, 45 removed. The diff (481 lines) was read whole from a file. `21e61eb..c8e7ccd`: 6 added, 9
  removed, read whole. At `21e61eb`: `grep -c '^### M'` 8; `OPEN QUESTION` 15, `[RESOLVED]` 14.
- **M8-a's members, by an instrument the planner did not write.** `git grep -n "useHotkeys("` over
  production source: 6 sites. Three bind `['enter']` (`ConfirmationDialog.tsx`, `ImageUploader.tsx`,
  `WarningDialog.tsx`), two bind `esc`, one is `edit/page.tsx`'s registrar. A case-insensitive
  key-event listing (`keydown`, `keyup`, `keypress`, `'Enter'`) was read whole: no other
  document-level Enter answer. The plan's member list stands. One site the plan's second grep
  cannot see: F-26.
- **M8-d's counts.** `git grep -c "tagName !== '~/components/Button'"`: 3 files at `1ad625e`, 2 at
  `5c3d03f`, as the plan says.
- **M8's surfaces.** `git diff --numstat 1ad625e 5c3d03f` over the two files prints nothing. The
  renderers the plan lists match `git grep -l`. `ImageUploader.tsx` passes `unmount={false}` and
  enables its hotkey on `isOpen`. `react-hotkeys-hook` is 5.2.4 in the lockfile and installed, and
  its handler tests `enableOnFormTags`.
- **Registrations.** D-26 and D-29 match the ledger's 04:50Z and 05:01Z steering blocks word for
  word; D-27, D-28 and D-30 match the 04:55Z, 04:58Z and 05:06Z blocks. Statement 5 is D-29's text.
  R-7 to R-23 are other stages' verdict rows; each says no criterion moves, and none does.
- **Carried reads.** The deployment record at `d61f445` says 3 records and `elapsedMs=5006`, as
  M5-f and limb 2's result say. `architecture/system-architecture.md` holds the Problem Areas row
  X-20 names as its carrier.
- **Target release.** The header's `Target-Release` is untouched by the delta.

Cycle 1's lines follow.

Pass 1: this pass assumes AN-1's and AN-2's hook-level probes behave as a real browser does, and
does not test it. They run under jsdom, with a provider remount standing for a reload, a sign-in
round trip and a second tab, and with both Pusher delivery orders driven by hand. If the assumption
is false, a walk member of M2-b or of M3-a to M3-c fails in a real browser while its suite case is
green. QA Phase 1 owns closing it, through the local walk's provision, and then UAT's walk.

Pass 2: this pass assumes the architect's and QA's documents say what § "Gate findings folded" says
of AF-1 to AF-9 and QAF-1 to QAF-9, and does not test it. Only QA's B-7 and B-10 rows were read. If
it is false, the architect's delta pass or QA's re-key reopens a finding that table marks folded.
Those two gates own closing it.

Pass 3: this pass assumes QA's Postgres probe and the architect's timing capture show what the plan
says of them (P1 to P3 Observed on Postgres 16.16; 17.2 ms and 5.1 ms for a 7.4 MB map), and does
not test it. The two directories exist (`ls -d`); their contents were not read. If it is false, the
real-Postgres lane goes red on the shipped statements at M5. The implementer owns closing it at M5,
then QA at Phase 2.

Pass 4: this pass assumes the option text steering put to him at 00:21Z carries steering's own two
refutations (SL-3's members), and does not test it; that text is in a ledger block this pass could
not read. If it is false, he selects OQ-12 (b) or OQ-13 (b) on a consequence the code does not
have. Steering owns closing it, beside his selection.

Premises run in pass 4:

- **Boundary.** `git diff --numstat b3d811e a97628d -- planning/017-existing-items-backlog.md`: 48
  added, 17 removed, one commit. The diff was read whole. `git grep -c '^### M'` at `a97628d` is 7.
- **Open questions.** `git grep -c` at `a97628d`: `OPEN QUESTION` 13, `[RESOLVED]` 9. The rulings
  file's last block is 00:21Z, so OQ-11 to OQ-13 were unanswered at this pass.
- **SL-3 member 1.** The two reads are quoted in SL-3.
- **Prompts.** `ls -d ~/.claude/state/prompt-gate-off`: absent, so the approval question went as a
  selection prompt.

Premises run in pass 3:

- **Boundary.** `git diff --numstat 3d678cc b3d811e -- planning/017-existing-items-backlog.md`: 220
  added, 133 removed, over two commits (`5c9e785` R-5, `b3d811e` revision 3). The diff was read whole
  (582 lines). `git show b3d811e:… | grep -c '^### M'` is 7.
- **Open questions.** `git grep -c` at `b3d811e`: `OPEN QUESTION` 13, `[RESOLVED]` 9. The four open
  are OQ-7 and OQ-11 to OQ-13.
- **D-18 to D-21.** Each row's selected label and shown text match `steering/017-rulings.md` block
  00:11Z, read beside the rows.
- **M4-a's dialog reasons.** `git grep -n` at website `1ad625e`: `<ConfirmationDialog` is rendered
  by `edit/page.tsx` alone, and `<ConfirmationProvider` by `m/[id]/layout.tsx` alone.
  `ConfirmationProvider.tsx` holds one `props` state that `showConfirmation` sets.
- **Not yet put.** `grep -n '^## ' steering/017-rulings.md`: the last block is 00:11Z, and the
  2026-11-19 ledger holds the 00:10Z block only. So OQ-11 to OQ-13 were not put when this was read.
  Reconcile, same pass: a re-read after this critique's first pass-3 commit (`d3e4085`) found block
  00:21Z, which puts OQ-11 to OQ-13 to him. The first commit's "not yet put" was true at its read
  and stale at its commit. The 00:21Z block also records steering's own partial refutations of
  OQ-12 (b)'s and OQ-13 (b)'s wording; it does not raise the cross-dependency F-24 names.

Process fact of this run, lodged in the round: the record-write gate refused one Bash call at this
pass. The call redirected `git show b3d811e:planning/…` to a file in this session's scratchpad,
named through a shell variable, and the gate read the target as a path under `agent-output`. The
call was never aimed at a record document. It was re-issued with no file write at all
(`git grep -c … b3d811e -- planning/…`), which is the form that shows the gate its true target.

Premises run in pass 2 (`51805f4`): the pass-2 boundary, AN-1's 24 rows, the unload exits, the
storage helpers, `message/layout.tsx`, the three key-prefix predicates, the order token's byte
order, QA's B-7 and B-10 rows, and the record check. Premises run in pass 1 (`aa2e8ef`): the lint
baseline, the suite, 22 open handoffs, version fields, M1-a's moves, M1-c's mutants, the importer
listings, Vercel's retention, and the chain-015 probe. One read at pass 1 was not completed
and was not re-issued.

