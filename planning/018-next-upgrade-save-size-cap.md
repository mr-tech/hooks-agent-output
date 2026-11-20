---
ID: 018
Origin: 018
UUID: 6273a762
Status: Active
Status-Detail: "Revision 1, ready for critique (first pass at xhigh), architect conformance and QA Phase 1. No open question."
Revision: 1
Plan-ID: 018
Target-Release: "website master (Vercel production), moved from 7923a1d to the chain's verified tip by devops on the owner's word"
Epic-Alignment: "None recorded: agent-output/roadmap/ holds no roadmap (ls, 2026-11-20T03:1xZ). The chain serves the owner's routing of security findings H-002 and M-001 (steering/website-deps-review-rulings.md, block 2026-11-20T01:59Z)."
Lane: "planned (not proposed small): the framework moves under every page"
---

# Plan 018 — Next.js 16.4.6 and the save-list cap (H-002, M-001)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-20T03:20 | 0 | planner-hooks-website-deps-upgrade | Plan written on the owner's word (rulings blocks 01:59Z, 02:53Z, 03:08Z; ID minted at agent-output `2b7b2de`). Hazard 4 settled by a run: ESLint 8.57.1 cannot load `eslint-config-next` 16.4.6, so OQ-1 goes to the owner. Scope delta: none against block 02:53Z; OQ-1 asks whether the lint package is held at 15.5.14 (a narrowing) or an ESLint 9 milestone is added (a widening). |
| 2026-11-20T03:31 | 1 | planner-hooks-018 | Folds his two answers of `steering/018-rulings.md` block 2026-11-20T03:25Z (`42dc4b2`): OQ-1 resolved as D-6, the Exclusions accepted as D-7; feasibility of the lint move run (`verification/018/planning/eslint9-flat-probe/`). Scope delta: M3 added (ESLint 9, a flat config, `typescript-eslint` 8, `eslint-config-next` 16.4.6; under D-6 also `eslint-plugin-react` 7.37.5, `eslint-plugin-import` 2.32.0, `@eslint/js` 10 → 9 to match ESLint 9, and removal of the unreferenced `eslint-plugin-n` and `eslint-plugin-promise`); old M3 and M4 renumbered M4 and M5; M2 no longer carries the lint packages. The plan is now five milestones against the four the determination implied, the fifth being the lint move his OQ-1 answer admits. |

## Header

- **Plan ID** 018. **Revision** 1. **Status** Active.
- **Target Release:** website `master`, which Vercel deploys to production (`link.productionBranch: master`,
  `verification/018/planning/vercel-project-preview-fields.md`). The package has no `version` field (`package.json` at
  `7923a1d`), so the release is the serving ref moving, named by its SHA. No version or CHANGELOG milestone.
