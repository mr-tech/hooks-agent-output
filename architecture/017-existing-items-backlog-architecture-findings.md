---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Conformance pass on plan revision 1 (record 97e6814, with the R-4 registration rows of d84b192): APPROVED_WITH_CHANGES. AF-1, AF-2 and AF-4 (HIGH) and AF-3 and AF-5 (MEDIUM) need a plan revision before M3, M4 and M5 code; M1, M2, M6 and M7 conform. The delta pass reads the revision that answers them."
---

# Architecture Findings — Plan 017: the existing-items backlog (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-18T23:31 | Conformance pass, plan rev 1 (record `97e6814`; the file as read also carries `d84b192`'s R-4 rows D-14 to D-16, registration only), briefed by steering-roadmap (`steering/backlog-2026-11-18-briefs/architect-hooks-017.md`) | Every concrete form the plan writes was read against website `origin/master` `1ad625e`, preview-image-generator `origin/prod` `8de2b53` and project-utils `origin/master` (`git show <ref>:<path>`; nothing run in a shared tree). Five changes are required (AF-1 to AF-5), two are recommended (AF-6, AF-7), and one alternative design is recorded (AF-8). The plan's open line on the cross-repo contract file is answered (AF-9). Six forms conform (AF-10 to AF-15). **APPROVED_WITH_CHANGES.** |

## Scope and instrument

Read for this pass, each at the ref named: website `src/server/api/utils/shared.ts` (`postMessagePreviewImage`,
`buildMessageValues`, `buildUpsertMessageQuery`, `upsertMessage`), `src/server/api/utils/deleteMessagePreviewImages.ts`,
`src/server/api/routers/message.ts` (`upsert`, `delete`), `src/utils/withLocalStorage.ts`,
`src/utils/hooks/useLocalStorage.ts`, `src/@types/global.d.ts` `LocalStorage`, `src/providers/MessageProvider/usePusher.ts`,
`useApiMethods.ts` `persist`, `src/components/StyledLink.tsx`, `src/app/message/layout.tsx`,
`src/app/message/m/[id]/layout.tsx`, `src/app/_components/Providers.tsx`, `src/providers/ConfirmationProvider.tsx`
(imports), `package.json`; generator `src/generateImage.ts`, `src/server.ts`, `ecosystem.config.js`;
project-utils `prisma/schema.prisma` `model Message`. Reference searches by `git grep` at those refs, quoted where used.
Not read: the critic's and QA Phase 1's documents on this revision (none committed at 23:31Z); Vercel's or the CDN's
runtime behaviour (no probe run); the analysis document's body beyond what the plan quotes.

## Required changes

### AF-1 HIGH — M5-c's prefix sweep deletes a concurrent save's image before that save commits

- **Plan text**: M5-c, "Objects under `previews/<m>/` other than the committed nonce's are deleted only after that
  commit, by the website. After every completed commit, the prefix holds exactly the committed object." M5-b, "the
  object `previews/<m>/<nonce>.jpeg` exists at every moment". M5-e's table varies "which generator answer arrives
  first and each answer's class".
- **Mechanism** (read): the generator answers 204 only after `PutObjectCommand` resolves (`server.ts` `processImage`,
  `generateImage.ts` default export). The website's only bucket helper, `deleteMessagePreviewImages`, lists the
  whole prefix and deletes every key it returns.
- **Failure**: saves *s1* then *s2* of *m*. The generator writes *s2*'s object and answers 204; before *s2*'s
  continuation commits, *s1*'s 204 is processed. *s1* commits (no later save has committed yet, so M5-a allows it)
  and sweeps the prefix, deleting *s2*'s object. *s2* then commits, being later-upserted, and the row names an object
  that no longer exists: the broken image this chain exists to remove. M5-b and M5-c cannot both hold under the
  plan's own M5-e population, because M5-e's axis is answer *arrival* at the website, not object *write* at the bucket.
- **Second member, same class**: a message deleted (`message.ts` `delete`: row delete, then
  `deleteMessagePreviewImages`) while a continuation is pending. The generator writes afterwards; the commit
  updates no row; nothing removes the object.
- **Required**: name the deletion form and restate M5-c to a property it can meet. One form that meets M5-b:
  (i) a commit deletes only the nonce it replaced (read in the same statement as the conditional update);
  (ii) a continuation whose commit is refused (a later save has committed, or the row is gone) deletes its own
  object; (iii) any sweep of the prefix spares objects whose `LastModified` is younger than the longest a
  continuation can live (the 60 s platform limit plus margin), so an in-flight save's object is never collected.
  M5-c then reads: after every completed commit the prefix holds the committed object plus only objects younger
  than that bound. Add the write-before-commit interleaving and the delete-during-continuation member to M5-e's table.
