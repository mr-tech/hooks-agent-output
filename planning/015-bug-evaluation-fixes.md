---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "Revision 1 drafted; scope relay with Exclusions and OQ-A–OQ-F is with the owner through steering-bug-fixes. The critic and the architect's conformance pass do not read it until he answers."
Revision: 1
Target Release: "website master → the chain-015 merge SHA (Vercel production); preview-image-generator prod → the chain-015 merge SHA (prod.yml), preceded by preview (preview.yml). Neither package carries a version artefact."
Epic-Alignment: "none registered — no roadmap exists (agent-output/roadmap holds only .gitkeep, read 2026-11-08); the source of the effort is research/codebase-bug-evaluation-2026-11-08.md (aea4a05)"
Lane: "standard — agent-output/README.md carries no small-lane section (grep -i small, 0 hits, 2026-11-08); the blast radius spans the save schema, a bot command's permissions and a production PM2 service, none a leaf"
Architectural-Surface: "none added. Two record lines are touched — see § Architecture lines this chain touches"
---

# Plan 015 — Bug-evaluation fixes (website, preview-image-generator)

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-08T04:43 | 1 | planner (planner-hooks-015) | Created. ID minted on the owner's selection (04:39Z). Source: `research/codebase-bug-evaluation-2026-11-08.md` at agent-output `aea4a05`; scoping: `steering/015-rulings.md` (committed as `bug-fixes-rulings.md`) block "2026-11-08T04:37Z — scoping determination" (`a111e80`). Scope delta: none (first revision); the plan carries 48 of the 50 rated findings in ten milestones (M0–M9), the original ask being the 50-finding pool. |

## Value Statement and Business Objective

As a **community leader building Discord messages in Hooks.gg**, I want the defects the 2026-11-08 bug evaluation
found in the editor, the save path, the bot and the preview service fixed, so that **what I build is what saves,
what sends and what the preview shows** — a black embed saves, a Cancel key press never deletes, a multi-line code
block renders, a moderator with Manage Server can use *Get Message*, and a user who administers no server can open
the message list. This serves the Master Product Objective as the workspace README states it: a WYSIWYG Discord
message builder that sends through webhooks.

## Decisions Register

