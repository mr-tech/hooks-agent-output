---
ID: n/a
Origin: fix-get-one-absent-not-found
UUID: fcce3991
Status: Active
Status-Detail: "Fix committed at website b663b35 on chain/fix-get-one-absent-not-found; parked on the owner's word ('Park the chains', relayed by steering-hooks), awaiting lift; the code-review send is owed at resume; QA Phase 2 owed (149 added production lines); merge is devops's, on the owner's word."
Handoff-At: b663b35 — repos=website
Origin-Chain: fix-message-not-found
---

# fix-get-one-absent-not-found — implementation

## Scope statement

Quoted from `steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T08:57Z" (the scoping determination, steered by
`steering-hooks`; his words are quoted there from `steering/fixer-queue-2026-11-21-rulings.md`, block "2026-11-21T07:59Z"):

> Repository `website` only, from `origin/master` `b829314`, on `chain/fix-get-one-absent-not-found`:
> 1. `message.getOne` answers NOT_FOUND, with chain 2's one text, for a number no row holds, in the runtime production uses — the
>    identification of "no row" does not depend on the error class's identity across module builds. Red test: the error comes from the
>    kysely build the query really runs (project-utils' real `getPostgres` over a throwaway postgres, or a `require('kysely')`-raised
>    error), seen red at `b829314`. It is an escaped bug-form test: `// escaped: deployment/closed/fix-message-not-found-deployment.md`.
> 2. On `/message/m/[id]/edit` in the not-found state, the editor's header controls (the message name field, the File/Edit/View/Help
>    menus, Send) do not render; the site's normal navigation and the notice stay.

Write set (same block): website `src/server/api/routers/message.ts`, `src/server/api/utils/shared.ts` (`getMessage` only),
`src/app/message/m/[id]/**`, `src/providers/MessageProvider/index.tsx` (exposing the not-found state only), their `__tests__/`; in
the record, this document and `verification/fix-get-one-absent-not-found/`.

**Write-set ruling taken this run.** The fix declares one class, `MessageNotFoundError`, directly above `getMessage` in `shared.ts`. I
asked `steering-hooks` (SendMessage, msg_id `a7d4a56e-1c6e-40d4-8f50-944bc88b34d9`) whether that is "getMessage only"; its ruling: option 1, in scope, on three conditions —
(a) nothing else in `shared.ts` changes; (b) this document records the other `getMessage` callers and confirms they answer as before;
(c) no other code catches `NoResultError` from `getMessage`, re-checked by `git grep` at the tip. Each is met under **Diagnosis**.

## Entry Conditions

