---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "AN-1, AN-2 and AN-3 answered for the planner's revision 1, each finding labelled with its provenance. Two gaps remain open: the Vercel project's Fluid-compute and maxDuration settings (an owner read, sent to steering-roadmap) and the generator's render time (no record holds it)."
---

# Analysis 017 — the existing-items backlog: AN-1 (item 3), AN-2 (item 4), AN-3 (item 2)

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-18T22:26 | analyst-hooks-017 | Created. Commission: plan `017-existing-items-backlog.md` revision 0 (agent-output `f2153bd`), "Analysis commissioned" AN-1 to AN-3; brief `steering/backlog-2026-11-18-briefs/analyst-hooks-017.md` (`270d885`). Plan diff to `53a438d` and rulings blocks up to 22:18Z re-read before this write: neither changes an AN scope. |

## Value Statement and Business Objective

Revision 1 of plan 017 needs three facts that nobody has established. Item 3: whether the saving tab still raises "Message Update Detected" at `395510e`. Item 4: what a signed-out user can actually lose, and what the App Router offers to stop a navigation. Item 2: whether work a save starts can finish after the save has answered, on the Pages Router tRPC route as deployed. Each finding below is labelled with its evidence strength so the planner knows which ones a criterion can rest on.

Roadmap / Master Product Objective: not cited. The standing owner prohibition in this workspace's memory (`roadmap-no-mention.md`) applies, and this commission's scope words do not call for a roadmap read.

## Context and method

- **Trees.** Website `395510e`, exported with `git archive` into the session scratchpad with its own `pnpm install --frozen-lockfile` (exit 0). The shared `website` tree, held by chain A, was not run, edited or installed in. For the history question, a second export was made at `a74b9e2` (the production tree BC-14 ran against, per the handoff) with its own install. `jsdom`, the only `package.json` difference between the two trees (`git diff a74b9e2 395510e -- package.json`, one added line), was symlinked from the `395510e` install. The `395510e` DOM test harness was copied in as test-only files: `vitest.config.ts`, `vitest.setup.dom.ts`, `src/components/__tests__/helpers/dom.tsx` and `src/providers/MessageProvider/__tests__/helpers/*`. No production file in either export was changed.
- **Probes.** All probes are vitest files that mount the real `MessageProvider` (with `usePusher` and `useApiMethods`) under jsdom, run under `unshare -rn` (no network). The AN-2 probe also ran in a `systemd-run` scope capped at 3G and 300 s. The AN-3 proof of concept is a minimal Next app built and served by the installed Next `16.1.6` (`next build --webpack`, `next start` inside `unshare -rn` with loopback raised). Every process was stopped; `ps` after the runs showed none of this session's.
- **Evidence.** `verification/017/analysis/` holds `an1/`, `an2/` and `an3/` (probe sources, row tables in JSON, vitest output, POC sources and logs, Vercel CLI captures).
- **No Pusher publish and no local build save.** There was no database, no `.env.local` read and no Pusher client with credentials. So the owed reads of `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md` are **not** discharged by this run: no local build saved.

### Process facts of this run (lodged in the round)

1. **Secret-file gate, refusal 1.** `grep -rln … src` run after `cd` into the export was refused: the hook could not bound the relative path away from `preview-image-generator/.github/workflows/prod.yml`. The search was never aimed at that file. It was re-issued once with the export's absolute path, which shows the hook the true target and is the form the hook's message names as not a workaround when the target is shown. It printed only website-export paths.
2. **Secret-file gate, refusal 2.** `git -C preview-image-generator grep -c -E "<timing patterns>" 8de2b53 -- src` was refused. It was **not re-issued in any form.** As a result, whether the generator logs a render duration is unestablished (gap G-3).
3. **Probe defects, corrected before any result was used.** In AN-1's first run, members leaked state into each other through `localStorage`: the provider prefers a newer local copy (`getMessage` in `MessageProvider/index.tsx`). Its rows were discarded, and the probe now clears the store and installs a fresh stored object per member. AN-2's first run hit an out-of-memory error: the mock returned a new object on every render, which looped the fetch effect. It was fixed to return a stable object. Only the corrected runs are cited.
4. **Vercel CLI.** The box's CLI (29.1.1, signed in) has no `project inspect`. `npx vercel@latest` (66.2.0) `project inspect hooks-gg-website` exited 1 with `missing_scope` and the instruction *"Ask the user which team to use … Do not choose a team yourself."* The team was not chosen (gap G-1).