- **Serving refs read at planning** (website; `git ls-remote origin`, 03:1xZ): `master` `7923a1d9…` serves production. `backup`,
  `external-message-api`, `redesign`, `regex-refactor` exist; any non-`master` branch push deploys a Vercel preview, not
  production (same file; inference from the project record, consistent with 017's two READY previews). `.github/workflows`: absent
  (`release-move.js website master 7923a1d… --dry-run`: "workflows none … DRY RUN: every check passed"). `--report`: "one serving
  ref at origin (master); no pair". project-utils is read only and ships nothing in this chain. Every remote push — the preview
  push of the chain branch and the release push — is devops's act.
- **Repositories:** `website` (the change); `project-utils` (read only, `origin/master` `749606d`); `agent-output` (the record).
  One repository is changed, so the launch directory is `/usr/local/bin/hooks/website` for every stage.
- **Architectural surface:** none new. No layer, no cross-repo contract, no rewritten core path. Read for this:
  `architecture/website.md` W-2, A-1, A-4 (the save schema and its bounds) and `architecture/system-architecture.md:110` (the
  Next.js 16 hybrid). Lines the chain touches: A-4 ("Bounds have two homes") gains the new list bounds and must name their home;
  `system-architecture.md:179` (the removed direct `sharp`) is already routed to this chain's architect by `INBOX.md`. The
  architect's conformance pass is in the stage set (block 02:53Z).
- **Base:** website `origin/master` `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`. The chain branch is cut by steering at
  implementation start.

## Value Statement and Business Objective

As the operator of hooks.gg, I want the site on a Next.js release that carries no advisory the dependency review found reached,
and I want a signed-in save that sends an oversized list to be refused with one error for that list, so that neither a crafted
App Router request nor a single save can make the server spend seconds of CPU and hundreds of megabytes building an error.

The originating report's statements, verbatim (`security/website-deps-review-security-audit.md`):
- H-002: "Next.js 16.1.6 carries two App Router denial-of-service advisories with no precondition the site lacks".
- M-001: "A signed-in user's 1 MB save request makes the server build a validation error of more than 100 MB".

## Decisions Register

| ID | Decision | Date | His words, verbatim, and route | Reopened by |
|---|---|---|---|---|
| D-1 | The Next.js upgrade and the save-size cap are one chain, opened after H-001 ships | 2026-11-20 | "Agent: separate chain after H-001 (Recommended)" — selection-prompt answer, ledger `steering/selection-ledger/2026-11-20.md`, heading "2026-11-20T01:59Z — steering-roadmap-hooks"; option wording steering's | Owner withdrawal only |
| D-2 | Target Next.js 16.4.6, with its lint and analyzer packages | 2026-11-20 | "Agent: 16.4.6 (Recommended)" — selection-prompt answer, same ledger, heading "2026-11-20T03:08Z — steering-roadmap-hooks". The option text he saw: "Agent moves Next.js and its lint/analyzer packages to the latest 16.4 release." (steering's wording) | Owner withdrawal only; the lint package's route is D-6 |
| D-3 | The chain branch is pushed for a Vercel preview, and UAT loads the public pages, images and the sign-in redirect there before the release push | 2026-11-20 | "Agent: preview first (Recommended)" — same ledger and heading. Option text: "Agent pushes the chain branch (preview only, production untouched). UAT loads the public pages, images and the sign-in redirect on the preview. Signed-in pages can't run there." (steering's wording) | A read showing a branch push reaches production, or preview protection blocking an anonymous load |
| D-4 | Scope as determined in block 02:53Z, its exclusions out | 2026-11-20 | "Agent: as determined (Recommended)" — same ledger and heading. Option text: "Agent opens a planned chain on exactly that scope. Release is a website master push, which needs your word." The question text named "a cap on all 11 lists in the two save requests". (steering's wording) | Owner withdrawal only |
| D-5 | The release is a website `master` push, which needs his word; devops asks for it in its own session | 2026-11-20 | Carried in D-4's option text above; steering's common brief, "End step" | Owner withdrawal only |
| D-6 | `eslint-config-next` goes to 16.4.6 with what it needs (ESLint 9, a flat config, `typescript-eslint` 8), and the chain may upgrade any package it judges useful, each recorded as a scope delta with its reason | 2026-11-20 | "you can upgrade any packages to anything deemed useful" — typed in answer to the selection prompt on OQ-1, ledger `steering/selection-ledger/2026-11-20.md`, heading "2026-11-20T03:25Z — steering-roadmap-hooks"; relayed by steering, `steering/018-rulings.md` block 2026-11-20T03:25Z, which records the reading that this is the "ESLint 9 milestone" limb (steering's reading) | Owner withdrawal only. Does not reopen X-1 (zod 4): D-7 |
| D-7 | Exclusions X-1 to X-15 of revision 0 stand, each with its carrier | 2026-11-20 | "Agent: accept as written (Recommended)" — selection-prompt answer, same ledger heading; option text "Agent leaves all of them out; each keeps its stated limit or handoff record, and the plan proceeds to critique." (steering's wording) | Owner withdrawal only |

Agent-authored decisions (Standing Default "a design or mechanism choice inside the agreed scope is the stage's"; recorded, not
his words): AD-1 the cap mechanism (M1); AD-2 the bound values at the five sites that have none (M1, table); AD-3 no lower body
limit on the tRPC route (Exclusions X-9).

## Objective

1. Website resolves `next` 16.4.6 and serves it in production.
2. Every server-reachable save list refuses an over-limit length before validating any element.
3. The lint setup runs on ESLint 9 with `eslint-config-next` 16.4.6, carrying today's rules.
4. Behaviour the record ties to Next 16.1.6 is re-verified at 16.4.6, and the upgraded site is seen on a Vercel preview before release.

## Assumptions and open questions

OPEN QUESTION [RESOLVED]: OQ-1, the lint package — `eslint-config-next` 16.4.6 needs ESLint 9 and a flat config (ESLint 8.57.1
cannot load it: `verification/018/planning/eslint8-config-next16-probe-rerun.md`, confirmed by steering's refutation,
`verification/018/steering/refute-lint/`); resolved by D-6 as milestone M3.

OPEN QUESTION [CLOSED]: OQ-2, are the two Next.js internals the test helpers import moved by 16.4.6? No. At 16.4.6
`dist/shared/lib/router-context.shared-runtime.js` and `dist/api/app-dynamic.js` are byte-identical to 16.1.6 (`npm pack`, `cmp`;
`verification/018/planning/next-internals-16.1.6-vs-16.4.6.md`). M2 still runs both helpers' files.

OPEN QUESTION [CLOSED]: OQ-3, can zod 3.22.4 refuse an over-limit list before its elements run? Yes: a list parsed first as a list of
unknowns with the limit, then piped to the element schema, gives one `too_big` issue for 60 invalid elements over a limit of 10,
where today's `.max()` gives 61; within the limit both give one issue per invalid element
(`verification/018/planning/zod-length-first/output.txt`, run against website's installed zod 3.22.4). The issue's `code`,
`maximum` and `path` equal today's first issue, so the client's per-issue formatting (A-1) renders it as it renders today's first issue.

OPEN QUESTION [CLOSED]: OQ-4, is a preview behind a Vercel login? No field says so: the project record carries no
`ssoProtection` or `passwordProtection` (`verification/018/planning/vercel-project-preview-fields.md`; inference — the first preview
load in M5 settles it).

Assumptions (each with its read):
- Node: Vercel builds with `24.x` (project record); local v24.14.0; `next` 16.4.6 requires `>=20.9.0` (`npm view`). React stays
  19.2.4: `next` 16.4.6 peers `^18.2.0 || … || ^19.0.0`.
- The release notes from 16.1.7 to 16.4.6 were read by a helper (`verification/018/planning/next-16.4.6-release-notes.md`, 30
  tags; not re-derived by the planner): no change to the Pages Router body limit; `middleware.ts` still honoured with a
  deprecation warning; a history-push fix and a scroll handler made default in 16.3.0 (both bear on M4); route-handler response
  compression in 16.4.6 (the site has no `src/app/**/route.ts`; sweep §1).
- Design scope a design predating the plan makes: none. Block 02:53Z states the unit (a request to either save procedure), the
  reach (11 sites) and the layer (the save schema or the body limit).

## Plan

### M1 — Every server-reachable save list refuses an over-limit length before validating its elements (M-001)

**Class (enumerated, finite):** the 11 server-reachable array sites of `sweep-unbounded-input.md` §2 at `7923a1d`, reached through
`message.upsert` (`optionalIdMessageShape`) and `user.updatePreferences` (its inline input and `partialMessageShape`):

| # | Site (path:symbol at 7923a1d) | Bound today | Bound after M1 | Source of the bound |
|---|---|---|---|---|
| S1 | `shapes.ts` `actionRowShape.components` | 5 | 5 | `MAX_ACTION_ROW_BUTTONS`, today's bound kept (D-4) |
| S2 | `shapes.ts` `sectionShape.components` | 3 | 3 | `MAX_SECTION_TEXT_COMPONENTS`, today's bound kept (D-4) |
| S3 | `shapes.ts` `mediaGalleryShape.items` | 10 | 10 | `MAX_MEDIA_GALLERY_ITEMS`, today's bound kept (D-4) |
| S4 | `shapes.ts` `containerShape.components` | none | 40 | `MAX_TOTAL_COMPONENTS`, as `discordMessageBaseShape.components` uses it (AD-2) |
| S5 | `shapes.ts` embed `fields` | 25 | 25 | `MAX_EMBED_FIELDS`, today's bound kept (D-4) |
| S6 | `shapes.ts` `allowed_mentions.parse` | none | 3 | the three values its element admits (AD-2) |
| S7 | `shapes.ts` `allowed_mentions.users` | none | 100 | Discord: "Array of user ids to mention, max 100" (docs.discord.com/developers/resources/message, read by a helper 03:1xZ) (AD-2) |
| S8 | `shapes.ts` `allowed_mentions.roles` | none | 100 | Discord: "Array of role ids to mention, max 100" (same read) (AD-2) |
| S9 | `shapes.ts` `discordMessageBaseShape.embeds` | 10 | 10 | `MAX_EMBEDS`, today's bound kept (D-4) |
| S10 | `shapes.ts` `discordMessageBaseShape.components` | 40 | 40 | `MAX_TOTAL_COMPONENTS`, today's bound kept (D-4) |
| S11 | `routers/user.ts` `updatePreferences` input `recentMessageIds` | none | 11 | 10 stored (the server's own `slice(0, 10)`) plus the open message (AD-2) |

**Acceptance criteria (properties):**
- **M1-a.** For each site S1–S11 and each list length above its bound, whatever the elements (valid, invalid, or of the wrong type),
  parsing the procedure's input records exactly one issue for that list — `code` `too_big`, `maximum` the bound, `path` the list's
  path — and no issue whose path lies inside that list. Instrument: the procedure's input schema parsed directly, and one call per
  procedure through the tRPC caller; QA owns the cases.
- **M1-b.** For each site and each length at or below its bound, the issues are exactly those today's schema records for the same
  input (the refusal set and the per-element issues inside the bound do not move). Instrument: the same inputs parsed by the
  `7923a1d` schema and the M1 schema, compared issue for issue. No expected issue list may be computed from, or supplied as, the
  M1 schema's own output (expectations independence).
- **M1-c.** At the six sites bounded today (S1, S2, S3, S5, S9, S10), the set of inputs refused equals the set refused at `7923a1d`; only the issue count of
  an over-limit list moves (today one issue for the length plus one per invalid element; after M1, one). At the five new bounds (S4, S6, S7, S8, S11) the inputs newly
  refused are exactly those with a list longer than the bound.
- **M1-d.** The bound is checked by one shared definition used at all 11 sites (mirror: one form, as the existing `.max()` calls
  share zod's own). Bounds the editor and schema both read stay in their A-4 homes; a new bound no validator reads sits in the
  `~/constants` barrel's limits block (A-4, "Bounds have two homes"). The import schema's top-level list
  (`discordMessageImportShape.components`, client-only, outside the class) takes the same form, so the two top-level lists share
  one definition; its refusal set does not move.
- **M1-e (declined work has a fate).** S11: for every stored recent list, of any length including above 11, the list the client
  composes and sends is within the bound, so a user whose stored list predates the server's slice (`6ab43b1`, 2023-09-02; the
  list was unbounded from `4fe53b6`, 2023-08-22) is not refused on every load. Instrument: the client composer
  (`src/providers/MessageProvider/usePreferences.ts`) driven with stored lists of length 0, 10, 11 and 50, and the server bound
  applied to what it sends; the 50 case is red at the decision-only tree (bound added, composer as at `7923a1d`).
- **M1-f (declined work has a fate, S4/S6/S7/S8).** A stored message whose list exceeds a new bound cannot be saved again until the
  list is shortened, and the editor says so with the bound's issue at the list's path (A-1 formatting). Where it goes: the user
  edits the list in the JSON view and saves; nothing is deleted or rewritten. The group most exposed: messages built by pasted JSON
  (the editor cannot add mention ids or a 41st component itself). Discord refuses users or roles above 100 and a message above 40
  total components at send, so such a message could not be sent today either; S6's residue (a pasted `parse` with four or more
  entries, necessarily repeating a value, which Discord's page neither admits nor refuses) is stated, not gated.
- **M1-g (human-observable form).** In the editor's JSON view, signed in, pasting a message whose `allowed_mentions.users` holds 150
  invalid ids and pressing Save shows one error line (the 100 bound) where the base shows 151. Walked by UAT on a local build before
  release (preview has no database; D-3), under the workspace's local-build rule (message ids moved to 900000000000001 before the
  first save; `CLAUDE.md`, "Local builds of `website`"); a refused save writes nothing.
- **M1-h (post-deploy observable).** After the release, one signed-in test-account `message.upsert` with 50 invalid embeds on
  production returns an error whose issues number 1, where `7923a1d` returns 51 (the base figure is the refutation run's,
  `verification/website-deps-review/scoping/refute-zod-max/output.txt`, against the schema, not over HTTP). Test accounts may write
  to production through their own accounts (his ruling, `steering/015-rulings.md` line 429); a refused save writes nothing. QA
  registers it as a post-deploy-observable row with its carrier.

**Rollback (code):** `git -C /usr/local/bin/hooks/website revert --no-edit <M1 commits>` on the chain branch, by the implementer
before release; after release, the release rollback below. **Verification:** suite and typecheck exit codes, M1-a–M1-e cases; the
security stage re-runs `zodSaveSchema.cost-probe.test.ts` (its Resumption State, item 1).

**Re-derivation gate:** M1 changes an API response (the issue list of a refused save). Every downstream milestone not authorised
when M1 ships is marked `PREMISE-STALE`; implementation approval covers M1–M5 together, so at approval the population is empty.

### M2 — Next.js 16.4.6 (H-002)

**Steps (what, not how):** raise `next` and `@next/bundle-analyzer` to `16.4.6` (the lint packages move in M3); regenerate `pnpm-lock.yaml` with pnpm 10.28.2 (`packageManager`). React, React DOM, their types
and Node stay. The two test helpers on Next.js internals (`src/components/__tests__/helpers/linkNavigation.tsx`,
`src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx`) stay as they are unless the suite at 16.4.6
shows otherwise (OQ-2: both internals byte-identical); an edit to the second fires `handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md`
(Exclusions X-11).

**Acceptance criteria:**
- **M2-a (H-002's bar).** The lockfile resolves exactly one `next` version, 16.4.6, in the importer, `packages:` and `snapshots:`, and
  no `next@16.1.6`, `@next/env@16.1.6` or `@next/swc-*@16.1.6` key remains. Instrument: `grep -c` over the committed lockfile for each
  of those key forms (computed before the output filter). Security re-runs `pnpm audit --prod --json` and joins it with its
  dispositions (its Resumption State, item 1): neither GHSA-q4gf-8mx6-v5v3 nor GHSA-8h8q-6873-q5fj is listed for `next`.
- **M2-b (nothing else moved).** Every pin the lockfile moves is listed in the implementation document with a disposition, from
  `git diff 7923a1d -- pnpm-lock.yaml`: expected movers are `next` and its declared dependencies (`@next/env`, `@next/swc-*`,
  `postcss`, `styled-jsx`, `@swc/helpers`, `caniuse-lite`, `baseline-browser-mapping`), `@next/bundle-analyzer` and its own
  dependencies, and the snapshot keys of packages that peer on `next` (`next-auth`, `@vercel/analytics`, `@vercel/speed-insights`,
  `cookies-next`, `@trpc/next`, `next-remote-watch`), whose own versions do not move. (Those six snapshot keys carry
  `next@16.1.6` at `7923a1d`: `awk` over `git show origin/master:pnpm-lock.yaml`, `snapshots:` section, 03:2xZ.) Any other moved version is a finding before
  code review. `package.json`'s diff touches only the specifiers named in the steps.
- **M2-c.** `next build` exits 0 in an isolated export with `pnpm install --frozen-lockfile`; the suite exits 0 with every case
  passing (base: 1913 cases, 149 files, exit 0, `verification/018/planning/base-validation/summary.md`), compared by path membership of
  `testResults` files and per-file case counts; `pnpm run typecheck` exits 0 after `next-env.d.ts` and `.next/types` are generated
  (Validation, V-2).
- **M2-d.** The build's warnings are captured; a deprecation warning for `middleware.ts` is recorded as a finding for the
  architect's record, not acted on (Exclusions X-8).

**Lockfile disposition** is M2-b. **Rollback:** the package step reverts by reverting its commit (`git revert`), lockfile with it;
implementer before release, devops after.

**Re-derivation gate:** M2 changes product behaviour (the framework under every page). Same population statement as M1.

### M3 — Lint on ESLint 9, a flat config and `eslint-config-next` 16.4.6 (D-6)

**Today** (`7923a1d`): ESLint `~8.57.0` (8.57.1), a 369-line `.eslintrc.json` and a 9-entry `.eslintignore`; `extends` `airbnb`,
`airbnb-base`, `plugin:react/recommended`, `plugin:tailwindcss/recommended`, `next`; one override for `*.ts`/`*.tsx` extending
three `@typescript-eslint`/`import` presets with 32 rules; 45 top-level rules; `settings` with 4 keys (parsed with `python3 -I`,
03:2xZ). The lint script is red (V-1) and nothing runs it (017 X-12; steering's refutation at 03:25Z).

**Steps (what, not how):**
- `eslint` to the latest 9.x (9.39.5 at `npm view`, 03:3xZ), with `@eslint/js` to the same 9.x (it sits at 10.0.1 today, whose
  peer is `eslint ^10`; referenced by no tracked file, `git grep`, 03:3xZ). Not ESLint 10: `eslint-plugin-react` 7.37.5, its latest,
  peers `eslint` no higher than `^9.7` (`npm view`) (X-16).
- `eslint-config-next` and `@next/eslint-plugin-next` to 16.4.6; `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`
  5.62 replaced by `typescript-eslint` 8 (already a devDependency at `^8.58.0`, unreferenced today); `eslint-plugin-react` to 7.37.5
  and `eslint-plugin-import` to 2.32.0 (both peer ESLint 9); `@eslint/eslintrc` added to load the eslintrc-only airbnb and
  tailwindcss configs.
- `eslint-plugin-n` and `eslint-plugin-promise` removed: no config entry and no source file names them (`grep -c` over the parsed
  `.eslintrc.json`: 0; `git grep -c` over `src bot lang`: no match, exit 1; 03:3xZ), and they peer ESLint `^7 || ^8`.
- `.eslintrc.json` and `.eslintignore` replaced by one flat config. The probe's `eslint.config.mjs`
  (`verification/018/planning/eslint9-flat-probe/`) is a feasibility sketch the implementer may start from, not a reviewed form.

**Premise, run:** the probe (a helper, 03:3xZ, isolated export of `7923a1d`) loaded such a config after two forced changes — the
compatibility layer's plugin instances re-pointed at `eslint-config-next`'s ("Cannot redefine plugin \"jsx-a11y\""), and five rules
`typescript-eslint` 8 no longer has (`semi`, `no-throw-literal`, `space-before-blocks`, `type-annotation-spacing`,
`member-delimiter-style`) — and ran to exit 1 with 833 problems (455 errors, 378 warnings) against the base's 665 (300, 365). Not
re-derived by the planner beyond reading its `README.md`, `add-log.txt` and `lint9.txt` tail. `pnpm add` warned of unmet peers from
`eslint-config-airbnb` 19.0.4 (`eslint ^7.32.0 || ^8.2.0`, `eslint-plugin-react-hooks ^4.3.0`) and from the v5 `@typescript-eslint`
packages this milestone removes (`add-log.txt`, the helper's `add.log` renamed so `.gitignore` admits it).

**Acceptance criteria:**
- **M3-a.** At the M3 tip, `pnpm exec eslint . --max-warnings=0` (never with `--fix` as an instrument) exits 0 or 1, never 2 (a
  configuration error), and `.eslintrc.json` and `.eslintignore` no longer exist.
- **M3-b (requirement ledger).** Every entry of `.eslintrc.json` and `.eslintignore` at `7923a1d` — `env` (2), `plugins` (2),
  `parser`, `parserOptions`, `extends` (5), `settings` (4 keys), the 45 top-level rules, the override's `files`, 3 extends and 32
  rules, and the 9 ignore entries — has one row in the implementation document: carried (where, in the flat config) or
  dispositioned with its reason. The five rules `typescript-eslint` 8 removed are rows with their disposition. The
  `no-restricted-syntax` rule on `next/dynamic` calls without `loading` or `ssr: false` (chain A's, 017 X-12) is carried.
- **M3-c (differential).** The new config and the base config are run over the same source tree (`7923a1d`'s sources, with only M3's
  lint files and packages changed), each with ESLint's JSON formatter; every rule id whose finding count differs between the two is
  a row naming its cause from this class: a rule added or removed by a preset at its new version (`eslint-config-next` 16.4.6 brings
  `eslint-plugin-react-hooks` 7; `typescript-eslint` 8's `recommended`), a rule removed upstream (M3-b), or an ESLint 9 default.
  A count that moves for no cause in the class is a finding before code review. The probe's 665 → 833 orients; it is not a target.
- **M3-d (ESLint 9 defaults).** Where ESLint 9 changed a default the base relied on, the config keeps the base behaviour: unused
  `eslint-disable` directives are not reported (ESLint 8's default; the probe counted 39 such reports under 9's). An inline
  directive that names a rule `typescript-eslint` 8 removed (`@typescript-eslint/ban-types`, 1 in the probe) is edited to the rule
  that replaced it or removed.
- **M3-e.** Lint stays red and unenforced (X-6, X-17); the `lint` script's command line keeps its form.

**Lockfile disposition:** every pin M3 moves is listed with its disposition, in the M2-b form. **Rollback:** revert M3's commit
(`git revert`), lockfile with it; implementer before release, devops after. Lint affects no build or runtime output (`next build`
does not lint; refutation, 03:25Z), so M3 changes no product behaviour and triggers no re-derivation gate.

### M4 — Behaviour the record ties to Next 16.1.6, re-verified at 16.4.6

**Class (finite, from the record):**

| # | Behaviour | Record | What must hold at 16.4.6 |
|---|---|---|---|
| R1 | Leave-page guard on the editor: a link click with unsaved edits asks; Cancel keeps the edits; confirm navigates | 017 M4 human-observable form; `planning/closed/017-existing-items-backlog.md` (AN-2, D-12) | as stated, via `<Link onNavigate>` `preventDefault` |
| R2 | `StyledLink`'s plain-click interception of a link to another site, from `onClick` | 017 M4-a, rulings 2026-11-19T02:43Z | as stated |
| R3 | The stated limit X-14: `router.push`/`replace`, `redirect()` and back/forward cannot be stopped | 017 X-14, AN-2 | still a limit, or now stoppable — recorded either way; no new guard is built here |
| R4 | `beforeunload` alert on the edit page (`useUnloadAlert`) | 017 X-15 | fires on the edit page with unsaved edits |
| R5 | `next/dynamic` exposes `.preload()` at `.render.preload`, and `loading: () => null` stops Suspense propagation | `planning/closed/004-lazy-loading-preload-overhaul.md` Assumptions 1–2, 5 | as stated |

**Acceptance criteria:**
- **M4-a.** For each of R1–R5, the existing tests covering it pass at 16.4.6 (they are QA's to name), and R1, R2 and R4 are walked in
  a browser on a local build at the M3 tip (signed-in pages cannot run on the preview, D-3). R5 is suite-checked; at 16.4.6
  `loadable.shared-runtime.js` is byte-identical to 16.1.6 and `lazy-dynamic/loadable.js` differs by one component name
  (`BailoutToCSR` → `BailoutToCSRForNextDynamic`; `next-internals-16.1.6-vs-16.4.6.md`).
- **M4-b.** Where a behaviour no longer holds, the regression is fixed inside M2 only if the fix is confined to the surface 017 or 004
  built; any other remedy is a milestone-level scope delta to the owner before code continues.
- **M4-c.** R3's result is written into the implementation document and carried to the architect (X-14's premise is "Next 16.1.6").
**No code is expected.** Rollback: none.

### M5 — Vercel preview of the chain branch, checked before the release push (D-3)

**Steps:** after QA Phase 2 passes M1–M4, devops pushes the chain branch (a preview deploy; `master` untouched) and reads the
deployment `READY` through `vercel api` (read only). UAT walks the preview URL.
**Acceptance criteria:**
- **M5-a.** The preview's build is `READY` at the chain tip's SHA (`githubCommitSha` in the deployment record).
- **M5-b (public pages).** Each of `/`, `/legal/privacy`, `/legal/terms` answers 200 and renders its page; `/support` redirects to
  the Discord invite (`next.config.js` `redirects`); `/message` without a session lands on the sign-in redirect. The set is the
  convention files under `src/app` at `7923a1d` that need no session (sweep §4 inventory), plus the two configured redirects.
- **M5-c (images).** The landing page's local image and one `/_next/image` request for a `cdn.discordapp.com` avatar answer 200 with
  an image content type on the preview.
- **M5-d (sign-in redirect).** Pressing sign-in reaches Discord's authorise page; UAT stops there and completes no sign-in (preview
  shares production's Discord and Pusher keys).
- **M5-e (H-002 human-observable form).** The preview's page script carries `window.next={version:"16.4.6"` (instrument read
  non-zero today on production for 16.1.6: `verification/018/planning/prod-next-version-pre.txt`). After release the same read on
  hooks.gg is H-002's post-deploy observable.
Captures go to `verification/018/uat/preview/` (screenshots stay untracked, his ruling). **Rollback:** none needed (a preview);
the branch is deleted by devops at release.

### Release (devops)

Devops Stage 1, then the release ask (D-5), then `release-move.js website master <tip> --qa-record <QA Phase 3 record>`. **Rollback
of the release:** devops runs `git -C /usr/local/bin/hooks/website revert --no-edit <base>..<tip>` and moves `master` to the revert
by `release-move.js` on his word; Vercel's own "promote previous deployment" is his, from the dashboard. Post-deploy rows: M1-h and
M5-e on hooks.gg, carried as QA registers them. Release order against open carriers: P-1
(`handoff/message-page-header-decode-post-deploy-2026-11-20.md`, reads every 2 hours to 22 Nov) and 017's B7R/B10R read
production; a release inside their windows changes what they read. Devops sequences against them (X-12).

## Testing Strategy

- Standard: `agent-output/CLAUDE.md` "Test Conventions (`website`)" — vitest, placement beside the code under `__tests__/`, names
  free of ID tokens, axioms A–E; `pnpm run typecheck`, never bare `tsc`; exit code recorded beside every count.
- M1: pure-logic tests over the save schema and the two procedures (Node environment), each site of the class a member; expected
  values are literals (bounds, issue counts), never the schema's output. The client composer (M1-e) under the DOM environment or
  as a hook test.
- M2: build, suite and typecheck in an isolated export; lockfile checks by `grep -c`.
- M3: both lint configs over the same source tree with ESLint's JSON formatter, tallied per rule id; never `--fix`.
- M4: existing tests plus a browser walk on a local build (`browser-walker`), signed in with the test account.
- M5: browser walk of the preview, anonymous.
- One host only (this box) for every run; the preview is read through `vercel api` and a browser.
- The chain changes no tool a gate uses as its instrument. Security's cost probe runs at the chain tip.

## Validation

- **V-1** (run 03:0xZ–03:1xZ by a helper, `verification/018/planning/base-validation/`): base `7923a1d` in an isolated export —
  install exit 0; suite 1913/1913, 149 files, exit 0; lint exit 1 (300 errors, 365 warnings; out of scope, X-6); typecheck exit 2.
- **V-2** (scoped): the typecheck's one error is `src/app/page.tsx(10,26): TS2307 Cannot find module '~/assets/img/product_image.png'`.
  The file is tracked; the image module types come from `next-env.d.ts`, which is gitignored (`.gitignore:86`) and imports
  `./.next/types/routes.d.ts`. So a fresh export typechecks only after `next build` (or `next typegen`) has generated them — read
  from the files, not run. M2-c runs typecheck after the build.
- **V-3:** the zod premise (OQ-3) and the internals (OQ-2) — runs cited there.

## Risks

- **RK-1** A navigation change in 16.3.0 (history push fix; scroll handler made default) alters a 017 guard. Falsifier: M4's walks.
- **RK-2** Vercel's build at 16.4.6 differs from the local build (Node 24.x both; install command `pnpm install`). Falsifier: M5-a.
- **RK-3** A user's stored message carries a list above a new bound and cannot be re-saved (M1-f). No production read is open to
  agents to count them (the database URL is his). Falsifier: a user report of the bound's error on a message he did not just
  paste; carried as M1-f's stated residue.
- **RK-4** The release lands inside P-1's or 017's post-deploy windows and confounds their reads. Falsifier: devops's sequencing
  note in its Stage 1.
- **RK-5** npm marks `eslint` 9.39.5 deprecated ("This version is no longer supported", the probe's `add-log.txt`), and
  `eslint-config-airbnb` 19.0.4 peers ESLint 8 only, so the lint stack sits on an unsupported major behind a compatibility layer.
  Lint touches no build or runtime output (M3). Falsifier: a lint dependency that fails to install or load at a later bump;
  carried as a stated limit (X-16).

## Exclusions

| # | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | zod 4 (the advisory's patched major) | His option chose the save-size cap (block 02:53Z, D-4) | Stated limit; security's M-001 disposition |
| X-2 | The other 39 `z.string()` server lines | One issue per string, not per element; the 1 MB body limit bounds them (block 02:53Z) | Stated limit |
| X-3 | `interactions-server.ts` (body read with no schema) | Token-gated, not client input (block 02:53Z) | Stated limit |
| X-4 | project-utils declaring `prisma-kysely` at runtime (audit I-2); preview-image-generator's `@next/eslint-plugin-next ^13.4.12` | Other repositories (block 02:53Z) | Security's audit I-2; stated limit |
| X-5 | `x-pathname` trusted for a redirect (I-5); Vercel's cache keeping RSC apart from HTML (A-2) | Not in his selection (block 02:53Z) | Security's audit I-5, A-2 |
| X-6 | Fixing the lint script's findings (300 errors and 365 warnings at the base; the new config's own count after M3) | Red before the chain; 017 X-11/X-12; M3 moves the setup, not the findings (M3-c) | Architecture Problem Areas row (017 M7) |
| X-7 | The H-001 leftovers: `middleware.ts`'s unread `x-query-params` write; CR-1's commented `sanitizeHtml` in `JsonModalBody.tsx` | His 03:08Z answer declined the option adding them | Rulings blocks 02:11Z, 02:18Z |
| X-8 | Renaming `middleware.ts` to `proxy.ts` | Deprecated, still honoured at 16.4.6 (release notes, helper's reading); not in scope | M2-d records the warning for the architect |
| X-9 | A lower body limit on the tRPC route (AD-3) | Does not meet M-001's bar alone: within any limit an array still yields one issue per element; and a value needs the largest legitimate save, which no agent can read from production | Stated limit |
| X-10 | `recentMessageIds` elements accepting non-int8 strings | Pre-existing, self-only; M1 edits the site, which fires the handoff's trigger | `handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` (Owning-Stage steering, to route) |
| X-11 | Order-independence of the first-load test | Only owed if M2 edits `Child.portal-inside-open-dialog.test.tsx` (not expected, OQ-2) | `handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` |
| X-12 | Sequencing the release against P-1 and 017's post-deploy reads | Devops's act | Devops Stage 1 (RK-4) |
| X-13 | `allowed_mentions.parse` admitting `'user'` and `'here'`, which Discord's page does not list (it lists `roles`, `users`, `everyone`) | Pre-existing element domain; M1 bounds the list's length only | Stated limit; reported to the architect for A-4 |
| X-14 | No server check of the 40-component total across nesting (the editor counts nested children; the schema caps the top level and, after M1, each container) | Not a per-element issue amplifier; W-2 lets invalid drafts save | Stated limit |
| X-15 | 017's `after()` finding (AN-3) and `pageExtensions` reading (X-13), both "at 16.1.6" | Neither design depends on the 16.1.6 behaviour continuing | Stated limit |
| X-16 | ESLint 10 | `eslint-plugin-react` 7.37.5, its latest, peers `eslint` no higher than `^9.7` (`npm view`, 03:3xZ) | RK-5 |
| X-17 | Enforcing lint (a hook, a workflow or a build step) | Not in his selection; lint is red (X-6) | 017 X-12's carrier (Architecture Problem Areas) |

## Open handoffs whose trigger names this chain's surfaces

Enumerated by reading every open handoff's frontmatter (`Status`, `Owning-Stage`, `Review-Trigger`, folded lines included) under
`handoff/`, 03:1xZ; the record has no `open-handoff-trigger-sweep.py` (`ls tools/`).

| Handoff | Disposition |
|---|---|
| `update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md` | Fires at M1 (edits `updatePreferences`); Exclusions X-10, steering routes |
| `anchored-popover-first-load-test-is-order-dependent-2026-11-18.md` | Fires only if M2 edits the file; X-11 |
| `mutant-equivalence-by-argument-unverified-2026-11-19.md` | Fires only if the diff touches `StyledLink.tsx` and its siblings; QA's (Owning-Stage qa) |
| `bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md`; `qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` | Trigger "next website effort scoped" / "QA next runs": QA's at Phase 1 (Owning-Stage qa) |
| `website-api-handler-hardening-2026-10-10.md` | Fires only if a file under `src/pages/api/` is edited; none is planned (X-9) |
| `message-page-header-decode-post-deploy-2026-11-20.md`; `017-existing-items-backlog-post-deploy-2026-11-19.md` | Devops's; release sequencing, X-12 |

Precedent read on the surfaces this plan changes: 012 (embed caps), 013 D32/D47 (issues shown to users, one line per issue —
`architecture/website.md` A-1), 016 D-10 (a bound the schema does not refuse is one-sided by his selection — A-4; M1 adds no bound
on that surface), 017 (navigation guards; M3), 004 (`next/dynamic`; M3).

## Planner batch

| Item | Source row | Disposition |
|---|---|---|

QA Phase 1 before implementation: yes (stage set, block 02:53Z).
