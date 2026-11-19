---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Reopened 17:53Z: the anchor fired. UAT-1 reopened M2 and the website tree moved past 4b8db9c (42d15de, with D-33's and D-34's round still to come). Delta read on plan revision 10 (record fad6cd4): APPROVED stands. AF-25 LOW is recommended to the planner (M2-c's instrument must run pusher-js's real decode), and AF-26 INFO records the wire form's deploy-order safety. The disconnect code is not held by this read. Open until a closing pass no later than devops Stage 1: the website delta 4b8db9c..M2's final tip read, and Runtime Flow 1b and website.md A-6 reconciled to the implemented wire form and disconnect."
---

# Architecture Findings — Plan 017: the existing-items backlog (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-18T23:31 | Conformance pass, plan rev 1 (record `97e6814`; the file as read also carries `d84b192`'s R-4 rows D-14 to D-16, registration only), briefed by steering-roadmap (`steering/backlog-2026-11-18-briefs/architect-hooks-017.md`) | Every concrete form the plan writes was read against website `origin/master` `1ad625e`, preview-image-generator `origin/prod` `8de2b53` and project-utils `origin/master` (`git show <ref>:<path>`; nothing run in a shared tree). Five changes are required (AF-1 to AF-5), two are recommended (AF-6, AF-7), and one alternative design is recorded (AF-8). The plan's open line on the cross-repo contract file is answered (AF-9). Six forms conform (AF-10 to AF-15). **APPROVED_WITH_CHANGES.** |
| 2026-11-19T00:07 | Delta pass, plan rev 2 (record `3d678cc`), on the planner's word (`planner-hooks-017`). The diff was read from the last text this architect read, `d84b192`, to `3d678cc`, which takes in the planner's `a3c1e83` checkpoint. | Each of AF-1 to AF-7 is answered in the form this pass asked for, or in a stricter one: the order token comes from the database clock under the row lock, and the reader of the key prefix (`getCDNUrl`) is named. Their arguments are retired below to one disposition line each. The new forms were read against the base: the ordered nonce's sort, L against the continuation's life, the guard context, and the draft store's form and matrix. Three items are raised from that read, none required: AF-16 LOW (the draft map is written whole on every edit), AF-17 INFO (a bucket-clock reference that needs no response header) and AF-18 LOW (when the new preview shows after a save). **APPROVED.** |
| 2026-11-19T00:20 | Delta read, plan rev 3 (record `b3d811e`; diff `3d678cc..b3d811e`, which takes in `5c9e785`'s R-5 registration), on the planner's word. | Each of AF-16 to AF-18 is folded: the byte bound is offered to him as OQ-11 (a), M5-c form 3 measures age against the committed object, and the M5 walk reads the preview after a reload. M5-c form 3's revised argument was re-derived: a later save's object is written after the committed save's upsert, so it is at most 60 s older than the committed object and is never collected. The argument holds and is stricter than AF-17's. M5-a's locked read of the replaced nonce (QAF-10), with a real-Postgres lane, conforms. M4-a's changed dialog form (its own `ConfirmationProvider` instance at the layout, QAF-12) was read against `ConfirmationProvider.tsx`: it conforms, with AF-22 LOW recommended. Nothing raised against unchanged text. **APPROVED** stands. |
| 2026-11-19T00:28 | Delta read, plan rev 4 (record `a97628d`; diff `b3d811e..a97628d`), briefed by steering-roadmap as the conformance read of the revision the critic reads before implementation | AF-22 is folded in the form it asked for, and its argument is retired to a disposition line. QAF-13's rule was re-derived and holds. F-24's table, F-25's falsifier and QAF-14's precondition were read. No finding. His OQ-11 to OQ-13 answers, all option (a) (`steering/017-rulings.md` block 2026-11-19T00:27Z), are the forms this pass read. **APPROVED** stands. |
| 2026-11-19T05:08 | Conformance read, plan rev 6 (record `21e61eb`; diff `a97628d..21e61eb`, taking in revision 5 `5155e68`, which was never routed, and registration rows R-6 to R-24), briefed by steering-roadmap. Rulings read: `steering/017-rulings.md` blocks 04:50Z, 05:01Z and 05:06Z. | M8's form was read against website `5c3d03f`. The sibling it mirrors, `ConfirmationDialog.tsx` `Inner` (a ref inside the panel, with `closest('[role="dialog"]')` containing `document.activeElement`), is as the plan cites it. Both members still carry the dead `tagName` compare. The Architectural-Surface line's M8 sentence is correct: M8 adds no surface and narrows two leaf dialogs to M4's approved form. X-20's carrier, the Problem Areas row restated at the closing pass, is accepted and added to the open items. M5-0 limb 3 and its outcomes are sound. Its result on a Preview carries to production only if the 60 s limit is project-wide, which the plan marks unread for a Preview. AF-23 INFO is offered. **APPROVED** stands. |
| 2026-11-19T05:17 | Delta read, plan rev 7 (record `6ade256`; diff `21e61eb..6ade256`, taking in R-25 and R-26), briefed by steering-roadmap | AF-23 is folded as written, and its argument is retired to a disposition line. The critic's F-26 to F-28 and SL-4, QA's QAF-20 and QAF-21, and limb 3's result were read as the delta. No finding. **APPROVED** stands. |
| 2026-11-19T08:44 | Closing pass, plan rev 8 (record `5e36106`; diff `6ade256..5e36106`, the Planner batch fold), briefed by steering-roadmap-hooks (`steering/backlog-2026-11-18-briefs/architect-hooks-017-closing.md`). Release trees read: website `4b8db9c`, generator `8512a1d`. His X-21 and X-22 acceptances read in `steering/017-rulings.md` block 08:41Z (`06f7f2f`). | Premises re-read and held. The delta's forms conform. M4-a's `onClick` path is a necessary deviation (AF-24 INFO). No defect, so nothing goes to the planner. Open items 1 to 4 and the master document's lag are discharged: Runtime Flow 3, Components, Data Boundaries, Dependencies, Quality Attributes, Problem Areas (two resolved, four restated, five registered), D-006, Roadmap Readiness, Recommendations 1, 4 and 6, the diagram, `website.md` A-7/A-8 and `preview-image-generator.md` A-1, A-2, P-2 and P-6. **APPROVED** stands. Closed `Resolved`. |
| 2026-11-19T09:18 | Closing pass, plan rev 9 (record `bcc23c6`; diff `5e36106..bcc23c6`), briefed by steering-roadmap-hooks by message. The critic approved revision 9 (`5f892f5`). Release trees re-read: website `4b8db9c`, generator `8512a1d`, unchanged. | The delta is X-24 (QAF-25, `StyledLink`'s `prefetch: false` default unasserted), D-31 and D-32 (his X-22 and X-21 acceptances, already landed as accepted at `2a9db38`), RK-8's firing history, and the X-21/X-22 cells. X-24's premise holds: `mergeProps({ prefetch: false }, …)` is in `StyledLink.tsx` at both `1ad625e` and `4b8db9c`. It is a test gap, not a form, so no pattern or Problem Area moves. No finding. **APPROVED** stands; the document stays `Resolved`. |
| 2026-11-19T17:53 | Delta read, plan rev 10 (record `fad6cd4`; diff `bcc23c6..fad6cd4`, taking in R-49 to R-51 and D-33 to D-35), on the planner's word (`planner-hooks-017`, by message). Rulings read: `steering/017-rulings.md` blocks 10:31Z, 11:06Z, 11:10Z, 17:49Z and 17:51Z. Website read at `42d15de` (`chain/017-existing-items-backlog`). | The document is reopened from `closed/`, because the anchor its `Status-Detail` named has fired. M2-c's wire form (D-33) and M2-d (D-34) were read against the producer, the consumer and both libraries at their installed versions. AF-25 LOW is recommended to the planner, and AF-26 INFO is recorded. **APPROVED** stands. Process fact: the record-write gate refused one shell command of this pass, a redirect to this session's scratchpad written as a variable path. It was re-issued with the literal scratchpad path; no record document was written through the shell. |

## Scope and instrument

**Conformance pass.** Read at the refs named: website `src/server/api/utils/shared.ts` (`postMessagePreviewImage`,
`buildMessageValues`, `buildUpsertMessageQuery`, `upsertMessage`), `src/server/api/utils/deleteMessagePreviewImages.ts`,
`src/server/api/routers/message.ts` (`upsert`, `delete`), `src/utils/withLocalStorage.ts`,
`src/utils/hooks/useLocalStorage.ts`, `src/@types/global.d.ts` `LocalStorage`, `src/providers/MessageProvider/usePusher.ts`,
`useApiMethods.ts` `persist`, `src/components/StyledLink.tsx`, `src/app/message/layout.tsx`,
`src/app/message/m/[id]/layout.tsx`, `src/app/_components/Providers.tsx`, `src/providers/ConfirmationProvider.tsx`
(imports) and `package.json`. Generator: `src/generateImage.ts`, `src/server.ts` and `ecosystem.config.js`.
project-utils: `prisma/schema.prisma` `model Message`. Reference searches were made by `git grep` at those refs and are
quoted where used. Not read: Vercel's or the CDN's runtime behaviour (no probe was run), and the analysis document's
body beyond what the plan quotes.

**Delta pass.** The plan diff `d84b192..3d678cc` was read whole. Also read at website `1ad625e`:
`MessageProvider/index.tsx`, the effect that writes the store on every change of `message`, and the
`upsert.useMutation` site. `getPreviewImageUrl`'s callers were found by `git grep`. One measurement was run on this
box: AF-16's serialise cost (`verification/017/architect-delta/`).

## Findings on revision 1 (dispositions)

AF-1 HIGH RESOLVED — the deletion form is named: the replaced nonce is deleted, a refused commit deletes its own object, and the sweep is age-guarded with L = 120 s, which outlasts the 60 s continuation life. M5-e adds the write-before-commit and message-delete members. Plan rev 2, M5-c and M5-e.
AF-2 HIGH RESOLVED — option (a) is taken. The nonce is `v`, then microseconds read from `clock_timestamp()` in the upsert's `RETURNING` under the row lock, then 16 hex characters. `v` (0x76) sorts above every hex character under `COLLATE "C"`. The commit is conditional, and X-5's reason is restated. A clock step is RK-9: it gives a stale preview, never a broken one. Plan rev 2, M5-a, X-5 and RK-9.
AF-3 MEDIUM RESOLVED — the key contract is M5-g. It names the deciding variable for the website's deleter and for its reader (`getCDNUrl`, `process.env.NODE_ENV`), and for the generator (`config.ENV`). Production agreement is stated as an inference from working images, and the local walk records both values. Plan rev 2, M5-g and RK-10.
AF-4 HIGH RESOLVED — the guard context is mounted at `message/layout.tsx` with a default of no guard. `MessageProvider` registers into it, `StyledLink` calls it from `onNavigate`, and the guard's dialog is its own `ConfirmationProvider` instance and `ConfirmationDialog` at the layout. The editor's provider stays in place (rev 3, QAF-12; AF-22). The class is enumerated by where each member renders, and the form is his D-20. Plan rev 2 and 3, M4-a, M4-b and M4-d.
AF-5 MEDIUM RESOLVED — the draft gets a new typed `messageDrafts` key, with a per-tab id in `sessionStorage`, the legacy `message` key written in parallel for M3-f, a write matrix, a 20-entry bound with eviction, and a quota path in the shared `set`. M3-g states that the other three keys are preserved. Plan rev 2, M3 "Storage form", "Write matrix", M3-g and M3-h.
AF-6 LOW RESOLVED — the record is `hashMessage(normalizeForHash(payload))` on one ref beside `messageRef`. It is dropped on the mutation's error and never added for a creating save. Plan rev 2, M2 "Record".
AF-7 LOW RESOLVED — the generator gets per-class `preview-image-failure` lines (M6-c), and the cost sentence is put in front of him (M5 "Cost"). The T confirmation is carried in AN-4's bullet. Plan rev 2, M5 and M6-c.

## Findings on revision 2 (delta pass)

Arguments retired at the rev 3 delta read; record `5ee7b89` carries them, and the measurement is `verification/017/architect-delta/`.

AF-16 LOW RESOLVED — folded as a 1 MB serialised bound beside the 20 entries, put to him as OQ-11 (a) against a quota-only (b). Plan rev 3, M3 "Storage form", M3-h and OQ-11.
AF-17 INFO RESOLVED — adopted: age is measured against the committed object's `LastModified` in the same listing, with the argument restated from lock order. Plan rev 3, M5-c form 3 and OQ-13.
AF-18 LOW RESOLVED — the M5 walk and B-6 read the new preview after a reload of the list. Plan rev 3, M5 "Human-observable form".

## Findings on revision 3 (delta read)

AF-22 LOW RESOLVED — both sentences adopted: the guard captures `showConfirmation` from its own instance at the layout, `StyledLink` never calls `useConfirmation`, and M4-b's tests mount the two-level layout with a `/send` member inside `MessageProvider`. The argument is in record `26f648e`. Plan rev 4, M4-a.

## Findings on revision 4 (delta read)

None. Read: the OQ-11 and OQ-12 four-pair table (F-24) and M3-h's reading of it. M5-c form 3's rule that a listing
without the committing save's own object deletes nothing (QAF-13). This architect re-derived the case
`W1 C1 W2 C2 D2 D1`: without the rule, s1's sweep has no reference and could collect n2; with it, s1 deletes nothing.
Where s1's reference is still listed, n2 is newer than it and is spared. The `LastModified` stamping-point argument
holds, with its bucket-clock residue stated. M5-g's falsifier, his B-6 look, is sound: the image shows only if the
writer's and reader's prefixes agree. RK-7's liveness precondition (QAF-14) is also read and sound.

## Findings on revisions 5 and 6 (conformance read)

AF-23 INFO RESOLVED — folded as written: the lifted check is the preferred form, a third inline copy is admitted, and the ref goes inside each instance's panel, with a ref on the outer component or one shared across instances failing M8-b. The argument is in record `635868d`. Plan rev 7, M8 "The form, mirrored".

## Findings on revision 7 (delta read)

None. Read: AF-23's fold (above). M8-a's third listing, `useDocumentEventListener('keydown'`, which takes in the
repository's own wrapper the raw-listener listing cannot see. Its one hit, `EmojiPicker/Root.tsx`, is a non-member.
M8-b's table with focus positions, whose red rows sit with focus in U off its buttons, and M8-c's off-button rows.
These sharpen what the tests discriminate and add no surface. M5-0 limb 3's read rule (request id, timestamp
agreement, request-log exclusivity) and its result: lasts to 55 s on a Preview, record `8f26f37`, so T = 40 s stands.
The Preview-versus-production limit remains as revision 6 stated it, carried in RK-2's text.

## Closing pass (plan revision 8; release trees website `4b8db9c`, generator `8512a1d`)

### Premise re-read

Each premise of the Resumption State (`61fc3ff`) was re-read at the mechanism. The commits it cites
(`406b34a`, `5ee7b89`, `26f648e`, `96b4b62`, `635868d`, `0e380fc`, the plan's `6ade256`, and the deployment records
`d61f445` and `8f26f37`) each resolve as commits in agent-output (`git cat-file -t`). `verification/017/architect-delta/`
holds its two files. `architecture/` was clean at `61fc3ff` before this pass wrote. Both product trees are on
`chain/017-existing-items-backlog`, website at `4b8db9c` (`git log -1`) and the generator at `8512a1d` (`git rev-parse
HEAD`). The plan stands at revision 8 (`5e36106`), and the critic approved it (`56a602a`). All premises hold.

The generator was read only by explicit path: `git diff --stat` and `git diff` limited to `src/`,
`ecosystem.config.js` and the package files, and its `src/` files. No `git log` or `git show` ran in that repository,
and no read was refused.

### Delta conformance (`6ade256..5e36106`)

The plan body changed in five places, each describing code already reviewed and QA-passed:

| Form | Read at | Verdict |
|---|---|---|
| M3 matrix, fetch row: Sn removed when the fetched copy is shown | `MessageProvider/index.tsx` fetch effect, `removeDraft(fetchedMessage.id)` | follows the code; conforms |
| M4-a: `StyledLink` intercepts from `onNavigate`, and from `onClick` for a same-tab plain click to another site | `StyledLink.tsx` `LinkProxy` (`opensInThisTab`, `isOnThisSite`); `NavigationGuardProvider.tsx` `intercept({ external })` | AF-24 |
| M4-d: four member rows added | the M4 document's re-derivation (`c16132b`), covered at M4's gates | describes the code; conforms |
| M6-c: the class set closed at four; setup failures carry no class line | generator `src/generateImage.ts` `PreviewFailureClass`, `src/server.ts` `processImage` | conforms; the observability residue is a registered Problem Area (unstamped error log) |
| X-21, X-22, X-23 | security audit L-001; code review Round 7; QAF-19 | X-21 and X-22 **accepted by him** (rulings block 2026-11-19T08:41Z, `06f7f2f`). X-23 is a stated limit. Each carrier is landed (below). |

AF-24 INFO — M4-a's `onClick` path is a necessary deviation, accepted. `next/link` hands a plain click on another
site's URL to the browser and never calls `onNavigate`, so a single interception point cannot cover the member class
M4-d enumerates. The current form is "`onNavigate` only". The new form changes no name, type or shape that other code
reads: `StyledLink`'s props are unchanged, and `GuardedLink` gains an optional `external`, read only by
`NavigationGuardProvider`'s `intercept` (`git grep -l NavigationGuardProvider` at `4b8db9c`: `StyledLink.tsx`,
`MessageProvider/index.tsx`, `message/layout.tsx`, and tests). The click rule mirrors Next's own, so the two paths
do not overlap. Landed in `website.md` A-8's consequence: a new link component calls `intercept` on both paths.

