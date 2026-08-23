# Open Questions — Agent Output

What only the owner can decide. Any session may append; **only the owner answers.** An answered
question is deleted, not marked answered — the memory is the change it caused. Write a memory
record only for a standing ruling, chiefly one that forbids something, since a prohibition is the
one outcome that leaves no artifact to point at.

---

## 2026-08-23 — Who is the owning interpreter of this repo's inbox?

Raised by `steering-01` on creating `INBOX.md` under the full-parity ruling of 2026-08-23.

An inbox exists because a domain has **one owning session to address** — that is the stated reason
only `~/.claude/agents` and `/usr/local/bin/statbot/agent-output` had one until today. This repo now
has a third. No session has been designated as its interpreter, so entries written here have no
defined reader and no one is obliged to process them at spawn.

This is the owner's to settle because it assigns standing responsibility to a session role, not
because the answer is technically unclear. Until it is settled, treat entries here as unread.

## 2026-08-23 — Is `cdn` still deployed, or can it be archived?

Surfaced by `architect-hooks-1` during the workspace overview. `cdn` is a Next 13 app whose single
API route serves preview blobs out of Postgres — a storage path that `preview-image-generator`'s
upload to the CDN bucket appears to supersede. It is the one sibling excluded from
`hooks.code-workspace`, and its last commit is 2023-08-02.

**The tree cannot answer whether `cdn.hooks.gg` is still serving.** Only the owner knows. The answer
decides whether it is described as legacy-but-live or archived outright.

## 2026-08-23 — Does the website serve from Vercel or from PM2?

Surfaced by `architect-hooks-1`. The `website` repo carries **both** a `vercel.json` (with a daily
cron) and a PM2 ecosystem config. `preview-image-generator` and `cdn` are PM2. Nothing in the tree
states which path is actually live, so every document so far has correctly declined to assert one.

This matters beyond documentation: a release procedure cannot be written against an unknown
deployment target.

## 2026-08-23 — Why is `project-utils` consumed as a git dependency with `dist/` committed?

`project-utils` is consumed by both `website` and `cdn` as `github:hooks-gg/project-utils#master`,
with build output committed to the repo and a pre-commit hook rebuilding it. The architect records
this as decision D-002 but flags the **rationale as inference** — the design is visible, the reason
for it is not written anywhere.

Only the owner can confirm the intent. Until then the architecture document must keep it marked as
inferred rather than stated.
