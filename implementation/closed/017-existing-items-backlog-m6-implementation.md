---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Committed
Status-Detail: "Committed at release identifier chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) by devops Stage 1 at 2026-11-19T19:13Z; closed. Anchor fields above keep the values the document was written at. Post-deploy rows B-6 to B-11 ride handoff/017-existing-items-backlog-post-deploy-2026-11-19.md."
Handoff-At: 8512a1d — repos=preview-image-generator; M6 first delivery on the generator's chain branch (base 8de2b53)
---

# Implementation 017 — M6: The generator writes only a confirmed image and deletes nothing (item 2, generator)

## Plan Reference

`agent-output/planning/017-existing-items-backlog.md`, revision 7, milestone M6 (M6-0, M6-a to M6-c). Generator chain branch `chain/017-existing-items-backlog`, cut at `8de2b53` off `origin/prod`
(`steering/017-rulings.md` block 2026-11-19T05:21Z), no upstream. Start: rulings block 2026-11-19T05:19Z; QA Phase 1 at `7eda138`. The repository has no tests (workspace `CLAUDE.md`); verification is the probe under `verification/017/m6-probe/`.
M5 (website) has its own document and ships first (§ Release and rollback).

## Date

2026-11-19.

## Changelog

| Date | Agent | Change |
|---|---|---|
| 2026-11-19T06:21 | implementer-hooks-017 | M6 built at generator `8512a1d` (two files, +19 −29). Probe: 13 of 17 cases fail on the base `8de2b53` and 17 of 17 pass on the tip, with the 30 s hang case; mutation 15 of 16 killed, the survivor equivalent. RK-7's liveness fixture captured. Handed to code review at `8512a1d`. |
| 2026-11-19T07:38 | implementer-hooks-017 (resumed) | Round 7 fix round (REJECTED on CR-16; CR-17, CR-18 LOW). Record-only: the generator stays at `8512a1d`. CR-16: `verification/015/pig-host-read.sh` section [7] counts the generated-image lines at or after the latest ISO-stamped `Server running at` line and prints that stamp; the failure counts state that the error log is unstamped. CR-17: a Deviations line. CR-18: a record line under Test Execution Results; the failed capture `sweep-run-8512a1d.out` removed. The reviewer's falsifier `code-review/m6/liveness-scope/run.sh` prints 0 and 1; my fixture has 7 cases and 5 of 5 conjunct mutants killed. |
| 2026-11-19T19:13 | devops-hooks-017 | Document closed. Status: Committed. Plan 017 is committed on chain/017-existing-items-backlog (website 7293a35, generator 8512a1d) at devops Stage 1; the release is Stage 2. |

## Implementation Summary

`generateImage.ts` renders, then stores. A request that passes the body and key checks is answered 204 exactly when its object was put: `page.goto` rejecting, resolving `null`, or resolving a main-resource
status outside 200 to 299, `page.screenshot` rejecting, and the put rejecting each throw a `PreviewFailure` carrying their class (`goto-rejected`, `error-status`, `screenshot`, `put`), which `server.ts` answers 500 and logs as
one always-on line `preview-image-failure id=<id> class=<class> elapsedMs=<n>` (the website's shape; no content, nonce or key). `deleteMessagePreviewImages` and its `ListObjects` and `DeleteObjects` imports are
gone: the generator deletes nothing (the website does, M5-c). The request contract (`id`, `nonce`, `message` in, a status out), the body and key checks, and every other log line are unchanged.

## Milestones Completed

M6-0 (the probe rig, built first), M6-a, M6-b, M6-c, in one commit, generator `8512a1d` (`src/generateImage.ts`, `src/server.ts`), plus `pig-host-read.sh`'s section [7] in the record (`verification/015/pig-host-read.sh`, M6-c's "added in the same change").

## Entry Conditions

