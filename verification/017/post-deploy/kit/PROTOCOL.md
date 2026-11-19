# Plan 017 post-deploy readers B7R and B10R: protocol

Read by the briefs `B7R` and `B10R`. It fixes how a headless reader works; the brief fixes which row it owns.

## What you are

You are the devops stage, run headless from `/usr/local/bin/hooks/agent-output` by cron through
`node ~/.claude/tools/post-deploy-launcher.js` (kit `verification/017/post-deploy/kit/`). No person is present.
Only the record is your output. Most fires find nothing decidable and stop at step 3.

Duties negated: your Stage 1 and Stage 2 procedures, any deployment document, the start-of-session scan that moves
closed documents, cache-warm arming, and the "end every turn with one SendMessage" rule. You send no message
(no SendMessage, no seam.js): your product is the carrier's Result line and changelog row. You never push,
merge, deploy, restart, change a Vercel setting or write to a host.

## Hard limits

- Instruments, and only these: `bash verification/017/post-deploy/kit/b7-read.sh <out-prefix>` (row B-7: two
  read-only `vercel logs` reads of the production deployment, scope `hooks-gg`) and
  `bash verification/017/post-deploy/kit/b10-read.sh <out-file>` (row B-10: `verification/015/pig-host-read.sh`
  streamed over the standing read-only alias `hooks-pig`, user `claude-ro`, nothing copied or written on the host).
  No other host, URL, database or service. `~/.ssh` and every `.env*` file are never read.
- Print and record only counts, timestamps and the fixed line prefix `preview-image-failure`: no request body,
  message content, user id or token. A message id inside a failure line is a count's member and is recorded as
  the id only.
- One fire runs its instrument at most once. A refused or failed read is recorded, never retried in another form.
- Edit no file other than the carrier, the files you create under `verification/017/post-deploy/kit/out/`, and
  `INBOX.md` where a step says so. Never `git stash`.

## Steps

1. `date -u +%Y-%m-%dT%H:%M:%SZ` is NOW; `date -u +%Y%m%dT%H%MZ` is STAMP. Read the carrier whole:
   `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (it may have moved to `handoff/closed/`).
2. **Stop condition.** If the carrier's changelog TABLE already has a row whose last cell is `run-<ID>-complete`
   (`<ID>` is your brief's name), stop: "<ID> already complete".
3. **Gate.** Your brief names its ledger event. If that ledger row's `When` cell is blank, or your brief's date
   gate is not yet reached, stop with "<ID> nothing decidable at <NOW>". Write nothing, commit nothing.
4. **The read.** Run your row's instrument once, outputs under `verification/017/post-deploy/kit/out/` with STAMP in
   the name. Read each output with `grep -c` and `grep`, never over a filtered pipe.
5. **Decide and write** as your brief says. Read the carrier immediately before editing it (a shared tree); replace
   only your row's `Result` line and append changelog rows. Stamp every row from `date -u`.
6. Run `node tools/check-repo.js` once over your own output; fix defects in your own carrier rows and nothing else.
7. Commit by pathspec, nothing else staged: write `git diff <carrier>` to a file under `out/` and read it — every
   hunk must be yours, else commit no carrier and say so. Then `git add --intent-to-add <the out/ files you created>`
   and `git commit --only <carrier> <those files> -m "plan 017 post-deploy <ID>: <state>"`. Afterwards
   `git diff --quiet HEAD -- <path>` must exit 0 for every path; non-zero is a commit not made, said in your last line.
8. End with one line: "<ID> done: <state>, commit <sha>", "<ID> stopped: <reason>", or the step 3 line.

## Completion token

A fire that writes a row's final Result appends one changelog row whose LAST cell is `run-<ID>-complete` and nothing
after it. The launcher's skip predicate matches only a table row ending that way; prose never counts.
