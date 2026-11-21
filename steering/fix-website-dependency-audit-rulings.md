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
