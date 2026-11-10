---
ID: 014
Origin: 014
UUID: 4671e28c
Parent: test-inventory-2026-08-26.md
Status: Planned
Status-Detail: "Complete for the commissioned brief (a)–(e), and CONSUMED by the planner at plan rev 5 (`72cde0a`): jsdom via `test.projects`, `.tsx` admitted, `pnpm add -D jsdom`, exit-code acceptance, S1–S5 each dispositioned. Nothing outstanding to the planner. Remains Active until the chain closes; the gaps under 'Open questions' are unclosed by design, not pending work."
---

# Analysis 014 — DOM test harness for the Hooks website suite

Commissioned by `planner-hooks-014` under plan `014-test-suite-cleanup.md` (rev 2, brief; rev 3
amendment on install mechanism received mid-run). Brief: the M2 "REQUIRES ANALYSIS" paragraph.

## Changelog

| Date (UTC) | Author | Change |
|---|---|---|
| 2026-11-10T08:58 | steering-cleanup-hooks | `Status-Detail` is now a double-quoted scalar: unquoted, a `: ` inside it made the frontmatter invalid as strict YAML (found by fixer-hooks-record-engine's dry run of the shared record engine; steering rulings 2026-11-10). Wording unchanged, except that its two inner double quotes are now single quotes. |
| 2026-08-27 | steering-test-cleanup | chain closure | Mechanical closure by steering: criteria already met and recorded (consumed at plan rev 5, nothing outstanding; chain 014 released at website f2c85f5, deployment record dd71313). Status → Planned per analysis/closed precedent; moved to analysis/closed/. "Open questions" remain unclosed by design, as this document states. |
| 2026-08-27 | analyst-hooks-014 | Created. Answers (a)–(e). Records the rig-artifact near-miss, the pnpm/npm correction to the rev-3 amendment, and five scope items for the planner. |
| 2026-08-27 | analyst-hooks-014 | Consumption recorded. `planner-hooks-014` adopted every recommendation at plan rev 5 (`72cde0a`) and dispositioned S1–S5; S4 → row 45 deleted with the surface in Outstanding Items, S5 → helpers under `__tests__/helpers/`, S3 → the tRPC proxy mock is explicitly not a standard. The rev-3 install correction is recorded in the plan's own changelog as the planner's error. No finding altered. Adds the rig-disposition note below. |

## Value Statement and Business Objective

As the implementer of plan 014 M2, I want it settled *by execution* whether a DOM environment can
mount the components the source-text tests currently describe — and which environment, which
config shape, and which mocks — so that M4c converts those tests into behavioural evidence instead
of deleting the surfaces into Outstanding Items, and so the config change cannot silently cost the
48 existing node tests.

Serves the plan's own value statement: the next chain copies a suite that *teaches* behavioural
testing rather than `readFileSync` + `toContain`.

## Objective

Answer the M2 brief (a)–(e) with executed evidence, and state explicitly whether D13's reopening
condition — *"no target component mounts without production-code change"* — is met.

**It is not met. No production code needs to change. M2 proceeds.**

## Context and sources read

- Plan `agent-output/planning/014-test-suite-cleanup.md` rev 2 (Decisions Register D1–D15; M2
  paragraph; assumptions 1–3). Rev-3 amendment received by cross-session message.
- `agent-output/analysis/test-inventory-2026-08-26.md` (ID-less researcher document; cited, not altered).
- Steering memory `hazards.md` — the rig-`node_modules`-degeneration hazard, and the standing rule
  that a contradiction against a second instrument is the signal.
- **`agent-output/architecture/website.md` was NOT read for this analysis** — the plan records it
  carries nothing on tests, and nothing here touches a product layer. Recorded absence, per my brief.
- Architect consult (`architect` subagent, this session) on questions of standard-shape rather than
  mechanism. **Every architect claim reported below was re-verified here by execution or by reading
  the artifact; two were confirmed, none were adopted on prose.**

Tree state: `website` on `chain/014-test-suite-cleanup` at **`a74b9e2`**, working tree clean before
and after this analysis (`git -C website status --porcelain` → empty, both times).

## Methodology, and what was written where

**Nothing was written to `/usr/local/bin/hooks/website`.** No install ran there; `package.json`,
`pnpm-lock.yaml` and `node_modules` are untouched.

The rig lives at `agent-output/verification/014/` (README there carries the full rebuild recipe):

- `analyst-rig/poc/` — an `npm install` of `vitest@4.1.2`, `jsdom@27.4.0`, `happy-dom@20.11.8` **into the rig
  only**, 2026-08-26 ~23:51 UTC. **This is the single network operation of the analysis.** Nothing
  to restore: the install is inside `agent-output/verification/014/analyst-rig/poc/node_modules`, which is
  gitignored and deleted with the rig.
- `analyst-rig/mirror/` — `cp -a website/src` + `website/bot` at `a74b9e2`, a `node_modules` **symlink** to
  `website/node_modules`, and an **in-root** `vitest.config.ts`. Proved byte-identical to
  `website/src` by `diff -rq` before and after every run (only the added `src/poc__tests__/`
  differs). This is what makes the runs faithful: the config sits inside the vite root, exactly
  where the real M2 change would put it.
- `poc-tests/` and `runs/` — committed. Eleven POC `.test.tsx` files as run, the two configs, and
  the pass-set digests.

**Provenance of every claim below**: `[EXEC]` = observed by running the code; `[READ]` = read from
the artifact named; `[HYP]` = labelled hypothesis with a disconfirming test.

### The rig defect that almost became a finding — read this before trusting any similar run

`[EXEC]` A first rig ran the website suite with the vitest config living **outside** the vite root
(config in `poc/`, `test.root` pointed at `website`). Under `environment: 'node'` it passed
**48/48, 617/617**. Under `jsdom` or `happy-dom`, **all 48 files failed** with
`Error: Cannot find module '/src/…/<file>.test.ts'` — a URL-shaped module id resolved against the
wrong base, because the DOM environments run in vite's *client* transform mode and `node` does not.

Reported as-is that would have read **"no existing test survives a DOM environment"** — the exact
opposite of the truth, and it would have reopened D13 on a rig defect. It was caught the way this
workspace's hazards file says these are always caught: by a contradiction against a second
instrument (the same suite, same environments, config moved inside the root → 48/48). The lesson is
already in `hazards.md`; this is a fresh instance of it, in a new mechanism.

## Findings

### (a) Which environment mounts each target component, and what each needs — **VERIFIED**

`[EXEC]` **Both jsdom 27.4.0 and happy-dom 20.11.8 mount every target component.** Every POC below
passes in both, using only `createRoot` from `react-dom/client` + `act` from `react`.

| # | Component (path) | Mounts | Mocks it needs beyond `~/env.mjs` |
|---|---|---|---|
| 1 | `src/components/NullableComponent.tsx` | ✔ both | none |
| 2 | `src/components/TransitionHeightElement.tsx` | ✔ both | none — `useResizeObserver` guards a missing `ResizeObserver`, so jsdom's absence is not fatal |
| 3 | `src/app/message/_components/NewMessageJsonInput.tsx` | ✔ both | none. CodeMirror 6 constructs and accepts dispatches in both |
| 4 | `src/providers/MessageProvider/index.tsx` | ✔ both | `next/navigation` (`useRouter`/`usePathname`/`useSearchParams`), `next-auth/react` (`useSession`), `~/utils/api`, `~/providers/GuildProvider`, `~/providers/WebhookProvider`, `~/providers/ConfirmationProvider`; `~/env.mjs` must also carry `NEXT_PUBLIC_PUSHER_KEY`/`_CLUSTER` |
| 5 | `src/app/message/m/[id]/_components/JsonModalBody.tsx` | ✔ both | mounted **inside the real `MessageProvider`** with #4's mocks — no extra |
| 6 | `src/app/message/m/[id]/edit/page.tsx` | ✔ both | #4's mocks + `~/providers/IsMobileProvider`, **and** the nine `void import(...)` prefetch targets stubbed (see the exit-code finding) |
| 7 | `src/app/message/_components/NewMessageModal.tsx` | ✔ both | #4's + `IsMobileProvider` + `~/utils/hooks/useGuildDropdownItems` + a real `QueryClientProvider` |
| 8 | `src/app/message/m/[id]/_components/SaveAsMenu.tsx` | ✔ both | as #7 |
| 9 | `src/components/dynamics/Tooltip.tsx` | mounts, renders nothing | `IsMobileProvider` — see S4 |

`next/image` was **not** needed by any target — no target imports it. `pusher-js` was **not**
needed: `usePusher` (`src/providers/MessageProvider/usePusher.ts`) constructs `Pusher` only inside
an effect guarded by `isApiMessage(messageRef.current)`, so a fresh mount never reaches it. A test
that seeds an API message **will** reach it and must mock `pusher-js`.

Four mechanical facts the conversions will hit:

- `[EXEC]` **`vi.mock` factories are hoisted above every `const` in the file.** A shared
  `const stub = …` referenced by nine `vi.mock` calls throws
  `ReferenceError: Cannot access 'stub' before initialization`. Each factory must be self-contained,
  or use `vi.hoisted()` / an async factory that `await import`s a helper.
- `[EXEC]` **A partial `~/utils/api` mock is a trap.** Enumerating the four `api.message.*`
  procedures used by `MessageProvider` still failed, because `usePreferences` →
  `useUpdatePreferences` (`src/utils/hooks/useUpdatePreferences.ts`) reaches
  `api.user.updatePreferences`. See S3 for what to do about that.
- `[EXEC]` **Modal/menu components render into a portal on `document.body`, not into the container.**
  `NewMessageModal` and `SaveAsMenu` both leave `container.innerHTML` empty while `document.body`
  carries 17k/22k characters. Assertions must query `document.body`.
- `[EXEC]` **Do not assert on raw HTML length.** The same `SaveAsMenu` mount serialises to 21943
  characters under jsdom and 21936 under happy-dom. Assert on text and structure.

### (b) Per-file directive vs global — and a third shape that is better than both — **VERIFIED**

`[EXEC]` Four configurations, each run at least twice against the mirror, `include` admitting
`.test.tsx`, all eleven POC files present. Digests in `runs/passset-digests.txt`.

| Config | Files / assertions | Exit | 48-file baseline pass set |
|---|---|---|---|
| Baseline: `environment: 'node'`, `include` `.test.ts` only | 48 / 617, 0 failed | 0 | `sha256 d56166d1…` |
| A: global `node` + per-file `// @vitest-environment jsdom` | 57 / 636, 0 failed | 0 | preserved |
| B: global `jsdom` | 57 / 636, 0 failed | 0 | preserved |
| C: global `happy-dom` | 57 / 636, 0 failed | 0 | preserved |
| D: `test.projects` — node project over `src/**/*.test.ts` @ `node`, dom project over `src/**/*.test.tsx` @ `jsdom` | 59 / 638, 0 failed | 0 | **`sha256 d56166d1…` — byte-identical to baseline** |

`[EXEC]` **A, B and C produce a byte-identical assertion set** (`sha256 bd385849…` for all three),
and the baseline's 617 assertions are a strict subset of it. So on the plan's own acceptance
property — *"every file in the M0 pass set still passes after the config change"* — **all four
configurations pass, and none of the 48 node tests changes behaviour under either DOM environment.**
Assumption 2 in the plan is confirmed and assumption 1 (the suite passes at `a74b9e2`) is confirmed
against the mirror; M0 must still confirm it in-place, since a mirror run is a run about a copy.

The dichotomy the brief posed is therefore **not a correctness question — it is a standard question**,
and I recommend neither horn:

- **Global DOM (B or C) is the wrong long-term default for this repo.** ~40 of the 48 files are pure
  node logic over `src/server/`, `src/scripts/` and `src/utils/`. A global `window`/`document` hands
  every one of them a browser API that production will not have; the failure it invites is a util
  reaching for `window`, the test passing, and the server route throwing. *(Argument from the
  architect consult; the environment-independence I measured is what makes it a preference rather
  than a constraint.)*
- **Per-file directives (A) invert the failure**: the harness has no declaration site, and a new
  `.test.tsx` written without the comment dies on `document is not defined` — a decaying convention
  with no enforcement point.
- **D — `test.projects` — removes the choice.** Environment follows the file extension, which is
  *already* the collection distinction M2 must introduce anyway (question (c)). No file carries a
  comment that can be forgotten, and no node test gains a DOM. `[EXEC]` It works in vitest 4.1.2
  and its node project's 617 assertions hash **identically to the baseline**. Cost: `resolve.alias`
  must be factored so the two projects cannot drift; the POC config
  (`verification/014/poc-tests/projects.config.ts`) shows the shape.

`[EXEC]` One side effect worth stating for A/B/C: `setupFiles` runs for **every** file, node ones
included. `IS_REACT_ACT_ENVIRONMENT = true` is inert in a node environment, so this is harmless
today — but it is a second reason to prefer D, where the setup file is scoped to the dom project.

### (c) Must `include` admit `.test.tsx`? — **VERIFIED: yes**

`[EXEC]` With the five `.test.tsx` POC files present and `include: ['src/**/*.test.ts']`, vitest
collects **48 files / 617 tests** — the new files are silently not collected, with no error. Adding
`'src/**/*.test.tsx'` collects **53 / 626**. A test file that is never collected is
indistinguishable from a green suite, so this is a correctness requirement, not a convenience.

`.test.tsx` is itself required because the conversions carry JSX, and a `.ts` file cannot. The
alternative — `React.createElement` throughout — is not worth the cost.

`[READ]` **`website/tsconfig.test.json` already includes `src/**/__tests__/**/*.tsx`.** So
`npm run typecheck` (`tsc --noEmit -p tsconfig.test.json`) needs **no change** for `.test.tsx`
files placed under `__tests__/`. M2's config edit is confined to `vitest.config.ts` and
`package.json`.

### (d) Is `@testing-library/react` required? — **VERIFIED: no**

`[EXEC]` All eleven POC files mount and drive components with nothing but:

```ts
import { act } from 'react';
import { createRoot } from 'react-dom/client';
// setup file: globalThis.IS_REACT_ACT_ENVIRONMENT = true
```

Both `react` and `react-dom` are already `dependencies`. `[EXEC]` Without the
`IS_REACT_ACT_ENVIRONMENT` flag, `act()` still works but React logs
*"The current testing environment is not configured to support act(...)"* on every call.

Interaction works through native `dispatchEvent`, with three measured rules:

- `[EXEC]` A pointer press — `pointerdown` then `pointerup` — fires `onPress` on a react-aria
  `Button` in **both** environments. `PointerEvent`, `MouseEvent` and `KeyboardEvent` all exist in
  both.
- `[EXEC]` A **click alone with `detail: 0`** (react-aria's "virtual click", i.e. keyboard/assistive
  activation) fires `onPress` in both. A click alone with `detail: 1` does **not**.
- `[EXEC]` A raw `Enter` `keydown`/`keyup` on a focused react-aria `Button` does **not** activate it
  in either environment, and a click dispatched afterwards is swallowed. Real browsers synthesise
  the activation click; neither DOM environment does. **A test that means "the user pressed Enter"
  must express it as a `detail: 0` click, or reach for `@testing-library/user-event`.**
- `[EXEC]` A plain React `onClick` and a plain React state update both fire from a dispatched click —
  so event delivery through React 19's root is sound; the above are react-aria semantics, not
  harness limits.

So RTL is an **ergonomics** choice (queries, auto-`act`, `cleanup`), not a capability requirement.
It also pins a peer range against React 19 that this repo would then carry. Recommending against it
for M2; if M4c's conversions turn out to need keyboard-activation oracles, `@testing-library/user-event`
alone is the smaller addition. **Analysis-scoped next step, not a plan item.**

### (e) POC mounts — **DONE, one per file group and four beyond it**

Eleven files under `verification/014/poc-tests/`. Two carry conversions that are behavioural rather
than mere mounts, which is the property M4c actually needs:

- `03-newmessagejson.test.tsx` `[EXEC]` mounts `NewMessageJsonInput`, reaches the live CodeMirror
  view with `EditorView.findFromDOM`, dispatches a document change to JSON carrying **both** a V2
  flag and classic `content`, and asserts the rendered surface then reads *"This message has both
  Components V2 and classic content — nothing was created."* That is the owner's D29–D33 subject
  asserted **as rendered output**, which is precisely what
  `013-owner-conflict-choice-not-default-2026-08-25.test.ts` cannot do with `readFileSync`.
- `05-jsonmodalbody.test.tsx` `[EXEC]` mounts `JsonModalBody` inside the **real** `MessageProvider`
  and asserts the seeded editor and the `Load` control.

### The finding M2's acceptance criterion would have missed — **VERIFIED**

`[EXEC]` `app/message/m/[id]/edit/page.tsx` has a mount effect that eagerly `void import(...)`s
**nine** heavy modules. Those promises resolve *after* vitest tears the environment down, surfacing
as `EnvironmentTeardownError` **unhandled rejections**. Consequence:

> **Every test reports `passed`, the summary reads `57 passed (57)` / `636 passed (636)`, and the
> process exits `1`.**

The plan's M2 acceptance property is *"every file in the M0 pass set still passes"* — which this
satisfies while `npm test` fails. `[EXEC]` A fixed `setTimeout` settle is **not** a reliable remedy:
50 ms cleared it in one run and left a deeper module (`ContentEditable.tsx` via
`DiscordMessageEditor/components/Author.tsx`) rejecting in the next. `[EXEC]` Stubbing the nine
prefetch targets with `vi.mock` is deterministic — 3/3 runs, exit 0, and the full-suite runs above
are 2/2 at exit 0 with it in place.

**Recommendation to the planner, analysis-scoped:** M2/M4c acceptance should read the **process exit
code**, not only the pass set. The two disagree here, reproducibly.

### jsdom vs happy-dom — the discriminator is not mounting

Both mount everything. Three measured differences:

- `[EXEC]` **jsdom has no `ResizeObserver`; happy-dom has one — and happy-dom's never fires.**
  Observing an element and then setting `height`/`width` to `400px` yields **0 callbacks** after
  100 ms, with `offsetHeight` and `scrollHeight` both `0`. *(Architect's claim; confirmed here by
  execution — I did not adopt it on prose.)* This is worse than absence: `useResizeObserver` in
  `src/components/TransitionHeightElement.tsx`, `src/components/MessagePreview.tsx` and
  `src/app/message/_layout/Header.tsx` `[READ]` would take the "observer present" branch and then
  silently never run, so a test asserting the resize path would pass having exercised nothing.
- `[EXEC]` jsdom emits `TypeError: textRange(...).getClientRects is not a function` to stderr from
  CodeMirror's measure loop. It does not fail the run. Read as a signal rather than noise, it is
  jsdom telling you layout is unimplemented — the fact a layout assertion needs.
- `[EXEC]` Install footprint (`npm i` into an empty project): **jsdom 46 packages / 24 MB**;
  **happy-dom 10 packages / 23 MB**. Disk is a wash; jsdom adds ~36 more transitive dependencies.

**Recommendation: jsdom**, on spec fidelity and on the ResizeObserver measurement above. The
supply-chain delta is the only argument for happy-dom and it does not outweigh a DOM API that
exists and lies.

**Conventions rule this supports, offered for M1's doc:** *a test may not assert on behaviour whose
trigger the environment cannot produce. Where a component depends on an unimplemented browser API
(layout and geometry, `ResizeObserver`, `IntersectionObserver`, `matchMedia`), the setup file
installs an explicit fake that the test itself fires, or the test does not assert that path and the
surface goes to Outstanding Items. **Presence of an API in the environment is never evidence the
path ran.*** *(Wording from the architect consult; the measurement behind it is mine.)*

## D13 reopening condition — explicitly not met

D13 reopens on *"an analyst finding that no harness can mount the target components under this
toolchain (Next 16 / React 19 / vitest 4) without production-code change"*.

**No such finding.** `[EXEC]` All six components named in the brief, plus two siblings the brief did
not name, mount under both candidate environments at `website` `a74b9e2` with **zero changes to any
file under `website/src`**. The only `website` changes M2 needs are one devDependency and
`vitest.config.ts`/`package.json` — exactly what D13 authorises. **M2 proceeds; the owner does not
need to be told of a reversion.**

## Scope items returned to the planner

These are findings about the brief's scope, not recommendations about implementation.

- **S1 — the target list is short by at least six component files.** `[EXEC]` Enumerating what the
  source-text corpus actually reads (`grep` over the fifteen files that call `readFileSync`/`readSrc`)
  yields, beyond the brief's six: `src/app/message/_components/NewMessageModal.tsx` (read by
  `013-owner-readable-mutation-errors` and `013-fqa19-ingress-gate-reachability`),
  `src/app/message/m/[id]/_components/SaveAsMenu.tsx` (same first file),
  `src/components/EmojiPicker/{index,PickerSkeleton,Root}.tsx` and the five
  `src/components/dynamics/*.tsx` (both via `plan-004-lazy-loading.test.ts`). I POC'd the first two
  — both mount. The EmojiPicker three are **not** POC'd (S2).
