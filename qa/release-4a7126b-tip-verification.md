---
Release: 4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f
Verified-At: "4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f"
Status: Release Verified
Stage: QA Phase 3 — release-tip verification
Commissioned-by: devops-hooks-013
Date: 2026-08-25
---

# Release-Tip Verification — `4a7126b`

**No ID.** A release-tip record is a join across plans and is named by release identifier, not by
plan ID (this stage's Phase 3 definition). It does **not** amend `013-components-v2-editing-surfaces-qa.md`,
whose verdicts stand for their own trees.

**VERDICT: RELEASE VERIFIED** at `4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f`, plain SHA, no
content-identity fallback required — the tree is committed and clean.

---

## 0. The ruling devops asked for, and did not want inferred

**Question:** the plan-level document already reads `Verified-At: 4a7126b`, QA COMPLETE. Does that
verdict *already constitute* the release-tip verdict, since the tree has not moved?

**Ruling: no. Phase 3 required a distinct verifying act, and it was not redundant.** A coincidence
of SHAs makes the *subject* identical; it does not make the *act* identical. The plan-level pass was
**gate-scoped to the toast surfaces**. This pass produced three facts that verdict does not contain
and could not have contained:

| Fact | In the plan-level `4a7126b` verdict? | Established here |
|---|---|---|
| **Full** suite, all 40 files, at the tip | No — scoped run | **577/577 pass, exit 0** |
| Production build at the tip | No | **exit 0, compiled successfully** |
| Combination risk across bundled work | No — out of scope for a plan | Analysed, §3 |

**Devops was right to refuse to infer this.** Had the two been treated as equivalent, the release
would have shipped with no full-suite run and no build behind it — both of which are release facts,
not plan facts. Cite **this document** as the release-tip verdict.

---

## 1. Anchor and assembly — re-derived here, not adopted

Devops's figures were re-measured independently. All confirmed.

    master / origin/master           a151fb47a84d7de95124b412194873f7e84edf27
    git ls-remote origin master      a151fb4…  (the remote itself, not a tracking ref)
    chain/013-toast-vessel           4a7126bf8578b653ac7ae1cfe7cabdd609cdc21f
    merge-base(master, chain tip)    a151fb4…  == master, so NO divergence
    merge-base --is-ancestor         TRUE
    ls-remote refs/heads/chain/…     0 lines returned — branch ABSENT at the remote
    working tree                     clean (git status --porcelain empty)

**There is no assembly step.** Integration is a fast-forward, so the assembled release tip is
byte-identical to `4a7126b` and the verdict anchors there directly. No ref was moved and no branch
switched to establish this.

**Range `a151fb4..4a7126b` = 3 commits, 7 files** (git's own `--shortstat`: *7 files changed, 317
insertions(+), 12 deletions(-)*).

| Commit | Subject | Files | Non-test files |
|---|---|---|---|
| `abcf585` | fix(013) — toast vessel for permanent-state notices | 5 | **4** |
| `664e0c0` | test(013) — adopt QA's toast-vessel render instrument | 1 | 0 |
| `4a7126b` | test(013) — adopt QA's paste-surface render instrument | 1 | 0 |

**`abcf585` is the only commit carrying production change.** The other two are test-only.

> **Measurement note, third instance in this chain.** `git diff --name-only … | grep -c .` returned
> **8** against a true **7**. Settled with `--shortstat` (computes inside git) and by redirecting to
> a file and counting that. Counts here come only from pre-filter instruments.

---

## 2. Gate facts

**Suite** — `npx vitest run`, run at `4a7126b`, cwd `/usr/local/bin/hooks/website`:

    Test Files  40 passed (40)
         Tests  577 passed (577)
      Duration  2.51s
    EXIT CODE: 0

**Build** — `pnpm build` at `4a7126b`: `✓ Compiled successfully in 8.4s`, **BUILD EXIT: 0**, zero
lines matching `error` (`grep -ci error` → 0). All 10 app routes and 8 pages routes emitted.
*Re-derived here; devops's stood-down agent reported the same, and that report was not adopted.*

---

## 3. Combination risk — the clause that is the whole reason Phase 3 exists

Phase 3 asks whether bundled plans **still hold in combination**, because a plan that passes alone
can fail beside another. **That clause has no work to do in this release, and the reason is stated
rather than assumed:** only one lineage is shipping. `master` is a strict ancestor of the tip,
nothing merges in, and the other remote branches (`backup`, `external-message-api`, `redesign`,
`regex-refactor`) are unrelated and not part of this release. **The bundle is of one.**

**This is a finding, not a formality.** It means the pass reduces to verifying the tip itself, and
this document says so explicitly rather than implying a combination check was performed over a set.

---

## 4. Coverage of the 4 non-test files by the 3 test files — *reported, not fixed*

**Two of four have behavioural coverage. Two are covered by source-text assertions only.**

| Non-test file | Covering test | Kind | Verdict |
|---|---|---|---|
| `_layout/CodeMessageNotice.tsx` | `013-qa-toast-vessel-render.test.ts` | **executed** — renders/clears/styles | **COVERED** |
| `_components/NewMessageJsonInput.tsx` | `013-qa-paste-surface-render.test.ts` | **executed** — renders/suppresses/clears | **COVERED** |
| `m/[id]/layout.tsx` | `013-owner-toast-vessel…test.ts` | `readFileSync` + `toContain('<CodeMessageNotice />')` | **TEXT-PINNED ONLY** |
| `providers/MessageProvider/index.tsx` | `013-owner-toast-vessel…test.ts` | 3 × `readFileSync` + `toContain` | **TEXT-PINNED ONLY** |

### Uncovered behaviour, named

**(a) The mount is never executed.** `layout.tsx`'s change is two lines — an import and
`<CodeMessageNotice />` inside `<MessageProvider>`. Nothing runs it. This is precisely **"wired is
not installed"**: the notice component is proven to render correctly *in isolation*, and separately
the layout source is proven to *contain the tag*. Neither proves the notice appears on the page.
Between them sits the async server component and the real provider tree, which no test enters.

**(b) The producer is never executed.** The `MessageProvider` effect that computes the notice string
from `codeMessage.droppedComponentTypes` and — the new behaviour — **clears it to `null`** when the
fact goes away, has no executing test. The one render test that names the provider **`vi.mock`s it
out** (correctly, to isolate the vessel), so the real effect runs nowhere in the 40-file suite.
Confirmed by sweep: `codeMessageDroppedNotice` appears in 4 files, and no test executes the real
provider.

### Why this does not fail the tip

**The gap is known, registered, and owned — it is not a discovery.** It is exactly what **BC-18** and
**BC-19** exist to settle, and both are **open `PRE` rows assigned to the owner**. A text-pinned
mount was raised at plan level as **F-QA23**'s defect class and closed *for the two vessel
components*; it was never claimed closed for the mount or the producer. Nothing here is worsened by
the release, because there is no assembly.

**But the corollary matters more than the finding**, and it is the reason U-5 below is load-bearing.

---

## 5. Anything that would make this tip unsafe to serve

**Nothing technical.** Suite green, build clean, no divergence, no assembly, one production commit
whose behavioural surface is covered by executed tests.

**One process condition, which is not mine to waive.**

**Nothing has shipped.** `git ls-remote origin master` → `a151fb4`; the chain branch returns **0
lines** — it does not exist at the remote. This was re-derived here, and it corrects a real error in
my own plan-level document (**U-5**, raised by `uat-hooks-013-3`): prose there read *"with `4a7126b`
shipped"* and *"since the owner has shipped."* **A decision to ship is not a shipment.** Corrected in
place in that document; the reasoning it supported is untouched, only the false premise.

**The consequence, stated for devops:** rev 13's UAT approval is conditional on **BC-18/BC-19
preceding the release act**. Because nothing has shipped, that condition **has not been overtaken** —
those observations remain executable **today, before anything is cut, in the order rev 13 wrote
them**, from a local dev server. My own finding that these rows *do not expire at deploy* is what
keeps the window open.

**This verdict certifies the tip. It does not discharge BC-18/BC-19, and must not be cited as having
done so.** Whether to release ahead of them is the owner's call, already made once on the record;
whether that call still stands now that the premise ("already shipped") turns out to be false is a
question for the owner, not for this gate.

**Releasing requires a push** — the branch is absent at the remote. **Pushing requires the owner's
explicit approval** and is not granted by this verdict.

---

## Assumption Not Checked

**This pass assumes the 40-file suite's own fixtures are non-vacuous outside the three 013 files,
and does not test it.** Only the 013 instruments were mutation-checked in this chain; the other 37
files were executed, never mutated. **Falsity signature:** a green suite at a tip carrying a real
regression in a pre-existing surface — the same vacuity class as F-QA23, which was found only
because it was deliberately mutated. **Owner of closing it:** not this release. It is a standing
suite-quality question for the retrospective agent, and is recorded here so it is routed rather than
shelved. It is **not** a reason to hold `4a7126b`: the 37 files are byte-identical to live `a151fb4`,
so whatever their quality, this release does not change it.

---

**Handing back to `devops-hooks-013`.** Release Verified at `4a7126b`, with §5 outstanding.
