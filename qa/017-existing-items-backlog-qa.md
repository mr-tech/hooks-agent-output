---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "1ad625e,8de2b53 — repos=website,preview-image-generator; Phase 1 base trees (the plan's surfaces read at these SHAs; the suite and the carried probes ran in an export of website 1ad625e). No verdict is carried at Phase 1."
Status: Awaiting Implementation
Status-Detail: "Phase 1 re-keyed to plan revision 3 (agent-output b3d811e). QAF-1 to QAF-12 resolved; the M5-e oracle re-keyed to form 3's LastModified reference (0 of 3120 violate under OQ-13 option a). Open for the planner: QAF-13 MEDIUM (form 3 with its own object absent from the listing), QAF-14 LOW (B-10's liveness precondition)."
Phase: 1
---

# QA Report: Plan 017 — the existing-items backlog

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 3 (agent-output
`b3d811e`), re-keyed in § "Phase 1 re-key on plan revision 3" (revision 2: § "Phase 1 re-key on plan
revision 2"). The first pass read revision 1
(`97e6814`; the R-4 registration at `d84b192` was read with it and changes no criterion).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-18T23:40 | steering-roadmap (brief `steering/backlog-2026-11-18-briefs/qa-hooks-017.md`) | Phase 1 test strategy on revision 1 | Phase 1. Strategy over M1–M7. Base suite re-derived in an export. AN-1 and AN-2 probes re-run at `1ad625e`. M5-e oracle written and mutation-checked. Local sign-in provisioned. G-6 walked. Register B-1 to B-11. Findings QAF-1 to QAF-9 go to `planner-hooks-017`. |
| 2026-11-18T23:45 | steering-roadmap (`steering/017-rulings.md` 23:41Z, `1cb801c`) | Make the B-7 / QAF-9 production-log read under the Standing Default | Phase 1 amendment. Read made, read-only, aggregates only: liveness met by function stderr, not by the tRPC `onError`, which is development-only (my earlier naming was wrong); retention under 1 day. QAF-9 and B-7 amended by reconcile lines. Routing it as owner-needing was my error. Process fact: the capture's README was first written by shell heredoc, outside the record-write rule, then re-written with the Write tool. The stamp gate refused this row's first stamp (typed `23:46`, clock `23:45`). Satisfied by the `date -u` minute in this row and in the three reconcile lines. |
| 2026-11-19T00:11 | planner-hooks-017 (revision 2, agent-output `3d678cc`) | Phase 1 re-key, including the M5-e oracle | Phase 1 re-key. Oracle re-keyed to revision 2: 0 of 3120 interleavings violate; five mutants fire. Revision-1 run frozen beside it. Postgres probe P1–P3 on a throwaway container. QAF-1 to QAF-9 dispositioned (all RESOLVED). New: QAF-10 MEDIUM (stale replaced nonce), QAF-11 LOW (B-7 member outside its query), QAF-12 MEDIUM (dialog renderer and one slot). NM-22 to NM-25; EC-1 and EC-2; B-7 amended. |
| 2026-11-19T00:22 | planner-hooks-017 (revision 3, agent-output `b3d811e`) | Phase 1 re-key, including the oracle's age reference | Phase 1 re-key. QAF-10 to QAF-12 resolved; EC-1 withdrawn. Oracle re-keyed to form 3's LastModified reference: option a 0/3120 violating, option b's stated limit counted; the revision-2 model is frozen. New: QAF-13 MEDIUM (absent reference), QAF-14 LOW (B-10 liveness); NM-26 to NM-28; B-7 and B-10 amended. |

## Inputs read

- Plan revision 1 in full; analysis `analysis/017-existing-items-backlog-analysis.md` (AN-1 to AN-4);
  `steering/017-rulings.md` blocks 23:24Z and 23:26Z; the brief's common part
  `steering/017-brief-common.md` (its hazard analysis 1–7); handoffs
  `bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md`,
  `editor-error-lines-render-text-unasserted-2026-11-11.md` and
  `qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md`.
- Architecture: the plan's own Architectural-Surface field cites `system-architecture.md` Runtime
  Flow 3, `preview-image-generator.md` P-5, P-6 and A-1, and `website.md` A-6. This pass read the
  mechanisms those lines describe at source (below). It did not read the architecture files
  themselves, so it cites none of their text. The architect's conformance pass runs on the same
  revision in parallel.
- Roadmap: not cited (workspace memory, `roadmap-no-mention.md`).
- Handoff `qa-014-bc7-…` (Review-Trigger "when QA next runs in this record") fired. Item 1 was
  discharged by QA on 2026-11-11. Items 2 and 3 are not QA's (analyst; record vocabulary). Nothing
  QA's is left there, so this pass writes nothing to it.

## Premises re-derived at the base (each a capture under `verification/017/qa-phase1/`)

| Premise | Result | Instrument |
|---|---|---|
| Suite at website `1ad625e` | 1508/1508 passed, 123 files, **exit 0**. Identical to the planner's capture by path membership and by per-file (fullName, status) pairs. | Export of `1ad625e`, own frozen install, `unshare -rn npx vitest run --reporter=json` → `base-1ad625e/`; compared in python against `entry/base-1ad625e/vitest.json` |
| AN-1 carried instrument at `1ad625e` | 25+7 cases, exit 0. Rows identical to `rows-395510e.json` on every computed field. Notice raised only by the outside-class member, in both orders. | `carried-probes-1ad625e/` |
| AN-2 carried instrument at `1ad625e` | Rows byte-identical to `rows-395510e.json` | same |
| Chain surfaces unchanged `395510e`→`1ad625e` | `git diff --stat 395510e 1ad625e` over `src/providers`, `withLocalStorage.ts`, `utils/hooks`, `shared.ts`, `deleteMessagePreviewImages.ts`, `DiscordMessageEditor/index.tsx`, `_navigation`, `SessionProvider.tsx`, `StyledLink.tsx`: empty. `git diff --quiet` on the editor index: exit 0. | git |
| Generator `prod` | `8de2b53` (`git rev-parse origin/prod`) | git |
| Local database for walks | `uat-local-stack.sh up`: schema pushed, next id 900000000000001, 9 tables. Torn down at the end of the pass. | `local-stack-up.txt`, `local-stack-down.txt` |
| **Local sign-in (plan M3 "The provision is attempted at QA Phase 1")** | **Provisioned.** A dev server of the export on `127.0.0.1:3000`. "Log in" led to Discord's authorize screen for the Hooks.gg app, which accepts `redirect_uri=http://127.0.0.1:3000/api/auth/callback/discord`. After Authorize, `/api/auth/session` returned `signedIn: true` (a boolean; the session contents were not printed). Local walks of M3-a and M3-b can therefore sign in, and the production fallback is not needed. | this session's browser (one look), `.env.local` key names and hosts only |
| `.env.local` hosts (key names, hosts and ports only) | `DATABASE_URL` → 127.0.0.1:5432. `PREVIEW_IMAGE_URL` → 127.0.0.1:3002. `NEXTAUTH_URL` → 127.0.0.1:3000. `REDISHOST` → 127.0.0.1, which answered PING (not this pass's server). **`CDN_ENDPOINT` → `nyc3.digitaloceanspaces.com`**, a real bucket host. `NODE_ENV=development`. | python read printing hostname and port only |
| **G-6 (M4-c red check)** | **Verified at `1ad625e`, signed in.** With unsaved edits (the editor showed its save button), clicking the in-app link to `/message/f/0` showed no dialog and navigated. The walk did this twice. A planted `confirm('qa control dialog')` was reported by the same tool in the same session, so the instrument can see a dialog. | browser-walker, `g6-walk/` |

## Test Strategy (Pre-Implementation)

The standard is `agent-output/CLAUDE.md` § Test Conventions, cited, not restated. Every run counts
only with exit 0 beside the counters, and `pnpm run typecheck` covers both programs. The class of
each criterion is enumerated below with its population at the base, measured.

### M1 — hygiene

- **M1-a.** Population: 4 files, each present at `1ad625e` (`git cat-file -e`). Blobs: `messageStore.dropped-set-report`
  `c91a7d8…` (1 case), `messageValidity.predicate` `9d5ce5a…` (11), `useApiMethods.json-editor-repair`
  `18c7033…` (7), `usePusher.hash-parity` `94938db…` (6), counts from `base-1ad625e/vitest.json`. None of the
  target directories holds a same-named file (`git ls-tree`). Evidence owed: the rename row's evidence
  (per-file case count and pass set, both trees, by path membership) and blob identity
  (`git rev-parse`).
- **M1-b.** Population: `git grep -n enforceImportMutualExclusivity 1ad625e -- src` finds one
  definition (`src/utils/index.ts`, `export function enforceImportMutualExclusivity`) and 18 lines in
  `limits.import-validation.test.ts`. That file has 33 cases at base, 14 under the
  `enforceImportMutualExclusivity` describe and 19 others (by `fullName` prefix from the base JSON).
  At the tip the file holds those 19, by title, all passing. The covering test is
  `messageMode.detection.test.ts`, mutation-checked once (the Superseded-implementation row).
- **M1-c.** Population: the five error symbols, each rendered in `DiscordMessageEditor/index.tsx` at
  `1ad625e` (`grep -c`: `noContentError` 3, `embedCharacterError` 4, `v2TextError` 4,
  `componentCountError` 4, `v2ComponentError` 4). The kill table's five surviving mutants
  (`index.tsx:298:>`, `347:>`, `348:>`, `348:>:2`, `349:>`) all sit in the accessories container and
  the `v2ComponentError` line, so four of the five members have no red from the kill table (QAF-7).
  QA's named mutants NM-1 supply it. Existing editor tests to tighten first:
  `DiscordMessageEditor.component-limit` (33 cases) and `.duplicate-placement` (2).

### M2 — the saving tab's own save

- Class: AN-1's 12 members × 2 delivery orders, carried. Re-run at `1ad625e`: no notice, except the
  outside-class member, which raises it (above). The red for M2-a's pinned absence is AN-1 at
  `a74b9e2`. Phase 2 re-runs it against the carried instrument.
- **Coverage obligation, M2-c's compound predicate.** "Hash equals neither T's current content nor
  any payload T has sent and not yet seen broadcast" has three conjuncts. Each carries the decision
  alone in at least one fixture:
  1. equal to the current content and to no outstanding payload: no notice (another tab saved what
     T already shows);
  2. equal to an outstanding payload and not to the current content: no notice (M2-b);
  3. equal to a payload T sent **and has already seen broadcast**, not to the current content:
     **notice**. T saves P and receives P's broadcast, edits to Q, then another tab saves P (NM-4).
- Multiplicity: two sends of identical content P, an edit typed after the second, then both
  broadcasts arrive. Expected: no notice (NM-3). Per-send records: two saves in flight, then the
  first broadcast arrives after the second send. Expected: no notice (NM-2).
- Existing test to tighten first: `usePusher.update-prompt.test.tsx`. It has 4 cases at base, all on
  the loss sentence (`hasChangedRef`), none on own-save recognition.
- G-4 (real Pusher delivery to the sender) stays out of the suite. B-1's local two-tab walk
  publishes through the real Pusher app and observes it (Assumption Not Checked, below).

### M3 — the stored draft

- Class: AN-2's S2, S3 and S5 rows, red at `1ad625e` (`carried-probes-1ad625e/an2-rows-1ad625e.json`).
  M3-c's decision table has 4 rows and is run whole.
- **Shared-code reach (QAF-6).** M3 says the change is made once in `withLocalStorage` /
  `useLocalStorage`. At `1ad625e` that code serves five keys: `theme`, `message`,
  `frequentlyUsedEmojis` and `client_preferences` (`useLocalStorage.ts`), plus the list-view
  preferences read through `localStorage.current` / `.update` in `message/page.tsx` and
  `message/f/[id]/page.tsx`. `app/layout.tsx` also reads `localStorage.theme` raw, with no JSON
  parse (`git grep -n "localStorage\." 1ad625e -- src`). M3-e's members cover `message` only.
- M3-d: `hasChanged` over the three statuses × {differs, equal}, 6 cells. Each status is the sole
  carrier in at least one cell (NM-7).

### M4 — links away from the editor

- Population at `1ad625e`: the `next/link` importers are `StyledLink.tsx` and `m/[id]/_layout/Navigation.tsx`.
  `StyledLink` has 11 importer files (`git grep -l`). Links in the editor-route tree
  (`git grep -n "href="` over `m/[id]`, `message/_layout`, `DiscordMessageEditor`): Header's links to
  other messages' `/edit` (to prompt) and to the current one (M4-b, no prompt); Sidebar's `/`,
  `/message`, `/message/f/<guild>`, `/message/f/0`, `/message/m/0/edit` and `/legal/*`. Two are
  raw `href={url}` anchors in the preview (`EmbedAuthor.tsx`, `EmbedTitle.tsx`) and not `next/link`;
  the enumerator table dispositions them (QAF-8).
- The walk saw only `/message/f/0` and `/message/m/<id>/send` as `/message…` links on the edit page
  (`g6-walk/step6-field-and-links.json`). M4's human-observable "click 'Messages' in the header"
  names a link the walk did not find (QAF-8).
- `next/router` in production source: one hit, `useUnloadAlert.ts` (`git grep -n`). M4-c's red is
  now Verified (G-6).
- Coverage: pointer click and `detail: 0` click are each a sole carrier (NM-9). The same-message
  test is exact on the id, not a prefix (NM-8).

### M5 — the website's continuation

- Call sites reaching `upsertMessage` at `1ad625e`: tRPC `message.upsert` (guild and user branches,
  `routers/message.ts`), reached from `useApiMethods.ts` `persist`, `NewMessageModal.tsx`,
  `SaveAsMenu.tsx`, `m/new/page.tsx` (×2) and `f/[id]/page.tsx`. Today `postMessagePreviewImage`
  is started with `void` at two points: before the upsert for an existing id, after it for a new one.
  `upsertMessage` writes `previewImageNonce` at upsert time today (`buildMessageValues`,
  `buildUpsertMessageQuery`'s `doUpdateSet`), so M5-a needs that write removed.
- Other writers of the row: `updateRecentMessageData` (`shared.ts`; it sets no `updatedAt` or
  nonce) and `backfillValid.ts` (`valid` only), by `git grep -n "updateTable('Messages')"`. The
  delete route (`routers/message.ts`) calls `deleteMessagePreviewImages`, which lists
  `${NODE_ENV==='development'?'dev/':''}previews/<id>/` (trailing slash present) and deletes the
  objects it finds.
- **M5-e oracle (written here, as the plan assigns):** `verification/017/m5-decision-table/`. 82
  interleavings over 9 class pairs. Read literally, the plan's rules hold E1 (the right nonce)
  everywhere. They break B (the committed object exists) in 3 `ok`×`ok` interleavings and E2 in 1
  more, plus the late-write residue (QAF-1, QAF-2). Three oracle mutants each change its verdict
  (`mutation-checks.txt`). The implementer's tests read the oracle **after** the planner revises
  M5-a/M5-c and QA re-keys the oracle to the revision.
- Outcome classes (M5's list, 6) × the limb each class reaches: every class has a fixture in which
  it alone decides M5-a, M5-f's line text and the timer. A 404 and a 500 are distinct classes in
  the log line (NM-10, NM-15, NM-16).
- **Hazard 3 (save latency)** is a preserved behaviour: "the save's response is unchanged". The
  assertion owed: the save's response resolves while the generator's answer is still pending
  (NM-17).
- **M5-f's readable server line (the plan asks QA to name one).** At source, the existing server
  log emitters in the save's function are `src/pages/api/trpc/[trpc].ts` (the tRPC handler's
  `console.error`, which runs in the same function as the continuation) and
  `src/server/api/utils/guild.ts` (two `console.error`). Others are in `pages/api/messages/codes/[code].ts`
  and `pages/api/v1/guilds/…`. All were found by `git grep -n "console\.(error|log|warn|info)"` over
  `src/server src/pages/api`. **Whether any of them is readable in Vercel's runtime logs today was
  not established.** That needs a read of production's runtime logs, which is outside D-10's one
  selected read. It goes to steering as an owner-needing item, and B-7 carries it.
  *Reconcile 2026-11-18T23:45Z:* two corrections. (1) The tRPC `onError` logs only when
  `NODE_ENV === 'development'`, so it is not a production emitter; naming it was my error. (2) The
  read was made, under steering's 23:41Z ruling (a Standing Default, not an owner item): a function's
  stderr lines are readable in production runtime logs, `/api/trpc/message.get` included (14 records),
  and retention is under a day. `verification/017/qa-phase1/vercel-runtime-logs/`.

### M6 — the generator (no suite; probe)

- Members of M6-a at `8de2b53`: `generateImage.ts` default export runs the render and
  `deleteMessagePreviewImages` under `Promise.all`, then `PutObjectCommand`. `server.ts`
  `processImage` answers 204 after `generateImage` resolves and 500 on a reject. The body-parse 500
  and the 404 (key, path, method) are unchanged. `page.goto` may also resolve to `null`; NM-18
  covers that.
- Probe: loopback S3 stub plus a stub `/preview` answering 200, 404, 500, a hang past puppeteer's
  30 s timeout and a reset. Infrastructure is below.

### M7 — lint

- Instrument: the planner's two commands, at the tip and at `1ad625e`, compared per file and per
  rule. The base capture exists at `verification/017/entry/lint-1ad625e/` (planner's). It is run
  again at the tip in an export, never in the shared tree.

### Testing Infrastructure Requirements

- TESTING INFRASTRUCTURE NEEDED: an export install for every run before the chain branch is cut,
  with real `node_modules`. Turbopack refuses a symlinked `node_modules`
  (`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 1). This pass's export
  shows the form works.
- TESTING INFRASTRUCTURE NEEDED: `@vercel/functions` (M5), added as the plan's lockfile step. The
  M5 Node tests substitute `waitUntil` with a capture that records the promise and lets the test
  settle it. A real platform run is M5-0's.
- TESTING INFRASTRUCTURE NEEDED: **an S3 stub for every local walk that saves after M5 lands.**
  `.env.local`'s `CDN_ENDPOINT` is a real DigitalOcean Spaces host. With `NODE_ENV=development`, the
  website's new deletion would list and delete under `dev/previews/<id>/` in that bucket. The walk
  brief points `CDN_ENDPOINT` at a loopback stub, set explicitly in the process environment and
  checked on the stub's request log. The precedent is `verification/015/m8-local-probe/`, which
  this pass did not re-read.
- TESTING INFRASTRUCTURE NEEDED: the M6 probe rig under `verification/017/m6-probe/`: node, the
  generator's own `npm ci` from `package-lock.json` in an export of the chain tip, a loopback S3 stub
  and a stub `/preview`. It runs network-isolated (`unshare -rn` with loopback raised), puppeteer's
  Chrome included.
- Environments probed for reachability: local Postgres (the tool, above); local Redis 127.0.0.1:6379
  answered PING (not this pass's, held); Discord OAuth to loopback (accepted). Vercel preview
  logs (M5-0) and production runtime logs (M5-f) were not probed (owner-needing, above).

### Telemetry Validation (M5-f, D-8)

- Normal level: one line per non-204 outcome naming the message id, the outcome class (one of six
  literals) and the elapsed ms. Tests assert the structured fields — id, class literal, an integer
  ms — and the line count per save (exactly one). They do not assert full message text. They
  assert the line holds no nonce, no message content and no key: a redaction assertion on a
  planted nonce and a planted key, booleans only.
- Debug: none planned. AN-1's recommended client debug line for the notice is not in scope (D-6).

### Named mutants

One line each: the behaviour, the wrong change, its criterion. The implementer runs each against
the code as built. Each stays in QA's Phase 2 sweeps.

- NM-1 — each of `noContentError`, `embedCharacterError`, `v2TextError`, `componentCountError`: a
  literal character inserted beside the error line's text inside its `NullableComponent` — M1-c.
- NM-2 — the own-save record keeps only the latest send, so an earlier in-flight save's broadcast
  raises the notice — M2-b.
- NM-3 — the records are a set, not per-send, so of two identical saves the second broadcast finds
  no record — M2-b.
- NM-4 — a record is not removed when its broadcast arrives, so a later remote save of that content
  is suppressed while T has diverged — M2-c.
- NM-5 — the compare checks only the outstanding payloads and drops the current-content clause —
  M2-a, M2-c.
- NM-6 — the storage change re-encodes keys other than `message` (`theme` read raw by
  `app/layout.tsx`; `client_preferences`, `frequentlyUsedEmojis`) — M3 (QAF-6).
- NM-7 — `hasChanged` keeps a session condition for one status (`loading`) — M3-d.
- NM-8 — "same message" is tested by a path prefix, so `/message/m/1/edit` counts as the same
  message as `/message/m/12/edit` — M4-b.
- NM-9 — the guard runs on pointer clicks only (`detail > 0`) — M4-a.
- NM-10 — any resolved fetch commits: the status is not checked, so a 404 or 500 commits the nonce —
  M5-a.
- NM-11 — the later-save check is dropped, so the commit is unconditional (oracle
  `M-commit-unconditional`) — M5-a, M5-e.
- NM-12 — the delete runs before the commit, or includes the committed object — M5-b, M5-c.
- NM-13 — the deletion prefix loses its trailing slash, so listing `previews/12` also returns
  message 123's objects — M5-c. This mutant is irreversible in production.
- NM-14 — the deleter computes the `dev/` prefix from a different predicate than the generator's
  writer — M5-b, M5-c (QAF-4).
- NM-15 — the failure line carries the nonce, the content or the key, or a line is written on 204 —
  M5-f.
- NM-16 — the T timer is not cleared, so "no answer within T" is logged after a 204, or a timeout
  writes two lines (timeout plus abort) — M5-f.
- NM-17 — the continuation is awaited before the response, so the save waits for the generator —
  M5-a "response unchanged", hazard 3.
- NM-18 — M6-a's status check accepts 300 or a `null` response from `goto` — M6-a.
- NM-19 — the generator's `deleteMessagePreviewImages` stays in `Promise.all` — M6-b.
- NM-20 — the generator answers 204 before the put resolves — M6-a.
- NM-21 — the commit is an insert-or-update, so a continuation that finishes after the message was
  deleted brings the row back — M5-a (QAF-5).

## Irreversible Side-Effect Register

Enumerated by effect, meaning I/O that leaves the process. `UNVERIFIED` marks a cell that no read
established.

| E | Effect (path, symbol) | Must be true first | Routes that trigger it; is the ordering the same on each? | Reversible? |
|---|---|---|---|---|
| E-1 | **Bucket delete by the website** (new, M5-c). Today's sibling is `server/api/utils/deleteMessagePreviewImages.ts` default export (`ListObjectsCommand` with prefix `…previews/<id>/`, trailing slash, then `DeleteObjectsCommand`) | This save's 204 was processed and its commit landed. The listing is exact to `<id>/`. The committed object and every in-flight later save's object are excluded (QAF-1). The prefix predicate equals the generator's (QAF-4). | The `upsertMessage` continuation on every save route (one function; the 7 client sites above). The message-delete route is unchanged. Same ordering on every save route by construction, since one function serves them. To verify at Phase 2. | No, unless the bucket has versioning: `UNVERIFIED` |
| E-2 | Row write of `previewImageNonce` (new, the M5-a commit) | 204 processed; no later-upserted save committed (needs a comparand, QAF-3); the row still exists, so there is no insert (QAF-5) | `upsertMessage` continuation | A later save overwrites it. The object it names may already be gone (E-1). |
| E-3 | Generator `PutObjectCommand`, `public-read` (`generateImage.ts` default export) | Render resolved and its main resource answered 2xx (M6-a) | `/generate` only | Overwritten or deleted by E-1 |
| E-4 | Generator deletion **removed** (M6-b): `deleteMessagePreviewImages` in `generateImage.ts` | The website release (E-1) is live first (Release order) | — | Leak window if the order inverts (the plan states it) |
| E-5 | Production deploys: website `master` push (Vercel git integration; no workflow file, per steering 23:24Z) and generator `prod` push (`prod.yml`), which restarts the generator process | His word; devops | Release consequence: devops's to establish (this pass read neither workflow) | Revert and redeploy; a restart is not reversible (RK-6, drain handoff) |
| E-6 | M5-0's **Vercel preview deployment** | His approval of the push (D-15) | A branch push | What the preview deployment's environment connects to (database, Pusher, bucket, and whether crons run on a preview): `UNVERIFIED`, devops's to establish before the push |
| E-7 | **Users' browser storage rewrite** (M3) | M3-e: everything readable at `1ad625e` is carried. Keys other than `message` are untouched (QAF-6). | Every editor load after deploy | No. A revert keeps only M3-f's guarantee. |
| E-8 | Vercel runtime log line (M5-f) | It carries no nonce, content or key | The continuation | Log retention is out of our control |
| E-9 | **Local walks**: a save publishes to the Pusher app in `.env.local` (existing rule). After M5, the local website also **deletes in the real Spaces bucket** under `dev/previews/<id>/`. | The ids are moved past 900000000000001 (the tool does it). `CDN_ENDPOINT` points at a stub (infrastructure above). | UAT walks B-1 to B-4 | Pusher: none. Bucket: see E-1. |

This register is handed to the implementer as input. E-1, E-2 and E-7 are the guards the
effort-final sweep is seeded at.

## Blocking-condition register (chain 017)

The chain's one register. Later passes append rows here. The UAT document, then the deployment
record, are authoritative on each row's execution state once written; this table is point-in-time.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | M2 human-observable form (M2-b, M2-c) | UAT stage browser, two tabs on one message, local stack, real Pusher. The walk fires `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md` and records the first save's id and the count of ids below 900000000000001. | uat; sign-in shown to work locally (this pass) | M2 landed on the chain branch; local stack up with the S3 stub (E-9) | Tab 1, which saved and kept typing, shows no "Message Update Detected"; tab 2 shows it | If tab 1 still shows it, item 3 is not fixed for the case that is live. If tab 2 does not, the fix has silenced the cross-tab protection (hazard 4). | uat | the chain's UAT document (pass to be briefed) | open |
| B-2 | observable pre-release | M3-a and M3-b human-observable | UAT browser on the local stack, signed in through Discord to loopback | uat | M3 landed | The signed-out draft is there after sign-in → open message → back. Message *n*'s unsaved edits are back after the forced sign-out. | If the draft is gone, item 4's main loss is not fixed | uat | UAT document | open |
| B-3 | observable pre-release | M4 human-observable | UAT browser, local stack: with unsaved edits, click a link away from the editor that the page renders (QAF-8). Cancel, then confirm. | uat | M4 landed | A confirmation appears. Cancel keeps the edits; confirm navigates. | If the click navigates without asking, M4 is unfixed (G-6 shows that today) | uat | UAT document | open |
| B-4 | observable pre-release | M5 human-observable | UAT browser, local stack, local generator from the chain tip, loopback S3 stub | uat | M5 and M6 landed | Generator stopped: the old preview still shows after a save. Generator running: the new one shows. | If the image breaks, item 2 is unfixed | uat | UAT document | open |
| B-5 | observable pre-release | M5-0 limb 2 (`waitUntil` from a Pages API route), with the run without `waitUntil` beside it | the preview deployment's runtime logs | devops; push behind his approval (D-15) | Before M5 code | The line appears with `waitUntil`; H-2's run is recorded beside it | If it is absent, M5 and M6 stop and go to him with the fallback (D-15) | devops | devops's M5-0 record under `verification/017/m5-0/` | open |
| B-6 | post-deploy-observable | RK-1, in his terms: after the website and generator deploys, he edits and saves one of his messages and looks at its preview in the message list | his look | owner | Both deploys live; the running-code precondition B-11 passed | The preview shows the new edit within a minute | If it still shows the old one, post-response work is not running in production (RK-1) | owner | carrier handoff created by devops at Stage 1 | open |
| B-7 | post-deploy-observable | D-8's failure line is readable in production | Vercel runtime logs for the production deployment, read by devops | devops | Website deploy live. **Liveness precondition:** one existing server line (the tRPC `onError` `console.error` in `pages/api/trpc/[trpc].ts`) shown readable first. Not yet established; owner-needing (above). *Reconcile 2026-11-18T23:45Z:* liveness **met** by a different line. The tRPC `onError` is development-only. Function stderr is readable in production, 14 records on `/api/trpc/message.get` in 23 h (`qa-phase1/vercel-runtime-logs/`). Retention is under one day, so the reader runs at least daily, as a crontab reader installed by devops at Stage 1. The count command is `npx vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg -e production -s 23h --json -q '<D-8 fixed prefix>'`, with the existing `/api/auth/session` cold-start lines as its negative control. | At AN-4's rate (15 non-successes in 16847 requests; 196 generations in 30 days), the expected count of failure lines is about 0.17 per 30 days. **A zero is evidence of nothing.** This row is a health check. The fixed-versus-unfixed distinction for item 2 is B-4, pre-release. | If no failure line can be read even under a planted failure, D-8's countability is not delivered | devops | carrier handoff (Stage 1) | open |
| B-8 | post-deploy-observable | His BC-14 report, in his terms: two tabs on one message in production; in tab 1 he saves and keeps typing at once | his look | owner | Website deploy live; B-11 | Tab 1 shows no "Message Update Detected"; tab 2 shows it. Unfixed production shows it in tab 1 (AN-1 outside-class member, verified at hook level), so this row distinguishes fixed from unfixed. | If tab 1 shows it, his report stands | owner | carrier handoff (Stage 1) | open |
| B-9 | post-deploy-observable | His M3 and M4 look in production (the plan's "in production by him") | his look | owner | Website deploy live; B-11 | As B-2 and B-3 | As B-2 and B-3 | owner | carrier handoff (Stage 1) | open |
| B-10 | post-deploy-observable | RK-7: the generator's failure-stack count after release, against AN-4's 15 | `verification/015/pig-host-read.sh` shapes plus AN-4's count script, over `ssh hooks-pig` | devops | Generator deploy live, plus 30 days of traffic (about 196 generations) | About 0.2 new stacks per 30 days at the old rate. A rise names stored messages whose `/preview` now answers an error status. | Stored messages stop re-imaging and stay stale | devops | carrier handoff (Stage 1) | open |
| B-11 | post-deploy-observable | Running-code precondition for B-6 to B-9: production's deployment contains the release commit | `vercel inspect https://hooks.gg` (commit) with `merge-base --is-ancestor`; the generator host's start line after the `prod.yml` run | devops | Each deploy | Containment exit 0; a generator start after the push | If it is not contained, B-6 to B-9 read old code | devops | deployment record | open |

G-6 (M4-c's browser red) was executed in this pass and is not a row: `g6-walk/`, result above.

## Findings (Phase 1, to `planner-hooks-017`)

QAF-1 HIGH Phase 1 — **M5-c's deletion rule lets an earlier save delete a later save's image,
which that later save then commits.** The trigger is two successful saves of one message where s1's
"delete everything except my committed object" runs after the generator has stored s2's object and
before s2 commits. s2 then commits a nonce whose object is gone, and the user sees a broken image,
the defect item 2 exists to remove. The oracle shows it in 3 of 20 `ok`×`ok` interleavings
(`[W1 C1 W2 D1 C2 D2]` and two more). The plan's M5-e table (which answer first × each answer's
class) cannot represent the write-versus-delete ordering, so a test built from it cannot fail under
this defect. Asked: a deletion rule that excludes later-upserted saves' objects (it needs QAF-3's
comparand), and M5-e's table dimensioned on write/commit/delete order. Instrument:
`verification/017/m5-decision-table/`.

QAF-2 MEDIUM Phase 1 — **M5-e's "the prefix ends holding exactly that object" is false in rows
M5-c does not bound.** (a) Two successful saves where s2 commits first and s1's object lands
afterwards: s1 skips its commit, and nothing deletes its object (oracle `[W2 C2 D2 W1 C1 D1]`).
(b) A `no answer within T` continuation whose render later succeeds leaves an object. RK-2 and M5-c
bound only "a continuation the platform ended". Each is removed only at the message's next
completed commit. Asked: state both as members of the bounded residue, or have the losing save
delete its own object.

QAF-3 MEDIUM Phase 1 — **M5-a's "no save of *m* upserted after *s* has committed its own" names no
comparand.** The row has no ordering column apart from `updatedAt` (`project-utils` `749606d`
`prisma/schema.prisma`, `model Message`), which `buildMessageValues` sets per invocation from that
lambda's clock (`new Date()`). X-5 excludes a schema change. A compare-and-swap on the previous
nonce gives the wrong answer: s1 answers first and commits, then s2's swap fails. The entry
condition, as a probe shape: name the comparand, and show it exists and orders saves on the commit
path, including ties and two instances' clocks, before any M5-a fixture is built.

QAF-4 MEDIUM Phase 1 — **The object prefix is computed by three predicates in two repositories,
and M5 moves deletion across that seam.** The website's deleter uses `env.NODE_ENV === 'development'
? 'dev/'` (`deleteMessagePreviewImages.ts`). The website's reader uses `process.env.NODE_ENV` →
`/dev` (`getCDNUrl.ts`). The generator's writer uses `config.ENV === 'development'`
(`generateImage.ts`, `config.ts`). M5-b and M5-c name only `previews/<m>/`. Once the website
deletes what the generator wrote, a disagreement leaks objects or deletes under the wrong prefix.
Asked: a criterion that the deleter's prefix equals the writer's, per environment. The plan asks
whether the cross-repo-contract skill applies: its Shared Types rule does, since this prefix and
the meaning of 204 are a contract the two repositories each re-implement (the skill's text, read
this pass).

QAF-5 MEDIUM Phase 1 — **There is no limb for a message deleted while a save's continuation is
pending.** The delete route purges `previews/<id>/` and removes the row. A continuation that
finishes afterwards either brings the row back, if the commit is an insert-or-update (NM-21), or
leaves an object the generator wrote after the purge. The message has no "next commit", so that
object is permanent. Asked: a member in M5-a and M5-c, or a stated residue.

QAF-6 MEDIUM Phase 1 — **M3-e's carried-store members cover the `message` key only, but M3 puts the
change in shared code that serves every key.** The keys are `theme` (read raw, without a JSON parse,
by `app/layout.tsx`), `frequentlyUsedEmojis`, `client_preferences` and the list-view preferences in
`message/page.tsx` and `f/[id]/page.tsx`. Each is a behaviour the change relies on preserving, and
nothing asserts it, so this meets the severity floor. Asked: M3-e members for each key, with a
literal stored string per key.

QAF-7 LOW Phase 1 — **M1-c's red for four of its five members does not come from the kill table.**
The five surviving mutants it names are all at `index.tsx` lines 298 and 347–349 at `395510e`, in
the accessories container and the `v2ComponentError` line. NM-1 supplies a mutant for each of the
other four. Asked: M1-c cites NM-1 beside the kill table.

QAF-8 LOW Phase 1 — **M4's enumerator and human-observable need two edits.** (a) The raw
`href={url}` anchors in `EmbedAuthor.tsx` and `EmbedTitle.tsx` are not `next/link` importers, so
the enumerator's table needs a row disposition for them (external link, a hard navigation, or out
of the class). (b) The human-observable "click 'Messages' in the header" names a link the walk did
not find on the edit page at `1ad625e`. The page's `/message…` links were `/message/f/0` (an unnamed
header link) and the current message's `/send` (`g6-walk/step6-field-and-links.json`). Asked: name
a link the page renders.

QAF-9 INFO Phase 1 — **M5-f's readable precedent is named at source and not shown readable.** The
plan asks this phase for an existing server line readable today, or a statement that none exists.
The candidate is the tRPC `onError` `console.error` in `pages/api/trpc/[trpc].ts`. Its readability
in Vercel's runtime logs, and the retention window a post-deploy read must fall inside, need a read
of production logs beyond D-10. That read goes to steering as an owner-needing item, and B-7 is
held on it.
*Reconcile 2026-11-18T23:45Z (QAF-9 restated):* steering's ruling (`steering/017-rulings.md`
23:41Z) holds this read under the Standing Default, so it was made, not asked; the owner-needing
routing was my error. Result (`verification/017/qa-phase1/vercel-runtime-logs/`): **the precedent
exists, but it is not the line named above.** That tRPC `onError` is development-only. The readable
precedent is the function's stderr: 246 production records in the last 23 h, 14 on
`/api/trpc/message.get`. Two consequences for the planner. (a) Retention is under one day (`-s 1d`
refused by the Pro plan, `-s 23h` served), so a post-deploy count of D-8's line is read at least
daily. (b) About 240 error-level stderr lines a day are already there (mostly `/api/auth/session`
cold-start `EROFS`/`ENOENT`/`[PM2][Initialization]` lines), so D-8's line needs a fixed, unique
prefix that a query selects on; `level:error` would count noise. Asked: M5-f names that prefix.

Not findings, recorded:
- M2's records are cleared only on receipt, so they grow with every save Pusher never delivers.
  The plan states the suppression residue (RK-3). The growth is bounded by the tab's saves.
- Handoff `bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md` item 3 (only the website calls
  `/generate`) bears on M6-b: objects written for another caller would now accumulate. Its closing
  instrument is still the owner's knowledge of callers. Item 7 is B-10.

## Phase 1 re-key on plan revision 2 (agent-output `3d678cc`)

Read: the revision as the diff `a3c1e83..3d678cc` over the plan (586 added and 285 removed lines,
`git diff --numstat`). M2, M3, M4, M5 and M6 and § "Gate findings folded" were re-read whole at
`3d678cc`. Before the write, the plan was confirmed unchanged since `3d678cc` (`git diff --quiet
3d678cc HEAD -- planning/…`, exit 0).

### Dispositions of this gate's revision-1 findings, re-derived at the plan text

| Finding | Where revision 2 carries it | Re-derived |
|---|---|---|
| QAF-1 HIGH, QAF-2 MEDIUM, QAF-5 MEDIUM | M5-a (conditional update that never inserts), M5-c (three delete forms, L = 120 s), M5-e (each save's write, answer, commit and deletes, plus a message delete) | **Resolved by execution.** The re-keyed oracle has 0 violating interleavings over 3120 in 36 rows; five mutants each fire. QAF-1 HIGH Phase 1 RESOLVED — M5-c three-form deletion; oracle `m5-decision-table/` (`oracle.mjs` rev 2). QAF-2 MEDIUM Phase 1 RESOLVED — M5-c residue stated over its class (RK-2). QAF-5 MEDIUM Phase 1 RESOLVED — M5-a never inserts; M5-e outcome after a message delete. |
| QAF-3 MEDIUM | M5-a order token: the database clock (`clock_timestamp()` in the upsert's `RETURNING`), nonce `v` + microseconds + 16 hex | **Resolved by execution** on Postgres 16.16 (`pg-order-probe/`, P1, P2). QAF-3 MEDIUM Phase 1 RESOLVED — M5-a; probe P1/P2. The statement that learns the replaced nonce is QAF-10 below. |
| QAF-4 MEDIUM | M5-g key contract | Read: both sides' deciding variables named; the generator's production `ENV` stated as unread (Inference). QAF-4 MEDIUM Phase 1 RESOLVED — M5-g; the production `ENV` read stays open as M5-g states. |
| QAF-6 MEDIUM | M3 storage form (own typed key `messageDrafts`); M3-g for `theme`, `frequentlyUsedEmojis`, `client_preferences` | Read; the keys match `global.d.ts` `LocalStorage` at `1ad625e` (4 members). QAF-6 MEDIUM Phase 1 RESOLVED — M3-g. |
| QAF-7 LOW | M1-c cites NM-1 | Read (plan line "QA's NM-1 supplies a mutant for each of the other four members"). QAF-7 LOW Phase 1 RESOLVED — M1-c. |
| QAF-8 LOW | M4-d class table; M4 human-observable names the user-icon link to `/message/f/0` | Read; `target='_blank'` on both raw anchors re-read (`EmbedAuthor.tsx`, `EmbedTitle.tsx` at `1ad625e`). QAF-8 LOW Phase 1 RESOLVED — M4-d, M4 Human-observable. |
| QAF-9 INFO | M5-f instrument, prefix `preview-image-failure`, B-7 as reader | Read. QAF-9 INFO Phase 1 RESOLVED — M5-f; one remainder is QAF-11 below. |

### New measurements

- **`pg-order-probe/`** (throwaway `postgres:16` container of its own, `--network none`, removed on
  exit; `docker ps -a` after the run: 0). `probe.sh` and its run `run-20261119T0009/result.txt`.
  Server PostgreSQL 16.16; database collation `en_US.utf8`.
  - **P1:** session B's upsert started at 00:09:49.617 and waited on A's row lock. Its `RETURNING
    clock_timestamp()` read 00:09:51.611, above A's 00:09:48.606, so the token orders saves by lock
    order.
  - **P2:** every new nonce sorts above every old 32-hex nonce, and a later time sorts higher. This
    holds under `COLLATE "C"` and under the default `en_US.utf8`.
  - **P3:** with the row at `n0`, session A commits `n1` and holds its transaction. B commits `n2`,
    learning the replaced value in the same statement:
    - `UPDATE … FROM (SELECT prev …)` returned **`n0`, a stale value**;
    - `WITH o AS (SELECT prev … FOR UPDATE) UPDATE … FROM o` returned `n1`, correct.

    The two forms on the same run are the probe's discriminating pair.
- **Revision 2 populations.**
  - M3-g: 4 typed keys (`global.d.ts` `LocalStorage` at `1ad625e`), of which 3 are carried with
    literals. M3's new `messageDrafts` key has no live population (the plan says so; B-2 reads the
    count).
  - M4-d: 7 table rows (the plan's own read). The re-derivation at the tip is the implementer's
    first M4 step. `StyledLink` importers: 11 files (`git grep -l`, `1ad625e`).
  - `useConfirmation` / `ConfirmationProvider` consumers at `1ad625e` (`git grep -n`):
    `JsonModalBody.tsx`, `m/[id]/_layout/Navigation.tsx`, `ConfirmationDialog.tsx`,
    `DiscordMessageEditor/index.tsx` (the `Context`) and `usePusher.ts` (the update prompt). The one
    renderer, `<ConfirmationDialog />`, is mounted only in `m/[id]/edit/page.tsx`.

### Findings on revision 2 (to `planner-hooks-017`)

QAF-10 MEDIUM Phase 1 — **M5-a's "learning in the same statement the nonce it replaced" has a
natural statement form that returns a stale value, and no test planned can tell.** On Postgres 16.16
under a concurrent commit, `UPDATE … FROM (SELECT prev)` returned `n0` where the row had held `n1`.
M5-c form 1 would then delete `n0` (already gone) and leave `n1`, an object of a processed 204, in
the prefix. That breaks M5-c's property: it is removed only by a later sweep at least L after.
`WITH … FOR UPDATE` returned the right value. The M5 Node tests substitute the database
(`helpers/capturingDatabase`), so neither form can fail them. Asked:
- M5-a names the statement's concurrency requirement (the replaced value is read under the row
  lock);
- the Testing Strategy adds a real-Postgres lane for M5-a's two statements, the upsert's token and
  the conditional commit. Its prototype is `pg-order-probe/probe.sh`.

Named mutant NM-22.

QAF-11 LOW Phase 1 — **M5-f names M5-0's probe lines as B-7's first real member, but B-7 queries
production and the probe runs on a preview deployment.** B-7's command is `-e production`, so the
member falls outside its query. Asked: the reader's member check runs the same query shape with
`--deployment <probe URL>` within the retention window, recorded at M5-0. B-7 is amended below.

QAF-12 MEDIUM Phase 1 — **M4-a moves `ConfirmationProvider` but not its renderer, and the move
reaches M2's prompt.**
- (a) `<ConfirmationDialog />` is mounted only in `m/[id]/edit/page.tsx` at `1ad625e`. Moving the
  provider up to `message/layout.tsx` gives the Header and Sidebar on `/send` a context but no
  dialog. M4-b's confirmation on `/send` needs the renderer moved too.
- (b) Once a renderer exists on `/send`, `usePusher`'s "Message Update Detected"
  (`showConfirmation`, which runs on `/send` because `MessageProvider` spans it) becomes visible on
  `/send`. At `1ad625e` it sets the provider's `props` there with nothing rendering them. That is a
  behaviour change on M2's surface that no criterion states.
- (c) The provider holds one `props` slot, and `showConfirmation` overwrites it (`useValue`,
  `setProps`), so the earlier dialog's `onCancel` never runs. A link confirmation and an update
  prompt that open together drop one of them. If the update prompt is dropped, hazard 4's
  protection is lost for that broadcast.

Asked: M4-a names the renderer's placement; a criterion states the update prompt's behaviour on
`/send` at the tip; a member in M2-c or M4-b covers both dialogs open together. The preserved
behaviours (`JsonModalBody`'s and the editor's confirmations through the moved provider) carry an
assertion at M4's tip. This meets the severity floor. Named mutants NM-24 and NM-25.

### Entry conditions (probe shapes, for the implementer)

- EC-1 (M5-c form 3) — show that the bucket listing's HTTP `Date` header is readable through the
  website's own `@aws-sdk/client-s3` client before building the age comparison. The command output
  carries `Contents[].LastModified` and `$metadata`, and this pass found no `Date` in the parsed
  output, so reading it takes a deserialize-step middleware or equivalent. Shown against the loopback
  stub, with the stub's `Date` set to a planted value the test reads back.
- EC-2 (M5-a) — the real-Postgres lane of QAF-10 runs the shipped statements, never copies of them,
  for example by exporting the statement builders and executing their compiled SQL against the
  throwaway instance.

### Named mutants added

- NM-22 — the conditional commit learns the replaced nonce from an unlocked snapshot, returning a
  stale value under a concurrent commit (probe P3's first form) — M5-a, M5-c form 1 (QAF-10).
- NM-23 — the sweep's age is taken from the function's clock, or L is set below the continuation's
  life (60 s), or the age guard is dropped (oracle mutant "sweep without the age guard") — M5-c form 3.
- NM-24 — a modified click (Ctrl/Cmd/Shift or a middle click), which opens a new tab or window and
  does not navigate the current tab, is prompted or blocked — M4-b, M4-d's class.
- NM-25 — a link confirmation and the update prompt opened together: the second silently replaces the
  first — M4-b, M2-c (QAF-12).

### Register amendments

- B-7, reconcile 2026-11-19T00:11Z: the reader's member check runs `npx vercel@66.2.0 logs -p
  hooks-gg-website --scope hooks-gg --deployment <M5-0 probe URL> -s 23h --json -q
  'preview-image-failure'` at M5-0, inside the retention window, and records its count beside the
  production read (QAF-11). Written here, beside the row's earlier text, which stays.
- No other row changes. B-2's subject is unchanged (local sign-in); B-4's rig is now the
  implementer's (M5 Human-observable).

### Assumption Not Checked (this pass)

This pass assumes the hosted production Postgres evaluates `clock_timestamp()` in an upsert's
`RETURNING` after the row lock, and orders `COLLATE "C"`, as the probe's Postgres 16.16 does. The
hosted server's version was not read. The signature of falsity: two saves of one message committing
out of upsert order in production, visible as an older preview after a quick double save. Owner:
devops, at release readiness (read `server_version` on the production database through whatever
read access the release has), named again in the hand-off.

## Phase 1 re-key on plan revision 3 (agent-output `b3d811e`)

Read: the diff `3d678cc..b3d811e` over the plan (220 added and 133 removed lines, `git diff
--numstat`), with M3-d, M4-a, M5-c, M5-f and RK-7 re-read whole. Before the write, the plan was
confirmed unchanged since `b3d811e` (`git diff --quiet`, exit 0).

### Dispositions re-derived

- QAF-10 MEDIUM Phase 1 RESOLVED — M5-a reads the replaced nonce under the row lock; § Testing
  Strategy names the real-Postgres lane (`verification/017/m5-pg/`, the implementer's, re-run by QA
  at Phase 2). The probe form `WITH … FOR UPDATE` is the passing shape (`pg-order-probe/` P3).
- QAF-11 LOW Phase 1 RESOLVED — M5-0 and M5-f read the probe with `--deployment <probe URL>`.
- QAF-12 MEDIUM Phase 1 RESOLVED — M4-a: the guard has its own `ConfirmationProvider` instance and
  `ConfirmationDialog` at `message/layout.tsx`; the editor's stay put, so `/send`'s update prompt is
  unchanged and the two dialogs never share a slot. M4-b carries the both-dialogs member and the
  preservation clause.
- EC-1: withdrawn. M5-c form 3's reference is now the committed object's own `LastModified` in the
  same listing (AF-17), so no header read is needed.

### The oracle, re-keyed (`verification/017/m5-decision-table/`)

`oracle.mjs` now carries `LastModified` values. Old objects are at least L old; every write in one
window lands within 60 s of every other (D-10). Form 3 is keyed to the committing save's own
object's `LastModified`. The revision-2 model is frozen as `oracle-rev2.mjs` with its runs.

- OQ-13 option a (`node oracle.mjs`): **0 of 3120 interleavings violate**, with the reference-absent
  case read as "the sweep deletes nothing".
- OQ-13 option b (`--option-b`, form 3 removed): 220 interleavings flag E3b. Each is an old orphan
  (`z`) left after a commit, which is option b's stated limit, or `n0` present between a later
  save's commit and the earlier save's form-1 delete (transient). No B or E1 violation.
- Mutants (`--mutants`): the five carried ones still fire (312, 1708, 20, 336, 48). A sixth, "the
  sweep with its reference absent deletes every other object", fires on 12 interleavings, each a
  **broken image** (QAF-13).

### Findings on revision 3 (to `planner-hooks-017`)

QAF-13 MEDIUM Phase 1 — **M5-c form 3 does not say what the sweep does when the committed object
is absent from its own listing, and one natural answer deletes the committed image.** The
interleaving is `W1 C1 W2 C2 D2 D1`:
1. s1 commits `n1`.
2. s2 commits `n2` and its form 1 deletes `n1`.
3. s1's form 3 lists the prefix, but its reference `n1` is gone.

A sweep that falls back to "no reference, so everything else is older" deletes `n2`. The row then
names an object that no longer exists, a broken image (oracle mutant, B@D1 in 12 interleavings).
Reading "no reference, so delete nothing" leaves 0 violations. Asked: M5-c form 3 states that a
listing without the committing save's own object deletes nothing. NM-26.

QAF-14 LOW Phase 1 — **B-10 (RK-7) reads "zero over the 30 days is no member observed" with no
liveness precondition.** The count's shape is new (M6-c's `error-status` line, added to
`pig-host-read.sh` in this chain), so a zero is evidence only after two checks:
- the changed script has been seen to count one line of M6-c's exact shape, run locally against a
  fixture as AN-4's scripts were;
- the read region holds the deploy's own lines (a `Generated image` count since the deploy above
  zero).

Asked: RK-7's reader names both. B-10 is amended below.

### Named mutants added

- NM-26 — form 3's sweep, finding no committing object in its listing, deletes every other object
  (or measures against the function's clock instead) — M5-c form 3, M5-b (QAF-13).
- NM-27 — the D-18 suppression keys on `NavMenu`'s button rather than on the act, so the signed-in
  Log out also leaves without its prompt — M3-d's table (Log out row, X-8).
- NM-28 — the D-18 suppression lowers the unload flag and leaves it lowered when the sign-in does
  not leave the page (cancelled or blocked), so a later close or reload loses its prompt — M3-d.

### Register amendments

- B-7, reconcile 2026-11-19T00:22Z: the reader is a crontab line installed by devops at Stage 1. It
  runs every 12 h over 23-hour windows and counts the union of records by record id. Earliest read is
  12 h after the website deploy. Artifact: `verification/017/post-deploy/b7/<UTC stamp>.json` (plan
  M5-f "Reader"). The 00:11Z member check (`--deployment <probe URL>`) stands.
- B-10, reconcile 2026-11-19T00:22Z: reader as RK-7 states. It is a crontab line, earliest 30 days
  after the generator deploy, counting M6-c's `error-status` lines through `pig-host-read.sh`, with
  artifact `verification/017/post-deploy/b10/<UTC stamp>.txt`. Liveness precondition before a zero
  is read: QAF-14's two checks.

### Assumption Not Checked (this pass)

This pass assumes the bucket (DigitalOcean Spaces) reports `LastModified` at the write's completion
on one clock for every object of a prefix, as S3 does, and does not test it. If it is false, two
objects written seconds apart could differ by more than L, and a live save's object would be swept.
That would show as a broken preview right after a save, with the image's object missing from the
bucket. Owner: the implementer, as M5-c's first step against the real bucket's `dev/` prefix, two
puts seconds apart and their listed `LastModified` compared. If that read is not run, devops at
release readiness. Named again in the hand-off.

## Assumption Not Checked

This pass assumes that Pusher delivers a save's broadcast back to the tab that sent it in
production, as the probes model (AN-1 G-4), and does not test it. If it is false, M2's records are
never cleared, every later remote save of the same content is suppressed, and in B-1's walk tab 1
never receives its own broadcast. The owner is UAT, at B-1 (its walk publishes through the real
Pusher app), named again in the hand-off.

## Implementation Review (Post-Implementation)

*Phase 2.*

## Test Execution Results

*Phase 2.*