| Condition | Where satisfied | Pinned by |
|---|---|---|
| Stage start | `steering/017-rulings.md` block 2026-11-19T05:19Z; the branch, block 05:21Z | not owed |
| QA Phase 1 covering M6 | `qa/017-existing-items-backlog-qa.md` at `7eda138`: § M6, NM-18 to NM-20, QAF-14 | not owed |
| Open questions | none | not owed |
| Premise | M6 is not `PREMISE-STALE` | not owed |
| M5-0 met | limbs 2 and 3 | not owed |
| M6-0, the rig, network-isolated, stopped on every exit path | `m6-probe/` (S3 stub, preview stub, `probe.mjs`, `run.sh`); `unshare -rn` with loopback raised; `run.sh` reports leftover generator and Chrome processes | `impl/m6/green/probe.out`, last line `left over processes: generator 0, chrome 0` |
| M6-a, 204 exactly when the object for this nonce was stored | `generateImage.ts` | probe cases `ok` (204, one put with `previews/42/<nonce>.jpeg`, `image/jpeg`, `public-read`), `goto-404`, `goto-500`, `goto-300`, `goto-null`, `goto-199`, `goto-299`, `goto-204`, `goto-reset`, `goto-hang`, `screenshot`, `put` |
| M6-a, `goto` rejects / resolves null / status outside 200 to 299 / screenshot rejects / put rejects, each answered 500 with nothing written | same | the cases above, each with `puts=0` (the put case: the SDK's three attempts, all refused) |
| M6-a, unchanged: a bad body 500, a wrong key / path / method 404 | `server.ts` | probe cases `bad body`, `wrong key`, `wrong path`, `wrong method` |
| M6-b, the generator deletes nothing | `deleteMessagePreviewImages` removed | every case: `otherS3` is `-` (no list, no delete, no other request) on the stub's log; red base shows `list`, `delete` |
| M6-c, `Server running at`, `Server received`, `Created instance`, `POST /generate`, the drain-complete line keep their text and emission count; `Generated image for message … in <N>ms` keeps its text | `server.ts`, `getPool.ts` untouched | the probe's `unchanged lines` and `closing lines` counts are identical on base and tip (Server running 1, Created instance 2, POST /generate 15, closing 1); the `ok` case matches `Generated image for message 42 with nonce <n> in <N>ms` |
| M6-c, the failure line: one per render-path failure, prefix, class, id, ms, no content / nonce / key | `server.ts` | each failing case asserts exactly one line matching `^preview-image-failure id=42 class=<class> elapsedMs=\d+$` and none naming the nonce, the planted content or `previews/` |
| M6-c, the line's shape added to `verification/015/pig-host-read.sh` | section [7] | `m6-probe/pig-host-read-fixture.sh` (below) |
| RK-7 liveness precondition 1 (QAF-14): the changed script is shown counting a line of the exact shape on this box | `impl/m6/pig-host-read-fixture.txt` | below |
| Exclusion X-4 (body validation) holds | the request contract is unchanged | the `bad body` case |

## User-visible flows (derived from the codebase)

M6 touches no user-visible surface of its own: it is a service answering the website. The visible consequence (a failed render leaves the stale preview showing) is M5's flow and is stated there. Nothing here holds a decision.

## Deviations

One decision the plan leaves open (CR-17, Round 7). The failure-line field order (`id`, `class`, `elapsedMs`) follows the website's line so one pattern reads both.

**Setup failures carry no class line.** A 500 caused by the render's setup (`browser.newPage()`, `page.setViewport(...)`, the pool's acquire rejecting) writes no `preview-image-failure` line on the generator. M6-c's "one line per render-path failure" lists four
classes (`goto-rejected`, `error-status`, `screenshot`, `put`) and does not say whether setup is on the render path. I read it as the four: a line is written only for a failure of the page's load, the screenshot or the store, which are the steps
that say whether *this message's* image could be made, and a fifth class for the browser or the pool being unavailable would name the host's condition, not the message's. A setup failure still answers 500, writes nothing, and is logged by the
existing `console.error(err)` with its stack, and the website writes its own line for any non-204 answer (M5, class `status-500`), so the operator still sees each one. Only the generator-side per-class count (RK-7's reader) does not see them; RK-7 counts
`error-status` only, so its read does not change. The probe's `setup-rejects` case shows the behaviour. Whether a fifth class is wanted is the planner's to record; no test is owed.

## Files Modified

`git diff --numstat 8de2b53 8512a1d` (generator):

| Path | Changes | Lines |
|---|---|---|
| `src/generateImage.ts` | `PreviewFailure` and its class type; `goto` and `screenshot` wrapped to throw it; the status check; the put wrapped; `deleteMessagePreviewImages` and the `Promise.all` removed | +17 −28 |
| `src/server.ts` | imports `PreviewFailure`; writes the failure line before answering 500 | +2 −1 |
| `verification/015/pig-host-read.sh` (record) | section [7]: counts of the four classes and of generated-image lines, counts only | +17 |

## Files Created

| Path | Purpose |
|---|---|
| `verification/017/m6-probe/s3-stub.mjs` | the loopback S3 stub (put, list with `LastModified`, batch delete, get; records every request; fails a put on demand); shared with M5's rig |
| `verification/017/m6-probe/preview-stub.mjs` | the stub `/preview` (200, 404, 500, 300, 204, 299, reset, hang) |
| `verification/017/m6-probe/shim-screenshot.cjs` | loaded into the generator under test: makes `screenshot` reject, `goto` resolve `null` or a status of 199, and `setViewport` reject while a flag file exists |
| `verification/017/m6-probe/probe.mjs`, `run.sh` | the driver and the network-isolated wrapper |
| `verification/017/m6-probe/mutate-probe.py`, `final-runs.sh` | the mutation driver (a control run first, a fresh copy per mutant) and the one-pass evidence script |
| `verification/017/m6-probe/pig-host-read-fixture.sh` | RK-7 liveness: the changed script on real probe lines |

## Patterns Extended

| Surface | Pattern extended | Rung |
|---|---|---|
| failure lines | the website's `preview-image-failure id= class= elapsedMs=` line (M5-f) | in-repo |
| the server's error path | the existing `console.error(err)` on a rejected `generateImage`, kept | in-file |
| the probe rig | none exists (F-11's read of `verification/015/m8-local-probe/`); the S3 stub is shared with M5's rig | none exists |

Sibling sweep, two instruments: predicate 1, text: `git grep -n "deleteMessagePreviewImages\|DeleteObjectsCommand\|ListObjectsCommand" 8512a1d -- src` in the generator: 0 lines (the website's copy lives in the website). `git grep -c "preview-image-failure" 8512a1d -- src`: `src/server.ts:1`. Predicate 2, reference query:
Serena `find_referencing_symbols` is not available in this session; not run.

## TDD Compliance

The repository has no test suite; the instrument is the probe, the red run is the probe against the base export of `8de2b53`, the green is the same probe against an export of `8512a1d`
(`git archive`, the lockfile identical, `npm ci` from it with Chrome's download skipped and the system `google-chrome` used).

| Function/Class | Test File | Test Written First? | Failure Verified? | Failure Reason | Pass After Impl? |
|---|---|---|---|---|---|
| `generateImage` answers 204 only for a stored image: `goto-404`, `goto-500`, `goto-300`, `goto-null`, `goto-199` (status or null outside 200 to 299), `goto-204`, `goto-reset`, `goto-hang`, `screenshot`, `put` | `m6-probe/probe.mjs` | Yes | Yes, `impl/m6/red/probe.out`, `probe-result.json`: 13 of 17 failing against `8de2b53` | the base answered 204 for 404, 500, 300 and a null or sub-200 response and put the error page's screenshot; `goto-204`, `goto-reset`, `screenshot`, `put` answered 500 but wrote no failure line | Yes, `impl/m6/green/probe.out`: 17 of 17 |
| the generator deletes nothing | same | Yes | Yes (same run): the base lists and deletes on every case (`other=list,delete`) | `AssertionError`-equivalent: 1 or 2 list/delete requests where 0 are wanted | Yes |
| one failure line per class, redacted | same | Yes | Yes (same run): 0 lines against the wanted 1 | no line | Yes |
| unchanged: bad body 500, wrong key / path / method 404, the unchanged log lines | same | Yes | not a red: the four request cases pass on the base and the tip, and the line counts match | not owed | Yes |

`tdd-check.py` refuses non-Python sources and this repository has no test files, so the rows are read.

## Class Sweep

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| A, a render-path outcome the probe cannot induce with a stub page (the first probe could not make `screenshot` reject, and had no null or sub-200 response) | the plan's M6-a list: goto rejects, null, status, screenshot, put | 5 members; 3 not inducible by a stub (`screenshot`, null, status below 200) | three shim modes (`shim-screenshot.cjs`) drive the code path of the call that returns the value; the shim sits outside the production source. `goto-204` was tried as a null response: Chrome aborts a 204 navigation, so `goto` rejects (class `goto-rejected`); the case records that. Residual 0 |
| B, a probe's nonce that is a substring of a class word (my first `screenshot` case used the nonce `nshot`, inside `screenshot`, and failed the redaction check falsely) | the probe's nonces against the four class words and `preview-image-failure` | 13 nonces `vprobe-NN` and `vprobe-nfail` | none is a substring of a class word. Residual 0 |
| C, a failure outside the four classes (a render-setup failure) must not write a failure line | a probe case with `setViewport` rejecting | 1 case | `setup-rejects`: 500, no put, no failure line, the error logged by the existing `console.error(err)` |

Round 7 fix round (record-only; the generator is unchanged at `8512a1d`):

| Finding | Enumeration command | Full output (hit count + lines) | Disposition of every hit |
|---|---|---|---|
| CR-16, a count the read takes "since the deploy" computed over the whole log (the reviewer's enumeration, re-run) | `sed -n '/^# --- \[7\]/,/^echo; echo "=== end"/p' verification/015/pig-host-read.sh \| grep -c '"\$GREP" -c'` at `4c4e948`, then now; then the whole script: `grep -n '"\$GREP" -c' verification/015/pig-host-read.sh` (`impl/m6/liveness-scope/class-sweep-count-sites.out`) | section [7]: 3 sites at `4c4e948`, 2 now. Whole script: 16 sites. Only [7]'s header states a since-the-deploy reading: `grep -n "since the deploy\|since deploy\|since the last\|since the start"` over the script gives 0 lines outside [7] | the generated-image count (the member) is gone as a `grep -c` and is now an `awk` count at or after the latest ISO-stamped ready line, with the stamp printed. The 2 remaining [7] sites read the unstamped error log, cannot be scoped by time, and now print their bound ("unstamped: counts since the line shape first existed, not since this deploy"). The 13 sites in [3] to [6] are whole-log or whole-process counts labelled as such, or span machinery in [6] (list sizes): none states or is relied on as since-the-deploy, so not-applicable. Residual 0 members. The predicate sees only `grep -c` sites; a count made with `awk` or `wc` elsewhere would not show: `grep -c "awk.*n++\|wc -l"` is not applicable here, the script's other counts are the 16 |
| CR-16, the scope code's own guards (each conjunct of the new count and the boundary choice) | `m6-probe/liveness-scope-fixture.sh` (7 cases: none rendered since the deploy; one; two; ready lines out of line order; a line of another shape after the deploy; unstamped generated lines, one with 25 characters ahead of the phrase; no stamped ready line), five one-change mutants of a copy of the script (`impl/m6/liveness-scope/mut-*.out`, `mutants.out`) | 5 of 5 killed: boundary compare dropped, latest becomes earliest, head conjunct dropped, tail conjunct dropped, ISO gate dropped | the ISO-gate mutant first SURVIVED: the head conjunct (`index(substr($0, 26), …) == 1`) already excludes an unstamped line of the ordinary shape. It is not equivalent: an unstamped line with 25 characters ahead of the phrase passes the head conjunct. A case with that line was added and the mutant is killed. Residual 0 |

## Test Execution Results

Environment: generator export of `8512a1d` (and of `8de2b53` for the red) in the session scratchpad, outside the repositories, `node_modules` from `npm ci` of the unchanged lockfile; every probe run network-isolated (`unshare -rn`, loopback up); Chrome from `/usr/bin/google-chrome` 157.
No generator or Chrome process remained after any run (`left over processes: generator 0, chrome 0`). The generator's working tree was never installed into.

| Command | Result |
|---|---|
| `m6-probe/run.sh <base export> impl/m6/red` | 13 of 17 cases failed (`probe.out`, `probe-result.json`) |
| `m6-probe/run.sh <tip export> impl/m6/green` | 17 of 17 passed, including `goto-hang` (30 s) |
| `tsc --noEmit -p .` and `npx eslint src/generateImage.ts src/server.ts` in an export of the working tree before the commit | 0 errors, 0 findings (the base lints clean on the same files) |
| Mutation: `mutant-gen.js --range 8de2b53..8512a1d` (8 mutants) plus 8 named or row mutants (`impl/m6/all-mutants.json`, `m6-probe/mutate-probe.py`, `impl/m6/sweep-run.out`) | 15 of 16 killed under a passing control (16 cases), 1 survivor |
| `m6-probe/pig-host-read-fixture.sh` over the real probe lines (`impl/m6/pig-host-read-fixture.txt`) | section [7] counted 10 failure lines by class (goto-rejected 3, error-status 5, screenshot 1, put 1) and 2 generated-image lines; the near-miss class `error-statusX`, a stack head and a stack frame were not counted |

Round 7 fix round (record-only; network isolation does not apply: no network path):

| Command | Result |
|---|---|
| Red, the scope fixture against `pig-host-read.sh` as committed at `4c4e948` (`impl/m6/liveness-scope/red-4c4e948.out`) | counts 3, 4, 5, 2 and 2 for the five cases where 0, 1, 2, 1 and "not read" are wanted: the count is over the whole log; the last case printed a count where none is wanted |
| Green, the same fixture against the changed script (`liveness-scope/green-new.out`) | 0, 1, 2, 1, 0, 0 and "NOT READ", each case printing the boundary stamp it counted from; the last case prints no count |
| The reviewer's falsifier `code-review/m6/liveness-scope/run.sh` (not edited) | `no-render-since-deploy` reads 0 and the control reads 1 |
| `m6-probe/pig-host-read-fixture.sh` over the real probe lines, ready line moved before them (`liveness-scope/fixture-after.out`) | 10 failure lines by class as before; boundary `2026-11-19T06:13:39.709Z`; 2 generated-image lines at or after it; the near-miss class, a stack head and a stack frame are still not counted |
| Mutants of the scope code | 5 of 5 killed (Class Sweep above); each in its own copy of the script in the session scratchpad, never the record's file |
| `bash -n verification/015/pig-host-read.sh` | exit 0 |

**Record line (CR-18): the trees of the captures.** `impl/m6/green/` and `impl/m6/sweep-run.out` (with `sweep-out/`) were produced by the probe and the mutation driver against the generator export the sections above name, `git archive` of `8512a1d`; the captures
themselves record no tree id (their stack traces name only the shared `node_modules` of the base install), so that identity is this document's statement, not something the files prove. What the files do show is that the sweep's control passed all 16 cases and that its
mutants were generated over `8de2b53..8512a1d` with line numbers that are the tip's (`generateImage.ts:36` and `:37`). Code review reproduced the green at its own export of `8512a1d`, 17 of 17 (Round 7). `impl/m6/green-8512a1d/` and
`impl/m6/pig-host-read-fixture-8512a1d.txt` are byte-identical second copies of `green/` and `pig-host-read-fixture.txt` (the reviewer's `diff`) and carry no further evidence. `impl/m6/sweep-run-8512a1d.out` was a failed attempt (`FileNotFoundError` on
`all-mutants-8512a1d.json`, exit 1), not evidence, and is removed in this round. `impl/m6/pig-host-read-fixture.txt` is the output of the first delivery's script (the whole-log count) and is superseded by `liveness-scope/fixture-after.out`. The lint and
typecheck row above ran on "an export of the working tree before the commit", not of the commit; code review's own `tsc -b` and eslint at an export of `8512a1d` (exit 0 each, Round 7) are the run at the commit.

Named mutants (QA's list) and row mutants:

| Mutant | Made as | Result |
|---|---|---|
| NM-18, a 300 or a null response is accepted | (a) `status > 399`; (b) `?? 200` for a null response | killed, 1 failing each (`goto-300`; `goto-null`) |
| NM-19, the generator deletes again | a `ListObjectsCommand` on the prefix before the put | killed, 3 failing (the lists on `ok` and others) |
| NM-20, 204 before the put resolves | `void` for `await` on the put | killed: the run did not complete a summary (a rejected put surfaced as an unhandled rejection and ended the generator), which counts as a kill; the `put` case would answer 204 |
| generated operator mutants on the status check (`<`, `>`, `||`, `if (false &&`, the two numbers) | `mutant-gen.js` | killed, 1 to 5 failing each. The upper bound `> 299` is held by the `goto-299` (204) and `goto-300` (500) pair; the lower bound by `goto-199` and `goto-null` |
| `server.ts:39 if-false` (the failure line never written) | generated | killed, 9 failing |
| a put labelled `screenshot`; a goto rejection labelled `error-status` | named | killed, 1 and 2 failing |
| a line written for every error (not only `PreviewFailure`); a line naming the nonce | named | killed, 1 and 9 failing (`setup-rejects`; every line case) |
| `generateImage.ts:36 num`, `?? 0` to `?? 1` | generated | **survives; equivalent**: the status is compared `< 200`, and both 0 and 1 are below it, so a null response answers 500 either way. No input separates them |

## Outstanding Items

- **Security review** of the delta before release is the stage set's (plan § M6): not mine. The generator's only new network behaviour is none; it makes one fewer bucket request class (no list, no delete).
- **Unreachable states, stated:** a response status below 200 never reaches puppeteer from Chrome, and a null `goto` is not inducible by a stub (Chrome aborts a 204), so those two members are driven through the shim, not through a real browser; production behaviour for them is the code read.
- **The `put` case retries:** the AWS SDK retries a refused put three times before the 500, so a failed storage costs seconds, as at the base.
- **Release order** (plan § Release and rollback): the website ships first; with the new generator and the old website, nothing deletes the old objects (a leak) and the old website still rotates the nonce unconditionally.
- **Process facts, disclosed in the round:** the secret-file hook refused one compound call (a `git commit` followed by `git log`) in this repository because `git log` could print the flagged `.github/workflows/prod.yml`; nothing ran; I re-issued the commit alone, and used `rev-parse`, `status`, `diff --numstat` and `grep -c` thereafter, printing no line of that file. The exports were made with `git archive … ':(exclude).github'`. The generator repository's tree stayed clean of `node_modules` and build output. **Round 7 fix round:** the same hook refused two `git log` calls in this repository (one inside a compound read, one alone with `--name-only`; both only to read the commit's time, which no finding needs). I did not re-issue either in another form and dropped the read; nothing of the flagged file was printed. `git rm --cached` staged the removal of `sweep-run-8512a1d.out` in the shared index before its pathspec commit.
- **Downstream:** M6 changes product behaviour observable outside the service's source: a render that errors now answers 500 where it answered 204, and the generator no longer deletes. M5's premise ("204 means the object was stored") is what this delivers; RK-7's reader (B-10) counts the new `error-status` lines from the deploy.
- **Self-diagnosis, for the retrospective:** my first probe's redaction check flagged a false failure because a probe nonce was a substring of a class word; I chose nonces for brevity, not for being unmistakable among the words the line contains. The check was right to be strict and the fixture wrong.

## Next Steps

Code review at generator `8512a1d` (M6 range `8de2b53..8512a1d`, plus the record change in `verification/015/pig-host-read.sh`), then the security review the stage set names, then QA Phase 2 for M6. M7 (lint baseline) last.
