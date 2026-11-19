---
ID: 017
Origin: 017
UUID: 5c3e9a71
Verified-At: "7293a35,8512a1d — repos=website,preview-image-generator; plan-level verdict re-issued after M2's fix rounds 3 to 7: the suite, typecheck, M7-b and the closing survivors ran at 7293a35 in git archive exports; M2's sweep of 4b8db9c..24e9be7 is in the M2 document; the generator is unchanged at 8512a1d. Milestone verdicts are in the -m<n>-qa documents at their own SHAs."
Status: QA Complete
Status-Detail: "Plan-level QA Complete at website 7293a35 and generator 8512a1d: M1 to M8 each QA Complete in its own document (M2 at 7293a35); the effort's production diff is swept (1ad625e..4b8db9c at the effort-final pass, 4b8db9c..24e9be7 in M2's pass), every survivor dispositioned; suite 1853/1853, exit 0; M7-b 0 above base. No QA finding open. Next: UAT (B-1 to B-4, B-12, B-13, B-15)."
Phase: 2
---

# QA Report: Plan 017 — the existing-items backlog

**Plan Reference**: `agent-output/planning/017-existing-items-backlog.md`, revision 11 (agent-output `a971ed8`)
for the effort-final pass (its delta read whole, § Implementation Review); Phase 1 read revision 7 (agent-output
`6ade256`), re-keyed in § "Phase 1 re-key on plan revision 7" (earlier: §§ "… revision 6", "… revision 4",
"… revision 3" and "… revision 2"; revision 5 was never routed and is read inside revision 6's diff). The first pass read revision 1
(`97e6814`; the R-4 registration at `d84b192` was read with it and changes no criterion).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-18T23:40 | steering-roadmap (brief `steering/backlog-2026-11-18-briefs/qa-hooks-017.md`) | Phase 1 test strategy on revision 1 | Phase 1. Strategy over M1–M7. Base suite re-derived in an export. AN-1 and AN-2 probes re-run at `1ad625e`. M5-e oracle written and mutation-checked. Local sign-in provisioned. G-6 walked. Register B-1 to B-11. Findings QAF-1 to QAF-9 go to `planner-hooks-017`. |
| 2026-11-18T23:45 | steering-roadmap (`steering/017-rulings.md` 23:41Z, `1cb801c`) | Make the B-7 / QAF-9 production-log read under the Standing Default | Phase 1 amendment. Read made, read-only, aggregates only: liveness met by function stderr, not by the tRPC `onError`, which is development-only (my earlier naming was wrong); retention under 1 day. QAF-9 and B-7 amended by reconcile lines. Routing it as owner-needing was my error. Process fact: the capture's README was first written by shell heredoc, outside the record-write rule, then re-written with the Write tool. The stamp gate refused this row's first stamp (typed `23:46`, clock `23:45`). Satisfied by the `date -u` minute in this row and in the three reconcile lines. |
| 2026-11-19T00:11 | planner-hooks-017 (revision 2, agent-output `3d678cc`) | Phase 1 re-key, including the M5-e oracle | Phase 1 re-key. Oracle re-keyed to revision 2: 0 of 3120 interleavings violate; five mutants fire. Revision-1 run frozen beside it. Postgres probe P1–P3 on a throwaway container. QAF-1 to QAF-9 dispositioned (all RESOLVED). New: QAF-10 MEDIUM (stale replaced nonce), QAF-11 LOW (B-7 member outside its query), QAF-12 MEDIUM (dialog renderer and one slot). NM-22 to NM-25; EC-1 and EC-2; B-7 amended. |
| 2026-11-19T00:22 | planner-hooks-017 (revision 3, agent-output `b3d811e`) | Phase 1 re-key, including the oracle's age reference | Phase 1 re-key. QAF-10 to QAF-12 resolved; EC-1 withdrawn. Oracle re-keyed to form 3's LastModified reference: option a 0/3120 violating, option b's stated limit counted; the revision-2 model is frozen. New: QAF-13 MEDIUM (absent reference), QAF-14 LOW (B-10 liveness); NM-26 to NM-28; B-7 and B-10 amended. |
| 2026-11-19T00:25 | planner-hooks-017 (revision 4, agent-output `a97628d`) | Phase 1 re-key | Phase 1 re-key. QAF-13 and QAF-14 resolved; the oracle's run at revision 4 is byte-identical to the committed run. The LastModified assumption is closed into M5-c's stated residue (no measurement owed). NM-29 added. No finding on revision 4. |
| 2026-11-19T04:14 | code-reviewer-hooks-017 (M4 hand-off, review `e12881a`) | Register rows from M4's Phase 2 | Phase 2, M4: B-12 appended (M4-b's two prompts and a lone prompt, by Enter, in a real browser), because B-3 as written does not observe the Round 4 assumption. The Resumption State was re-stated and its placeholder heading stamp replaced with the checkpoint's commit minute (03:11Z), as `check-repo.js` HEADING-STAMP flagged. The M4 verdict is in `qa/017-existing-items-backlog-m4-qa.md`. |
| 2026-11-19T05:12 | steering-roadmap (cross-session brief; plan revision 6, agent-output `21e61eb`) | Phase 1 re-key: M8 and M5-0 limb 3 | Phase 1 re-key. M8-a's listings and M8-d's counts re-run at `1ad625e`, `a5dd76f` and `5c3d03f`: the plan's figures hold. Limb 2's capture: 3 prefix members and 1 non-member. The 05:01Z focus capture preserved under `qa-phase1-r6/`. New: QAF-20 MEDIUM (M8's focus positions never reach the changed hotkey; the human-observable form reads the same on both trees) and QAF-21 MEDIUM (limb 3 cannot tell a kept-alive function from a resumed one; its outcomes do not cover every subset of the lines). NM-30 to NM-38; B-13 and B-14 appended; B-5 reconciled. The brief's two premises (Resumption State at `84cad8d`; the stamp at line 643) were stale, both already settled at `de8d171`. |
| 2026-11-19T05:18 | planner-hooks-017 (revision 7, agent-output `6ade256`) | Phase 1 re-key | Phase 1 re-key. QAF-20 and QAF-21 RESOLVED at the plan text. Limb 3 re-read from its committed capture: 6 lines, one `requestId`, timestamps within 1 ms of `elapsedMs`, one request in the request log, so **Lasts** holds by revision 7's read rule. M8-a's third listing: 1 non-member hit. NM-30 to NM-38 keyed to revision 7's rows; EC-3 and EC-4 added so NM-33 and NM-35 have a killing case. B-14 executed. No finding on revision 7. |
| 2026-11-19T09:14 | steering-roadmap-hooks (brief `qa-hooks-017-resume.md`, work item 3); plan revision 8 (`36a842f`) | Effort-final sweep and plan-level verdict | Phase 2, effort-final. Website `1ad625e..4b8db9c`: 175 generated, 34 identical to M5's run at this tip, 141 run: 124 of 140 KILLED, 16 SURVIVED, 1 ABORTED (heap out of memory, not credited). Every survivor dispositioned. QAF-25 LOW (`StyledLink`'s `prefetch: false` unasserted) to the Planner batch under the M4 cap. The generator was swept whole at M6. Revision 8 read whole: no verified criterion moved. **QA Complete**, plan-level. |
| 2026-11-19T18:00 | steering-roadmap-hooks (cross-session brief, delta `61ce793..fad6cd4`); planner-hooks-017 (AF-25 to key) | Phase 1 re-key: M2-c's wire form, M2-d | Phase 1 re-key on revision 10, which also folds revision 9 (X-24; QAF-25 dispositioned as a stated limit). AF-25's instrument is shown feasible in an export of `60252be`: real `upsertMessage`, `pusher` 5.1.3 and pusher-js 8.3.0 `decodeMessage`, 4 of 4 green; against `4b8db9c`'s bare trigger line 3 of 4 red, and the ordinary hash stays green. Number-shape predicate checked exhaustively: 0 disagreements in 111,972 strings. EC-5 (M2-d's three members; all four `pusher-js` mocks lack `disconnect`), EC-6, NM-39 to NM-45, B-15. QAF-26 LOW (M2-d's step does not name an in-app switch). The plan-level verdict at `4b8db9c` is expired by M2's fix round 3. |
| 2026-11-19T18:30 | code-reviewer-hooks-017 (M2 sub-entries `f5f3346`, `4e1b43b`) | Register: B-15 | B-15 executed by QA on `60252be` and `24e9be7` and reconciled in its State cell (route re-specified). M2's Phase 2 verdict, QA Failed on QAF-27, is in `qa/017-existing-items-backlog-m2-qa.md`. |
| 2026-11-19T18:40 | code-reviewer-hooks-017 (`e324582`, M2 at `7293a35`); steering brief (plan-level verdict, R-47 and M7-b at the tip) | Plan-level verdict at the new tip | Plan-level verdict re-issued: **QA Complete** at website `7293a35` and generator `8512a1d` (§ "Plan-level verdict re-issued…"); plan Status `QA Complete` with R-60. Code review's R-58 duplicates this gate's R-58 (`686b810` before `489b4d8`); the reviewer routed the renumbering to steering, and this gate's row takes R-60. |
| 2026-11-19T18:58 | steering-roadmap-hooks (checkpoint at the context threshold) | Resumption State | Re-stated whole for the checkpoint: plan-level QA Complete at `7293a35`/`8512a1d`; next is Phase 3 on devops's request. |

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
| B-5 | observable pre-release | M5-0 limb 2 (`waitUntil` from a Pages API route), with the run without `waitUntil` beside it | the preview deployment's runtime logs | devops; push behind his approval (D-15) | Before M5 code | The line appears with `waitUntil`; H-2's run is recorded beside it | If it is absent, M5 and M6 stop and go to him with the fallback (D-15) | devops | devops's M5-0 record under `verification/017/m5-0/` | open. *Reconcile 2026-11-19T05:12Z:* limb 2 ran on his approval (D-27), and the outcome is **kept alive**: under one request id the post-response line came 5006 ms after the control line, and `mode=without` wrote the control line alone (`deployment/017-existing-items-backlog-m5-0-probe-deployment.md`, `d61f445`, which is authoritative on this row's execution). This pass re-read the capture: 3 prefix members and 1 summary non-member (`qa-phase1-r6/limb2-prefix-member-check.out`). Limb 3 is B-14. |
| B-6 | post-deploy-observable | RK-1, in his terms: after the website and generator deploys, he edits and saves one of his messages and looks at its preview in the message list | his look | owner | Both deploys live; the running-code precondition B-11 passed | The preview shows the new edit within a minute | If it still shows the old one, post-response work is not running in production (RK-1) | owner | carrier handoff created by devops at Stage 1 | open |
| B-7 | post-deploy-observable | D-8's failure line is readable in production | Vercel runtime logs for the production deployment, read by devops | devops | Website deploy live. **Liveness precondition:** one existing server line (the tRPC `onError` `console.error` in `pages/api/trpc/[trpc].ts`) shown readable first. Not yet established; owner-needing (above). *Reconcile 2026-11-18T23:45Z:* liveness **met** by a different line. The tRPC `onError` is development-only. Function stderr is readable in production, 14 records on `/api/trpc/message.get` in 23 h (`qa-phase1/vercel-runtime-logs/`). Retention is under one day, so the reader runs at least daily, as a crontab reader installed by devops at Stage 1. The count command is `npx vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg -e production -s 23h --json -q '<D-8 fixed prefix>'`, with the existing `/api/auth/session` cold-start lines as its negative control. | At AN-4's rate (15 non-successes in 16847 requests; 196 generations in 30 days), the expected count of failure lines is about 0.17 per 30 days. **A zero is evidence of nothing.** This row is a health check. The fixed-versus-unfixed distinction for item 2 is B-4, pre-release. | If no failure line can be read even under a planted failure, D-8's countability is not delivered | devops | carrier handoff (Stage 1) | open |
| B-8 | post-deploy-observable | His BC-14 report, in his terms: two tabs on one message in production; in tab 1 he saves and keeps typing at once | his look | owner | Website deploy live; B-11 | Tab 1 shows no "Message Update Detected"; tab 2 shows it. Unfixed production shows it in tab 1 (AN-1 outside-class member, verified at hook level), so this row distinguishes fixed from unfixed. | If tab 1 shows it, his report stands | owner | carrier handoff (Stage 1) | open |
| B-9 | post-deploy-observable | His M3 and M4 look in production (the plan's "in production by him") | his look | owner | Website deploy live; B-11 | As B-2 and B-3 | As B-2 and B-3 | owner | carrier handoff (Stage 1) | open |
| B-10 | post-deploy-observable | RK-7: the generator's failure-stack count after release, against AN-4's 15 | `verification/015/pig-host-read.sh` shapes plus AN-4's count script, over `ssh hooks-pig` | devops | Generator deploy live, plus 30 days of traffic (about 196 generations) | About 0.2 new stacks per 30 days at the old rate. A rise names stored messages whose `/preview` now answers an error status. | Stored messages stop re-imaging and stay stale | devops | carrier handoff (Stage 1) | open |
| B-11 | post-deploy-observable | Running-code precondition for B-6 to B-9: production's deployment contains the release commit | `vercel inspect https://hooks.gg` (commit) with `merge-base --is-ancestor`; the generator host's start line after the `prod.yml` run | devops | Each deploy | Containment exit 0; a generator start after the push | If it is not contained, B-6 to B-9 read old code | devops | deployment record | open |
| B-12 | observable pre-release | M4-b's "both stay open and each is answered on its own", in a real browser and with Enter. This is CR-9's and the Round 4 review's Assumption Not Checked, which B-3 as written does not observe. Added at M4's Phase 2 (`qa/017-existing-items-backlog-m4-qa.md`). | UAT stage browser, local stack, two tabs on one message, real Pusher app (B-1's set-up; depends on B-1's id move and the E-9 stub). **Limb 1:** in tab 1, with unsaved edits, click the user icon so the link prompt opens. Then save the same message in tab 2, so "Message Update Detected" opens in tab 1 above it. Count the open `[role="dialog"]` elements and note which one holds `document.activeElement`. Press Enter once. Record which prompt answered and whether the other is still open, then answer the other with a click. **Limb 2:** with a lone link prompt open, press Enter once. | uat; fallback subject the owner | M4 landed; B-1's two-tab set-up working | **Limb 1:** two dialogs open. One Enter answers only the focused one; the other stays open and is answered on its own. **Limb 2:** Enter answers the link prompt and the page navigates. | **Limb 1:** if one Enter answers both, a user who presses Enter to dismiss the update notice also leaves the page and loses his edits. If the link prompt vanishes when the update prompt arrives, his pending answer was dropped (NM-25 in a real browser). **Limb 2:** if Enter leaves a lone prompt open, a keyboard user cannot answer it (M4's Assumption Not Checked). | uat | the chain's UAT document (pass to be briefed) | open |
| B-13 | observable pre-release | M8's human-observable form, M8-b and M8-c, in a real browser. Settles M8-b, M8-c and RK-11. Added at the revision 6 re-key. | UAT stage browser, local stack, two tabs A and B on one saved message, signed in (B-1's set-up and id move; the E-9 stub). Before every Enter, record `document.activeElement` (tag, text, and the dialog holding it). **Limb 1, distinguishing:** in A, open a field's "Delete Field?". Save from B so "Message Update Detected" opens in A over it. Click U's message text, so focus lies in U off its buttons. Press Enter once. Record which dialogs answered: did the field go, and did Reload run? **Limb 2:** the same with the image dialog (an image loaded) in place of W. **Limb 3, RK-11:** the same set-up as limb 1, but Enter straight after U opens, with no click. **Limb 4, M8-c:** W alone. Click its text, then press Enter once. | uat; fallback subject the owner | M8 landed; B-1's two-tab set-up working | **Limbs 1 and 2:** Reload only; W or I stays open and is answered on its own. At website `5c3d03f` (unfixed), the helper's jsdom capture predicts W's confirm (or I's set) and Reload together. One observation of two answers refutes the fix by construction. **Limb 3:** Reload only on both trees, if U focuses its autofocused Reload. That makes it a health check and RK-11's reading, not the distinguishing limb. **Limb 4:** the field is deleted, as at `1ad625e`. | **Limbs 1 and 2:** if one Enter answers both, a user who presses Enter to take the update notice also deletes the field, or sets the image, in the dialog underneath. **Limb 3:** if the active element after U opens is in W or I, RK-11's premise is wrong, and the plan learns which dialog a browser focuses. **Limb 4:** if a lone W no longer answers Enter with focus on its text, M8 changed the lone dialog (M8-c, NM-33). If, in limb 1 or 2, the click leaves focus on a button or outside every dialog, the limb read nothing: say so, and do not record a pass. | uat | the chain's UAT document (pass to be briefed) | open |
| B-14 | observable pre-release | M5-0 limb 3, post-response life across T (OQ-15 option a). Settles M5-f's T = 40 s premise and RK-2's platform cut. Depends on OQ-15. Added at the revision 6 re-key. | **Primary:** the probe deployment's runtime logs, `npx vercel@66.2.0 logs … --deployment <probe URL> --json` (limb 2's instrument; the records carry `timestamp`, `requestId` and `message`). Read with QAF-21's checks: every line carries the probing request's `requestId`; each line's `timestamp` minus the request's start agrees with its `elapsedMs` within a stated tolerance; no other request reaches the deployment until 60 s after the probing request starts. | devops; his push (OQ-15) | His OQ-15 answer is (a). The limb 3 branch is built. E-6 (what the preview connects to) is established before the push. The project's protection-bypass entries are counted before the run and restored after it (D-28). | **Lasts:** five lines, at 5, 15, 30, 45 and 55 s, under one `requestId`, each timestamp agreeing with its `elapsedMs`. That is the platform documentation's reading (Inference), and limb 2 saw 5 s. **Cut at L:** an unbroken run from the 5 s line, ending at L < 55 s. **Not readable:** no control line, no deployment, or an absent line with a later one present (QAF-21). | If the read is **Cut at L**, M5 and M6 code stop and a revision re-derives T against L (the plan's limb 3). If lines appear late, or under a second request's `requestId`, the run measured a resumed function, not one kept alive, and is **not readable**, never Lasts. If he answers (b), the row closes **dropped** by the pre-declared disposition: RK-2 carries 5 s to 55 s as Inference, and no instrument, before or after release, sees a cut. | devops | devops's M5-0 record (`deployment/017-existing-items-backlog-m5-0-probe-deployment.md`), capture under `verification/017/m5-0/limb3/` | executed: **Lasts**. *Reconcile 2026-11-19T05:18Z:* deployment record `8f26f37` (authoritative on this row) records the run and its result. This document's re-read of the capture agrees: 6 lines, one `requestId`, timestamps within 1 ms of `elapsedMs`, and one request in the request log (`qa-phase1-r7/limb3-read-check.out`). |
| B-15 | observable pre-release | M2-d's human-observable step: in one tab, a switch between two messages' editors leaves one Pusher socket open. Settles M2-d's human form. Added at the revision 10 re-key. | Stage browser, local stack, signed in, two saved messages with ids at or above 900000000000001. They are seeded by SQL insert for QA's run, so no save triggers Pusher; UAT may use B-1's saves. Record every WebSocket whose host is the Pusher cluster's, with its close event (Playwright `page.on('websocket')`, or the network panel's WS filter). (1) Open message A's editor and wait for the socket. (2) Set `window.__qaDoc = 1`. (3) Open message B's editor through an in-app link, the header's message list or the message list page, never the address bar. (4) Read `window.__qaDoc` and count the open Pusher sockets. | QA's executor at Phase 2 for M2 (`browser-walker`), then uat; the owner is the fallback subject | M2-d landed. The local stack is up, and the Pusher app in `.env.local` is reachable (subscribe only). | **Liveness:** after (1), exactly 1 open Pusher socket. **After (4), the marker must be present.** If it is absent, the switch reloaded the document and the run is void. Unfixed (`60252be`): 2 open. Fixed: 1 open, and A's socket closed at the switch. One run refutes either way. | If two sockets stay open, every message a user switches to in a tab leaves another connection open, which is what D-34 closes. | uat | QA's first run: `qa/017-existing-items-backlog-m2-qa.md` (M2's Phase 2 pass, at `60252be` and at the fix tip); execution: UAT document | open. *Reconcile 2026-11-19T18:30:* QA's runs are done (`qa/017-existing-items-backlog-m2-qa.md` § "Phase 2 on M2's fix rounds 3 to 6"; `verification/017/qa-m2-r4/b15-*`): unfixed `60252be`, 2 open at B; fixed `24e9be7`, 1 open and 1 closed; `__qaDoc` kept throughout. Step (3) is re-specified: no direct link from A's editor to B exists, so the route is user menu → Servers (`/message`) → My Account (`/message/f/0`) → B's anchor. QA's runs used `next dev`; UAT states its build kind (that pass's Assumption Not Checked). Execution: UAT's. |

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
*Reconcile 2026-11-19T00:25Z:* revision 4 (M5-c form 3) argues the bound holds whether the bucket
stamps `LastModified` at a put's start or its end, since both fall inside the writing continuation's
life. It states the residue: a disagreement of more than 60 s between the bucket's own servers'
clocks. QA accepts the argument. The two-put check would write to the real bucket, which no stage
does unasked, and the residue is now a stated limit of the plan, so no measurement is owed and this
assumption is closed into that residue. This is not a verdict change.

## Phase 1 re-key on plan revision 4 (agent-output `a97628d`)

Read: the diff `b3d811e..a97628d` over the plan (48 added and 17 removed lines, `git diff
--numstat`); M5-c form 3, M4-a and RK-7 re-read. The plan was unchanged since `a97628d` at the write.

- QAF-13 MEDIUM Phase 1 RESOLVED — M5-c form 3 states "A listing that does not contain the committing
  save's own object deletes nothing". The oracle already modelled that reading. Re-run at this
  revision, `node oracle.mjs` is byte-identical to the committed `oracle-run.txt` (`cmp`): 0 of 3120
  violating. NM-26 is the mutant against it.
- QAF-14 LOW Phase 1 RESOLVED — RK-7 carries both liveness rows: a fixture line counted at M6 under
  `verification/017/m6-probe/`, and the region's `Generated image` count above zero at each read.
  B-10's precondition is unchanged from the 00:22Z reconcile.
- AF-22 (M4-a): the guard captures `showConfirmation` from its own layout instance, and `StyledLink`
  never calls `useConfirmation`. This is because the editor's instance shadows the layout's inside
  `m/[id]/layout.tsx`. M4-b's tests mount the two-level layout with a `/send` member inside
  `MessageProvider`. Named mutant added: NM-29 — `StyledLink` resolves the confirmation through
  `useConfirmation`, so inside `m/[id]` it gets the editor's instance and shares its slot with the
  update prompt (NM-25's failure, by shadowing) — M4-a, M4-b.
- F-24 (M3-h reads the OQ-11 · OQ-12 four-pair table) and F-25 (M5-g's production falsifier is his
  B-6 look) need no register change: B-6 already reads a saved message's new preview after both
  deploys.

No finding on revision 4.

## Phase 1 re-key on plan revision 6 (agent-output `21e61eb`)

**Brief**: steering-roadmap, cross-session message at 05:1xZ. The brief names "owed re-verdicts" row 3 of the plan's
Reading Order: M8-a to M8-d keyed into the register and named mutants; M8's human-observable row; and M5-0 limb 3's
outcomes and capture. Two of the brief's premises were stale when it was read:
- "your Resumption State is at 84cad8d": this document re-stated it at `de8d171` and again at `9f5dbb1`.
- "the HEADING-STAMP placeholder at line 643": removed at `de8d171`. `grep -c 'T03:1x'` gives 0.

**Read**: the diff `a97628d..21e61eb` over the plan (264 added and 45 removed lines, `git diff --numstat`), which spans
revisions 5 and 6. Read whole: § `### M8`, M5-0 limb 3, OQ-15 and the M5-f lines the diff touches. Read as diff hunks:
RK-2, RK-11, X-7, X-20, the Testing Strategy's M8 line and the Planner batch. Also read:
- steering's 04:50Z and 05:01Z ruling blocks;
- the 05:01Z refuting helper's raw capture, which sits in another session's scratchpad. I copied it to
  `verification/017/qa-phase1-r6/focus-refute-res.copy.txt`; its sha256 matches the source, prefix `850499a51c1b5820`;
- limb 2's runtime-log capture `verification/017/m5-0/devops/probe-runtime-logs-first-run.jsonl` (`d61f445`).

Dispositions on revision 4 that this delta touches: none. QAF-1 to QAF-14 stay RESOLVED, and the M5-e oracle is not touched
by revisions 5 and 6 (no hunk in M5-a to M5-e).

### New measurements (captures under `verification/017/qa-phase1-r6/`)

- **M8-a's locating instruments at three trees** (`m8-class-listings.out`, over production source):
  - `useHotkeys(['enter']` gives 3 hits at each of `1ad625e`, `a5dd76f` and `5c3d03f`: `ConfirmationDialog`,
    `ImageUploader` and `WarningDialog`.
  - `addEventListener('keydown'` gives no line (exit 1) at all three.
  - M8-d's count, `tagName !== '~/components/Button'`: 3 at `1ad625e`; 2 at `a5dd76f` and at `5c3d03f`
    (`ImageUploader` and `WarningDialog`).

  So the plan's figures hold. The predicate has a real member (`WarningDialog` at `5c3d03f`) and a real non-member
  (`ConfirmationDialog` at `a5dd76f`, scoped by M4).
- **Where Enter reaches the document**, from the helper's capture (jsdom; real `WarningDialog`, `ImageUploader` and
  `ConfirmationDialog` at website `5c3d03f`). Each line is a keydown dispatched on `document.activeElement`, as a real key
  press is:

  | Focus | Enter fires (website `5c3d03f`, unfixed) |
  |---|---|
  | W's text, U not open | `warn.onConfirm` |
  | U's text, with W open underneath | `warn.onConfirm`, `RELOAD`: **the defect** |
  | U's text, with I open underneath | `img.onClose`, `img.submit`, `RELOAD`: **the defect** |
  | A react-aria `Button` (U's Reload; W's own) | keydown does not reach `document`; on keyup only that button's press runs (`RELOAD`; `warn.onConfirm` and `warn.onClose`) |
  | I's URL `input` | nothing (the hook ignores form tags) |
  | Right after a dialog opens | `document.activeElement` is the dialog's own `DIV`, off its buttons |

  So the defect shows only while focus sits in a dialog **off its buttons**. Focus on a button gives one answer before the
  fix as after it. In the code, U's Reload carries `autoFocus`, so in a real browser it may be the element U focuses
  (RK-11). If it is, an Enter pressed straight after U opens answers Reload alone on the unfixed tree too.
- **M5-f's first real member** (`limb2-prefix-member-check.out`). Limb 2's first-run capture holds 4 records. 3 are `log`
  records whose `message` starts with `preview-image-failure` (`probe-control mode=without`, `probe-post-response mode=with
  … elapsedMs=5006`, `probe-control mode=with`), each with `requestPath /api/waituntil-probe`. The 4th is a `summary`
  record and does not match. So the prefix predicate accepts 3 real members and rejects a real non-member, as the plan's
  "3 records" says. B-7's production negative control (the `/api/auth/session` lines) stands as recorded at revision 1.

### Findings on revision 6 (to `planner-hooks-017`)

QAF-20 MEDIUM Phase 1
- **What is missing.** M8-b's and M8-c's focus positions never make the changed code carry the decision.
  - M8-c lists, for W, the close button, Cancel and the confirm button. For I it lists the close button, the URL field,
    Cancel, Clear and Save.
  - Every one is a react-aria `Button`, whose Enter never reaches `document`, or a form field, which the hook ignores.
    Neither reaches the hotkey M8 changes.
  - M8-b's table says "Focus in W" and "Focus in U" without saying where in the dialog.
- **The consequence.** A U-focused case with focus on U's autofocused Reload passes at website `5c3d03f`, with the defect
  in place. Its red run cannot be recorded, and a fix that leaves W's or I's hotkey unscoped passes it.
- **The human-observable form shares the gap.** "Press Enter once" names no focus position, so in a real browser that
  focuses Reload, the walk reads the same before and after the fix.
- **The property this asks to be checked.** M8-b's "Focus in" column names the position, "in the dialog, off its
  buttons" (the panel or its text). The red rows are W and U, and I and U, with focus in U off its buttons: at `5c3d03f`
  each fires the member and Reload. The W-focused and I-focused rows are positive controls that stay green at `5c3d03f`.
  M8-c adds the same off-button position for W and I, alone. Its `1ad625e` literal is the hotkey's answer (W:
  `onConfirm`; I: `onClose` and `submit` with an image loaded). Only there does the hotkey decide alone (NM-33).