| # | Condition | Value |
|---|---|---|
| 1 | Scoping determination | `steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T08:57Z"; relayed in `steering/fix-get-one-absent-not-found-brief-fixer.md` and `-brief-common.md` |
| 2 | Bounded scope statement | Quoted above; exclusions (same block): zod errors raised inside project-utils; the outer `/message` header and `SendMenuTitle` |
| 3 | Fix branch | website `chain/fix-get-one-absent-not-found`, checked out by steering from `b829314`; `git -C website branch --show-current` → `chain/fix-get-one-absent-not-found` at session start |
| 4 | Record on the mechanism | `architecture/system-architecture.md:141-142` (project-utils exposes `getPostgres()`, a Kysely-over-pg singleton, shipped as committed dist) and `:187`; `architecture/website.md` has no entry on `getOne`, kysely errors or the `m/[id]` header (`grep -n -i "kysely\|NoResult\|getOne\|Navigation"` hits only the outer `NavigationGuardProvider`, lines 330-362). `research/`: no entry on `NoResultError` (`grep -rlic "NoResultError"`, no hit). Source records: `handoff/get-one-absent-number-still-500-in-production-2026-11-21.md` (7c3e91a4); sweep `verification/fix-get-one-absent-not-found/scoping/sweep.md` |

## Diagnosis

### Item 1 — the absent number answers 500

**Cause.** `getOne` (`message.ts:74` at `b829314`) maps the load's error with `asNotFound(NoResultError)`, which tests
`error instanceof NoResultError`. `message.ts:4` imports the class by ESM `import { NoResultError } from 'kysely'`. The query runs on
project-utils' `getPostgres()`, whose `dist/postgres.js:4` is `require("kysely")`; kysely 0.26.1's `exports` map sends `require` to
`dist/cjs/index.js`, where `query-builder/no-result-error.js` declares its own `class NoResultError extends Error`. The thrown error
is the CJS class, the checked class the ESM one, so `instanceof` is false and the raw error goes out as a 500 "no result".

**Instrument.** A red test whose database is the capturing driver built from `createRequire(import.meta.url)('kysely')` (the CJS
build, the form project-utils uses), driving `messageRouter.createCaller(...).getOne`. Output at `b829314` (final test files over
base source, isolated worktree): `{"code": "INTERNAL_SERVER_ERROR", "message": "no result"}` against the expected NOT_FOUND —
production's B-1 signature exactly. Capture: `verification/fix-get-one-absent-not-found/fixer/red-at-b829314.txt`, lines 107-110.
Also read: `NoResultError` sets no `name` (CJS `no-result-error.js`: `super('no result')` only), so a `name` test was not an option,
and a `constructor.name` test would not survive server minification; kysely 0.26.1's `executeTakeFirstOrThrow(errorConstructor)`
(`select-query-builder.js:1155-1164`) builds `new errorConstructor(node)` for a class, which is the hook the fix uses.

**Remedy chosen.** `getMessage` passes a website-owned class to `executeTakeFirstOrThrow`; `getOne` matches that class. Both
modules are website source, compiled into one bundle, so the identity holds whichever kysely build raised (Next bundle resolution
not shown either way, brief hazard 2: the fix does not depend on it). The class's message stays `'no result'`.

**Consumers of the changed error (ruling condition b).** `getMessage`'s callers at `b663b35`
(`grep -rn "getMessage(" src` excluding tests, and `MessageProvider`'s unrelated local `getMessage`):
- `message.getOne` (`message.ts:73`) — now NOT_FOUND with the one text. Item 1.
- `message.updateRecentMessageData` (`message.ts:222`) — no catch; the error propagates; tRPC answers a non-`TRPCError` as
  INTERNAL_SERVER_ERROR with its `message` (`trpc.ts` `errorFormatter` returns `shape` unchanged). **Probe**:
  `verification/fix-get-one-absent-not-found/fixer/probe/message.other-callers-probe.test.ts` (an absent number, over the ESM and
  the CJS build) answers `{INTERNAL_SERVER_ERROR, "no result"}` at `b829314` (`probe-at-b829314.txt`, 2 passed) and at `b663b35`
  (`probe-at-b663b35.txt`, 2 passed). Control: the class's message changed to `'no row'` in the tip export moves both cases red
  (`probe-control-message-changed.txt`, 2 failed), so the probe responds to the answer it claims unchanged.
- `upsertMessage` (`shared.ts:296`, `newMessagePromise = getMessage(id)`, returned at `:312`) — no catch; same propagation and
  same answer as `updateRecentMessageData`, by the same raise (read of the code path; the row was just written, so the branch
  runs only on a concurrent delete).
- `shared.ts` changes are the class (lines 151-155) and the one argument (line 172); nothing else in the file (ruling condition a;
  `git diff b829314..b663b35 -- src/server/api/utils/shared.ts`, two hunks).

**Guards on the raw value (ruling condition c).** `git grep -n "NoResultError\|MessageNotFoundError" b663b35 -- src bot`: five lines,
all the fix's own (`message.ts:14,35,73`; `shared.ts:151,172`); no `NoResultError` remains anywhere in `src` or `bot`. The literal
`'no result'` appears in non-test source only at `shared.ts:153`. The sweep's single-site finding holds.

**Base versus fix.** At `b829314` the ESM-fake cases already answered NOT_FOUND (they share the checked class by construction);
they still do at the tip. The CJS case is new behaviour, the named fix. `updateRecentMessageData` and `upsertMessage`: unchanged
(probe above).

### Item 2 — the not-found edit page wears the editor's header

**Cause.** `m/[id]/layout.tsx` renders `<Navigation />` (`_layout/Navigation.tsx` `Header`) beside the page inside `MessageProvider`.
`Header` decides by path alone (`:420-426`): any `/message/m/<id>/edit` renders the full bar, with the name field (`:272-313`), the
File/Edit/View/Help menus (`:332-359`) and Send (`:360-367`, `href` falling back to `message?.id ?? 0`). `MessageProvider` already
exposes `isNotFound` (`index.tsx:338`, `messageError?.data?.code === 'NOT_FOUND'`); `Navigation` did not read it.

**Instrument.** A red DOM test mounting `Header` and `EditPage` inside `TrpcProvider` + `MessageProvider` as the layout composes them,
with `getOne` served over a real tRPC HTTP handler. Output at `b829314`: in the not-found state the header has `nameField: true`,
menus `File, Edit, View, Help`, `send: true` (`red-at-b829314.txt`, lines 76-86) — QA's B-1 observation on hooks.gg.

**Remedy.** `Navigation` reads `isNotFound` and renders the block holding the name field and the menus (the inner
`div.ml-2.min-w-0`) only when it is false. The avatar link, `ThemeToggle` and `NavMenu` stay. `MessageProvider` is not edited.

**Consumers of `isNotFound`** at `b663b35`: the edit page (`edit/page.tsx:132`), the send page (`send/page.tsx:114`) and now
`Navigation`. `/send` renders no `m/[id]` header (`Header` returns null off `/edit`) and the outer `/message` header is out of scope.

### Residue in production

`getOne` is a read and writes nothing. In the absent case `message` stays null, so the editor header's controls wrote nothing either:
`updateMessage` returns null for a null message (`useApiMethods.ts:52-53`), `saveMessage` acts only on a non-null `messageRef.current`
(`:82`), and the draft writer returns on `!message?.name` (`MessageProvider/index.tsx:189`). Send linked to `/message/m/0/send`, the
new-message route, writing nothing by itself. No state for the release to carry. The release form (Vercel build of `master`) replaces
the server bundle whole, so the fix reaches every request at once. Live check: the post-deploy row in the determination block — the
test account reads an absent number on hooks.gg (404 with the one text, and `/edit` showing the notice without the editor bar), owned by
devops's brief.

**Origin-Chain.** `git blame -s -L 36,43` and `-L 74,74` of `message.ts` at `b829314`: every faulty line is `6b539e5`, chain
`fix-message-not-found`'s production change.

## Change

- `src/server/api/utils/shared.ts` — `export class MessageNotFoundError extends Error` (message `'no result'`) above `getMessage`;
  `getMessage` calls `.executeTakeFirstOrThrow(MessageNotFoundError)`.
- `src/server/api/routers/message.ts` — drops the `kysely` import; `asNotFound` takes `typeof MessageNotFoundError`; `getOne` catches
  with `asNotFound(MessageNotFoundError)`.
- `src/app/message/m/[id]/_layout/Navigation.tsx` — reads `isNotFound` from `useMessage()`; wraps the name-field-and-menus block in
  `{!isNotFound && ( … )}`. 3 added, 1 removed under `git diff -w`; the rest of its numstat is the block's re-indent.
- `src/server/api/routers/__tests__/message.get-one-not-found.test.ts` — the CJS-build case (below).
- `src/server/api/utils/__tests__/helpers/capturingDatabase.ts` — takes an optional kysely build (default: the ESM import), so a caller
  can build the fake from the CJS one.
- `src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx` — the two header cases; the
  `~/components/PresetDialog` mock gains `DialogFooter`, which `SaveAsMenu` imports once the header mounts with a message.

**Production lines** (GLOSSARY): `git diff --numstat b829314..b663b35` added column over production paths — `Navigation.tsx` 139,
`shared.ts` 7, `message.ts` 3 — **149**, so QA Phase 2 runs. The re-indent accounts for 136 of them.

## Test

Before adding: the covering tests named by the sweep were tightened in place — `message.get-one-not-found.test.ts` (getOne) and
`MessageNotFound.edit-and-send-pages.test.tsx` (the not-found pages); no `m/[id]` header test existed.

**Cases added.**
1. `message.getOne over the CommonJS kysely build that project-utils' getPostgres loads` › `answers not found with the one message text
   for a number no message holds` — bug-form, `// escaped: deployment/closed/fix-message-not-found-deployment.md`. The value the path
   receives from the store is the real CJS kysely's `NoResultError` raised by its own `executeTakeFirstOrThrow` over a capturing
   driver; the row source is a fake (an empty result), not a postgres.
