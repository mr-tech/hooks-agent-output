# Brief — fixer, fix-message-page-header-decode

Duties negated: none.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-message-page-header-decode-brief-common.md`.

- **You:** session `fixer-hooks-fix-message-page-header-decode`, cwd `/usr/local/bin/hooks/website`. The tree is on
  `chain/fix-message-page-header-decode` at `983681c`. Confirm with `git branch --show-current` before your first edit.
- **Start:** now, on the determination (rulings file, block 02:03Z). There is no plan and no ID.
- **Deliverables:** your definition's, over the scope in that block:
  - route (a) at `Providers.tsx` `getMessage`, with a red test for the property;
  - decode-uri-component ≥0.5.1 resolved, or absent, proven from the lockfile;
  - `sanitize-html`, `@types/sanitize-html` and the direct `sharp` removed, with a production build (`next build`, exit code
    recorded) and the suite passing. If the build needs the direct `sharp`, keep it and say so.
  Also one document, `implementation/fix-message-page-header-decode-…`, a handoff SHA, and the production line count.
- **User-visible flows:** list them, including a share-code load on `/message/...` (hazard 1).
- **Deliver your report to** the code reviewer, session `code-reviewer-hooks-fix-message-page-header-decode`. If no session of that
  name is live, send it to `steering-roadmap-hooks`. Use SendMessage.
- **Return channel:** owner-needing items, spawn cues and scope deltas go to `steering-roadmap-hooks`.
