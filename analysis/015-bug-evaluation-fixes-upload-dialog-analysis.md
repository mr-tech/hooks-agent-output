---
ID: 015
Origin: 015
UUID: 861e5f61
Parent: 015-bug-evaluation-fixes-uat.md
Status: Active
Status-Detail: "Answers plan 015 § Validation REQUIRES ANALYSIS (D39, rev 29), limbs 1–3, at website b96e364 and 7ce866b. Limb 1 PROVEN: a first-time lazy load of FloatingPortal suspends past every inner boundary; React hides the page tree, the dialog's portal included; Headless UI's useOnDisappear then closes the Dialog. Limb 2: live serves 7ce866b-equivalent code (23 of 24 f/0 chunks hash-identical), so the difference is not code; what lets live open on a full load is NOT established (hypotheses H-1 to H-3). Limb 3 PROVEN: reach the folder page by in-app navigation from an editor page, with no reload, and the dialog opens at b96e364 under both bundlers. No source or env change. The source defect is pre-existing (since 2023), not the chain's; whether it is a production defect is the owner's question."
---

# Analysis 015 — UAT-4: why "Upload Message" opens no dialog locally

Commissioned by plan `015-bug-evaluation-fixes.md` rev 29 (`fba82bf`): § Validation, "REQUIRES ANALYSIS (REQUIRED
before the website merge, D39)", read with D39 in the Decisions Register. The brief came from steering-hooks-015
(`analyst-hooks-015-brief.md`). Source finding: UAT-4 in `uat/015-bug-evaluation-fixes-uat.md`. This is the chain's
second analysis document; the first, `015-bug-evaluation-fixes-analysis.md`, answers F-31 and is unrelated.

## Changelog

| Date | Agent | Change | Detail |
|---|---|---|---|
| 2026-11-08T21:10 | analyst-hooks-015 | Created | Limbs 1–3 answered by executed probes. Browser and :3000 under steering-coordinator's go (20:53Z). |
| 2026-11-08T21:14 | analyst-hooks-015 (owner ruling relayed by steering-hooks-015, `steering/015-rulings.md` block 21:14Z, `a33afc3`) | Gaps routed | UAT retries B-9, B-10 and the B-11 dialog leg by the limb 3 route, under D39's existing approval. Gaps 1 and 3 (why live opens; user impact) go to a UAT live check without saving, then a handoff. Gaps 4 and 5 stay with that retry. No further analyst work is owed. |

## Value Statement and Business Objective

B-9, B-10 and the B-11 dialog leg (NewMessageModal) gate the website merge (D39: "The release waits"). UAT cannot run
them while the dialog never opens locally. This analysis names the mechanism, says whether code differs from
production, and gives UAT a way to open the dialog at `b96e364` without touching source.

## Context

- **Decisions Register.** D39 asks for "the analysis's finding (a cause that needs source, or none found), which goes
  back to the owner". No owner requirement on NewMessageModal's behaviour is registered. The plan puts the modal's
  design out of scope.
- **Roadmap / architecture.** No roadmap exists (plan header, `Epic-Alignment`). I did not read
  `architecture/system-architecture.md` or `architecture/website.md` for this run, and nothing below cites them.
- **Trees.** website `b96e364` (`b96e36497d55075ae15753f99ec4148bf4ea60e8`, chain tip) and `7ce866b`
  (`7ce866b5c28191390964a863397ca481731a21ab`, `origin/master`), each run from a `git archive` export in my scratchpad.
  The shared website tree was never edited.
- **Dependencies.** The shared `website/node_modules/.pnpm/lock.yaml` is byte-identical (`cmp`) to `pnpm-lock.yaml`
  at `b96e364`. `git diff --numstat 7ce866b b96e364 -- pnpm-lock.yaml package.json` is empty. So both SHAs build
  against the same installed set, which is the lockfile's.

## Methodology

All probes are in `verification/015/upload-dialog/` (README in this section, not a separate file):