No form in the delta grows in cost with the record or its history. The sweep's `ListObjects` per accepted save grows
with a message's orphan objects, which are bounded by X-19's causes; that is registered, not measured.

### Carriers landed

- **X-20**: the Problem Areas row "Enter-to-confirm in dialogs rests on an unidentified mechanism" is restated from M8
  at `4b8db9c`. `useDialogEnter` is the one check, the `tagName` compare is gone (`git grep -c tagName` over the three
  files: no hit), and the stopping mechanism for Enter on a focused Cancel is still unread.
- **X-21** (accepted): the row "preview-image-generator's `/generate` trusts its body beyond object-ness" is extended
  by the two log sinks, and its delete-prefix limb is retired (security audit I-1).
- **X-22** (accepted): a new row, "A `/preview` fallback render is stored as the message's preview". The
  "`/preview` input guard" bullet in Components states that the page answers 200.
- **Security I-8** (the record's `INBOX.md` entry from security-hooks-017): landed in the toolchain row and as an
  attributed architect's sentence in `preview-image-generator.md` P-2. His quoted text and grade are untouched.
  **I-1**: landed in Runtime Flow 3, D-006's consequences and A-2. The inbox entry itself is the record owner's to
  clear.
- **Chain `fix-dialog-closes-on-first-portal-load`** (the record's `INBOX.md` entry from steering-roadmap,
  2026-11-18): the static `FloatingPortal` import and the `next/dynamic` lint rule are now in Components, website,
  and the rule's unenforced state is in the ESLint row. The three closed chain-004 documents it names are not edited:
  closed documents are not this architect's to change.

### Problem Areas registered by this pass (could be better; none blocks the release)

Orphan objects outlive a message's last save (X-19, RK-2). The bucket key contract is computed in two repositories
from two variables (M5-g). The generator's error log is unstamped, so failure counts cannot be bounded to a deploy
(observability; Recommendation 6). The X-22 fallback row. The unload prompt's suppression is a timed module flag
(`leaveWithoutAlert`, 2 s). Each names a fix shape for a later chain. None is a defect in what plan 017 promised.

## Findings on revision 10 (delta read; website `42d15de`)

Read for the forms revision 10 writes:
- `shared.ts` `upsertMessage`: `pusher.trigger(genMessageChannelKey(message.id), 'message-update', hashMessage(message))`,
  the one producer.
- `usePusher.ts`: the effect, the one consumer and the one client `new Pusher(…)` under `src` outside tests (`git grep`
  at `42d15de`).
- `src/utils/index.ts` `hashMessage`: it returns `hash.toString(16)` of a 32-bit integer, so a string such as `-1e10`
  or `5e7` is possible.
- The installed `node_modules/pusher` 5.1.3, `lib/events.js` `ensureJSON`: string data is sent unchanged, anything
  else is `JSON.stringify`d.
- The installed `node_modules/pusher-js` 8.3.0, `src/core/connection/protocol/protocol.ts` `decodeMessage`: string data
  is `JSON.parse`d, with the original kept on a parse error.

M2-c's mechanism holds. Today the hex string reaches the client as a number whenever it parses as one. Sent as
`JSON.stringify(hash)`, it parses back to the producer's exact string.

| Form | Pattern it follows | Verdict |
|---|---|---|
| D-33: the producer JSON-encodes the hash; the consumer compares exact strings | No other broadcast exists to follow. The broadcast has one producer and one consumer, both in the website, so no reader outside M2's surfaces sees the new form. | conforms; AF-25, AF-26 |
| M2-d: `pusher.disconnect()` in the cleanup of the effect run that constructed the instance | The existing form, one instance per effect run (`usePusher.ts` since `1ad625e`), completed with the close that pusher-js's lifecycle pairs with construction. No other client instance exists to be closed by mistake. | conforms |

No form here grows in cost with the record or its history. M2-d bounds the one form that did: open sockets per tab
across message switches.

AF-25 LOW (recommended, to the planner) — M2-c's instrument must run pusher-js's real decode over the producer's real
output. The contract now rests on two library behaviours, neither of them this project's: node `pusher`'s
string pass-through and pusher-js's opportunistic `JSON.parse`. A test that mocks the channel and hands the handler a
string skips exactly the step UAT-1 came from, so it would pass over the defect it names and over a future change in
either library. The form asked for: one case in M2-c's register feeds `decodeMessage` (or pusher-js's own
`Protocol`) the frame that `ensureJSON(JSON.stringify(hash))` produces, for a number-shaped hash (`5e7`, `-1e10`) and
for an ordinary one. It asserts that the handler's comparison sees the producer's string. That case is red at
`4b8db9c`'s producer, the bare hash. This is QA Phase 1's instrument to key. It is raised here because it is the
cross-library seam this read exists for. It changes no criterion.

