---
ID: n/a
Origin: "release chain/fix-message-not-found -> website master 6f76c6de2daab590777c047e9439cf5f5a9ed215 -> f4baebb000ac6fa31714108c9d2bf261dc3de4a4 (fast-forward)"
UUID: 291f1656
Verified-At: "f4baebb — repos=website; the tip's tree d1aacb53 is the Phase 2 Verified-At tree (qa/fix-message-not-found-qa.md, c4c2afc)"
Status: Release Verified
Status-Detail: "Release-tip verdict for website master 6f76c6d -> f4baebb. Steps 1b and 2 ran. Of 29 open handoffs, 1 names a website release (the lockfile pin check), which ran and holds; 1 fires on every QA run and leaves nothing for QA. There is no gated time-based set."
Phase: 3
---

# QA Release-Tip Verification: chain/fix-message-not-found → website f4baebb

**Release identifier**: `chain/fix-message-not-found`, website `f4baebb000ac6fa31714108c9d2bf261dc3de4a4`, onto `origin/master` `6f76c6d`
(a fast-forward).

**Requested by**: `devops-fix-message-not-found`, by SendMessage after the Phase 2 record `c4c2afc`. Devops's packaging capture (`next build`
exit 0 at the tip) is in `verification/fix-message-not-found/devops/`, which devops commits with its readiness document.

**Scope** (qa-phase-3.md, first line). Devops records the tip's tree as the Phase 2 `Verified-At` tree. I re-derived that:
- `git rev-parse f4baebb^{tree}` = `d1aacb53212e200019e58993656275146c7e24a1`.
- `master` = `origin/master` = `6f76c6d`.
- `git merge-base --is-ancestor 6f76c6d f4baebb` exits 0, so the push is a fast-forward.
- `git diff --name-only 6f76c6d f4baebb` lists 7 paths, all under `src/`.

So only step 1b and step 2's gated time-based set run here. Steps 3 and 5 have nothing to compare: one chain is bundled, and the tree is
the one Phase 2 ran its suite on (2303/2303, exit 0, `verification/fix-message-not-found/qa/raw/suite-f4baebb.json`). The Phase 2
document is not reopened.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-21T07:46 | devops-fix-message-not-found, release request | Phase 3 at the release tip `f4baebb` | Phase 3: Release Verified. Of 29 open handoffs, 1 names a website release: the pin check ran and holds. 1 fires on every QA run and leaves nothing for QA. No gated time-based set exists. |

## Step 1b — open handoffs whose Review-Trigger names this verdict or a website production push

The record has no `tools/open-handoff-trigger-sweep.py`.

**Instrument.** I wrote `verification/fix-message-not-found/qa/phase-3/open-handoff-sweep.py`, committed with this record.
- It reads every `handoff/*.md` outside `closed/`.
- It joins each frontmatter `Review-Trigger`, folded lines included.
- It keeps those whose `Status` is `Open`, and pre-filters on
  `website|hooks\.gg|vercel|release|deploy|push|master|production|fix-message-not-found|getOne|message page|/message/m` (case-insensitive).

**Count.** Output is in `…/phase-3/open-handoff-sweep.out`: 29 `Open`, 19 matching the pre-filter. The cross-check,
`grep -l '^Status: *"\?Open' handoff/*.md`, also gives 29. The 10 that miss the pre-filter name no website, release, deploy or push
event, so none can name this push. The pre-filter is not the decision: I judged each of the 19 against "names this verdict, or a
production push of website".

**Named by the release.** One handoff:

| Handoff | Trigger limb | Run / disposition |
|---|---|---|
| `handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md` | "before the next website release whose package.json or lockfile differs from d1bb9b0's" | **Ran.** `package.json` and `pnpm-lock.yaml` at `f4baebb` are identical to `6f76c6d` (`git diff --quiet`, exit 0), and they differ from `d1bb9b0` (exit 1). The tip lockfile still holds `paracord` tarball `3f203086…` and `project-utils` `749606d0…` (`grep -c` 4 and 4; negative control `1b7cadb`, 0). This release moves neither pin. The handoff stays `Open` for its owning stage, devops, since its edit limb is unfired. Capture: `verification/fix-message-not-found/qa/phase-3/git-deps-pin-check.txt`. |

**Named by a QA run** ("when QA next runs in this record"):

| Handoff | Disposition |
|---|---|
| `handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` | Fired, nothing for QA. Item 1 was discharged on 2026-11-11. Items 2 and 3 are the analyst's and the record vocabulary's. The re-routing request is already in `INBOX.md` from 018's QA. |

**Fired after the push, or by this chain's opening or closure, not by this verdict.** These are listed so devops and steering see them.

| Handoff | Disposition |
|---|---|
| `handoff/fix-message-not-found-post-deploy-2026-11-21.md` | This chain's carrier for B-1, created by devops. Its trigger is the production deploy itself, so it fires after the push and is QA's to read then. |
| `handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md`, `handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md`, `handoff/deleted-message-url-serves-blank-editor-2026-11-20.md` | The chain's three sources. Their edit limbs fired at the fix. The chain's closure discharges all three (brief common part, "Sources"); that closure is steering's or devops's. |
| `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md`, `handoff/pusher-message-update-channels-are-public-2026-11-19.md` | Limb "when the next chain touching website access control opens": a chain-opening event, steering's, and not this push. Their edit limbs name `src/pages/api/cron.ts`, `src/server/api/routers/shared.ts` and `src/providers/MessageProvider/usePusher.ts`, none of them in the release's 7 paths. |
| `handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md` | Not fired, in its sense. Its limb "a production request-level read of /api/trpc status codes" asks for a read of other callers' requests. My Phase 2 reads (B-1's minting, 07:35Z) were this session's own single-call `getOne` fetches and could not see another caller. If devops's post-deploy read takes `/api/trpc` status codes from Vercel's request log, that read fires it. |

**The other 10 of the 19.** None names this verdict or a website push. Each names one of the following:
- An edit to a path outside the release's 7 paths. `keepMessageNumbers`/`hydratedAuthCallback`; `leaveWithoutAlert.ts`, `messageDrafts.ts`, `withLocalStorage.ts`, `StyledLink.tsx`; `src/pages/api/**`; `[trpc].ts`, `middleware.ts`, `Redirects/Server.tsx`, a `package.json` dependency entry.
- A scoping event.
- A user report.
- 017's "after both releases are live".
- preview-image-generator: two handoffs, another repository.

One looks close but is not: `message-init-cached-edits-lost-2026-08-27.md` names "a new test for MessageProvider's route-0 initialization". This chain's tests load `/message/m/<number>`, never route `0`.

## Step 2 — gated time-based set

None exists in this workspace. The Test Conventions in `agent-output/CLAUDE.md` name no gated location, and `website/vitest.config.ts`
has no gate. `grep -rln 'runIf\|skipIf' website/src` matches nothing. Nothing ran under this step.

## Verdict

**Release Verified** at website `f4baebb` (tree `d1aacb53`). The Phase 2 PASS at this same tree stands, its suite having run there. This
record adds the release-scoped sweep, which names one owed check; that check ran and holds.

## Assumption Not Checked

Phase 3: This pass assumes Vercel builds this push with a frozen install, so that the lockfile pins checked above are what production
runs, and does not test it. Falsity signature: the Vercel deployment's build log shows `pnpm install` resolving `paracord` to a commit
other than `3f20308`, or `project-utils` to one other than `749606d`. Owner: devops, from the deployment's build log at release.
