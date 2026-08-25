---
Release: b56570dfa916368e9942e671d594112750567923
Verified-At: "b56570dfa916368e9942e671d594112750567923"
Criteria-At: "plan 013 rev 50, eb0e291 — taken from the plan's `Rev:` FIELD, not from its Status-Detail prose"
Status: Released
Status-Detail: >-
  Closed 2026-08-25 with chain 013. **This line previously read `Release Verified`. That was the
  verdict, it was correct when written, and it is NOT withdrawn** - `Status` carries lifecycle
  state, never the verdict, and the `Verified-At` and `Criteria-At` above are untouched. **The tip
  certified here IS the released tree**: `website` serving ref `master` `2d90e8a` -> `b56570d`,
  20:30:01 UTC (deployment record §16), where deployed, verified and the UAT anchor are one object.
  **§6's three process conditions were never this document's to waive and are terminal at their own
  authorities, which are not restated here**: the push was made; `uat/closed/013-components-v2-editing-surfaces-uat.md`
  stands at rev 53 with the register closed and `NOT EXECUTED` nowhere; and **CR25-1/CR25-2 remain
  OPEN residual** under the standing *"record it, leave it"* ruling - unchanged by this closure and
  not closed by it. The `Assumption Not Checked` above was discharged by devops at the console
  immediately before the push (§16), which is where it was owed.
Stage: QA Phase 3 — release-tip verification
Commissioned-by: devops-hooks-013-3, relayed by steering-hooks-013-3
Date: 2026-08-25
---

# Release-Tip Verification — `b56570d`

