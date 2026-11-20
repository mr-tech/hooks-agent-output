# Brief — code-reviewer, fix-message-page-header-decode

Duties negated: none.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-message-page-header-decode-brief-common.md`. It carries
the determination and his selections by pointer, the stage set, the standing prohibitions and the hazard analysis, each hazard a
candidate for you to re-derive. The same analysis went to the fixer.

- **You:** session `code-reviewer-hooks-fix-message-page-header-decode`, cwd `/usr/local/bin/hooks/website`.
- **Start:** now, on the fixer's committed document `implementation/fix-message-page-header-decode-implementation.md` and its
  `Handoff-At` on `chain/fix-message-page-header-decode`.
- **Review:** against the determination and his selections (rulings file `steering/website-deps-review-rulings.md`, blocks 01:59Z and
  02:03Z). Your verdict carries `Reviewed-At: <sha>`. The fixer reports 1 production line added. Under 20, your definition's fixer
  rule applies: you also run the suite and the red test, and no QA follows.
- **Steering's ruling on two fixer reports** (block "2026-11-20T02:1xZ"): `query-string` was removed instead of an override being added.
  That is a mechanism choice inside scope, recorded. The now-unread `x-query-params` write in `middleware.ts` stays as it is, out of scope.
- **Deliver your verdict** to the fixer on a rejection. On approval, deliver it to `security-hooks-website-deps`, the security stage on
  this change, which is live. If it is not live, send it to `steering-roadmap-hooks`. Use SendMessage.
- **Return channel:** owner-needing items and spawn cues go to `steering-roadmap-hooks`.