- **Register.** B-13 below already places focus off the buttons, so the row does not wait on the plan's wording.

QAF-21 MEDIUM Phase 1
- **What is missing.** M5-0 limb 3's outcomes are read from the probe's own lines and their self-reported elapsed
  milliseconds. Nothing in the read can tell a function that ran on to 55 s from one that was suspended after the response
  and resumed by a later request to the same deployment. A timer resumed that way writes its 30, 45 and 55 s lines late,
  with an `elapsedMs` that still reads correct. That is a false **Lasts**, and T = 40 s would then ship resting on it.
- **Also undefined.** The three outcomes do not cover every subset of the five lines. For example, the 5, 30 and 45 s lines
  present with 15 absent is neither "all five" nor "the last line at L < 55 s with every line before it".
- **The property this asks to be checked.**
  - Each line's platform `timestamp` minus the request's start agrees with its `elapsedMs` within a stated tolerance.
  - Every line carries the probing request's `requestId`.
  - No other request reaches the probe deployment until 60 s after the probing request starts. Limb 2's `mode=without`
    request is sent after that window, or to a second route.
  - Any absent line with a later line present is **not readable**, a log-delivery fault, never a cut. L is the last line
    of an unbroken run from the 5 s line.
- **Register.** B-14 below carries these as its instrument. They are owed to the plan's limb 3 text as well, because devops
  works from the plan.