| # | Decision (every operative clause) | Date | Owner's words, verbatim — route | Reopened by | Consequence |
|---|---|---|---|---|---|
| D1 | Open chain 015 for this effort. | 2026-11-08 | "Agent: open the chain" — selection-prompt answer to the planner, 04:39Z, this session. | Owner withdrawal only. | ID 015 minted; `.next-id` → 16. |
| D2 | Start the chain; `researcher-competitors` holds Playwright, so no stage starts, stops, reinstalls or reconfigures Playwright or its browsers, or kills a browser process, while it is live; a stage needing a browser asks steering first. | 2026-11-08 | "Start the chain. Note that `researcher-competitors` is currently using playwright." — relayed by steering-bug-fixes, rulings block 04:37Z (`a111e80`). The constraint's operative clauses are steering's wording (agent-authored). | `researcher-competitors` no longer live (session-liveness read), or owner withdrawal. | Every browser-run criterion is placed behind a steering go (§ Testing Strategy). |
| D3 | A username stays required to send; no defect (OQ-1). | 2026-11-08 | "Even though it's not required by Discord, it's not always possible to know what webhook the user is going to send it as ahead of time, and I don't think it's necessarily bad UX to just make them set it explicitly so they know for sure what it's going to look like. This is a WYSIWYG editor after all." — **as recorded in the research document** (`aea4a05`); not yet confirmed by steering in this session. | Owner withdrawal; steering's confirmation differing from the record. | No milestone touches `validateMessage`'s username rule. |
| D4 | `get_message` is usable by members holding Manage Server (OQ-2); the value that expresses it is `ManageGuild` alone. | 2026-11-08 | "Manage Server is probably fine. Tengentially [sic] related, the system needs RBAC controls." — **as recorded in the research document** (`aea4a05`); not yet confirmed by steering. The `ManageGuild`-alone reading is the researcher's (agent-authored, F-28 correction). | Steering's confirmation differing from the record; owner withdrawal. | **M7 turns on this row; steering confirms the quote before M7 is approved.** |
| D5 | The message cap is 1000: the 1001st new message is refused (OQ-3 → planner's call). | 2026-11-08 | "idk" — as recorded in the research document. The call is the planner's (agent-authored): the code's own error text, "limit of 1000", is the only statement of intent there is. | Owner states a different cap. | M1-d. |
| D6 | The candidate pool is F-1–F-50; H-1–H-8, the eleven handoffs in research § Findings 7, the RBAC remark and any security assessment are out; recommendation limbs (1)–(3) are in as owner-side checks, (4) out. | 2026-11-08 | Steering's scoping determination under "Start the chain" (agent-authored by steering-bug-fixes, `a111e80`). | Owner withdrawal. | § Exclusions rows X-5–X-8. |

## Objective

Fix 48 rated intent-vs-execution defects at their sites, each under a property-form criterion with a red test where
the repository carries a runner, ship them to production on website and preview-image-generator, and run the three
owner-side checks the scoping admitted.

## Assumptions and open questions

Every finding's location and rating were read at the same SHAs as today's tips: website `7ce866b`,
preview-image-generator `471578f` (prod), project-utils `749606d` (`git rev-parse`, 2026-11-08, equal to
`git ls-remote` heads). The research's ratings are carried, not re-rated. Spot re-reads this pass (`grep -rn` at
`7ce866b`): the dead literal `'~/components/Button'` at exactly three sites (`ConfirmationDialog.tsx` `Inner`,
`WarningDialog.tsx` `WarningDialog`, `ImageUploader.tsx` hotkey handler); `ADMIN_PERMS` in
`bot/scripts/app_commands/common.ts`, consumed by `messageCommands.ts` only; `MAX_EMBED_FOOTER_TEXT_LENGTH = 256`
feeding `shapes.ts` `embedShape` and `EmbedFooter.tsx`; `~/components/Button` renders a `<button>` element
(`Button.tsx`).

- **OPEN QUESTION OQ-A (typecheck gate)**: `pnpm run typecheck` exits 1 at `7ce866b` with two `error TS` lines,
  both in `.next/dev/types/validator.ts` (run 2026-11-08 by the planner, `grep -c "error TS"` = 2). The file is
  git-ignored output of a 2026-09-08 `next dev`; no `next dev` process for this tree is running (`pgrep -af`,
  2026-11-08). Options: (a) **the implementer deletes `website/.next/dev/types` at M0** (regenerated by the next
  `next dev`/`next build`) and the gate is the repo's own `pnpm run typecheck`, exit 0; (b) the gate is both tsc
  programs run from scratch configs omitting the `.next` globs, as the research did, the repo script left red;
  (c) neither — the gate is waived and stated as a limit. Recommended: (a).