2. `the edit page's header` › `keeps only the site navigation beside the not-found notice for a message number the user cannot load`
   — spec-form; asserts `{nameField: false, menus: [], send: false}` and `{themeToggle: true, userMenu: true}`.
3. `the edit page's header` › `shows the message name field, the File, Edit, View and Help menus and Send for a message the user can
   load` — spec-form; the counterpart of case 2, guarding against hiding the controls everywhere. Passes at the red run; its negative
   control is below.

A further case written at first (the owner still loads his message over the CJS build) passed at red, protected nothing the existing
owner cases do not, and was dropped before the commit.

**Red run.** Final test files over `b829314` source, in an isolated `git worktree add --detach` export at `b829314` (node_modules
symlinked): `npx vitest run <both files>` → exit 1, `Tests 2 failed | 21 passed (23)`; failing: case 1 (500 "no result") and case 2
(controls present). Capture: `verification/fix-get-one-absent-not-found/fixer/red-at-b829314.txt`.

**Green run.** At `b663b35`, the same two files: 23 passed, exit 0 (the control run of the sweep below,
`controls/out/…-control-1.stdout`); in the full suite, below.

**Negative controls** (`python3 ~/.claude/tools/mutation-run.py`, `--sha b663b35`, `--dep node_modules`, a transcribed vitest config
using `process.cwd()` for `__dirname` per the runner's stated limit; mutants `verification/fix-get-one-absent-not-found/fixer/controls/mutants.json`,
config `controls/vitest.config.ts`, table and streams `controls/out/`, runner log `controls/mut-run.txt`): control passed, 23 cases;
4 of 4 KILLED, each run's count equal to the control's.

