---
ID: 014
Origin: 014
UUID: 4671e28c
Reviewed-At: "website 988ca15 (chain/014-test-suite-cleanup). Committed tree — SHA identity, no manifest fallback needed. Branch HEAD moved 1f89b34 -> 4761453 during this pass (another session's M4c work); the five reviewed paths are byte-identical at 988ca15, at 4761453 and in the shared working tree — see Tree Under Verdict below."
Status: In Review
---

# Code Review: Plan 014 — Hooks test-suite cleanup, milestone M2 (DOM harness)

**Plan Reference**: `agent-output/planning/014-test-suite-cleanup.md` (revision 9, read 2026-08-27)
**Implementation Reference**: `agent-output/implementation/014-test-suite-cleanup-implementation.md`
**Analysis Reference**: `agent-output/analysis/014-test-suite-cleanup-analysis.md` (`50f053a`)
**Rulings**: `agent-output/steering/014-rulings.md`
**Captured instruments**: `agent-output/verification/014/code-review-m2/`
**Date**: 2026-08-27
**Reviewer**: code-reviewer-hooks-014

**Scope**: M2's non-test diff only — `website/package.json`, `website/pnpm-lock.yaml`,
`website/tsconfig.test.json`, `website/vitest.config.ts`, `website/vitest.setup.dom.ts`. Every other
diff on this chain is test-only and goes to the qa subagent under V-27 (plan: "Code review on this
chain: scoped to M2's `package.json`/`vitest.config.ts`/lockfile diff only"). Nothing under `src/`
was reviewed and no verdict here reaches it.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-08-27T02:29 | steering-test-cleanup → code-reviewer-hooks-014 | Review `chain/014-test-suite-cleanup` at `988ca15`, scoped to M2's harness diff | Round 1. Two MEDIUM, one LOW, two INFO. Verdict APPROVED_WITH_COMMENTS. M2's behaviour-preservation claim independently confirmed by execution; the harness itself confirmed functional by probe and five negative controls. |
| 2026-08-27T02:40 | steering-test-cleanup → code-reviewer-hooks-014 | Owner ruling on the plan-changelog commit gate | Gate satisfied, not worked around. The R-6 row was written into `planning/014-test-suite-cleanup.md` per this agent's definition, then **held uncommitted** because committing another stage's document is gated; raised to the owner as a decision with a real drop option. Owner, by selection: Option A — "Reviewer commits its row", scoped to `git commit --only planning/014-test-suite-cleanup.md` for that single row, with `git diff` on the path re-checked immediately before. Re-checked (one hunk, mine, `+1 -0`); committed `agent-output` `1140d56`. Owner also directed a TODO for a standing narrow exception — already lodged by steering at `~/.claude/agents/TODO.md` (2026-08-27, "pi: code-reviewer commits its own changelog row in the plan"), so no duplicate entry was made. No finding changed; verdict identity untouched. |

## Tree Under Verdict

A verdict binds to a tree. The reviewed content is committed, so the SHA is the identity and no
content manifest is owed. Files were read via `git show 988ca15:<path>` and run from throwaway
`git worktree` checkouts, never from the shared working tree.

The branch HEAD moved under this pass — `1f89b34` at start, `4761453` at end — because
implementer-hooks-014 continued M4c in another session. That does **not** expire this verdict,
because none of it landed on the reviewed surface. Established, not assumed:

```
$ git -C website diff --numstat 988ca15..4761453 -- package.json pnpm-lock.yaml \
      tsconfig.test.json vitest.config.ts vitest.setup.dom.ts
(no output)
```

and the blobs, which stay checkable after the branch moves again:

| path | blob at 988ca15 | worktree `git hash-object` |
|---|---|---|
| `package.json` | `0bcdaee` | `0bcdaee` |
| `pnpm-lock.yaml` | `db0249e` | `db0249e` |
| `tsconfig.test.json` | `bf0e7d7` | `bf0e7d7` |
| `vitest.config.ts` | `d003a75` | `d003a75` |
| `vitest.setup.dom.ts` | `409c960` | `409c960` |

**This verdict expires if any of those five blob hashes changes.** Do not rely on another agent
noticing.

## Architecture Alignment

**System Architecture Reference**: `agent-output/architecture/system-architecture.md` — **does not
exist.**

Instrument that established the absence, run from the workspace root
`/usr/local/bin/hooks` (an `agent-output/`-relative path resolves against the wrong root from inside
a service repo, so both the instrument and its cwd are recorded):

```
$ ls -d /usr/local/bin/hooks/agent-output/architecture/system-architecture.md
ls: cannot access '...': No such file or directory
$ ls /usr/local/bin/hooks/agent-output/architecture/
website.md  (and siblings; no system-architecture.md)
```

This absence was **re-derived here**, not carried from the plan's own recorded absence.
`architecture/website.md` carries nothing on tests — likewise re-checked, not inherited.

**Alignment Status**: **NOT ASSESSABLE against a system architecture document** — there is none.
Scoping the verdict to what could actually be assessed: this review assessed alignment against the
plan's M2 section (rev 9) and the analyst's determination (`50f053a`), both of which the diff
matches. It makes **no** claim of alignment with a system-architecture design, because no such
document was available to align against. The plan itself records `Architectural surface: none — test
infrastructure and a conventions document only`, which is consistent with what the diff does, but a
plan's self-description is not an architecture review.

Against the plan's M2 section, the diff matches on every named point:

| Plan M2 requirement (rev 9) | In the diff at 988ca15 | Verified how |
|---|---|---|
| Environment **jsdom**, not happy-dom | `environment: 'jsdom'` in the dom project | read; and CONTROL 2 shows the key is load-bearing |
| Configured as vitest `test.projects`; node over `src/**/*.test.ts`, dom over `src/**/*.test.tsx` | exactly that | read; probe run shows the `\|dom\|` project collecting the `.tsx` file |
| `include` must admit `.test.tsx` (silent collection failure otherwise) | `include: ['src/**/*.test.tsx']` | probe collected, so admission is proven, not assumed |
| No `@testing-library/react`; `createRoot` + `act` | no such dependency added; probe mounts with `createRoot`+`act` | `package.json` diff is one line; probe case 4 passes |
| Forward step `pnpm add -D jsdom` (pnpm tree, not npm) | `pnpm-lock.yaml` updated, no `package-lock.json` introduced | diff |
| Nothing in `src/` outside tests and `__tests__/helpers/` | commit touches no `src/` path | `git show --stat 988ca15` lists 5 files, none under `src/` |
| `tsconfig.test.json` covers the new setup file | `"vitest.setup.dom.ts"` added to `include` | CONTROL 5 — load-bearing and discriminating |

The implementation doc's pattern claim for `tsconfig.test.json` — "extends the existing
per-file-listing pattern already used there for `vitest.config.ts`" — is **true at this diff**: the
`include` array already listed `vitest.config.ts` as its own entry, and the change adds a sibling
entry rather than a glob. Pattern ladder satisfied; no new idiom introduced.

## Decision-Neutrality: settled by execution, not by argument

M2 is argued behaviour-preserving for the node project. Under the mandatory rule, the argument does
not settle that and neither does the diff's file list. Both trees were executed over the affected
input class — the whole node suite — and every quantity a decision reads was compared.

Process whose output is the evidence, named before the instrument was chosen: **vitest's own JSON
reporter over the unmodified suite**, on two `git worktree` checkouts of `988ca15^` and `988ca15`.
The comparator is mine; the measured quantities are the runner's, not a model of it.

```
PRE (988ca15^) : {"files":46,"total":604,"passed":604,"failed":0,"tuples":604}  exit 0
POST (988ca15) : {"files":46,"total":604,"passed":604,"failed":0,"tuples":604}  exit 0
only-in-pre : 0
only-in-post: 0
```

Identity key is the `(file, fullName, status)` triple, per the plan's AC2. Captured at
`agent-output/verification/014/code-review-m2/passset-differential.{js,txt}`.

**Independence note.** These numbers match the implementer's (604/604, exit 0) but were produced on
a different rig by a different comparator, so the agreement is evidence rather than an echo. Both
runs also ran *without* the untracked `.env.local`, identically on both sides — see the rig-hazard
list in the captures' README.

**This instantiates a plan Risks row.** Risk *"The harness changes node tests' behaviour"*, falsifier
*"M2: any baseline-passing case failing after config"*. The falsifier **did not fire**: zero cases
lost, zero added, zero status changes, exit 0 on both sides. planner-hooks-014 can write the
prediction record for that row this cycle rather than deferring it.

## The harness was unexercised by the milestone that introduced it — so it was exercised here

At `988ca15` the repository contains **zero** `src/**/*.test.tsx` files
(`git ls-tree -r --name-only 988ca15 -- src | grep -c '\.test\.tsx$'` → 0). The dom project therefore
collected nothing, and the implementer's "exit 0" evidence is a statement about the node project
alone. The analyst's feasibility work is real but was performed against a *different artefact* — the
rig's `projects.config.ts` in a mirrored tree — and an instrument's validity is indexed to the claim
it was built for. The claim now on the table is that **this** `vitest.config.ts`, in **this** tree,
collects, environs, aliases and sets up `.test.tsx` files. Nothing had executed that.

A probe was written and run against `988ca15` in a throwaway worktree
(`verification/014/code-review-m2/harness-probe.test.tsx`), with the oracle stated before the run:
a case passes only if the runner labels the file `|dom|`, `document`/`window` are objects,
`IS_REACT_ACT_ENVIRONMENT === true`, a `~`-aliased import resolves, and `createRoot` + `act` render
text that reads back from the DOM.

Result: **4/4 pass, exit 0.** A companion `.test.ts` probe confirms the scoping claim in the other
direction — node tests get no `window`, no `document`, and never see `IS_REACT_ACT_ENVIRONMENT`.

Five negative controls establish the probe discriminates rather than merely agrees
(`verification/014/code-review-m2/harness-controls.txt`; every mutation restored, restoration
verified by `diff -q`):

| Control | Mutation | Result |
|---|---|---|
| 1 | drop `setupFiles` from the dom project | red on the setup-flag case only |
| 2 | dom `environment: 'jsdom'` → `'node'` | red on the DOM and mount cases |
| 3 | drop `resolve: { alias }` from the **dom project only** | `Failed to resolve import "~/utils/pushSorted"` — collection fails |
| 4 | drop the **top-level** `resolve: { alias }`, keep both project copies | **48 files / 610 tests pass, exit 0** — see M-2 |
| 5 | type error in `vitest.setup.dom.ts`, with / without the `tsconfig.test.json` include entry | `exit 2, 1 error` / `exit 0, 0 errors` |

Both `tsc` programs are clean at `988ca15` with a `.test.tsx` present: `tsc -p tsconfig.json
--noEmit` exit 0 and `tsc -p tsconfig.test.json --noEmit` exit 0.

## TDD Compliance Check

**TDD Table Present**: Yes.
**All Rows Complete**: Yes.
**M2's row claims an exemption** — "Behaviour-preservation, not TDD red/green — config-only change,
no new production function or class authored". A claimed exemption is a claim, not a waiver, so it
was verified rather than accepted: behaviour preservation was established by executing both trees
(above), not by reading the diff. The exemption **holds**. `vitest.setup.dom.ts` does introduce one
executable statement, but it sets an existing framework flag and carries no branch — and CONTROL 1
shows even that statement is covered by a discriminating check.

**Concerns**: none on the TDD table. One evidence-quality concern, raised as M-1 below, concerns a
row of the *Test Execution Results* table rather than the TDD table.

## Findings

### Critical

None.

### High

None. No finding here reaches a magnitude that would hold the tree: the one substantive change
outside the stated scope is bounded at five dev-only, same-major transitive resolutions with a
measured effect on the suite of exactly zero.

### Medium

**[MEDIUM] Evidence Quality / Documentation**: "purely additive — zero removed lines" is false, and the instrument that produced it does not reproduce
- **Location**: `website` commit `988ca15` message, body paragraph 4; and
  `agent-output/implementation/014-test-suite-cleanup-implementation.md`, *Test Execution Results*
  table, the `pnpm add -D jsdom` row (cited by document + table row because the file is a record
  area with no symbol to name).
- **Class**: A property of a diff asserted into the durable record on the strength of a single count
  taken through a pipe, where this environment's own conventions name that instrument unsound for
  that exact shape and no second, independent instrument was run against it.
- **Enumeration**:
  `grep -rn "git diff[^|]*|[[:space:]]*grep\|git show[^|]*|[[:space:]]*grep\|diff[^|]*| *wc -l" agent-output/implementation/ agent-output/verification/014/ agent-output/planning/014-test-suite-cleanup.md`
  → **1 hit in this chain's scope** (`implementation/014-test-suite-cleanup-implementation.md:264`).
  Two further hits sit in closed prior-chain documents and are out of this verdict's scope
  (`implementation/closed/012-message-valid-field-implementation.md:270`,
  `implementation/closed/013-components-v2-editing-surfaces-implementation.md:76`) — see I-2.
  **What this predicate does not match**: a piped count whose `git diff`/`git show` is not on the
  same line as the `grep` (a shell variable holding the diff, a two-line sequence, `<(…)` process
  substitution); a count taken through a pipe from some other producer; and — the largest blind spot
  — any count whose command was never written into the record at all, which no grep over the record
  can see. These forms are named at authoring time because they are properties of the predicate, not
  discoveries about the hits.
- **Issue**: The record states the lockfile change is purely additive with zero removed lines. It is
  not. Two instruments that compute before any output filter agree the commit removes **7** lines
  from `pnpm-lock.yaml`:
  `git show 988ca15 --numstat -- pnpm-lock.yaml` → `328  7  pnpm-lock.yaml`, and
  `git show 988ca15 -- pnpm-lock.yaml > f && grep -c '^-[^-]' f` → `7`.
  Two of the seven are the mechanical rewrite of vitest's peer key to carry `(jsdom@30.0.1)` —
  expected. The other five are resolution changes to **existing** packages that adding jsdom does not
  require: `debug` moves `4.3.4 → 4.4.3` inside `@pm2/pm2-version-check@1.0.4`, `agent-base@7.1.0`,
  `get-uri@6.0.1`, `pac-proxy-agent@7.0.0` and `socks-proxy-agent@8.0.1`.
  **Magnitude, measured**: five snapshots, all inside the `paracord → pm2 → proxy-agent`
  devDependency subtree; nothing under `package.json` `"dependencies"` changed; same major
  (`debug` 4.x); and the effect on the suite is zero — 604/604 identical `(file, fullName, status)`
  tuples pre and post, exit 0 both (differential above). The install appears to have *converged* a
  pre-existing split, since `http-proxy-agent@7.0.0` and `https-proxy-agent@7.0.2` were already on
  `4.4.3` at `988ca15^` while their siblings were on `4.3.4`. Attribution and the rebuild command at
  `verification/014/code-review-m2/debug-bump-attribution.txt`.
  Why it matters despite the small magnitude: the "purely additive" sentence is the argument that
  licensed the lockfile hunk as in-scope, and it is the sentence devops reads at release. Worse, the
  recorded instrument **contradicts itself on re-run**: executed now against the same two commits it
  returns `7`, not the recorded `0`. So the number in the record cannot be reproduced by its own
  stated command — it is not merely wrong, it is unverifiable, and no second instrument was ever run
  to catch that.
- **Required Action**:
  - **Preferred (structural)**: stop asserting diff properties from a piped count. Where a claim about
    a diff enters the record, take it from an instrument that computes before any output filter —
    `git … --numstat`, or redirect the diff to a file and `grep -c` that file — and record the command
    beside the number, so the next reader can re-run it. The record convention already requires the
    command; what is missing is that it be a sound one.
  - **Minimum**: correct the implementation doc's `pnpm add -D jsdom` row. Because that table is a
    **record area**, correct it in place with a dated reconcile note stating what it previously said
    and why that was defensible when written — not a silent overwrite. State the true figure (7
    removed lines), enumerate the five non-jsdom resolution changes, and state the bound
    (dev-only, same major, zero measured effect on the suite). The commit message itself is immutable
    and must **not** be rewritten — history rewrites move the tree under other sessions and are not
    this agent's to initiate; the implementation doc is the correcting surface.

**[MEDIUM] Dead Configuration / Checks That Cannot Fail**: the top-level `resolve: { alias }` is read by nothing, next to a comment claiming it prevents drift
- **Location**: `website/vitest.config.ts` at `988ca15` — the `resolve: { alias }` property of the
  object passed to `defineConfig`, and the `const alias` declaration's comment immediately above it.
  (Cited by property rather than by line: the file has no symbol at that site.)
- **Class**: A configuration key set at a scope the tool does not read, retained in the file as
  though load-bearing, with a comment beside it asserting a guarantee that key does not provide.
- **Enumeration**: `git -C website ls-files | grep -E "vite|vitest"` → 2 files
  (`vitest.config.ts`, `vitest.setup.dom.ts`); across all four workspace repos,
  `ls */vite*.config.*` → `website/vitest.config.ts` only. Inside it,
  `git show 988ca15:vitest.config.ts | grep -n resolve` → 6 hits, of which 3 are `resolve: { alias }`
  uses: **1 top-level (the class member) and 2 per-project (load-bearing, proven by CONTROL 3)**.
  Class size: **1 member.**
  **What this predicate does not match**: a dead key expressed outside a `vite*.config.*` file — a
  `"vitest"` field in `package.json`, a JSON or YAML config — none of which exist in this workspace;
  and a key that is dead for a reason other than scope, such as one overridden later in the same
  object literal, which a `resolve`-name grep would not distinguish.
- **Issue**: CONTROL 3 proves the per-project `resolve: { alias }` entries are what make `~` resolve
  — removing the dom project's copy fails collection with
  `Failed to resolve import "~/utils/pushSorted"` while the top-level key is still present. CONTROL 4
  proves the converse: with the top-level `resolve: { alias }` deleted and both project copies kept,
  the full suite passes, **48 files / 610 tests, exit 0**. The top-level key is inert.
  That inertness is not harmless, because the comment above the shared `const` reads *"Shared once so
  the two projects below cannot drift apart"* — an accurate claim about the two project copies, but
  read together with a top-level `resolve` it invites the natural and **wrong** inference that
  aliasing is configured project-wide. The concrete failure it sets up is the one CONTROL 3 already
  demonstrated: whoever adds a third project — the likely next step, since M4c is about to add DOM
  tests and a future chain may want a third environment — omits `resolve: { alias }` from it, and the
  new project fails collection with a resolver error that names an import rather than the config.
  A dead control is worse than an absent one, because it is counted.
- **Required Action**:
  - **Preferred (structural)**: make the class unrepresentable — define the projects through a small
    factory that supplies `resolve: { alias }` itself, e.g.
    `const project = (test) => ({ resolve: { alias }, test });`, then
    `projects: [project({ name: 'node', … }), project({ name: 'dom', … })]`. A project then cannot be
    written without its alias, the shared-`const` comment becomes true of the mechanism rather than of
    a convention, and the top-level `resolve` has nothing left to imply.
  - **Minimum**: delete the top-level `resolve: { alias }` (CONTROL 4 shows the suite is unaffected)
    and reword the comment so it states what actually holds — that each project supplies the shared
    alias and a new project must do the same.

### Low/Info

**[LOW] Documentation & Comments**: the setup-file comment describes a mechanism the file does not have
- **Location**: `website/vitest.setup.dom.ts` at `988ca15`, the second comment line.
- **Class**: A comment that describes the code beside it in terms of a mechanism that is not the one
  in force — here, describing a file as *inert* in an environment it is in fact never loaded into.
- **Enumeration**: `git show 988ca15:vitest.setup.dom.ts` → 3 lines, 2 of them comment, **1 in
  scope**. The other four reviewed files were read in full for the same class:
  `package.json`, `pnpm-lock.yaml` and `tsconfig.test.json` carry no comments (JSON);
  `vitest.config.ts` carries exactly 1, covered by M-2 above. Reviewed-surface class size: **1**.
  **What this predicate does not match**: a comment that is accurate about the mechanism but stale
  about the surrounding code, and any comment outside the five reviewed paths — the whole `src/` tree
  is out of scope for this verdict and was not swept.
- **Issue**: The comment says the flag *"has no effect in the node project's environment"*. That
  phrasing implies the statement executes under the node project and is simply inert there. It does
  not execute there at all: `setupFiles` is declared only on the dom project, so this file is never
  loaded by the node project. My node-scoping probe confirms the observable — a `.test.ts` sees
  `IS_REACT_ACT_ENVIRONMENT` as `undefined`, not as a set-but-ignored value. The distinction is the
  entire point of the design the plan chose (environment follows the file extension, nothing to
  forget per file), so a comment that blurs it undercuts the one thing it is there to explain.
  On the comment policy itself: this comment is **pure description of the code beside it** and carries
  no effort-bound or register-like content — no chain or finding ID, no round, no date, no
  attribution. It correctly stays in the file; only its wording is at issue.
- **Required Action**:
  - **Preferred (structural)**: none available — this is a wording defect, not a representable class.
  - **Minimum**: reword to state the mechanism, e.g. that the file is loaded only by the dom project
    (`setupFiles` in `vitest.config.ts`), so node tests never receive the flag.

**[INFO] I-1 — Verification / Checks That Cannot Fail**: M2's own acceptance evidence could not have
seen a broken harness. At `988ca15` the dom project collects zero files, so the milestone that
introduces jsdom exercises none of it, and "exit 0" measures only the node project. This is not a
defect in the implementer's work — the sequencing is the plan's (M2 lands before M4c writes the first
`.test.tsx`) and the doc says so plainly. It is recorded because it means the harness reached this
gate with no executed evidence behind it. **Discharged here**, by the probe and five controls above;
the instruments are captured at `verification/014/code-review-m2/` so the next reader inherits the
means to re-test the claim, not just the claim.

**[INFO] I-2 — Pattern, routed not escalated**: the instrument shape in M-1 recurs across chains.
Two citable instances, each with its primary record: this chain
(`implementation/014-test-suite-cleanup-implementation.md:264`, `git diff … | grep -c '^-[^-]'`) and
chain 012 (`implementation/closed/012-message-valid-field-implementation.md:270`,
`git diff pnpm-lock.yaml | grep -E "^[+-]" | …`) — both piped counts over a diff, both load-bearing,
both about `pnpm-lock.yaml`. Two instances across two chains is a thin pattern and the 012 document is
closed, so this is **not** escalated as a PATTERN; it is routed to this chain's retrospective, which
already owns carrying instrument lessons to pi (plan D7). Note that the plan itself already carries
an *Instrument note* forbidding `| wc -l` for counts (`planning/014-test-suite-cleanup.md:111`) — the
rule exists and the piped-`grep` variant slipped past it, which is the part worth the retrospective's
attention.

**[INFO] I-3 — Rig hazards, recorded so the next agent does not pay for them again**: a fresh
`git worktree` of this repo lacks the gitignored `next-env.d.ts` (without it `tsc -p tsconfig.json`
fails with `TS2307` on an image import — a rig artefact that reads exactly like a product finding) and
lacks the untracked `.env.local` (any test importing the `~/utils` barrel then dies at import with
`Invalid environment variables`, reporting `(0 test)`). Both, and two more, are written up in
`verification/014/code-review-m2/README.md`.

## Positive Observations

- **The shared-`alias` `const` is the right instinct, and CONTROL 3 shows why it was needed.** Vitest
  does not propagate a top-level `resolve` into `test.projects`; each project must carry its own. The
  implementer factored the alias to one declaration rather than duplicating the literal, which is the
  correct response to that constraint. M-2 asks to finish the thought, not to reverse it.
- **The environment-follows-extension design is genuinely enforced, not merely intended.** The
  node-scoping probe shows `.test.ts` files receive no `window`, no `document` and no
  `IS_REACT_ACT_ENVIRONMENT`. There is no per-file directive to forget, which is exactly what the
  analysis recommended and what the workspace CLAUDE.md now documents.
- **`tsconfig.test.json`'s one-line addition is load-bearing and was verified as such** (CONTROL 5).
  It extends the file's existing per-file listing rather than reaching for a new glob — the pattern
  ladder applied correctly to a config file, which is easy to skip.
- **The exit-code observable was honoured rather than argued around.** The implementation doc states
  outright that the analysis's post-teardown rejection finding has nothing to trigger at this commit
  and names M4c as the owner of the mitigation, instead of quietly claiming M2 cleared it. That is the
  right disposition, recorded in the right place.
- **`jsdom` is correctly a `devDependency`, correctly placed alphabetically, and the change adds one
  line to `package.json`.** No `@testing-library/react` crept in, and no `package-lock.json` appeared
  in a pnpm tree.

## Assumption Not Checked

**This review assumes that the analyst's post-teardown module-rejection failure mode — nine eager
`void import(...)` prefetches in `src/app/message/m/[id]/edit/page.tsx` resolving after vitest tears
the environment down — will not defeat the dom project as configured, and it does not test it.** At
`988ca15` the dom project collects zero files, so nothing on this tree can exercise that path, and the
probe above deliberately mounts a trivial element rather than the edit page. **Falsity signature**: a
vitest run whose JSON reporter shows every case `passed` and whose **process exits non-zero**, with
`EnvironmentTeardownError` unhandled rejections in the output — the exact disagreement between the
pass set and the exit code that the analysis measured (`57 passed (57)` / exit `1`) and that AC2's
pass-set-only property cannot see. **Owner of closing it**: the **qa subagent**, at Phase 2 / the M5
acceptance sweep, which holds the plan's exit-code observable; the mitigation itself
(`vi.mock` of the nine prefetch targets, per the analysis) is owed by the implementer at whichever
M4c case first mounts `edit/page.tsx`. Routed again in Next Steps.

Two narrower things this review also did not test, stated so they are not mistaken for covered
ground: **browser fidelity** — every claim here is that a component mounts and behaves in a headless
DOM, never that jsdom matches a real browser (the workspace's own environment-fidelity convention
governs that, and the analysis makes no fidelity claim either); and **installability from the
lockfile** — no `pnpm install --frozen-lockfile` was run, because this rig's `node_modules` is a
symlink into the shared checkout and an installer would have written through it. Whether the committed
lockfile installs cleanly from scratch belongs to the devops agent at release.

## Verdict

**Status**: **APPROVED_WITH_COMMENTS**

**Rationale**: The harness is correct and, as of this review, *demonstrated* correct rather than
merely plausible — the dom project collects `.test.tsx`, runs it under jsdom, loads its setup file,
resolves the `~` alias and mounts React through `createRoot`/`act`, with five negative controls
showing each of those is load-bearing and the probe discriminating. M2's behaviour-preservation claim
is confirmed by independent execution of both trees: 604/604 identical `(file, fullName, status)`
tuples, exit 0 on both sides, zero cases lost or gained. Both `tsc` programs are clean. Nothing under
`src/` was touched. The plan's M2 requirements are met point for point.

Neither MEDIUM finding is a defect in the shipped harness's behaviour. M-1 is a record defect: a false
and unreproducible claim about the lockfile diff, whose true magnitude is bounded at five dev-only,
same-major transitive resolutions with a measured suite effect of exactly zero. M-2 is dead
configuration that sets a demonstrated trap for the next person to add a project, and its fix is two
lines. Both are correctly dispositioned as comments the implementer clears rather than as a gate that
holds M4c — the differential establishes that no finding here changes a decision, and QA's adequacy
pass on the test-only diffs is the substantive gate for this chain under V-27.

No CRITICAL or HIGH finding exists; no file carries three or more MEDIUM findings; the two MEDIUMs
sit in different files and different repositories of concern.

**Scope of this verdict**: milestone M2's five non-test paths at `website` `988ca15` and no more. It
says nothing about any test file, about `src/`, or about the chain as a whole. Per the milestone-scope
rule, the plan's `Status` field is **not** moved by this review; the verdict and its scope are
recorded in the plan's changelog instead.

## Required Actions

None blocking. Three items for the implementer to clear, none of which gates M4c or QA:

1. **M-1 (MEDIUM)** — correct the implementation doc's `pnpm add -D jsdom` row *in place*, with a
   dated reconcile note (record-area correction form, not a silent overwrite): the lockfile removes 7
   lines, not 0; five of them are `debug` 4.3.4 → 4.4.3 in the `paracord → pm2` devDependency subtree,
   dev-only, same major, zero measured effect on the suite. Do **not** rewrite the commit message.
   Going forward, take diff-property claims from `--numstat` or from a redirected file, and record the
   command beside the number.
2. **M-2 (MEDIUM)** — eliminate the dead top-level `resolve: { alias }`. Preferred: a project factory
   that supplies the alias so a project cannot be written without one. Minimum: delete the top-level
   key and reword the shared-`const` comment. CONTROL 4 shows the suite is unaffected either way.
3. **L-1 (LOW)** — reword `vitest.setup.dom.ts`'s second comment line to say the file is loaded only
   by the dom project, rather than that its flag "has no effect" in the node environment.

Because all three touch only the reviewed surface plus one record document, re-verification is a
**sub-entry of this round**, not a new numbered round: re-run the differential and the five controls
from `verification/014/code-review-m2/README.md`, confirm each disposition, and move `Reviewed-At` to
the fixed SHA. A new numbered round opens only if the fix reaches beyond these paths.

## Next Steps

1. **implementer-hooks-014** — clear M-1, M-2 and L-1 above. M4c is **not** blocked and should
   proceed in parallel; none of these three changes the harness's behaviour.
2. **implementer-hooks-014**, at the first M4c case that mounts `edit/page.tsx` — apply the
   analysis's deterministic mitigation for the nine eager prefetches. This is the mitigation half of
   the Assumption Not Checked above.
3. **qa subagent** — owns closing the Assumption Not Checked. Hold the plan's exit-code observable at
   Phase 2 and at the M5 sweep: a run that reports every case passed and exits non-zero is the falsity
   signature, and the JSON reporter's counters cannot see it. Record the process exit code beside the
   counters, per the workspace convention. QA also holds AC7 and adequacy for every test-only diff on
   this chain under V-27 — none of which this review assessed.
4. **planner-hooks-014** — the Risks row *"The harness changes node tests' behaviour"* has its
   falsifier answered this cycle (did not fire; differential cited above) and can take its prediction
   record now rather than at a later pass.
5. **retrospective** — I-2, the recurring piped-diff-count instrument, alongside the instrument
   lessons plan D7 already routes to pi.

Handing off to the qa subagent for test execution.