- `upload-dialog-cdp.mjs`: a node CDP driver, not Playwright. It drives a throwaway headless system `google-chrome`
  profile, pressing with real `Input.dispatchMouseEvent` presses (the same input route as a user's click). It opens
  "new message", then "Upload Message", and reads whether "Create or upload a new message" is in the DOM. An injected
  MutationObserver records the bounding-rect chain of every new `[role=dialog]`, plus any `display:none` ancestor's
  inline style and matching CSS rules. Optional: a session cookie, a `via` path reached first for in-app navigation,
  and `PROBE_LATENCY_MS`.
- `run-local-probe.sh`: runs inside `unshare -rnm`, with loopback only and private mounts, so no host port is bound
  and nothing leaves the box. The shared `node_modules` is **bind-mounted read-only** into the export. It starts
  `next start` on the namespace's 127.0.0.1:3000, a namespace-local `redis-server` (no persistence), and a socat relay
  to my own Postgres. Then it runs the driver and kills everything. `website/node_modules/.cache` was still absent
  after every build and run (`ls -d` fails).
- Session: my own `postgres:16` container `analyst015-pg` on 127.0.0.1:5433, never `hooks-postgres-local`. It holds
  the `project-utils/prisma/schema.prisma` schema (`prisma db push --skip-generate`, 9 tables) and the synthetic rows
  in `seed.sql`: one user and account with no Discord token, so guilds are `[]` with no Discord call; one database
  session; later, one message.
- Builds: `next build` (Turbopack, the Next 16 default and what Vercel runs; build output proves it) and
  `next build --webpack` (UAT's fourth walk), from separate exports of `b96e364`, plus Turbopack of `7ce866b`. All
  exited 0 (`build-*-tail.txt`). Turbopack refuses a *symlinked* `node_modules` ("Symlink node_modules is invalid, it
  points out of the filesystem root"). That is why UAT's export, which symlinks it, could only build with
  `--webpack`. A bind mount avoids it.
- Build network: `next/font/google` fetches Inter at build time, so the builds ran with network: `unshare -rm`, no
  `-n`. All servers and browsers ran network-isolated. Live hooks.gg was read signed out, by `curl` only: the f/0 HTML
  and five public chunks. No browser opened live.
- Instrumentation and mutation: `console.log` lines and one mutation were applied to a **separate scratch copy only**
  (`instrumentation-and-mutation.diff`), never to the website tree.

## Findings

### Verified

**V-1 — The fault reproduces deterministically, independent of bundler, data and latency.** On a full page load of
`/message/f/0` signed in, "new message" → "Upload Message" leaves no dialog. Runs: Turbopack `b96e364`
(`result-turbo-b96e364.json`); webpack `b96e364` (`result-webpack-b96e364.json`); with one message in the folder
(`result-turbo-b96e364-msg.json`); Turbopack `7ce866b` with 150 ms emulated latency (`result-lat-7ce866b.json`). Each
shows `after-upload dialogText: false`, no page exception, and no console line other than the Speed Insights 404. This
matches UAT-4's observations under webpack builds (fourth walk) and `next dev` (second walk).

**V-2 — The click works; the Dialog opens and is closed by Headless UI's `useOnDisappear`.** Instrumented build
(`result-inst.json`). The sequence is `[probe] upload onPress` → `page render open= true` → `modal render open= true`
→ `[probe] dialog onClose` → `page render open= false`. The `onClose` stack runs `onClose` (NewMessageModal), then
`onClose` (PresetDialog), then `Object.current` (Headless UI `useEvent`, the Dialog's close `G`), then the ResizeObserver
callback of `useOnDisappear` in `@headlessui/react` 2.2.9. That callback closes when
`rect.x === 0 && rect.y === 0 && rect.width === 0 && rect.height === 0` on the Dialog root (`hooks/use-on-disappear`,
read in the built chunk at the call site). So `newMessageModalOpen` (`src/app/message/f/[id]/page.tsx`, the `Page`
component's `useToggleState`) is set, and the Dialog itself closes it within the same interaction.

**V-3 — Its rect is zero because React has hidden its portal with `display: none !important`.** The rect chain recorded
at insertion (`result-inst.json` → `rects`, `hidden`) shows the Dialog root `relative z-10` at `[0,0,0,0]`. Its parent is
`<div data-headlessui-portal style="display: none !important;">` inside `#headlessui-portal-root`, with **no** CSS rule
matching. The sibling portal (Toastify) is not hidden. That inline form is written by React's `hideInstance`
(`style.setProperty("display", "none", "important")`, read in `next/dist/compiled/react-dom/cjs/react-dom-client.production.js`).
React writes it when a Suspense boundary that is already showing content suspends again on a non-transition update,
hiding host nodes, portals included, under the boundary.

**V-4 — What suspends is `FloatingPortal`, a `next/dynamic` with no boundary of its own.** Several links make this up:
- `src/components/AnchoredPopover/Child.tsx` declares
  `const FloatingPortal = dynamic(() => import('@floating-ui/react').then((mod) => mod.FloatingPortal), { ssr: true })`.
- In Next 16.1.6's `shared/lib/lazy-dynamic/loadable.js`, a `dynamic` with `ssr: true` and no `loading` renders
  `Fragment`, not `Suspense` (`hasSuspenseBoundary = !opts.ssr || !!opts.loading`). Its first render therefore suspends
  up to the nearest outer boundary, which is the layout and Providers boundary (`src/app/layout.tsx`,
  `src/app/_components/Providers.tsx`).
- NewMessageModal renders the "Save To" `<Dropdown portal …>`, whose `AnchoredPopover.Child` calls `renderPortal`,
  which mounts `<FloatingPortal>` as soon as the modal renders.
- The folder page renders no other portaled popover. Its Dropdowns, the per-message actions, carry no `portal`. So the
  lazy module's first load happens at "Upload Message".

Proven by mutation (`result-inst-mut.json`): the same instrumented copy with only `loading: () => null` added to that
`dynamic` call (one property, which gives it its own Suspense) opens the dialog and keeps it open, with no `onClose`.
Unmutated, it closes every time.

**V-5 — Prior resolution of that lazy module in the same page lifetime is sufficient for the dialog to open.**
Unmodified `b96e364` builds, both Turbopack (`result-turbo-b96e364-via.json`) and webpack
(`result-webpack-b96e364-via.json`). The run loads `/message/m/1/edit` first; the editor's File menu, in
`src/app/message/m/[id]/_layout/Navigation.tsx`, is a portaled `AnchoredPopover.Child` and so loads `FloatingPortal`.
It then presses the editor's own `/message/f/0` link (top left), an in-app navigation:
`performance.getEntriesByType("navigation")[0].name` is still the editor URL, so there was no reload. Then "new
message" → "Upload Message": `dialogText: true`.

**V-6 — The code is not new.** `git log -S"mod.FloatingPortal"` gives `fae733f` (2023-02-28) as the dynamic's origin.
`git log -S portal` on `NewMessageModal.tsx` gives `4fe53b6` (2023-08-22). Both predate the chain and `7ce866b`. This
agrees with UAT-4's "same at base".

### High-confidence inference

**I-1 — Live hooks.gg serves code equivalent to `7ce866b` on this route; the live/local difference is not code.** Live
f/0's HTML references 24 JS/CSS chunks (`live-f0-chunks.txt`), and live chunks carry `globalThis.TURBOPACK`.
Turbopack chunk names are content hashes. A local Turbopack build of `7ce866b` emits **23 of the 24 names**. The 24th,
`c13ccedc9eaf3901.js`, has a size twin in the local build (`57fdab63aaee1672.js`, 153,456 vs 153,414 bytes). A
string-token diff of the two shows nine differing tokens: the env-inlined base-URL branch (`VERCEL_URL` set on
Vercel) and minifier renames that follow from it. For `b96e364`, 17 of 24 names match. Why inference, not
verification: it covers only chunks referenced from the signed-out f/0 HTML (the modal's code is among them, statically
imported by the page). Vercel's deployment SHA itself was not read; that needs the owner's Vercel access.

### Hypothesis (limb 2's remaining question: why does a full load open the dialog on live?)

Live opened on a full load: UAT's `hooksgg-upload-dialog-live.js` uses `p.goto('https://hooks.gg/message/f/0')`, and
the screenshot shows f/0, "No Messages". This is the same code (I-1) on the same empty folder. Something on live must
resolve `FloatingPortal` before the press, or keep the Dialog's rect non-zero through the suspension.

| # | Hypothesis | Confidence | Fastest disconfirming test | Missing telemetry |
|---|---|---|---|---|
| H-1 | A live-only, account-dependent element on f/0 renders a portaled popover (or otherwise first-loads `FloatingPortal`) before the press. The test account has real guilds and an avatar; the synthetic local user has neither. | Med | On live, signed in (needs an owner ruling; not in this run's grant), before the press: `performance.getEntriesByType('resource')` for the `@floating-ui` chunk, and the DOM for `[data-floating-ui-portal]`. Locally: seed a Redis `user-guilds` entry for the synthetic user and rerun. | The page's lazy-module load order. |
| H-2 | Timing: on Vercel, an RSC or session refetch in flight at the press turns the update into a transition, so React keeps the old UI instead of hiding it. | Low | Live, signed in: record whether the boundary's fallback (LoadingDots) ever shows at the press; or locally, delay `/api/auth/session` by more than 1 s and rerun. | React commit-lane trace (React DevTools profiler). |
| H-3 | UAT's live run was not a cold page lifetime: Playwright's `goto` after the OAuth return reused something that preloaded the module. | Low | Re-read that run's returned object (`signedInBefore`); it is not recorded in the UAT document. A cold rerun needs a sign-in. | The live script's return value, unrecorded. |

None of these is needed for limb 3. Each is needed to say whether real users hit this on production. UAT-4's live
check shows that at least one live session does not.

## Root Cause

Proven for the local runs at `b96e364` and `7ce866b`. On a page whose lifetime has not yet loaded
`FloatingPortal`, opening NewMessageModal renders its portaled "Save To" Dropdown. That is a first-time `React.lazy`
read inside `dynamic(…, { ssr: true })` with no `loading`, so it has no Suspense of its own. The suspension reaches the
layout boundary. React hides that boundary's existing host nodes with `display: none !important`, the Dialog's Headless
UI portal included. Headless UI's `useOnDisappear` sees the Dialog root's zero rect and calls `onClose`, which is
`closeNewMessageModal`. The dialog closes in the same interaction, so nothing ever paints. The input it rests on is
whether this page lifetime has already resolved the `FloatingPortal` lazy module. That is local walk state, not
configuration, data, cookies or services. **The defect is in source (`AnchoredPopover/Child.tsx` with
NewMessageModal's portaled Dropdown), pre-existing since 2023, not in the chain's code.**

## Limb 3 — the smallest local change outside source

**A walk-procedure change, proven at `b96e364` under both bundlers (V-5). No env, data or source change is needed.**
Signed in, open any editor page first: `/message/m/<id>/edit`, or, plausibly, the new-message editor
`/message/m/0/edit`, which renders the same `Navigation`, though that path was not itself probed. Then reach the folder
page by the app's own link (top-left "/message/f/0" in the editor), **not** by typing the URL or reloading. Then "new
message" → "Upload Message". A reload or a direct `goto` resets the page lifetime and brings the fault back. This works
with UAT's existing setup, `next build --webpack` plus `next start` (V-5, webpack run). Not probed: `next dev`, where
lazy modules compile on demand.

Per the plan's limb 3 rule, the cause is a source defect, but it is not a chain defect (V-6), and a remedy exists
without source. So this analysis does not stop at "needs source". Whether the pre-existing defect is a production
defect owed a handoff, and whether the walk-procedure route is acceptable evidence for B-9, B-10 and B-11, are the
owner's questions, carried by steering (D39's resolution clause).

## Open Questions and remaining gaps

| # | Unknown | Blocker | Required action | Owner |
|---|---|---|---|---|
| 1 | Why live opens on a full load (H-1 to H-3) | Needs a signed-in live session, outside this run's grant (no sign-in on live) | Owner ruling for one signed-in live read, without saving, of the resource list and the `[data-floating-ui-portal]` DOM before the press. Or the local Redis guild seed (H-1) | owner (via steering) / analyst |
| 2 | Vercel's deployed SHA | Needs Vercel dashboard or API access | Owner reads the production deployment's commit; I-1 predicts `7ce866b` | owner |
| 3 | Whether real users hit this on production | Depends on gap 1 | As gap 1 | owner |
| 4 | The via-editor route under `next dev` | Not run | One dev run if UAT walks under dev | uat |
| 5 | `/message/m/0/edit` as the via page | Not probed; `/message/m/1/edit` was | Use an existing message's editor, as in V-5 | uat |

## System Weaknesses

- `AnchoredPopover/Child.tsx`'s `FloatingPortal` dynamic has neither its own Suspense nor `loading`, so any first
  portaled popover rendered by an update hides the whole page subtree. Any Headless UI Dialog open at that moment
  self-closes. `SaveAsMenu` and `ColorPicker` also pass `portal`; I did not probe whether they show the same effect.
- The fault is silent: no console error, no exception. UAT and its scripts could not see it.
- UAT's export symlinks `node_modules`, which forbids Turbopack, so local builds diverge in bundler from production.
  This run shows the bundler is not the cause here; but it was an untested difference until now.

## Instrumentation Gaps

- **Debug:** a dev-only ResizeObserver or `onClose` reason log in `PresetDialog` would have named `useOnDisappear` at
  once. A React Profiler trace shows boundary fallbacks.
- **Normal:** none warranted. This is a UI-state fault with no server signal.

## Analysis Recommendations (next investigative steps, not plan items)

- To settle gap 1 cheaply and locally first: seed a Redis `user-guilds` cache entry for the synthetic user, rerun
  `run-local-probe.sh` on the clean `7ce866b` build, and see whether guilds make f/0 load `FloatingPortal`.
- UAT's retry: use the via-editor route (limb 3) and record each press's route (in-app navigation, no reload) beside
  the result.
- Test infrastructure: `run-local-probe.sh` together with `seed.sql` is a signed-in local stack that needs no Discord
  sign-in. It is a candidate for the local-stack record tool UAT proposed (UAT document, "Evaluation, for the
  retrospective"; not yet written).
