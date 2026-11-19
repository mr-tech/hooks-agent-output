---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Delta pass on plan revision 2 (record 3d678cc): APPROVED. AF-1 to AF-7 are resolved in the plan. AF-16 to AF-18 (LOW and INFO) are recommended, not required. Open until the closing pass, no later than devops Stage 1: AF-9's reconciliation of Runtime Flow 3 and preview-image-generator.md, the Problem Areas rows the plan closes, and the ADR for @vercel/functions."
---

# Architecture Findings — Plan 017: the existing-items backlog (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-18T23:31 | Conformance pass, plan rev 1 (record `97e6814`; the file as read also carries `d84b192`'s R-4 rows D-14 to D-16, registration only), briefed by steering-roadmap (`steering/backlog-2026-11-18-briefs/architect-hooks-017.md`) | Every concrete form the plan writes was read against website `origin/master` `1ad625e`, preview-image-generator `origin/prod` `8de2b53` and project-utils `origin/master` (`git show <ref>:<path>`; nothing run in a shared tree). Five changes are required (AF-1 to AF-5), two are recommended (AF-6, AF-7), and one alternative design is recorded (AF-8). The plan's open line on the cross-repo contract file is answered (AF-9). Six forms conform (AF-10 to AF-15). **APPROVED_WITH_CHANGES.** |
| 2026-11-19T00:07 | Delta pass, plan rev 2 (record `3d678cc`), on the planner's word (`planner-hooks-017`). The diff was read from the last text this architect read, `d84b192`, to `3d678cc`, which takes in the planner's `a3c1e83` checkpoint. | Each of AF-1 to AF-7 is answered in the form this pass asked for, or in a stricter one: the order token comes from the database clock under the row lock, and the reader of the key prefix (`getCDNUrl`) is named. Their arguments are retired below to one disposition line each. The new forms were read against the base: the ordered nonce's sort, L against the continuation's life, the guard context, and the draft store's form and matrix. Three items are raised from that read, none required: AF-16 LOW (the draft map is written whole on every edit), AF-17 INFO (a bucket-clock reference that needs no response header) and AF-18 LOW (when the new preview shows after a save). **APPROVED.** |

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
AF-4 HIGH RESOLVED — the guard context is mounted at `message/layout.tsx` with a default of no guard. `MessageProvider` registers into it, `StyledLink` calls it from `onNavigate`, and `ConfirmationProvider` moves up. The class is enumerated by where each member renders, and the form goes to him as OQ-10. Plan rev 2, M4-a, M4-b and M4-d.
AF-5 MEDIUM RESOLVED — the draft gets a new typed `messageDrafts` key, with a per-tab id in `sessionStorage`, the legacy `message` key written in parallel for M3-f, a write matrix, a 20-entry bound with eviction, and a quota path in the shared `set`. M3-g states that the other three keys are preserved. Plan rev 2, M3 "Storage form", "Write matrix", M3-g and M3-h.
AF-6 LOW RESOLVED — the record is `hashMessage(normalizeForHash(payload))` on one ref beside `messageRef`. It is dropped on the mutation's error and never added for a creating save. Plan rev 2, M2 "Record".
AF-7 LOW RESOLVED — the generator gets per-class `preview-image-failure` lines (M6-c), and the cost sentence is put in front of him (M5 "Cost"). The T confirmation is carried in AN-4's bullet. Plan rev 2, M5 and M6-c.

## Findings on revision 2 (delta pass)

### AF-16 LOW — the draft map is written whole on every edit, so each keystroke's cost grows with the store

- **Mechanism** (read at `1ad625e`): `MessageProvider/index.tsx` writes the store in an effect on `[message]`, with no
  debounce. That is once per edit, keystrokes included. Revision 2 keeps that writer (Write matrix, "An edit at route
  0" and "An edit on *n*") and changes what it writes: the whole `messageDrafts` map, read immediately before each
  write (Storage form). Each write then parses and stringifies the whole map. Every other open tab also re-parses the
  map on the `storage` event, because `useLocalStorage` re-reads on every event.
- **Cost at the plan's extreme** (M3-h's 20 entries, sized up to the quota path): this box's measurement
  (`verification/017/architect-delta/m3-draft-map-serialise-cost.txt`, Node v24.14.0) took 17.2 ms to stringify and
  5.1 ms to parse a 7.4 MB map of 20 large entries, and 4.1 ms and 1.3 ms at 1.8 MB. A browser's `setItem` of the same
  string and the other tabs' parses come on top. Near the quota, each keystroke therefore costs more than a 16 ms
  frame. At typical sizes (a valid message is tens of KB) the cost is a few milliseconds and nothing breaks either
  way. The cost is latency, not loss.
- **Option pair**:
  - "follow the current pattern": keep the one typed map, and add a byte bound to M3-h beside the 20-entry bound (for
    example, evict until the serialised map is under 1 MB). A debounced writer also does it, if the effect's
    per-change write is not itself a property anything relies on.
  - "accept the deviation": store one `localStorage` key per entry with a small index. Each write then costs one
    entry, and each `storage` event names one entry. This departs from the fixed-key typed `LocalStorage` pattern
    (`website.md` A-7).
  This architect prefers the first. Recommended, not required: no stated property fails without it.

### AF-17 INFO — M5-c's bucket clock can be read from the listing itself

M5-c form 3 measures age by the listing response's `Date` header against each object's `LastModified`. The S3 client
the website uses (`@aws-sdk/client-s3`, `deleteMessagePreviewImages.ts`) is not known to this architect to expose a
response's `Date` in a command's output; its metadata carries status, request ids and retry counts. Reading the
header would take a middleware. Not checked against the installed version: no install was read this pass. Using the
committed object's own `LastModified`, from the same listing, as the reference gives the same guarantee on the same
clock with no header. An in-flight save's continuation is younger than 60 s, so its object's `LastModified` is no
older than the committed object's minus 60 s. Deleting only objects at least 120 s older than the committed object
therefore never collects one, and the 60 s left over covers `LastModified`'s one-second resolution. Offered to the
implementer through the plan. Either form meets M5-c's property.

### AF-18 LOW — when the new preview shows after a save is not stated

M5-a returns the committed nonce, the previous one or null, in the save's response. That is correct: the image behind
it exists. But no surface learns the new nonce when the continuation commits seconds later. The thumbnails are
`getPreviewImageUrl(msg)` in `src/app/message/page.tsx` and `src/app/message/f/[id]/page.tsx` (`git grep` at
`1ad625e`). They show the new image only once their list is fetched again. When that refetch happens is unread by this
pass. M5's human-observable form says "save again: the new preview shows" without saying when, so a UAT walk that
looks too soon reads stale as failure. Recommended: state in the human-observable form, and in QA's B-4 and B-6, that
the new image appears on the list's next fetch (a reload of the list page), and that it is checked there.

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

**APPROVED** at plan revision 2 (record `3d678cc`). AF-16 to AF-18 are recommended. A revision that folds them is read
by the closing pass, or earlier if steering asks.

## Open items (closing no later than devops Stage 1)

1. AF-9: reconciliation of Runtime Flow 3 and `preview-image-generator.md` from the implemented tree.
2. Reconciliation of the master document's Problem Areas rows the plan closes: the preview-failure row, the dead
   mode-rule function, and the ESLint row restated from M7-a. Also `website.md` A-7 and A-8 restated to the
   implemented M3 and M4, and an ADR for `@vercel/functions`, all at the closing pass.
3. AF-16 to AF-18: whatever the planner does with them, read at the closing pass.