## Findings

Labels: **Verified** (executed: a probe or proof of concept), **Observed** (read from source or a record, not executed), **Inference**, **Hypothesis** (with confidence, the fastest disconfirming test and the missing telemetry).

### AN-1 — does a save raise "Message Update Detected" in the tab that saved? (item 3, OQ-4)

**Mechanism, read at `395510e` (Observed).**
- The server broadcasts `hashMessage(message)`, where `message` is the upsert route's tRPC-parsed input (`upsertMessage` in `src/server/api/utils/shared.ts`). The input schema is `z.object({ message: optionalIdMessageShape })` (`routers/message.ts`, `upsert`), whose `data` is `discordMessageShape`.
- The saving tab compares that hash with `hashMessage(normalizeForHash(messageRef.current))`, evaluated when the Pusher event is delivered (`usePusher.ts`). `normalizeForHash` applies `stripKeys` and then parses with the same `discordMessageShape`.
- `hashMessage` canonicalises key order and drops `_key`.
- The trigger names no `socket_id`, so the sender's own tab receives its broadcast.
- The two sides are equal exactly when the editor holds, at delivery, the data the request sent.

**Execution, `395510e` (Verified).** Probe `verification/017/analysis/an1/own-save-broadcast.probe.tsx`, rows in `an1/rows-395510e.json`, vitest `25 passed (25)`, exit 0.

