---
ID: n/a
Origin: fix-v1-guild-messages-auth
UUID: 9c90dfa0
Verified-At: "76061494555df97cd23813b0a96b5645335ed542 — website, branch fix/v1-guild-messages-auth; every execution ran in isolated exports of this commit (blob identity verified, 378/378 files under src)"
Status: QA Complete
Status-Detail: "Production behaviour verified at website 7606149. QAF-1 discharged at ddbd750 (test-only, blob equality); release-tip verdict at ddbd750 in qa/website-2026-10-10-release-tip-qa.md. Deploy is held on blocking release conditions B-1 (owner key check) and B-2 (HOOKS_HOST read)."
Phase: 2
---

# QA Report: fix-v1-guild-messages-auth

**Plan Reference**: none (fixer route). The scope authority is `agent-output/steering/v1-guild-messages-auth-rulings.md`, blocks "fix route: Fixer", "rider: 400 with no `.end()`" and "rider 2: `messages/codes/[code].ts`".
**Implementation Reference**: `agent-output/implementation/fix-v1-guild-messages-auth-implementation.md` (`Handoff-At` 7606149).
**Code Review Reference**: `agent-output/code-review/fix-v1-guild-messages-auth-code-review.md` (APPROVED_WITH_COMMENTS, `Reviewed-At` 7606149).
**Defect record**: `agent-output/handoff/v1-guild-messages-endpoints-unauthenticated-2026-08-24.md` (8818bd89).
**Captures**: `agent-output/verification/fix-v1-guild-messages-auth/qa-*`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-10-10T08:20 | steering (subagent spawn) | QA Phase 2 for the fixer route at website `7606149`, carrying CR-1 | **Stage start**: the code review's committed verdict, APPROVED_WITH_COMMENTS at `Reviewed-At` 7606149. I re-derived that `git -C website rev-parse HEAD` = 7606149 on `fix/v1-guild-messages-auth`, and the shared tree's scope paths equal 7606149 (`git diff --quiet 7606149 -- src/pages src/middleware.ts src/server/api` exit 0). Steering's brief arrived. Fixer route: no plan, no Phase 1, no UAT. **Verdict QA Complete at 7606149.** The suite is 592/592 with exit 0. A 13-class mutation sweep found the 401-not-ended mutant (CR-1) and 3 exact-form loosenings surviving. A ready test-only patch kills 3 of those 4 survivors, and the fourth is equivalent at the HTTP boundary (QAF-1). The raw-socket attack at 7606149 found 0 breaches in 112 cases, with the positive controls firing. A probe shows Statbot's axios keeps the Authorization header across the http→https redirect to hooks.gg, and drops it when the redirect changes host. Register B-1..B-4 minted. |
| 2026-10-10T08:29 | steering (message: devops Stage 1 needs a verdict naming ddbd750) | Extend to the release tip ddbd750 | `7606149..ddbd750` is 1 commit touching only the test file, at the QAF-1 blob, so QAF-1 is RESOLVED. The release-tip verdict is a separate Phase 3 record, `qa/website-2026-10-10-release-tip-qa.md`: Release Verified at ddbd750 (suite 598/598, exit 0). This document's `Verified-At` stays 7606149. Process fact: this row, the QAF-1 collapse and the `Status-Detail` edit were first written with an in-place Python heredoc. The lifecycle skill requires the file-editing tools for record documents under auto mode, so that was a breach of form. I checked the content by grep (1 disposition line, 1 row), and this sentence was added with the Edit tool. |

## Scope and criteria (recorded before execution)

Fixer route, so there is no Phase 1 by the owner's selection (rulings, "fix route: Fixer"). This pass assesses four criteria, taken from the rulings blocks and the brief's guidance as the code review recorded them:

1. **C-1.** Both v1 guild-messages handlers refuse every caller that lacks the Statbot key. This is verified by executed requests, not by reading the diff (8818bd89, "masking").
2. **C-2.** The accepted form is exactly `Authorization: Bearer <key>`, and the guard fails closed when `STATBOT_API_KEY` is unset or empty.
3. **C-3.** The ZodError → 400 path completes the response in both v1 handlers (rider) and in `messages/codes/[code].ts` (rider 2), and each has a test.
4. **C-4.** Test adequacy on the touched surface, against Test Conventions (`agent-output/CLAUDE.md`). This includes CR-1, which the code review routed here.

