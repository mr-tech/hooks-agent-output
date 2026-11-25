---
ID: n/a
Origin: "release chain/019-slate-formatting-discord-engine -> website master 5ec06212d73073ab556e46582c3b23e3468da3a3 -> 48eb60a02f4af4f27f1a5426bbe7e58301b1d148 (fast-forward)"
UUID: f13a0412
Verified-At: "48eb60a02f4af4f27f1a5426bbe7e58301b1d148 — repos=website; the tip's tree f50f8aa4 is the M6 Phase 2 Verified-At tree (qa/019-slate-formatting-discord-engine-m6-qa.md, record ce8d31a0); git-archive export x48p, 686 of 686 blobs"
Status: Release Verified
Status-Detail: "Release-tip verdict for website master 5ec0621 -> 48eb60a (plan 019, one plan). Runbook R-1: pnpm test offline 4,785 of 4,785, exit 0; pnpm test:discord live 41 of 41, exit 0, wasm hashes equal (no C2 drift), offline loud (C1, as designed); AC-3.3's full count 17 of 17, exit 0. The gated time-based set ran once (both bench files, exit 0). Step 1b: 39 open handoffs, 11 match, none holds the release. The M3 AN-3 re-read: both legacy surfaces drawn as legacySurfaceParse reads them, build 679963."
Phase: 3
---

# QA Release-Tip Verification: chain/019-slate-formatting-discord-engine → website 48eb60a

**Release identifier**: website `master` `5ec0621` → `48eb60a02f4af4f27f1a5426bbe7e58301b1d148`, a fast-forward of 98 commits
from `chain/019-slate-formatting-discord-engine`. No tag.

**Requested by**: `steering-hooks-fixer`, for `devops-019` (brief, 2026-11-25T16:4xZ). The devops record is
`deployment/019-slate-formatting-discord-engine-deployment.md`, runbook row R-1 (record `5a36728f`). The stage set is release
essentials (plan D-33, rulings block "2026-11-25T15:46Z"). The effort-final mutation sweep is waived and is not owed here.
**Plan**: `planning/019-slate-formatting-discord-engine.md`, Revision 26 (`d79f481e`).
**Blocking-condition register**: the chain's register, in `qa/019-slate-formatting-discord-engine-qa.md`. This pass appends no
row. It executes B-6 (below). The UAT document and the deployment record are authoritative on the other rows.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-25T16:59 | `steering-hooks-fixer` for `devops-019`; `devops-019` (message: the M3 AN-3 re-read) | Phase 3 at the release tip `48eb60a`, runbook R-1 | Phase 3. The tip is the M6 Phase 2 tree. R-1's commands were run anyway, as B-6 and block "2026-11-25T15:49Z" require. Also run: step 1b, the gated set, and M3's two Phase 3 items. **Release Verified.** |

## Scope (qa-phase-3.md, first line)

I re-derived the tip at 16:49Z and again at 16:53Z:
- `git -C website rev-parse --abbrev-ref HEAD` gives `chain/019-slate-formatting-discord-engine`, and HEAD is `48eb60a`.
- `git rev-parse 48eb60a^{tree}` gives `f50f8aa46b0111cd389e68557d4918a3f8f306d7`. That is the M6 Phase 2 `Verified-At` tree,
  because the tip is that commit.
- `git ls-remote origin refs/heads/master` gives `5ec06212…`.
- `merge-base --is-ancestor origin/master HEAD` exits 0, and `rev-list --count 5ec0621..48eb60a` gives 98.
- The 98 commits are all plan 019's. 11 subjects do not name the effort, and each is an M6 fix-round commit that the M6 document
  cites (`40947a6`, `a7ad3f2`, `2b82972`, `42128cd`, …).

So one plan is bundled, and steps 3 and 5 have nothing to compare. Step 1 holds: no plan-level QA document is reopened.

Every run below is in a `git archive` export of `48eb60a` in this session's scratchpad (`x48p`). Blob identity:
`blob-identity.txt`, 686 of 686 tracked blobs equal. Install: `pnpm install --frozen-lockfile --offline` under pnpm 10.28.2,
exit 0. All evidence is under `verification/019/qa/phase3/`, and the box load at each step is in `loads.txt`. The drivers are
`run-phase3.sh` and `run-phase3-bench.sh`.

## Step 2 and runbook R-1 — the suites at the tip

