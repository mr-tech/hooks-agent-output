---
ID: 018
Origin: 018
UUID: 6273a762
Status: Active
Status-Detail: "Conformance pass on plan revision 1 (record c2a6b85): APPROVED_WITH_CHANGES. AF-1 and AF-2 are required before implementation approval; AF-3 and AF-4 recommended. Open items 1-3 below are this document's to discharge at the closing pass."
---

# Architecture Findings — Plan 018: Next.js 16.4.6 and the save-list cap (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-20T03:39 | Conformance pass, plan rev 1 (record `c2a6b85`), briefed by steering-roadmap-hooks (`steering/018-brief-architect.md`). Rulings read: `steering/018-rulings.md` block 2026-11-20T03:25Z. | Every concrete form the plan writes was read against website `origin/master` `7923a1d` (`git show`; nothing run in the shared tree). The length-first cap was run against the real save schema in a scratch copy (`verification/018/architect-conformance/`). Two changes are required (AF-1, AF-2), two are recommended (AF-3, AF-4), two Problem Areas are registered (AF-5, AF-6), and the forms in "Conforming forms" conform. The master document's direct-`sharp` line is reconciled (the `INBOX.md` entry of `devops-hooks-fix-message-page-header-decode`). **APPROVED_WITH_CHANGES.** |

## Scope and instrument

Read at website `7923a1d`: `src/server/api/utils/shapes.ts` (whole), `src/constants/messageLimits.ts`, `src/constants/index.ts`,
`src/server/api/routers/user.ts` (`updatePreferences`), `src/providers/MessageProvider/usePreferences.ts`,
`src/utils/hooks/useUpdatePreferences.ts`, `src/utils/api.ts` (`RouterInputs`), `src/@types/global.d.ts` (`MessageData`),
`src/middleware.ts`, `package.json`; the readers found by `git grep` named in each finding. zod 3.22.4's `ZodPipeline` and
`ZodEffects` refinement were read in the installed `node_modules/zod/lib/types.js` and `types.d.ts`. Next 16.1.6's middleware
warning was read in the installed `node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js`. Not read: Next 16.4.6's
source, the probe's `eslint.config.mjs` beyond the plan's account of it, Discord's documentation (the plan's helper read).

## Findings

### AF-1 MEDIUM — The length-first list form changes the save schema's input type and breaks its `satisfies` locks (required)

**Form.** M1-d: one shared definition at all 11 sites, the OQ-3 form (`z.array(z.unknown()).max(n).pipe(z.array(element))`).
**Pattern today.** `z.array(element).max(CONST)` inline, at six sites in `shapes.ts` (`actionRowShape`, `sectionShape`,
`mediaGalleryShape`, embed `fields`, `discordMessageBaseShape.embeds` and `.components`) and the import shape. **Deviation:
necessary** — zod 3.22.4's array keeps validating elements after a failed length check, so the current form cannot meet M-001's bar
(`verification/website-deps-review/scoping/refute-zod-max/output.txt`).

**What the deviation changes for readers.** `ZodPipeline<A, B>` declares its input as `A["_input"]` (zod `types.d.ts`), so every
piped list's input type becomes `unknown[]`. Readers of the input form:
- `shapes.ts` `messageShape` and `partialMessageShape` (`satisfies z.ZodType<IncomingMessage>` and its partial). With the
  top-level `components` alone piped, `tsc` refuses both (TS1360; `satisfies-output.txt`, exit 2; base exit 0).
  `optionalIdMessageShape` and `idMessageShape` extend `messageShape`.
- `RouterInputs` (`src/utils/api.ts`), and through it `useApiMethods.ts`'s `upsertMessage` argument type and the five
  `api.message.upsert.useMutation` call sites (`NewMessageModal.tsx`, `message/f/[id]/page.tsx`, `SaveAsMenu.tsx`,
  `message/m/new/page.tsx`, `MessageProvider/index.tsx`). Their list arguments would accept any element type (`types-output.txt`).