**Example → class.** C-1's examples (no header, wrong bearer, empty bearer) stand for the class "any request whose `Authorization` value is not byte-equal to `Bearer <key>`". The suite covers 5 members of that class. The raw-socket attack covers 21 credential variants, 7 methods and 20 request-target shapes per endpoint. The mutation sweep below measures which loosenings of the class the suite would miss. C-2's "exactly" is the same class seen from the accept side.

**Architecture.** `agent-output/architecture/system-architecture.md` and `agent-output/architecture/website.md` were read for the deploy model: Vercel, owner ruling 2026-08-23. Neither records an auth design for `v1/`. There is no roadmap for `website` in this record.

## Implementation Review

`git -C website diff --stat f2c85f5..7606149` touches 9 files:

- `src/middleware.ts`: the dead `/api/v1/*` branch and its module-scope key read are removed.
- `src/pages/api/v1/guilds/[guildId]/messages.ts` `handler` and `.../messages/[id].ts` `handler`: a request-time key guard is the first statement, and the 400 path now calls `.end()`.
- `src/pages/api/messages/codes/[code].ts` `handler`: the 400 path now calls `.end()`.
- 3 new spec-form test files, 1 tightened test file, and 1 lifted helper (`helpers/apiResponse.ts` `makeRes`).

There is no overreach beyond the three rulings blocks. I found no website-internal caller of `/api/v1`: `git grep -n "api/v1" 7606149 -- . ':!**/__tests__/**'` returns only Discord API URLs.

**Fixer TDD evidence.** On a fixer chain the fixer's Test section is the evidence, and no TDD table is owed. I re-derived the captured counts with `node` over the JSON reports:

| Capture | Total | Passed | Failed | Failure messages |
|---|---|---|---|---|
| `red-f2c85f5` | 18 | 2 | 16 | `expected 200 to be 401` ×14, `expected 405 to be 401` ×2 |
| `round2-red-1acffee` | 29 | 24 | 5 | `expected false to be true` ×5 |
| `round3-red-c8c3d70` | 3 | 0 | 3 | `expected false to be true` ×3 |
| `mutant-no-fail-closed` | 24 | 20 | 4 | (fail-closed cases) |
| `mutant-single-unguarded` | 24 | 16 | 8 | (single-endpoint cases) |

Every red run has a valid failure reason, and none is a compile-time failure.

## Test Execution Results

The fences applied on every run:
- `DATABASE_URL=postgres://u:p@127.0.0.1:1/none`, Redis at `127.0.0.1:1`, and `STATBOT_API_KEY` unset unless a mode sets it.
- Each export had no `.env*` file, and `website/.env.local` was never read.
- No request was sent to `hooks.gg`.
- Export: `git archive 7606149 | tar -x`, with `node_modules` linked to the website's and the gitignored `next-env.d.ts` copied in (typecheck needs its image-module declarations). Blob identity: `git hash-object` equals `git rev-parse 7606149:<path>` for 378/378 files under `src`.

| Check | Result | Exit | Capture |
|---|---|---|---|
| Full suite (`vitest run`, JSON) | 592 total, 592 pass, 54 files, `success: true` | 0 | `qa-suite-7606149.json` |
| Same, without `SKIP_ENV_VALIDATION` | 592/592, 54 files | 0 | (scratch; identical counts) |
| File membership vs the fixer's `round3-suite-head.json` | identical path sets (0 only-QA, 0 only-fixer) | n/a | n/a |
| File membership vs `suite-f2c85f5.json` | +3 files (the three new tests), 0 removed; 566 + 18 + 5 + 3 = 592 | n/a | n/a |
| `pnpm run typecheck` (both tsc programs) | clean | 0 | `qa-typecheck-7606149.txt` |
| ESLint `--max-warnings=0`, 4 production + 4 test/helper files (shared tree, whose scope paths equal 7606149) | clean | 0 | `qa-eslint-7606149.txt` |

**Process fact.** The first typecheck in the export exited 2 (`TS2307` on `~/assets/img/product_image.png`), because the gitignored `next-env.d.ts` was absent. I copied it from the shared tree, and the re-run was clean. ESLint cannot run from the export, because the linked `node_modules` resolves `eslint-plugin-react` twice ("couldn't determine the plugin uniquely"). It ran in the shared tree, read-only.

