---
ID: 015
Origin: 015
UUID: 861e5f61
Status: Active
Status-Detail: "Conformance pass on plan rev 3 (800ca67): APPROVED_WITH_CHANGES. AF-1 and AF-2 are required plan changes; AF-3 and AF-4 are recommended. No necessary deviation, so nothing goes to the owner from this pass. A later revision is read on its delta."
---

# Architecture Findings — Plan 015: Bug-evaluation fixes (conformance pass)

## Changelog

| Date | Event | Summary |
|---|---|---|
| 2026-11-08T05:15 | Conformance pass, plan rev 3 (agent-output `800ca67`), briefed by steering-hooks-015 | Every concrete form the plan writes was read against website `7ce866b` and preview-image-generator `471578f`, which are the chain branches' current HEADs. Result: two required changes (AF-1, AF-2), two recommended (AF-3, AF-4), and four conforming forms recorded (AF-5 to AF-8). Two Problem Areas registered: AF-9, and the master-document correction in AF-10. `system-architecture.md` § preview-image-generator was corrected to the read mechanism. The P-3 wording was proposed, not landed. **APPROVED_WITH_CHANGES.** Process disclosure: this run changed the master document's `Last Updated` header with an in-place `sed -i`, not with `record-edit.js` or the edit tools, which breaks the record-writing rule. The diff was read afterwards (7 insertions, 2 deletions), and that change is the only one outside the `record-edit.js` edits. |
| 2026-11-08T05:18 | P-3 put to the owner (role-internal selection prompt) | He selected "Agent: record intended". `preview-image-generator.md` P-3 was rewritten in place to the build-and-copy route, with his prompt quoted verbatim, which closes AF-10's second limb. |

## Verdict (rev 3): APPROVED_WITH_CHANGES

The plan fits the current architecture. Every fix lands at the site of its finding, and none of them adds a component, a dependency or a boundary.

- **AF-1 (required).** M6-l moves the validity predicate. The stored `valid` value, which the public v1 API serves, then holds two predicates side by side.
- **AF-2 (required).** M1-a's class leaves out two of the four `in`-over-a-list sites.
- **AF-3 (recommended).** M8-a's only criterion is a log-line count. The plan does not fix that line's text or say how many times it is emitted.
- **AF-4 (recommended).** Two forms the plan writes have no named destination.

No deviation is rated *necessary*, so none goes to the owner.

Every mechanism claim below was read at the base SHA. A claim that was not read is marked **unread**, and QA Phase 1 checks it.

---

## Required changes

### AF-1 MEDIUM — M6-l(ii) changes `validateMessage`, and stored `valid` keeps the old predicate for every row saved before the release

Read at `7ce866b`:

- `validateMessage` (`src/utils/limits.tsx`) is the one predicate behind three things:
  - the send gate;
  - the stored `valid` column, through `isMessageValid` (`src/server/api/utils/messageValidity.ts`), which `upsertMessage` writes on each save;
  - `src/scripts/backfillValid.ts`.
- `valid` is served externally. `src/pages/api/v1/guilds/[guildId]/messages.ts` and `…/messages/[id].ts` select `Messages.valid` and emit it whenever it is non-null.
- The backfill re-derives only rows where `valid` is null. Its `.where('valid', 'is', null)` appears in both the selection and the update guard.

M6-l(ii) adds a refusal: more than 40 components in total. After the release, a row stored before it with more than 40 components keeps `valid: true` until it is next saved, and the v1 API keeps serving that `true`. No instrument in the tree re-derives it.

The plan's RK-2 names the consumer side only for M2, which widens what saves. M6-l narrows what is valid, and the plan names no residue for it.

The population is unknown here, because no database is reachable from this box. It is also non-empty in principle. F-44 is itself the route by which more than 40 components entered a draft, through nested adds and container duplicates, and a JSON load is another route (**unread**: whether the load paths cap the total).

**Required of the planner.** M6-l states this residue, with one of these as its disposition:

- **(a) Stated limit.** Rows saved before the release keep their old `valid` value until they are re-saved. The carrier is the open handoff `handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`, whose trigger reads "if a second backfill-style mass-mutation script is written". This option writes no script, so that trigger does not fire; the residue is recorded beside the handoff, not inside it.
- **(b) A re-derivation in the chain.** This would mean a new backfill mode over non-null rows, which modifies `backfillValid.ts` and does fire that handoff's trigger. It is a scope change and would go to the owner.