AF-26 INFO — the wire form is safe in both deploy orders. Producer and consumer ship in one Vercel deployment.
- A tab loaded from the old build that receives the new frame gets the producer's exact string, and its string
  compare behaves at least as well as before.
- A tab on the new build that meets an old frame during skew gets a number for a number-shaped hash and a string
  otherwise. The exact compare then fails toward raising the notice (UAT-1's symptom, a spurious prompt), never
  toward suppressing another tab's (CR-20's direction).

No deploy-order constraint is owed. This is recorded for devops's release-order reading.

## Alternative recorded

### AF-8 INFO — a stable-key design would remove the commit protocol, the deletion transfer and OQ-7

Carried in the plan beside M5-0's fallback (rev 2, M5-0), as offered. It rests on two facts no pass has read, the
CDN's query-string cache key and the migration of legacy keys, and it moves D-8's line, which is his call. Not a
revision demand. No further action in this document.

## Answer to the plan's open line

### AF-9 INFO — the cross-repo contract file

The cross-repo-contract skill asks for no file. It governs shared types and pinned dependencies, and website and
generator share neither. The contract is HTTP plus the bucket's keys, and its home is Runtime Flow 3 and
`preview-image-generator.md`. Plan rev 2 cites this in § Release and rollback, with QA's reading of the Shared Types
rule carried by M5-g. **Open item**: the reconciliation of Runtime Flow 3 and a `preview-image-generator.md` entry (what
204 means, who deletes, the key form) from the implemented tree, at this chain's closing pass, no later than devops
Stage 1.