### C-1 / C-2: executed HTTP attack at 7606149

The driver is the code review's `code-review-raw-attack.py` (raw sockets, with its oracle fixed in its header), run against `next dev --webpack` on the export.

Module-scope branch check: `src/env.mjs` branches on `SKIP_ENV_VALIDATION`, so the run set it to 1. No other module-scope branch exists on the route. The server was started under `env -i` with only `PATH`, `HOME` and the fences.

| Mode | Cases | Breach | Positive control | Capture |
|---|---|---|---|---|
| key `probe-key` | 100 | **0** | 4/4 `CONTROL-OK` (500 + logged DB connection error) | `qa-attack-keyed-7606149.txt` |
| key unset | 12 | **0** | n/a (the would-be key is refused too) | `qa-attack-nokey-7606149.txt` |

The negative control for this driver is the code review's run of the same driver on `f2c85f5`: 62 of 100 breached (`code-review-attack-control-f2c85f5.txt`). The auth surface is byte-identical between c8c3d70 and 7606149 (`git diff --quiet c8c3d70 7606149 -- src/middleware.ts src/pages/api/v1 src/server/api/v1`, exit 0). So this run re-derives the review's result on the shipped commit and adds nothing new to the class.

### C-3: the 400 completes, over HTTP

With the same server keyed and the correct bearer:
- `GET /api/v1/guilds/abc/messages` → 400, 0 B, 0.011 s;
- `GET .../messages?extra=1` → 400, 0 B, 0.008 s;
- `GET .../messages/x` → 400, 0 B, 0.008 s;
- `GET /api/messages/codes/abc123?extra=1` → 400, 0 B, 0.64 s.

All curl exits were 0 (`qa-http-malformed-7606149.txt`). The fixer's before-fix captures show these requests hanging at 15 s.

### Mutation sweep: the guard and the 400 paths

The instrument is `qa-mutation-sweep.js` (sha256 `9d6f6e72…8dd500bb`; run as `node qa-mutation-sweep.js <export> <out>`), and the result is `qa-mutation-sweep-7606149.json`.
- Population: 13 mutant classes seeded at the guard's branch conditions, comparison and response, and at the three 400 sites. Each class ran per handler, 25 mutants in all.
- Exclusions: mutants of the query schemas and the DB path, which are outside this fix.
- Each mutant is an exact single-match replacement (non-matches are reported INVALID; there were none), run over `vitest run src/server/api` (8 files, 102 cases), then restored. Restored bytes were verified equal for all 25. The baseline and the post-sweep run are both 102/102 with exit 0.

| Mutant (each in list and in single) | Killed? | Cases that reddened (per handler) |
|---|---|---|
| M01 drop `!key \|\|` | yes | the 2 fail-closed cases |
| M02 `\|\|` → `&&` | yes | 8: the 5 refusals, POST, unset and empty |
| M03 guard removed | yes | 8 |
| **M04 `res.status(401)` without `.end()`** | **no**, 0 of 102 (CR-1 confirmed) | none |
| M05 401 → 403 | yes | 8 |
| M06 401 with a JSON body | yes | the 5 refusals (`body` undefined) |
| **M07 exact match → `startsWith`** (accepts `Bearer <key><suffix>`) | **no** | none |
| **M08 case-insensitive compare** | **no** | none |
| **M09 `.trim()` the header** | **no** | none |
| M10 header merely `includes` the key | yes | bare key, `Basic <key>` |
| M11 method check before the guard | yes | the unauthenticated POST |
| M12 v1 400 without `.end()` | yes | the list's 2 / the single's 3 malformed cases |
| M13 `[code].ts` 400 without `.end()` | yes | the 3 malformed cases |

Non-discriminating cases: none. Every case in the three new files reddened under at least one mutant of its own surface. The two accept-form cases are the exception: they are positive controls and redden only under breakage of the accept path, which no mutant here makes.

## Findings

QAF-1  RESOLVED — the patch landed as website `ddbd750`, the single path at blob `7dcbfa69…`, with the M09 equivalence stated in the patch's argument. Discharge recorded in `qa/website-2026-10-10-release-tip-qa.md`. The argument and evidence are in this document as committed at agent-output `9b4de7e`, and in `verification/fix-v1-guild-messages-auth/qa-cr1-ended-assertion-runs.txt`.

