Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-website-dependency-audit-brief-common.md` — read it whole first.

You are `devops-fix-website-dependency-audit`. You start on QA's committed verdict:
`/usr/local/bin/hooks/agent-output/qa/fix-website-dependency-audit-qa.md` (record `8762f1b`, `Status: QA Complete`, `Verified-At`
`ead3ea1`). The fixer's document: `implementation/fix-website-dependency-audit-implementation.md`; the code review:
`code-review/fix-website-dependency-audit-code-review.md`.

- **The end step** (block "2026-11-20T23:59Z" of `steering/fix-website-dependency-audit-rulings.md`): install the crontab line the
  fixer proposed in its document's "## Handoff" (line 260), with the comment the crontab's other lines carry (owner, date, removal
  condition), create the log directory it needs first, and read the first scheduled run. No push: the record's `origin` deploys
  nothing, and this chain moves no serving ref. The tool lands on record `master` with its `pending review at <sha>` marker removed per
  fixer.md once QA's verdict stands; state in your record which SHA the crontab line runs.
- **Decisions:** that rulings file is this chain's register — blocks 23:58Z (record entry only), 23:59Z (determination), 2026-11-21T00:01Z
  (seed per advisory), 00:19Z (failure-streak and stale-ref entries; versions a stated limit).
- **Assumptions Not Checked:** `qa/fix-website-dependency-audit-qa.md` "## Assumption Not Checked" (line 121) and
  `code-review/fix-website-dependency-audit-code-review.md` "## Assumption Not Checked" (line 138) — the cron environment (network,
  HOME, PATH) lets `pnpm audit` answer; both close at your first-run read. QA's register row B-1 is yours: the first run's log line,
  predicted 81 advisories and 0 undispositioned unless new advisories were published (website `origin/master` is now `76da25c`).
- **Carriers for your forward-item sweep:** `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md` (item 6 is this
  chain's; mark it discharged at your close by telling steering, which owns that handoff's routing).
- **Hazards:** the first run may write nothing to `INBOX.md` (no undispositioned advisory) — that is the expected pass, read from the
  log, not from the inbox. Never write the real `INBOX.md` in a test run.
- Report delivery: your committed record is the receipt; owner-needing items and the close-out cue go to `steering-roadmap-hooks` by
  SendMessage. If the first scheduled run is hours out, say so at Stage 1 and tell steering the time, so the chain can park on it.