## Forms that conform

| AF | Form the plan writes | Pattern it follows (read at `1ad625e` / `8de2b53`) | Verdict |
|---|---|---|---|
| AF-10 INFO | M1-a: four test files move to the `__tests__/` under the module they import | `agent-output/CLAUDE.md` Placement; X-13's two exceptions argued from `pageExtensions` | follows |
| AF-11 INFO | M1-b: delete `enforceImportMutualExclusivity` and its `describe` block | Recommendation 6's first fix shape; no production caller | follows; closes the Problem Areas row at reconciliation |
| AF-12 INFO | M2: the saving tab's record is added in `persist` | `website.md` A-6 (one persist step) | follows; form named at rev 2 (AF-6) |
| AF-13 INFO | M5: `@vercel/functions` added as a deliberate lockfile step | Recommendation 3; `package.json` carries no `@vercel/functions` at `1ad625e` | follows; a new external dependency, so an ADR is owed at reconciliation |
| AF-14 INFO | M6-a: 204 exactly when the object was stored; an error-status or `null` `goto` answered 500 | today's `processImage` already answers 204 after the put; M6 narrows what counts as a render | follows |
| AF-15 INFO | Release order website first, rollback generator first, each push confirmed deployed | the old generator's delete-before-render keeps today's behaviour in the mixed window; the reverse window leaks, it does not break | follows |
| AF-19 INFO | M4-a's guard hook returns "no guard" outside its provider | a deviation from the throwing-hook formula, necessary because `StyledLink` renders where no editor exists (`website.md` A-8) | necessary deviation; accepted |
| AF-20 INFO | M3's per-tab id in `sessionStorage` | no sibling uses `sessionStorage`; per-tab identity that survives a reload has none | necessary deviation; accepted |
| AF-21 INFO | M3's quota path in the shared `withLocalStorage.set` | the change is made in the shared code because it is wrong for every key (`website.md` A-7) | follows; M3-g pins the other keys' form |