| Item | Instrument | Result | Evidence |
|---|---|---|---|
| Typecheck | `pnpm run typecheck` (both programs) | The first run exits 2 on a single error (`TS2307`, `~/assets/img/product_image.png`), because the export lacks the gitignored, generated `next-env.d.ts`. That is an export artifact, not the tree's fault. `next typegen` (offline) wrote it, byte-equal to the shared tree's. The re-run exits **0**, with 0 errors | `typecheck.*`, `typegen.log.txt`, `typecheck-after-typegen.*` |
| `pnpm test` offline | `vitest run --project node --project dom`, JSON reporter, `unshare -rn` with `lo` up | **4,785 of 4,785, exit 0**, 238 files. The file set matches the M6 Phase 2 run's by path membership (238 = 238, same paths) | `suite.*` |
| AC-3.3's 60 s cap | wall time against the 91.1 s line (`af3d95a`'s 31.1 s plus 60 s) | **74.5 s**, within. Load 2.6 at the start, 9.6 at the end | `suite.time` |
| `pnpm test:discord` live (B-6) | network on, read-only fetches | **41 of 41, exit 0**. Per file: boxes 10/10, live 9/9, reports 6/6, routing 5/5, surfaces 7/7, preview legacy-equality 4/4. Drift alarm: served wasm sha256 `da7b9e5e…57fb0` = pinned, **equal**, so no C2. The unexamined-coverage line is unchanged from M6 (GAME_MENTION ×4, CODE_BLOCK / embedTitle) | `discord-live.*` |
| `pnpm test:discord` offline | `unshare -rn`, `lo` up | exit 1, loud: 41 skipped, 18 `OracleError`/`fetch failed` lines. That is outcome C1 by construction (AC-3.5), as designed | `discord-offline.*` |
| AC-3.3's full count (R-92; block 15:49Z) | `MOUNTED_GENERATOR_COUNT=1000`, the pasted and typed generator files, offline | **17 of 17, exit 0**, 95.4 s. The titles read "the first 1000 generator inputs" (8 occurrences in the report) | `full-count.*` |
| The gated time-based set (testing-patterns, "Time-Based Tests") | the two `withNormalizeNode` bench files, one round each, one worker, offline | `keystroke-time`: **exit 0**. 14 rows, 200 to 2,048 lines, median at most 12.7 ms, none over AC-6.8's 16 ms. The 2,048-line rows read 8.7, 9.5 and 9.1 ms. `fence-and-quote-time`: **exit 0**, 7 of 7 within its own bounds | `bench-*.txt`, `bench-*.exit` |

**B-6, executed.** Both commands were run at the release tip and both exit 0 (`pnpm test` offline; `pnpm test:discord` live). The
drift-alarm hashes are equal. **Outcome cause: none.** The live run is green and has no C2 drift, so the native-box limbs ran on
the pinned wasm, which is also the served one. The offline `test:discord` failure is C1, which the row anticipates. **B-6:
EXECUTED 2026-11-25, PASS.**

## Step 1b — open handoffs naming this verdict or a website production push

The record has no `tools/open-handoff-trigger-sweep.py`. The instrument is `verification/019/qa/phase3/handoff-trigger-sweep.py`,
and its output is `handoff-trigger-sweep.out.txt`.
- **Command:** `python3 -I verification/019/qa/phase3/handoff-trigger-sweep.py .`, from the record root, exit 0, at 16:53:41Z.
- **Population:** every `.md` file directly under `handoff/` with `Status: Open`. That is **39**, cross-checked by `grep -l
  '^Status: *Open' handoff/*.md` (39).
- **Field and predicate:** the whole `Review-Trigger` value, folded lines joined, case-insensitive. A file is a candidate when the
  value matches `\b019\b|slate[- ]formatting|phase 3|release[- ]tip`, or matches `website` together with
  `push|releas|deploy|production|prod\b|master|vercel`.
- **Disclosed:** the population moved while I ran the sweep. The first runs read 35 and then 37, while another session wrote 4 new
  handoffs (untracked when read). The predicate was also widened after the first run to add `master|vercel|slate formatting`. The
  scored run is the last one: **11 of 39 match**.

| Handoff | Trigger fires at this verdict or push? | Disposition |
|---|---|---|
| `slate-formatting-link-targets-post-deploy-2026-11-25.md` | Yes, after the push | B-5's carrier. It is post-deploy by construction and never gates the push. Devops owns it (R-7) |
| `slateeditor-index-preexisting-react-hooks-lint-errors-2026-11-24.md` | Yes, at the production deploy | The owner selected that these errors ship listed and are fixed after the release. Re-read at the tip: eslint on `src/components/SlateEditor/index.tsx` in the export gives **8** severity-2 errors (`react-hooks/use-memo` 6, `react-hooks/immutability` 1, `@typescript-eslint/no-unused-vars` 1), the handoff's eight. It ships listed; at the deploy, its owning stage (steering) routes the fix. It does not hold the release (`lint-slateeditor-index.json`) |
| `website-paracord-listed-as-devdependency-but-imported-at-runtime-2026-11-22.md` | Fired earlier, inside the chain (its dependency sections were edited) | Answered at the tip: `paracord` sits under `dependencies` (`git show 48eb60a:package.json`), the plan's rider R-A. Closing it is its owning stage's |
| `website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` | Fired earlier, inside the chain (dependency entries edited) | Items 4, 5 and 7 re-read at the tip. 0 of the 166 changed paths fall under `src/server`, `src/pages/api`, `src/middleware`, `src/app/_navigation`, `ecosystem*` or `vercel*` (`grep -c` over `git diff --name-only 5ec0621 48eb60a`). `project-utils` and `@trpc/server`/`zod` are unchanged, and no hosting change. All three stand, untouched |
| `slate-formatting-rollback-stored-emoji-read-2026-11-25.md` | No: it fires on a decided revert | Not triggered |
| `slate-code-line-emoji-load-normaliser-disagree-2026-11-25.md`, `slate-smart-quote-repair-untested-2026-11-24.md`, `preview-fenced-code-block-test-hand-rolled-renderer-2026-11-24.md` | No: each fires on a later edit after 019 | Not triggered |
| `slate-formatting-unwalked-browser-behaviour-2026-11-25.md` | No: it fires on a user report or the rebuild's scoping | Not triggered |
| `pusher-message-update-channels-are-public-2026-11-19.md` | No: it fires on an edit to two files the diff does not touch (count above) | Not triggered |
| `project-utils-consumers-outside-workspace-lose-prisma-kysely-2026-11-22.md` | No: it fires on trees outside `website` | Not triggered |