- **Option pair**: "follow the current pattern" (the whole-prefix sweep) fails M5-b and is not offered;
  "accept the deviation" (targeted delete plus an age-guarded sweep) is the necessary one.

### AF-2 HIGH — M5-a's commit rule needs an order token the plan does not name, and X-5 says none is needed

- **Plan text**: M5-a, the nonce moves to *s*'s "exactly when the generator answered 204 to *s* and no save of *m*
  upserted after *s* has committed its own"; M5-e, "the committed nonce is that of the latest-upserted save whose 204
  was processed"; X-5, "project-utils schema change — No design needs one".
- **Mechanism** (read): `model Message` carries `previewImageNonce String?` and `updatedAt`; nothing records which
  save's image is committed. `updatedAt` is overwritten by every upsert (`buildUpsertMessageQuery` `doUpdateSet`),
  so it cannot order a later commit against the committed one. The nonce is minted as
  `genUuid().replace(/-/g, '')`: 32 random hex characters, unordered.
- **Why the obvious form fails**: compare-and-swap on the nonce each save saw at its upsert gives
  *first success wins*. With *s1*'s 204 first, *s2*'s later 204 is refused, and the preview shows *s1*'s content
  beside *s2*'s saved data until the next save, which breaks M5-e's stated outcome.
- **Required**: the plan names the order token and the conditional update. Two candidates:
  - (a) **an ordered nonce, no schema change.** The nonce gets a prefix that sorts above every hex character, then
    a fixed-width order component, then random characters (for example `v` + zero-padded milliseconds + 16 hex).
    The commit is `UPDATE … SET previewImageNonce = :s WHERE id = :m AND (previewImageNonce IS NULL OR
    previewImageNonce COLLATE "C" < :s)`. Every existing random-hex nonce then sorts below every new one, and
    `COLLATE "C"` keeps the order independent of the database's collation. Readers of the nonce's form (`git grep
    previewImageNonce` at `1ad625e`, production files): `getPreviewImageUrl` (`src/utils/index.ts`, interpolates it
    into a path), the `PartialApiMessage`/`ApiMessage` shapes in `shared.ts` and `global.d.ts` (`null | string`),
    `guild.ts` and the `shared.ts` selects (pass it through), and the generator's key build (interpolates it). None
    parses it, so all of them accept the new form unchanged. Residue to state: if the order component is
    minted on the function's clock, two saves on different instances within the clock skew can commit in the
    wrong order. Minting it from the database's clock in the upsert's own statement removes that.
  - (b) **a column recording the committed save's order**: a project-utils schema change. That reverses X-5 and is
    a scope delta for him.
  This architect recommends (a). Either way, X-5's reason ("No design needs one") is restated to what the design
  actually relies on.

### AF-3 MEDIUM — the bucket key's `dev/` prefix is decided in two repositories by two variables

- **Mechanism** (read): the website's helper prefixes `dev/` when `env.NODE_ENV === 'development'`
  (`deleteMessagePreviewImages.ts`); the generator prefixes it when `config.ENV === 'development'`
  (`generateImage.ts`). Today the website deletes only at message deletion. Under M5 it deletes, on every save,
  objects the generator wrote, so the two rules must agree on every environment where both run. They are read
  from different variables, and where they disagree the website's delete misses every object (a leak, silent).
  The local walk M5 names (website dev server, local generator) is the first place they can disagree.
- **Required**: M5 names the key form as part of the cross-repo contract: the full key `[dev/]previews/<id>/<nonce>.jpeg`,
  and which variable on each side decides the prefix, with the environments where they must agree. M5-b and M5-c
  tests use literal keys. The local walk records both variables' values (names and values of these two non-secret
  keys only).

### AF-4 HIGH — M4's guard cannot live in `StyledLink`: the header and sidebar render above the editor's providers

- **Plan text**: M4-a, "the shared `StyledLink` wrapper carries the guard once, so every link that uses it inherits
  it. The confirmation is the site's `ConfirmationProvider` dialog … Where a link renders outside that provider, the
  deviation and its reason are stated in the implementation document." Human-observable form: "click 'Messages' in
  the header".
- **Mechanism** (read): `src/app/message/layout.tsx` renders `Providers`, `Redirects` and `_layout/Navigation`
  (which renders `Header` and `Sidebar`) around `{children}`. `MessageProvider` and `ConfirmationProvider` are mounted
  one level down, in `src/app/message/m/[id]/layout.tsx`. So every `StyledLink` in `Header.tsx` and `Sidebar.tsx`,
  which are the links M4-a names and the one the human-observable form clicks, renders outside both providers.
  The provider formula throws in the consumer hook outside its provider (system-architecture.md, Provider
  architecture), so `StyledLink` cannot read `hasChanged` from `useMessage`. `StyledLink` is also imported outside
  `/message` entirely (`git grep -l StyledLink` at `1ad625e`: `CookieConsent`, `LandingCTA`, `_layout/Footer`,
  `Dropdown`, `InfoPanel`, besides the `/message` files).