### Named mutants added (M8)

- NM-30: `WarningDialog`'s Enter answers whatever holds focus (the `5c3d03f` behaviour). Its red row is W and U, focus in
  U off its buttons. M8-b.
- NM-31: the same for `ImageUploader`. Its red row is I and U, focus in U off its buttons. M8-b.
- NM-32: the gate accepts focus inside any dialog (`document.querySelector('[role="dialog"]')`, or any
  `[role="dialog"]` that contains the focus), so with U focused, W still answers. M8-b.
- NM-33: the gate tests only the content wrapper (`ref.current.contains`), so a lone W or I with focus on its panel
  root, off its buttons, stops answering. The implementer's first form for CR-9 was this. M8-c, off-button position.
- NM-34: `ImageUploader`'s hotkey stays enabled while closed. It is mounted with `unmount={false}`, so a closed instance
  answers an Enter meant for an open one. M8-b's last row.
- NM-35: one ref shared by every `ImageUploader` instance (module scope, or the first mounted instance's), so an
  instance's gate looks at another instance's dialog. M8-b, "each mounted instance".
- NM-36: `enableOnFormTags` set, so Enter in I's URL field submits. M8-c, the URL-field row.
- NM-37: I's answer runs `submit` with no image loaded. M8-b, "set only while an image is loaded".
- NM-38: lifting the shared check into one function changes `ConfirmationDialog`'s scope (for example `closest` dropped).
  M4's Enter cases must stay green unchanged. M8's "form, mirrored" line.

M8 adds no entry to the Irreversible Side-Effect Register. W's confirm and I's submit change editor state in the page,
which is not I/O leaving the process. A wrong answer is a lost field or image in unsaved edits, which B-13's failure mode
states. So M8's Phase 2 sweep is owed by the named mutants above, not by the register.

**Entry condition** (for the implementer):
- M8's DOM cases use the real `react-hotkeys-hook`, as M4's Enter case does after CR-9; a module mock of the library hides
  the defect (M4's Round 4).
- Every case sets focus by moving `document.activeElement` to the stated element, and asserts it before the Enter.
- The `1ad625e` literals for M8-c are recorded from a run in an export of `1ad625e`.

### Register amendments

Appended: B-13 (M8's human-observable form) and B-14 (M5-0 limb 3). B-5 carries a reconcile line for limb 2's run. The
register's other rows are unchanged; the check predicate was "a row whose instrument or premise names M5-0, M5-f, a
dialog's Enter, or B-12's two-prompt set-up". Its matches were B-5, B-7 (M5-f's prefix and first member: re-checked
above, unchanged) and B-12 (M4's two prompts; M8 does not touch `ConfirmationDialog` beyond NM-38's no-change, so it is
unchanged).

### Assumption Not Checked (this pass)

This pass assumes that the helper's jsdom capture carries over to a real browser in one respect: Enter on a focused
react-aria `Button` never reaches `document`. It does not test that. If it is false, the U-on-Reload position is a red row
too. QAF-20's rows stay right, but B-13's limb 2 may then read "two answered" at the unfixed tree where it predicts one.
The owner is UAT, at B-13. Named again in the hand-off.

## Phase 1 re-key on plan revision 7 (agent-output `6ade256`)

**Brief**: `planner-hooks-017`, cross-session message, revision 7 ready (the plan's Reading Order, "owed re-verdicts":
"the same delta, re-keyed: NM-30 to NM-38 against M8-b's red rows and M8-c's off-button rows; B-13, B-14").
**Read**: the plan diff `21e61eb..6ade256` (112 added and 64 removed lines across the commit range, by `git diff --numstat`),
whole. Also read: deployment record `8f26f37` and limb 3's captures under `verification/017/m5-0/limb3/`.

### Dispositions of this gate's revision-6 findings, re-derived at the plan text

- QAF-20 MEDIUM Phase 1 RESOLVED.
  - M8-b's table names the focus position in every row.
  - The red rows are W and U, and I and U, each with focus in U off its buttons. The W- and I-focused rows are controls,
    and the row with focus on U's Reload is marked "not discriminating".
  - M8-c adds the panel off its buttons for W and for I, with its `1ad625e` answer.
  - The human-observable form now puts focus on U's text, as B-13 does.
- QAF-21 MEDIUM Phase 1 RESOLVED. Limb 3's read now counts a line only on three conditions: the probing request's
  `requestId`; a timestamp less the control line's within 1 s of its `elapsedMs`; and no other request in the deployment's
  request log for 60 s. The read is taken after those 60 s. The outcomes now cover every subset of the lines.

### New measurements (captures under `verification/017/qa-phase1-r7/`)

- **Limb 3, re-read from its committed capture** (`limb3-read-check.out`, over `probe-runtime-logs.jsonl` and
  `probe-requests-log.jsonl`):
  - 6 `log` lines, one `requestId` (`4rr8m-1795065062621-…`), each with the M5-f prefix.
  - Each timestamp less the control line's matches its `elapsedMs` to within 1 ms: 0, −1, −1, 0 and −1 ms at the 5, 15,
    30, 45 and 55 s lines.
  - The request log holds one `request` record, the probing request at 05:11:02.621Z, over 03:14:02Z to 05:14:02Z.
    `hasMore` is false and `excludedIntervals` is empty.
  - So **Lasts** holds by revision 7's own read rule. This agrees with `8f26f37`.
  - The limits stay as devops states them: the request log's completeness is its own summary's; a platform wake that is
    not a request would not show; and the Preview's own function limit is unread.
- **M8-a's third listing** (`m8-third-listing.out`): `useDocumentEventListener('keydown'` at `5c3d03f` gives 1 hit,
  `src/components/EmojiPicker/Root.tsx:58`. That is the plan's non-member.

### Named mutants, keyed to revision 7's rows

| Mutant | The row that kills it |
|---|---|
| NM-30, W's Enter unscoped | M8-b, W and U, focus in U off its buttons (red) |
| NM-31, I's Enter unscoped | M8-b, I and U, focus in U off its buttons (red) |
| NM-32, the gate accepts any dialog | the same two red rows |
| NM-33, the gate tests only the content wrapper | M8-c, W alone and I alone, the off-button position, **when that position is the element the dialog focuses on open**, outside the content wrapper (entry condition EC-3) |
| NM-34, I enabled while closed | M8-b, "none of W, I": a closed `ImageUploader` instance mounted beside an open dialog |
| NM-35, one ref shared across instances | M8-b's per-instance property: two mounted `ImageUploader` instances, the second open (EC-4) |
| NM-36, `enableOnFormTags` | M8-c, I alone, the URL field |
| NM-37, `submit` with no image | M8-c, I alone off its buttons, with no image: nothing |
| NM-38, the lift changes `ConfirmationDialog` | M4's Enter cases in `layout.navigation-guard`, unchanged and green |

**Entry conditions added** (to the implementer; EC-2 stands from revision 2):
- **EC-3.** The off-button position covers two elements for each member alone, and for U in the red rows: the dialog's
  text, and the element headlessui focuses when the dialog opens. That element is the dialog's own `DIV` in jsdom (the
  05:01Z capture's `ACTIVE_AFTER_OPEN`). The plan's "its panel or its text" names both. Focus on the text alone lies
  inside a content-wrapper ref, so it cannot kill NM-33.
- **EC-4.** The per-instance case mounts two `ImageUploader` instances, which `unmount={false}` makes the page's real
  state. It opens the second one and asserts that only the second answers.

No finding on revision 7.

### Register amendments

- **B-13.** Unchanged. The plan's human-observable form now states its focus step.
- **B-14.** Executed: **Lasts** (deployment record `8f26f37`, which is authoritative on the row; this pass's re-read is
  above). Reconciled in its State cell.

Check predicate for the other rows: "a row whose instrument or premise names M5-0, M5-f or a dialog's Enter". It matched
B-5 (already reconciled), B-7 (unchanged: limb 3's lines are M5-f prefix members, like limb 2's), B-12 and B-13. Nothing
else moved.

### Assumption Not Checked (this pass)

This pass assumes that a Preview deployment's post-response lifetime is the same as Production's. Limb 3 ran on a Preview.
Production's function limit is D-10's 60 s, and the Preview's limit is unread (devops's limit). This pass does not test the
assumption.
- **Falsifier.** In production, B-7's count shows "no answer within T" lines, or B-6's look shows a preview that stays
  stale, on saves whose render was quick.
- **Owner.** devops at Stage 1, through B-7's carrier. Named again in the hand-off.

## Phase 1 re-key on plan revision 10 (agent-output `fad6cd4`)

**Brief**: `steering-roadmap-hooks`, cross-session message, 2026-11-19T17:5xZ: re-key to revision 10, bounded to its
delta `61ce793..fad6cd4`. The rulings are D-33 and D-34 (plan R-51; `steering/017-rulings.md` blocks 17:49Z and 17:51Z).
The architect's AF-25 LOW came through `planner-hooks-017` for this pass to key
(`architecture/017-existing-items-backlog-architecture-findings.md` § "Findings on revision 10", `410044e`).
**Read**: the diff `61ce793..fad6cd4`, whole. `git diff --numstat` gives 29 added and 7 removed lines in the plan, and 16
added lines in the rulings file. Also read: revision 9's commit (`bcc23c6`, 10 added and 5 removed lines), which adds X-24
only, so QAF-25 LOW Phase 2 is dispositioned as stated limit X-24 (revision 9, critic `5f892f5`). Read at source: website
`42d15de` and the new tip `60252be` (the D-33 hash fix, committed during this pass): `usePusher.ts`, `shared.ts`
`upsertMessage`, `MessageProvider/index.tsx`, and the `pusher-js` mocks. Libraries read as installed: `pusher` 5.1.3
`lib/events.js` `ensureJSON`, and `pusher-js` 8.3.0 `src/core/connection/protocol/protocol.ts` `decodeMessage`. The same
`JSON.parse` of string data is in `dist/node/pusher.js` and `dist/web/pusher.js` (`grep -n`, one line each).

Criteria this pass keys: M2-c's exact equality and its wire instrument (AF-25); M2-d's three members; M2-d's
human-observable step. Nothing else in revision 10 changes a criterion this gate keyed.

### New measurements (captures under `verification/017/qa-phase1-r10/`)

- **AF-25's instrument runs in this suite.** I ran `wire-decode-probe.test.ts` in a `git archive` export of `60252be`.
  `shared.ts`'s blob was `a1e99c8…` in both the tree and the export, `node_modules` was linked, and the run used
  `unshare -rn`. The probe goes through the real `upsertMessage` and the real `pusher` 5.1.3. Only `Pusher.prototype.post`
  is replaced, after `ensureJSON` has run. The probe builds the frame Pusher's service relays (`event`, `channel`, and the
  posted `data` string), and decodes it with pusher-js's own `Protocol.decodeMessage`, imported from the package's
  TypeScript source. Vitest inlines that file.
  - At `60252be`: 4 of 4 passed, exit 0 (`probe-tip-60252be.out`, `.exit`).
  - **Red control.** I swapped in `4b8db9c`'s bare-hash trigger line. One `grep -c` match confirmed it in the export and
    one in `4b8db9c`'s blob. The number-shaped cases (`51354e00`, `-107e02`, `7181e724`) failed, 3 of 4, with exit 1. The
    ordinary hash `2cf29ca1` stayed green (`probe-bare-producer.out`). Afterwards the export's file was restored to its blob
    `a1e99c8…`.