None holds the release.

## M3's two Phase 3 items (`qa/019-slate-formatting-discord-engine-m3-qa.md`, Assumption Not Checked)

**The live routing controls at the tip.** `discordRouting.oracle-controls.test.ts` passes **5 of 5** in the live run above, on
the served build.

**The AN-3 re-read, one posted message per legacy surface, read in the test-account browser.** Devops-019 asked for this by
message.
- **Input.** One text, `an3-input.json`: a heading line, then bold, italic, underline, strike, inline code, spoiler, a masked
  link, `:smile:`, a channel mention, a quote, a list item and a fenced code block.
- **Oracle.** `legacySurfaceParse` at the tip on the served build, for `embedDescription` and `v2Text`. The probe is
  `qaAn3Reread.probe.test.ts.txt`, placed in the export only (`placed-probe.sha256`), and its output is `an3-legacy-tree.json`.
  It ran live and exited 0. **Served build 679963** (AN-3 read 679055).
- **Posting.** The test bot posted, with no pings, to `#slate-oracle-walk` in the test guild, using AN-3's own poster
  (`verification/019/analysis/an3/an3-post.py`, sha256 in `an3-post.sha256`):
  - an embed, message `1575193331028459524`;
  - a V2 text display, message `1575193337995071610`.
  - Both posts returned 200 (`an3-posted-*.json`).
- **Read.** The stage Chrome, signed in as the test account, at 16:56Z. **The client's `GLOBAL_ENV.BUILD_NUMBER` is 679963**,
  the oracle's build. The drawn HTML of the embed description and of the V2 accessories was captured to `an3-dom.json`. No
  challenge was shown, and nothing was typed or sent from the browser.
- **Comparison.** `an3-compare.py` checks the ordered node kinds the DOM draws against the legacy tree's non-text kinds, per
  surface. Output: `an3-compare.out.txt`.
  - **Embed description: EQUAL. V2 text display: EQUAL.** Both read heading, strong, em, u, s, inlineCode, spoiler, link, emoji,
    channelMention, blockQuote, list, codeBlock.
  - The control fires: the same DOM against a reading without a heading DIFFERS.
- **Disclosed:** the in-page classifier first read **DIFFER** on both surfaces, missing `channelMention`. Its `/mention/` test is
  case-sensitive, and the drawn class is `channelMention`. The captured HTML shows the mention drawn (`span.channelMention` with
  the channel's name). `an3-compare.py` re-classifies the captured HTML with that test made case-insensitive, and the browser was
  not driven again. That first read is my instrument error, kept in `an3-dom.json`'s raw kinds.
- **Closed.** M3's premise, that the modules the predicates locate are the ones the client draws with, holds at the tip's
  served build for both legacy surfaces, on this input. That is one input per surface, as M3's line asks, and not a class sweep.

The browser was closed, the profile lock had no holder, and the cache directories were emptied.

## Verdict

**Release Verified** at website `48eb60a`, for the fast-forward `5ec0621 → 48eb60a`. Any other tip voids it.

- Not gating: B-5 (post-deploy, carrier above), which devops owns.
- QAF-56 MEDIUM and QAF-42 LOW stay as the M6 document states. In this pass's single bench round, the 2,048-line rows all read
  under 16 ms.

## Assumption Not Checked

This pass assumes that the Vercel production build installs the same dependency tree the frozen offline install produced here
from this box's store. The registry fetch was not exercised, because the install ran `--offline`.
- **The signature of its falsity.** Vercel's build log for the push shows a different `@discord/markdown-wasm` version, or a
  failed install. Or the deployed site's wasm sha256 differs from `da7b9e5e…57fb0`.
- **Who owns closing it.** Devops, at R-6 and R-7 (B-5's reader reads the deployed site).

One command was not completed this pass.
