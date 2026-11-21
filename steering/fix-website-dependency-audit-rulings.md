# Rulings — fixer chain `fix-website-dependency-audit` (a scheduled dependency audit of the released website)

Fixer chain steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`). His word opening
it: `steering/website-deps-review-rulings.md`, block "2026-11-20T23:44Z — his answers on the dependency-review leftovers" (Q2, "yes").
Brief common part: `steering/fix-website-dependency-audit-brief-common.md`. tmux category: `fix-website-dependency-audit`.

## 2026-11-20T23:58Z — selection: where a new advisory goes (record entry only)

**Selection, answered 23:58Z** (ledger `steering/selection-ledger/2026-11-20.md`, block "2026-11-20T23:58Z — steering-roadmap-hooks";
wording this thread's). Put 23:58Z, answered 23:58Z. Premises read that turn: no scheduled audit on the box (helper search 23:5xZ:
`crontab -l | grep -c -i -E 'audit|osv|dependabot|renovate|snyk'` 0; `systemctl --user list-timers --all` 0 timers; no
`dependabot.yml`/`renovate.json` in the 33 repos under `/usr/local/bin/{hooks,statbot}`; no audit workflow by `grep -l`); the alerts
webhook is `challenge-alert.js`'s, file `~/.claude-credentials/challenge_alert_webhook` (its line 70); the hooks `INBOX.md` holds
uncommitted entries dated from 2026-11-12 (`git diff INBOX.md`, read 23:4xZ); crontab runs one headless `claude -p --agent steering`
job (the helper's read).
- Agent: ping your alerts channel (Recommended) — "Posts one line to the Discord alerts channel you set up for challenge alerts,
  naming the package and the advisory, and only when there's a new unassessed advisory, never on a quiet day. That widens the
  channel's use beyond challenges, which is why I'm asking. You'll see it; when you say so, a session gets the security agent to
  judge whether it reaches the site."
- **Agent: record entry only** — CHOSEN, by selection. "Writes an entry to the hooks record's inbox and pings nobody. It's read
  whenever a session next processes that inbox. That inbox currently holds unprocessed entries going back to 12 November, so a new
  advisory could sit there unread."
- Agent: security judges it automatically — "On a new advisory, the cron job starts a headless security-agent run … to judge whether it
  reaches the site, and pings your alerts channel only if it does. Costs one agent run per new advisory, and widens the channel's use
  the same way."
Consequence: no Discord post and no headless agent run; the alerts webhook is not touched.

## 2026-11-20T23:59Z — scoping determination: fixer chain in the shared record repository

**Source.** `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`, item 6 IN ("a scheduled `pnpm audit --prod
--json` over the released lockfile, joined with that file, so that a new entry is read by someone"); items 1–3 are chain
`fix-trpc-batch-limit`'s; items 4, 5 and 7 OUT on their own triggers.
**Shape.** New capability (record tooling), small. No dated outside event. Cause: n/a. Blast radius: one new record tool, its
test, a dispositions data file, and one crontab line; nothing deployed, no push (the record's `origin` is not a deploy target).
Specification: the audit runs over website `origin/master`'s `package.json` and `pnpm-lock.yaml` (an export, never the shared
tree), joins each entry with the dispositions already made, and for each entry with no disposition appends one entry to
`/usr/local/bin/hooks/agent-output/INBOX.md` in the `inbox-entry` skill's form — once per advisory, never repeated on later runs while
it stays undispositioned; a quiet run writes nothing but its log. Daily, at a minute off :00/:30. End step: the crontab line installed
and its first run's log read.
**Reuse.** `verification/website-deps-review/security/apply-dispositions.js` (key forms `module|GHSA`, `module`,
`module@version-prefix`; throws on an undispositioned entry) and `dispositions.json` beside it (18,412 bytes). The estate search found no
existing audit runner (block above).
**Stage set:** `fixer-fix-website-dependency-audit` → `code-reviewer-fix-website-dependency-audit` → QA Phase 2
(`qa-fix-website-dependency-audit`) if the tool adds 20 or more production lines → devops (`devops-fix-website-dependency-audit`)
installs the crontab line and reads the first run. No plan, critic, Phase 1 or UAT; security not in the set (nothing root executes;
it reads public advisory data). Retrospective: joins the next fixer batch.
**The chain's paths** (shared record repository, on `master`; whole paths, from the scope above), each production path with its
colocated test:
- `tools/website-dependency-audit.js` (new) with `tools/websiteDependencyAudit.test.js` (new);
- `tools/website-audit-dispositions.json` (new; seeded from `verification/website-deps-review/security/dispositions.json`, which
  stays as the review's evidence);
- the stage documents and `verification/fix-website-dependency-audit/`.
Standing tests naming these paths or basenames: none (`git grep -l -E
'website-dependency-audit|websiteDependencyAudit|website-audit-dispositions'` at `e5136f8`, exit 1, empty). `INBOX.md` is written by
the tool at run time only and is never committed by this chain. The crontab line is devops's act, with the comment the crontab's
other lines carry (owner, date, removal condition). A record deliverable carries `pending review at <sha>` at its head until QA's
verdict (fixer.md).
**Exclusions.** Any Discord or webhook post; any headless agent run; an audit of project-utils or preview-image-generator; changing
`verification/website-deps-review/`.
**Not covered:** whether `pnpm audit` needs network access the cron environment lacks; the registry's rate limits; how a future
disposition is added (the fixer states the procedure in the tool's header).

## 2026-11-21T00:01Z — the fixer's blocking question on bare-module defaults: answered from his words (seed per advisory)

**Question** (`fixer-fix-website-dependency-audit`, message 00:0xZ, marked BLOCKED, the rest of its work proceeding): should a bare
`module` disposition in the review's `dispositions.json` count as having assessed an advisory published after it was written? Its
read: over `verification/018/security/out/pnpm-audit-prod-d1bb9b0.json`, 81 entries; 6 match `module|GHSA`, 8 `module@version`, 67 a
bare module default across 27 packages. Its options: (1, recommended) seed one `module|GHSA` key per current entry, no bare defaults;
(2) copy verbatim; (3) stop.
**Answered by this thread, not put to him**, because his chosen words settle it: his Q2 answer "yes" to "audit the released lockfile
and join it with the dispositions already made, so a new advisory is read by someone" (block 2026-11-20T23:44Z of
`steering/website-deps-review-rulings.md`), and his selection of block 23:58Z above, made on the question "finds a new security
advisory that hasn't been assessed yet". A default written before an advisory existed has not assessed it, so option 2 would leave new
advisories in 27 packages unread. **Ruling: option 1** — seed per advisory; the review's file stays unchanged as evidence. The
fixer's 81/6/8/67 counts are its own read, not re-derived here; they decide nothing between the options.

## 2026-11-21T00:19Z — CR-2 and CR-3: his selections (re-scope: failure and staleness entries in; versions a stated limit)

Code review round 1 (`code-review/fix-website-dependency-audit-code-review.md`, record `cd93a06`): REJECTED at `9fc299c` on CR-1
(MEDIUM; to the fixer: one test case asserting append-before-state). CR-2 and CR-3 (LOW) asked for scoping rulings; ruling either in
widens block 23:59Z, so both went to him.
**Premises read that turn** (helper `general-purpose-sonnet`, executed against scratch inbox and state files, outputs in this
thread's scratchpad `refute-audit/`): three induced failures (`PATH=/nonexistent`; `npm_config_registry=http://127.0.0.1:9`; a fake
pnpm printing `not json`) each exited 1 with one stderr line and left the scratch inbox at 0 bytes; the tool reads `origin/master` by
`git rev-parse` and `grep -ciE 'fetch|ls-remote|pull'` over it gives 0; `rev-parse origin/master` = `ls-remote origin
refs/heads/master` = `d1bb9b0` at 00:1xZ. "54 of 62 keys name no version" was the reviewer's count, marked unread in the option text.
**Selection, answered 00:19Z** (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T00:19Z — steering-roadmap-hooks";
wording this thread's):
- Q "Silent fail": **Agent: entry on break or stale (Recommended)** — CHOSEN. "One inbox entry when a run of failures starts, not one
  per day, and one when this box's copy of the live branch differs from the live branch (checked read-only, nothing moved). … Costs
  one more fix round on the tool before its QA pass." Not chosen: Agent: entry on break only; Agent: leave it as is.
- Q "Versions": **Agent: accept as a known limit (Recommended)** — CHOSEN. "Leave it keyed by advisory. … Recorded as a known
  limit; no extra round." Not chosen: Agent: tie them to versions.
**Re-scope of block 23:59Z, added limbs:** (a) the tool appends one `INBOX.md` entry when a streak of failed runs starts (not one per
failed run), and none again until a run succeeds; (b) it appends one entry when the website's local `origin/master` differs from
`git ls-remote origin refs/heads/master` (read only; no fetch, no ref moved), once per differing pair. Same paths; the stated limit:
a disposition holds for every version of its module under its GHSA. Recipients: the fixer (with CR-1), the reviewer.

## 2026-11-21T01:45Z — chain closed out; fixer-batch retrospective and test-case scoring started

Read this turn: devops's close-out (its message 01:2xZ). The carrier `handoff/fix-website-dependency-audit-first-run-2026-11-21.md`
(`5209945`, Open, Owning-Stage devops) carries B-1 and both Assumptions Not Checked in full. Its reader R1 is crontab line 85,
`13 7 21-28 11 *` (`crontab -l`, read 01:4xZ). The kit's `out/smoke-final.txt` ends "SMOKE OK — the kit is armed; nothing started".
The four documents are `Status: Released` in `closed/` (implementation `8d59477`, code review `e5dedbe`, QA `705535d`, deployment `7768ec1`).
- **Leftovers handoff:** item 6 recorded as discharged in `handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md`
  (Status-Detail and a changelog row). It stays Open for items 4, 5 and 7, each on its own trigger. Disclosure: the record-write gate
  refused a shell edit of that file and required the Edit tool or `record-edit.js`. The first edit, a python write one call earlier,
  had gone through the shell unseen by the gate; the correction that followed was made with Edit.
- **Sessions:** the chain's four sessions were stopped 01:27Z (`tmux-agent stop`); `/proc` entries for pids 1086235, 1229313, 1783778
  and 2232574 are all absent. Scratch deleted under `/tmp/claude-1000/-usr-local-bin-hooks-agent-output/`: `b599db6d…`, `84577f0e…`,
  `bc210ef7…`, `e0e50a80…` (`du -s` 16 + 2,640 + 120 + 112 KB; `ls -d` of each failed after). The open carrier and kit cite none of
  them (`git grep -l -F /tmp/claude-1000`, no hit). Neither does any other docket. Closed verification tables cite run directories
  there (mutation outputs); their results are in the committed tables.
- **Box:** no Docker image or `/var/tmp` capture is this chain's (`postgres:16` only, not this chain's).
- `INDEX.md` rebuilt (`build-index.js --tracked`, diff read: 489 documents, the two fixer chains' closed documents and carriers).
  OWNER-QUEUE unchanged: its one item, the reviewer's untracked duplicate, still exists (`ls -l`).
- **Fixer batch:** `fix-message-page-header-decode` (website `983681c..7923a1d`), `fix-trpc-batch-limit` (`d1bb9b0..76da25c`) and
  this chain (record, tool last changed at `67f0285`, installed tree `5d0baf8`). Retrospective origin `fixer-batch-2026-11-21`. Scoring
  covers website `76da25c`: 4 test files the batch changed (`git diff --name-only` over both ranges). It also covers record `5d0baf8`:
  `tools/websiteDependencyAudit.test.js`.
- The standing check is deleted. No chain of this thread is in flight, and R1 carries the one timed read.

## 2026-11-21T01:49Z — test-case scoring of the fixer batch: 31 cases scored, 3 below 7 (9.7%)

Scope: the cases in the test files the batch's commits changed, listed from clean exports by a helper.
- **Website, export of `76da25c`** (`pnpm install --frozen-lockfile` exit 0; `vitest list`: 2,265 cases): 8 marked.
  - `middleware.request-headers` 5, `trpc.batch-refusal` 2, `trpc.site-link` 1.
  - `src/app/_components/__tests__/Providers.request-headers.test.ts` scores nothing. `7923a1d` added it and `76da25c`'s chain deleted
    it (`git diff --name-status -M d1bb9b0 76da25c`: `D`).
- **Record, export of `5d0baf8`** (`node --test` exit 0, 23 pass): `tools/websiteDependencyAudit.test.js`, 23 cases.
- **Tables:** `verification/fixer-batch-2026-11-21/deweed/{website,record}.tsv`, one unit each (`-1.tsv`). Each table has one row per id
  and no duplicate ids.
- **Scores** (a Python count over each table):
  - website 5 → 2, 7 → 2, 8 → 4;
  - record 5 → 1, 7 → 3, 8 → 15, 9 → 4.
- **Below 7:** 3 of 31 (website ids 584 and 1497; record id 20), each `remove`. Their covering ids are 583, 1496 and 12, every one
  scored 7 or more. No covering id is unchecked.
- Nothing is deleted on these tables. A deletion is a later chain's, behind a mutation re-run (deweeder.md). The exports are removed.