I recommend (a). It follows the current pattern: `valid` is a value recorded at save time, and D-005 / `website.md` W-2 say validity is recorded, never enforced. The residue only has to be visible.

### AF-2 MEDIUM — The F-2 class has four sites at `7ce866b`; M1-a names two

The plan's Testing Strategy states the class as "Kysely predicates over … a possibly-empty list". `grep -rn "'in'," src/server` at `7ce866b` returns four sites:

| Site | Guard today |
|---|---|
| `shared.ts` `getUserRecentMessages` | none (M1-a) |
| `shared.ts` `getPartialMessages` | none (M1-a) |
| `user.ts` `authorizeUser` | `if (messageIds)`. This admits `[]`, which is truthy. |
| `authorizeGuildUser.ts` `getOldMessages` | none |

The last two receive `messageIds` from `message.ts` `authorizeAction`, out of router input. **Unread:** whether any router's input schema admits an empty array. That decides whether these two sites are reachable or only latent.

**Required of the planner.** Do one of the following:

- widen M1-a's property to all four sites; or
- name the two excluded sites, giving each one's reachability as read from the router input schemas.

**Pattern.** No empty-list guard exists under `src/server`. The two `length === 0` returns in `shapes.ts` are tree pruning, not query guards. So the guard is a new form whichever way the planner goes. I recommend one form at every site: return before the query is built. `getPartialMessages` is the exception, because its list sits inside an `or`, so there the `exists` limb is dropped when `guilds` is empty, as M1-a's property already requires.

---

## Recommended changes (preferable, not blocking)

### AF-3 LOW — M8-a's criterion counts a log line whose text and multiplicity the plan does not fix

M8-a's criterion reads "the out log shows one shutdown line". The instrument that reads it is `verification/015/pig-host-read.sh` [5a] (`9b99acd`). That step counts lines matching `Server received` over the whole out log. Today the line is `shutdown()`'s first statement, `'Server received SIGINT. Closing server.'` (`src/server.ts`).

P1 sends two triggers into `shutdown()`, and PM2 can deliver both. Two consequences follow:

1. **Multiplicity.** If the idempotency guard sits after the log line, a single stop logs twice. The criterion then fails although the behaviour is correct. The line must be emitted once per drain, inside the guard.
2. **Text.** The line has to keep the `Server received` prefix the instrument anchors on. It should also say which trigger arrived, the message or SIGINT, because that is exactly what M8-0 is trying to observe.

**Observability (normal telemetry).** P3's drain time is currently inferred from timestamps in `pm2.log`. `Server closed.` covers only `server.close`, not `getPool().drain()`. I recommend one more line, logged when the drain completes, that states the elapsed milliseconds. The measurement is then read directly. That line carries no secret and no PII.

**Recommended to the planner:** add both limbs, (1) and (2), to M8-a's criterion, plus the drain-complete line.

### AF-4 LOW — Two lifted or new forms have no named destination

- **M6-l(iii), `countTotalComponents`.** The current pattern for a counter that a validator uses is `src/utils/limits.tsx`. `sumDisplayableText`, a module-private recursive counter with a structural parameter type, feeds `validateDisplayableTextCount` there. The bound `MAX_TOTAL_COMPONENTS` lives in `~/constants`. The lift therefore goes into `limits.tsx`, exported, with the editor importing it, and with a structural parameter type in place of `EditableTopLevelComponent`, because `validateMessage` receives `MessageData` components, which carry no `_key`. `website.md` A-3 is the precedent for having one definition. Its location, `shapes.ts`, is not a precedent, because A-3 is a shared notice string, not a validator.
- **M8-e, the `API_KEY` refusal.** `src/config.ts` is the generator's only reader of the environment. Today it casts `process.env` without validation and composes `API_KEY` as `` `Bearer ${process.env.API_KEY ?? ''}` ``, so an unset key makes `"Bearer "` the accepted header. The refusal belongs in `config.ts`, where every consumer reads the value, not in `server.ts`. The other values `config.ts` casts (`CDN_*`, `PREVIEW_ENDPOINT`) are in the same class and fall outside F-35. They are registered in AF-9 and not added to the plan.