- **What "number-shaped" covers** (`number-shape-predicate.mjs`, `.out`). `hashMessage` returns `-?[0-9a-f]+`.
  pusher-js turns a string into something else exactly when the string matches `^-?(0|[1-9][0-9]*)(e[0-9]+)?$`. I checked
  this exhaustively: 111,972 strings matching `-?[019aef]{1,6}`, 3,402 of them members, 0 disagreements with `JSON.parse`.
  As a positive control, a wrong predicate without the exponent disagrees on 2 of 4 planted strings. The class has these
  sub-classes:
  - digits only;
  - a minus sign and digits;
  - digits, `e` and digits that stay finite;
  - an exponent that overflows to ±Infinity.

  The near non-member is a leading `0` followed by digits (`012`), which fails to parse and stays a string.
- **M2-d's population.** At `60252be`, `git grep -n "from 'pusher-js'"` outside `__tests__` finds one file, `usePusher.ts`,
  with one `new Pusher(…)`, inside the effect. The cleanup is `channel.unbind()` and `pusher.unsubscribe(…)`, with no
  `disconnect` (`git grep -n disconnect` over `src`: only `ResizeObserver` and `MutationObserver` stubs in tests). So
  M2-d is red at `60252be` as well as at the plan's `1ad625e` and `42d15de`.
  - The effect's dependency is `isApiMessage(message) && message.id`. `paramMessageId` comes from `useParsePathname()`
    (`index.tsx`).
  - So the three members are reachable in a mounted provider only if the navigation mock's pathname can change while the
    provider stays mounted. The shared `navigationMock(pathname)` in `__tests__/helpers/messageProviderDeps.ts` returns a
    fixed pathname, so the harness cannot do that today.
  - **Four `vi.mock('pusher-js'` sites** (`git grep -c`, one each): `layout.navigation-guard`,
    `MessageProvider.own-save-notice`, `MessageProvider.stored-draft` and `usePusher.update-prompt`. None defines
    `disconnect`, so once the fix lands, every cleanup in those files calls a missing method.
