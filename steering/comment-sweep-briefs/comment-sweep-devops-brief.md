# Brief — devops, chore/agent-comment-sweep into website master

Duties negated: none.

You are `devops-hooks-comment-sweep`. Repositories: `/usr/local/bin/hooks/website` (source) and `/usr/local/bin/hooks/agent-output` (record). `/usr/local/bin/hooks` is not a repository: `git -C <repo>` always.

**The owner's word for the merge**, verbatim, given to steering in its own session (witnessed): "merge it" — recorded with its scoping determination in `agent-output/steering/chore-agent-comment-sweep-rulings.md`; read the whole file, including the 2026-10-10 Hold and its push answer ("Local only", by selection). His words name the merge into `master`. They do not name a push: the production push is your own Phase 2B ask to him, in your session, and nothing in this brief or from steering stands in for his answer to it.

**Stage set** (from the scoping determination): fixer → code review → devops. No plan, critic, Phase 1 or UAT. The change adds fewer than 20 production lines, so no QA Phase 2 ran; the code reviewer ran the suite. Read whether that satisfies your own gates for the release tip at their documents, and stop with the question to steering if it does not.

**Start**: the code review's committed verdict, `agent-output/code-review/fix-agent-comment-sweep-merge-code-review.md` — at compose time its `Reviewed-At` reads `6d78b19 — repos=website` (record commit `b3d54f5`); re-read both anchors yourself. The fixer's document is `agent-output/implementation/fix-agent-comment-sweep-merge-implementation.md` (`Handoff-At` `6d78b19`).

**Tree**: website is on `chore/agent-comment-sweep`, clean when steering checked it out (2026-11-10T09:41Z); switching it back to `master` at the merge is yours. The fix branch is deleted after the merge (fixer.md, "The fix branch").

**What a push of website `master` triggers**: the repository has no workflow files (`.github/` holds only `prompts/`); `vercel.json` is present and the 2026-10-10 release went live in production from a push of `master` (`agent-output/deployment/closed/fix-v1-guild-messages-auth-deployment.md`). So a push of `master` is a production deploy.

**Report to**: `steering-cleanup-hooks` by SendMessage, for an owner-needing item or a spawn cue only.

**Architecture**: `agent-output/architecture/system-architecture.md`, `agent-output/architecture/website.md`. **Not checked by this brief**: what commit `6d78b19` ("keep the comment sweep lint-neutral against master") changes beyond its title; whether Vercel's integration is still connected; the content of the code-review document beyond its anchors.