- **S2 — `src/components/EmojiPicker/*` is an unclosed gap.** Not mounted, not analysed. It is
  reached only through `plan-004-lazy-loading.test.ts`, whose subject is S4's problem anyway.
- **S3 — an auto-vivifying `~/utils/api` mock works but should not become the standard.** `[EXEC]`
  A recursive `Proxy` returning `useQuery`/`useMutation` stubs for any path is what unblocked
  `MessageProvider`, and it is in the POC files. It also makes every test green against a tRPC shape
  nothing verifies — the same illusion as an API that exists and never fires. If M3 lifts a helper
  for this, prefer parameterised builders over the blanket proxy. *(Objection raised by the architect
  consult; I agree, and the POC's use of the proxy is a rig convenience, not a recommendation.)*
- **S4 — `plan-004-lazy-loading.test.ts` has no behavioural equivalent under any harness.** `[EXEC]`
  `src/components/dynamics/Tooltip.tsx` is `dynamic(() => import('../Tooltip'), { ssr: true, loading: () => null })`.
  The wrapper mounts without error and renders **nothing at any point** — the loading fallback *is*
  `null`. The property that test asserts is the `ssr:`/`loading:` **options passed to `next/dynamic`**,
  which are not observable from a mount. This file is H1-by-form but not H1-by-remedy: converting it
  is not merely harder, the oracle does not exist. It needs its own disposition.
- **S5 — helper placement has a production-boundary problem.** `[READ]` `website/tsconfig.json`
  `include` carries `src/**/*.ts` and `exclude` is only `["node_modules", "**/__tests__"]`, and
  `[EXEC]` `.eslintrc.json` contains **zero** `no-restricted-imports` rules. So M3's proposed
  `src/test-helpers/` would enter the **production** `tsc --noEmit` program with nothing preventing
  production code importing it. Siting helpers under `src/**/__tests__/helpers/` (already covered by
  `tsconfig.test.json`, already excluded from the production program) avoids both. *(Raised by the
  architect consult; both limbs verified here against the artifacts.)*

## Correction to the rev-3 amendment — mechanism disagrees with the instruction

The amendment names `npm install --no-save <candidate>` in `website`, "restored by `npm ci`".

`[READ]` **`website` has `pnpm-lock.yaml` (510 011 bytes) and no `package-lock.json` and no
`yarn.lock`**; `package.json` declares `"packageManager": "pnpm@10.28.2"` and `node_modules/` is a
pnpm store (top-level entries are symlinks into `node_modules/.pnpm/`). Two consequences:

1. **`npm ci` cannot run there** — it requires `package-lock.json` or `npm-shrinkwrap.json` and
   errors out without one. The restore step as written does not exist. The pnpm-correct restore is
   `pnpm install --frozen-lockfile`.
2. `npm install --no-save` into a pnpm store would begin rewriting it into npm's flat layout — a
   change to the **shared** working tree that other sessions are using.

I did not run either. **The rig-local install I had already chosen has no `website` tree effect at
all**, which the amendment explicitly permits ("if you had already chosen a different mechanism,
keep it and state it"). Stated: the install is `npm install` of `vitest@4.1.2`, `jsdom@27.4.0`,
`happy-dom@20.11.8` into `agent-output/verification/014/analyst-rig/poc/`, 2026-08-26 ~23:51 UTC; there is
nothing to restore because nothing outside the rig changed; `git -C website status --porcelain` is
empty at 2026-08-27 00:09 UTC.

Raising it rather than silently substituting, because the amendment's restore step would be reached
by the implementer if M2 ever installs the devDependency by that route. **M2's forward step should
be `pnpm add -D jsdom`, and its rollback the commit revert the plan already names (lockfile
included), not `npm ci`.**

## System weaknesses

- **Architecture.** The edit page's mount effect performs nine eager `void import(...)` prefetches
  with no cancellation on unmount (`src/app/message/m/[id]/edit/page.tsx`). Harmless in a browser;
  in any test runner it produces post-teardown rejections. Any future component-level test of that
  page inherits the problem.
- **Code.** `useUpdatePreferences` reaching `api.user.*` from inside `MessageProvider`'s
  `usePreferences` makes the provider's mock surface larger than its own module suggests. A partial
  mock fails at render time rather than at import time, which is a late and confusing failure.
- **Process.** The M2 acceptance property is written over the *pass set* only. This analysis found a
  reproducible state where the pass set is perfect and the process exits non-zero. A property that
  cannot see a red `npm test` is not an acceptance property.
- **Process.** `include: ['src/**/*.test.ts']` fails **silently** for `.test.tsx`. Until M2 lands,
  any `.test.tsx` written anywhere in this repo is invisible to `npm test` with no diagnostic.

## Instrumentation gaps

| Signal | Normal / Debug | Why |
|---|---|---|
| The **process exit code** of `npm test`, recorded beside `numPassedTests` in every M0/M5 capture | **Normal** | The two disagreed here. A JSON reporter's counters alone cannot see an unhandled rejection. |
| `numTotalFiles` from the JSON reporter checked against `find src -name '*.test.ts*' \| grep -c ''` | **Normal** | The only detector of the silent-`include` failure class. Already close to the plan's M0 step 2; make the **comparison** the assertion. |
| vitest `Errors N errors` line captured, not just the pass counts | **Normal** | Where the exit code comes from. |
| Per-run `ls -ld <rig>/node_modules` before believing any red rig result | **Debug** | The `hazards.md` symlink-degeneration detector; cheap, and only needed when a rig goes red. |

## Analysis recommendations (next investigative steps, not plan items)

1. **Before M2's config edit lands, re-run the baseline in place** (`website`, its own
   `vitest.config.ts`) and record the exit code. My baseline is a mirror run; the plan's M0 is the
   in-place fact, and the two should be compared.
2. **If the planner adopts `test.projects` (D)**, run the split against the real `website` tree once
   before M4c opens, and check the node project's assertion sha256 against M0's. The equality holds
   on the mirror; it should be re-derived on the tree that ships.
3. **Trace `src/components/EmojiPicker/{index,Root,PickerSkeleton}.tsx`** for mountability before
   M4c commits to converting `plan-004-lazy-loading.test.ts`'s EmojiPicker rows (S2).
4. **Decide S4 before M4c**, since it is a disposition question and not an implementation one: the
   `next/dynamic` options that file asserts are not observable from a mount under any harness.
5. **If any M4c conversion needs a keyboard-activation oracle**, run a scoped probe of
   `@testing-library/user-event` against a react-aria `Button` in the rig before adding the
   dependency. The `detail: 0` click covers virtual activation and may make it unnecessary.

## Open questions / remaining gaps

1. **`src/components/EmojiPicker/*` was not mounted.** (S2.) Cost to close: ~20 minutes in the
   existing rig. Left open because it is outside the brief's named target list.
2. **`src/components/dynamics/{Calendar,ImageUploader,Markdown,SlateEditor,DiscordMessageEditor}.tsx`
   were not mounted individually.** Only `dynamics/Tooltip` was, and it produced S4. `[HYP, Low
   confidence]` the other four behave the same way — all are thin `dynamic()` wrappers — but two of
   the five have non-null `loading:` fallbacks and might be assertable. Disconfirming test: mount
   each and assert the fallback's own output. Not run.
3. **`DiscordMessageEditor` itself was never mounted.** `[EXEC]` It mounted *transitively* inside the
   unstubbed edit-page run (9 119 characters of HTML), so it is not unreachable — but the run that
   produced a clean exit code stubbed it. Whether it mounts *and* leaves the process at exit 0 in a
   test of its own is **not determined**.
4. **No claim is made about browser fidelity.** Everything here says a component mounts and behaves
   in a headless DOM. `[HYP, High confidence]` the converted assertions describe real user-visible
   behaviour, because they read rendered text the owner's rulings name — but the only disconfirming
   instrument is the owner's own observation, and the `013-qa-toast-vessel-render.test.ts` header
   already says as much about its own predecessor. This harness does not change that.
5. **`test.projects` was verified in the rig only** (vitest 4.1.2, mirror root). Not run against
   `website`'s own tree. Recommendation 2 closes it.

## Disposition of the rig

The rig is **left in place on disk** at `agent-output/verification/014/analyst-rig/` (gitignored,
~90 MB: a `cp -a` mirror of `website/src` plus an `npm` install of vitest/jsdom/happy-dom). It is
left rather than deleted because M2 and M4c can use it directly — it is the only place a
`.test.tsx` conversion can be tried without touching `website` — and because the eleven committed
POC files under `verification/014/poc-tests/` drop straight into it.

Two things a later reader must know before trusting it:

- **It is a copy taken at `a74b9e2`.** The moment `website/src` moves, the mirror is stale and every
  run against it is a run about the old tree. Re-derive with the `diff -rq` in `README.md`, or
  rebuild; never assume.
- **Check `ls -ld analyst-rig/mirror/node_modules` before believing any red run.** Per `hazards.md`,
  a rig's `node_modules` symlink can degenerate into a real directory, and the probe then reads as
  failing when the rig is what broke.

Deleting it costs nothing but the rebuild time in `README.md`.

## Handoff

Back to `planner-hooks-014` — **delivered and consumed at plan rev 5 (`72cde0a`)**. M2 is cleared to
implement; D13 does not reopen. S1–S5 and the rev-3 mechanism correction were the planner's
decisions and are now taken; nothing is outstanding from this analysis.

Next: the **implementer**, for M2 under the plan as revised. The gaps listed under "Open questions"
are for the planner to commission separately if it wants them closed — they are recorded as
unclosed, not queued.