**No ID.** A release-tip record is a join across plans and is named by release identifier, not by
plan ID (this stage's Phase 3 definition). It does **not** amend
`013-components-v2-editing-surfaces-qa.md`, whose verdicts stand for their own trees, and it does
not amend `release-4a7126b-tip-verification.md`, which stands for its own tip.

**VERDICT: RELEASE VERIFIED** at `b56570dfa916368e9942e671d594112750567923`, plain SHA — the tree is
committed and clean, so no content-identity fallback is required. **§6 is outstanding and is not
discharged by this verdict.**

---

## 0. The prior ruling, re-read at its own document and applied here

`release-4a7126b-tip-verification.md` §0 answered the question devops is asking again: does a
plan-level verdict whose `Verified-At` already equals the tip *constitute* the release-tip verdict?
**It ruled no**, on the ground that *"a coincidence of SHAs makes the subject identical; it does not
make the act identical."* I re-read that document rather than take its three distinguishing facts
from any relay, and the ruling applies here **a fortiori**, because the plan-level verdict at
`b56570d` is narrower than the one at `4a7126b` was: it is the **M10 gate pass** (§V.15–§V.17),
scoped to M10's four criteria, plus this session's **criteria re-anchor** (§V.34).

**What this document establishes that no plan-level verdict at `b56570d` contains:**

| Release fact | In the plan-level `b56570d` verdict? | Established here |
|---|---|---|
| **Production build** at the tip | **No** | `✓ Compiled successfully in 10.2s`, **exit 0**, §2 |
| Both `tsc` projects at the tip, as the shipped `typecheck` script now defines them | No — the plan verifies the criterion, not the release | **exit 0**, 0 `error TS`, §2 |
| The **release delta** `2d90e8a..b56570d` enumerated, and its production files mapped to covering tests | No — a plan verifies its own milestones, not a range | §4 |
| **Combination risk** across what the tip bundles | No — out of scope for a plan | §3, and **it is not empty this time** |
| **Config and dependency delta** — what changes about the build and the suite themselves | No | §5 |
| Assembly and remote state re-derived at the release act | No | §1 |

**Devops was right to refuse to infer this**, and right that its own reproduction is not a verdict.
Nothing devops measured is adopted below; every number was produced by this pass.

---

## 1. Anchor and assembly — re-derived here, adopted from nobody

    HEAD (chain/013-rider-2)          b56570dfa916368e9942e671d594112750567923
    working tree                      clean  (git status --porcelain → 0 bytes)
    master (local)                    2d90e8a60270740b59b4768a68cf3f67641e4345
    origin/master (tracking ref)      2d90e8a…
    git ls-remote origin master       2d90e8a…      ← the remote itself, not a tracking ref
    ls-remote refs/heads/chain/013-rider-2   0 lines returned — branch ABSENT at the remote
    merge-base(master, HEAD)          2d90e8a…  == master, so NO divergence
    merge-base --is-ancestor          TRUE
    rev-list --count master..HEAD     3
    rev-list --count HEAD..master     0

**There is no assembly step.** Integration is a fast-forward, so the assembled release tip is
byte-identical to `b56570d` and this verdict anchors there directly. **No ref was moved and no
branch was switched to establish this** — the tree rides the chain branch and switching it has two
owners, neither of them QA.

**Range `2d90e8a..b56570d` = 3 commits, 21 files** (`--shortstat`: *21 files changed, 629
insertions(+), 119 deletions(-)*).

| Commit | Subject | Files | Production files |
|---|---|---|---|
| `368f932` | Rider 2 (D47–D50): M9-d/a/b/e/f/g partial — tracked files | 16 | **6** |
| `e1d9b2b` | Rider 2 (D47–D50): M9-d/a/f new test files | 4 | 0 |
| `b56570d` | M10 (D52): arm the CR24-2 guard, test-only | 2 | 0 |

**`368f932` is the only commit carrying production change**, and the other two subjects' *"test
files"* / *"test-only"* claims are **verified from their own `--numstat`, not read off the subject
line**: `e1d9b2b` is three new spec files plus `tsconfig.test.json`; `b56570d` is two spec files.

> **Measurement discipline.** Every count here comes from an instrument that computes before the
> output filter — `--numstat`, `--shortstat`, `rev-list --count`, `grep -rc` — or from a redirect
> to a file. No count was taken through a pipe.

---

## 2. Gate facts

**Suite** — `npx vitest run`, at `b56570d`, cwd `/usr/local/bin/hooks/website`:

    Test Files  48 passed (48)
         Tests  627 passed (627)
    EXIT CODE: 0

**Build** — `pnpm build` at `b56570d`:

    ✓ Compiled successfully in 10.2s
    BUILD EXIT: 0
    grep -ci error → 0        grep -ci warn → 0
    10 app routes and 8 pages routes emitted, plus the middleware proxy

**Typecheck** — `pnpm typecheck` at `b56570d`, which after `368f932` runs **both** projects
(`tsc --noEmit && tsc --noEmit -p tsconfig.test.json`): **exit 0**, `grep -ci "error TS"` → **0**.
This is a release fact because **the script itself is part of the delta** (§5).

**The tree was clean before each of these and clean after** (`git status --porcelain` → 0 bytes,
re-checked following the build and the typecheck).

---

## 3. Combination risk — and unlike the `4a7126b` release, it is **not** vacuous

Phase 3 asks whether bundled plans still hold **in combination**. **The bundle is of one plan** —
all three commits are plan 013 (Rider 2's M9-* under D47–D50, and M10 under D52) — and `master` is a
strict ancestor, so nothing merges in. Plan 012's own chain lives in a **different repository**
(`project-utils` @ `chain/012-message-valid-field`) and is not part of this release.

**But one artifact crosses the plan boundary, and it was settled by execution rather than by
argument.** `368f932` modifies **`src/utils/__tests__/012-message-mode.test.ts`** (14 insertions, 12
deletions) — a 012-named spec, changed inside a 013 commit, while **012 is held whole**.

**What the change is**, read line by line: an import reorder (`import/first`, forced by the same
lint round) and five `as SupportedTopLevelComponent` casts plus one explicit array type, required
because M9-d brought the spec files under `tsc`. **No assertion, no fixture value and no expectation
changed.**

**"Behaviour-preserving" is a claim, so it was executed on both trees.** The `2d90e8a` blob of that
file was extracted to a scratch path and run beside the `b56570d` version in one vitest invocation:

    OLD(2d90e8a)  6 tests, all green   — identical test names
    NEW(b56570d)  6 tests, all green   — identical test names
    Test Files 2 passed (2)   Tests 12 passed (12)

The scratch copy was removed and the tree re-verified clean. **The 012-named spec discriminates
exactly what it discriminated before the release.**

**One documentation-accuracy observation, raised and deliberately not escalated.** D51's consequence
clause reads, unqualified in its first half, *"012's test files are **not** touched"*; the release
delta touches one. The parenthetical that follows scopes the sentence to the **declined 429-lint
cleanup option**, and on that reading there is no conflict. It is also not a new boundary crossing:
the file's own header already reads *"RE-ANCHORED FOR PLAN 013 (QA Phase 2, F-QA16), owner ruling
D16"* at `2d90e8a`, i.e. **013 has already edited this file in work that is live on `master`**.
**Not a breach, not a blocker, and not reopened** — recorded so that a future reader of D51 who meets
this delta is not left to resolve the tension alone.

---

## 4. Coverage of the release delta's production files — *reported, not fixed*

Six production files change, all in `368f932`. Three shared definitions are extracted and consumed
at seven call sites.

| Production file | What changed | Covering spec | Kind |
|---|---|---|---|
| `server/api/utils/shapes.ts` | new `describeDroppedComponentTypesNotice`; one inline-type `;`→`,` | `013-m9f-dropped-types-notice.test.ts` | **executed** — 3 assertions incl. the no-trailing-period one |
| `utils/formatMutationError.ts` | new `formatZodIssues`; `formatMutationError` delegates to it | `013-m9a-delimiter-collision.test.ts`, `013-owner-readable-mutation-errors-2026-08-25.test.ts` | **executed** |
| `utils/index.ts` | new `settledMode`; `computeLoadDiff` widened and re-based on it (F-QA31) | `013-fqa31-…test.ts`, `013-m2c-load-diff.test.ts`, `013-qa-cr24-6-independent-mode-oracle.test.ts` | **executed**, three specs |
| `_components/NewMessageJsonInput.tsx` | 2 call-site swaps (`formatZodIssues`, notice helper) | — | **call site not pinned** |
| `_components/NewMessageModal.tsx` | 1 call-site swap (notice helper) | — | **call site not pinned** |
| `m/[id]/_components/JsonModalBody.tsx` | 2 call-site swaps | — | **call site not pinned** |

### The class correction closed on its predicate — measured, not asserted

`grep -rc "split(' | ')"` over `src/app`, `src/utils`, `src/server` returns **one** row, and it is a
**comment inside the m9a spec itself**. **Zero live occurrences** of the old delimiter idiom remain
at any of the three sites the sweep named. The count was taken with `grep -rc`, which computes
before the output filter.

### What is not covered, named plainly

**No shipped spec pins any of the seven call sites.** Nothing asserts that
`NewMessageJsonInput.tsx` or `JsonModalBody.tsx` call `formatZodIssues`, and nothing asserts that
the three components render `describeDroppedComponentTypesNotice`. The **extracted functions** are
covered behaviourally; the **wiring to them** is covered by nothing — the same *"wired is not
installed"* shape this stage recorded at §4 of the `4a7126b` record.

**Why it does not fail the tip, and this is weaker than it was last release.** A regression here is a
*reversion to inline duplication*, whose rendered output at two of the three sites is byte-identical
to the helper's. The one site whose user-visible string genuinely changes is `JsonModalBody.tsx`,
which loses a drifted trailing full stop — and that outcome is determined entirely by the helper,
which **is** behaviourally pinned, including by an assertion that the period is absent. The residual
exposure is a silent re-divergence of three strings, which is a maintenance loss, not a user-facing
defect, and is the very class M9-f exists to have closed once.

---

## 5. Config and dependency delta — the column only a release pass looks at

| File | Change | Ships? |
|---|---|---|
| `package.json` | `typecheck` now runs both `tsc` projects | **yes** — script only; `build`, `start` and **all dependencies unchanged** |
| `.eslintrc.json` | parser `project` gains `./tsconfig.test.json` | lint-time only |
| `tsconfig.test.json` | **new** — test-only project | build-inert |
| `vitest.config.ts` | `'bot':` → `bot:` — quote style | **the `include` glob and `environment` are unchanged** |

**Two release-relevant negatives, both checked rather than assumed.** `pnpm-lock.yaml` **is not in
the 21-file delta**, and `package.json`'s dependency blocks are untouched — **this release changes no
runtime dependency**, so it carries no supply-chain delta. And the `vitest.config.ts` change does
**not** alter what the suite collects, so the 48/627 figure in §2 measures the same surface the
previous suite runs measured; a changed `include` glob would have silently redefined coverage, which
is why it was looked at.

---

## 6. Anything that would make this tip unsafe to serve

**Nothing technical.** Suite green, build clean, both `tsc` projects clean, no divergence, no
assembly, no dependency movement, one production commit whose extracted definitions are covered by
executed tests.

**The release posture improves rather than degrades.** Four commits reached `master` after the
`4a7126b` verdict — `8584b1e`, `d7c4836`, `e343927`, `2d90e8a` — and **none carries a release-tip
verdict**, which is why `2d90e8a`, the commit actually serving, is ungated. Merging `b56570d`
replaces an ungated serving tip with a verified one. That is a reason the release is safe to make; it
is **not** a reason to hurry it.

**Three process conditions, none of them mine to waive.**

1. **The blocking-condition register is not discharged by this verdict.** `uat`'s approval is
   conditional on eight `PRE` rows and, at this writing, **BC-4 is not terminal** — the owner has
   reported it and `uat` is terminalising. **This document certifies the tip; it does not close a
   single register row and must not be cited as having done so.**
2. **Nothing has shipped, and releasing requires a push.** `git ls-remote` returns **0 lines** for
   `chain/013-rider-2` — the branch does not exist at the remote. **Pushing requires the owner's
   explicit approval and is not granted by this verdict.**
3. **CR25-1 and CR25-2 remain OPEN residual** against the shipped oracle by standing ruling
   (*"record it, leave it"*). They are unchanged by this pass and are **not** re-litigated here.

---

## 7. One check deliberately not run, with its reason

**`pnpm lint` was not run.** Two reasons, and the first is the operative one: the script is
`eslint --fix .`, which **would modify the working tree** — on a shared tree at a verified tip, that
is a destructive act, and it would invalidate the very `Verified-At` this document anchors. The
second is that **D51 accepts the residue by ruling**, so a non-zero `lint` is not a defect and the
number would decide nothing. **This is a stated omission, not an oversight**; a future pass that
wants the figure should run `npx eslint . --max-warnings=0` **without** `--fix`.

---

## Assumption Not Checked

**This pass assumes that `master` will not move between this verdict and the merge, and it does not
and cannot test that.** Every anchor above — the fast-forward, the "no assembly step", the
byte-identity of the assembled tip to `b56570d` — rests on `origin/master` being `2d90e8a` **at the
moment the merge happens**, and this document establishes it only at the moment of writing
(`git ls-remote`, re-derived here). **Observable signature of falsity**: `git merge-base
--is-ancestor master HEAD` returns non-zero at release time, or `ls-remote` returns a SHA other than
`2d90e8a` — at which point the merge is no longer a fast-forward, an **assembly step exists that this
verdict never examined**, and the assembled tip is a tree nobody has verified. **Owned by devops**,
and closable in one command **immediately before the merge, not before the approval** — the check is
worthless if run early. It is named here rather than assumed because this release's entire
"no assembly" finding is exactly what it would falsify.

---

**Handing back to the `devops` agent.** **Release Verified at `b56570d`**, with §6 outstanding and
the pre-merge re-derivation above owed at the release act. **No release act follows from this
verdict**; the owner's explicit approval of the release is a separate gate and has not been given.

---

## Changelog

| Date | Who | What |
|---|---|---|
| 2026-08-25 | **steering** (steering-013-close [4190de]) | **CLOSED — `Status: Release Verified` -> `Released`, `Status-Detail` added, and the file moved to `qa/closed/`.** This is the verdict the 013 release act was gated on, and that act is made. **Executed, not judged**: QA's verdict was already terminal in substance and is not restated, re-derived or re-run here, and no finding or coverage gap above is closed by the move — CR25-1/CR25-2 stay OPEN residual. Release facts read at `deployment/closed/013-components-v2-editing-surfaces-deployment.md` §16 and at plan 013 rev 51; register state read at `uat/closed/013-components-v2-editing-surfaces-uat.md` rev 53. Closed on the owner's direction in session, 2026-08-25. Status value follows the fleet precedent set by `021-large-channel-count-servers-release-tip-qa.md` in the statbot Agent Output domain, the only prior closed release-tip document. |