- **The production `MessageProvider` mounts in `src/app/message/m/[id]/layout.tsx`.** The in-app links to another
  message's editor are `StyledLink`, which wraps `next/link`: `_layout/Header.tsx`, `message/page.tsx` and `f/[id]/page.tsx`.
  An in-app switch is therefore a client-side navigation that keeps the document, while an address-bar entry loads a new
  document. I did not establish whether the App Router remounts the `[id]` layout (member 1) or keeps it mounted with a new
  id (member 2). Either is a member. B-15 does not depend on which.

### Entry conditions added (to the implementer; EC-2 to EC-4 stand)

- **EC-5 (M2-d).** One case per member, in a mounted `MessageProvider`. Each `new Pusher` returns its own object, with its
  own `disconnect`, `subscribe` and `unsubscribe` spies, recorded in construction order.
  - **Unmount.** The case asserts the instance is not disconnected while mounted, and is disconnected once after unmount.
  - **The id changes.** The pathname changes from one message to another while mounted, and the case rerenders. Instance 1
    is disconnected once. Instance 2 exists and is not disconnected.
  - **The message stops being an `ApiMessage`.** The pathname goes to `/message/m/0/edit`. Instance 1 is disconnected once,
    and no further instance is constructed.
  - The harness needs a pathname that can change while mounted, for example a hoisted mutable value read by the mock's
    `usePathname`. Per the helper policy, it is an extension of `navigationMock`, not a third copy.
  - Before adding a test: the plan names `usePusher.update-prompt.test.tsx` as the surface's existing test. Extend it, or
    say why the mounted-provider file is the place.
  - All four `pusher-js` mocks gain `disconnect`. Every file's case count and pass set must stay the same, exit 0.