## Pattern statements landed in the per-repo record

Landed at the conformance pass in `website.md`, as agent-designed entries read at `1ad625e`, describing what is before
M3 and M4:

- **A-7**: browser storage. Four typed keys go through one shared helper, and the draft key has one reader.
- **A-8**: the editor's providers sit below the message layout's header and sidebar.

At the closing pass, from the release trees: `website.md` A-7 (the `messageDrafts` store, `set`'s return value, the
bounds under his OQ-11 selection (a)) and A-8 (`NavigationGuardProvider`, both interception paths, his D-20 selection)
are restated, rev 11 of its addendum changelog. `preview-image-generator.md` gains A-2 (the key contract and the
meaning of 204), and A-1 is extended by section [7]'s two lines.

## Verdict

**APPROVED** at plan revision 2 (record `3d678cc`), and it stands at revisions 3 (record `b3d811e`) and 4 (record `a97628d`), with no finding open on revision 4. It stands at revision 6 (record `21e61eb`) and revision 7 (record `6ade256`), with no finding open.
It stands at revision 8 (record `5e36106`), read by the closing pass, with no finding open (AF-24 INFO, accepted),
and at revision 9 (record `bcc23c6`), whose delta is X-24 alone in substance, with no finding. It stands at revision 10
(record `fad6cd4`), with AF-25 LOW recommended and AF-26 INFO.