---

## Conforming forms (recorded; no change)

- **AF-5 INFO — M3 per dialog.** The defect is three identical one-line guards: `document.activeElement?.tagName !== '~/components/Button'` in `ConfirmationDialog.tsx`, `WarningDialog.tsx` and `ImageUploader.tsx`. That is the signature of one replace-all edit. A shared hook would not have prevented it, so lifting one now is an avoidable deviation. Follow the current pattern, as the plan does.
- **AF-6 INFO — M5-e, two `getDateString` copies.** `Header.tsx` and `f/[id]/page.tsx` differ in output: one prefixes `Today at`, the other returns the time alone. So a lift needs a parameter, and it is a preferable deviation, not a necessary one. Follow the current pattern and fix both copies, as the plan does. This is registered in AF-9.
- **AF-7 INFO — M2-b / M2-d constants.** Both bounds come from `~/constants`, which re-exports `./messageLimits` and holds `MAX_EMBED_AUTHOR_NAME_LENGTH` and `MAX_EMBED_FOOTER_TEXT_LENGTH`. `shapes.ts` and `EmbedFooter.tsx` already read them from there. M2-b's change makes the editor read the same constant the save schema reads, in place of today's `MAX_NAME_LENGTH` (80, the username bound). That is the M2-d pattern, so it conforms.
- **AF-8 INFO — M1-j altitude.** `src/utils/redis/index.ts` `getItem` returns `null` both for a miss and for a stored `null`. That one helper serves every cached function (three `expireSeconds: 600` callers). The fix conforms when it lands in that helper, and M1-j's property is then true of every cached caller, not only the two it names. The implementer places the fix there. This is not a plan change.

---

## Cost at the record's extreme

**AF-9a INFO — `upsertMessage`'s count runs on every save.** M1-d changes only the comparator. The cost it sits beside is unchanged by the plan, and it grows with the record:

- `upsertMessage` (`shared.ts`) runs `countAll()` over `Messages` filtered on `fk_users_id` or `fk_guilds_id`.
- It runs on **every** save, including updates, whose result is then unused (`!message.id &&`).
- `project-utils/prisma/schema.prisma` declares no index on either column, and Prisma creates none for foreign keys on Postgres. So the count may be a scan of the whole table on every save.

**Unread:** the live database's actual indexes (`\d "Messages"`). No database instrument exists on this box, and `.env.local` is off limits under the workspace hazards. Not measured. Registered as a Problem Area; it does not block.

## Problem Areas registered (AF-9)

Each is recorded in `system-architecture.md` § Problem Areas:

- (a) The `Messages` count on every save, with no declared index (above).
- (b) The generator's `config.ts` casts every environment value without validation (AF-4).
- (c) The two copies of `getDateString` (AF-6).
- (d) `deploy.sh` runs `rm -rf deployed/$ENV` and copies the new tree **before** `pm2 startOrReload`. So the running process drains, once AF-3/P1 make it drain, out of a directory that has already been replaced. **Unread:** whether anything is loaded lazily from disk during `drain()`.

## AF-10 — Record lines this chain touches

- **`system-architecture.md` § preview-image-generator.** Corrected in this pass to the mechanism read from code. The SIGINT handler exists. PM2's configured stop (`shutdown_with_message: true`) sends an IPC message instead; that is read from PM2 source in the analysis and is pending the host confirmation of M8-0. Deployment is `prod.yml` on a self-hosted runner: `npm ci` (skipped when the lockfile cache hits), `npm run build`, a copy to `deployed/prod`, then `pm2 startOrReload`. After M8 lands, the line is reconciled to the implemented stop path.
- **`preview-image-generator.md` P-3 (confirmed inference).** What he ratified was *"a git checkout on the `prod` branch under PM2, with no build step — the checkout is production"*. `prod.yml` contradicts that in two parts: there is a build step, and the deployed tree is a copy of the build, not the checkout. Under that grade his "Intended." does not cover the mechanism that actually runs. **Resolved 2026-11-08T05:18Z, on the owner's selection "Agent: record intended".** P-3 was rewritten in place to the build-and-copy route. The prompt is quoted verbatim in the entry.