- **EC-6 (M2-c, AF-25).** One case in `shared.upsert-broadcast.test.ts` uses the probe's form: the real `pusher`, with only
  `post` replaced, and the frame decoded by pusher-js's `Protocol.decodeMessage`. It asserts the exact hash string for an
  ordinary hash and for one member of each number-shaped sub-class above.
  - Its red is recorded against `4b8db9c`'s bare trigger line.
  - That file's `deliveredToSubscribers`, at `60252be`, is the test's own copy of the two library steps. This case replaces
    it. Leaving it beside the case is the Phase 2 audit's question.
  - The consumer's cases in `MessageProvider.own-save-notice` keep handing the handler strings. That is sound once the wire
    case holds, because the two cases join at the decoded string.

### Named mutants added

| Mutant | The row that kills it |
|---|---|
| NM-39, the producer sends the bare hash (`4b8db9c`'s line) | EC-6, the number-shaped members (shown red in this pass's probe) |
| NM-40, the producer encodes twice (`JSON.stringify(JSON.stringify(…))`) | EC-6, the ordinary member (the decoded value carries quotes) |
| NM-41, the consumer parses one side of a comparison (record or shown hash) | `own-save-notice`'s number-shaped cases at `60252be` |
| NM-42, no `disconnect` (the tree before M2-d) | EC-5, all three members |
| NM-43, `disconnect` only in a separate unmount-only effect | EC-5, the id-change and the stops-being-`ApiMessage` members |
| NM-44, `disconnect` on the latest instance (a ref or module variable) instead of this run's | EC-5, the id-change member: instance 2 not disconnected, instance 1 disconnected |
| NM-45, `disconnect` in the effect body instead of its cleanup | EC-5, the unmount member's "not disconnected while mounted" |

### Findings on revision 10 (to `planner-hooks-017`)

