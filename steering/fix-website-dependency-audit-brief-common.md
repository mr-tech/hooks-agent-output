# Brief, common part — fixer chain `fix-website-dependency-audit`

From `steering-roadmap-hooks`, written 2026-11-20T23:5xZ at the determination. Every brief of this chain names this file second,
after its `Duties negated:` line, and adds only what is its stage's own. Rulings: `steering/fix-website-dependency-audit-rulings.md`.

## Determination and stage set

- His word: `/usr/local/bin/hooks/agent-output/steering/website-deps-review-rulings.md`, block "2026-11-20T23:44Z" (Q2); his
  selection on where a new advisory goes: `steering/fix-website-dependency-audit-rulings.md`, block "2026-11-20T23:58Z" — **record
  entry only**.
- Scoping determination, the chain's paths, exclusions and what is not covered: same file, block "2026-11-20T23:59Z". The block
  governs.
- Stage set, quoted from that block: "`fixer-fix-website-dependency-audit` → `code-reviewer-fix-website-dependency-audit` → QA Phase 2
  (`qa-fix-website-dependency-audit`) if the tool adds 20 or more production lines → devops (`devops-fix-website-dependency-audit`)
  installs the crontab line and reads the first run."
- End step: the crontab line installed and its first run's log read. No push.

Repositories: `/usr/local/bin/hooks/agent-output` (the record, on `master`, shared with other sessions: commit by pathspec only, never
stage) and `/usr/local/bin/hooks/website` (read only, at `origin/master`, through an export — its tree is held by chain
`fix-trpc-batch-limit` on `chain/fix-trpc-batch-limit`; never switch or run anything in it).

## Standing prohibitions relied on (quoted whole)

From `/home/dev/.claude/CLAUDE.md`, "Outbound messages":

> **A message that reaches a real person is mine to send.** Customers, users, staff and the public — any other Discord server, a DM,
> modmail, a support thread, a forum, email, a ticket reply — get nothing from an agent.

His standing rule on the record (`/home/dev/.claude/projects/-usr-local-bin-hooks/memory/no-security-blocks-in-record.md`), his words:

> agents are never to lodge in agent-output safeguard and other security blocks. if they need to note a failure, they must just say
> that the action was not completed without stating why

Secret files: preview-image-generator's `.github/workflows/prod.yml` is flagged by the secret-file gate, which refuses line-printing
`grep`/`git grep` calls even where they never aim at it. Name paths explicitly, report any refusal to steering, never re-issue it in
another form.

## Architecture

- Evergreen record: `/usr/local/bin/hooks/agent-output/architecture/system-architecture.md`; the record's tools are listed in
  `/usr/local/bin/hooks/agent-output/CLAUDE.md` (its tools carry `node --test` files).

## Hazard-bearing analysis (each a candidate to re-derive)

1. `apply-dispositions.js` throws on an undispositioned entry and on an unused key (unless `--allow-unused`): a scheduled run must
   turn "undispositioned" into an inbox entry, not a crash, and an advisory that leaves the audit must not fail the run.
2. At website `d1bb9b0` the production audit holds no entry (`verification/018/security/out/pnpm-audit-prod-d1bb9b0-disposition-summary.txt`),
   so the first live run may write nothing: the test owes a case with an undispositioned entry, and one that a second run does not
   repeat the entry.
3. `INBOX.md` is shared and appended to by other sessions; append only, never rewrite or commit it.

## What this brief did not check

- Network access and the `pnpm` path in cron's environment; registry rate limits.
