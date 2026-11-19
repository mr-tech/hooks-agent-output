---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Delta read on plan revision 7 (record 6ade256): APPROVED stands, with no finding open; AF-23 is folded. Open until the closing pass, no later than devops Stage 1: AF-9's reconciliation of Runtime Flow 3 and preview-image-generator.md, the Problem Areas rows the plan closes, and the ADR for @vercel/functions."
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

None this delta pass. Revision 2's forms are planned, not implemented, and they are landed from the implemented tree at
reconciliation (A-7 and A-8 restated, the key contract added to `preview-image-generator.md`).

## Verdict

**APPROVED** at plan revision 2 (record `3d678cc`), and it stands at revisions 3 (record `b3d811e`) and 4 (record `a97628d`), with no finding open on revision 4. It stands at revision 6 (record `21e61eb`) and revision 7 (record `6ade256`), with no finding open.
Anything folded after this read is read once by the closing pass, which steering starts no later than devops Stage 1.

## Open items (closing no later than devops Stage 1)

1. AF-9: reconciliation of Runtime Flow 3 and `preview-image-generator.md` from the implemented tree.
2. Reconciliation of the master document's Problem Areas rows the plan closes: the preview-failure row, the dead
   mode-rule function, and the ESLint row restated from M7-a. Also `website.md` A-7 and A-8 restated to the
   implemented M3 and M4, and an ADR for `@vercel/functions`, all at the closing pass.
3. Anything folded after revision 7, read once at the closing pass.
4. X-20's carrier: restate the Problem Areas row "Enter-to-confirm in dialogs rests on an unidentified mechanism" from
   the implemented M4 and M8. The dead compare is gone at all three sites, and the stopping mechanism is still
   unidentified.