- **Consequence**: what the plan leaves to the implementation document as a possible exception is in fact the case
  for the links the milestone is about. It is an architectural decision, and the plan has to make it.
- **Required**: the plan names the form. The form this architect recommends: a small navigation-guard context mounted
  at `src/app/message/layout.tsx` (inside `Providers`), whose default outside any provider is "no guard". The editor
  registers its guard into it from `MessageProvider`, which owns `hasChanged` and spans both `/edit` and `/send`
  (M4-a's routes). `StyledLink`, which wraps `next/link`, calls the guard from `onNavigate`. The confirmation dialog
  is reachable at that level: `ConfirmationProvider` imports nothing from the message layer (its import block at
  `1ad625e` is React only), so it can move up to `message/layout.tsx`, or the guard context can render the dialog
  itself. The readers of `StyledLink`'s props are unchanged, because the guard adds no prop. Restate M4-a's last
  sentence to the chosen form.

### AF-5 MEDIUM — M3 writes no storage form, and the shared helper it says to change serves three other keys

- **Plan text**: M3, "A change to how the draft is stored is made once in that shared code, never in one caller",
  with properties M3-a to M3-f and no key, shape or tab identity named.
- **Mechanism** (read): `withLocalStorage` / `useLocalStorage` serve four keys typed by `LocalStorage` in
  `global.d.ts`: `theme`, `frequentlyUsedEmojis`, `message` and `client_preferences`. `useLocalStorage` re-reads its
  key on every `storage` event, so another tab's write replaces this tab's value. That is S5's loss mechanism for
  `message`, and it is also the cross-tab sync `theme` and `client_preferences` rely on. The only reader of the
  `message` key is `MessageProvider` through `useLocalMessageStore` (`git grep` at `1ad625e`).
- **Consequence**: "change the shared code" read literally changes theme and preferences sync too. The properties
  also force a design (per-tab identity for M3-c's first two rows, a most-recent pointer for its third, a per-message
  entry for M3-b, a dual write of the legacy `message` key for M3-f) that the critic and QA cannot check without a
  named form.
- **Cost that grows with the record**: per-message entries grow with the messages a browser has opened, up to
  `MAX_MESSAGES` (1000, `src/constants/index.ts`) per user or guild, while `localStorage` holds about 5 MB per origin
  and `withLocalStorage.set` does not catch `setItem`'s quota error. A design that keeps one entry per opened message
  can make every later `set` throw in the editor. Not measured on a live browser: no browser instrument was run.
- **Required**: name the form: the key family, where tab identity lives (for example `sessionStorage`), the
  most-recent rule, the legacy-key dual write, an eviction bound (for example, keep an entry only while it differs
  from the saved copy, or cap it at the last N), and how the quota error is handled. State which part is a new,
  typed member of `LocalStorage` and which is shared helper code, so `theme`'s cross-tab sync is visibly unchanged.

## Recommended changes

### AF-6 LOW — M2: name the record's form, and drop a record when its save fails

- The record `persist` adds should be the hash `hashMessage(normalizeForHash(payload))`, computed by the same function
  the compare uses. Runtime Flow 1b's invariant is that producer and consumer hash the same form, and a record kept
  in any other form can drift from it.
- A save whose mutation errors gets no broadcast, so its record stands for good and suppresses a later remote save of
  exactly that content (an RK-3 member the plan names only for a lost broadcast). Remove the record on the mutation's
  error.
- Wiring follows the existing pattern: one ref created in `MessageProvider` and passed to both `useApiMethods` and
  `usePusher`, the way `messageRef` is now. `persist` stays the single place a record is added (`website.md` A-6).

### AF-7 LOW — observability and cost of the continuation

- **Normal telemetry**: M5-f's line is always-on and content-free, which is correct. On the generator, M6-c says only
  "A new failure line, if any". Its failures today reach the log as `console.error(err)` stacks, which is what RK-7's
  falsifier counts. Recommended: one always-on, content-free generator line per failure that names its class (goto
  rejected, error status, screenshot, put). That makes RK-7 and the website's line comparable across the two logs.
  No debug telemetry is needed.
- **Cost**: each save now holds a function instance for the generator's round trip (AN-4 median 2197 ms, bound
  T = 40 s), on a project without Fluid compute (D-10), where today it holds none. Recommended: one sentence in
  M5 stating this cost. His valuation that costs are immaterial (`preview-image-generator.md` P-1) is conditional
  on the facts holding, so the cost is his to see, not the plan's to assume.