**CR-7 (helper placement)** was not taken up. The patch touches no import, so the finding stays with the hardening handoff, item 5. CR-3, CR-4 and CR-5 stay there too: `handoff/website-api-handler-hardening-2026-10-10.md`.

**Convention audit of the touched surface's tests** (the 4 test files and the helper at 7606149):
- The ID-token class scores 0 in all 5.
- No file reads a production source file: `grep -cE 'readFileSync|readFile\(|__filename'` returns 0 in each.
- Expected values are literals.
- No pin, revert guard, transcription or never-red framing is present.
- The `valid-exposure` docblock specifies an instrument, not a round.

No class-table disposition applies.

## Release-path finding cleared: Statbot's key survives the HTTP→HTTPS redirect

In production, Statbot builds its hooks.gg client as `http://${HOOKS_HOST}:80`:
- `statbot-utils/src/api/ApiUtils.ts` `createInstance`, with `external = !port`, so it is false at port 80;
- `statbot-api/src/server.ts` and `statbot-statrole-remake/src/discord/client.ts` both pass `port: ENV === 'development' ? HOOKS_PORT : 80`.

Every production call therefore starts on plain HTTP. A Vercel domain answers plain HTTP with a redirect to HTTPS. That is Vercel's documented default, and it was not probed here, which is the Assumption Not Checked below. If axios dropped `Authorization` on that hop, the guard would refuse Statbot even with matching keys.

**Instrument.** `qa-redirect-auth-probe.js` (sha256 `5d2fea20…0147b`) loads each consumer's installed axios (1.8.2) and its follow-redirects. statbot-api resolves 1.15.6 and statbot-statrole-remake 1.15.11. All sockets go to a local server, and no connection leaves the box. Output is in `qa-redirect-auth-probe.out`:

| Case | statbot-api | statbot-statrole-remake |
|---|---|---|
| SUBJECT `http://hooks.gg:80` → 308 `https://hooks.gg/…` | Authorization **present** on final hop | **present** |
| CONTROL+ `https://hooks.gg` → same host | present | present |
| CONTROL− `http://hooks.gg:80` → `https://evil.example` | **absent** (the stripping control fires) | absent |
| VARIANT `http://www.hooks.gg:80` → `https://hooks.gg` | **absent** | absent |

So the production shape keeps the key, **provided `HOOKS_HOST` is the apex `hooks.gg` in each consumer**. A `www.hooks.gg` host would lose the key on the redirect, and every call would get a 401. statbot-api's value is recorded as `hooks.gg` (`/usr/local/bin/statbot/agent-output/architecture/system-architecture.md`, "hooks"). That is a record, not a read of the host. statroles' value is not established. This becomes B-2.

Callers found by grep (`hooksgg|hooks\.gg|HOOKS_API` over statbot source, excluding `.env*`, `node_modules` and `dist`): statbot-api (its `/api/v3/guilds/:id/hooksgg/messages` route, which the dashboard reaches through statbot-proxy) and statbot-statrole-remake (notification sends). The two lockfiles pin different statbot-utils commits (statbot-api `3d18250`, statroles `c856e1f`). The `createInstance` read above is from the local `statbot-utils` checkout; each pin's copy was not read.

## Blocking-condition register (chain register, minted here)

Standing note: this register is point-in-time. The deployment record, and then the carrier handoff, are authoritative on each row's execution state.

