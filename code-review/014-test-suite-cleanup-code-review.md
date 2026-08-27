---
ID: 014
Origin: 014
UUID: 4671e28c
Reviewed-At: "website e6163fd (chain/014-test-suite-cleanup) — round 1 verdict reached at 988ca15, moved here by the round-1 fix sub-entry. Committed tree, SHA identity. vitest.config.ts and vitest.setup.dom.ts changed between the two; package.json, pnpm-lock.yaml and tsconfig.test.json are byte-identical at both. See Tree Under Verdict."
Status: In Review
---

# Code Review: Plan 014 — Hooks test-suite cleanup, milestone M2 (DOM harness)

**Plan Reference**: `agent-output/planning/014-test-suite-cleanup.md` — **read at revision 9**,
2026-08-27. The plan moved to revision 10 after this verdict was reached. **The verdict does not
expire**, checked against the delta rather than assumed: rev 10 adds two Risks *prediction records*
(one of them this review's own result) and widens the *Instrument note* from one shape to a class
rule. Both are record areas. No M2 acceptance property, milestone boundary, scope line or release
condition that this verdict verified was touched. Established by reading the delta, not by taking
the planner's word for it: `git diff 1140d56..HEAD -- planning/014-test-suite-cleanup.md` is
`+10 −8`, and every changed line falls in the frontmatter (`Revision`, `Status-Detail`), the
changelog (one new row plus a reordering), the *Instrument note* in the Rubric section, or the Risks
table. The `### M2 — DOM harness` section and the `## Acceptance criteria` section are byte-unchanged,
so the seven rows of the M2 requirements table below still quote the plan verbatim.
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
| 2026-08-27T02:52 | planner-hooks-014 → code-reviewer-hooks-014 | Plan rev 10 consumes the review's planner-facing items | Both re-derived at the plan itself, not accepted from the message: the harness Risks row records "not met" with rig, tuples, capture path and the node-half scoping; the *Instrument note* is now a class rule with a second Risks row tracking it per pass (I-2's disposition upgraded — see the finding). Next Steps item 4 closed; I-2's routing superseded. **My error, recorded**: this plan's changelog is newest-first and I appended R-6 at the bottom. The lifecycle skill says rows "append chronologically", which I applied without checking the table's own order — the planner restored position, content unchanged. Check the table before appending, not the convention. No finding changed; verdict identity untouched. |
| 2026-08-27T03:10 | implementer-hooks-014 → code-reviewer-hooks-014 | Fix confirmation for M-1, M-2 and L-1 | **Sub-entry of round 1, not a new round** — the fix diff touches only findings scope (`website` `e6163fd`, 2 files) plus one record document. All three findings CONFIRMED CLOSED; each disposition records both the class being gone and the captured check that fails if it returns. Re-attacked from first principles because the fix touches an instrument: five controls re-derived against the new config shape, two of them adversarial (the "structurally unskippable" claim; a suspected type-safety regression). Differential across the fix: 570/570 identical tuples, exit 0 both. `Reviewed-At` moved to `e6163fd`. Two nits recorded, neither reopening anything. Verdict unchanged: APPROVED_WITH_COMMENTS. |
| 2026-08-27T03:30 | implementer-hooks-014 → code-reviewer-hooks-014 | N-2 nit fixed in the implementation doc | **Not a round and not a sub-entry** — no reviewed blob moved. `website` HEAD is still `e6163fd` and all five reviewed blobs are byte-identical to the verdict's manifest (`git diff --numstat e6163fd..HEAD` on the five paths: empty). The change is one line of another stage's record document (`agent-output` `8ca4181`), verified against `verification/014/code-review-m2/debug-bump-attribution.txt` and against the commit's own diff; the attribution is now accurate. N-2 marked FIXED above. Verdict identity untouched. |

## Tree Under Verdict

A verdict binds to a tree. The reviewed content is committed, so the SHA is the identity and no
content manifest is owed. Files were read via `git show 988ca15:<path>` and run from throwaway
`git worktree` checkouts, never from the shared working tree.

The verdict was **reached** at `988ca15` and **moved to `e6163fd`** by the round-1 fix sub-entry
below. Two of the five paths changed between them — that is the fix — and each was re-verified at the
new SHA rather than carried across. The other three are byte-identical at both, so nothing was
re-reviewed that did not move.

