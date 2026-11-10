# Brief — devops, fix-v1-guild-messages-auth: Phase 2D close-out only

Duties negated: none. This is not a release: Stage 1 and the Stage 2 move ran on 2026-10-10 and are recorded. Only the post-release close-out is owed.

You are `devops-hooks-v1-auth`. Record repository: `/usr/local/bin/hooks/agent-output` (`git -C`; `/usr/local/bin/hooks` is not a repository).

**What changed**: the owner performed B-4, the last open register row. His words are verbatim in `steering/v1-guild-messages-auth-rulings.md`, last block (witnessed by steering in its own session). Read that block and re-read the row's own pass condition in your record before registering it.

**Owed, per your definition's Phase 2D**: register B-4 in `deployment/fix-v1-guild-messages-auth-deployment.md`; judge whether the release record may close and, if so, close it; disposition `handoff/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md` (its 24-hour Vercel-log fallback for B-4 lapsed unread on 2026-10-11 — say what that means for the row now that the owner observed it directly). Close one document at a time and stop at the first failure. `node tools/check-repo.js` should still exit 0, apart from two link failures in `steering/comment-sweep-briefs/` that belong to another chain in flight.

**Do not**: switch, merge or push anything in `/usr/local/bin/hooks/website` — that tree is on `chore/agent-comment-sweep` for another chain in flight (`fixer-hooks-comment-sweep`), and its `master` move is a different devops session's; rebuild `INDEX.md` (steering does); touch `verification/fix-agent-comment-sweep-merge/` or any document of that chain.

**Stage set**: this chain ran fixer → code review → QA → devops; its other documents are closed. **Report to**: `steering-cleanup-hooks`, by SendMessage, for an owner-needing item only; your state is read from your documents.

**Not checked by this brief**: the content of the deployment record beyond its `Status-Detail` ("Phase 2D held until B-4 … is terminal") and row B-3; whether any other row or forward item is still open in it.