QAF-26 LOW Phase 1
- **What is missing.** M2-d's human-observable step does not say how the second message's editor is opened ("open a second
  message's editor in the same tab").
- **The consequence.** Entered in the address bar, the second editor loads a new document, which closes every socket on
  both trees. The step then reads "one open Pusher WebSocket" before the fix as well as after it, so it cannot fail. Only
  an in-app link (the header's message list, `StyledLink`) keeps the document, so the old socket can stay open.
- **Remedy.** Name the in-app link in the step, and require that the page was not reloaded. B-15 already does this, so the
  finding does not hold the disconnect code.

### Register amendments

- **B-15** appended (M2-d's human-observable step).
- Check predicate for the other rows: "a row whose instrument, premise or prediction reads M2's broadcast or its hash
  form". It matched B-1, B-8 and B-12.
  - **B-1.** Re-read. It walks through the real Pusher app, so after D-33 its tab 2 notice reads the JSON-encoded frame
    end to end. Nothing to re-specify. Steering's 17:49Z block tells UAT it need not place runs by frame hash.
  - **B-8.** Its "unfixed production shows it in tab 1" prediction stays as worded: production runs `1ad625e`.
  - **B-12.** It depends on B-1's set-up only.
- Nothing else moved.

### Assumption Not Checked (this pass)

This pass assumes something about a real browser that it does not test. On a tree without M2-d, an in-app switch between
two messages' editors leaves the first message's pusher-js socket open. Nothing else closes it: not React's unmount, not
the `unsubscribe` of its only channel, and not garbage collection.
- **Falsifier.** B-15's first run at the unfixed tree shows one open Pusher socket after the switch, with the document
  marker still present. B-15 would then not discriminate, and M2-d would be a resource fix that no user can observe.
- **Owner.** QA Phase 2 for M2 runs B-15 once at `60252be` (unfixed) and once at the fix tip before UAT executes it. It is
  named again in the hand-off.

## Resumption State (2026-11-19T18:58Z, checkpoint on steering's word at the context threshold)

- **Done.** Every QA act this chain owes before release is written and committed.
  - Phase 1 and its re-keys: revisions 1 to 4, 6, 7 and 10 (`9e212a3`). Revisions 8, 9 and 11 were read: none moves a
    verified criterion.
  - Phase 2 per milestone, each QA Complete in its own document: M1 `8147661`, M3 `1ab3b96`, M4 `5c3d03f`, M8 `6555f65`;
    M5 at website `4b8db9c` (`47c16c3`, `dd7a449`); M6 at generator `8512a1d` (`dd7a449`); M7 at `4b8db9c` (`9a155ee`).
    **M2 at website `7293a35`** (`cf69ef1`): fix rounds 3 to 7 (D-33, M2-d, QAF-27).
  - **Plan-level QA Complete at website `7293a35` and generator `8512a1d`** (§ "Plan-level verdict re-issued…", `cf69ef1`).
    Plan Status is `QA Complete` with R-60 (`4c8be42`).
  - B-15 was executed by QA on both trees and reconciled in the register.
- **Findings open:** none. QAF-25 is X-24, QAF-26 was folded at revision 11, and QAF-27 is resolved.
- **Next for QA.** Phase 3 at the release tip, only on devops's request (`qa-phase-3.md`). Carry in:
  - the effort-final Assumption Not Checked: `mutant-gen` deletes no call or JSX attribute;
  - M7-b re-read at the merged tip (QA's `qa-m7/m7b-check.py` against `nofix-1ad625e-export.json`, with `--plant`);
  - the install matches the lockfile;
  - B-15's build kind (dev servers here), which UAT owns.
- **Approach notes a successor reuses.**
  - Website runs: a `git archive <sha>` export, `unshare -rn`. For vitest, link `node_modules`. For lint and `next dev`,
    give the export its own `pnpm install --frozen-lockfile --offline --ignore-scripts`: Turbopack refuses a symlinked
    `node_modules`.
  - Sweeps: `mutation-run.py --dep node_modules -- unshare -rn npx vitest run`, run by a `general-purpose` helper. Keep the
    full-suite run off the box while a sweep or a walk runs: under load (average 23), M1's `messageValidity` case hit its
    5 s timeout.
  - Walks: `browser-walker` with `verification/017/qa-m2-r4/b15-unfixed/ws-recorder.js`, drivers beside the evidence
    (`DISPLAY=:0`). The local stack is `tools/uat-local-stack.sh`. Seed by SQL from a file through `verification/017/uat/db.sh`.
  - Generator: as recorded at M6 (`m6-probe/run.sh`, `qa-m6/unchanged-lines-check.mjs`).
- **Trees.** Website `chain/017-existing-items-backlog` at `7293a35`; generator `chain/017-existing-items-backlog` at
  `8512a1d`. Neither is mine to move.
- **Uncommitted or mutated.** Nothing of QA's. My `INBOX.md` entries are appended uncommitted, as the inbox rule says;
  the 18:01Z one on the M2 implementation document's stamps is now fixed by the implementer. No exports, containers,
  servers or processes are left.
- **Questions out.** None. Delivered: the UAT spawn cue and B-15's routing to `steering-roadmap-hooks`; QAF-27 to
  `implementer-hooks-017` (resolved).
- **Standing rule.** The owner's memory `no-security-blocks-in-record.md`: no safeguard or security block is named in
  agent-output; a failure is written only as "not completed". The M2 document's B-15 bullet was reduced to that form at
  this checkpoint.
- **Routed assumptions.** To UAT: B-1 (with code review's bare-frame decode), B-2, B-3, B-4, B-12, B-13, B-15 (build
  kind). To devops Stage 1: B-6 to B-11.

## Assumption Not Checked

This pass assumes that Pusher delivers a save's broadcast back to the tab that sent it in
production, as the probes model (AN-1 G-4), and does not test it. If it is false, M2's records are
never cleared, every later remote save of the same content is suppressed, and in B-1's walk tab 1
never receives its own broadcast. The owner is UAT, at B-1 (its walk publishes through the real
Pusher app), named again in the hand-off.

## Implementation Review (Post-Implementation)

*Phase 2.* Each milestone's Phase 2 is in its own document: `qa/017-existing-items-backlog-m1-qa.md` to `-m8-qa.md`. All
eight are QA Complete:
- M1 to M4 and M8 at their refresh tips (`8147661`, `dd26104`, `1ab3b96`, `5c3d03f`, `6555f65`);
- M5 and M7 at website `4b8db9c`;
- M6 at generator `8512a1d`.

This section is the effort-final pass: the sweep each milestone pass named as owed, and the plan-level verdict.

**Revision 8 does not expire a milestone verdict.** Its body delta (`655fe13..36a842f`, read whole) touches:
- M3's matrix fetch cell (CR-8, already the reviewed code);
- M4-a's second interception (`StyledLink`'s `onClick` for a link to another site);
- M4-d's table (Invite Bot and `InfoPanel`'s bot invitation added; Support and "Learn more" are not members);
- M6-c's class set, closed at four;
- X-21 to X-23, and the Planner batch.

Each corrected member was already verified:
- The M4 document maps Invite Bot and the bot invitation to cases and kills (its coverage table rows "`NavMenu` Create
  Message, Servers, Invite Bot" and "`InfoPanel` bot invitation").
- This sweep kills every generated mutant on `StyledLink.tsx`'s `onClick` path, lines 37 to 42.
- M6's pass verified the four classes and the `setup-rejects` case.

No criterion this gate verified moved, so the verdicts stand at their SHAs.

## Test Execution Results

### Effort-final sweep

**Scope** (qa.md: the production code the effort changed, `git diff <chain base>..<tip>` over production paths):
- **Website `1ad625e..4b8db9c`.** `mutant-gen.js --range 1ad625e..4b8db9c` wrote 175 mutants
  (`verification/017/qa-final/website-mutants-gen.{json,out}`). Test files are skipped by the generator.
  - 34 of them, on `previewImage.ts`, `previewBucket.ts` and `shared.ts`, are identical by (file, old, new, id) to M5's
    generated set run at this same tip (`qa-m5/m5-mutants-gen.json`; all killed or equivalent there). Those files are
    unchanged before `c37d41a`.
  - This run took the other 141 (`website-mutants-final.json`, blob `a2a4246`, committed at `178b37f` before the run).
- **Generator `8de2b53..8512a1d`.** M6's milestone sweep was already the whole generator diff (`qa-m6/`, 20 of 21 killed,
  the survivor equivalent), so it is not re-run.
- **E-7** (`messageDrafts.ts`, `withLocalStorage.ts`, `useLocalStorage.ts`) is unchanged since M3's bounded sweep at
  `1ab3b96` (`git diff --numstat` prints nothing). Its generated mutants are in this set.

**Run.** `mutation-run.py --sha 4b8db9c --dep node_modules --timeout 300 -- unshare -rn npx vitest run`, whole suite,
through a `general-purpose` helper. The table is
`qa-final/sweep/mutation-table-4b8db9c2…-20261119T080657Z-p3624393.json`, with runner blob `b26916e` and the mutants
blob above.
- Control: 1814 cases, exit 0.
- **124 of 140 KILLED** (denominator: mutants whose suite started under a passing control; stillborn 0, not-applied 0,
  aborted 1). 16 SURVIVED, 1 ABORTED. Four kills came by the 300 s per-run timeout, which counts as a kill: `messageDrafts.ts` 38
  walk-last, 40 num, 46 `&&` and 46 `>`. Each turns a bounded eviction loop unbounded.

**Every survivor, dispositioned.**

| Survivor | Disposition | Evidence |
|---|---|---|
| `ImageUploader.tsx` 97 `true`, 97 `num`, 101 `true`, 101 `num`, 101 `true:2`, 116 `true`, 121 `false`, 147 `not`, 147 `&&`, 147 `not:2` (10) | **Outside the predicate.** These lines changed by indentation only. M8's behavioural change in this file is the import, `useDialogEnter`'s call and the wrapper `div`. The mutated values (layout classes, `draggable`, and Clear's and Save's `isDisabled`) are the base's own behaviour, re-indented. `mutant-gen` selects whitespace-changed lines; the effort's predicate is behaviour changed. | `git diff -w -U0 1ad625e 4b8db9c -- src/components/ImageUploader.tsx`: 8 changed lines (`grep -c`), none at these lines |
| `StyledLink.tsx` 34 `false` (`mergeProps({ prefetch: false }, …)` → `prefetch: true`) | **QAF-25 LOW** (below). It is the base's value (`1ad625e` line 12), carried onto a line M4 rewrote. No case asserts it. | Kill table: SURVIVED, no failing case |
| `leaveWithoutAlert.ts` 1 `num` (`REARM_MS` 2000 → 2001) | **No criterion member.** The plan names no re-arm delay (`grep -c -i -E 're-?arm\|REARM_MS\|2000 ?ms'` over the plan: 0). That the flag re-arms, and when it does not (exit rejects), is killed at lines 3, 8, 11 and 14. An off-by-one on an unspecified constant is residue. | Kill table rows `leaveWithoutAlert.ts` 3, 8, 11, 14: KILLED |
| `messageDrafts.ts` 19 `num:2`, `num:3` (`slice(2, 12)` → `(3, 12)`, `(2, 13)`) | **Equivalent.** The tab id's only specified properties are a random id made on first need and kept in `sessionStorage` (plan M3, lines 464 to 469 at revision 8). A different slice of the same random string is still such an id. | Plan text; `19:num` (the radix) and `18:if-false` KILLED |
| `withLocalStorage.ts` 13 `if-false` (`typeof window === 'undefined'` guard dropped in `set`) | **Equivalent.** Where `window` is undefined, `localStorage` is too, so `localStorage.setItem` throws a `ReferenceError` inside the `try`, and the `catch` returns `false`, the guard's own value. Where `window` exists, the guard is false anyway. | Source at `4b8db9c` lines 12 to 18; `13:===` and `13:false` KILLED |
| `withLocalStorage.ts` 19 `true` (`new Event('storage', { bubbles: true })` → `false`) | **Equivalent.** The event is dispatched on `window`, which has no ancestor to bubble to. Listeners on `window` receive it either way. | Source line 19 |
| `messageDrafts.ts` 50 `if-false`, **ABORTED** (`if (oldest === undefined) return false;` dropped) | **Not a survivor, and not credited as a kill.** The retry loop never ends: the worker running `messageDrafts.bound-and-recency` dies with a JavaScript heap out-of-memory error, 1791 of 1814 cases run, and the suite exits non-zero. Its two siblings on line 50 are KILLED by the dedicated cases "drops the least recently edited other entry and retries until the write lands" (`===`) and "drops the write, without throwing, once no other entry remains to drop" (`false`). | `sweep/…-mutant-118.{stdout,stderr}` ("FATAL ERROR: … JavaScript heap out of memory"; "Tests 1791 passed (1814)") |

So no survivor shows a behaviour the effort changed going unasserted, except QAF-25. QAF-25 is a value the effort carried
over on a rewritten line.

### Findings (effort-final pass)

QAF-25 LOW Phase 2 — `StyledLink`'s rewritten `LinkProxy` keeps `prefetch: false`, and no case fails when it is lost.
- **Property wanted checked.** A `StyledLink` renders its `next/link` with `prefetch={false}` unless the caller passes one.
- **Failure scenario.** A later edit of the `mergeProps` call that M4 rewrote drops or flips the default. Every
  `StyledLink` on the site then prefetches its route in production, and the suite stays green
  (`StyledLink.tsx:34:false` survives).
- **Why LOW and not the severity floor.** The plan does not claim this preservation. M4 claims `StyledLink`'s props
  unchanged, which they are, and prefetch is internal.
- **Route.** M4 is capped (steering's block 2026-11-19T04:14Z): below HIGH, a gap on M4 goes to the plan's Planner batch
  as a stated limit with no fix round. So it goes to `planner-hooks-017` for the Planner batch, by SendMessage, or to
  `steering-roadmap-hooks` if that session is not live.

### Plan-level verdict

**QA Complete** for plan 017 at website `4b8db9c` and generator `8512a1d`:
- every milestone M1 to M8 has a QA Complete Phase 2 at a SHA whose milestone surface is unchanged to these tips;
- the effort-final sweep is run and every survivor dispositioned;
- revision 8 moves no verified criterion;
- QAF-25 LOW is a Planner batch limit under the M4 cap and does not block.

The plan's Status moves to `QA Complete`. Rows inherited and not discharged go to UAT and devops: B-1, B-2, B-3, B-4,
B-12, B-13 (UAT, pre-release); B-6 to B-11 (post-deploy, devops's Stage 1 carrier). A release tip carries its own
verdict (Phase 3).

### Milestone surfaces at the tip (settled, not assumed)

Each production file the effort changed is mapped to the commits that touched it, over `1ad625e..4b8db9c`
(`qa-final/production-file-commits.txt`, 24 files). Every commit in the range belongs to a milestone that passed code
review and its own Phase 2. Where a later milestone touched an earlier one's file (`MessageProvider/index.tsx`: M2, M3,
M4; `StyledLink.tsx` and `NavigationGuardProvider.tsx`: M4's two rounds; `messageDrafts.ts`: M3's two commits;
`useUnloadAlert.ts`: M3 and M4; `ConfirmationDialog.tsx`: M4 and M8), the later milestone's pass ran the whole suite. The
earlier milestone's cases stayed green there and are green at `4b8db9c`. This sweep mutated the tip's lines under the
whole suite, so the earlier milestones' cases had the chance to kill a mutant of a later edit.

### Assumption Not Checked (effort-final pass)

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

## Plan-level verdict re-issued at website `7293a35` and generator `8512a1d`

**Brief**: `steering-roadmap-hooks` (17:5xZ): "QA Phase 2 for M2, including your plan-level verdict, with R-47 and M7-b
re-read at that tip". **Plan**: revision 11 (`a971ed8`). Revisions 9 to 11 move no criterion verified here, other than
M2's, which M2's passes verified (`qa/017-existing-items-backlog-m2-qa.md`).

Basis, each re-derived at the trees:
- **Production since the effort-final pass.** `git diff --numstat 4b8db9c 7293a35`, outside `__tests__`, changes two
  files: `usePusher.ts` (6 added, 3 removed) and `shared.ts` (1 added, 1 removed). `git diff -U0` shows the `shared.ts`
  change is its one `pusher.trigger` line, which revision 10 puts on M2's surface. No other milestone's surface moved, so
  the M1 and M3 to M8 verdicts stand at their SHAs, as § "Milestone surfaces at the tip" records.
- **Sweep coverage of the effort's production diff.** `1ad625e..4b8db9c` was swept at the effort-final pass (above).
  `4b8db9c..24e9be7` was swept in M2's pass: 17 of 19 and 5 of 8, with the two survivors closed at `7293a35`.
  `24e9be7..7293a35` has no production line. Every survivor is dispositioned.
- **Generator.** The chain branch is still at `8512a1d` (`git -C preview-image-generator rev-parse HEAD`,
  `branch --show-current`). M6's verdict and the security approval (`4ae4825`) stand.
- **Suite and typecheck at `7293a35`.** 1853 of 1853, 144 files, exit 0; typecheck exit 0.
- **M7-b at `7293a35`.** 60 changed lintable files, 0 above the base, 3 of 3 plants found.
- **Findings.** None of QA's is open. QAF-25 is stated limit X-24, QAF-26 was folded at revision 11, and QAF-27 is
  resolved.

**QA Complete for plan 017 at website `7293a35` and generator `8512a1d`.** The plan's Status moves to `QA Complete` (R-60).
Rows inherited and not discharged go to their owners:
- UAT, pre-release: B-1 to B-4, B-12, B-13 and B-15.
- devops's Stage 1 carrier, post-deploy: B-6 to B-11.

A release tip carries its own verdict (Phase 3). Assumptions Not Checked routed to UAT: B-15's build kind (M2's pass), and
the bare-frame decode at B-1 (code review's).