- **Confirmation for T**: AN-4's `<N>` is measured from the request's body end (`processImage`, `start` taken before
  `generateImage`), so it includes the wait for a pooled browser under production load. T therefore already covers
  the queueing seen to date.

## Alternative recorded

### AF-8 INFO — a stable-key design would remove the commit protocol, the deletion transfer and OQ-7

- **Shape**: the generator writes `previews/<m>/latest.jpeg` (one key per message) only on success. The website keeps
  rotating the nonce on every save but emits it as a cache-busting query (`…/latest.jpeg?n=<nonce>`). A failed or
  absent render leaves the last good object at the key, so the image is stale, not broken, by construction (D-2).
  Keep-only-latest holds with no deletion at all (D-3), concurrent saves are ordered in the one generator process
  (`ecosystem.config.js` runs fork mode, with cluster mode commented out), and the save path takes on no
  post-response work, no new dependency and no deploy-order hazard.
- **Why not required**: it rests on two facts this pass did not read. (1) That the CDN (Spaces CDN behind Cloudflare,
  Runtime Flow 4) keys its cache on the query string; if it does not, an overwrite needs a purge. (2) Migration of
  rows whose nonce names a legacy key. It also moves D-8's line from Vercel to the generator host, which is a
  deviation from D-8's words and so his call. The plan's design, with AF-1 to AF-3, meets every stated property.
- **Disposition**: offered to the planner as the candidate to put beside M5-0's fallback if the `waitUntil` probe
  fails (D-15's stop condition already routes that case to him). It is not a revision demand.

## Answer to the plan's open line

### AF-9 INFO — the cross-repo contract file

The plan, § Release and rollback, asks whether "the cross-repo contract file the cross-repo-contract skill asks for"
applies. The skill (`~/.claude/agent-skills/cross-repo-contract/SKILL.md`) asks for no file. It governs shared
types, imported from their source, and pinned dependencies, proved against the pin. Website and generator share
neither: the generator has no project-utils dependency and imports nothing from the website (system-architecture.md,
Dependencies). Their contract is HTTP plus the bucket's keys. Its home is this record: Runtime Flow 3 and
`preview-image-generator.md`. The changes M5 and M6 make to it (what 204 means, who deletes, the key form of AF-3)
are reconciled into Runtime Flow 3 and a `preview-image-generator.md` entry from the implemented tree at this
chain's closing pass, no later than devops Stage 1. That reconciliation is owed and is an open item of this document.

## Forms that conform

| AF | Form the plan writes | Pattern it follows (read at `1ad625e` / `8de2b53`) | Verdict |
|---|---|---|---|
| AF-10 INFO | M1-a: four test files move to the `__tests__/` under the module they import | `agent-output/CLAUDE.md` Placement; X-13's two exceptions argued from `pageExtensions` | follows |
| AF-11 INFO | M1-b: delete `enforceImportMutualExclusivity` and its `describe` block | Recommendation 6's first fix shape; no production caller | follows; closes the Problem Areas row at reconciliation |
| AF-12 INFO | M2: the saving tab's record is added in `persist` | `website.md` A-6 (one persist step) | follows (AF-6 refines the form) |
| AF-13 INFO | M5: `@vercel/functions` added as a deliberate lockfile step | Recommendation 3; `package.json` carries no `@vercel/functions` at `1ad625e` | follows; a new external dependency, so an ADR is owed at reconciliation |
| AF-14 INFO | M6-a: 204 exactly when the object was stored; error-status `goto` answered 500 | today's `processImage` already answers 204 after the put; M6 narrows what counts as a render | follows |
| AF-15 INFO | Release order website first, rollback generator first | the old generator's delete-before-render keeps today's behaviour in the mixed window; the reverse window leaks, it does not break | follows |

## Pattern statements landed in the per-repo record

Landed this pass in `website.md` as agent-designed entries, read at `1ad625e` (they describe what is, before M3 and M4):

- **A-7**: browser storage. Four typed keys go through one shared helper, and the draft key has one reader.
- **A-8**: the editor's providers sit below the message layout's header and sidebar.

None for the generator: the key-prefix contract (AF-3) is landed from the implemented tree at reconciliation.

## Verdict

**APPROVED_WITH_CHANGES.** M1, M2, M6 and M7 may proceed as written. M3, M4 and M5 need a revision that answers AF-1
to AF-5. This architect reads that revision's delta.

## Open items (closing no later than devops Stage 1)

1. AF-1 to AF-5: answered by a plan revision; re-read by this architect's delta pass.
2. AF-9: reconciliation of Runtime Flow 3 and `preview-image-generator.md` from the implemented tree.
3. Reconciliation of the master document's Problem Areas rows the plan closes (preview-failure, dead mode-rule
   function, ESLint restated from M7-a) and an ADR for `@vercel/functions`, at the closing pass.