> **BLOCKING RELEASE CONDITION** — B-1 and B-2 must be executed and recorded before merge/deploy.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | Statbot's `HOOKS_API_KEY` (every consumer that calls hooks.gg: statbot-api, statroles) is byte-equal to the website's Vercel Production `STATBOT_API_KEY`, and the latter is set and non-empty (criterion C-2, release side) | Owner's comparison of the two values; the research's salted-HMAC digest comparison is the byte-exact form (OWNER-QUEUE "Check that Statbot's hooks.gg key matches the website's") | Owner (sole holder of both stores) / none | Now | "match" | If they differ, the moment the fix deploys, statroles notifications that use a hooks.gg message stop sending and the dashboard's hooks.gg message list fails. A trailing space counts as a difference. | Owner | `agent-output/steering/v1-guild-messages-auth-rulings.md` (steering records his answer) | Open |
| B-2 | observable pre-release | `HOOKS_HOST` is exactly `hooks.gg` (apex, not `www.`) in each production consumer's environment (C-2, release side; this pass's redirect probe) | Per prod host, a count-only read over the process environment file: `grep -cx 'HOOKS_HOST=hooks.gg'` (no value printed); devops establishes which file each pm2 process loads | devops over `prod-ro-access`, the read put to the owner as that session's ask / owner reads it himself | Now | 1 per consumer (statbot-api host, statroles host) | If any consumer uses another host form, Authorization is dropped on Vercel's redirect, and that consumer gets 401 after deploy even when B-1 is "match" | devops | the deployment record for this release (devops creates it) | Open |
| B-3 | post-deploy-observable | The deployed list endpoint refuses an unauthenticated request (C-1 on the deployed build; the code review's Assumption Not Checked) | One unauthenticated `GET https://hooks.gg/api/v1/guilds/9999999999999999999/messages`, recording status and body length only | devops, with the owner's sanction for the one production request (steering's fence) / owner by browser | Vercel reports the production deployment for the merge commit as live | `401`, 0-byte body. The unfixed tree gives `200` with a 2-byte `[]` (measured, research F4), so one observation distinguishes by construction | If it is still `200`, the deploy did not ship the guard (stale or failed build), and the exposure is live | devops | the deployment record; if open at deploy, the post-deploy carrier handoff named `fix-v1-guild-messages-auth-post-deploy` under `handoff/` (devops creates it at Stage 1; not yet existing) | Open |
| B-4 | post-deploy-observable (liveness row beside B-3's refusal) | Statbot's own authenticated calls still succeed after deploy (C-2) | Owner opens the Statbot dashboard's statrole editor for a guild that has hooks.gg messages and sees the hooks.gg message list populate (this path goes through statbot-api → `/api/v1/guilds/:id/messages`) | Owner / fallback: Vercel request log for `/api/v1/guilds/*/messages*` after the deploy time, 401 count from Statbot's egress vs 200 count | After B-3 passes. For the fallback, at least one Statbot call must appear in the window (liveness precondition), with the deadline at 24 h after deploy | The list populates. One populated list refutes a mismatch for statbot-api by construction. Statroles is covered only by the fallback or by a statrole notification that sends | If the list errors or is empty where messages exist, the keys or the host differ (B-1 or B-2 were wrong); revert or fix the env | devops (owner as subject) | same as B-3 | Open; depends on B-1 and B-2 |

B-1 asks the owner for an observation, never a file. It was already put to him through OWNER-QUEUE, so this register does not ask again. Withdrawing B-1 or B-2 makes B-4 the only check, and B-4 can only observe the failure after the break has happened.

**Deploy consequence**: what a merge to `master` deploys, and when, is devops's to establish. This pass read no release workflow.

## Assumption Not Checked

This pass assumes that Vercel answers plain-HTTP requests to `hooks.gg` with a same-host redirect to `https://hooks.gg/…`, or serves them directly, and it does not test this. No request was sent to production. If Vercel instead redirects to another host, the probe's CONTROL− shape applies: Statbot's Authorization is dropped and every Statbot call gets a 401 even with B-1 = match and B-2 = 1. The observable signature is Statbot calls getting 401 on the v1 routes after deploy while the keys match. Closing it belongs to **devops** at the deploy: B-4, or a `curl -sI http://hooks.gg/` (status and `location` only) under the same owner sanction as B-3.

## Verdict

**QA Complete at website `7606149`.**
- C-1 and C-2 are verified by execution: 0 of 112 breaches with controls firing, and the fail-closed cases hold with the key unset.
- C-3 is verified by HTTP and by mutants M12 and M13.
- C-4 is met except for QAF-1, which is test-only. It has a ready patch with red/green evidence, is owed before merge, and is discharged by blob equality.
- The suite is 592/592 with exit 0. Typecheck and lint are clean.

The release is held on B-1 and B-2. This verdict expires on any change to a production file in the fix range. A test-only commit that matches the QAF-1 blob does not expire it.

## Handoff

- **Fixer**: apply `qa-cr1-ended-assertion.patch` on `fix/v1-guild-messages-auth` and commit that one path (QAF-1).
- **Devops** (release): B-1 (the owner's answer is already routed through OWNER-QUEUE), B-2, then deploy. After the deploy: B-3, B-4 and the Assumption Not Checked. Before merge, confirm that the QAF-1 blob equality holds.
- No UAT on this route.
