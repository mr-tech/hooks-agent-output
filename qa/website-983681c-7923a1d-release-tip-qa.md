---
ID: n/a
Origin: "release chain/fix-message-page-header-decode -> website master 983681ca6cd7cbacd0796ed093e094057ad7f9be -> 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe (fast-forward)"
UUID: c8a9f0ca
Verified-At: "7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe — repos=website; tree 7ff130dfadb7515514d445717c79af0e3cccc768; suite, typecheck and the red/green pair run here in git-archive exports"
Status: Release Verified
Status-Detail: "Release Verified at website 7923a1d for devops's move of master 983681c -> 7923a1d. A change to any blob of that tree expires it."
Phase: 3
---

# QA Release-Tip Verification: chain/fix-message-page-header-decode → website master 7923a1d

**Release identifier**: website `master` `983681ca6cd7cbacd0796ed093e094057ad7f9be` → `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`.
This is a fast-forward of one commit, with no merge commit (`deployment/fix-message-page-header-decode-deployment.md`, "Release
Identifier").

**Bundled**: one chain, the fixer chain `fix-message-page-header-decode` (no plan). Its fixer document is
`implementation/closed/fix-message-page-header-decode-implementation.md` (UUID `c8a9f0ca`, `Handoff-At: 7923a1d`). The chain's stage set
has **no QA Phase 2**: 1 production line was added, which is under the 20-line threshold (`steering/website-deps-review-rulings.md`, block
"2026-11-20T02:03Z"). So no Phase 2 tree exists for this pass to inherit, and step 2 runs in full on the tip.

**Requested by**: `devops-hooks-fix-message-page-header-decode`, through steering. The brief is
`steering/fix-message-page-header-decode-brief-qa.md`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-20T02:32 | qa-hooks-fix-message-page-header-decode (devops's request through steering, website 7923a1d) | Phase 3. The tip is a one-commit fast-forward over origin `master`, so nothing was assembled. The suite, typecheck and the fix's red/green pair were re-run on the tip in network-isolated exports: 1913/1913 with exit 0, typecheck 0 on both trees, red 4/4 at base, green 4/4 at the tip. Step 1b: 29 open handoffs, 13 pattern matches, 2 members, each dispositioned. There is no gated set. **Release Verified.** |

## The tip, re-derived

Capture: `verification/fix-message-page-header-decode/qa/phase3/tip-and-gated-set.txt`, read at 2026-11-20T02:31Z.

| Read | Result |
|---|---|
| `git -C website rev-parse 7923a1d^ 7923a1d^{tree}` | parent `983681ca6cd7cbacd0796ed093e094057ad7f9be`; tree `7ff130dfadb7515514d445717c79af0e3cccc768` |
| `git -C website ls-remote origin refs/heads/master` | `983681ca6cd7cbacd0796ed093e094057ad7f9be`, the tip's parent |
| `git -C website merge-base --is-ancestor 983681c 7923a1d` | exit 0. `rev-list --count 983681c..7923a1d` = 1 |
| `git -C website rev-parse HEAD chain/fix-message-page-header-decode` | both `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe` |

The tree that ships is the chain commit's own tree. Its one parent is what origin `master` serves now, so there is no merge result to
construct.

## Prior evidence: re-derived, not inherited

Instrument: the code reviewer's `verification/fix-message-page-header-decode/code-review/run.sh`, record commit `d67e7d5`, blob
`34496dc73b7e8fdc6fe22b310da1f4d94fef9f51`. It was unchanged in the tree, and a copy was executed. It was run as follows:

    systemd-run --user --scope -p RuntimeMaxSec=2400 -p MemoryMax=8G -p TasksMax=2000 unshare -rn bash run-cr.sh <scratch>/p3

What the script does:
- It makes two `git archive` exports: base `983681c` with the fix's test file added, and fix `7923a1d`.
- It installs each with `pnpm install --frozen-lockfile --offline`.
- It runs network-isolated from the first run.
- It never touches the shared tree.

The export blobs were checked against `git rev-parse 7923a1d:<path>` for `Providers.tsx`, `package.json` and `pnpm-lock.yaml`. All 3 are
equal. Captures are in `verification/fix-message-page-header-decode/qa/phase3/`, where export paths are rewritten to `<export>` in the
`.txt` files. The exports were deleted after the run.

| Check | Tree | Exit | Counters | Capture |
|---|---|---|---|---|
| install, `--frozen-lockfile --offline` | base, fix | 0, 0 | — | `base-install.txt`, `fix-install.txt` |
| `Providers.request-headers.test.ts` (red) | base `983681c` + the fix's test | 1 | 4 failed of 4. Two are `URIError: URI malformed` (`grep -c` = 2); two received the outbound code URL, including `/api/messages/codes/../auth/session` | `red-run.txt` |
| same file (green) | tip `7923a1d` | 0 | 4 passed of 4 | `green-run.txt` |
| whole suite, `vitest run --reporter=json` | tip | **0** | `numTotalTests` 1913, passed 1913, failed 0, pending 0, todo 0, `success` true; 149 `testResults` entries | `suite-fix.json`, `suite-fix-stdout.txt` |
| executed files vs. the tree, by path membership | tip | — | `testResults` names (149) against `git ls-tree -r --name-only 7923a1d` filtered by `\.test\.tsx?$` (149); `comm -3` is empty (0 bytes) | `files-run.txt`, `files-tree.txt`, `files-diff.txt` |
| `pnpm run typecheck` (both tsc programs) | base, tip | 0, 0 | — (with the git-ignored `next-env.d.ts` copied in, as the script does) | `typecheck-base.txt`, `typecheck-fix.txt` |
| `sharp` as Next.js resolves it | tip | — | next 16.1.6 `optionalDependencies.sharp` `^0.34.4` resolves to `.pnpm/sharp@0.34.5` | `next-sharp-resolve.txt` |

The code review's figures (red 4/4, suite 1913/1913 exit 0, typecheck 0) reproduce exactly. A production `next build` of the tip was run
by devops (`devops/packaging-build-7923a1d.txt`, exit 0) and by security on both trees. This pass did not repeat it.

## Step 1b: open-handoff sweep

The record has no `tools/open-handoff-trigger-sweep.py`. The enumerator is the earlier Phase 3 script,
`verification/fix-personal-message-access/qa/phase3/open-handoff-triggers.py` (record `fd38b6f`, blob
`b035c584c54891c71ce9c3344f9afeb99c289902`). It lists every `handoff/*.md` outside `closed/` with `Status: Open` and its whole
`Review-Trigger`, with folded lines joined. It was run as:

    python3 -I verification/fix-personal-message-access/qa/phase3/open-handoff-triggers.py . 'website|release-tip|phase 3|fix-message-page-header-decode|header-decode|hooks\.gg|vercel|master|query-string|sanitize|sharp|providers'

Output: `verification/fix-message-page-header-decode/qa/phase3/open-handoff-triggers.tsv`.
- **29 open handoffs.** That is every `handoff/*.md` outside `closed/`.
- **13 match** the pattern, which is deliberately wider than the predicate. Membership is judged row by row.
- I also searched the 16 non-matches for `release|deploy|push|qa`. That found 5 rows: chain 017's own releases and preview-image-generator
  deploys and restarts. None is this verdict or a website push.

The predicate: the trigger names this verdict or a production push of website. **2 rows are members.**

| Member | Trigger (abridged) | Disposition |
|---|---|---|
| `handoff/message-page-header-decode-post-deploy-2026-11-20.md` | the P1R reader's fire at least 15 minutes after the E-WEBSITE-PUSH ledger cell is filled (the deploy of `7923a1d`) | **Fires after the push this verdict precedes, so it cannot be decided before it.** It carries P-1, the post-deploy read of Vercel's `/_next/image` without the direct `sharp`. Its reader is scheduled. Nothing to run here. |
| `handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` | "when QA next runs in this record" | Counted conservatively. Its QA item (item 1) was discharged 2026-11-11, per its changelog row. Items 2 and 3 belong to the analyst and to the record vocabulary. Nothing of QA's remains, and nothing bears on this tip. |

The 11 non-members:
- 8 fire when a named file is next edited, or when "the next chain touching website access control opens". The diff
  (`git diff --name-only 983681c 7923a1d`) touches only `package.json`, `pnpm-lock.yaml`, `src/app/_components/Providers.tsx` and its new
  test. None of those 8 rows names any of these files, and this chain is not access control.
- `providers-query-params-header-decode-throws-2026-11-08` fires on an edit to `Providers.tsx` `getMessage`, which this release makes. It
  is the chain's source handoff, so closing it `Addressed` is steering's at chain closure (deployment record, "Plan Reference"). It does not
  bear on the verdict.
- `bug-evaluation-fixes-unclosed-assumptions-2026-11-08` fires when "the next website … effort is scoped". That event was this chain's
  scoping at 02:03Z, not this verdict. Its surfaces (`getFromUrl`, `/generate`, preview images, upload/sign-out) are not in the diff, and
  it is steering's to route.
- `update-preferences-recent-message-ids-accepts-non-int8` needs a later chain on message-number inputs, which has not opened.

## Step 2: the gated time-based set

Capture: `tip-and-gated-set.txt`.
- `git diff --quiet 983681c 7923a1d -- vitest.config.ts`: exit 0, unchanged.
- `git grep -c -E "skipIf|runIf|\.skip\(|process\.env\.[A-Z_]+ *(\?|&&|===)" 7923a1d -- '*__tests__*'`: no file (exit 1).

**No gated time-based set exists**, so none runs.

## Step 3: in combination

One chain is bundled, and its base is the commit origin `master` serves now. The only combination is the fix over the last release
(`983681c`, the fix-personal-message-access release). The whole suite at the tip is that combination's run: 1913/1913, exit 0, all 149
files executed. The one behaviour the scoping brief named as at risk from removing the server path is the share-code load on
`/message/...?code=`. It runs client-side: `src/providers/MessageProvider/index.tsx` reads `searchParams?.get('code')`. The diff does not
touch that file. A `git grep` at `7923a1d` over `src` for `x-query-params`, `query-string`, `sanitize-html` and `sharp` imports finds:
- no production reader of the header;
- no import of a removed package.

`src/middleware.ts` still sets `x-query-params`. Nothing reads it now, so this is residue and not a defect of this release. It is noted
for the separate H-002/M-001 chain the owner named.

## Verdict

**Release Verified** at website `7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe`.

What the release act causes: per the chain's common brief and the deployment record, a push to `master` deploys to Vercel production. There
is no beta, and `website/.github/workflows` is absent. This pass did not read the Vercel project, so that fact is devops's to establish.

## Assumption Not Checked

This pass assumes, without testing it, that Vercel's production build of `7923a1d` behaves like the local `next build` and suite. In
particular, `/_next/image` still optimises without the removed direct `sharp`, through Next.js's own `sharp@0.34.5`.
- Falsity signature: P-1 reads a non-200 or a non-image response from `/_next/image` on hooks.gg after the deploy.
- Owner: the P1R scheduled reader in `handoff/message-page-header-decode-post-deploy-2026-11-20.md`. Devops fills the ledger cell after
  the push.
