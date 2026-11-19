# Brief — code-reviewer, fix-personal-message-access

Duties negated: none.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-personal-message-access-brief-common.md`. It carries
the determination and his scope selection by pointer, the stage set, the standing prohibitions, the architecture citations, and the
hazard analysis, each hazard a candidate for you to re-derive. The same analysis went to the fixer.

- **You:** session `code-reviewer-hooks-fix-personal-message-access`, cwd `/usr/local/bin/hooks/website`.
- **Start:** on the fixer's committed document `implementation/fix-personal-message-access-…` and its handoff SHA on
  `chain/fix-personal-message-access`. Until it reaches you, wait. Read nothing in the shared tree that the fixer is mid-edit on.
- **Review:** against the bounded scope statement (rulings file, block 22:35Z) and the property (block 20:30Z). Your verdict carries
  `Reviewed-At: <sha>`. If the fix adds fewer than 20 production lines (GLOSSARY, "Production line"), your definition's fixer rule
  applies: you also run the suite and the red tests, and no QA follows.
- **Deliver your verdict** to the fixer on a rejection. On approval, deliver it to QA, session `qa-hooks-fix-personal-message-access`,
  when the change is 20 or more production lines. Otherwise, or when no QA session is live, deliver it to `steering-roadmap-hooks`. Use
  SendMessage.
- **Return channel:** owner-needing items and spawn cues go to `steering-roadmap-hooks` by SendMessage.