| Mutant | Edit | Killed by |
|---|---|---|
| `getone-refusal-by-trpc-code` | `getOne` catches with `asNotFound('NOT_FOUND')` (the call site's other choice from the set) | case 1, the three absent-number not-found cases, the retry-rule case, case 2 |
| `getmessage-default-kysely-error` | `getMessage` back to `.executeTakeFirstOrThrow()` | the same set as above |
| `header-controls-always-hidden` | the guard reads `{false && (` | case 3 only |
| `header-controls-never-hidden` | the guard reads `{true && (` | case 2 only |

No time-based test was added. Nothing added has a lifetime or declines work.

## Verification

| Check | Command | Result |
|---|---|---|
| Existing suite, base | `npx vitest run --reporter=json` at `b829314` (tree clean but `.playwright-mcp/`) | exit 0; 2313 total, 2313 passed, 159 files (`fixer/suite-base.json`) |
| Existing suite, tip | same, at `b663b35` (`git diff --quiet HEAD -- src` true) | exit 0; 2316 total, 2316 passed, 0 failed, 159 files; file sets equal by path (0 only-base, 0 only-tip) (`fixer/suite-tip.json`, `suite-tip.txt`). +3 = cases 1-3 |
| Typecheck (both programs) | `pnpm run typecheck` at `b663b35` | exit 0 (`fixer/typecheck.txt`) |
| Lint | `npx eslint -f json` over the six changed files | 0 errors 0 warnings on five; `Navigation.tsx` 2 errors 3 warnings, identical rules to its base (see below) |
| Conventions | `node ~/.claude/tools/convention-check.js website --since=b829314` | exit 1: 5 FAIL, 0 CANDIDATE, 18 SKIP (`fixer/convention-check.txt`) |
| Lockfile | — | no package-manager operation ran; `pnpm-lock.yaml` not in the diff |

**Convention-check dispositions.** The 5 FAILs are eslint findings in `Navigation.tsx`, all present at `b829314` (eslint over the base
export: same rules, each one line earlier — `prefer-nullish-coalescing` at 235, 246, 318; `react-hooks/refs` ×2 at 377). They are not
fixed here: 318 → `??` would change what an empty message name shows, and `react-hooks/refs` is `fileMenuItems`' dependency on
`nameRef.current` (`:177`), a refactor; either is a behaviour change beyond the named one. Raised to steering; its ruling (`steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T09:16Z"): leave them, recorded as debt — routed to `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md` (UUID b88e8be8), with base and fix eslint JSON at `verification/fix-get-one-absent-not-found/fixer/lint-{base,fix}-Navigation.tsx.json`. SKIPs:
17 `.playwright-mcp/*.png` (untracked, not this chain's) and the ID-token/basename check, which the checker states it does not implement
verbatim — **unchecked by the tool**; by hand, the new titles and the one comment line carry no ID token, and the comment is an
`escaped:` line (comment-gate `ALLOW` `/^(escaped|artefact):\s/`).

**Disclosures, in the round.**
- A removal of the two `.env.local*` files a `cp .env*` had copied into the base export was refused by Claude Code's built-in
  destructive-command check (target was a shell variable). Re-issued, as its message names, with literal absolute paths; it removed only
  those two copies and three superseded captures of mine under `verification/fix-get-one-absent-not-found/fixer/`. The copies were
  never read or printed.
- In the tip export (not the shared tree) `git checkout -- src/server/api/utils/shared.ts` restored the probe control's edit before the
  export was removed.
- Both exports were removed with `git worktree remove --force <literal path>`; `git worktree list` afterwards shows the main tree only;
  the website `node_modules` link target is intact. `mutation-run.py`'s `--work` folder is empty.

## User-visible flows

Product vocabulary, for his own check after release (evidence: the cited test, at `b663b35`):
1. **Opening a message number that does not exist** (`/message/m/<number>/edit`, signed in): the page shows "This message doesn't
   exist, or you don't have access to it." with a link back to his messages, at once, instead of a blank editor that keeps retrying.
   Evidence: case 1 and the existing absent-number page cases.
2. **The header on that page**: only the logo/avatar link, the theme toggle and the account menu remain; no message name field, no
   File/Edit/View/Help menus, no Send. Evidence: case 2.
3. **Another user's message, or a server he cannot manage**: unchanged — the same notice and, now, the same reduced header. Evidence:
   the existing three-case not-found tests; case 2's guard is the not-found state, whichever case set it.
4. **His own message's edit page**: unchanged — the name field, the four menus and Send are all there. Evidence: case 3.

## Handoff

- **SHA**: website `b663b35` on `chain/fix-get-one-absent-not-found` (no upstream; not pushed).
- **Reviewer**: `code-reviewer-fix-get-one-absent-not-found`, then QA Phase 2, `qa-fix-get-one-absent-not-found` (149 added
  production lines).
- **Merge**: devops's, to website `master` (Vercel production), on the owner's word asked in its own session.

## Resumption State

Checkpoint at 2026-11-21T09:17, on steering-hooks' relay of the owner's ruling "Park the chains".

- **Done**: both scope items fixed at website `b663b35` (branch `chain/fix-get-one-absent-not-found`, HEAD `b663b35`, tree clean but the foreign `.playwright-mcp/`); red at `b829314`, 4 of 4 controls killed, suite, typecheck, lint and conventions recorded above; steering's shared.ts ruling met; the lint debt routed to `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md` (record `328c2766`).
- **Not sent**: the hand-off SendMessage to `code-reviewer-fix-get-one-absent-not-found` (live since 09:16Z) naming this document and `Handoff-At: b663b35`. It was held for the park, not sent; steering's spawn cue (msg `91a28d5b`) told steering the SHA. At resume: send it, once.
- **Reviewer state**: no `code-review/fix-get-one-absent-not-found-*` document exists (`git log` over that path, empty at this checkpoint).
- **Uncommitted or mutated**: nothing. Both isolated worktrees are removed; no process of this run is running.
- **Questions out**: none open. The shared.ts write-set ruling and the lint-FAIL ruling were both answered by steering-hooks.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T09:15 | fixer-fix-get-one-absent-not-found | Created: diagnosis, fix at website `b663b35`, red at `b829314`, 4 of 4 controls killed, suite/typecheck/lint/conventions; handed to code review. |
| 2026-11-21T09:15 | fixer-fix-get-one-absent-not-found | The runner log and the tip suite's console capture renamed `.log` → `.txt` (the record ignores `*.log`) and committed; citations updated. |
| 2026-11-21T09:17 | fixer-fix-get-one-absent-not-found | Navigation.tsx's five pre-existing lint findings routed to `handoff/message-edit-header-preexisting-lint-findings-2026-11-21.md` on steering's 09:16Z ruling. |
| 2026-11-21T09:17 | fixer-fix-get-one-absent-not-found | Checkpoint: parked on the owner's word; Resumption State written; the review send is owed at resume. |
