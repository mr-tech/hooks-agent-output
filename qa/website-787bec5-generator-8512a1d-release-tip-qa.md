---
ID: n/a
Origin: "release chain/017-existing-items-backlog -> website 787bec5627702d2881b826e596ec2b8f8853c4fa, preview-image-generator 8512a1d003af7fdbce56b85ef27218dd885becd1"
UUID: b53c1bae
Verified-At: "787bec5,8512a1d — repos=website,preview-image-generator; website tree e4f7c052, a fast-forward of origin/master 1ad625e; generator unchanged from the plan-level Verified-At, a fast-forward of origin/prod 8de2b53"
Status: Release Verified
Status-Detail: "Release Verified at website 787bec5 and generator 8512a1d. QAF-29 and QAF-30 resolved by the test-only fix; QAF-28 resolved by devops's G9 limb 2. Supersedes the failed verdict at 7293a35 (qa/website-7293a35-generator-8512a1d-release-tip-qa.md)."
Phase: 3
---

# QA Release-Tip Verification: chain/017-existing-items-backlog → website 787bec5, generator 8512a1d

**Release identifier**: `chain/017-existing-items-backlog` (website `787bec5627702d2881b826e596ec2b8f8853c4fa` onto
`origin/master` `1ad625e`; preview-image-generator `8512a1d003af7fdbce56b85ef27218dd885becd1` onto `origin/prod` `8de2b53`).
**Bundled**: one plan, 017. The plan-level verdict, `qa/closed/017-existing-items-backlog-qa.md` (QA Complete at `7293a35`,
`8512a1d`), is not reopened (qa-phase-3.md step 1).
**Predecessor**: `qa/website-7293a35-generator-8512a1d-release-tip-qa.md` (Release Verification Failed, `4914aaa`). This pass
re-runs every step at the new tip; it carries over only what the tip does not move, each named below with the check that
shows it unmoved.
**Requested by**: `devops-hooks-017` (message after agent-output `04a3c51`). **Fix**: the release-tip-fix implementation
document (agent-output `a05505e`) and its code review, APPROVED at `787bec5` (`a081c89`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-19T20:08 | qa-hooks-017 (devops-hooks-017's request at website 787bec5; code review `a081c89`) | Phase 3 at the new tip. Fresh install, suite 1857 of 1857 exit 0, typecheck exit 0. The per-case comparison against `7293a35` moves exactly 4 added cases in the 3 fix files. 0 production lines differ. The 4 survivors are re-run at the tip, 4 of 4 killed, each by one new case. M7-b holds. Step 1b's sweep is identical. G9 limb 2 is read. QAF-28, QAF-29, QAF-30 resolved. **Release Verified.** |

## The tip, re-derived

| Read | Result |
|---|---|
| `git -C website rev-parse chain/017-existing-items-backlog`, and `787bec5^{tree}` | `787bec5627702d2881b826e596ec2b8f8853c4fa`; tree `e4f7c05269b7804e543f41e6a84ae36c2e183828` |
| `git ls-remote origin master` (website); `git ls-remote origin prod` (generator) | `1ad625e…`; `8de2b53…` |
| `merge-base --is-ancestor`: `1ad625e 787bec5`, `7293a35 787bec5`, generator `8de2b53 8512a1d` | 0, 0, 0 |
| Generator `chain/017-existing-items-backlog` | `8512a1d…`, unchanged |
| `git log 7293a35..787bec5` | 2 commits: `391c88b` (QAF-29), `787bec5` (QAF-30) |
| `git diff --numstat 7293a35 787bec5` | 3 test files, +62 −2 |
| The same with `':!*__tests__*'` (`qa-phase3b/production-diff-7293a35-787bec5.txt`) | **0 lines: no production path differs** |

## Step 1b — open-handoff sweep

The same command as the predecessor, `python3 -I verification/017/qa-phase3/open-handoff-sweep.py handoff`
(`qa-phase3b/open-handoff-sweep.out`), gives 22 handoffs, 22 `Open`. Its output is byte-identical to the predecessor's
(`cmp` exit 0). So the predicate's members and their dispositions stand as recorded there, with one change: the drain
handoff's owed read is now runbook row G10 with its fields named (`deployment/017-existing-items-backlog-deployment.md`, the
G10 row).

## Step 2 — the suite at the assembled tip, and the gated time-based set

Instruments in `verification/017/qa-phase3b/`. Export `git archive 787bec5`, deleted at run end.

| Command | Result |
|---|---|
| `unshare -rn pnpm install --frozen-lockfile --offline` | exit 0; installed `lock.yaml` `cmp` against the shared install: exit 0 |
| `unshare -rn npx vitest run --reporter=default --reporter=json` | **1857 of 1857, 144 files, exit 0** (`suite-787bec5.{json,out,exit}`) |
| `pnpm run typecheck` (both programs; Next's generated `next-env.d.ts` and `.next/types` copied from the shared tree as before, hash in `typecheck-generated-inputs.txt`) | exit 0 |
| Gated set: `vitest.config.ts` unchanged over `7293a35..787bec5` (`git diff --quiet`); the skip/env-gate `git grep -c` over the tip's tests | 0 files (exit 1). **No gated time-based set exists**, so none runs. |

## Step 3 — the bundled plans in combination, and what this tip moves

One plan is bundled, so no interaction exists to compare. What this step can compare is the tip against the predecessor's
tree. Its suite run per file and per case (title, status), `suite-vs-7293a35.out`:
- 144 and 144 files, 0 only in either;
- 0 cases removed, 0 changed status;
- 4 added, all passing, all in the 3 fix files:
  - `ImageUploader.enter-scope` "ImageUploader, the body inside the panel keeps its URL field and its footer in one wrapper that takes no box of its own, so the panel's layout spaces them";
  - `WarningDialog.enter-scope` "WarningDialog and ConfirmationDialog, the body inside the panel", its two `it.each` cases (WarningDialog, ConfirmationDialog);
  - `MessageProvider.stored-draft` "MessageProvider, a share code opened at route 0 becomes this tab's route-0 draft, shown when route 0 is opened again without the code".

The predecessor's comparison instrument and its `60252be` positive control are unchanged.

With 0 production lines moved, these hold from the predecessor without re-derivation: the effort-final sweep, the
call-deletion set's 53 kills, the generator's 3 of 3, and the fresh-install check. The lockfile is unchanged, and this
pass's install matches the shared one.

### The survivors this round closes

qa.md: a round with no production change re-runs only the survivors it closes. The set is
`qa-phase3b/survivor-mutants.json` (blob `23fc3b6`, committed at `06c87fb` before the run): the 4 rows of the
predecessor's `web-call-deletion-mutants.json` with these ids. Their 4 target files are unchanged over
`7293a35..787bec5` (`git diff --quiet`).

`mutation-run.py --sha 787bec5 --dep node_modules --timeout 300 -- unshare -rn npx vitest run` (runner `b26916e`), through a
`general-purpose` helper. Kill table `survivor-sweep/mutation-table-787bec5…-20261119T200709Z-p3083232.json`. Control 1857,
exit 0.

| Mutant | Outcome | Killed by (`failing_titles`, the only one) |
|---|---|---|
| `index.tsx:153:stmt` | KILLED, count checked | the share-code case above |
| `ConfirmationDialog.tsx:17:attr:2` | KILLED, count checked | the `ConfirmationDialog` `it.each` case |
| `WarningDialog.tsx:23:attr:2` | KILLED, count checked | the `WarningDialog` `it.each` case |
| `ImageUploader.tsx:96:attr:2` | KILLED, count checked | the `ImageUploader` body case |

**4 of 4 KILLED**, each by exactly the case written for it. Code review's own five mutants (`a081c89`) are a second,
differently shaped set: the effect writing the wrong data, `contents`→`flex flex-col`, the footer moved out, and the class
dropped. All five were killed under a control of 66.

### Audit of the fix tests

- **Conventions.** Both basenames are existing positive-form files. No title or comment matches the ID-token class. The titles
  are spec-form, and every expectation is a literal (axiom E). It is extended, not new, per "Before adding a test".
- **Placement.** The `ConfirmationDialog` case sits in `WarningDialog.enter-scope.test.tsx`. No `ConfirmationDialog` test file
  exists (`git ls-tree` at `787bec5`), and that file already mounts `ConfirmationDialog` for M8's combined case, so it is the
  existing test on the surface. Not a finding.
- **QAF-29's case** reaches the property through the real read path: a second mount at route 0 without the code, reading
  what the route-0 effect shows.
- **QAF-30's cases** find the wrapper structurally (Cancel's parent's parent). So they also assert that the footer sits
  inside the wrapper, beside the `contents` class.
- **Stated limit, from code review.** A class list that keeps `contents` and adds a box-forming class passes the cases. jsdom
  computes no Tailwind layout; the rendered gap is a browser look, which code review routed to UAT.

### M7-b at the tip

The lint ran in the export: 485 files, 314 errors, 365 warnings (the same totals as at `7293a35`). Over
`git diff --name-status -M 1ad625e 787bec5`, `m7b-check.py` (blob `2608d4e`) against `entry/lint-1ad625e/nofix.json` reads
**60 lintable changed files (M 25, A 31, R 4); 0 violations**. With `--plant`: plants found 3 of 3
(`m7b-check{,-plant}-787bec5.out`). This agrees with code review's own M7-b read at `787bec5`.

## Findings

All three of the predecessor's findings are resolved. None are new.

- **QAF-29 MEDIUM — RESOLVED.** The share-code route-0 write is asserted, and the case was seen red under its mutant at the tip (above).
- **QAF-30 MEDIUM — RESOLVED.** The `contents` wrapper is asserted in all three dialogs, each seen red under its mutant. The rendered spacing is a stated limit, routed by code review to UAT.
- **QAF-28 LOW — RESOLVED** by devops's G9 limb 2, `verification/017/devops/read-generator-deployed-ref.sh`, read below.

## G9 limb 2 against B-11 (devops's ask)

The command reads `/usr/local/bin/hooks-image-preview-generator/deployed/prod/.git/refs/heads/prod` over `claude-ro` and
compares it with the release SHA. **It reads what the containment limb needs.**
- `.github/deploy.sh` at `8512a1d` runs `rm -rf …/deployed/$ENV`, then `cp -r ./ …/deployed/$ENV` (the Actions checkout,
  `.git` included), then `pm2 startOrReload` from that directory. The ref therefore cannot survive from an earlier deploy: a
  copy that did not happen reads unreadable (exit 3) or the old SHA (exit 1), never a stale match.
- The reload follows the copy. Limb 1 (a start line after the push) together with limb 2 (the copied ref equals `8512a1d`)
  is a start of the release's tree. A crash-restart alone, which QAF-28 named, passes limb 1 and fails limb 2.
- The live baseline discriminates both ways (`devops/read-generator-deployed-ref-live-baseline.txt`, 19:54Z): current prod
  `8de2b53` reads exit 0, the release SHA `8512a1d` reads exit 1, and the stubs give exit 3 and exit 0. The path and the
  read are therefore live on the host, not assumed.
- Residue, not a finding: `deploy.sh` has no `set -e`. A `cp` that fails part-way after copying `.git` would reload a partial
  tree with the new ref. That shows as a failing process, which B-6 to B-9 and the drain read (G10) observe; the limb alone
  does not.

## Verdict

**Release Verified** at website `787bec5` (tree `e4f7c052`) and generator `8512a1d`, for `release-move.js --qa-record`.
- Step 1b: 22 open handoffs, the same 3 members, dispositioned in the predecessor and unchanged.
- Step 2: suite 1857 of 1857 exit 0 and typecheck exit 0 in a fresh frozen-lockfile install; no gated set exists.
- Step 3: one plan, no interaction. The tip moves only the fix's 4 test cases and no production line.
- Carried items: the fresh install matches the lockfile; M7-b holds at the tip; the call-deletion set is closed (53 + 4
  website kills of 58 mutants; the last survivor, `previewImage.ts:124`, is residue with no criterion member, as
  dispositioned in the predecessor), and the generator's 3 of 3 is unmoved.
- QAF-28, QAF-29 and QAF-30 are resolved.

**This verdict is for this tree.** Any later commit on either chain branch expires it. The architect's delta read of the
test-only diff is owed separately (devops's message). UAT owns the browser look at the three dialogs' gap, routed by code
review.

## Assumption Not Checked

This pass assumes the Vercel production build of `787bec5` treats the dependency build scripts pnpm 10 ignored here (12,
including `@prisma/client`, `prisma`, `sharp` and `esbuild`; `fresh-install.out`) as the current production build does, and
does not test it.
- **Signature if false.** The deploy fails at build, or a Prisma or image path fails at runtime after deploy.
- **Owner.** devops. Its packaging build at `787bec5` (install and build exit 0, `04a3c51`) and W5's ERROR exit cover the
  build half. The runtime half is B-11's and B-6's.

Named again in the hand-off.

## Process record

- Export `p3b/web-787bec5` and the helper's `p3b/web-work` under this session's scratchpad, deleted at run end. The helper's
  `pgrep` found nothing of the run left.
- Handed off: to `devops-hooks-017`, the path of this record for `--qa-record`, by SendMessage.