| path | blob at 988ca15 | blob at e6163fd | worktree `git hash-object` | moved by the fix? |
|---|---|---|---|---|
| `package.json` | `0bcdaee` | `0bcdaee` | `0bcdaee` | no |
| `pnpm-lock.yaml` | `db0249e` | `db0249e` | `db0249e` | no |
| `tsconfig.test.json` | `bf0e7d7` | `bf0e7d7` | `bf0e7d7` | no |
| `vitest.config.ts` | `d003a75` | `436822b` | `436822b` | **yes** |
| `vitest.setup.dom.ts` | `409c960` | `080375f` | `080375f` | **yes** |

**This verdict expires if any of the `e6163fd` blob hashes changes.** Do not rely on another agent
noticing.

During round 1 the branch HEAD moved twice under the pass (`1f89b34` → `4761453`) as
implementer-hooks-014 continued M4c in another session. Neither move touched the reviewed surface,
established rather than assumed with
`git -C website diff --numstat 988ca15..4761453 -- <the five paths>` returning no output. At the fix
sub-entry the same check was run forward: `git diff --numstat e6163fd..HEAD -- <the five paths>` is
likewise empty, so `e6163fd` is both the fix commit and the current state of the reviewed surface.

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

**M-1  RESOLVED** — Evidence Quality: the false "purely additive — zero removed lines" lockfile
claim. Class gone: the implementation doc's `pnpm-lock.yaml` row and its `pnpm add -D jsdom` row now
carry dated reconcile notes stating 328/7, naming the unsound instrument and why it is unsound;
commit `988ca15`'s message correctly left unamended. Verified at the artifact, not from the report
(`implementation/014-test-suite-cleanup-implementation.md`, "Files Modified" and "Test Execution
Results"). Landed: `agent-output` `9240392`. **Check that fails if it returns**:
`verification/014/code-review-m2/lockfile-removed-lines.txt` — re-running its two pre-pipe
instruments against any future lockfile commit reproduces the true add/remove counts. The broader
class — a predicate over piped output publishing a false count — is now tracked per pass by the
plan's own Risks table (rev 10), which is a stronger guard than this finding asked for.

**M-2  RESOLVED** — Dead Configuration: the top-level `resolve: { alias }` vitest never read. Class
gone, by the **Preferred (structural)** route: the top-level key is deleted and a `project(test)`
factory now supplies `resolve: { alias }` at the only place projects are constructed. Landed:
`website` `e6163fd`. **Check that fails if it returns**:
`verification/014/code-review-m2/fix-controls.txt` control C3 — stripping the alias from the factory
body fails collection on both projects at once. See the fix sub-entry for the two adversarial checks
run against this fix and the one nit they turned up.

### Low/Info

**L-1  RESOLVED** — Documentation: the setup-file comment described the file as inert in the node
environment rather than never loaded there. Class gone: reworded to state the mechanism —
`setupFiles` is declared only on the dom project, so the node project never loads the file. Landed:
`website` `e6163fd`. **Check that fails if it returns**: `no test`. This is a comment-accuracy
defect with no executable surface; the *behaviour* it describes is covered by the node-scope probe in
`verification/014/code-review-m2/fix-controls.txt`, but nothing fails if the comment alone drifts
again. Recorded explicitly rather than left implied.


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
already owns carrying instrument lessons to pi (plan D7). The part worth the retrospective's
attention is that the rule already existed and the variant still slipped past it: the plan's
*Instrument note* (`planning/014-test-suite-cleanup.md`, cited by name — the note has since moved
line) forbade `| wc -l` for counts, naming one shape rather than the class, and a piped `grep -c`
is not that shape.

**Disposition, re-derived at the artifact 2026-08-27 (not accepted from the message reporting it):**
planner-hooks-014 consumed this at plan rev 10. The *Instrument note* now states a class rule — no
count, match or existence predicate over piped output; instruments compute before any pipe — with
this lockfile check named as its observed member. A second Risks row was added, *"An instrument
predicate over filtered output publishes a false count"*, falsifier *"any recorded count on this
chain that a pre-pipe instrument contradicts"*, so the class is now tracked per pass rather than
only carried to the retrospective. That is a stronger disposition than this finding asked for, and
it supersedes the routing sentence above rather than sitting beside it.

**[INFO] I-3 — Rig hazards, recorded so the next agent does not pay for them again**: a fresh
`git worktree` of this repo lacks the gitignored `next-env.d.ts` (without it `tsc -p tsconfig.json`
fails with `TS2307` on an image import — a rig artefact that reads exactly like a product finding) and
lacks the untracked `.env.local` (any test importing the `~/utils` barrel then dies at import with
`Invalid environment variables`, reporting `(0 test)`). Both, and two more, are written up in
`verification/014/code-review-m2/README.md`.

## Round 1 — Fix Confirmation (sub-entry)

**This is a sub-entry of round 1, not a new numbered round.** The fix diff (`website` `e6163fd`,
`vitest.config.ts` + `vitest.setup.dom.ts`) touches only findings scope, plus one record document in
`agent-output`. Scoped means the diff, not the rigor: the controls were re-run, the fix was
re-attacked, and each disposition above records two things rather than one.

**Re-attacked from first principles, not read and agreed with.** The trigger is what the fix touches,
not the finding's subject matter — a vitest config is the instrument that decides whether any test
runs at all, so the round-1 controls were re-derived against the *new* config shape rather than
carried across. Captures: `verification/014/code-review-m2/fix-controls.txt`.

| Check | Result |
|---|---|
| dom probe at `e6163fd` | 4/4, exit 0 — `\|dom\|` project, jsdom live, setup file loaded, `~` resolves, `createRoot`+`act` mounts |
| node-scope probe | 2/2, exit 0 — `.test.ts` still sees no `window`, no `document`, no ACT flag |
| C1 drop `setupFiles` | red on the setup case only |
| C2 dom `jsdom` → `node` | red on the DOM and mount cases |
| C3 strip the alias from the factory body | collection fails, `Failed to resolve import "~/utils/pushSorted"` |
| Both `tsc` programs at `e6163fd` | exit 0, exit 0 |

**Decision-neutrality of the fix, settled by execution.** Both trees run across the fix commit
(`100b319` and `e6163fd`): **570/570 identical `(file, fullName, status)` tuples, 0 lost, 0 added,
exit 0 both.** Captured at `verification/014/code-review-m2/fix-differential.txt`. The count differs
from round 1's 604 because M4c deletions landed in between; the differential brackets the fix commit
alone, so that is not drift.

### Two adversarial checks, and what they found

**C4 — is the factory actually "structurally unskippable", as its comment claims?** No. A third
project written as a raw object literal, bypassing `project()`, type-checks clean (`tsc` exit 0, 0
errors) and then fails at collection exactly as the pre-fix hazard did. The factory is a **strong
default at the only place projects are constructed, not an impossibility**.
**This does not reopen M-2.** The class M-2 named was a *dead key retained as if load-bearing, with a
comment asserting a guarantee it did not provide* — the dead key is gone, and the artifact that
invited the mistake no longer exists. What remains is a slightly overstated word in a comment, with
a loud immediate failure behind it. Recorded as N-1 below; making the claim literally true would need
a branded return type on `project()`, which is over-engineering for a thirty-line config and is **not
asked for**.

**C5 — did the factory's `Record<string, unknown>` parameter lose type checking the inline literal
had?** No — **no regression**. Misspelling `environment` as `enviroment` produces `tsc` exit 0 and
zero errors under *both* the fixed factory shape and the pre-fix `988ca15` inline shape. Vitest
project option keys were never type-checked here, so the factory took nothing away. This was the
strongest objection available to the fix and it does not survive contact with the instrument. Worth
knowing separately: the same typo silently drops the dom project to a node environment at runtime,
and only a test asserting DOM presence catches it — from M4c onward the suite contains such tests by
construction, so the class is covered going forward.

### Nits from the sub-entry — neither reopens anything

**N-1 (nit)** — `vitest.config.ts`'s factory comment says the pattern is "structurally unskippable".
C4 shows it is not. Suggested wording, if it is ever touched again: *the default at the only place
projects are constructed*. No action owed; not a finding.

**N-2 (nit)** — **FIXED, verified** at `agent-output` `8ca4181`. The reconcile note in
`implementation/014-test-suite-cleanup-implementation.md` had attributed all five `debug` bumps to
"the `@pm2/pm2-version-check` devDependency subtree". They are spread across five sibling snapshots —
`@pm2/pm2-version-check@1.0.4`, `agent-base@7.1.0`, `get-uri@6.0.1`, `pac-proxy-agent@7.0.0`,
`socks-proxy-agent@8.0.1` — which descend from `pm2`, not from `@pm2/pm2-version-check` (itself one
of the five, not their common ancestor). The corrected row now reads "5 sibling snapshots descending
from `pm2`" and cites the attribution capture; checked against
`verification/014/code-review-m2/debug-bump-attribution.txt` and against the diff of `8ca4181`
itself, and it is accurate. The bound the note draws (dev-only, same major, unrelated to jsdom) was
correct before and after — only the subtree's name moved. Record-area correction form, in place, one
line changed, no other row touched.

### Instrument fault found in my own rig, recorded

The pass-set comparator hard-coded its worktree-prefix strip as `cr014-(pre|post)`. Run against
worktrees named `cr014-prefix` / `cr014-fix` it stripped nothing and reported **every** tuple as
changed — 570 only-in-pre and 570 only-in-post on two trees that were in fact identical. Caught by
reading the paths in the output rather than the counts, which agreed. The comparator now takes any
`/tmp/cr014-*/` prefix, the round-1 differential was re-verified against the repaired version and
still reproduces at 604/604, and the hazard is written into the captures' README. A differential
reporting 100% drift is an instrument fault, not a finding.

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

**Verdict at the fix sub-entry: unchanged, APPROVED_WITH_COMMENTS, now at `e6163fd`.** All three
findings are confirmed closed against the fixed tree, re-attacked rather than read; the fix is
behaviour-neutral by execution (570/570, exit 0 both). The two adversarial checks found no defect the
fix introduced — the one they turned up, an overstated word in a comment, is recorded as a nit and
asked for from nobody. Rounds stop here: no finding on this surface changes a decision, so anything
further routes to a follow-up register rather than holding the tree.

**Scope of this verdict**: milestone M2's five non-test paths at `website` `988ca15` and no more. It
says nothing about any test file, about `src/`, or about the chain as a whole. Per the milestone-scope
rule, the plan's `Status` field is **not** moved by this review; the verdict and its scope are
recorded in the plan's changelog instead.

## Required Actions

**All discharged at `e6163fd` / `agent-output` `9240392`.** M-1, M-2 and L-1 are confirmed closed in
the fix sub-entry above, each with the two-part disposition — class gone, and the captured check that
fails if it returns (or `no test`, stated). Nothing is owed back to the implementer.

Two nits (N-1, N-2) were recorded above and asked for from nobody. **N-2 was nonetheless fixed by
the implementer** at `agent-output` `8ca4181` and verified here against the capture and the commit's
own diff. **N-1** stands as recorded — a word in a comment, no action owed. Neither was a finding,
neither held anything, and neither generated a round.

## Next Steps

1. ~~**implementer-hooks-014** — clear M-1, M-2 and L-1~~ — **DONE**, same session, all three at
   `website` `e6163fd` and `agent-output` `9240392`, re-verified here. M-2 took the Preferred
   (structural) route rather than the Minimum. Nothing further owed.
2. **implementer-hooks-014**, at the first M4c case that mounts `edit/page.tsx` — apply the
   analysis's deterministic mitigation for the nine eager prefetches. Still open; this is the
   mitigation half of the Assumption Not Checked above and the only item from this review still
   carrying work.
3. **qa subagent** — owns closing the Assumption Not Checked. Hold the plan's exit-code observable at
   Phase 2 and at the M5 sweep: a run that reports every case passed and exits non-zero is the falsity
   signature, and the JSON reporter's counters cannot see it. Record the process exit code beside the
   counters, per the workspace convention. QA also holds AC7 and adequacy for every test-only diff on
   this chain under V-27 — none of which this review assessed.
4. ~~**planner-hooks-014** — take the prediction record for the harness Risks row~~ — **DONE at plan
   rev 10**, re-derived at the artifact: the row records "not met" with the rig, the tuples and the
   capture path, scoped to the node half with the dom half named open until M4c. A second Risks row
   now tracks the instrument-predicate class from I-2. Nothing further owed to or from the planner.
5. **retrospective** — I-2, the recurring piped-diff-count instrument, alongside the instrument
   lessons plan D7 already routes to pi. Note that the plan has since promoted this from a
   retrospective item to a per-pass Risks row, so the retrospective inherits a live guard rather than
   a lesson.

Handing off to the qa subagent for test execution.