- **OPEN QUESTION OQ-B (what the editor allows — W-2)**: per `website.md` W-2, a change to what the front end
  allows is the owner's question. Two findings change it: **F-43** raises the footer bound from 256 to Discord's
  2048 in the editor and the save schema together; **F-40** decides which image URLs the uploader accepts.
  Recommended: F-43 → 2048; F-40 → the URL's path ends in one of `png jpg jpeg webp gif apng tiff webm`,
  case-insensitive, query string ignored (today's six plus `jpeg` and `webp`; `avif` left out because the
  planner has not read Discord's image support for it — unread). Either may instead be excluded.
- **OPEN QUESTION OQ-C (F-49)**: top-level Duplicate inserts the copy *before* the original; the four nested
  editors insert *after*. Which is intended? Recommended: after, matching the nested editors. Or exclude.
- **OPEN QUESTION OQ-D (F-44, excluded unless he says otherwise)**: the 40-component cap is checked before adds
  that add several and never for nested adds. Fixing it needs a decision on what the editor allows when an add
  would cross the cap (refuse the add, or allow and mark the message invalid). Excluded to a handoff (X-2) unless
  he rules the behaviour now.
- **OPEN QUESTION OQ-E (preview-image-generator in or out)**: M8 is the service's first deploy since 2023-08-22
  (`git log -1 prod`). Its five findings are each severity 2, none observed in production. Deploy runs on a
  self-hosted runner (`prod.yml`: cached `node_modules` keyed on the lockfile, `npm run build`,
  `.github/deploy.sh` → `pm2 startOrReload ecosystem.config.js --update-env`). A `preview` branch deploys a second
  instance first (`preview.yml`, port 3001). Options: keep M8 with preview-then-prod (recommended), or exclude
  M8 to a handoff.
- **OPEN QUESTION OQ-F (preview-image-generator host)**: limb (3)'s `pm2 show` read needs the host the runner
  deploys to (`/usr/local/bin/hooks-image-preview-generator/deployed/<env>`, absent on this box, `ls -d`
  2026-11-08) and whether `claude-ro` exists there. Which host is it?
- **REQUIRES ANALYSIS (REQUIRED before M8 implementation)** — F-31's premise. `ecosystem.config.js` sets
  `shutdown_with_message: true` beside `kill_timeout: 5000`; `server.ts` listens for `SIGINT` only. If PM2 at
  the host's version stops a process by `process.send('shutdown')` rather than `SIGINT` when that option is set
  (PM2's documented meaning — **read from documentation recall, unread at the pinned version**), the drain
  handler never runs at all and raising `kill_timeout` alone fixes nothing. The analyst settles: PM2's stop path
  at the host's version (source read at that version), and what the app log shows across the last reload (does
  `Server received SIGINT` appear). The analysis, once commissioned, is named 015-bug-evaluation-fixes-analysis (analysis directory). The host reads
  ride limb (3) under OQ-F.

## Plan

Milestones are independent of one another except M0 (first) and M9 (last). Each fix lands at its finding's site;
every criterion is a property over the class the finding names. Rollback for every website milestone: `git -C
website revert <commit>` on the chain branch, by the implementer before merge; after release, devops reverts on
`master` and pushes (production push, owner-approved). Lockfile: no milestone adds or moves a dependency; a moved
pin in `pnpm-lock.yaml` or `package-lock.json` is a criterion failure.

The re-derivation gate: M1-d, M2 and M6-b change product behaviour (a stored representation the schema admits, an
operational limit, an accepted input class). At implementation approval every milestone M0–M9 is approved
together, so the gate's population is empty; a milestone the owner withholds from that approval is marked
`PREMISE-STALE` until re-argued.

### M0 — Baseline and gate instrument (first; blocks every other milestone)

- Record at the chain branch's base: `npx vitest run --reporter=json` counters and process exit, beside the
  planner's read of 2026-11-08 at `7ce866b`: 598 tests, 598 passed, 0 failed, 54 files, exit 0.
- Settle the typecheck gate per OQ-A. Acceptance: under (a), `pnpm run typecheck` exits 0 at the base before any
  source change; the deletion is the only act on `.next`.
- Held shared state: `website/node_modules` (installed by researcher-bugs) is not reinstalled or wiped; no
  milestone needs an install.

### M1 — Server and data path (website): F-1, F-2, F-3, F-4, F-5, F-6, F-7, F-8, F-9, F-10, F-11

- **M1-a (F-2)** — the originating statement, verbatim: *"Empty-array `in` predicates compile to `in ()`, a
  Postgres syntax error."* Property: for every call of `getPartialMessages(userId, guilds)` and
  `getUserRecentMessages(ids)` over the input class {empty array, non-empty array}, the compiled SQL contains no
  `in ()`; with `guilds = []` the query returns exactly the user's own messages; with `ids = []` the result is
  empty without a query error. Expectation independence: the expected SQL shape is a literal, never produced by
  the function under test.
- **M1-b (F-1)** — every compiled cron selection filters `ScheduledMessages.error` with `is null`. Residue (stated
  limit): no producer inserts into `ScheduledMessages` (research F-1), so the fix has no observable effect in
  production.
- **M1-c (F-3)** — the revoke request `removeUserSession` sends carries `token` set to the account's access token
  for every session with one; a session with no access token sends no revoke request. The DB and Redis clear-out
  still runs in both cases.
- **M1-d (F-4, D5)** — over the class {existing message, new message} × {count < 1000, count = 1000}, a new
  message is refused exactly when the count before insert is ≥ 1000, with today's error text; an existing
  message is never refused by the cap.
- **M1-e (F-5)** — `userOrDiscordIdShape` accepts exactly `"0"` and strings of 17–23 decimal digits; every
  other string is refused (members: `"0abc"`, `"00"`, a 16-digit and a 24-digit string).
- **M1-f (F-6)** — in the client branch of the `env.mjs` proxy, reading `NODE_ENV` is not refused; reading any
  other non-`NEXT_PUBLIC_` server key still is.
- **M1-g (F-7)** — `interactions-edge` `handler`: a request whose signature does not verify gets 401 whatever its
  body (members: malformed JSON, valid JSON); the body is parsed only after verification.
- **M1-h (F-8)** — in `hydratedAuthCallback`, the guild fetch and the message fetch are both started before
  either is awaited.
- **M1-i (F-9)** — the cookie parser returns a value for every well-formed segment, keeps every `=` after the
  first in a value, and skips a segment with no `=` without throwing.
- **M1-j (F-10)** — a cached `null` is a hit: a second call within `expireSeconds` for an account with no refresh
  token, or a session with no account, does not query Postgres.
- **M1-k (F-11)** — with `NEXT_PUBLIC_CDN_PORT` set in development, the URL is `<host>:<port>/dev/…`.

The website-api-handler-hardening handoff's trigger fires on M1 (edits under `src/pages/api/` and `env.mjs`);
disposition X-9.

### M2 — Limits and the save schema (website): F-12, F-13, F-14, F-43

- **M2-a (F-12)** — originating statement: *"A black embed cannot be saved."* Property: for every integer colour
  in [0, 16777215] the editor can produce, `embedShape` admits it, so a message whose only fault would have been
  `color: 0` saves; `discordResponseToMessage` keeps `color` whenever the response carries the field, 0
  included. Human-observable: pick black in the colour picker, save, reload — the embed is black. Walked on the
  locally served chain tip (§ Validation).
- **M2-b (F-13)** — the author-name error shows exactly when the name exceeds 256 characters (the save schema's
  bound, `MAX_EMBED_AUTHOR_NAME_LENGTH`).
- **M2-c (F-14)** — `validateEmbedTitle`'s error names the title.
- **M2-d (F-43, OQ-B)** — under the recommended answer: footer text of 0–2048 characters shows no length error
  and saves; 2049 shows the error. One constant drives both the editor and `embedShape`.

### M3 — Enter on a dialog never confirms from another button (website): F-15, F-39

Originating statement: *"Enter on a focused Cancel button runs the confirm action."* The class: every
`useHotkeys('enter')` handler in `src/` that guards on the focused element — enumerated by `grep -rc
"'~/components/Button'" src` (3 at `7ce866b`, sites named above). Decision table, for each of the three dialogs:

| Focus at Enter | Outcome |
|---|---|
| the dialog's confirm/submit button | its action runs exactly once |
| any other button in the dialog (Cancel; Clear in the uploader) | that button's action only; confirm/submit runs zero times |
| no button focused | outcome unchanged from `7ce866b` for that dialog |

Human-observable: in *Delete Embed*, Tab to Cancel, press Enter — the embed remains. Walked on the locally served
chain tip. The fix lands at every member of the class (mirrors the existing per-dialog hook; no shared helper
exists to fix once — `grep` above).

### M4 — Send page and webhook menu (website): F-16, F-17, F-18, F-27

- **M4-a (F-16)** — while a send is pending, Send is disabled, so any number of presses during it produces
  exactly one webhook request; a failed send leaves no unhandled rejection (vitest process exit 0 with the
  failure case in the suite) and re-enables Send.
- **M4-b (F-17)** — "Invalid URL" shows exactly when a non-empty custom URL has finished validating and
  `selectedWebhook` is `null`.
- **M4-c (F-18)** — Clear is enabled whenever a thread is selected (`threadId` non-empty), in both the list and
  the name views.
- **M4-d (F-27)** — the message-id test accepts only a whole-string id or a message URL; a network failure in
  either validation effect is caught and shown, not unhandled; of two overlapping validations only the latest
  input's result is applied.

### M5 — Editor pages and providers (website): F-19–F-26

- **M5-a (F-19)** — after a confirmed Load, the JSON dialog closes on Esc and outside-click, as after a cancelled
  one.
- **M5-b (F-20)** — Copy to Clipboard is disabled whenever Pretty-print is (the draft is not parsable/conforming);
  pressing it never throws.
- **M5-c (F-21)** — the update prompt includes "Any changes you have made will be lost." exactly when the
  composer has unsaved changes at the moment the event arrives. Hash comparison is untouched (X-10).
- **M5-d (F-22)** — the guild dropdown reflects `session.user.guilds` after every session update, without
  remount.
- **M5-e (F-23)** — "Today" is shown exactly when the message date's year, month and day equal today's, both
  copies (`Header.tsx`, `f/[id]/page.tsx` `getDateString`).
- **M5-f (F-24)** — opening Save As proposes the message's current name and server.
- **M5-g (F-25)** — the delete failure toast names the delete.
- **M5-h (F-26)** — a `/preview` link whose `data` is not parsable JSON renders an error state, not a crash.

### M6 — Editor components and markdown (website): F-37, F-38, F-40, F-41, F-42, F-45–F-50

- **M6-a (F-38)** — originating statement: *"Multi-line fenced code blocks never parse in the preview."*
  Property: every fenced block — with or without a language tag, 1 to N content lines — parses as a code block in
  `parseContent`, `parseEmbedField` and `parseEmbedTitle`. Members: the research's three executed strings.
  Human-observable: a two-line code block in the read-only preview renders as a block; also in the `/preview`
  screenshot after M8/production.
- **M6-b (F-40, OQ-B)** — under the recommended answer: a URL is valid exactly when its path's final segment
  ends in a listed extension, case-insensitively, ignoring query and fragment. Members: `.jpeg`, `.PNG`,
  `a.png?ex=1` accepted; `a.png.html` refused.
- **M6-c (F-41)** — in read-only mode an embed with no displayable content and no fields is hidden.
- **M6-d (F-42)** — in read-only mode an edit to field *k* writes field *k*, whichever earlier fields are hidden.
- **M6-e (F-45)** — unmounting `Author` leaves no interval running.
- **M6-f (F-46)** — the picker's default colour is six hex digits for every integer colour.
- **M6-g (F-47)** — the emoji replacer tries longer surrogate sequences before their prefixes.
- **M6-h (F-48)** — `aria-expanded` is true exactly when the spoiler's content is visible.
- **M6-i (F-49, OQ-C)** — under the recommended answer: every duplicate, top-level or nested, inserts the copy
  directly after the original.
- **M6-j (F-50)** — a footer object without `text` renders without throwing.
- **M6-k (F-37)** — `UpsertMapMap.delete(key)` without `innerKey` removes the whole entry for `key`.

### M7 — Bot (website/bot): F-28, F-29, F-30 — turns on D4

- **M7-a (F-28)** — `ADMIN_PERMS` is the string of `ManageGuild` alone (`"32"`); the expected value is a literal.
  **Owner step** (publishes to Discord; no pipeline party runs it): after the website release, `pnpm run
  push-commands` from `website/`, per `package.json`. Human-observable / post-deploy (limb 2): a member holding
  Manage Server and not Administrator sees *Get Message* in a message's context menu; the owner attests with the
  time. Rollback: revert the commit and re-run `push-commands` (owner).
- **M7-b (F-29)** — `setTimestamp(t)` sets the payload's timestamp to `t`.
- **M7-c (F-30)** — `isUserCommand` is true exactly for user commands.

### M8 — preview-image-generator: F-31–F-35 (subject to OQ-E; implementation waits on the analysis)

- **M8-a (F-31)** — window property: PM2's stop must outlast the service's own drain fallback (10 s,
  `shutdown`), and must not delay a reload past what the drain needs. The value is set from the analysis's
  measurement, and the stop signal PM2 actually sends reaches `shutdown`. Criterion: on a reload at the host, the
  app log shows the shutdown line and the process exits by its own path before PM2's kill.
- **M8-b (F-32)** — a `/generate` request with an unparsable body gets 500 and the process keeps serving.
- **M8-c (F-33)** — a page is closed whether the screenshot succeeds or throws; no rejection is unhandled.
- **M8-d (F-34)** — a Chromium launch failure rejects in the pool factory; the next request gets 500, not a
  TypeError.
- **M8-e (F-35)** — with `API_KEY` unset or empty the server refuses to start, with a log line naming the variable.
  `prod.yml` and `preview.yml` both set it, so neither deploy is affected.

No automated coverage (the repo has no runner; declining one here): every branch above is an operator-visible
criterion, verified on the `preview` instance before `prod`. A local run needs `npm ci` (puppeteer downloads a
browser) and a browser launch — both behind a steering go under D2.

### M9 — Release (devops; owner steps named)

- website: the chain branch merges to `master`; the push deploys to Vercel production (owner-approved push).
  Pre-push: `release-move.js website master <sha> --dry-run`.
- preview-image-generator (if OQ-E keeps M8): push to `preview` (beta; deploys the 3001 instance), the M8 checks
  there, then push to `prod` (owner-approved). Gap: `pm2 startOrReload` replaces the running process; previews
  requested during the reload fail and are not retried (the open handoff `preview-image-failure-shows-broken-not-stale`
  names this window; X-11).
- Owner steps: `push-commands` (M7-a); the F-2 check (limb 1, § Validation); the M7-a Discord check (limb 2);
  the pm2 read (limb 3, under OQ-F).

## Testing Strategy

QA Phase 1 runs before implementation (stage set, D6).

The standard is `agent-output/CLAUDE.md` § Test Conventions (`website`): vitest, tests beside the code under
`__tests__/`, spec-form names, DOM tests (`.tsx`) mounted with `createRoot`/`act`, every new test seen red
against a restored mutation, exit code recorded beside counters. Expected types: pure-logic tests for M1, M2,
M6-b/f/g/k, M7; DOM component tests for M3, M4, M5, M6 components. The F-1/F-2 class (Kysely predicates over a
nullable or a possibly-empty list) is covered by compiling the query, as the research's proof did — no database is
reachable here. preview-image-generator has no runner (M8 note). Read instruments per host: website — vitest on
this box (exists); Vercel production — the owner's browser; Discord — the owner's client; PIG preview/prod host —
not on this box (OQ-F). Any agent browser use (UAT, QA) asks steering first (D2).

## Validation

- Planner's run at `7ce866b`, 2026-11-08: vitest 598/598, 54 files, exit 0; `pnpm run typecheck` exit 1, the two
  errors confined to `.next/dev/types/validator.ts` (OQ-A).
- Pre-release walk (owner): the chain tip served locally against `.env.local`, whose database is the live one —
  the precedent of `uat/closed/013-components-v2-editing-surfaces-uat.md` § B.1; writes during the walk land in
  his real account. A Vercel preview of the chain branch is the alternative (the `preview.yml` endpoint
  `hooks-gg-website-git-redesign-hooks-gg.vercel.app` shows branch previews have existed) and points at the same
  database.
- Limb (1), F-2: the owner signs in with an account that administers no server and opens the message list — at
  `7ce866b` (expected failure) and the chain tip (lists his messages); attested with times. Repeated post-deploy
  in production.

## Risks

- **RK-1** — F-38's new regex may match more than Discord does (a lazy cross-line body). Falsifier: a string
  Discord renders as text that the preview renders as a block; checked against Discord's own rule
  (`[^\n][^]*?`, research F-38) by QA.
- **RK-2** — M2 widens what saves. Any consumer reading stored `color`/`footer.text` (statbot, chain 012's `valid`
  column) sees new values. Falsifier: a consumer refusing `color: 0` or a 2048-character footer.
- **RK-3** — M8 is the first PIG deploy since 2023 on a self-hosted runner; the cache key means `npm ci` is
  skipped on a lockfile hit. Falsifier: the preview deploy failing.
- **RK-4** — M7-a's `push-commands` republishes every command, not only `get_message`. Falsifier: a command's
  definition differing after the push.

## Exclusions

| # | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | F-36 (`project-utils/dist/prisma.js`) | Severity 1, harmless unless imported; removal needs a project-utils push and a website lockfile pin move, and `system-architecture.md` D-002 warns committed dist is not cleaned as stray output | Stated limit |
| X-2 | F-44 (component cap) | Needs a ruling on what the editor allows at the cap (OQ-D) | Handoff written at revision 2 unless he includes it |
| X-3 | F-40 / F-43 / F-49, if he declines OQ-B/OQ-C | — | His answer |
| X-4 | M8 entirely, if he declines OQ-E | — | Handoff naming F-31–F-35 |
| X-5 | H-1–H-8 | Out by D6 | Research G-5 |
| X-6 | Research § Findings 7 handoffs | Out by D6 | Each handoff |
| X-7 | RBAC remark | Out by D6 | Stated limit (product direction, no effort) |
| X-8 | Security assessment | Out by D6 | Stated limit |
| X-9 | `website-api-handler-hardening` items 2–5 (trigger fires on M1) | Outside the F-1–F-50 pool (D6); item 4's required-variable change is a release behaviour the owner rules on | That handoff |
| X-10 | `save-originating-tab-raises-its-own-update-prompt` and `unsaved-change-guards-disabled…` (triggers touch M5-c) | M5-c changes only which `hasChanged` value the prompt reads; the hash forms and the guard predicate stay | Those handoffs |
| X-11 | `preview-image-failure-shows-broken-not-stale` (trigger fires on the M9 PIG redeploy) | Website-side nonce fix, outside the pool (D6) | That handoff |

Not triggered (read 2026-11-08): `backfill-valid-guard…`, `components-v2-emptiness…` (M4-a changes only the
in-flight guard, not the validity predicate), `components-v2-invariant…`, `fix-v1-guild-messages-auth-post-deploy`,
`message-init-cached-edits-lost`, `newmessagemodal-persist-gate…`, `v1-guild-messages-endpoints…`.

## Architecture lines this chain touches

- `system-architecture.md` § Components, preview-image-generator: "graceful SIGINT drain" — M8-a may show the
  drain never runs (analysis). `preview-image-generator.md` P-3's shown mechanism ("no build step — the checkout
  is production") disagrees with `prod.yml` (npm ci, build, copy to `deployed/<env>`, pm2 reload) — for the
  architect's conformance pass.

## Entry work (2026-11-08)

- Hooks: `core.hooksPath` unset and no non-sample `.git/hooks` in website and preview-image-generator; no tracked
  build output (`git ls-files` over `dist|build|.next`, 0 each); no `.claude` Stop guard in either repo or the
  workspace root (`ls -a`, `ls -la .claude`).
- Serving refs (`git ls-remote origin`): website `master` 7ce866b (Vercel production; no `.github/workflows`);
  preview-image-generator `prod` 471578f (`prod.yml`), `preview` c233ec4 (`preview.yml`), `master` 87dcb41 — all
  ancestors of `prod`. `release-move.js --dry-run`: website master — every check passed, no workflow;
  preview-image-generator prod — every check passed, sibling `master` on one line. Every remote push is devops's
  act. project-utils: not shipped by this plan (X-1).
- One launch directory serves both repos: `/usr/local/bin/hooks`.

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| — | — | — |