## Open items — all discharged at the closing pass

1. AF-9: Runtime Flow 3 is restated from the release trees, and the contract is recorded as `preview-image-generator.md` A-2.
2. Problem Areas: the preview-failure and `enforceImportMutualExclusivity` rows are resolved and moved to history. The
   ESLint row is restated from M7-a with its count and instrument. `website.md` A-7 and A-8 are restated. The ADR for
   `@vercel/functions` is D-006.
3. Revision 8, everything folded after revision 7, is read above.
4. X-20's carrier, the Enter-to-confirm row, is restated.
5. The master document's lag on chain `fix-dialog-closes-on-first-portal-load` and plan 016's closure is reconciled
   (Components, agent-output line, Roadmap Readiness).

Condition carried in the `Status-Detail`: this reconciliation is anchored to website `4b8db9c` and generator
`8512a1d`. If UAT or devops moves either release tree, the delta is read once more before release. Steering routes
that read, which is the only party that sees the tree move.

## Open items (reopened 17:53Z; closing no later than devops Stage 1)

6. Read the website delta from `4b8db9c` to M2's final tip once code review and QA pass it (UAT-1's fix round, D-33,
   D-34). Then reconcile from that tree: `system-architecture.md` Runtime Flow 1b (the JSON-encoded broadcast and the
   exact compare; the connection closed per effect), the Dependencies line on Pusher (the wire contract rests on
   node `pusher`'s string pass-through and pusher-js's decode), and `website.md` A-6's consequence, if the
   implemented form moves it. The generator is untouched by this round. Its reconciliation at `8512a1d` stands unless
   that tree moves.
7. AF-25's disposition, whichever form the planner gives it.

## Resumption State

Written 2026-11-19T17:53Z by architect-hooks-017 at the revision 10 delta read.

- **Done.** Closing passes on revisions 8 and 9 (`2a9db38`, `8cebb1c`). The delta read on revision 10 is this write.
- **Next.** The closing pass for items 6 and 7, briefed by steering after M2's round passes code review and QA,
  before devops Stage 1's message. Read the plan as a diff from `fad6cd4`.
- **In flight.** None. **Uncommitted.** Nothing of this session's after this commit.