- `api.user.updatePreferences` (`useUpdatePreferences.ts`), whose `recentMessageIds` would accept `unknown[]`.

The likely repair under the typecheck gate is to loosen or delete the `satisfies` clauses, which removes the lock the master
document lists under Quality Attributes ("`satisfies z.ZodType<...>` locks Zod schemas to TS types").

**Required change.** M1-d names the shared definition's declared type: the output and input of `z.array(element)`, with the one cast
inside the helper. The helper lives in `shapes.ts` beside `discordIdShape` and is exported for `routers/user.ts`, which already
imports `partialMessageShape` from there. An acceptance line: `pnpm run typecheck` exits 0 with every `satisfies` clause in
`shapes.ts` unchanged from `7923a1d`. Run: such a helper typechecks with the clauses as they are (exit 0) and gives the same issue
lists as the bare pipe (`m1typed.ts`, `refine-output.txt`). Option pair: "accept the deviation with the typed helper"
(recommended) / "follow the current pattern" (not available: it fails M-001's bar).

### AF-2 MEDIUM — M1-a's "exactly one issue for that list" does not hold at the top-level components list (required)

`discordMessageShape` is `discordMessageBaseShape.superRefine(refineDisplayableText)`. zod 3.22.4 runs a refinement when the inner
result is dirty (`ZodEffects`, refinement branch: only `aborted` returns early), and a pipe whose first stage fails `.max()` returns
`DIRTY` with the raw list. So an over-limit `components` list whose text displays sum past 4000 characters gets two issues, both at
path `components`: the length `too_big` (maximum 40) and `refineDisplayableText`'s `too_big` (maximum 4000).
Run (`refine-output.txt`): 41 valid text displays of 100 characters give 2 issues under both forms; 41 text displays of 5000
characters give 43 at base and 2 under the M1 form.

The same mechanism has a second consequence the plan does not state. At `7923a1d`, an over-limit list with an element that fails its
union aborts the object, and the refinement does not run. Under M1 the list is dirty, not aborted, so `sumDisplayableText` walks the
raw, unvalidated elements. It is typed structurally (`website.md` A-4) and takes no harm. Run (`output.txt`): container nesting at
depth 1050, the deepest `superjson.deserialize` admits in the probe, parses without a throw under both forms. Depth 1100 and above
throws in `superjson` before the schema, under either form. That throw is pre-existing and outside M1.

**Required change.** M1-a admits, at `components` (S10, and so through S4 into the top-level total), at most one further issue: the
displayable-text `too_big` at path `components` (maximum `MAX_COMPONENTS_DISPLAYABLE_TEXT`). M1-c's "only the issue count of an
over-limit list moves" is restated as "the refusal set does not move". The issue list may gain the displayable-text issue where an
aborted element suppressed it at base. QA's cases then hold literals for both shapes.

### AF-3 LOW — S11's bound, the server's slice and the client's cut are one quantity in three places (recommended)

`updatePreferences` cuts with a literal (`slice(0, 10)`). M1 adds 11 as the schema bound, and M1-e adds a cut in
`usePreferences.ts`. Recommended: one constant, say `MAX_RECENT_MESSAGE_IDS` (10), in the `~/constants` barrel beside
`MAX_MESSAGES` (a per-user count, not a message bound, so A-4's two homes do not govern it). It is read by the slice, by the bound
as `+ 1`, and by the composer. The `+ 1` is stated in a comment with its reason: the open message's slot. That slot is also what
keeps an already-loaded bundle's list (the open message plus 10 stored) accepted after the release. That reason makes 11 better than
10, and the plan does not state it.

### AF-4 LOW — Bound homes for the new mention-list and `parse` bounds (recommended)

M1-d puts a new bound no validator reads in the barrel's "limits block". The block A-4 names is commented "Components V2 limits".
The mention-id bound (100, S7/S8) is a message-level cap, not a V2 one. It belongs in the barrel beside `MAX_EMBEDS` and
`MAX_EMBED_FIELDS`, not under the V2 comment. S6's bound (3) is "the values its element admits", so derive it from the domain's one
definition: a const tuple read by both the element schema and the bound (its `length`). A later fix of X-13's domain then moves both.
The `MessageData` type carries the same domain a second time (`src/@types/global.d.ts`, `allowed_mentions.parse`). That is recorded
under AF-6's row, not asked of this chain.

### AF-5 INFO — Problem Area registered: the lint stack M3 lands on

The master document's Problem Areas gain "The lint stack rests on an unsupported ESLint major behind a compatibility layer". M3 is
sound for his D-6 and needs no change. The better path is for a later chain: replace the airbnb presets with a maintained
flat-native preset, which lifts the FlatCompat layer and opens ESLint 10. The existing ESLint row's `.eslintrc.json` sentence is
restated at the closing pass, once M3 has landed (open item 1).

### AF-6 INFO — Problem Areas registered: `middleware.ts`'s deprecated convention (X-8) and `allowed_mentions.parse`'s domain (X-13)

- `middleware.ts`: the installed Next 16.1.6 already warns that "The "middleware" file convention is deprecated. Please use
  "proxy" instead" (`setup-dev-bundler.js`, `warnOnce`). So the condition exists in production today. M2-d's captured warning at
  16.4.6 is confirmation, not discovery. Registered now. The H-001 leftover `x-query-params` write (X-7) sits in the same file,
  so the rename and that removal share one natural carrier.
- `allowed_mentions.parse` admits `user`, `here` and `everyone`, in both the save schema and the `MessageData` type. Discord's
  page lists `users`, `roles` and `everyone` (the plan's helper read, not re-read here). The editor writes only `parse: []`
  (`MessageProvider/index.tsx`), so a non-empty value comes only from pasted JSON. A Discord-valid `["users"]` is refused by the
  JSON view's import shape and by Save. This is not a W-2 tension: the front end refuses it as the back end does.

## Conforming forms

- **S4's bound** reads `MAX_TOTAL_COMPONENTS`, as `discordMessageBaseShape.components` does (`shapes.ts`). It conforms.
- **The import shape's top-level list** (M1-d) keeps `z.preprocess(filterSupportedComponents, …)` around the shared form. It
  conforms, and the JSON view then refuses what Save refuses, which is W-2's direction.
- **The new refusals at Save (S4, S6, S7, S8)** were read against W-2. The editor cannot produce those lists, and the JSON view's
  import shape extends the base shape, so it refuses them first. The residue for stored messages (M1-f) is his D-4. They are not
  016 D-10's one-sided description bound, which M1 does not touch (A-4).
- **M2** writes no new form. `next.config.js`, `middleware.ts` and the Pages/App split are unchanged.
- **M3's flat config** at the repository root sits beside `next.config.js`, `postcss.config.js`, `tailwind.config.js` and
  `vitest.config.ts`. Replacing `.eslintrc.json` and `.eslintignore` is the deviation ESLint 9 makes necessary.
- **M4 and M5** add no code.
- **Cost that grows with history:** S11's stored list is the one form whose size grows with use. M1-e bounds what the client sends,
  for any stored length. The live population is unreadable (RK-3), so the plan's extreme of 50 is a test value, not a measurement.

## Records touched in this pass

- `system-architecture.md`: Dependencies (the direct `sharp` dropped; Next's own copy named), Problem Areas (three rows: AF-5, AF-6
  twice), and a changelog row.
- `website.md` A-4: a "List bounds" paragraph stating today's form and its zod 3.22.4 consequence (agent-designed). The M1 form is
  restated at the closing pass, once it exists (open item 2).

## Open items (this document's, discharged no later than devops Stage 1)

1. Restate the ESLint Problem Areas row from the M3 tip (its `.eslintrc.json` sentence and the counts).
2. Restate `website.md` A-4's "List bounds" paragraph from the M1 tip: the helper, its home and the bound homes.
3. Carry M4-c's R3 result (X-14's premise, "Next 16.1.6") into the record, and restate Components' "Next.js 16 hybrid" version
   facts from the release tree.