Each member was run in both delivery orders (broadcast before the save's response, and after it). For each run the probe recorded the server hash, the client hash at delivery, and whether the notice was raised:

| Member | Server hash = tab hash | Notice in saving tab |
|---|---|---|
| Classic, nothing changed | yes (`-783dab8d`) | no |
| Classic, after an edit | yes | no |
| Classic, edit leaving trailing whitespace | yes (shape trims on both sides) | no |
| V2, nothing changed | yes | no |
| V2, after an edit | yes | no |
| V2 beside an empty embed (gate drops it, no dialog) | yes | no |
| "Choose which to keep" → Classic | yes (`-5d958a2b`) | no |
| "Choose which to keep" → V2 | yes (`599547e0`) | no |
| Not-valid draft that passes the shape (`{content:''}`, fails `validateContentRequirements`, read from code), nothing changed / after an edit | yes | no |
| Not-valid draft that fails the shape (`avatar_url: 'not-a-url'`) | — route rejects the input, no `pusher.trigger` | no |
| **Outside the class:** an edit typed after Save, before delivery | **no** (`-783dab8d` vs `-7f52ddc9`) | **yes** |

**Determination (Verified at hash and hook level).** At `395510e`, no member of AN-1's enumerated class raises the notice in the saving tab, in either delivery order. The probe can detect a mismatch: the outside-class member raises the notice.

The one path seen to raise it is an edit typed while the save is in flight. The tab then holds data newer than the broadcast hash, and the compare cannot tell its own save from another tab's. Whether the plan treats that as in or out of item 3 is the planner's call. It is reported here, not ruled.

**History, "still" (Verified at `a74b9e2`).** The same probe, unchanged (`cmp` identical), was run at `a74b9e2`: `an1/rows-a74b9e2.json`, `25 passed (25)`, exit 0. Every member gave the same result as at `395510e` **except the two "Choose which to keep" members, which raise the notice in the saving tab in both orders**. The tab holds the unresolved draft (hash `-20d59e41`) while the server broadcasts the resolved data. At `a74b9e2`, `commitSaveChoice` sends `applyDisposition(...)` data and never writes it back to the editor (`useApiMethods.ts` at `a74b9e2`).

That is code review CR-4's modelled mechanism, now executed. Because the editor keeps the mixed draft, every later Save of that message reopens the dialog and raises the notice again, **with nothing changed**. That is BC-14 limb (d)'s observable.

The fix is website `963a25c` (2026-11-11, "Save and the choice save share one step that stores the data and updates the editor to it"), preceded by `abdb71b`. Those two commits change the save step's editor write-back; `git log a74b9e2..395510e` over the hash and notice files lists the others (`460000b`, `4b9fadd`, `a665901` …). None of them changes `hashMessage`, `canonicalize` or `normalizeForHash`.

**What "still" can mean (Observed and Inference).**
- The choice dialog itself was introduced inside chain 013: M8 EC-3 `92ce026`, 2026-08-24, a first-parent ancestor of the first production deploy carrying it.
- Chain 013's M1-d criterion explicitly targeted false "updated elsewhere" prompts from key-order noise (plan 013, M1-d text, Observed). Pre-013, the hash was over `standardizeMessage` and the client compared `hashMessage(stripKeys(current))` (`git show c85945f:src/utils/index.ts`, `…/usePusher.ts`).
- So the own-tab notice BC-14 saw at `a74b9e2` **was produced by a path chain 013 itself added (the choice save), at a release whose M1-d targeted the false-prompt class.** "Surviving the fix that targeted it" fits the class; "pre-existing" fits only for a pre-013 own-tab notice, which was **not executed** here (gap G-5).

**Plan 013 R4 (stale pre-deploy tab), reconciled (Observed).**
- The hash change (`a4eb00d` canonicalize, `495463a` normalizeForHash) first reached production at `c85945f -> a151fb4`, 2026-08-25T00:56:37Z (013 deployment record §10; `merge-base --is-ancestor a4eb00d a151fb4` exit 0, `… c85945f` exit 1).
- Between `2d90e8a` and `a74b9e2`, the only hash-adjacent diff is cosmetic (`git diff 2d90e8a a74b9e2 -- src/utils/index.ts src/server/api/utils/shapes.ts`: a type punctuation change and a new export, nothing in `hashMessage` / `stripKeys` / `discordMessageShape`).
- **R4 explains limb (d) only if the owner's tab was loaded before 00:56Z, about 20 h before BC-14** (release 20:30Z).
- **Hypothesis H-1** (confidence Low): limb (d) came from a tab loaded before `a151fb4`. Fastest disconfirming test: whether the message BC-14 used carried V2 components beside content or embeds, which would have opened the choice dialog on every Save. Missing telemetry: none exists; the client logs nothing on a notice.
- **The same-version mechanism above is Verified and does not need H-1**, so revision 1 need not resolve it.

**Not established by AN-1 (gap G-4).** Real Pusher delivery to the sender and real network ordering were not exercised. The probe drives both delivery orders directly. A browser walk would need a Pusher publish from this box, which the commission forbids.

### AN-2 — what can a signed-out user lose? (item 4, OQ-5)

**Guard table, re-derived at `395510e`.** "Re-derived" means read in the export this session. Rows the determination's Out list names (delete, Clear, Load, mode switch, the signed-in Log out, the Enter-key compare) are marked Out and were re-read only where shown.

| Site | Trigger | Enabled on | Depends on sign-in | Status |
|---|---|---|---|---|
| `useUnloadAlert` (`src/utils/hooks/useUnloadAlert.ts`), `useBeforeUnload` | tab close / reload | `hasChanged` = `status === 'authenticated' && !typedDeepEqual(savedMessage.data, message.data)` (`MessageProvider/index.tsx`, `useValue`) | yes | Observed; signed out it is always false (Verified: `hasChanged: False` in every signed-out row of `an2/rows-395510e.json`) |
| `useUnloadAlert`, `Router.events.on('beforeHistoryChange')` | in-app navigation | same `block` | yes | **Dead for everyone**, see below |
| `Navigation.tsx` Reload | menu | `withConfirmation({ enabled: hasChanged })`; disabled for a non-API message | yes | Observed; unreachable signed out (route 0 is never an API message) |
| `Navigation.tsx` Clear | menu | `enabled: true` | no | Observed (Out) |
| Load, mode switch, deletes | — | per sweep | no | Out; not re-derived |
| `Redirects/Client.tsx` | any route other than `/message/m/0/edit` or `/0/send` while `unauthenticated` | `redirect('/message/m/0/edit', replace)`, no unsaved check | yes | Observed |
| `SessionProvider.tsx` | session cookie present but no session | `signOut()`, no check | yes | Observed |
| Sign-in (`edit/page.tsx` InfoPanel) | button | `signIn('discord', { callbackUrl: '/message' })` | — | Observed: lands on the message list, not the editor |

**What survives where (Verified at hook level).** Probe `an2/signed-out-loss.probe.tsx`, rows `an2/rows-395510e.json`, `7 passed (7)`, exit 0. A remount of the provider stands for reload, close-and-reopen, and the App Router mounting the editor at a new `[id]`.

| # | Path | Outcome |
|---|---|---|
| S1 | Signed out, edit at route 0, reload | **Nothing lost.** The draft is in `localStorage['message']` (written on every change by the `message` effect in `useValue`), and route 0 restores it because the stored copy has no `id` (`local.id ? copyIntroMessage() : local`). |
| S2b | Signed out, edit, sign in, go straight to route 0 | Nothing lost: the draft is restored. |
| **S2** | Signed out, edit, sign in (lands on `/message`), **open any saved message**, return to route 0 | **Draft lost, no warning.** Opening message 42 writes 42 into the store (fetch effect), and route 0 then sees `local.id` and loads the intro message. |
| **S3** | **Signed in**, unsaved edit on 42, then signed out and redirected to route 0 | **Edit lost and unrecoverable.** Route 0 overwrites the store with the intro message; reopening 42 signed in shows the saved version. |
| S4 | Control: signed in, unsaved edit on 42, reload | Restored from the store. This is why S3's overwrite is the loss: it removes the only copy. |
| **S5** | Two signed-out tabs on route 0 | **Last writer wins, no warning.** Tab A's draft is replaced by B's when A reloads. One store key; the `storage` listener updates `localMessageStore.current` but not the editor. |

**Not established by the AN-2 probe.**
- S3's trigger in production is either Log out (Out by determination) or `SessionProvider`'s `signOut()` when a session cookie outlives its session. That trigger was read from code, not run.
- S2's real sequence (OAuth round trip, then the list page) is modelled by remounts.
- That the App Router remounts `m/[id]/layout.tsx` on a param change is **Inference**. The S2/S3 outcome does not depend on it: the route-0 effect is keyed on `paramMessageId` and runs either way (Observed).

**In-app navigation guard (Observed in source, two reads, not run).**
- Next `16.1.6` (installed, `node_modules/next/package.json`) emits `beforeHistoryChange` only from the Pages Router class (`next/dist/shared/lib/router/router.js`, `Router.events.emit('beforeHistoryChange', …)`).
- `grep -c "events.emit|.emit("` over `next/dist/client/components/app-router.js` and `app-router-instance.js` gives 0 and 0.
- `next/router`'s `singletonRouter.events` getter returns the static `Router.events` emitter (`next/dist/client/router.js`), so `.on()` registers without error and the handler is never called under the App Router.
- Every editor page is under `src/app`. `steering-roadmap`'s refutation helper reached the same conclusion independently (rulings 22:18Z).
- **Validation path to make it Verified:** a real-browser walk of a `Link` click away from the editor with `hasChanged` true, confirming no `confirm()` appears.

**How the App Router lets a page stop an in-app navigation at `16.1.6` (Observed in installed source).**
- `next/link` (App Router build, `next/dist/client/app-dir/link.js`, `linkClicked`) calls an `onNavigate` prop with an event whose `preventDefault()` cancels that Link's navigation (`isDefaultPrevented`). It is typed in `link.d.ts` (`onNavigate?: OnNavigateEventHandler`).
- It covers `<Link>` clicks only.
- No App Router API in the installed source intercepts `router.push` / `replace`, `redirect()`, or back/forward. The search covered `app-router.js` and `app-router-instance.js` for any event emission (0).
- Hard navigations (close, reload, typed URL) remain `beforeunload`, which `useBeforeUnload` already wires.

**Existing use (Observed).**
- `grep -rl` over the export's `src` and `bot` for `onNavigate|popstate|beforeunload|useBeforeUnload|next/router` returns two files. `useUnloadAlert.ts` is the guard above. `ActionsMenu.tsx`'s `onNavigate: setActiveIndex` is a floating-ui list-navigation option, not the Next prop.
- `project-utils/src`: no hit.
- `preview-image-generator` is not a Next app (`grep -c '"next"' package.json` = 0).

### AN-3 — can work started by a save finish after the save's response? (item 2, OQ-3)

**Today's save (Observed).**
- `upsertMessage` starts `postMessagePreviewImage` with `void` and never awaits it: before the database write for an existing message, after it for a new one.
- The function swallows errors and ignores the answer.
- The save then `await`s `pusher.trigger` and returns.
- The route is `src/pages/api/trpc/[trpc].ts`, `createNextApiHandler` from `@trpc/server/adapters/next` `11.10.0`, a Pages Router API route.

**`after()` in this route: unavailable (Verified locally, `16.1.6`).**
- POC `an3/poc-after/`, logs `an3/poc-build.txt`, `an3/poc-run.txt`, `an3/poc-server.txt`.
- In a Pages API route, `after()` from `next/server` throws *"`after` was called outside a request scope"*.
- In an App Router route handler in the same build, `after()` is accepted and its callback ran (server log: `POC app-route after() callback RAN`).
- Source agrees: `next/dist/server/after/after.js` throws when there is no `workAsyncStorage` store, and the only setters of that store are App Router paths (`app-render.js`, `route-modules/app-route/module.js`, `web/adapter.js`, `use-cache-wrapper.js`). The Pages API path sets none (`route-modules/pages-api/module.js` and `api-utils/node/api-resolver.js`, 0 hits).
- That the same throw happens on Vercel is **High-confidence inference**: the throw is Next's, not the platform's.

**`waitUntil` (documented, not executed).**
- Vercel's `@vercel/functions` reference (fetched 2026-11-18, page `last_updated: 2026-09-03`) says `waitUntil` *"Extends the lifetime of the request handler for the lifetime of the given Promise … available in Node.js and in the Edge Runtime"*, and *"Promises passed to `waitUntil()` will have the same timeout as the function itself. If the function times out, the promises will be cancelled."*
- It recommends `after()` for Next 15.1+, which this route cannot use (above).
- `@vercel/functions` is **not installed** at `395510e` (`node_modules/@vercel/` holds `analytics`, `edge-config`, `node`, `speed-insights`).
- Next reads the platform's `waitUntil` from `globalThis[Symbol.for('@next/request-context')]` (`base-server.js`, `getWaitUntil`) for its own use and exposes it to Pages API code through no public API (Observed). Locally that context is `null` (POC response field `nextRequestContext: null`), as expected off-platform.
- Whether `waitUntil` from a Pages API route on this project keeps a post-response promise alive is **Inference** from the documentation's "Node.js" scope. **Validation path:** a preview deployment whose Pages API route logs from a `waitUntil` promise that settles after the response.

**Promises not passed to `waitUntil` (Hypothesis H-2, confidence Medium).** Today's `void fetch(...)` usually reaches the generator, because the request is issued before the save's response. But its completion and any handling of its answer after the response are not guaranteed. Fastest disconfirming test: the same preview-deployment probe without `waitUntil`, recording whether a post-response log line appears. Missing telemetry: the website logs nothing about the generator call (OQ-1's facts).

**The deployment (Observed / gap).**
- `vercel inspect https://hooks.gg` (CLI 29.1.1, read-only, `an3/vercel-inspect.txt`): production deployment `dpl_GtFCaEH5UDbaYGKmjY8fC8X8H7bU`, created 2026-11-11 18:29:46Z, the minute of the `395510e` push (`origin/master` reflog 18:29:45). Lambdas are in region `cle1`.
- `vercel.json` holds only a cron (no `functions` block, no `maxDuration`).
- **Fluid compute and the function `maxDuration` were not read** (G-1). They set the ceiling a `waitUntil` promise lives under.

**Throughput ceiling.** No rate-limiting mechanism was read in this commission. The ceiling a post-response task meets is the function's `maxDuration` per invocation, unknown until G-1 closes.

**Generator render time (gap G-3).**
- No record in `agent-output` carries one: a `grep -rlE` over `architecture`, `verification`, `research`, `handoff` and `analysis` for render, generate or duration timings with a number. Its only preview-generator hits are the drain handoff's 1 ms idle drain and 12000 ms stop window, which are not render times.
- Whether the generator's own log carries one is unestablished (refusal 2). Reading the host log is a production host act this commission excludes.

## Root Cause

**Item 3 (BC-14 limb (d), at `a74b9e2`):** the "Choose which to keep" save sent resolved data while the editor kept the unresolved draft, so the saving tab's hash never matched its own broadcast, on every Save of such a message. **Verified** by execution at `a74b9e2`, and absent at `395510e`. Whether BC-14's message was such a message is unrecorded (H-1 is the alternative).

## System weaknesses

- The own-tab compare cannot tell "my save" from "someone's save" by construction. It infers it from equal content, so any divergence between the editor and the sent payload (an in-flight edit; formerly the choice save) reads as a remote update. Detect it with the AN-1 probe's outside-class member.
- The only copy of signed-in unsaved edits is one `localStorage` key that the route-0 initialisation overwrites (S3). Signed-out drafts share the same single key (S2, S5).
- The website awaits nothing from the generator, so a failure is invisible to it (OQ-1).

## Instrumentation gaps

- **Normal:** a website log line per generator call outcome (status, or "unreachable") would make item 2's failure rate and H-2 countable.
- **Debug:** a client-side log on notice display (local hash, received hash, whether a save was in flight) would have settled H-1 and would separate the in-flight-edit case in production.

## Open questions and remaining gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| G-1 | Fluid compute on or off, and the function `maxDuration`, for Vercel project `hooks-gg-website` | CLI 66.2.0 needs a team scope and instructs that a human choose it; CLI 29.1.1 has no `project inspect`; this analyst did not choose a team | Run `vercel project inspect hooks-gg-website --scope hooks-gg` (the deployment alias `hooks-gg-website-hooks-gg.vercel.app` names that team), or read Project Settings → Functions in the dashboard. Sent to `steering-roadmap` | Owner |
| G-2 | `waitUntil` from a Pages API route on this project keeps a post-response promise alive (and H-2) | No preview deployment from this analysis | A preview-deployment probe (validation path above) | Planner to schedule if the design rests on it |
| G-3 | Generator render time | No record holds it; refusal 2 left the generator's own logging unread | A count-form read the gate admits, or a local render timing against the generator at `8de2b53` | Planner / QA |
| G-4 | Real Pusher delivery and ordering to the sender | No Pusher publish allowed from this box | None needed for revision 1; the hook-level determination covers both orders | — |
| G-5 | Whether pre-013 code raised the own-tab notice on a nothing-changed save | Not executed | Run `an1/own-save-broadcast.probe.tsx` in an export of `c85945f` | Analyst, only if "still" must be settled beyond the class reading above |
| G-6 | The in-app guard is dead under the App Router (two source reads, not run) | No browser walk | Real-browser walk per AN-2's validation path | QA at Phase 1, if a criterion rests on it |

## Analysis recommendations (investigative only)

- Close G-1 before revision 1 sets a mechanism for item 2: every post-response design is bounded by it.
- If item 3 becomes "pin the absence", the AN-1 probe's class (both orders, all members) and its outside-class member are a ready discriminating instrument. It was shown to fail at `a74b9e2` and to pass at `395510e`.
